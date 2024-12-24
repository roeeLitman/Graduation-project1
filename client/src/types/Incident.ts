export interface Incident {
    _id?: string;
    city: string;
    organization: string;
    attacktype: string;
    year: number | null
    month: number |null
    lat: number | null;
    long: number | null;
    casualties: number | null;
    __v?: number | null;
  }

  