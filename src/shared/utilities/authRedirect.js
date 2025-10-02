/**
 * Utility functions for handling authentication redirects
 */

/**
 * Get the next URL from search parameters
 * @param {URLSearchParams} searchParams - The search parameters from useSearchParams()
 * @returns {string} - The next URL or default path
 */
export const getNextUrl = (searchParams) => {
  return searchParams.get('next') || '/';
};

/**
 * Create a redirect URL with next parameter
 * @param {string} currentPath - The current pathname
 * @param {string} searchParams - The current search parameters
 * @param {string} loginPath - The login path (default: '/login')
 * @returns {string} - The redirect URL with next parameter
 */
export const createRedirectUrl = (currentPath, searchParams = '', loginPath = '/login') => {
  const nextUrl = searchParams ? `${currentPath}${searchParams}` : currentPath;
  return `${loginPath}?next=${encodeURIComponent(nextUrl)}`;
};

/**
 * Validate if a URL is safe to redirect to
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is safe to redirect to
 */
export const isSafeRedirectUrl = (url) => {
  try {
    const urlObj = new URL(url, window.location.origin);
    // Only allow same-origin redirects
    return urlObj.origin === window.location.origin;
  } catch {
    // If URL parsing fails, check if it's a relative path
    return url.startsWith('/') && !url.startsWith('//');
  }
};

/**
 * Get safe redirect URL
 * @param {string} url - The URL to check
 * @param {string} fallback - The fallback URL (default: '/')
 * @returns {string} - Safe redirect URL
 */
export const getSafeRedirectUrl = (url, fallback = '/') => {
  return isSafeRedirectUrl(url) ? url : fallback;
};
