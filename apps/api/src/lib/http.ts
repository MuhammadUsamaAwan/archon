export function httpResponse<T>(data: T, message?: string): { data?: T; message?: string } {
  return {
    data,
    message: message ?? 'Request successful',
  };
}
