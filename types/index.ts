export interface SpotScores {
    accessibility: number;
    heritageValue: number;
    scenery: number;
    culturalRichness: number;
    crowdLevel: number;
}

export interface SpotSummary {
    bestTimeToVisit: string;
    unescoListed: boolean;
    activities: string[];
    familyFriendly: boolean;
    photographyAllowed: boolean;
    beginnerFriendly: boolean;
    permitRequired: string;
}

export interface SpotBasics {
    visitorsPerYear: string;
    trafficData: number[];
}

export interface SpotEntryFees {
    indian: string;
    foreign: string;
    notes: string;
}

export interface Spot {
    id: string;
    name: string;
    state: string;
    region: string;
    category: string;
    coordinates: [number, number];
    isScore: number;
    scores: SpotScores;
    heroImage: string;
    heroCaption: string;
    fieldNotes: string;
    summary: SpotSummary;
    basics: SpotBasics;
    entryFees: SpotEntryFees;
    stayOptions: string;
    permits: string;
}

export type FilterCategory = 'all' | 'heritage' | 'fort' | 'wildlife' | 'hill-station' | 'beach' | 'spiritual';
export type MobileView = 'map' | 'list';
