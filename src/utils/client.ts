import axios, { AxiosError } from 'axios';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import {
  CreatePartyDto,
  EditVideoDto,
  IParty,
  IUser,
  IVideo,
  LoginDto,
  RegisterDto,
  RegisterRes,
  TParties,
} from './interfaces';
const cookies = new Cookies();

export class ApiClient {
  private api: Api = new Api();
  get token() {
    return this.api.auth.token;
  }
  async register(data: RegisterDto) {
    try {
      const res = (await this.api.auth.register(data)).data;
      toast.success('Successfully, logged in!');
      localStorage.setItem('token', res.data.token);
      return res;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  async login(data: LoginDto) {
    try {
      const res = (await this.api.auth.login(data)).data;
      localStorage.setItem('token', res.data.token);
      toast.success('Successfully, logged in!');
      return res;
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  async getUser() {
    const res = (await this.api.auth.me()).data;
    return res;
  }
}

export class Api {
  axios = axios.create({
    baseURL: 'http://104.248.128.150:40000/api/v1',
    withCredentials: true,
  });
  auth = new Auth(this);
  parties = new Parties(this);
  videos = new Videos(this);
  constructor() {
    this.axios.defaults.headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.auth.token}`,
    };
  }
}
class Auth {
  constructor(public api: Api) {}
  get token() {
    return localStorage.getItem('token');
  }
  me() {
    return this.api.axios.get<IUser>('/auth/@me');
  }
  login(data: LoginDto) {
    return this.api.axios.post<RegisterRes>('/auth/login', data);
  }
  register(data: RegisterDto) {
    return this.api.axios.post<RegisterRes>('/auth/register', data);
  }
}
type TMethod = 'public' | 'private' | 'own';
class Parties {
  constructor(public api: Api) {}
  getAll(type?: TMethod) {
    return this.api.axios.get<TParties>('parties?type=' + type);
  }
  get_hack(id: string) {
    return this.api.axios.get<{ data: IParty }>('parties/' + id, {
      headers: {
        Authorization:
          'Bearer 22|7RNMgsOC4rAzrxt5r3X587V5oAj9buN62vU2DrtX0c8793e2',
      },
    });
  }
  get(id: string) {
    return this.api.axios.get<{ data: IParty }>('parties/' + id);
  }
  create(data: CreatePartyDto) {
    return this.api.axios.post<{ data: IParty }>('parties', data);
  }
}

class Videos {
  constructor(public api: Api) {}
  upload_videos(body: FormData) {
    return this.api.axios.post('/videos', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  getAll(type?: TMethod) {
    return this.api.axios.get<{ data: IVideo['data'][] }>(
      'videos?type=' + type,
    );
  }
  get(id: string) {
    return this.api.axios.get<IVideo>('videos/' + id);
  }

  edit(id: number, data: EditVideoDto) {
    return this.api.axios.patch<IVideo>('videos/' + id, data);
  }
}
