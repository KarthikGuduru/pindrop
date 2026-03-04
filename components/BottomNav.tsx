'use client';

import { MobileView } from '@/types';

interface BottomNavProps {
    activeView: MobileView;
    onChange: (v: MobileView) => void;
}

export default function BottomNav({ activeView, onChange }: BottomNavProps) {
    return (
        <nav className="bottom-nav" aria-label="Mobile navigation">
            <div className="bottom-nav-inner">
                <button
                    className={`bottom-nav-btn ${activeView === 'map' ? 'active' : ''}`}
                    onClick={() => onChange('map')}
                    id="mobile-nav-map"
                >
                    <span className="bottom-nav-icon">🗺</span>
                    Map
                </button>
                <button
                    className={`bottom-nav-btn ${activeView === 'list' ? 'active' : ''}`}
                    onClick={() => onChange('list')}
                    id="mobile-nav-list"
                >
                    <span className="bottom-nav-icon">☰</span>
                    List
                </button>
            </div>
        </nav>
    );
}
