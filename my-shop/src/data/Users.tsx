// src/data/users.ts

export interface User {
  id: number;
  username: string;
  password: string; // W prawdziwej aplikacji hasła są hashowane!
}

export const users: User[] = [
  { id: 1, username: "admin", password: "admin123" },
  { id: 2, username: "user1", password: "password1" },
  { id: 3, username: "user2", password: "password2" },
];
