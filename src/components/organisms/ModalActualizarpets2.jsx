import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import axiosClient from '../../utils/axiosClient';
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ModalActualizarPets2 = ({ fetchPets, item }) => {
    const MySwal = withReactContent(Swal);
    const { isOpen, onOpenChange } = useDisclosure();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        nombre: '',
        edad: '',
        genero: '',
        raza: '',
        estado: '',
        descripcion: '',
        esterilizado: '',
        usuario_id: user ? user.id : '',
    });

    useEffect(() => {
        if (item) {
            setFormData({
                nombre: item.nombre || '',
                edad: item.edad || '',
                genero: item.genero === "macho" ? "1" : item.genero === "hembra" ? "2" : '',
                raza: item.raza || '',
                estado: item.estado === "pendiente" ? "1" : item.estado === "disponible" ? "2" : item.estado === "adoptado" ? "3" : '',
                descripcion: item.descripcion || '',
                esterilizado: item.esterilizado === "si" ? "1" : item.esterilizado === "no" ? "2" : '',
                usuario_id: item.usuario_id || (user ? user.id : ''),
            });
        }
    }, [item]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.put(`/mascotas/actualizar/${item.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Mascota updated:', response.data);
            MySwal.fire({
                title: '¡Mascota actualizada!',
                text: 'La mascota ha sido actualizada exitosamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            setFormData({
                nombre: '',
                edad: '',
                genero: '',
                raza: '',
                estado: '',
                descripcion: '',
                esterilizado: '',
                usuario_id: user ? user.id : '',
            });
            onOpenChange(false);
            fetchPets();
        } catch (error) {
            console.error('Error updating mascota:', error);
            MySwal.fire({
                title: '¡Error!',
                text: 'Ocurrió un error al actualizar la mascota.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <>
            <button className='w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-2xl' onClick={() => onOpenChange(true)}><FaEdit /></button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent width="80%">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Actualizar Mascota</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            type="text"
                                            label="Nombre"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Input
                                            type="number"
                                            label="Edad"
                                            name="edad"
                                            value={formData.edad}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Género</label>
                                            <select
                                                name="genero"
                                                value={formData.genero}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            >
                                                <option value="">Selecciona una opción</option>
                                                <option value="1">Macho</option>
                                                <option value="2">Hembra</option>
                                            </select>
                                        </div>
                                        <Input
                                            type="text"
                                            label="Raza"
                                            name="raza"
                                            value={formData.raza}
                                            onChange={handleInputChange}
                                        />
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Esterilizado</label>
                                            <select
                                                name="esterilizado"
                                                value={formData.esterilizado}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            >
                                                <option value="">Selecciona una opción</option>
                                                <option value="1">Sí</option>
                                                <option value="2">No</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Estado</label>
                                            <select
                                                name="estado"
                                                value={formData.estado}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            >
                                                <option value="">Selecciona una opción</option>
                                                <option value="1">Pendiente</option>
                                                <option value="2">Disponible</option>
                                                <option value="3">Adoptado</option>
                                            </select>
                                        </div>
                                    </div>
                                    <Textarea
                                        label="Descripción"
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-4"
                                    />
                                    <Button type="submit" color="primary" className="mt-4">
                                        Actualizar
                                    </Button>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalActualizarPets2;
