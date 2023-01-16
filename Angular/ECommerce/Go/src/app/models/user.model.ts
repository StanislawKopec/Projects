export interface User {
  id: string;
  userName: string;
  password: string;
  LoggedIn: boolean;
}
export interface UserArray {
  properties: Array<User>;
}
