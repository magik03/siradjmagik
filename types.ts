export enum ServerType {
  FAMILY = 'فاميلي',
  NEO = 'نيو',
}

export enum ServerDuration {
  ONE_MONTH = 1,
  THREE_MONTHS = 3,
  SIX_MONTHS = 6,
  ONE_YEAR = 12,
}

export interface Server {
  id: string;
  name: string;
  type: ServerType;
  duration: ServerDuration;
  url: string;
  isPaid: boolean; // New field for payment status
  startDate: string; // ISO String
  endDate: string; // ISO String
}

export interface ServerFormData {
  name: string;
  type: ServerType;
  duration: ServerDuration;
  url: string;
  isPaid: boolean;
}