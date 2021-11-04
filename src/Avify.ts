import { ApiResponse, GetPublicKeyResponse } from './@types';

type Mode = 'sandbox' | 'production';
type Version = 'v1';
interface Constructor {
  mode: Mode;
  version: Version;
}
class Avify {
  public prodBaseUrl = 'https://localhost:3000';
  public sadboxBaseUrl = 'https://api.avify.co';
  public baseUrl: string;
  public mode: string;
  constructor({ mode, version }: Constructor) {
    this.mode = mode;
    this.baseUrl =
      (mode === 'sandbox' ? this.sadboxBaseUrl : this.prodBaseUrl) +
      '/' +
      version;
  }
  async getPublicKey(): Promise<ApiResponse<GetPublicKeyResponse>> {
    const response = await fetch(this.baseUrl + '/gateway');
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
