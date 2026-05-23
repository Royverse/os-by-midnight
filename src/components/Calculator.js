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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' }}>
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                fontSize: '2.5rem',
                fontWeight: 300,
                color: 'var(--text-primary)',
                padding: '16px',
                marginBottom: '16px',
                fontVariantNumeric: 'tabular-nums'
            }}>
                {display}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', flex: 2 }}>
                <Btn onClick={clear} color="var(--accent)">AC</Btn>
                <Btn onClick={() => handleOp('/')} op>/</Btn>
                <Btn onClick={() => handleOp('*')} op>*</Btn>
                <Btn onClick={() => handleOp('-')} op>-</Btn>

                <Btn onClick={() => handleNum(7)}>7</Btn>
                <Btn onClick={() => handleNum(8)}>8</Btn>
                <Btn onClick={() => handleNum(9)}>9</Btn>
                <Btn onClick={() => handleOp('+')} op>+</Btn>

                <Btn onClick={() => handleNum(4)}>4</Btn>
                <Btn onClick={() => handleNum(5)}>5</Btn>
                <Btn onClick={() => handleNum(6)}>6</Btn>
                <Btn onClick={calculate} span={2} color="var(--accent)" text="var(--background)">=</Btn>

                <Btn onClick={() => handleNum(1)}>1</Btn>
                <Btn onClick={() => handleNum(2)}>2</Btn>
                <Btn onClick={() => handleNum(3)}>3</Btn>
                {/* Span fix above causes shift, let's keep grid simple */}

                {/* Row 4 */}
                {/* Re-doing layout slightly for standard grid */}
            </div>

            {/* Simplified grid logic manually to ensure fit */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                <Btn onClick={clear} color="#ff5f57">C</Btn>
                <Btn onClick={() => { }} >+/-</Btn>
                <Btn onClick={() => { }} >%</Btn>
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
                <Btn onClick={calculate} color="var(--accent)" text="#000">=</Btn>
            </div>
        </div>
    );
}

function Btn({ children, onClick, color, text, style }) {
    return (
        <button
            onClick={onClick}
            style={{
                background: color || 'var(--surface-highlight)',
                color: text || 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...style
            }}
        >
            {children}
        </button>
    )
}
