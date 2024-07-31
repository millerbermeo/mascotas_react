import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import axiosClient from '../../utils/axiosClient';

const AdopTable = () => {
  const [adopciones, setAdopciones] = useState([]);

  useEffect(() => {
    const fetchAdopciones = async () => {
      try {
        const response = await axiosClient.get('/adopcion/listar');
        setAdopciones(response.data);
      } catch (error) {
        console.error('Error fetching adopciones:', error);
      }
    };

    fetchAdopciones();
  }, []);

  const handleWhatsAppClick = (telefono) => {
    const message = "¡Hola!";
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${telefono}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-max">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Dueño Anterior</TableColumn>
          <TableColumn>Adoptante</TableColumn>
          <TableColumn>Mascota</TableColumn>
          <TableColumn>Teléfono</TableColumn>
          <TableColumn>Fecha de Adopción</TableColumn>
          <TableColumn>Ubicación</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {adopciones.map((adopcion) => (
            <TableRow key={adopcion.adopcion_id}>
              <TableCell>{adopcion.adopcion_id}</TableCell>
              <TableCell>{adopcion.dueno_nombre}</TableCell>
              <TableCell>{adopcion.usuario_nombre}</TableCell>
              <TableCell>{adopcion.mascota_nombre}</TableCell>
              <TableCell>{adopcion.telefono}</TableCell>
              <TableCell>{new Date(adopcion.fecha_adopcion).toLocaleDateString()}</TableCell>
              <TableCell>{adopcion.ubicacion}</TableCell>
              <TableCell>
                <Button color="success" onPress={() => handleWhatsAppClick(adopcion.telefono)}>
                  Contactar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdopTable;
