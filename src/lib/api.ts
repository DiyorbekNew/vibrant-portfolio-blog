// Client IP (UUID based) for API requests
const CLIENT_IP_KEY = 'client_ip_address';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.xazratqulov.uz';

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

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

// Centralized fetch wrapper with error handling
export const apiFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getApiHeaders(),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      let errorMessage = `API request failed: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        if (errorData.detail || errorData.message) {
          errorMessage = errorData.detail || errorData.message;
        }
      } catch {
        // If response is not JSON, use status text
      }

      throw new ApiError(
        errorMessage,
        response.status,
        response.statusText
      );
    }

    return await response.json() as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network errors or other fetch errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(
        'Network error: Unable to connect to the server. Please check your internet connection.',
        0,
        'Network Error'
      );
    }
    
    throw new ApiError(
      error instanceof Error ? error.message : 'An unknown error occurred',
      0
    );
  }
};

// Like/unlike a post
export const togglePostLike = async (postSlug: string): Promise<void> => {
  const url = appendIpParam(`${API_BASE_URL}/blog/like/`);
  await apiFetch<void>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      post_slug: postSlug,
      ip_address: getClientIp(),
    }),
  });
};
