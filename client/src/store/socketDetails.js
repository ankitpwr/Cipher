import { create } from "zustand";

const socketDetails = (set) => ({
  socket: null,

  setSocket: (currentSocket) => {
    set((state) => ({ socket: currentSocket }));
  },
});

const usesocketDetails = create(socketDetails);
export default usesocketDetails;
