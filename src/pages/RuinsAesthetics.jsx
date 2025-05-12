import React from 'react';
import ancientObservatoryArt from '../assets/ruins/ancient_observatory.jpg';

const RuinsAesthetics = () => {
  return (
    <div>
      <h1>Ruins Aesthetics</h1>
      <section>
        <h2>Ancient Observatory</h2>
        <img src={ancientObservatoryArt} alt="Ancient Observatory Art" />
        <p>Description of the Ancient Observatory...</p>
      </section>
      {/* Other sections */}
    </div>
  );
};

export default RuinsAesthetics;