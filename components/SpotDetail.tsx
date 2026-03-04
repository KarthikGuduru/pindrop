'use client';

import { useState } from 'react';
import { Spot } from '@/types';
import InfoTabs from './InfoTabs';

const CATEGORY_ICONS: Record<string, string> = {
    heritage: '🏛', fort: '🏰', wildlife: '🌿',
    'hill-station': '⛰', beach: '🏖', spiritual: '🕌',
};

const SCORE_LABELS: { key: keyof Spot['scores']; label: string }[] = [
    { key: 'accessibility', label: 'Accessibility' },
    { key: 'heritageValue', label: 'Heritage Value' },
    { key: 'scenery', label: 'Scenery' },
    { key: 'culturalRichness', label: 'Cultural Richness' },
    { key: 'crowdLevel', label: 'Serenity / Low Crowds' },
];

interface SpotDetailProps {
    spot: Spot;
    onBack: () => void;
}

export default function SpotDetail({ spot, onBack }: SpotDetailProps) {
    const [visited, setVisited] = useState(false);

    return (
        <div className="spot-detail">
            <button className="back-btn" onClick={onBack}>
                ← Back to list
            </button>

            <div className="detail-header">
                <div className="detail-top-row">
                    <div className="detail-icon-name">
                        <span className="detail-cat-icon">{CATEGORY_ICONS[spot.category] || '📍'}</span>
                        <span className="detail-name">{spot.name}</span>
                    </div>
                    <span className="detail-score-badge">IS {spot.isScore.toFixed(1)}</span>
                </div>
                <div className="detail-location">{spot.state}, India</div>
                <button
                    className={`visited-btn ${visited ? 'active' : ''}`}
                    onClick={() => setVisited(v => !v)}
                >
                    {visited ? '✓ Visited' : 'Mark as Visited'}
                </button>
            </div>

            <div className="scores-section">
                {SCORE_LABELS.map(({ key, label }) => (
                    <div key={key} className="score-row">
                        <span className="score-label">{label}</span>
                        <span className="score-value">{spot.scores[key].toFixed(1)}</span>
                    </div>
                ))}
            </div>

            <div className="divider" />

            <div style={{ padding: '12px 0' }}>
                <div className="hero-image-wrap">
                    <img
                        src={spot.heroImage}
                        alt={spot.heroCaption}
                        loading="lazy"
                        onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const wrap = target.parentElement;
                            if (wrap) {
                                wrap.style.background = 'linear-gradient(135deg, var(--sand-mid) 0%, var(--sand-dark) 100%)';
                                wrap.style.display = 'flex';
                                wrap.style.alignItems = 'center';
                                wrap.style.justifyContent = 'center';
                                wrap.innerHTML = `<span style="font-size:2.5rem;opacity:0.4">${{ heritage: '🏛', fort: '🏰', wildlife: '🌿', 'hill-station': '⛰', beach: '🏖', spiritual: '🕌' }[spot.category] || '📍'
                                    }</span><div class="hero-caption">${spot.heroCaption}</div>`;
                            }
                        }}
                    />
                    <div className="hero-caption">{spot.heroCaption}</div>
                </div>
            </div>

            <InfoTabs spot={spot} />
        </div>
    );
}
