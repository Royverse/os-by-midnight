'use client';

import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: '24px', color: 'var(--text-primary)' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '1.2rem' }}>System Settings</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Appearance Section */}
        <section>
          <h3 style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Appearance
          </h3>

          <div style={{
            backgroundColor: 'var(--surface-highlight)',
            borderRadius: '8px',
            padding: '4px',
            display: 'inline-flex',
            gap: '4px'
          }}>
            <Button active={theme === 'dark'} onClick={() => toggleTheme('dark')}>
              <Moon size={16} /> Dark
            </Button>
            <Button active={theme === 'light'} onClick={() => toggleTheme('light')}>
              <Sun size={16} /> Light
            </Button>
          </div>
        </section>

        {/* System Info */}
        <section>
          <h3 style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            About
          </h3>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid var(--border)'
          }}>
            <p><strong>OS by Midnight</strong></p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
              Version 1.0.0 (Alpha)
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function Button({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'var(--surface)' : 'transparent',
        border: 'none',
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.9rem',
        boxShadow: active ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
        transition: 'all 0.2s'
      }}>
      {children}
    </button>
  )
}
