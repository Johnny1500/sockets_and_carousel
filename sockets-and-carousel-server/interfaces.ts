export interface ServerToClientEvents {
  assignManager: (id: string) => void;
}

export interface ClientToServerEvents {
  initUser: (name: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
}
