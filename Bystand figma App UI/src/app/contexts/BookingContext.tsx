import { createContext, useContext, useState, ReactNode } from "react";

export interface Booking {
  id: string;
  service: string;
  serviceId: string;
  price: string;
  fromDate: string;
  toDate: string;
  address: string;
  status: "requested" | "ongoing" | "completed" | "cancelled";
  statusLabel: string;
  createdAt: string;
  bystander: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => string;
}

const BookingContext = createContext<BookingContextType | null>(null);

const SEED_BOOKINGS: Booking[] = [
  {
    id: "seed-1",
    service: "Patient Care Support",
    serviceId: "patient",
    price: "₹800/day",
    fromDate: "2026-03-31T08:00",
    toDate: "2026-03-31T20:00",
    address: "123 MG Road, Bengaluru",
    status: "ongoing",
    statusLabel: "Ongoing",
    createdAt: "2026-03-31",
    bystander: "Rajesh Kumar",
  },
  {
    id: "seed-2",
    service: "Elderly Assistance",
    serviceId: "elderly",
    price: "₹1000/day",
    fromDate: "2026-03-25T09:00",
    toDate: "2026-03-25T18:00",
    address: "456 Residency Road, Bengaluru",
    status: "completed",
    statusLabel: "Completed",
    createdAt: "2026-03-25",
    bystander: "Priya Sharma",
  },
];

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(SEED_BOOKINGS);

  const addBooking = (booking: Omit<Booking, "id" | "createdAt">) => {
    const id = `bk-${Date.now()}`;
    const newBooking: Booking = {
      ...booking,
      id,
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    setBookings((prev) => [newBooking, ...prev]);
    return id;
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookings must be inside BookingProvider");
  return ctx;
}
