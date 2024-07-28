// src/components/molecules/PetCard.js
import React from 'react';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import { FaHeart } from 'react-icons/fa';

const PetCard = ({ pet }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
    <div className="relative w-full h-64">
      <Image src={pet.image} alt={pet.name} className="rounded-t-lg w-full h-full" />
      <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
        <FaHeart className="text-red-500" />
      </div>
    </div>
    <div className="w-full p-4">
      <Text className="text-lg font-bold">{pet.name}</Text>
      <Text className="text-gray-600">{pet.distance} km away</Text>
    </div>
  </div>
);

export default PetCard;
