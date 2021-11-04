import { ApiResponse } from '../Avify';

const handleError = (apiResponse: any): ApiResponse<any> => {
  if (apiResponse?.code === 'ECONNREFUSED') {
    // tslint:disable-next-line: no-console
    console.error('Error message: ' + apiResponse.message);
    return {
      success: false,
      httpCode: 500,
      error: {
        code: 'G-000',
        message: 'Oops parece que tenemos un problema con la conexión'
      }
    };
  }
  if (apiResponse?.response.status === 404) {
    return {
      success: false,
      httpCode: 404,
      error: {
        code: 'G-000',
        message: 'Oops parece que tenemos un problema con la conexión'
      }
    };
  }
  if (apiResponse.response?.status && apiResponse.response.status > 400) {
    return {
      success: false,
      httpCode: apiResponse.response.status,
      error: {
        code: apiResponse.response.data.error.code,
        message: apiResponse.response.data.error.displayMessage
      }
    };
  }
  return {
    success: false,
    httpCode: 404,
    error: {
      code: 'G-000',
      message: 'Oops parece que tenemos un problema con la conexión'
    }
  };
};
export default handleError;
