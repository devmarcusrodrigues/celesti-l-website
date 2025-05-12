import React from 'react';

function CharacterDetails({ character, onClose }) {
    if (!character) return null;
    return (
        <div className="character-details">
            <button onClick={onClose}>Close</button>
            <h2>{character.name}</h2>
            <p>{character.description}</p>
            {/* ...other character details... */}
        </div>
    );
}

export default CharacterDetails;