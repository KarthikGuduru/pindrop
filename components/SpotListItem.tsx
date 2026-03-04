'use client';

import { Spot } from '@/types';

const CATEGORY_ICONS: Record<string, string> = {
    heritage: '🏛',
    fort: '🏰',
    wildlife: '🌿',
    'hill-station': '⛰',
    beach: '🏖',
    spiritual: '🕌',
};

interface SpotListItemProps {
    spot: Spot;
    isSelected: boolean;
    onClick: () => void;
}

export default function SpotListItem({ spot, isSelected, onClick }: SpotListItemProps) {
    return (
        <div
            className={`spot-list-item ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
            id={`spot-item-${spot.id}`}
        >
            <span className="spot-item-icon">{CATEGORY_ICONS[spot.category] || '📍'}</span>
            <div className="spot-item-info">
                <div className="spot-item-name">{spot.name}</div>
                <div className="spot-item-meta">{spot.state}, India</div>
            </div>
            <span className="is-score-badge">IS {spot.isScore.toFixed(1)}</span>
        </div>
    );
}
