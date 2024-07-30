import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Input } from '@nextui-org/react';
import axiosClient from '../../utils/axiosClient';
import ModalRegistrarUsuarios2 from './ModalRegistrarUsuarios2';
import ModalActualizarUsuarios from './ModalActualizarUsuarios';

const UserTable = () => {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/usuarios/listar');
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

  return (
    <>
      <div className="flex justify-between flex-col lg:flex-row lg:items-center w-full mb-4">
        <div className="w-full flex-col lg:flex-row flex gap-3">
          <Input
            color="primary"
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            value={filterValue}
            onClear={onClear}
            onChange={onSearchChange}
          />
        </div>
        <ModalRegistrarUsuarios2 fetchUsuarios={fetchData} />
      </div>

      <div className="flex justify-between items-center my-5">
        <span className="text-default-400 text-small">Total {filteredData.length} usuarios</span>
        <label className="flex items-center text-default-400 text-small">
          Filas por página:
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

      <Table className="z-0 printableTable" aria-label="Tabla de usuarios">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>CORREO</TableColumn>
          <TableColumn>IDENTIFICACIÓN</TableColumn>
          <TableColumn>TELÉFONO</TableColumn>
          <TableColumn>DIRECCIÓN</TableColumn>
          <TableColumn>ROL</TableColumn>
          <TableColumn className='flex justify-center items-center'>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedData.map(usuario => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.id}</TableCell>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.correo}</TableCell>
              <TableCell>{usuario.identificacion}</TableCell>
              <TableCell>{usuario.telefono}</TableCell>
              <TableCell>{usuario.direccion}</TableCell>
              <TableCell>{usuario.rol}</TableCell>
              <TableCell className='flex justify-center gap-2'>
                <ModalActualizarUsuarios fetchUsuarios={fetchData} item={usuario} />
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

export default UserTable;
