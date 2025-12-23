// Client IP (UUID based) for API requests
const CLIENT_IP_KEY = 'client_ip_address';

export const getClientIp = (): string => {
  let clientIp = localStorage.getItem(CLIENT_IP_KEY);
  
  if (!clientIp) {
    // Generate UUID v4
    clientIp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    localStorage.setItem(CLIENT_IP_KEY, clientIp);
  }
  
  return clientIp;
};

export const getApiHeaders = (): HeadersInit => {
  return {
    'Accept-Language': 'uz',
  };
};

export const appendIpParam = (url: string): string => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}ip_address=${getClientIp()}`;
};

export const API_BASE_URL = 'https://api.xazratqulov.uz';

// Like/unlike a post
export const togglePostLike = async (postSlug: string): Promise<void> => {
  const url = appendIpParam(`${API_BASE_URL}/blog/like/`);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...getApiHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post_slug: postSlug,
      ip_address: getClientIp(),
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to toggle like');
  }
};
