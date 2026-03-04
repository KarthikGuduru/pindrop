'use client';

import { useState } from 'react';
import { Spot } from '@/types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

type TabKey = 'summary' | 'basics' | 'fees' | 'stay' | 'permits';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ACTIVITY_ICONS: Record<string, string> = {
    'Photography': '📸', 'Heritage Walk': '🚶', 'Sunrise Viewing': '🌅',
    'Archaeology': '🏺', 'Boat Ride': '⛵', 'Ganga Aarti': '🪔',
    'Temple Visits': '🛕', 'Cultural Walk': '🎭', 'Prayer': '🙏',
    'Langar (Community Kitchen)': '🍽', 'Night Photography': '🌙', 'Desert Safari': '🐪',
    'Camel Ride': '🐫', 'Tiger Safari': '🐅', 'Bird Watching': '🦅',
    'Jeep Safari': '🚙', 'Trekking': '🥾', 'River Rafting': '🚣',
    'Skiing': '⛷', 'Paragliding': '🪂', 'Tea Garden Tours': '🍵',
    'Toy Train Ride': '🚂', 'Beach': '🏖', 'Water Sports': '🏄',
    'Scuba Diving': '🤿', 'Snorkelling': '🐟', 'Yoga': '🧘',
    'Museum Visit': '🏛', 'Cycling': '🚲', 'Elephant Safari': '🐘',
    'Rock Climbing': '🧗', 'Sunset Views': '🌄', 'Botanical Exploration': '🌸',
    'Cave Exploration': '🕯', 'Art History': '🎨', 'Nilgiri Railway': '🚂',
    'Tea Factory Tour': '☕', 'Boat Safari': '🚤', 'Mangrove Exploration': '🌳',
    'Corbett Museum': '🏛', 'Fort Walk': '🏰', 'Dance Festival': '💃',
};

interface InfoTabsProps { spot: Spot; }

