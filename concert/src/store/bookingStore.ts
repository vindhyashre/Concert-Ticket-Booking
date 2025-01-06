import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Booking {
  id: string;
  eventId: number;
  userId: string;
  numberOfTickets: number;
  totalAmount: number;
  bookingDate: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  ticketNumbers: string[];
}

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'ticketNumbers'>) => Booking;
  getUserBookings: (userId: string) => Booking[];
  cancelBooking: (bookingId: string) => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (bookingData) => {
        const booking: Booking = {
          ...bookingData,
          id: Math.random().toString(36).substr(2, 9),
          ticketNumbers: Array.from(
            { length: bookingData.numberOfTickets },
            (_, i) => `${bookingData.eventId}-${Date.now()}-${i + 1}`
          ),
        };
        set({ bookings: [...get().bookings, booking] });
        return booking;
      },
      getUserBookings: (userId) => {
        return get().bookings.filter(booking => booking.userId === userId);
      },
      cancelBooking: (bookingId) => {
        set({
          bookings: get().bookings.map(booking =>
            booking.id === bookingId
              ? { ...booking, status: 'cancelled' }
              : booking
          ),
        });
      },
    }),
    {
      name: 'booking-storage',
    }
  )
);
