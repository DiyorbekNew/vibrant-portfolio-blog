/**
 * Date utility functions for formatting dates in Uzbek locale
 */

/**
 * Formats a date string to a readable format in Uzbek
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString;
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    // Use Uzbek locale if available, fallback to default
    try {
      return new Intl.DateTimeFormat('uz-UZ', options).format(date);
    } catch {
      return date.toLocaleDateString('uz-UZ', options);
    }
  } catch {
    return dateString;
  }
};

/**
 * Formats a date string to a relative time (e.g., "2 kun oldin")
 * @param dateString - ISO date string
 * @returns Relative time string in Uzbek
 */
export const formatRelativeTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return "hozirgina";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} daqiqa oldin`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} soat oldin`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} kun oldin`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} oy oldin`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} yil oldin`;
  } catch {
    return dateString;
  }
};

/**
 * Formats a date string to a short format (e.g., "12.03.2024")
 * @param dateString - ISO date string
 * @returns Short formatted date string
 */
export const formatShortDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return dateString;
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  } catch {
    return dateString;
  }
};


