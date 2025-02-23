import React, { useState, useEffect, FormEvent } from 'react';
import api from '../api/api';
import AttemptsTable from './AttemptsTable';
import { Attempt } from "../types/attempt";

const PhishingSimulation: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [campaignName, setCampaignName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [attempts, setAttempts] = useState<Attempt[]>([]);

    // New state to track whether we are currently sending a request
    const [isSending, setIsSending] = useState<boolean>(false);

    const handleSendAttempt = async (e: FormEvent) => {
        e.preventDefault();

        // Set sending state to true to disable elements
        setIsSending(true);

        try {
            await api.post('/attempts/send', { email, campaignName, description });
            alert('Phishing attempt sent.');
            void fetchAttempts();
        } catch (error) {
            console.error('Error sending phishing attempt:', error);
            alert('Failed to send attempt.');
        } finally {
            // Make sure to reset the loading state whether request succeeds or fails
            setIsSending(false);
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
                            disabled={isSending}  // Disable input while sending
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            disabled={isSending}  // Disable input while sending
                        />
                    </div>
                    <div className="form-group">
                        <label>Recipient Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isSending}  // Disable input while sending
                        />
                    </div>
                    <button type="submit" className="button" disabled={isSending}>
                        {isSending ? 'Sending...' : 'Send Phishing Attempt'}
                    </button>
                </form>
            </div>
            <h3 style={{ textAlign: 'center' }}>Phishing Attempts</h3>
            <AttemptsTable attempts={attempts} />
        </div>
    );
};

export default PhishingSimulation;
