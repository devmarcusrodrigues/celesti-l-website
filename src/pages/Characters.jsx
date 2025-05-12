import React, { useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import CharacterDetails from '../components/CharacterDetails';

function CharactersPage({ characters }) {
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    return (
        <div>
            <div className="character-list">
                {characters.map((char) => (
                    <CharacterCard
                        key={char.id}
                        character={char}
                        onViewDetails={setSelectedCharacter}
                    />
                ))}
            </div>
            <CharacterDetails
                character={selectedCharacter}
                onClose={() => setSelectedCharacter(null)}
            />
        </div>
    );
}

export default CharactersPage;