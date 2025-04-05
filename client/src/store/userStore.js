import { create } from 'zustand';

export const useUserList = create((set) => ({
  users: [],
  setUsers: (data) => set((state) => ({ ...state, users: data })),
  updateUser: async (updatedUser) => {
    set((state) => ({
      ...state,
      users: state.users.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      ),
    }));
  },
}));
