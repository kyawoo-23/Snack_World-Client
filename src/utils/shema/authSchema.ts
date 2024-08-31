export type TRegisterCustomerSchema = {
  name: string;
  email: string;
  password: string;
};

export type TLoginCustomerSchema = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
  name: string;
  sub: string;
  email: string;
};

export type TUser = {
  name: string;
  email: string;
  id: string;
};
