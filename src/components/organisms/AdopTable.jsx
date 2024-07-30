import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input, Pagination } from '@nextui-org/react';
import axiosClient from '../../utils/axiosClient';
import ModalAdopActualizar from './ModalAdopActualizar';
import ModalEliminarAdopcion from './ModalEliminarAdopcion';

const AdopTable = () => {
  const [adopciones, setAdopciones] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    fetchAdopciones();
  }, []);

  const fetchAdopciones = async () => {
    try {
      const response = await axiosClient.get('/adopcion/listar');
      setAdopciones(response.data);
    } catch (error) {
      console.error('Error fetching adopciones:', error);
    }
  };

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

  const filteredData = adopciones.filter(adopcion =>
    (adopcion.usuario_nombre && adopcion.usuario_nombre.toLowerCase().includes(filterValue.toLowerCase())) ||
    (adopcion.mascota_nombre && adopcion.mascota_nombre.toLowerCase().includes(filterValue.toLowerCase())) ||
    (adopcion.fecha_adopcion && new Date(adopcion.fecha_adopcion).toLocaleDateString().includes(filterValue.toLowerCase()))
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
            placeholder="Buscar por usuario, mascota o fecha..."
            value={filterValue}
            onClear={onClear}
            onChange={onSearchChange}
          />
        </div>
      </div>

      <div className="flex justify-between items-center my-5">
        <span className="text-default-400 text-small">Total {filteredData.length} adopciones</span>
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

      <div className="overflow-x-auto">
        <Table className="w-full min-w-max">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Usuario</TableColumn>
            <TableColumn>Mascota</TableColumn>
            <TableColumn>Fecha de Adopción</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody>
            {paginatedData.map((adopcion) => (
              <TableRow key={adopcion.adopcion_id}>
                <TableCell>{adopcion.adopcion_id}</TableCell>
                <TableCell>{adopcion.usuario_nombre}</TableCell>
                <TableCell>{adopcion.mascota_nombre}</TableCell>
                <TableCell>{new Date(adopcion.fecha_adopcion).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <ModalAdopActualizar adopcion={adopcion} fetchAdopciones={fetchAdopciones} />
                    <ModalEliminarAdopcion adopcionId={adopcion.adopcion_id} fetchAdopciones={fetchAdopciones} />
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

export default AdopTable;
