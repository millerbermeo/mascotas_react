import React, { useState } from 'react';
import Sidebar from '../organisms/Sidebar';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { Pagination } from '@nextui-org/react';
import { ChevronIcon } from '../atoms/ChevronIcon';

const DashboardPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); // Total pages can be dynamically set based on the data

  const data = [
    { id: 1, name: 'Tony Reichert', role: 'CEO', status: 'Active' },
    { id: 2, name: 'Zoey Lang', role: 'Technical Lead', status: 'Paused' },
    { id: 3, name: 'Jane Fisher', role: 'Senior Developer', status: 'Active' },
    { id: 4, name: 'William Howard', role: 'Community Manager', status: 'Vacation' },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-screen flex bg-[#E5E5E5]">
      <Sidebar />

      <div className="w-full px-5">
        <div className="flex w-96 flex-wrap md:flex-nowrap gap-4 my-4">
          <Input
            type="text"
            label="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          total={totalPages}
          initialPage={1}
          page={page}
          onChange={(page) => setPage(page)}
          shadow
          color="primary"
          className="my-4"
        >
          <Pagination.First />
          <Pagination.Previous />
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </div>
  );
};

export default DashboardPage;
