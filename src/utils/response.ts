
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export const successResponse = (message: string, data?: any): ApiResponse => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message: string, error?: any): ApiResponse => ({
  success: false,
  message,
  error: process.env.NODE_ENV === 'development' ? error : undefined,
});