export default function InfoTabs({ spot }: InfoTabsProps) {
    const [activeTab, setActiveTab] = useState<TabKey>('summary');

    const TABS: { key: TabKey; label: string }[] = [
        { key: 'summary', label: 'Summary' },
        { key: 'basics', label: 'Basics' },
        { key: 'fees', label: 'Fees' },
        { key: 'stay', label: 'Stay' },
        { key: 'permits', label: 'Permits' },
    ];

    const chartData = spot.basics.trafficData.map((v, i) => ({ month: MONTHS[i], visitors: v }));

    return (
        <div className="info-tabs">
            <div className="tab-bar no-scrollbar">
                {TABS.map(t => (
                    <button
                        key={t.key}
                        className={`tab-btn ${activeTab === t.key ? 'active' : ''}`}
                        onClick={() => setActiveTab(t.key)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {/* SUMMARY TAB */}
                {activeTab === 'summary' && (
                    <>
                        <div className="summary-grid">
                            <div className="summary-stat">
                                <div className="summary-stat-label">Best Time to Visit</div>
                                <div className="summary-stat-value">{spot.summary.bestTimeToVisit}</div>
                            </div>
                            <div className="summary-stat">
                                <div className="summary-stat-label">UNESCO Listed</div>
                                <div className="summary-stat-value">{spot.summary.unescoListed ? '✅ Yes' : '—'}</div>
                            </div>
                        </div>

                        <div style={{ marginBottom: 10 }}>
                            <div className="summary-stat-label" style={{ marginBottom: 6, fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>Activities</div>
                            <div className="activity-grid">
                                {spot.summary.activities.slice(0, 4).map(act => (
                                    <div key={act} className="activity-card">
                                        <span className="activity-icon">{ACTIVITY_ICONS[act] || '✨'}</span>
                                        <span className="activity-label">{act}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="attribute-grid">
                            <div className="attribute-card">
                                <span style={{ fontSize: '1.1rem' }}>{spot.summary.familyFriendly ? '👨‍👩‍👧' : '🚫'}</span>
                                <div className="attribute-info">
                                    <div className="attribute-label">Family Friendly</div>
                                    <div className="attribute-value">{spot.summary.familyFriendly ? 'Yes' : 'No'}</div>
                                </div>
                            </div>
                            <div className="attribute-card">
                                <span style={{ fontSize: '1.1rem' }}>{spot.summary.photographyAllowed ? '📸' : '🚫'}</span>
                                <div className="attribute-info">
                                    <div className="attribute-label">Photography</div>
                                    <div className="attribute-value">{spot.summary.photographyAllowed ? 'Allowed' : 'Prohibited'}</div>
                                </div>
                            </div>
                            <div className="attribute-card">
                                <span style={{ fontSize: '1.1rem' }}>{spot.summary.beginnerFriendly ? '✅' : '⚠️'}</span>
                                <div className="attribute-info">
                                    <div className="attribute-label">Beginner Friendly</div>
                                    <div className="attribute-value">{spot.summary.beginnerFriendly ? 'Easy' : 'Challenging'}</div>
                                </div>
                            </div>
                            <div className="attribute-card">
                                <span style={{ fontSize: '1.1rem' }}>🎫</span>
                                <div className="attribute-info">
                                    <div className="attribute-label">Permit Required</div>
                                    <div className="attribute-value">{spot.summary.permitRequired}</div>
                                </div>
                            </div>
                        </div>

                        <div className="verified-note" style={{ marginTop: 12 }}>
                            Verified: Ministry of Tourism, India
                        </div>
                    </>
                )}

                {/* BASICS TAB */}
                {activeTab === 'basics' && (
                    <div className="chart-section">
                        <div className="chart-title">
                            <span>📈</span> Seasonal Visitor Traffic
                        </div>
                        <ResponsiveContainer width="100%" height={150}>
                            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--red)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--red)" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" tick={{ fontSize: 9, fill: 'var(--muted)' }} interval={1} />
                                <YAxis tick={{ fontSize: 9, fill: 'var(--muted)' }} />
                                <Tooltip
                                    contentStyle={{ fontSize: '0.7rem', border: '1px solid var(--sand-dark)', background: 'var(--cream)' }}
                                    labelStyle={{ fontWeight: 700, color: 'var(--navy)' }}
                                />
                                <Area type="monotone" dataKey="visitors" stroke="var(--red)" strokeWidth={2} fill="url(#trafficGrad)" dot={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                        <p className="chart-footnote">* Traffic index based on historical visitor patterns. Annual visitors: {spot.basics.visitorsPerYear}.</p>
                        <div className="verified-note" style={{ marginTop: 12 }}>Verified: India Tourism Statistics</div>
                    </div>
                )}

                {/* ENTRY FEES TAB */}
                {activeTab === 'fees' && (
                    <>
                        <div className="info-block">
                            <div className="info-block-label">Entry Fees</div>
                            <div className="info-block-value">
                                <div className="fee-row"><span className="fee-type">Indian Citizens</span><span className="fee-amount">{spot.entryFees.indian}</span></div>
                                <div className="fee-row"><span className="fee-type">Foreign Nationals</span><span className="fee-amount">{spot.entryFees.foreign}</span></div>
                            </div>
                        </div>
                        {spot.entryFees.notes && (
                            <div className="info-block">
                                <div className="info-block-label">Notes</div>
                                <div className="info-block-value">{spot.entryFees.notes}</div>
                            </div>
                        )}
                        <div className="verified-note">Verified: Archaeological Survey of India</div>
                    </>
                )}

                {/* STAY OPTIONS TAB */}
                {activeTab === 'stay' && (
                    <>
                        <div className="info-block">
                            <div className="info-block-label">Accommodation</div>
                            <div className="info-block-value">{spot.stayOptions}</div>
                        </div>
                        <div className="verified-note">Verified: India Tourism Board</div>
                    </>
                )}

                {/* PERMITS TAB */}
                {activeTab === 'permits' && (
                    <>
                        <div className="info-block">
                            <div className="info-block-label">Permit Information</div>
                            <div className="info-block-value">{spot.permits}</div>
                        </div>
                        <div className="verified-note">Verified: Ministry of Tourism, India</div>
                    </>
                )}
            </div>
        </div>
    );
}
