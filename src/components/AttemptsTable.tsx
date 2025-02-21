import React from 'react';
import {AttemptsTableProps} from "../types/attempt";

const AttemptsTable: React.FC<AttemptsTableProps> = ({ attempts }) => {
    return (
        <div className="table-container">
            <table border={1} cellPadding={5}>
            <thead>
            <tr>
                <th>Recipient Email</th>
                <th>Campaign Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created At</th>
            </tr>
            </thead>
            <tbody>
                {attempts.map((attempt) => (
                <tr key={attempt._id}>
                    <td>{attempt.email}</td>
                    <td>{attempt.campaignName}</td>
                    <td>{attempt.description}</td>
                    <td>{attempt.status}</td>
                    <td>{new Date(attempt.createdAt).toLocaleString()}</td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttemptsTable;
