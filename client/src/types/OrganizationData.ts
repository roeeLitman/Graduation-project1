export interface OrganizationData {
    _id: string;
    totalEvents: number;
    lat: number;
    long: number;
    organization: string;
}

export interface EventData {
    _id: string;
    name: string;
    casualties: number;
    lat: number;
    long: number;
    eventsCount: number;
}