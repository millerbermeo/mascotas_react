import React from 'react';
import axiosClient from '../../utils/axiosClient';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaCheckCircle } from "react-icons/fa";

const BotonDisponible = ({ id, fetchPets }) => {
  const MySwal = withReactContent(Swal);

  const handleMakeAvailable = async () => {
    try {
      await axiosClient.put(`/mascotas/${id}/available`);
      MySwal.fire({
        title: '¡Mascota Disponible!',
        text: 'La mascota está ahora disponible.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      fetchPets();
    } catch (error) {
      console.error('Error updating mascota to available:', error);
      MySwal.fire({
        title: '¡Error!',
        text: 'Ocurrió un error al actualizar la mascota.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  return (

    <button className='w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-2xl'>
 <FaCheckCircle
      onClick={handleMakeAvailable}
      className="text-green-500 cursor-pointer hover:text-green-700"
      size={24}
    />
    </button>
   
  );
};

export default BotonDisponible;
