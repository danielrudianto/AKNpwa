export interface User {
  Id?: number;
  Email: string;
  FirstName: string;
  LastName: string;
  UserPosition: UserPosition[];
  ImageUrl: string | null;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserPosition {
  Id?: number;
  EffectiveDate: Date;
  CreatedDate: Date;
  Position: number;
}
