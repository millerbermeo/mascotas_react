import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import axiosClient from '../../utils/axiosClient';
import Swal from 'sweetalert2';
import { FaEdit } from "react-icons/fa";

const ModalAdopActualizar = ({ adopcion, fetchAdopciones }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [usuarios, setUsuarios] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [usuarioId, setUsuarioId] = useState(adopcion.usuario_id);
  const [mascotaId, setMascotaId] = useState(adopcion.mascota_id);
  const [fechaAdopcion, setFechaAdopcion] = useState(adopcion.fecha_adopcion);

  useEffect(() => {
    fetchUsuarios();
    fetchMascotas();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axiosClient.get('/usuarios/listar');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };

  const fetchMascotas = async () => {
    try {
      const response = await axiosClient.get('/mascotas/listar');
      setMascotas(response.data);
    } catch (error) {
      console.error('Error fetching mascotas:', error);
    }
  };

  const handleActualizar = async () => {
    try {
      await axiosClient.put(`/adopcion/actualizar/${adopcion.id}`, {
        usuario_id: usuarioId,
        mascota_id: mascotaId,
        fecha_adopcion: fechaAdopcion,
      });
      fetchAdopciones();
      onOpenChange(false);
      Swal.fire({
        icon: 'success',
        title: 'Adopción actualizada',
        text: 'La adopción se ha actualizado exitosamente.',
      });
    } catch (error) {
      console.error('Error updating adopcion:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al actualizar la adopción.',
      });
    }
  };

  return (
    <>
      <button className='w-12 h-12 rounded-full bg-gray-200  text-black flex justify-center items-center text-2xl' color="primary" onClick={onOpen}><FaEdit /></button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Actualizar Adopción</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <select
                    className="p-2 border rounded"
                    value={usuarioId}
                    onChange={(e) => setUsuarioId(e.target.value)}
                  >
                    <option value="">Seleccionar Usuario</option>
                    {usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nombre}
                      </option>
                    ))}
                  </select>
                  <select
                    className="p-2 border rounded"
                    value={mascotaId}
                    onChange={(e) => setMascotaId(e.target.value)}
                  >
                    <option value="">Seleccionar Mascota</option>
                    {mascotas.map((mascota) => (
                      <option key={mascota.id} value={mascota.id}>
                        {mascota.nombre}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    className="p-2 border rounded"
                    value={fechaAdopcion}
                    onChange={(e) => setFechaAdopcion(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleActualizar}>
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

export default ModalAdopActualizar;
