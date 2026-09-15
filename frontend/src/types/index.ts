export interface Service {
  id: string;
  name: string;
  category: 'Hair' | 'Nails' | 'Facials' | 'Massage';
  price: number;
  duration: number;
  description: string;
  image_url?: string;
}

export interface Stylist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image_url: string;
  rating: number;
}

export interface Booking {
  id: string;
  client_id: string;
  service_id: string;
  stylist_id: string;
  scheduled_date: string;
  scheduled_time: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
}

export interface AvailabilitySlot {
  id: string;
  stylist_id: string;
  date: string;
  time: string;
  is_available: boolean;
}

export interface Client {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  created_at: string;
}