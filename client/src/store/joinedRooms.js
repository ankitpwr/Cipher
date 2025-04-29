import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

const baseURL = import.meta.env.VITE_BASE_URL;

const joinedRooms = (set) => ({
  rooms: [],
  loading: false,

  fetchRooms: async () => {
    set((state) => ({ loading: true }));

    try {
      const response = await axios.get(`${baseURL}/api/room/get-joined-rooms`, {
        withCredentials: true,
      });
      // if (response.status != 200) {
      //   toast.error("Error Occured");
      // } else {
      set((state) => ({ rooms: response.data.message, loading: false }));
      // }
    } catch (error) {
      toast.error("unexpected error");
    }
  },
});

const usejoinedRoomsStore = create(joinedRooms);

export default usejoinedRoomsStore;
