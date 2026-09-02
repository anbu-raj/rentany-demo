import { create } from 'zustand';

export const useBookingStore = create((set, get) => ({
  listing: null,
  startDate: '2026-09-10',
  endDate: '2026-09-13',
  totalDays: 3,

  setListing: (listing) => set({ listing }),
  
  setDateRange: (startDate, endDate, totalDays) => {
    set({ startDate, endDate, totalDays });
  },

  calculateTotal: () => {
    const { listing, totalDays } = get();
    if (!listing) return { rent: 0, fee: 0, deposit: 0, total: 0 };
    const rent = listing.pricePerDay * (totalDays || 1);
    const fee = Math.round(rent * 0.1);
    const deposit = listing.securityDeposit;
    return {
      rent,
      fee,
      deposit,
      total: rent + fee + deposit
    };
  },

  resetBooking: () => set({ listing: null, totalDays: 3 })
}));
