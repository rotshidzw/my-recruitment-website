export const getToken = () => {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('token='));
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      return token;
    }
  }
  return null; // or return an empty string
};

export const setToken = (token) => {
  // Set the token as a cookie
  document.cookie = `token=${token}; path=/; secure=true; sameSite=strict`;
};

export const removeToken = () => {
  // Remove the token cookie
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
export function getCookie(name) {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1, cookie.length);
      }
    }
  }
  return '';
}
