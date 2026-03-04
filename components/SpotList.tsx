'use client';

import { Spot } from '@/types';
import SpotListItem from './SpotListItem';

interface SpotListProps {
    spots: Spot[];
    selectedSpot: Spot | null;
    onSpotSelect: (spot: Spot) => void;
}

export default function SpotList({ spots, selectedSpot, onSpotSelect }: SpotListProps) {
    if (spots.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <div className="empty-text">No spots match this filter. Try a different category.</div>
            </div>
        );
    }

    return (
        <div className="spot-list">
            {spots.map(spot => (
                <SpotListItem
                    key={spot.id}
                    spot={spot}
                    isSelected={selectedSpot?.id === spot.id}
                    onClick={() => onSpotSelect(spot)}
                />
            ))}
        </div>
    );
}
