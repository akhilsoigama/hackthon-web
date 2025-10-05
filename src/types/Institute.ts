// types/index.ts
export type Institute = {
  id: number
  name: string
  code: string
  address: string
  city: string
  state: string
  country: string
  pincode: string
  phone: string
  email: string
  website?: string
  principalName: string
  principalEmail: string
  principalContact: string
  establishedYear: number
  affiliation: string
  principalQualification: string
  principalExperience: number
  status: 'Active' | 'Inactive'
}


