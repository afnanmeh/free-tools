import { MetadataRoute } from 'next';
import { TOOLS, CATEGORIES } from '@/config/tools.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toolsey.org';
  
  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Category pages
  Object.keys(CATEGORIES).forEach((categoryKey) => {
    routes.push({
      url: `${baseUrl}/${categoryKey}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  // Tool pages
  TOOLS.forEach((tool) => {
    routes.push({
      url: `${baseUrl}${tool.path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Static pages
  const staticPages = [
    { path: '/contact', priority: 0.7 },
    { path: '/privacy', priority: 0.5 },
    { path: '/terms', priority: 0.5 },
  ];

  staticPages.forEach((page) => {
    routes.push({
      url: `${baseUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: page.priority,
    });
  });

  return routes;
}
