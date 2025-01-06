import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  availableSeats: number;
  category: string;
  imageUrl: string;
  description: string;
}

interface EventStore {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: number, event: Partial<Event>) => void;
  deleteEvent: (id: number) => void;
  getEvent: (id: number) => Event | undefined;
}

export const useEventStore = create<EventStore>()(
  persist(
    (set, get) => ({
      events: [
        {
          id: 1,
          title: "Rock Revolution 2025",
          date: "2025-02-15",
          time: "20:00",
          location: "New York Arena",
          price: 99.99,
          availableSeats: 100,
          category: "Rock",
          imageUrl: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=500&auto=format",
          description: "Experience the ultimate rock concert with legendary performers!"
        }
      ],
      addEvent: (event) => {
        const events = get().events;
        const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
        set({ events: [...events, { ...event, id: newId }] });
      },
      updateEvent: (id, updatedEvent) => {
        set({
          events: get().events.map(event =>
            event.id === id ? { ...event, ...updatedEvent } : event
          )
        });
      },
      deleteEvent: (id) => {
        set({ events: get().events.filter(event => event.id !== id) });
      },
      getEvent: (id) => get().events.find(event => event.id === id),
    }),
    {
      name: 'event-storage',
    }
  )
);
