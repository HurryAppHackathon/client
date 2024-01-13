import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export class Api {
  axios = axios.create({
    baseURL: 'http://172.20.10.6:40000/api/v1',
    withCredentials: true,
  });
  auth = new Auth(this);
}
interface RegisterDto {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}
class Auth {
  constructor(public api: Api) {}
  me() {
    return this.api.axios.get('/auth/@me');
  }
  login() {
    return this.api.axios.get('/auth/login');
  }
  register(data: RegisterDto) {
    return this.api.axios.post('/auth/register');
  }
}
class User {
  constructor(public api: Api) {}
}
