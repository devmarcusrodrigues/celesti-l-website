import React from 'react';

function CharacterCard({ character, onViewDetails }) {
    return (
        <div className="character-card">
            <h2>{character.name}</h2>
            <p>{character.description}</p>
            <button onClick={() => onViewDetails(character)}>
                View Details
            </button>
        </div>
    );
}

export default CharacterCard;