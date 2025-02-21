import React, { useState, useEffect, FormEvent } from 'react';
import api from '../api/api';
import AttemptsTable from './AttemptsTable';
import {Attempt} from "../types/attempt";

const PhishingSimulation: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [campaignName, setCampaignName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [attempts, setAttempts] = useState<Attempt[]>([]);

    const handleSendAttempt = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/attempts/send', { email, campaignName, description });
            alert('Phishing attempt sent.');
            void fetchAttempts();
        } catch (error) {
            console.error('Error sending phishing attempt:', error);
            alert('Failed to send attempt.');
        }
    };

    const fetchAttempts = async () => {
        try {
            const response = await api.get<Attempt[]>('/attempts');
            setAttempts(response.data);
        } catch (error) {
            console.error('Error fetching attempts:', error);
        }
    };

    useEffect(() => {
       void fetchAttempts();
    }, []);

    return (
        <div className="container">
            <h2 style={{ textAlign: 'center' }}>Phishing Simulation</h2>
            <div className="form-container">
                <form onSubmit={handleSendAttempt}>
                    <div className="form-group">
                        <label>Campaign Name:</label>
                        <input
                            type="text"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Recipient Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="button">Send Phishing Attempt</button>
                </form>
            </div>
            <h3 style={{ textAlign: 'center' }}>Phishing Attempts</h3>
            <AttemptsTable attempts={attempts} />
        </div>
    );
};

export default PhishingSimulation;
