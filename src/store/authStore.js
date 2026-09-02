import { create } from 'zustand';
import usersData from '../data/users.json';

export const useAuthStore = create((set) => ({
  user: usersData[0], // Default logged in as Arjun Mehta for rich demo experience
  isAuthenticated: true,
  role: 'renter', // 'renter' | 'owner'

  login: (phone = '+91 98450 12345') => {
    // Find user or login default
    const existing = usersData.find(u => u.phone === phone) || usersData[0];
    set({ user: existing, isAuthenticated: true, role: existing.role });
  },

  switchRole: () => {
    set((state) => {
      const nextRole = state.role === 'renter' ? 'owner' : 'renter';
      const nextUser = nextRole === 'owner' ? usersData[1] : usersData[0];
      return { role: nextRole, user: nextUser };
    });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));
