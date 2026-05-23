'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Greeting() {
    const [greeting, setGreeting] = useState('Good Morning');
    const [name, setName] = useState('User');

    useEffect(() => {
        const updateGreeting = () => {
            const h = new Date().getHours();
            if (h < 12) setGreeting('Good Morning');
            else if (h < 18) setGreeting('Good Afternoon');
            else setGreeting('Good Evening');
        };

        updateGreeting();
        const timer = setInterval(updateGreeting, 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                zIndex: 1,
                pointerEvents: 'none',
                userSelect: 'none'
            }}
        >
            <h1 style={{
                fontSize: '4rem',
                fontWeight: 200,
                color: 'var(--text-primary)', // Changed to theme variable
                textShadow: '0 4px 20px rgba(0,0,0,0.1)', // Reduced shadow opacity for light theme compatibility
                marginBottom: '8px',
                letterSpacing: '-2px'
            }}>
                {greeting}, {name}.
            </h1>
            <p style={{
                fontSize: '1.2rem',
                color: 'var(--text-secondary)', // Changed to theme variable
                fontWeight: 300
            }}>
                Welcome to the Midnight OS Demo.
            </p>
        </motion.div>
    );
}
