import React, { useState } from 'react';
import { uploadFile } from './api'; // Asegúrate de que la ruta sea correcta

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            try {
                const response = await uploadFile(file);
                console.log(response); // Maneja la respuesta del servidor
            } catch (error) {
                console.error('Error al subir el archivo:', error);
            }
        } else {
            console.error('Por favor, selecciona un archivo para subir.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Subir archivo</button>
        </form>
    );
};

export default FileUpload;