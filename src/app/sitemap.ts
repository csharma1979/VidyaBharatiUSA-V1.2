import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vidyabharatiusa.org';
  const lastModified = new Date();

  const routes = [
    '',
    '/about',
    '/programs',
    '/impact',
    '/events',
    '/donate',
    '/gallery',
    '/contact',
    '/alumni',
    '/sponsor',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
