import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Post } from '@/types';

export async function GET() {
  const postsRef = collection(db, 'posts');
  const q = query(
    postsRef,
    where('status', '==', 'published'),
    orderBy('publishedAt', 'desc'),
    limit(20)
  );

  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map(doc => doc.data() as Post);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reason-magazine.com';
  
  const rssItems = posts.map(post => {
    let dateObj: Date;
    if (post.publishedAt && typeof post.publishedAt.toDate === 'function') {
      dateObj = post.publishedAt.toDate();
    } else if (typeof post.publishedAt === 'string') {
      dateObj = new Date(post.publishedAt);
    } else {
      dateObj = new Date();
    }
    const pubDate = dateObj.toUTCString();
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/post/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/post/${post.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      ${post.category ? `<category>${post.category}</category>` : ''}
    </item>`;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2001/Atom"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
  xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
>
  <channel>
    <title>Reason Magazine</title>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
    <link>${siteUrl}</link>
    <description>Secularism, Science, and Rationalist Activism</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-US</language>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
