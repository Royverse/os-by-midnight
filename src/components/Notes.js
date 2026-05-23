'use client';

import React, { useState, useEffect } from 'react';

export default function Notes() {
    const [content, setContent] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('midnight-notes');
        if (saved) setContent(saved);
    }, []);

    const handleChange = (e) => {
        const newVal = e.target.value;
        setContent(newVal);
        localStorage.setItem('midnight-notes', newVal);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{
                padding: '8px 12px',
                borderBottom: '1px solid var(--border)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--surface-highlight)'
            }}>
                Auto-saved to local storage
            </div>
            <textarea
                value={content}
                onChange={handleChange}
                placeholder="Type your ideas here..."
                style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: 'none',
                    resize: 'none',
                    color: 'var(--text-primary)',
                    padding: '16px',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-geist-mono)',
                    lineHeight: '1.6',
                    outline: 'none',
                }}
            />
        </div>
    );
}
