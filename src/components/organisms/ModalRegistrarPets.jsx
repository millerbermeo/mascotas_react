import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import axiosClient from '../../utils/axiosClient';
import { FaPlus } from "react-icons/fa6";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ModalRegistrarPets = ({ fetchPets }) => {
    const { isOpen, onOpenChange } = useDisclosure();
    const MySwal = withReactContent(Swal);

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const [formData, setFormData] = useState({
        nombre: '',
        edad: '',
        genero: '',
        raza: '',
        estado: '1',
        descripcion: '',
        esterilizado: '',
        usuario_id: user ? user.id : '',
    });
    const [file, setFile] = useState(null);

    const esterilizadoOptions = {
        "1": "Sí",
        "2": "No"
    };

    const genero = {
        "1": "Macho",
        "2": "Hembra"
    };


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSelectChange = (e) => {
        setFormData({
            ...formData,
            esterilizado: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        if (file) {
            formDataToSend.append('image', file);
        }

        try {
            const response = await axiosClient.post('/mascotas/registrar', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Mascota created:', response.data);
            // Mostrar el SweetAlert
            MySwal.fire({
                title: '¡Mascota registrada!',
                text: 'La mascota ha sido registrada exitosamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            // Reset form after submission
            setFormData({
                nombre: '',
                edad: '',
                genero: '',
                raza: '',
                estado: '1',
                descripcion: '',
                esterilizado: '',
                usuario_id: user ? user.id : '',
            });
            setFile(null);
            onOpenChange(false);
            fetchPets();
        } catch (error) {
            console.error('Error creating mascota:', error);
            fetchPets();
        }
    };

    const handleOpen = () => {
        if (token) {
            onOpenChange(true);
        } else {
            MySwal.fire({
                title: '¡Error!',
                text: 'Por favor, inicie sesión o regístrese para registrar una mascota.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <>
            <button className='w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-2xl' onClick={handleOpen}><FaPlus /></button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent width="80%">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Registrar Mascota</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                                        <Select
                                            label="Género"
                                            name="genero"
                                            placeholder="Selecciona una opción"
                                            value={formData.genero}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            {Object.entries(genero).map(([key, value]) => (
                                                <SelectItem key={key} value={value}>{value}</SelectItem>
                                            ))}
                                        </Select>

                                        <Input
                                            type="text"
                                            label="Raza"
                                            name="raza"
                                            value={formData.raza}
                                            onChange={handleInputChange}
                                        />
                                        <Select
                                            label="Esterilizado"
                                            name="esterilizado"
                                            placeholder="Selecciona una opción"
                                            value={formData.esterilizado}
                                            onChange={handleSelectChange}
                                            required
                                        >
                                            {Object.entries(esterilizadoOptions).map(([key, value]) => (
                                                <SelectItem key={key} value={value}>{value}</SelectItem>
                                            ))}
                                        </Select>

                                        <Input
                                            type="file"
                                            label="Imagen"
                                            name="image"
                                            onChange={handleFileChange}
                                            required
                                            className='w-full'
                                        />
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
                                        Registrar
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

export default ModalRegistrarPets;
