import { create } from 'zustand';

export const useClientList = create((set) => ({
  clients: [],
  setClients: (data) => set((state) => ({ ...state, users: data })),
  updateClient: async (updatedUser) => {
    set((state) => ({
      ...state,
      users: state.users.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      ),
    }));
  },
}));
