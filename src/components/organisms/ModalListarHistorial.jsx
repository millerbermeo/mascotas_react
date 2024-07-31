import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axiosClient from '../../utils/axiosClient';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaEye } from "react-icons/fa";

const ModalListarHistorial = ({ mascotaId }) => {
    const { isOpen, onOpenChange } = useDisclosure();
    const MySwal = withReactContent(Swal);

    const [historiales, setHistoriales] = useState([]);
    const [selectedHistorial, setSelectedHistorial] = useState(null);

    useEffect(() => {
        if (mascotaId && isOpen) {
            fetchHistoriales();
        }
    }, [mascotaId, isOpen]);

    const fetchHistoriales = async () => {
        try {
            const response = await axiosClient.get(`/historial/listar/${mascotaId}`);
            setHistoriales(response.data);
            if (response.data.length > 0) {
                setSelectedHistorial(response.data[0]);
            }
        } catch (error) {
            console.error('Error fetching historiales:', error);
            MySwal.fire({
                title: '¡Error!',
                text: 'Ocurrió un error al obtener los historiales.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    const handleOpen = () => {
        onOpenChange(true);
        fetchHistoriales();
    };

    const handleHistorialChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const historial = historiales.find(hist => hist.id_historial === selectedId);
        setSelectedHistorial(historial);
    };

    return (
        <>
            <button onClick={handleOpen}><FaEye /></button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent width="80%">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Historial Médico</ModalHeader>
                            <ModalBody>
                                {historiales.length > 1 && (
                                    <select onChange={handleHistorialChange} value={selectedHistorial?.id_historial || ''}>
                                        {historiales.map(historial => (
                                            <option key={historial.id_historial} value={historial.id_historial}>
                                                {new Date(historial.fecha_visita_v).toLocaleDateString()} - {historial.veterinaria}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {selectedHistorial && (
                                    <ul className="list-disc list-inside">
                                        <li><strong>Id:</strong> {selectedHistorial.id_historial}</li>
                                        <li><strong>Vacuna:</strong> {selectedHistorial.vacuna}</li>
                                        <li><strong>Fecha de Visita:</strong> {new Date(selectedHistorial.fecha_visita_v).toLocaleDateString()}</li>
                                        <li><strong>Motivo de Consulta:</strong> {selectedHistorial.motivo_consulta}</li>
                                        <li><strong>Diagnóstico:</strong> {selectedHistorial.diagnostico}</li>
                                        <li><strong>Tratamiento:</strong> {selectedHistorial.tratamiento}</li>
                                        <li><strong>Observaciones:</strong> {selectedHistorial.observaciones}</li>
                                        <li><strong>Veterinaria:</strong> {selectedHistorial.veterinaria}</li>
                                    </ul>
                                )}
                                {historiales.length === 0 && <p>No hay historiales disponibles para esta mascota.</p>}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalListarHistorial;
