import axios, { AxiosResponse } from 'axios';

require('dotenv').config();

// NOTE that each env variable should start with REACT_APP_ prefix
// other named variables except NODE_ENV will be ignored
// NOTE after env variable change you should launch app one more time (process.env)
const BACKEND_API_URL = process.env.REACT_APP_API_URL;

// eslint-disable-next-line import/prefer-default-export
export class API {
  static get = (path: string): Promise<any> => (
    axios.get(`${BACKEND_API_URL}${path}`)
  );

  static post = (path: string, data: any): Promise<any> => (
    axios.post(`${BACKEND_API_URL}${path}`, data)
  );

  static put = (path: string, data: any): Promise<any> => (
    axios.put(`${BACKEND_API_URL}${path}`, data)
  );

  static patch = (path: string, data: any): Promise<any> => (
    axios.patch(`${BACKEND_API_URL}${path}`, data)
  )
}
