// Общие интерфейсы для клиента и сервера
export interface ServerToClientEvents {
  assignManager: (managerID: string, id: string, user: User) => void;
}

export interface ClientToServerEvents {
  initUser: (user: PartialUser) => void;
}

export interface PartialUser {
  avatarURL: string;
  name: string;
}

export interface User extends PartialUser {
  id: string;
  status: "manager" | "user";
}
