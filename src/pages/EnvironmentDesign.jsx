import React from 'react';
import observatoryArt from '../assets/environment/observatory.jpg';

const EnvironmentDesign = () => {
  return (
    <div>
      <h1>Environment Design</h1>
      <section>
        <h2>Observatory</h2>
        <img src={observatoryArt} alt="Observatory Concept Art" />
      </section>
    </div>
  );
};

export default EnvironmentDesign;