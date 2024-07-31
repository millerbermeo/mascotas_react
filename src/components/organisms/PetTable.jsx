import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Input } from '@nextui-org/react';
import axiosClient from '../../utils/axiosClient';
import ModalRegistrarPets2 from './ModalRegistrarPets2';
import ModalActualizarPets2 from './ModalActualizarpets2';
import BotonAdoptado from '../molecules/BotonAdoptado';
import BotonDisponible from '../molecules/BotonDisponible';
import ModalRegistrarHistorial from './ModalRegistrarHistorial';
import ModalListarHistorial from './ModalListarHistorial';

const PetTable = () => {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

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

  const onStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1); // Reset page number when changing status filter
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const onRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1); // Reset page number when changing rows per page
  };

  const filteredData = data
    .filter(item => item.mascota_nombre.toLowerCase().includes(filterValue.toLowerCase()))
    .filter(item => statusFilter === 'todos' || item.estado.toLowerCase() === statusFilter);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleWhatsAppClick = (pet) => {
    const phoneNumber = pet.telefono;
    const message = `¡Hola! Soy el administrador de AdopMe y estoy aquí para asistirte con cualquier información que necesites sobre la adopción de nuestras mascotas. ¿Cómo puedo ayudarte?`;
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
          <div className="flex gap-3">
            <select
              className="bg-transparent outline-none text-default-400 text-small ml-2"
              value={statusFilter}
              onChange={onStatusFilterChange}
            >
              <option value="todos">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="disponible">Disponible</option>
              <option value="adoptado">Adoptado</option>
            </select>
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

      <div className="overflow-x-auto flex justify-center w-full">
        <Table className="z-0 printableTable mx-auto w-full max-w-[90%] 2xl:max-w-full  overflow-x-auto">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>NOMBRE</TableColumn>
            <TableColumn>EDAD</TableColumn>
            <TableColumn>GÉNERO</TableColumn>
            <TableColumn>RAZA</TableColumn>
            <TableColumn>ESTERILIZADO</TableColumn>
            {/* <TableColumn>CONTACTO</TableColumn> */}
            <TableColumn>DESCRIPCIÓN</TableColumn>
            <TableColumn>ESTADO</TableColumn>
            <TableColumn>IMAGEN</TableColumn>
            <TableColumn className='flex justify-center items-center'>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {paginatedData.map(pet => (
              <TableRow key={pet.id}>
                <TableCell>{pet.id}</TableCell>
                <TableCell>{pet.mascota_nombre}</TableCell>
                <TableCell>{pet.edad}</TableCell>
                <TableCell>{pet.genero || 'N/A'}</TableCell>
                <TableCell>{pet.raza || 'N/A'}</TableCell>
                <TableCell>{pet.esterilizado}</TableCell>
                {/* <TableCell>{pet.telefono}</TableCell> */}
                <TableCell>{pet.descripcion}</TableCell>
                <TableCell>{pet.estado}</TableCell>
                <TableCell>
                  <img src={`http://localhost:3000${pet.imagen_url}`} alt={pet.mascota_nombre} className="w-16 rounded-full h-16 object-cover" />
                </TableCell>
                <TableCell className='flex justify-center gap-2'>
                  <Button color="success" onPress={() => handleWhatsAppClick(pet)}>
                    Contactar
                  </Button>
                  <ModalActualizarPets2 fetchPets={fetchData} item={pet} />
                  <BotonDisponible id={pet.id} fetchPets={fetchData} />
                  <BotonAdoptado id={pet.id} fetchPets={fetchData} />
                  <div className='w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-2xl'>
                    <ModalRegistrarHistorial mascotaId={pet.id} />
                  </div>
                  <div className='w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-2xl'>
                    <ModalListarHistorial mascotaId={pet.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
