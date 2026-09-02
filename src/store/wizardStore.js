import { create } from 'zustand';

export const useWizardStore = create((set) => ({
  step: 1,
  formData: {
    category: 'cameras',
    title: '',
    description: '',
    pricePerDay: '',
    securityDeposit: '',
    minDays: 1,
    maxDays: 14,
    instantBooking: true,
    neighborhood: 'Indiranagar, Bengaluru',
    images: [],
    specs: []
  },

  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

  updateField: (field, value) => set((state) => ({
    formData: { ...state.formData, [field]: value }
  })),

  resetWizard: () => set({
    step: 1,
    formData: {
      category: 'cameras',
      title: '',
      description: '',
      pricePerDay: '',
      securityDeposit: '',
      minDays: 1,
      maxDays: 14,
      instantBooking: true,
      neighborhood: 'Indiranagar, Bengaluru',
      images: [],
      specs: []
    }
  })
}));
