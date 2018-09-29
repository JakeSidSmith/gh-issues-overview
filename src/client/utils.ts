import urlParse from 'url-parse';

export const getProxyUrl = (url: string) => {
  const parts = urlParse(url);
  return `/api${parts.pathname}${parts.query}`;
};
