import axios from 'axios';
import { ApiResponse, GetPublicKeyResponse } from './@types';

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
    const response = await axios.get(this.baseUrl + '/key');
    // tslint:disable-next-line: no-console
    console.log(response);
    return {
      data: {
        key: 'asjdhakjsd'
      },
      success: true,
      httpCode: 233
    };
  }
}
export default Avify;
