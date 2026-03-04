'use client';

import { FilterCategory } from '@/types';

const FILTERS: { key: FilterCategory; icon: string; label: string }[] = [
    { key: 'all', icon: '⭐', label: 'All Spots' },
    { key: 'heritage', icon: '🏛', label: 'Heritage & UNESCO' },
    { key: 'fort', icon: '🏰', label: 'Forts & Palaces' },
    { key: 'wildlife', icon: '🌿', label: 'Nature & Wildlife' },
    { key: 'beach', icon: '🏖', label: 'Beaches' },
    { key: 'hill-station', icon: '⛰', label: 'Hill Stations' },
    { key: 'spiritual', icon: '🕌', label: 'Spiritual' },
];

interface FilterBarProps {
    activeFilter: FilterCategory;
    onFilterChange: (f: FilterCategory) => void;
}

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
    return (
        <div className="filter-bar">
            {FILTERS.map(f => (
                <button
                    key={f.key}
                    className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
                    onClick={() => onFilterChange(f.key)}
                    title={f.label}
                    aria-label={f.label}
                >
                    {f.icon}
                </button>
            ))}
        </div>
    );
}
