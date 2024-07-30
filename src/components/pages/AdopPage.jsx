import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout2 from '../layouts/MainLayout2';
import PetCard from '../molecules/PetCard';
import axiosClient from '../../utils/axiosClient';
import ModalRegistrarPets from '../organisms/ModalRegistrarPets';
import ModalRegistrarUsuarios from '../organisms/ModalRegistrarUsuarios';
import LogoutButton from '../organisms/LogoutButton';
import { FaUser } from 'react-icons/fa';
import ModalAdopcion from '../organisms/ModalAdopcion'; // Importa el componente
import ModalEliminarMascota from '../organisms/ModalEliminarMascota'; // Importa el componente

const AdopPage = () => {
  const [pets, setPets] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axiosClient.get(`/mascotas/listar/${user.id}`);
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen flex flex-col bg-lightBlue font-sans"
    >
      <MainLayout2>
        <div className="flex-grow flex flex-col justify-start mt-20 items-center p-4">
          <div className="flex justify-between w-full px-40 gap-3 items-center mb-8">
            <div>
              <h1 className="text-5xl font-bold text-darkBlue">Mascotas</h1>
            </div>

            <div className='flex items-center gap-3'>
              <ModalRegistrarPets fetchPets={fetchPets} />
              <ModalRegistrarUsuarios />
              <div className='flex items-center gap-2'>
                <button className='w-12 h-12 rounded-full text-2xl bg-slate-200 flex justify-center items-center'>
                  <FaUser className='text-darkBlue' />
                </button>
                <span className='text-lg font-medium text-darkBlue'>{user && user.nombre ? user.nombre : ''}</span>
              </div>
              <LogoutButton />
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full px-40">
            {pets.map((pet) => (
              <div key={pet.id}>
                <PetCard pet={pet} />
                {pet.estado === 'disponible' && (
                  <ModalAdopcion mascotaId={pet.id} fetchAdoptions={fetchPets} />
                )}
                <ModalEliminarMascota mascotaId={pet.id} fetchPets={fetchPets} />
              </div>
            ))}
          </div>
        </div>
      </MainLayout2>
    </motion.div>
  );
};

export default AdopPage;
