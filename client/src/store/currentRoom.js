import axios from "axios";
import { create } from "zustand";

const baseURL = import.meta.env.VITE_BASE_URL;

const currentRoom = (set, get) => ({
  currentRoom: null,
  currentRoomChats: [],
  loading: true,
  newRoom: null,

  setCurrentRoom: (newRoom) => set((state) => ({ currentRoom: newRoom })),
  setnewRoom: (value) => set((state) => ({ newRoom: value })),

  fetchRoomChat: async (roomId) => {
    set((state) => ({ loading: true }));

    try {
      const response = await axios.get(
        `${baseURL}/api/room/get-message/${roomId}`,
        {
          withCredentials: true,
        }
      );
      set((state) => ({ currentRoomChats: response.data.message }));
    } catch (error) {}
  },

  removeChat: ({ roomId, messageId }) => {
    const { currentRoom } = get();

    if (!currentRoom || roomId != currentRoom.roomId) return;
    set((state) => ({
      currentRoomChats: state.currentRoomChats.filter(
        (m) => m.messageId != messageId
      ),
    }));
  },

  addChat: async (newMessage) => {
    const { currentRoom } = get();
    if (currentRoom && newMessage.roomId == currentRoom.roomId) {
      set((state) => ({
        currentRoomChats: [...state.currentRoomChats, newMessage],
      }));
    }
  },
});

const useCurrentRoomStore = create(currentRoom);

export default useCurrentRoomStore;
