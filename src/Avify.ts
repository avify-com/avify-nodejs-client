import axios, { AxiosResponse } from 'axios';
import { ApiResponse, GetPublicKeyResponse } from './@types';

type Mode = 'sandbox' | 'production';
type Version = 'v1';
interface Constructor {
  mode: Mode;
  version: Version;
}
class Avify {
  public prodBaseUrl = 'https://api.avify.co';
  public sadboxBaseUrl = 'http://localhost:3000';
  public baseUrl: string;
  public mode: string;
  constructor({ mode, version }: Constructor) {
    this.mode = mode;
    this.baseUrl =
      (mode === 'sandbox' ? this.sadboxBaseUrl : this.prodBaseUrl) +
      '/api/' +
      version;
  }
  async getPublicKey(): Promise<ApiResponse<GetPublicKeyResponse>> {
    const response = await axios
      .get(this.baseUrl + '/gateway/key')
      .catch((err) => {
        if (err.code === 'ECONNREFUSED') {
          // tslint:disable-next-line: no-console
          console.error('Error message: ' + err.message);
        }
        return err;
      });
    // tslint:disable-next-line: no-console
    if (!response) {
      return {
        success: false,
        httpCode: 500,
        error: {
          code: 'G-000',
          message: 'Oops parece que tenemos un problema con la conexión'
        }
      };
    }
    if (response.response?.status && response.response.status > 400) {
      return {
        success: false,
        httpCode: response.response.status,
        error: {
          code: response.response.data.error.code,
          message: response.response.data.error.displayMessage
        }
      };
    }
    return {
      data: {
        key: response.data.key
      },
      success: true,
      httpCode: response.status
    };
  }
}
export default Avify;
