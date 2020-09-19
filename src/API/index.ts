import axios, { AxiosResponse } from 'axios';

const BACKEND_API_URL = 'http://localhost:3000';

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
