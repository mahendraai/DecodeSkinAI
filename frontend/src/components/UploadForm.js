import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', file);

        try {
            const response = await axios.post('http://localhost:5000/api/skin-analysis/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            navigate('/dashboard'); // Redirect to dashboard
        } catch (err) {
            console.error('Error uploading photo:', err);
        }
    };

    return (
        <div>
            <h1>Upload Skin Photo</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UploadForm;
