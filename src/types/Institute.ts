// types/index.ts
export type Institute = {
  id: number;
  name: string;
  code: string;
  type: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  principalName: string;
  principalContact: string;
  establishedYear: string;
  affiliation: string;
  campusArea: string;
  status: 'Active' | 'Inactive';
}

