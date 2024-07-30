import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import axiosClient from '../../utils/axiosClient';
import Swal from 'sweetalert2';

const ModalEliminarMascota = ({ mascotaId, fetchPets }) => {
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
        await axiosClient.delete(`/mascotas/eliminar/${mascotaId}`);
        fetchPets();
        onOpenChange(false);
        Swal.fire({
          icon: 'success',
          title: 'Eliminada',
          text: 'La mascota ha sido eliminada.',
        });
      }
    } catch (error) {
      console.error('Error deleting mascota: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al eliminar la mascota.',
      });
    }
  };

  return (
    <>
      <Button color="danger" className='w-full' onClick={onOpen}>Eliminar Mascota</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirmar Eliminación</ModalHeader>
              <ModalBody>
                <p>¿Estás seguro de que quieres eliminar esta mascota?</p>
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

export default ModalEliminarMascota;
