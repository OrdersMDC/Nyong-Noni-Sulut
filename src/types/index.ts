export type RegistrationStatus = 'pending' | 'verified' | 'rejected' | 'finalist'

export interface RegistrationFormData {
  full_name: string
  email: string
  phone: string
  date_of_birth: string
  address: string
  city: string
  province: string
  height_cm: number
  weight_kg: number
  occupation: string
  education: string
  photo?: File
}
