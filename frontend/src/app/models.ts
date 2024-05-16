export type Company = {
  id: number;
  name: string;
  image: string;
};

export type Companies = { [id: number]: Company };

export type Application = {
  id: number;
  company: number;
  position: string;
  location?: string;
  job_type?: string;
  status: 'applied' | 'rejected';
  appliedDate: string;
  rejectedDate?: string;
};
