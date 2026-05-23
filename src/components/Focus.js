'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Focus() {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus | short | long

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Play sound?
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        if (mode === 'focus') setTimeLeft(25 * 60);
        if (mode === 'short') setTimeLeft(5 * 60);
        if (mode === 'long') setTimeLeft(15 * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const setTimerMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        if (newMode === 'focus') setTimeLeft(25 * 60);
        if (newMode === 'short') setTimeLeft(5 * 60);
        if (newMode === 'long') setTimeLeft(15 * 60);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '24px',
            color: 'var(--text-primary)'
        }}>
            {/* Modes */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                <ModeBtn active={mode === 'focus'} onClick={() => setTimerMode('focus')}>Focus</ModeBtn>
                <ModeBtn active={mode === 'short'} onClick={() => setTimerMode('short')}>Short Break</ModeBtn>
                <ModeBtn active={mode === 'long'} onClick={() => setTimerMode('long')}>Long Break</ModeBtn>
            </div>

            {/* Timer Display */}
            <div style={{
                fontSize: '4rem',
                fontWeight: 700,
                fontVariantNumeric: 'tabular-nums',
                marginBottom: '32px',
                textShadow: '0 0 20px rgba(122, 162, 247, 0.2)'
            }}>
                {formatTime(timeLeft)}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '16px' }}>
                <button
                    onClick={toggleTimer}
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: isActive ? 'var(--surface-highlight)' : 'var(--accent)',
                        color: isActive ? 'var(--text-primary)' : '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    {isActive ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '4px' }} />}
                </button>
                <button
                    onClick={resetTimer}
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        border: '1px solid var(--border)',
                        backgroundColor: 'transparent',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <RotateCcw size={24} />
                </button>
            </div>
        </div>
    );
}

function ModeBtn({ active, children, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                background: active ? 'rgba(122, 162, 247, 0.15)' : 'transparent',
                color: active ? 'var(--accent)' : 'var(--text-secondary)',
                border: active ? '1px solid var(--accent)' : '1px solid transparent',
                borderRadius: '20px',
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
            }}
        >
            {children}
        </button>
    )
}
