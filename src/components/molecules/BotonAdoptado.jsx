import React from 'react';
import axiosClient from '../../utils/axiosClient';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaHeart } from "react-icons/fa";

const BotonAdoptado = ({ id, fetchPets }) => {
  const MySwal = withReactContent(Swal);

  const handleMakeAdopted = async () => {
    try {
      await axiosClient.put(`/mascotas/${id}/adopted`);
      MySwal.fire({
        title: '¡Mascota Adoptada!',
        text: 'La mascota ha sido adoptada.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      fetchPets();
    } catch (error) {
      console.error('Error updating mascota to adopted:', error);
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
    <FaHeart
      onClick={handleMakeAdopted}
      className="text-red-500 cursor-pointer hover:text-red-700"
      size={24}
    />
        </button>
  );
};

export default BotonAdoptado;
