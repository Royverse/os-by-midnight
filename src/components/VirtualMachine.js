'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const VirtualMachine = () => {
    const screenRef = useRef(null);
    const [emulator, setEmulator] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState('Idle');
    const { theme } = useTheme();

    useEffect(() => {
        // Load v86 script dynamically
        const script = document.createElement('script');
        script.src = "https://unpkg.com/v86@latest/build/libv86.js";
        script.async = true;
        script.onload = () => {
            console.log('v86 loaded');
            setStatus('Ready to boot');
        };
        document.body.appendChild(script);

        return () => {
            if (emulator) {
                try {
                    emulator.stop();
                    emulator.destroy();
                } catch (e) {
                    console.error("Error stopping emulator cleanup:", e);
                }
            }
            document.body.removeChild(script);
        };
    }, []);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!window.V86Starter) {
            setStatus('Error: v86 Engine not loaded yet.');
            return;
        }

        // Clean up previous instance if exists
        if (emulator) {
            emulator.stop();
            emulator.destroy();
        }

        setStatus(`Booting ${file.name}...`);
        setIsRunning(true);

        try {
            const newEmulator = new window.V86Starter({
                wasm_path: "https://unpkg.com/v86@latest/build/v86.wasm",
                memory_size: 32 * 1024 * 1024,
                vga_memory_size: 2 * 1024 * 1024,
                screen_container: screenRef.current,
                bios: {
                    url: "https://unpkg.com/v86@latest/bios/seabios.bin",
                },
                vga_bios: {
                    url: "https://unpkg.com/v86@latest/bios/vgabios.bin",
                },
                cdrom: {
                    buffer: file // Pass the file object directly
                },
                autostart: true,
            });

            newEmulator.add_listener("emulator-ready", () => {
                setStatus(`Running: ${file.name}`);
            });

            setEmulator(newEmulator);

        } catch (err) {
            console.error(err);
            setStatus(`Error: ${err.message}`);
            setIsRunning(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: '#000',
            color: '#fff',
            fontFamily: 'monospace'
        }}>
            <div style={{
                padding: '8px',
                borderBottom: '1px solid #333',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: theme === 'light' ? '#f0f0f0' : '#1a1a1a',
                color: theme === 'light' ? '#333' : '#f0f0f0'
            }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <label style={{
                        padding: '4px 12px',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}>
                        Select ISO / IMG
                        <input type="file" onChange={handleFileSelect} accept=".iso,.img,.bin" style={{ display: 'none' }} />
                    </label>
                    <span style={{ fontSize: '0.9rem' }}>{status}</span>
                </div>
                <div>
                    {/* Controls could go here */}
                </div>
            </div>

            <div
                ref={screenRef}
                style={{
                    flex: 1,
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#000'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'pre',
                    textAlign: 'center',
                    color: '#666',
                    display: isRunning ? 'none' : 'block'
                }}>
                    To boot an OS:
                    1. Click "Select ISO / IMG"
                    2. Choose a valid x86 bootable image
                    (e.g., FreeDOS, Alpine Linux, or your custom OS)
                </div>
            </div>
        </div>
    );
};

export default VirtualMachine;
