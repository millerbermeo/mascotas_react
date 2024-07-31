import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import axiosClient from '../../utils/axiosClient';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { HiDocumentPlus } from "react-icons/hi2";

const ModalRegistrarHistorial = ({ mascotaId }) => {
    const { isOpen, onOpenChange } = useDisclosure();
    const MySwal = withReactContent(Swal);

    const [formData, setFormData] = useState({
        vacuna: '',
        fecha_visita_v: '',
        motivo_consulta: '',
        diagnostico: '',
        tratamiento: '',
        observaciones: '',
        veterinaria: ''
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
            const response = await axiosClient.post('/historial/registrar', {
                ...formData,
                mascota_id: mascotaId
            });
            console.log('Historial created:', response.data);
            MySwal.fire({
                title: '¡Historial registrado!',
                text: 'El historial ha sido registrado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            // Reset form after submission
            setFormData({
                vacuna: '',
                fecha_visita_v: '',
                motivo_consulta: '',
                diagnostico: '',
                tratamiento: '',
                observaciones: '',
                veterinaria: ''
            });
            onOpenChange(false);
        } catch (error) {
            console.error('Error creating historial:', error);
            MySwal.fire({
                title: '¡Error!',
                text: 'Ocurrió un error al registrar el historial.',
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
            <button onClick={handleOpen}><HiDocumentPlus /></button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent width="80%">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Registrar Historial</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            type="text"
                                            label="Vacuna"
                                            name="vacuna"
                                            value={formData.vacuna}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            type="date"
                                            label="Fecha de Visita"
                                            name="fecha_visita_v"
                                            value={formData.fecha_visita_v}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            type="text"
                                            label="Motivo de Consulta"
                                            name="motivo_consulta"
                                            value={formData.motivo_consulta}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            type="text"
                                            label="Diagnóstico"
                                            name="diagnostico"
                                            value={formData.diagnostico}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            type="text"
                                            label="Tratamiento"
                                            name="tratamiento"
                                            value={formData.tratamiento}
                                            onChange={handleInputChange}
                                        />
                                        <Textarea
                                            label="Observaciones"
                                            name="observaciones"
                                            value={formData.observaciones}
                                            onChange={handleInputChange}
                                        />
                                        <Input
                                            type="text"
                                            label="Veterinaria"
                                            name="veterinaria"
                                            value={formData.veterinaria}
                                            onChange={handleInputChange}
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

export default ModalRegistrarHistorial;
