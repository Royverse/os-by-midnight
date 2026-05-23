'use client';

import React, { useState, useEffect } from 'react';
import { useWindowManager } from '../context/WindowManager';
import { useTheme } from '../context/ThemeContext'; // Import useTheme
import { LayoutGrid, Folder, Settings, Terminal, Globe, FileText, Clock, Calculator, Activity, ExternalLink } from 'lucide-react';

export default function Taskbar() {
    const { windows, activeWindowId, openWindow, minimizeWindow, restoreWindow, focusWindow } = useWindowManager();
    const { theme } = useTheme(); // Get theme
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const apps = [
        { id: 'finder', name: 'Finder', icon: Folder, color: { light: '#1e88e5', dark: '#6ab0f3' } },
        { id: 'browser', name: 'Browser', icon: Globe, color: { light: '#00897b', dark: '#4fd1c5' } },
        { id: 'notes', name: 'Notes', icon: FileText, color: { light: '#d97706', dark: '#f6ad55' } },
        { id: 'focus', name: 'Focus', icon: Clock, color: { light: '#c53030', dark: '#fc8181' } },
        { id: 'calculator', name: 'Calc', icon: Calculator, color: { light: '#b7791f', dark: '#f6e05e' } },
        { id: 'system', name: 'System', icon: Activity, color: { light: '#97266d', dark: '#d53f8c' } },
        { id: 'quicklinks', name: 'Links', icon: ExternalLink, color: { light: '#4a5568', dark: '#a0a0b0' } },
        { id: 'quicklinks', name: 'Links', icon: ExternalLink, color: { light: '#4a5568', dark: '#a0a0b0' } },
        { id: 'vm', name: 'VM', icon: Terminal, color: { light: '#000000', dark: '#ffffff' } },
        { id: 'app-launcher', name: 'Apps', icon: LayoutGrid, color: { light: '#4a5568', dark: '#f0f0f0' } },
    ];

    const handleAppClick = (app) => {
        const isOpen = windows.find(w => w.id === app.id);

        if (isOpen) {
            if (isOpen.minimized) {
                restoreWindow(app.id);
            } else if (activeWindowId === app.id) {
                minimizeWindow(app.id);
            } else {
                focusWindow(app.id);
            }
        } else {
            let Content;
            switch (app.id) {
                case 'finder': Content = require('./FileManager').default; break;
                case 'settings': Content = require('./Settings').default; break;
                case 'app-launcher': Content = require('./AppLauncher').default; break;
                case 'notes': Content = require('./Notes').default; break;
                case 'focus': Content = require('./Focus').default; break;
                case 'quicklinks': Content = require('./QuickLinks').default; break;
                case 'browser': Content = require('./Browser').default; break;
                case 'calculator': Content = require('./Calculator').default; break;
                case 'calculator': Content = require('./Calculator').default; break;
                case 'system': Content = require('./SystemMonitor').default; break;
                case 'vm': Content = require('./VirtualMachine').default; break;
                default:
                    Content = () => (
                        <div style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                            <h3>{app.name}</h3>
                            <p>This is a placeholder for {app.name}.</p>
                        </div>
                    );
            }
            openWindow(app.id, <Content />, app.name);
        }
    };

    return (
        <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: 'var(--surface)', // Use theme surface
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 1000,
            gap: '12px',
            height: '64px',
        }}>
            {apps.map((app) => {
                const isOpen = windows.find(w => w.id === app.id);
                const isActive = activeWindowId === app.id;
                const iconColor = theme === 'light' ? app.color.light : app.color.dark;

                return (
                    <button
                        key={app.id}
                        onClick={() => handleAppClick(app)}
                        style={{
                            position: 'relative',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '48px',
                            height: '48px',
                            transition: 'transform 0.2s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15) translateY(-4px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            backgroundColor: 'var(--surface-highlight)', // Use theme highlight
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            border: '1px solid var(--border)', // Add subtle border
                        }}>
                            <app.icon size={24} color={iconColor} />
                        </div>

                        {/* Active Indicator */}
                        {isOpen && (
                            <div style={{
                                position: 'absolute',
                                bottom: '-6px',
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--text-primary)',
                                opacity: isActive ? 1 : 0.5,
                            }} />
                        )}
                    </button>
                );
            })}

            <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--border)', margin: '0 8px' }} />

            {/* Clock - simplified */}
            <div style={{
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 500,
                fontVariantNumeric: 'tabular-nums'
            }}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
}
