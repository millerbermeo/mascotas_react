import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { FaHeart } from 'react-icons/fa';
import Text from '../atoms/Text';
import ModalRegistrarHistorial from './ModalRegistrarHistorial';
import { useLocation } from 'react-router-dom';
import ModalListarHistorial from './ModalListarHistorial';

export const ModalPets = ({ item, children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const location = useLocation();

  const handleWhatsAppClick = () => {
    const phoneNumber = item.telefono;
    const message = `¡Hola!\n\n` +
                    `Me encantaría saber más sobre la adopción de esta adorable mascota:\n\n` +
                    `Nombre: ${item.mascota_nombre}\n` +
                    `Edad: ${item.edad} años\n` +
                    `Género: ${item.genero || 'N/A'}\n` +
                    `Dueño Actual: ${item.dueno}\n\n` +
                    `Estoy muy interesado en brindarle un hogar lleno de amor. Además, me gustaría obtener información sobre los siguientes aspectos:\n\n` +
                    `Antecedentes del animal:\n` +
                    `Vacunas:\n` +
                    `Historial médico veterinario:\n\n` +
                    `¿Podrías darme más detalles sobre el proceso de adopción? ¡Muchas gracias!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };
  
  return (
    <>
      <div className='cursor-pointer' onClick={onOpen}>{children}</div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{item.mascota_nombre}</ModalHeader>
              <ModalBody>
                <div className="bg-white rounded-lg shadow-lg">
                  <div className="relative w-full h-64">
                    <img src={`http://localhost:3000${item.imagen_url}`} alt={item.mascota_nombre} className="rounded-t-lg w-full h-full object-cover" />
                    <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
                      <FaHeart className="text-red-500" />
                    </div>
                    {location.pathname === '/adop' && (
                      <div className="absolute bottom-2 right-11 bg-white text-green-600 h-8 w-8 flex justify-center items-center rounded-full shadow-md">
                        <ModalRegistrarHistorial mascotaId={item.id}/>
                      </div>
                    )}
                         {location.pathname === '/adop' && (
                      <div className="absolute bottom-2 right-20 bg-white text-gray-600 h-8 w-8 flex justify-center items-center rounded-full shadow-md">
                        <ModalListarHistorial mascotaId={item.id}/>
                      </div>
                    )}
                  </div>
                  <div className="w-full p-4">
                    <Text className="text-lg font-bold text-gray-800">{item.nombre}</Text>
                    <Text className="text-gray-600">{item.edad}</Text>
                    <Text className="text-gray-600">{item.genero || 'N/A'}</Text>
                    <Text className="text-gray-600">{item.descripcion}</Text>
                    <Text className="text-gray-600">Esterilizado: {item.esterilizado}</Text>
                    <Text className="text-gray-600">Estado: {item.estado}</Text>
                    <Text className="text-gray-600">Fecha de creación: {new Date(item.fecha_creacion).toLocaleDateString()}</Text>
                    <Text className="text-gray-600">Dueño Actual: {item.dueno}</Text>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleWhatsAppClick}>
                  WhatsApp
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
