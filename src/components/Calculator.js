'use client';

import React, { useState } from 'react';

export default function Calculator() {
    const [display, setDisplay] = useState('0');
    const [operation, setOperation] = useState(null);
    const [prevValue, setPrevValue] = useState(null);
    const [newNumber, setNewNumber] = useState(true);

    const handleNum = (num) => {
        if (newNumber) {
            setDisplay(num.toString());
            setNewNumber(false);
        } else {
            setDisplay(display === '0' ? num.toString() : display + num);
        }
    };

    const handleOp = (op) => {
        setOperation(op);
        setPrevValue(parseFloat(display));
        setNewNumber(true);
    };

    const calculate = () => {
        if (!operation || prevValue === null) return;

        const current = parseFloat(display);
        let result = 0;

        switch (operation) {
            case '+': result = prevValue + current; break;
            case '-': result = prevValue - current; break;
            case '*': result = prevValue * current; break;
            case '/': result = prevValue / current; break;
        }

        // Format to prevent extremely long decimals
        if (result.toString().includes('.') && result.toString().split('.')[1].length > 8) {
            result = parseFloat(result.toFixed(8));
        }

        setDisplay(result.toString());
        setOperation(null);
        setPrevValue(null);
        setNewNumber(true);
    };

    const clear = () => {
        setDisplay('0');
        setOperation(null);
        setPrevValue(null);
        setNewNumber(true);
    };

    const toggleSign = () => {
        setDisplay((prev) => {
            if (prev === '0') return '0';
            if (prev.startsWith('-')) return prev.slice(1);
            return '-' + prev;
        });
    };

    const handlePercent = () => {
        setDisplay((prev) => (parseFloat(prev) / 100).toString());
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%', 
            padding: '16px', 
            boxSizing: 'border-box',
            gap: '12px'
        }}>
            {/* Elegant glassmorphic display screen */}
            <div style={{
                height: '76px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                fontSize: '2.4rem',
                fontWeight: 300,
                color: 'var(--text-primary)',
                padding: '12px 16px',
                fontVariantNumeric: 'tabular-nums',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
            }}>
                {display}
            </div>

            {/* Single clean grid for buttons */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '10px', 
                flex: 1 
            }}>
                <Btn onClick={clear} color="rgba(255, 95, 87, 0.2)" text="#ff5f57">C</Btn>
                <Btn onClick={toggleSign} color="var(--surface-highlight)">+/-</Btn>
                <Btn onClick={handlePercent} color="var(--surface-highlight)">%</Btn>
                <Btn onClick={() => handleOp('/')} color="var(--accent-glow)" text="var(--accent)">÷</Btn>

                <Btn onClick={() => handleNum(7)}>7</Btn>
                <Btn onClick={() => handleNum(8)}>8</Btn>
                <Btn onClick={() => handleNum(9)}>9</Btn>
                <Btn onClick={() => handleOp('*')} color="var(--accent-glow)" text="var(--accent)">×</Btn>

                <Btn onClick={() => handleNum(4)}>4</Btn>
                <Btn onClick={() => handleNum(5)}>5</Btn>
                <Btn onClick={() => handleNum(6)}>6</Btn>
                <Btn onClick={() => handleOp('-')} color="var(--accent-glow)" text="var(--accent)">-</Btn>

                <Btn onClick={() => handleNum(1)}>1</Btn>
                <Btn onClick={() => handleNum(2)}>2</Btn>
                <Btn onClick={() => handleNum(3)}>3</Btn>
                <Btn onClick={() => handleOp('+')} color="var(--accent-glow)" text="var(--accent)">+</Btn>

                <Btn onClick={() => handleNum(0)} style={{ gridColumn: 'span 2' }}>0</Btn>
                <Btn onClick={() => handleNum('.')}>.</Btn>
                <Btn onClick={calculate} color="var(--accent)" text="var(--background)">=</Btn>
            </div>
        </div>
    );
}

function Btn({ children, onClick, color, text, style }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    // Dynamic hover background styles
    const getBg = () => {
        if (isActive) {
            return color ? 'var(--accent)' : 'rgba(255, 255, 255, 0.15)';
        }
        if (isHovered) {
            return color ? `rgba(255, 255, 255, 0.2)` : 'rgba(255, 255, 255, 0.08)';
        }
        return color || 'rgba(255, 255, 255, 0.03)';
    };

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsActive(false);
            }}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            style={{
                background: getBg(),
                color: text || 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                fontSize: '1.2rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                backdropFilter: 'blur(8px)',
                transform: isActive ? 'scale(0.95)' : isHovered ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                ...style
            }}
        >
            {children}
        </button>
    );
}

