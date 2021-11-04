import axios from 'axios';
import handleError from './functions/handleError';
export interface ApiResponse<T> {
  success: boolean;
  httpCode: number;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
}
export interface GetPublicKeyResponse {
  key: string;
}
type Mode = 'sandbox' | 'production';
type Version = 'v1';
interface Constructor {
  mode: Mode;
  version: Version;
}

class Avify {
  public prodBaseUrl = 'https://api.avify.co';
  public sadboxBaseUrl = 'https://sandboxapi.avify.co';
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
      .get(this.baseUrl + '/gateway/key', {
        timeout: 10000
      })
      .catch((err) => {
        return err;
      });
    const error = handleError(response);
    if (error) {
      return error;
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
