'use client';

import AdminContentPage from '@/components/admin/AdminContentPage';

export default function AdminMultimedia() {
  return (
    <AdminContentPage 
      title="Multimedia Hub"
      description="Manage podcasts and video essays."
      collectionName="multimedia"
      displayFields={['title', 'type', 'duration']}
      fields={[
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'description', label: 'Description', type: 'textarea', required: true },
        { key: 'type', label: 'Type', type: 'select', options: ['podcast', 'video'], required: true },
        { key: 'url', label: 'Media URL', type: 'url', required: true },
        { key: 'thumbnail', label: 'Thumbnail URL', type: 'url', required: true },
        { key: 'category', label: 'Category', type: 'text', required: true },
        { key: 'duration', label: 'Duration (e.g. 45:20)', type: 'text', required: true }
      ]}
    />
  );
}
