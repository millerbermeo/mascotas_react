// src/components/molecules/CardSlider.js
import React, { useState } from 'react';
import Card from '../atoms/Card';
import Button from '../atoms/Button';

const CardSlider = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : cards.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < cards.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="flex flex-col items-center">
      <Card title={cards[currentIndex].title} content={cards[currentIndex].content} />
      <div className="mt-4 flex space-x-4">
        <Button onClick={handlePrevious}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default CardSlider;
