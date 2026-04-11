import { Metadata } from 'next';
import EditorLifeClient from './EditorLifeClient';

export const metadata: Metadata = {
  title: 'Editor Life | Behind the Scenes at Reason Magazine',
  description: 'Explore the daily rhythms, tools, and philosophy of the editorial team at Reason Magazine. A behind-the-scenes look at rationalist journalism.',
  openGraph: {
    title: 'Editor Life | Reason Magazine',
    description: 'A behind-the-scenes look at the daily lives, tools, and philosophy of the editorial team at Reason Magazine.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editor Life | Reason Magazine',
    description: 'A behind-the-scenes look at the daily lives, tools, and philosophy of the editorial team at Reason Magazine.',
  },
};

export default function EditorLifePage() {
  return <EditorLifeClient />;
}
