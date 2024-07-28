// src/components/organisms/Slider.js
import React from 'react';
import CardSlider from '../molecules/CardSlider';

const Slider = ({ cards }) => (
  <div className="w-full p-4 bg-gray-100 flex justify-center items-center">
    <CardSlider cards={cards} />
  </div>
);

export default Slider;
