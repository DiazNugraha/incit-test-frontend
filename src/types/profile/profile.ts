export interface ChangePasswordPayload {
  oldPassword: string | null;
  newPassword: string;
  retypePassword: string;
}
