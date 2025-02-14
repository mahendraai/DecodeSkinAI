import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Fetch user scan history
        axios.get('http://localhost:5000/api/skin-analysis/history')
            .then((response) => {
                setHistory(response.data);
            })
            .catch((err) => console.error('Error fetching history:', err));
    }, []);

    return (
        <div>
            <h1>Your Scan History</h1>
            <ul>
                {history.map((scan) => (
                    <li key={scan.id}>
                        <img src={`http://localhost:5000/${scan.photo_url}`} alt="Skin scan" />
                        <p>Blemishes Detected: {scan.blemishes_detected ? 'Yes' : 'No'}</p>
                        <p>Skin Type: {scan.skin_type}</p>
                        <p>Score: {scan.score}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
