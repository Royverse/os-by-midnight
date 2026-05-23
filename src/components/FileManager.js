'use client';

import React from 'react';
import { useFileSystem } from '../hooks/useFileSystem';
import { Folder, FileText, Image as ImageIcon, ArrowLeft, HardDrive } from 'lucide-react';

export default function FileManager() {
    const { getCurrentFolder, navigateUp, openFolder, currentPath } = useFileSystem();
    const currentFolder = getCurrentFolder();

    const getIcon = (item) => {
        switch (item.type) {
            case 'folder': return <Folder size={48} color="#6ab0f3" fill="#6ab0f3" fillOpacity={0.2} />;
            case 'image': return <ImageIcon size={48} color="#f6ad55" />;
            default: return <FileText size={48} color="#a0aec0" />;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', color: 'var(--text-primary)' }}>
            {/* Toolbar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderBottom: '1px solid var(--border)',
                gap: '16px',
                backgroundColor: 'var(--surface-highlight)'
            }}>
                <button
                    onClick={navigateUp}
                    disabled={currentPath.length <= 1} // Root check
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: currentPath.length <= 1 ? 'var(--text-secondary)' : 'var(--text-primary)',
                        opacity: currentPath.length <= 1 ? 0.5 : 1,
                        cursor: currentPath.length <= 1 ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <ArrowLeft size={20} />
                </button>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                    {currentPath.length === 1 ? 'Macintosh HD' : currentFolder.name}
                </span>
            </div>

            {/* Grid View */}
            <div style={{
                flex: 1,
                padding: '24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '16px',
                alignContent: 'start',
            }}>
                {currentFolder.children.map(item => (
                    <div
                        key={item.id}
                        onDoubleClick={() => {
                            if (item.type === 'folder') {
                                openFolder(item.id);
                            }
                        }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px',
                            borderRadius: '8px',
                            cursor: 'default',
                            transition: 'background-color 0.2s',
                        }}
                        className="file-item"
                    >
                        <div style={{ pointerEvents: 'none' }}>
                            {getIcon(item)}
                        </div>
                        <span style={{
                            fontSize: '0.85rem',
                            textAlign: 'center',
                            wordBreak: 'break-word',
                            color: 'var(--text-primary)'
                        }}>
                            {item.name}
                        </span>
                        <style jsx>{`
                .file-item:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            `}</style>
                    </div>
                ))}

                {currentFolder.children.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>
                        Folder is empty
                    </div>
                )}
            </div>

            {/* Sidebar / Status Bar could be added here */}
        </div>
    );
}
