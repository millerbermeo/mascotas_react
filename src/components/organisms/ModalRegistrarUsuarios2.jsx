import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import axiosClient from '../../utils/axiosClient';
import { FaPlus } from "react-icons/fa6";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ModalRegistrarUsuarios2 = ({ fetchUsuarios }) => {
    const MySwal = withReactContent(Swal);
    const { isOpen, onOpenChange } = useDisclosure();
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        identificacion: '',
        contrasena: '',
        telefono: '',
        direccion: '',
        rol: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.post('/usuarios/registrar', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Usuario created:', response.data);
            MySwal.fire({
                title: '¡Usuario registrado!',
                text: 'El usuario ha sido registrado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            setFormData({
                nombre: '',
                correo: '',
                identificacion: '',
                contrasena: '',
                telefono: '',
                direccion: '',
                rol: '',
            });
            onOpenChange(false);
            fetchUsuarios();
        } catch (error) {
            console.error('Error creating usuario:', error);
            MySwal.fire({
                title: '¡Error!',
                text: 'Ocurrió un error al registrar el usuario.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <>
            <button className='w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-2xl' onClick={() => onOpenChange(true)}><FaPlus /></button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent width="80%">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Registrar Usuario</ModalHeader>
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
                                            type="email"
                                            label="Correo"
                                            name="correo"
                                            value={formData.correo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Input
                                            type="text"
                                            label="Identificación"
                                            name="identificacion"
                                            value={formData.identificacion}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Input
                                            type="password"
                                            label="Contraseña"
                                            name="contrasena"
                                            value={formData.contrasena}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Input
                                            type="text"
                                            label="Teléfono"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Input
                                            type="text"
                                            label="Dirección"
                                            name="direccion"
                                            value={formData.direccion}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Input
                                            type="text"
                                            label="Rol"
                                            name="rol"
                                            value={formData.rol}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
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

export default ModalRegistrarUsuarios2;
