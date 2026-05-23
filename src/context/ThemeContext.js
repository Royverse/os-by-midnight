'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    const [isAutoMode, setIsAutoMode] = useState(true);
    const [timeProgress, setTimeProgress] = useState(0); // 0.0 to 1.0 representing 24h cycle

    // Day/Night Cycle Logic
    useEffect(() => {
        if (!isAutoMode) return;

        const checkTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();

            // Calculate progress through the day (0.0 - 1.0)
            const totalMinutes = hours * 60 + minutes;
            const progress = totalMinutes / (24 * 60);
            setTimeProgress(progress);

            // Simple Day/Night logic: 6 AM to 6 PM is Day
            // In a real app, could be more complex with sunrise/sunset calc
            const isDay = hours >= 6 && hours < 18;
            const newTheme = isDay ? 'light' : 'dark';

            if (newTheme !== theme) {
                setTheme(newTheme);
                document.documentElement.setAttribute('data-theme', newTheme);
            }
        };

        checkTime(); // Initial check
        const interval = setInterval(checkTime, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [isAutoMode, theme]);

    // Handle manual toggle
    const toggleTheme = () => {
        setIsAutoMode(false); // Disable auto mode if user manually toggles
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('midnight-theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const toggleAutoMode = () => {
        setIsAutoMode(prev => !prev);
    };

    // Initial load for manual preference if not auto
    useEffect(() => {
        const saved = localStorage.getItem('midnight-theme');
        if (saved && !isAutoMode) {
            setTheme(saved);
            document.documentElement.setAttribute('data-theme', saved);
        }
    }, [isAutoMode]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isAutoMode, toggleAutoMode, timeProgress }}>
            {children}
        </ThemeContext.Provider>
    );
};
