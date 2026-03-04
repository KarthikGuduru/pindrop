'use client';

interface FieldNotesPopupProps {
    name: string;
    text: string;
    onViewDetail: () => void;
}

export default function FieldNotesPopup({ name, text, onViewDetail }: FieldNotesPopupProps) {
    return (
        <div className="field-notes-popup">
            <div className="field-notes-label">Field Notes</div>
            <div className="field-notes-name">{name}</div>
            <p className="field-notes-text" style={{ marginBottom: 10 }}>
                {text.length > 140 ? text.slice(0, 140) + '…' : text}
            </p>
            <button
                onClick={onViewDetail}
                style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--red)',
                    padding: 0,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                View Details →
            </button>
        </div>
    );
}
