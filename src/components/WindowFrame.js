'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useWindowManager } from '../context/WindowManager';
import { X, Minus, Square } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WindowFrame({ window: win }) {
    const { closeWindow, minimizeWindow, focusWindow, updateWindowPosition, updateWindowSize, activeWindowId } = useWindowManager();
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isControlsHovered, setIsControlsHovered] = useState(false);
    const windowRef = useRef(null);

    const isActive = activeWindowId === win.id;

    // Default size fallback if not set yet
    const width = win.size ? win.size.width : 600;
    const height = win.size ? win.size.height : 450;

    const handleMouseDown = (e) => {
        focusWindow(win.id);
        if (e.target.closest('.window-controls') || e.target.closest('.resize-handle')) return;

        setIsDragging(true);
        const rect = windowRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleResizeStart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsResizing(true);
        focusWindow(win.id);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const newX = e.clientX - dragOffset.x;
                const newY = e.clientY - dragOffset.y;
                updateWindowPosition(win.id, { x: newX, y: newY });
            }
            if (isResizing) {
                const newWidth = Math.max(300, e.clientX - win.position.x);
                const newHeight = Math.max(200, e.clientY - win.position.y);
                updateWindowSize(win.id, { width: newWidth, height: newHeight });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, dragOffset, win.id, win.position.x, win.position.y, updateWindowPosition, updateWindowSize]);

    if (win.minimized) return null;

    const getControlStyle = (type) => {
        let activeBg;
        switch (type) {
            case 'close': activeBg = '#ff5f57'; break;
            case 'minimize': activeBg = '#febc2e'; break;
            case 'maximize': activeBg = '#27c93f'; break;
        }

        const isLit = isActive || isControlsHovered;
        const bg = isLit ? activeBg : 'rgba(255, 255, 255, 0.12)';

        return {
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: bg,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            transition: 'all 0.2s ease',
            color: 'rgba(0, 0, 0, 0.65)',
        };
    };

    return (
        <motion.div
            ref={windowRef}
            onMouseDown={handleMouseDown}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
                position: 'absolute',
                top: win.position.y,
                left: win.position.x,
                width: width,
                height: height,
                backgroundColor: isActive ? 'var(--surface-active)' : 'var(--surface-inactive)',
                backdropFilter: `blur(${isActive ? 'var(--glass-blur-active)' : 'var(--glass-blur-inactive)'}) saturate(140%)`,
                WebkitBackdropFilter: `blur(${isActive ? 'var(--glass-blur-active)' : 'var(--glass-blur-inactive)'}) saturate(140%)`,
                opacity: isActive ? 'var(--glass-opacity-active)' : 'var(--glass-opacity-inactive)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '12px',
                boxShadow: isActive ? 'var(--shadow-active)' : 'var(--shadow-inactive)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: isActive ? 100 : 10,
                overflow: 'hidden',
                transition: 'background-color 0.25s ease, backdrop-filter 0.25s ease, opacity 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
            }}
        >
            {/* Title Bar */}
            <div style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                userSelect: 'none',
                cursor: isDragging ? 'grabbing' : 'grab',
                flexShrink: 0,
                transition: 'opacity 0.2s ease',
                opacity: isActive ? 1 : 0.7
            }}>
                <span style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 500,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    transition: 'color 0.2s ease'
                }}>{win.title}</span>

                <div 
                    className="window-controls" 
                    style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                    onMouseEnter={() => setIsControlsHovered(true)}
                    onMouseLeave={() => setIsControlsHovered(false)}
                >
                    {/* Close button (macOS red) */}
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                        style={getControlStyle('close')}
                    >
                        <X size={7} strokeWidth={4} style={{ 
                            opacity: isControlsHovered ? 1 : 0, 
                            transition: 'opacity 0.15s ease' 
                        }} />
                    </button>

                    {/* Minimize button (macOS yellow) */}
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
                        style={getControlStyle('minimize')}
                    >
                        <Minus size={7} strokeWidth={4} style={{ 
                            opacity: isControlsHovered ? 1 : 0, 
                            transition: 'opacity 0.15s ease' 
                        }} />
                    </button>

                    {/* Maximize button (macOS green) */}
                    <button
                        onClick={(e) => { e.stopPropagation(); }}
                        style={getControlStyle('maximize')}
                    >
                        <Square size={5} strokeWidth={4} style={{ 
                            opacity: isControlsHovered ? 1 : 0, 
                            transition: 'opacity 0.15s ease' 
                        }} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <div onMouseDown={(e) => e.stopPropagation()} style={{ flex: 1, overflow: 'auto' }}>
                    {win.component}
                </div>

                {/* Resize Handle */}
                <div
                    className="resize-handle"
                    onMouseDown={handleResizeStart}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '16px',
                        height: '16px',
                        cursor: 'nwse-resize',
                        zIndex: 20,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        padding: '2px'
                    }}
                >
                    <div style={{
                        width: '6px',
                        height: '6px',
                        borderRight: '2px solid var(--text-secondary)',
                        borderBottom: '2px solid var(--text-secondary)',
                        opacity: 0.5
                    }} />
                </div>
            </div>
        </motion.div>
    );
}
