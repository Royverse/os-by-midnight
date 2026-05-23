'use client';

import React, { useState, useEffect } from 'react';
import { WindowManagerProvider, useWindowManager } from '../context/WindowManager';
import { useTheme } from '../context/ThemeContext';
import Taskbar from './Taskbar';
import WindowFrame from './WindowFrame';
import Greeting from './Greeting';
import FactWidget from './FactWidget';
import QuoteWidget from './QuoteWidget';
import { AnimatePresence, motion } from 'framer-motion';

const DynamicBackground = () => {
    const { timeProgress, theme } = useTheme();

    // Calculate sun/moon position or gradient angle based on time
    // 0.0 = midnight, 0.5 = noon, 1.0 = midnight

    // Simplified cycle for "feeling the motion"
    // We can shift the gradient center or rotation
    const rotation = (timeProgress * 360).toFixed(0);
    const gradientPos = (timeProgress * 100).toFixed(0);

    return (
        <motion.div
            className="desktop-background"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                // We overlay a dynamic gradient on top of the CSS base
                background: theme === 'light'
                    ? `linear-gradient(${180 + (timeProgress * 40 - 20)}deg, #87ceeb 0%, #fdf6e3 ${50 + (timeProgress * 20)}%)`
                    : `radial-gradient(circle at 50% ${120 - (Math.sin(timeProgress * Math.PI) * 50)}%, #2a2d3d 0%, #0f111a 70%)`
            }}
            animate={{
                // Optional: smooth interpolation if timeProgress changes infrequently
            }}
            transition={{ duration: 1, ease: 'linear' }}
        />
    );
};

const ParticleLayer = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Generate random particles (leaves)
    const particles = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        y: Math.random() * 100, // Random vertical start
        size: Math.random() * 12 + 6, // Leaf size
        duration: Math.random() * 15 + 20, // Slow drift
        delay: Math.random() * 20, // Staggered start
        rotation: Math.random() * 360,
        type: Math.random() > 0.5 ? 'round' : 'pointy'
    }));

    const getLeafColor = (currentTheme) => {
        if (currentTheme === 'light') {
            // Earthy/Green/Gold for Light Mode
            const colors = [
                'rgba(107, 142, 35, 0.4)',  // Olive Drab
                'rgba(85, 107, 47, 0.3)',   // Dark Olive
                'rgba(218, 165, 32, 0.3)',  // Goldenrod
                'rgba(143, 188, 143, 0.4)'  // Dark Sea Green
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        } else {
            // Ethereal Blue/Silver for Dark Mode
            const colors = [
                'rgba(137, 180, 250, 0.15)', // Light Blue
                'rgba(255, 255, 255, 0.1)',  // White
                'rgba(148, 163, 184, 0.2)',  // Slate
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    };

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        borderRadius: p.type === 'round' ? '50% 0 50% 0' : '0 50% 0 50%',
                        backgroundColor: getLeafColor(theme),
                        filter: 'blur(0.5px)',
                    }}
                    initial={{ x: '-10vw', opacity: 0 }}
                    animate={{
                        x: ['-10vw', '110vw'],
                        y: [`${p.y}%`, `${p.y + (Math.random() * 20 - 10)}%`], // Gentle vertical sway
                        rotate: [p.rotation, p.rotation + 360],
                        opacity: [0, 0.8, 0.8, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
};

const DesktopContent = () => {
    const { windows } = useWindowManager();

    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
        }}>
            <DynamicBackground />
            <ParticleLayer />

            {/* Desktop Widgets Layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                {/* Enable pointer events only for the widgets themselves */}
                <div style={{ pointerEvents: 'auto', width: '100%', height: '100%', position: 'relative' }}>
                    <Greeting />
                    <FactWidget />
                    <QuoteWidget />
                </div>
            </div>

            {/* Windows Layer */}
            <AnimatePresence>
                {windows.map((win) => (
                    <WindowFrame key={win.id} window={win} />
                ))}
            </AnimatePresence>

            {/* Taskbar Layer */}
            <Taskbar />
        </div>
    );
};


export default function Desktop() {
    return (
        <WindowManagerProvider>
            <DesktopContent />
        </WindowManagerProvider>
    );
}
