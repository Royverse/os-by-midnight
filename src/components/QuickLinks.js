'use client';

import React, { useState, useEffect } from 'react';
import { Plus, X, Globe, ExternalLink } from 'lucide-react';

const DEFAULT_LINKS = [
    { id: 1, name: 'Google', url: 'https://google.com' },
    { id: 2, name: 'GitHub', url: 'https://github.com' },
    { id: 3, name: 'YouTube', url: 'https://youtube.com' },
];

export default function QuickLinks() {
    const [links, setLinks] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [newLink, setNewLink] = useState({ name: '', url: '' });

    useEffect(() => {
        const saved = localStorage.getItem('midnight-links');
        if (saved) {
            setLinks(JSON.parse(saved));
        } else {
            setLinks(DEFAULT_LINKS);
        }
    }, []);

    const saveLinks = (updatedLinks) => {
        setLinks(updatedLinks);
        localStorage.setItem('midnight-links', JSON.stringify(updatedLinks));
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newLink.name || !newLink.url) return;

        let url = newLink.url;
        if (!url.startsWith('http')) url = 'https://' + url;

        saveLinks([...links, { id: Date.now(), name: newLink.name, url }]);
        setNewLink({ name: '', url: '' });
        setShowAdd(false);
    };

    const removeLink = (id) => {
        saveLinks(links.filter(l => l.id !== id));
    };

    return (
        <div style={{ padding: '24px', color: 'var(--text-primary)', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.2rem' }}>Quick Links</h2>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    style={{
                        background: 'var(--accent)',
                        color: 'var(--background)',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <Plus size={16} /> Add Link
                </button>
            </div>

            {showAdd && (
                <form onSubmit={handleAdd} style={{
                    backgroundColor: 'var(--surface-highlight)',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    border: '1px solid var(--accent)'
                }}>
                    <input
                        type="text"
                        placeholder="Name (e.g. Gmail)"
                        value={newLink.name}
                        onChange={e => setNewLink({ ...newLink, name: e.target.value })}
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="URL (e.g. gmail.com)"
                        value={newLink.url}
                        onChange={e => setNewLink({ ...newLink, url: e.target.value })}
                        style={inputStyle}
                    />
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button type="button" onClick={() => setShowAdd(false)} style={btnStyleGhost}>Cancel</button>
                        <button type="submit" style={btnStylePrimary}>Save</button>
                    </div>
                </form>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '16px' }}>
                {links.map(link => (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-card"
                        style={{
                            backgroundColor: 'var(--surface)',
                            borderRadius: '12px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            textDecoration: 'none',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border)',
                            position: 'relative',
                            transition: 'transform 0.2s, background-color 0.2s',
                            height: '100px'
                        }}
                    >
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeLink(link.id); }}
                            style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                padding: '4px',
                                opacity: 0.5 // Should increase on hover but inline style difficult
                            }}
                        >
                            <X size={12} />
                        </button>

                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Globe size={16} color="var(--accent)" />
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{link.name}</span>
                        <div className="external-icon" style={{ position: 'absolute', bottom: '8px', right: '8px', opacity: 0.3 }}>
                            <ExternalLink size={10} />
                        </div>
                    </a>
                ))}
            </div>
            <style jsx>{`
            .link-card:hover {
                transform: translateY(-2px);
                background-color: var(--surface-highlight) !important;
                border-color: var(--accent) !important;
            }
       `}</style>
        </div>
    );
}

const inputStyle = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    padding: '8px 12px',
    borderRadius: '4px',
    color: 'var(--text-primary)',
    outline: 'none',
    fontSize: '0.9rem'
};

const btnStylePrimary = {
    background: 'var(--accent)',
    color: 'var(--background)',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500
};

const btnStyleGhost = {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '0.9rem'
};
