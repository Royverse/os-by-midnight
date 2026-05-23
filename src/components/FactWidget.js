'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCcw } from 'lucide-react';

const FACTS = [
    "The first computer bug was an actual moth found in a Harvard Mark II computer in 1947.",
    "The generic placeholder text 'Lorem Ipsum' is scrambled Latin based on Cicero's 'The Extremes of Good and Evil'.",
    "A day on Venus is longer than a year on Venus.",
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old.",
    "Octopuses have three hearts, nine brains, and blue blood.",
    "The shortest war in history lasted 38 minutes between Britain and Zanzibar in 1896.",
    "Bananas are berries, but strawberries are not.",
    "There are more stars in the universe than grains of sand on all the Earth's beaches.",
    "Coding was originally considered 'women's work' in the 1940s and 50s.",
    "The first domain name ever registered was Symbolics.com on March 15, 1985.",
    "The Firefox logo isn't a fox; it's a red panda.",
    "Nintendo was founded in 1889 as a playing card company.",
    "Asingle bolt of lightning contains enough energy to toast 100,000 slices of bread.",
    "Water can boil and freeze at the same time, a phenomenon known as the 'triple point'.",
    "The smell of rain has a name: Petrichor.",
    "Wombat poop is cube-shaped to prevent it from rolling away.",
    "The wood frog can freeze solid in winter and thaw out in spring, alive.",
    "Sharks existed before trees.",
    "Space smells like seared steak or hot metal, according to astronauts.",
    "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.",
    "Humans share 60% of their DNA with bananas.",
    "A cloud can weigh more than a million pounds.",
    "If you folded a piece of paper 42 times, it would reach the moon.",
    "The unicorn is the national animal of Scotland.",
    "JavaScript was created in just 10 days by Brendan Eich in 1995."
];

export default function FactWidget() {
    const [fact, setFact] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Pick a random fact on mount
        const initialIndex = Math.floor(Math.random() * FACTS.length);
        setFact(FACTS[initialIndex]);
        setIndex(initialIndex);
    }, []);

    const nextFact = () => {
        let nextIndex = index + 1;
        if (nextIndex >= FACTS.length) nextIndex = 0;
        setIndex(nextIndex);
        setFact(FACTS[nextIndex]);
    };

    return (
        <div style={{
            position: 'absolute',
            bottom: '100px', // Above taskbar
            right: '40px',
            width: '300px',
            backgroundColor: 'var(--surface)',
            backdropFilter: 'blur(20px)', // Increased blur
            borderRadius: '16px',
            padding: '24px', // Increased padding
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-lg)', // Larger shadow
            transition: 'all 0.3s ease'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Sparkles size={16} />
                    <span>Did You Know?</span>
                </div>
                <button
                    onClick={nextFact}
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
                    title="Next Fact"
                >
                    <RefreshCcw size={14} />
                </button>
            </div>

            <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: 'var(--text-primary)',
                fontWeight: 400
            }}>
                {fact}
            </p>
        </div>
    );
}
