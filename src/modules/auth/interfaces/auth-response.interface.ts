export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    fullName: string;
    role: string;
  };
}
export interface AuthRegisterResponse {
  user: {
    email: string;
    fullName: string;
    role: string;
  };
}