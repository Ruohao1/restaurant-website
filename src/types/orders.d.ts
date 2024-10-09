interface Reservation {
  date: string;
  guest_email: string | null;
  guest_name: string | null;
  guest_phone: string | null;
  guests: number;
  id: number;
  message: string | null;
  time: string;
  users_id: string | null;
}
