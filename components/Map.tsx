'use client';

import { useEffect, useRef } from 'react';
import { Spot } from '@/types';

interface SpotMapProps {
    spots: Spot[];
    selectedSpot: Spot | null;
    onSpotSelect: (spot: Spot) => void;
}

export default function SpotMap({ spots, selectedSpot, onSpotSelect }: SpotMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const markersRef = useRef<Record<string, any>>({});
    const popupsRef = useRef<Record<string, any>>({});

    // Init Leaflet map
    useEffect(() => {
        if (typeof window === 'undefined' || !mapContainer.current || mapRef.current) return;

        // Dynamic import ensures no SSR issues
        import('leaflet').then((L) => {
            // Fix default marker icon paths in Next.js
            const DefaultIcon = L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
            });
            L.Marker.prototype.options.icon = DefaultIcon;

            const map = L.map(mapContainer.current!, {
                center: [20, 0], // world centre
                zoom: 2.5,
                zoomControl: false,
            });

            // CartoDB Voyager — clean, modern, and completely free without API keys
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            }).addTo(map);

            // Custom zoom control
            L.control.zoom({ position: 'topleft' }).addTo(map);

            mapRef.current = map;

            // Add markers after map init
            addMarkers(L, map, spots, onSpotSelect);
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
                markersRef.current = {};
                popupsRef.current = {};
            }
            // Clear Leaflet's internal ID so it can re-initialise on next mount
            if (mapContainer.current) {
                // @ts-expect-error _leaflet_id is an internal Leaflet property
                delete mapContainer.current._leaflet_id;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update markers when spots change
    useEffect(() => {
        if (!mapRef.current) return;
        import('leaflet').then((L) => {
            // Remove old markers
            Object.values(markersRef.current).forEach((m: any) => m.remove());
            markersRef.current = {};
            addMarkers(L, mapRef.current, spots, onSpotSelect);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spots]);

    // Fly to selected
    useEffect(() => {
        if (!mapRef.current || !selectedSpot) return;
        const map = mapRef.current;
        map.flyTo([selectedSpot.coordinates[1], selectedSpot.coordinates[0]], Math.max(map.getZoom(), 7), {
            duration: 1.2,
        });

        // Highlight selected marker
        Object.entries(markersRef.current).forEach(([id, marker]: [string, any]) => {
            const el = marker.getElement();
            if (!el) return;
            if (id === selectedSpot.id) {
                el.style.transform += ' scale(1.5)';
                el.style.zIndex = '1000';
            } else {
                el.style.transform = el.style.transform.replace(' scale(1.5)', '');
                el.style.zIndex = '';
            }
        });
    }, [selectedSpot]);

    function addMarkers(L: any, map: any, spots: Spot[], onSelect: (s: Spot) => void) {
        spots.forEach((spot) => {
            // Custom red circle div icon
            const icon = L.divIcon({
                className: '',
                html: `
          <div style="position:relative;width:30px;height:30px;display:flex;align-items:center;justify-content:center;">
            <div class="map-marker-pulse"></div>
            <div class="map-marker"></div>
          </div>
        `,
                iconSize: [30, 30],
                iconAnchor: [15, 15],
            });

            const marker = L.marker([spot.coordinates[1], spot.coordinates[0]], { icon })
                .addTo(map);

            // Popup
            const popupContent = `
        <div class="field-notes-popup">
          <div class="field-notes-label">Field Notes</div>
          <div class="field-notes-name">${spot.name}</div>
          <p class="field-notes-text">${spot.fieldNotes.slice(0, 140)}…</p>
          <button 
            id="fn-view-${spot.id}" 
            style="font-size:0.65rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--red);background:none;border:none;cursor:pointer;padding:0;margin-top:4px;"
          >
            View Details →
          </button>
        </div>
      `;

            const popup = L.popup({ offset: [0, -8], maxWidth: 270 }).setContent(popupContent);

            marker.on('click', () => {
                map.openPopup(popup.setLatLng([spot.coordinates[1], spot.coordinates[0]]));
                onSelect(spot);
            });

            // Wire the popup button after it opens
            map.on('popupopen', (e: any) => {
                if (e.popup !== popup) return;
                const btn = document.getElementById(`fn-view-${spot.id}`);
                if (btn) btn.onclick = () => { onSelect(spot); map.closePopup(); };
            });

            markersRef.current[spot.id] = marker;
        });
    }

    return (
        <>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                crossOrigin=""
            />
            <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        </>
    );
}
