import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Input } from '@nextui-org/react';
import axiosClient from '../../utils/axiosClient';
import ModalRegistrarPets2 from './ModalRegistrarPets2';
import ModalActualizarPets2 from './ModalActualizarpets2';
import BotonAdoptado from '../molecules/BotonAdoptado';
import BotonDisponible from '../molecules/BotonDisponible';


const PetTable = () => {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/mascotas/listar');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSearchChange = (e) => {
    setFilterValue(e.target.value);
    setPage(1); // Reset page number when changing search filter
  };

  const onClear = () => {
    setFilterValue('');
    setPage(1); // Reset page number when clearing search filter
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const onRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1); // Reset page number when changing rows per page
  };

  const filteredData = data.filter(item =>
    item.nombre.toLowerCase().includes(filterValue.toLowerCase())
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleWhatsAppClick = (pet) => {
    const phoneNumber = pet.telefono;
    const message = `¡Hola! \n\n` +
                    `Me encantaría saber más sobre la adopción de esta adorable mascota:\n\n` +
                    `Nombre: ${pet.nombre}\n` +
                    `Edad: ${pet.edad} años\n` +
                    `Género: ${pet.genero || 'N/A'}\n` +
                    `Descripción: ${pet.descripcion}\n` +
                    `Estado: ${pet.estado}\n\n` +
                    `Estoy muy interesado en brindarle un hogar lleno de amor. ¿Podrías darme más detalles sobre el proceso de adopción? ¡Muchas gracias!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <>
      <div className="flex justify-between flex-col lg:flex-row lg:items-center w-full mb-4">
        <div className="w-full flex-col lg:flex-row flex gap-3">
          <Input
            color="primary"
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            value={filterValue}
            onClear={onClear}
            onChange={onSearchChange}
          />
          <div className="flex gap-1 mb-2 lg:mb-0">
            {/* Puedes añadir botones para descargar CSV o Excel aquí */}
          </div>
        </div>
        <ModalRegistrarPets2 fetchPets={fetchData} />
      </div>

      <div className="flex justify-between items-center my-5">
        <span className="text-default-400 text-small">Total {filteredData.length} mascotas</span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small ml-2"
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
          >
            <option value="6">6</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>

      <Table className="z-0 printableTable" aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>EDAD</TableColumn>
          <TableColumn>GÉNERO</TableColumn>
          <TableColumn>RAZA</TableColumn>
          <TableColumn>ESTERILIZADO</TableColumn>
          <TableColumn>CONTACTO</TableColumn>
          <TableColumn>DESCRIPCIÓN</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn>IMAGEN</TableColumn>
          <TableColumn className='flex justify-center items-center'>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedData.map(pet => (
            <TableRow key={pet.id}>
              <TableCell>{pet.id}</TableCell>
              <TableCell>{pet.nombre}</TableCell>
              <TableCell>{pet.edad}</TableCell>
              <TableCell>{pet.genero || 'N/A'}</TableCell>
              <TableCell>{pet.raza || 'N/A'}</TableCell>
              <TableCell>{pet.esterilizado}</TableCell>
              <TableCell>{pet.telefono}</TableCell>
              <TableCell>{pet.descripcion}</TableCell>
              <TableCell>{pet.estado}</TableCell>
              <TableCell>
                <img src={`http://localhost:3000${pet.imagen_url}`} alt={pet.nombre} className="w-16 rounded-full h-16 object-cover" />
              </TableCell>
              <TableCell className='flex justify-center gap-2'>
                <Button color="success" onPress={() => handleWhatsAppClick(pet)}>
                  Contactar
                </Button>
                <ModalActualizarPets2  fetchPets={fetchData} item={pet}/>
                <BotonDisponible id={pet.id} fetchPets={fetchData} />
                <BotonAdoptado id={pet.id} fetchPets={fetchData} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="py-2 px-2 flex justify-between my-2 items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={Math.ceil(filteredData.length / rowsPerPage)}
          onChange={onPageChange}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={page === 1} size="sm" variant="flat" onPress={() => setPage(page - 1)}>
            Anterior
          </Button>
          <Button isDisabled={page === Math.ceil(filteredData.length / rowsPerPage)} size="sm" variant="flat" onPress={() => setPage(page + 1)}>
            Siguiente
          </Button>
        </div>
      </div>
    </>
  );
};

export default PetTable;
