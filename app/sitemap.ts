import { MetadataRoute } from 'next';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://reasonmagazine.com';

  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/multimedia',
    '/logic-lab',
    '/secular-map',
    '/hall-of-heretics',
    '/secular-sanctuary',
    '/fallacy-finder',
    '/editor-life',
    '/editorial-team',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Fetch dynamic articles
    const postsQuery = query(collection(db, 'posts'), where('status', '==', 'published'));
    const postsSnapshot = await getDocs(postsQuery);
    
    const postRoutes = postsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        url: `${baseUrl}/articles/${data.slug}`,
        lastModified: data.updatedAt?.toDate() || data.publishedAt?.toDate() || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });

    // Fetch deep dives
    const deepDivesQuery = query(collection(db, 'deep_dives'), where('status', '==', 'published'));
    const deepDivesSnapshot = await getDocs(deepDivesQuery);
    
    const deepDiveRoutes = deepDivesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        url: `${baseUrl}/deep-dives/${data.slug}`,
        lastModified: data.updatedAt?.toDate() || data.publishedAt?.toDate() || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      };
    });

    return [...routes, ...postRoutes, ...deepDiveRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static routes if Firebase fetch fails
    return routes;
  }
}
