export interface Attempt {
    _id: string;
    email: string;
    campaignName: string;
    description: string;
    status: string;
    createdAt: string;
}

export interface AttemptsTableProps {
    attempts: Attempt[];
}
