export interface ApiResponse<T> {
  success: boolean;
  httpCode: number;
  data: T;
  error?: {
    message: string;
    code: string;
  };
}
export interface GetPublicKeyResponse {
  key: string;
}
