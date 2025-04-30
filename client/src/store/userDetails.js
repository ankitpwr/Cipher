import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { create } from "zustand";

const baseURL = import.meta.env.VITE_BASE_URL;

const userDetails = (set) => ({
  user: null,
  loading: false,
  InvalidUser: false,
  fetchUser: async () => {
    set((state) => ({ loading: true }));

    try {
      const response = await axios(
        `${baseURL}/api/user/user-details`,
        {},
        {
          withCredentials: true,
        }
      );
      const userData = response.data.message;
      set((state) => ({ user: userData, loading: false }));
    } catch (error) {
      const code = error.response?.status;
      if (code === 401 || code === 403) {
        toast.error("Please login first");
        set({ InvalidUser: true, loading: false });
      } else {
        toast.error("An unexpected error occurred");
        set({ loading: false });
      }
    }
  },
});

const useUserDetailsStore = create(userDetails);
export default useUserDetailsStore;
