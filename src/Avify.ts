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
export type Mode = 'sandbox' | 'production';
type Version = 'v1';
export interface Constructor {
  mode: Mode;
  version: Version;
}

export interface CheckoutOptions {
  currency: 'USD' | 'CRC';
  cardHolder: string;
  cardNumber: string;
  cvc: string;
  expMonth: string;
  expYear: string;
}
class Avify {
  public prodBaseUrl = 'https://api.avify.co';
  public sadboxBaseUrl = 'https://sandboxapi.avify.co';
  public baseUrl: string;
  public mode: string;
  public publicKey: string | undefined;
  constructor({ mode, version }: Constructor) {
    this.mode = mode;
    this.baseUrl =
      (mode === 'sandbox' ? this.sadboxBaseUrl : this.prodBaseUrl) +
      '/api/' +
      version;
  }
  async getPublicKey(): Promise<ApiResponse<GetPublicKeyResponse>> {
    if (this.publicKey) {
      return {
        data: {
          key: this.publicKey
        },
        success: true,
        httpCode: 200
      };
    }
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
    this.publicKey = response.data.key;
    return {
      data: {
        key: response.data.key
      },
      success: true,
      httpCode: response.status
    };
  }
  async encrypt(text: string): Promise<ApiResponse<string>> {
    const pubKey = await this.getPublicKey();
    if (!pubKey.success) {
      return {
        httpCode: pubKey.httpCode,
        success: false,
        error: pubKey.error
      };
    }

    // tslint:disable-next-line: prefer-const
    if (typeof window === 'undefined') {
      const crypto = await import('crypto');
      const buf = Buffer.from(text, 'utf8');

      // Encrypting the text
      const secretData = crypto.publicEncrypt(
        {
          key: pubKey.data?.key || 'nothing',
          padding: crypto.constants.RSA_PKCS1_PADDING
        },
        buf
      );
      // printing the encrypted text

      return {
        data: secretData.toString('base64'),
        success: true,
        httpCode: 200
      };
    }
    const jsEncrypt = (await import('jsencrypt')).default;

    const jsencrypt = new jsEncrypt();
    jsencrypt.setPublicKey(pubKey.data?.key || 'nothing');
    const secret = jsencrypt.encrypt(text);
    if (!secret) {
      return {
        error: {
          message: 'Error al intentar encriptar el mensaje',
          code: 'G-000'
        },
        success: false,
        httpCode: 500
      };
    }
    return {
      data: secret,
      success: true,
      httpCode: 200
    };
  }
  async checkout(options: CheckoutOptions): Promise<ApiResponse<any>> {
    const encryptedCard = await this.encrypt(JSON.stringify(options));
    console.log(encryptedCard);
    const response = await axios
      .post(
        this.baseUrl + '/gateway/checkout',
        {
          card: encryptedCard.data
        },
        {
          timeout: 10000
        }
      )
      .catch((err) => {
        return err;
      });
    const error = handleError(response);
    if (error) {
      return error;
    }
    const data = response.data;
    return {
      data,
      success: true,
      httpCode: 200
    };
  }
}
export default Avify;
