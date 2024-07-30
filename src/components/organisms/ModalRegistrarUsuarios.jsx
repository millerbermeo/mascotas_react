import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import axiosClient from '../../utils/axiosClient';
import { FaPlus } from "react-icons/fa6";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ModalRegistrarUsuarios = () => {
    const { isOpen, onOpenChange } = useDisclosure();
    const MySwal = withReactContent(Swal);

    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        identificacion: '',
        contrasena: '',
        telefono: '',
        direccion: '',
    });

    // const rolesOptions = {
    //     "usuario": "Usuario",
    //     "admin": "Administrador"
    // };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (e) => {
        setFormData({
            ...formData,
            rol: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.post('/usuarios/registrar', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Usuario creado:', response.data);
            // Mostrar el SweetAlert
            MySwal.fire({
                title: '¡Usuario registrado!',
                text: 'El usuario ha sido registrado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            // Reset form after submission
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
   
        } catch (error) {
            console.error('Error creating user:', error);
            MySwal.fire({
                title: '¡Error!',
                text: 'Hubo un error al registrar el usuario.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
     
        }
    };

    const handleOpen = () => {
        onOpenChange(true);
    };

    return (
        <>
            <Button color='primary' onClick={handleOpen}>Registrarse</Button>
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
                                        {/* <Select
                                            label="Rol"
                                            name="rol"
                                            placeholder="Selecciona una opción"
                                            value={formData.rol}
                                            onChange={handleSelectChange}
                                            required
                                        >
                                            {Object.entries(rolesOptions).map(([key, value]) => (
                                                <SelectItem key={key} value={key}>{value}</SelectItem>
                                            ))}
                                        </Select> */}
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

export default ModalRegistrarUsuarios;
