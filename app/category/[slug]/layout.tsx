import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const capitalizedSlug = decodedSlug.charAt(0).toUpperCase() + decodedSlug.slice(1);
  
  return {
    title: `${capitalizedSlug} Articles`,
    description: `Read the latest articles and deep dives about ${decodedSlug} on Reason Magazine.`,
    openGraph: {
      title: `${capitalizedSlug} Articles | Reason Magazine`,
      description: `Read the latest articles and deep dives about ${decodedSlug} on Reason Magazine.`,
      url: `/category/${slug}`,
    }
  };
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
