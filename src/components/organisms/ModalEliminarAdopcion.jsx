import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import axiosClient from '../../utils/axiosClient';
import Swal from 'sweetalert2';
import { MdDeleteForever } from "react-icons/md";


const ModalEliminarAdopcion = ({ adopcionId, fetchAdopciones }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleEliminar = async () => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarla',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await axiosClient.delete(`/adopcion/eliminar/${adopcionId}`);
        fetchAdopciones();
        onOpenChange(false);
        Swal.fire({
          icon: 'success',
          title: 'Eliminada',
          text: 'La adopción ha sido eliminada.',
        });
      }
    } catch (error) {
      console.error('Error deleting adopcion: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al eliminar la adopción.',
      });
    }
  };

  return (
    <>
      <button className='w-12 h-12 rounded-full bg-red-500  text-white flex justify-center items-center text-2xl' onClick={onOpen}><MdDeleteForever />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirmar Eliminación</ModalHeader>
              <ModalBody>
                <p>¿Estás seguro de que quieres eliminar esta adopción?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="error" onPress={handleEliminar}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEliminarAdopcion;
