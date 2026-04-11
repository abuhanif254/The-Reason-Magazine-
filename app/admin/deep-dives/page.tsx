'use client';

import AdminContentPage from '@/components/admin/AdminContentPage';

export default function AdminDeepDives() {
  return (
    <AdminContentPage 
      title="Deep Dives"
      description="Manage immersive editorial series."
      collectionName="deep_dives"
      displayFields={['title', 'author', 'slug']}
      fields={[
        { key: 'title', label: 'Series Title', type: 'text', required: true },
        { key: 'slug', label: 'Slug (URL)', type: 'text', required: true },
        { key: 'subtitle', label: 'Subtitle', type: 'text' },
        { key: 'author', label: 'Author Name', type: 'text', required: true },
        { key: 'readTime', label: 'Read Time (e.g. 15 min)', type: 'text' },
        { key: 'image', label: 'Hero Image URL', type: 'url', required: true },
        { key: 'accentColor', label: 'Accent Color (Hex)', type: 'text' },
        { key: 'parts', label: 'Number of Parts', type: 'number' },
        { key: 'description', label: 'Series Description', type: 'textarea', required: true }
      ]}
    />
  );
}
