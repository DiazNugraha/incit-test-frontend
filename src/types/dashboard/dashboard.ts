export interface User {
  id: number;
  email: string;
  name: string;
  loginCount: number;
  lastLoginAt: Date;
  lastLogoutAt: Date;
  createdAt: Date;
}

export interface Statistic {
  [key: string]: string | number;
  userCount: number;
  activeUserCount: number;
  averageActiveUserCount: string;
}

export interface Identity {
  name: string;
  email: string;
}
