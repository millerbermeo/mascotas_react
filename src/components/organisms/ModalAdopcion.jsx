import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import axiosClient from '../../utils/axiosClient';
import Swal from 'sweetalert2';
import Select from 'react-select';

const ModalAdopcion = ({ mascotaId, fetchAdoptions }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioId, setUsuarioId] = useState('');
  const [fechaAdopcion, setFechaAdopcion] = useState('');
  const [ubicacion, setUbicacion] = useState(''); // Nuevo estado para ubicacion

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axiosClient.get('/usuarios/listar');
        const usuariosData = response.data.map(usuario => ({
          value: usuario.id,
          label: `${usuario.nombre} | ${usuario.identificacion}`
        }));
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleAdopcion = async () => {
    try {
      await axiosClient.post('/adopcion/registrar', {
        usuario_id: usuarioId,
        mascota_id: mascotaId,
        fecha_adopcion: fechaAdopcion,
        ubicacion // Enviar ubicacion
      });
      fetchAdoptions();
      onOpenChange(false);
      Swal.fire({
        icon: 'success',
        title: 'Adopción registrada',
        text: 'La adopción se ha registrado exitosamente.',
      });
    } catch (error) {
      console.error('Error creating adopcion:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar la adopción.',
      });
    }
  };

  return (
    <>
      <Button className='mt-3 mr-2 w-full' onClick={onOpen}>Dar en Adopción</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Registrar Adopción</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Select
                    className="p-2 border rounded"
                    value={usuarios.find(option => option.value === usuarioId)}
                    onChange={(selectedOption) => setUsuarioId(selectedOption ? selectedOption.value : '')}
                    options={usuarios}
                    placeholder="Seleccionar Usuario"
                    isClearable
                  />
                  <input
                    type="date"
                    className="p-2 border rounded"
                    value={fechaAdopcion}
                    onChange={(e) => setFechaAdopcion(e.target.value)}
                  />
                  <input
                    type="text"
                    className="p-2 border rounded"
                    placeholder="Ubicación"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleAdopcion}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAdopcion;
