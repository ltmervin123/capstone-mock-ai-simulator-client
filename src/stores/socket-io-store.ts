// src/stores/socket-store.ts
import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
const API_ENDPOINT = import.meta.env.VITE_APP_API_URL;

interface SocketState {
  socket: Socket | null;
  connected: boolean;
  connectSocket: () => void;
  disconnectSocket: () => void;
  emitEvent: (event: string, data?: any) => void;
}

const socketStore = create<SocketState>((set, get) => ({
  socket: null,
  connected: false,

  connectSocket: () => {
    if (get().socket) {
      get().disconnectSocket();
    }

    const socketInstance = io(API_ENDPOINT, {
      path: '/socket.io',
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
      withCredentials: true,
    });

    socketInstance.on('connect', () => {
      console.log('Socket connected');
      set({ connected: true });
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      set({ connected: false });
    });

    socketInstance.on('reconnect', (attemptNumber) => {
      console.log(`Socket reconnected after ${attemptNumber} attempts`);
      set({ connected: true });
    });

    socketInstance.on('reconnect_attempt', (attemptNumber) => {
      console.log(`Socket reconnection attempt #${attemptNumber}`);
    });

    socketInstance.on('reconnecting', (attemptNumber) => {
      console.log(`Socket reconnecting... attempt #${attemptNumber}`);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      set({ connected: false });
    });

    set({ socket: socketInstance });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, connected: false });
    }
  },

  emitEvent: (event, data) => {
    const { socket, connected } = get();

    if (!socket) {
      console.warn('Cannot emit event: socket is null');
      return;
    }

    if (!connected) {
      console.warn('Cannot emit event: socket not connected');
      return;
    }

    socket.emit(event, data);
  },
}));

export default socketStore;
