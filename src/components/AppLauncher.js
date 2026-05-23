'use client';

import React from 'react';
import { useWindowManager } from '../context/WindowManager';
import { useTheme } from '../context/ThemeContext';
import { Folder, Settings, Terminal, Globe, Music, Calculator, Calendar, Mail } from 'lucide-react';

const ALL_APPS = [
    { id: 'finder', name: 'Finder', icon: Folder, color: { light: '#1e88e5', dark: '#6ab0f3' } },
    { id: 'browser', name: 'Browser', icon: Globe, color: { light: '#00897b', dark: '#4fd1c5' } },
    { id: 'terminal', name: 'Terminal', icon: Terminal, color: { light: '#4a5568', dark: '#a0a0b0' } },
    { id: 'settings', name: 'Settings', icon: Settings, color: { light: '#3182ce', dark: '#90cdf4' } },
    { id: 'mail', name: 'Mail', icon: Mail, color: { light: '#e53e3e', dark: '#fc8181' } },
    { id: 'calendar', name: 'Calendar', icon: Calendar, color: { light: '#d53f8c', dark: '#f687b3' } },
    { id: 'calculator', name: 'Calculator', icon: Calculator, color: { light: '#b7791f', dark: '#f6ad55' } },
    { id: 'music', name: 'Music', icon: Music, color: { light: '#97266d', dark: '#d53f8c' } },
];

export default function AppLauncher() {
    const { openWindow, closeWindow } = useWindowManager();
    const { theme } = useTheme();

    const handleLaunch = (app) => {
        let Content;
        if (app.id === 'settings') Content = require('./Settings').default;
        else if (app.id === 'finder') Content = require('./FileManager').default;
        else if (app.id === 'app-launcher') Content = require('./AppLauncher').default;

        if (Content) {
            openWindow(app.id, <Content />, app.name);
        } else {
            const Placeholder = () => (
                <div style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                    <h3>{app.name}</h3>
                    <p>Placeholder for {app.name}</p>
                </div>
            );
            openWindow(app.id, <Placeholder />, app.name);
        }
        closeWindow('app-launcher'); // Close self
    };

    return (
        <div style={{
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: '24px',
            alignContent: 'start'
        }}>
            {ALL_APPS.map(app => {
                const iconColor = theme === 'light' ? app.color.light : app.color.dark;

                return (
                    <button
                        key={app.id}
                        onClick={() => handleLaunch(app)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            color: 'var(--text-primary)'
                        }}
                    >
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '14px',
                            backgroundColor: 'var(--surface-highlight)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'transform 0.1s',
                            border: '1px solid var(--border)',
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <app.icon size={32} color={iconColor} />
                        </div>
                        <span style={{ fontSize: '0.85rem' }}>{app.name}</span>
                    </button>
                );
            })}
        </div>
    );
}
