'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

const WindowContext = createContext();

export const useWindowManager = () => {
    const context = useContext(WindowContext);
    if (!context) {
        throw new Error('useWindowManager must be used within a WindowManagerProvider');
    }
    return context;
};

export const WindowManagerProvider = ({ children }) => {
    const [windows, setWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);

    const openWindow = useCallback((appId, component, title, initialProps = {}) => {
        setWindows((prev) => {
            const existing = prev.find((w) => w.id === appId);
            if (existing) {
                // Bring to front if already open
                setActiveWindowId(appId);
                return prev.map(w => w.id === appId ? { ...w, minimized: false } : w);
            }

            const newWindow = {
                id: appId,
                title,
                component,
                props: initialProps,
                minimized: false,
                isMaximized: false,
                zIndex: prev.length + 1,
                position: { x: 100 + (prev.length * 20), y: 100 + (prev.length * 20) }, // Cascade
                size: { width: 600, height: 450 },
            };

            setActiveWindowId(appId);
            return [...prev, newWindow];
        });
    }, []);

    const closeWindow = useCallback((id) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const minimizeWindow = useCallback((id) => {
        setWindows((prev) => prev.map((w) =>
            w.id === id ? { ...w, minimized: true } : w
        ));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const restoreWindow = useCallback((id) => {
        setWindows((prev) => prev.map((w) =>
            w.id === id ? { ...w, minimized: false } : w
        ));
        focusWindow(id);
    }, []);

    const focusWindow = useCallback((id) => {
        setActiveWindowId(id);
        setWindows((prev) => {
            // Just ensuring it's not minimized is enough, z-index logic can be managed in render or state shift
            // For simple stacking, we can just move it to end or track activeId
            return prev;
        });
    }, []);

    const updateWindowPosition = useCallback((id, position) => {
        setWindows((prev) => prev.map(w => w.id === id ? { ...w, position } : w));
    }, []);

    const updateWindowSize = useCallback((id, size) => {
        setWindows((prev) => prev.map(w => w.id === id ? { ...w, size } : w));
    }, []);

    const value = {
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        restoreWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize
    };

    return (
        <WindowContext.Provider value={value}>
            {children}
        </WindowContext.Provider>
    );
};
