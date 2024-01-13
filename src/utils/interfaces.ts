export interface RegisterDto {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export interface RegisterRes {
  data: {
    token: string;
  };
}

export interface LoginDto {
  username: string;
  password: string;
}
export interface IUser {
  data: {
    user: {
      id: number;
      username: string;
      first_name: string;
      last_name: string;
      email: string;
      avatar_url: string;
      created_at: string;
      updated_at: string;
    };
  };
}

export type TParties = {data: IParty[]};

export interface IParty {
  id: number;
  user_id: number;
  name: string;
  image_url: string;
  is_public: boolean;
  owner: IUser['data']['user'];
  finished_at: null;
  created_at: string;
}
