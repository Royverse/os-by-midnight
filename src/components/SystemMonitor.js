'use client';

import React, { useState, useEffect } from 'react';
import { Battery, Wifi, Cpu, Activity } from 'lucide-react';

export default function SystemMonitor() {
    const [battery, setBattery] = useState({ level: 100, charging: false });
    const [online, setOnline] = useState(true);
    const [memory, setMemory] = useState(null);

    useEffect(() => {
        // Battery Status
        if (navigator.getBattery) {
            navigator.getBattery().then(bat => {
                setBattery({ level: bat.level * 100, charging: bat.charging });

                bat.addEventListener('levelchange', () => {
                    setBattery({ level: bat.level * 100, charging: bat.charging });
                });
                bat.addEventListener('chargingchange', () => {
                    setBattery({ level: bat.level * 100, charging: bat.charging });
                });
            });
        }

        // Network Status
        setOnline(navigator.onLine);
        window.addEventListener('online', () => setOnline(true));
        window.addEventListener('offline', () => setOnline(false));

        // Memory (Chrome only)
        if (performance && performance.memory) {
            setMemory(performance.memory);
        }

        return () => {
            // Cleanup if needed
        };
    }, []);

    return (
        <div style={{ padding: '24px', color: 'var(--text-primary)', height: '100%', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>System Status</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>

                {/* Battery Card */}
                <div className="monitor-card" style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Battery size={24} color={battery.charging ? '#4fd1c5' : '#f6ad55'} />
                        <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{Math.round(battery.level)}%</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {battery.charging ? 'Charging' : 'Battery Level'}
                    </div>
                    <div style={{
                        height: '4px',
                        backgroundColor: 'var(--surface)',
                        marginTop: '12px',
                        borderRadius: '2px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${battery.level}%`,
                            backgroundColor: battery.charging ? '#4fd1c5' : '#f6ad55'
                        }} />
                    </div>
                </div>

                {/* Network Card */}
                <div className="monitor-card" style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Wifi size={24} color={online ? '#6ab0f3' : '#fc8181'} />
                        <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{online ? 'On' : 'Off'}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Network Status
                    </div>
                </div>

                {/* Specs / Window Info since we can't get real CPU */}
                <div className="monitor-card" style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Activity size={24} color="#d53f8c" />
                        <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Active</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        System Health
                    </div>
                </div>

            </div>
        </div>
    );
}

const cardStyle = {
    backgroundColor: 'var(--surface-highlight)',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid var(--border)',
};
