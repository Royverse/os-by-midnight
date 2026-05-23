'use client';

import React, { useState, useEffect } from 'react';
import { Quote, RefreshCcw } from 'lucide-react';

const QUOTES = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "It’s not a bug; it’s an undocumented feature.", author: "Anonymous" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Code represents the ultimate power of man to command the machine.", author: "Unknown" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Clean code always looks like it was written by someone who cares.", author: "Robert C. Martin" },
    { text: "Of course it works on my machine.", author: "Every Developer" },
    { text: "Software is a great combination between artistry and engineering.", author: "Bill Gates" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
    { text: "Java is to JavaScript what car is to Carpet.", author: "Chris Heilmann" },
    { text: "Knowledge is power.", author: "Francis Bacon" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "Fix the cause, not the symptom.", author: "Steve Maguire" },
    { text: "Optimism is an occupational hazard of programming.", author: "Kent Beck" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { text: "A ship in port is safe, but that is not what ships are built for.", author: "Grace Hopper" },
    { text: "The details are not the details. They make the design.", author: "Charles Eames" },
    { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
    { text: "What we think, we become.", author: "Buddha" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
];

export default function QuoteWidget() {
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [index, setIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const initialIndex = Math.floor(Math.random() * QUOTES.length);
        setQuote(QUOTES[initialIndex]);
        setIndex(initialIndex);
    }, []);

    const nextQuote = () => {
        let nextIndex = index + 1;
        if (nextIndex >= QUOTES.length) nextIndex = 0;
        setIndex(nextIndex);
        setQuote(QUOTES[nextIndex]);
    };

    if (!mounted) return null;

    return (
        <div style={{
            position: 'absolute',
            bottom: '100px', // Align with FactWidget height-wise
            left: '40px',   // Opposite side of FactWidget
            width: '320px',
            backgroundColor: 'var(--surface)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-lg)',
            transition: 'all 0.3s ease',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Quote size={16} />
                    <span>Daily Inspiration</span>
                </div>
                <button
                    onClick={nextQuote}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '50%',
                        display: 'flex',
                        transition: 'transform 0.2s, color 0.2s'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.transform = 'rotate(180deg)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.transform = 'rotate(0deg)';
                    }}
                    title="New Quote"
                >
                    <RefreshCcw size={14} />
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    fontFamily: 'serif',
                    fontStyle: 'italic',
                    color: 'var(--text-primary)',
                    margin: 0
                }}>
                    "{quote.text}"
                </p>
                <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                    textAlign: 'right',
                    margin: 0,
                    opacity: 0.8
                }}>
                    — {quote.author}
                </p>
            </div>
        </div>
    );
}
