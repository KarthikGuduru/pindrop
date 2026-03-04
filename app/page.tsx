'use client';

import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Spot, FilterCategory, MobileView } from '@/types';
import spotsData from '@/data/spots.json';
import FilterBar from '@/components/FilterBar';
import SpotList from '@/components/SpotList';
import SpotDetail from '@/components/SpotDetail';
import BottomNav from '@/components/BottomNav';

// Mapbox must be loaded client-side only
const SpotMap = dynamic(() => import('@/components/Map'), { ssr: false });

const spots: Spot[] = spotsData as Spot[];

export default function HomePage() {
    const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
    const [mobileView, setMobileView] = useState<MobileView>('map');

    const filteredSpots = useMemo(() => {
        if (activeFilter === 'all') return spots;
        return spots.filter(s => s.category === activeFilter);
    }, [activeFilter]);

    const handleSpotSelect = useCallback((spot: Spot) => {
        setSelectedSpot(spot);
        setMobileView('list');
    }, []);

    const handleBack = useCallback(() => {
        setSelectedSpot(null);
    }, []);

    const handleFilterChange = useCallback((f: FilterCategory) => {
        setActiveFilter(f);
        setSelectedSpot(null);
    }, []);

    return (
        <div className="app-layout">
            {/* MAP */}
            <div className="map-container">
                <SpotMap
                    spots={filteredSpots}
                    selectedSpot={selectedSpot}
                    onSpotSelect={handleSpotSelect}
                />
            </div>

            {/* SIDEBAR */}
            <aside className={`sidebar ${mobileView === 'list' ? 'mobile-list-open' : ''}`}>
                {/* Header */}
                <div className="sidebar-header">
                    <div className="brand-title">Pindrop</div>
                    <div className="brand-subtitle">
                        Discover the world's most spectacular places — heritage, wildlife, beaches &amp; beyond.
                    </div>
                </div>

                {/* Filter bar (always visible) */}
                <FilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} />

                {/* Either list or detail */}
                {selectedSpot ? (
                    <SpotDetail spot={selectedSpot} onBack={handleBack} />
                ) : (
                    <SpotList
                        spots={filteredSpots}
                        selectedSpot={selectedSpot}
                        onSpotSelect={handleSpotSelect}
                    />
                )}
            </aside>

            {/* Mobile bottom nav */}
            <BottomNav activeView={mobileView} onChange={setMobileView} />
        </div>
    );
}
