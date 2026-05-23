'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Search, ExternalLink } from 'lucide-react';

export default function Browser() {
    const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
    const [inputVal, setInputVal] = useState('https://www.google.com/webhp?igu=1');
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState(['https://www.google.com/webhp?igu=1']);
    const [historyIndex, setHistoryIndex] = useState(0);

    const navigate = (newUrl) => {
        setLoading(true);
        setUrl(newUrl);
        setInputVal(newUrl);

        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newUrl);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let target = inputVal;

        // Basic URL logic
        if (!target.includes('.') && !target.startsWith('http')) {
            // It's a search
            target = `https://www.google.com/search?q=${encodeURIComponent(target)}&igu=1`;
        } else if (!target.startsWith('http')) {
            target = `https://${target}`;
        }

        navigate(target);
    };

    const traverse = (direction) => {
        const newIndex = historyIndex + direction;
        if (newIndex >= 0 && newIndex < history.length) {
            setHistoryIndex(newIndex);
            const newUrl = history[newIndex];
            setUrl(newUrl);
            setInputVal(newUrl);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fff' }}>
            {/* Browser Toolbar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                backgroundColor: '#f1f3f4',
                borderBottom: '1px solid #e0e0e0',
                color: '#5f6368'
            }}>
                <button onClick={() => traverse(-1)} disabled={historyIndex === 0} style={navBtnStyle}>
                    <ArrowLeft size={16} />
                </button>
                <button onClick={() => traverse(1)} disabled={historyIndex === history.length - 1} style={navBtnStyle}>
                    <ArrowRight size={16} />
                </button>
                <button onClick={() => navigate('https://www.google.com/webhp?igu=1')} style={navBtnStyle}>
                    <Home size={16} />
                </button>
                <button onClick={() => setLoading(true)} style={navBtnStyle}>
                    <RotateCw size={16} />
                </button>

                {/* Omnibox */}
                <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <Search size={14} style={{ position: 'absolute', left: '10px', color: '#9aa0a6' }} />
                        <input
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            style={{
                                width: '100%',
                                padding: '6px 12px 6px 32px',
                                borderRadius: '20px',
                                border: '1px solid #dfe1e5',
                                backgroundColor: '#fff',
                                outline: 'none',
                                fontSize: '0.9rem',
                                color: '#202124',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}
                        />
                    </div>
                </form>

                <a href={url} target="_blank" rel="noopener noreferrer" style={{ ...navBtnStyle, display: 'flex' }} title="Open in real browser">
                    <ExternalLink size={16} />
                </a>
            </div>

            {/* Webview / Iframe */}
            <div style={{ flex: 1, position: 'relative' }}>
                <iframe
                    src={url}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="Browser View"
                    onLoad={() => setLoading(false)}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    referrerPolicy="no-referrer"
                />

                {/* Note overlay for blocked sites */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '4px 8px',
                    backgroundColor: '#fffbe6',
                    borderTop: '1px solid #ffe58f',
                    fontSize: '0.75rem',
                    color: '#8a6d3b',
                    textAlign: 'center',
                    pointerEvents: 'none',
                    opacity: 0.8
                }}>
                    Note: Some websites generally block embedding. If blank, try the "Open External" button.
                </div>
            </div>
        </div>
    );
}

const navBtnStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit'
};
