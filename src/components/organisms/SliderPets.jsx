import React, { useEffect, useState } from 'react';

const SliderPets = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      image: 'slider1.jpeg',
      title: 'Hello world',
      description: 'Carousel',
    },
    {
      id: 2,
      image: 'slider2.jpeg',
      title: 'Hello world',
      description: 'Carousel',
    },
    {
      id: 3,
      image: 'slider3.jpeg',
      title: 'Hello world',
      description: 'Carousel',
    },
    
    // Agrega más imágenes aquí si es necesario
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full 2xl:w-[80%] mx-auto">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`w-full mx-auto transition-opacity duration-500 ${currentSlide === index ? 'opacity-100' : 'opacity-0'} ${
            currentSlide === index ? 'block' : 'hidden'
          }`}
        >
          <div
            className="bg-cover bg-center h-auto text-white py-24 px-10 w-full"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="md:w-1/2">
              <p className="font-bold text-sm uppercase">Services</p>
              <p className="text-3xl font-bold">{slide.title}</p>
              <p className="text-2xl mb-10 leading-none">{slide.description}</p>
              <a href="#" className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">
                Contact us
              </a>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between w-12 gap-2 pt-5 mx-auto pb-2 ">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => handleSlideChange(index)}
            className={`rounded-full w-4 p-2 ${currentSlide === index ? 'bg-purple-800' : 'bg-purple-400'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default SliderPets;
