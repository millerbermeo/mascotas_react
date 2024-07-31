import React from 'react';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import { FaHeart } from 'react-icons/fa';
import { ModalPets } from '../organisms/ModalPets';

const PetCard = ({ pet }) => (
  <ModalPets item={pet}>
    <div className="bg-white min-h-[410px] rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
    <div className="relative w-full h-64">
      <Image src={pet.imagen_url} alt={pet.mascota_nombre} className="w-full h-full object-cover" />
      <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
        <FaHeart className="text-red-500" />
      </div>
    </div>
    <div className="p-4">
      <Text className="text-lg font-bold text-gray-800">{pet.mascota_nombre ? pet.mascota_nombre : pet.nombre}</Text>
      <Text className="text-gray-600">{pet.edad}</Text>
      <Text className="text-gray-600">{pet.genero || 'N/A'}</Text>
      <Text className="text-gray-600">{pet.descripcion}</Text>
    </div>
  </div>
  </ModalPets>
);

export default PetCard;
