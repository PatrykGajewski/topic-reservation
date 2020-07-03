import axios from 'axios';

const BACKEND_API_URL = 'http://localhost:3000';

export class API {
  static verifyUser = (email: string, password: string) => (
    axios.get(`${BACKEND_API_URL}/users?email=${email}&password=${password}`)
  );
}
