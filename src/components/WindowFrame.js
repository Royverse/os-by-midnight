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
                // Resize from bottom-right simple implementation
                // New Dimension = Mouse Position - Window Position
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
                backgroundColor: 'var(--surface)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '8px',
                boxShadow: isActive ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: isActive ? 100 : 10,
                overflow: 'hidden',
                // Removed transition for box-shadow/border here to let motion handle generic anims, 
                // but kept manual drag for position perf.
            }}
            className="glass"
        >
            {/* Title Bar */}
            <div style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--surface-highlight)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                userSelect: 'none',
                cursor: isDragging ? 'grabbing' : 'grab',
                flexShrink: 0,
            }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{win.title}</span>
                <div className="window-controls" style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
                        style={controlBtnStyle}
                    >
                        <Minus size={14} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); }}
                        style={controlBtnStyle}
                    >
                        <Square size={14} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                        style={{ ...controlBtnStyle, ':hover': { backgroundColor: '#ff5f57' } }}
                    >
                        <X size={14} />
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

const controlBtnStyle = {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',
    borderRadius: '4px',
};
