import { Metadata } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://reasonmagazine.com';
  
  try {
    const docRef = doc(db, 'posts', slug);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const post = docSnap.data();
      return {
        title: post.title,
        description: post.excerpt || post.content?.substring(0, 160),
        alternates: {
          canonical: `${baseUrl}/post/${slug}`,
        },
        openGraph: {
          title: post.title,
          description: post.excerpt || post.content?.substring(0, 160),
          type: 'article',
          publishedTime: post.publishedAt?.toDate()?.toISOString(),
          authors: [post.authorName || 'Reason Magazine'],
          images: post.coverImage ? [post.coverImage] : [],
        },
        twitter: {
          card: 'summary_large_image',
          title: post.title,
          description: post.excerpt || post.content?.substring(0, 160),
          images: post.coverImage ? [post.coverImage] : [],
        }
      };
    }
  } catch (error) {
    console.error('Error fetching post metadata:', error);
  }
  
  return {
    title: 'Article Not Found',
  };
}

export default async function PostLayout({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://reasonmagazine.com';
  
  let jsonLd = null;
  
  try {
    const docRef = doc(db, 'posts', slug);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const post = docSnap.data();
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt || post.content?.substring(0, 160),
        image: post.coverImage ? [post.coverImage] : [],
        datePublished: post.publishedAt?.toDate()?.toISOString(),
        dateModified: post.updatedAt?.toDate()?.toISOString() || post.publishedAt?.toDate()?.toISOString(),
        author: [{
          '@type': 'Person',
          name: post.authorName || 'Reason Magazine',
          url: `${baseUrl}/author/${post.authorId || 'anonymous'}`,
        }],
        publisher: {
          '@type': 'Organization',
          name: 'Reason Magazine',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/post/${slug}`,
        },
      };
    }
  } catch (error) {
    console.error('Error generating JSON-LD:', error);
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
