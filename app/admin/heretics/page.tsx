'use client';

import AdminContentPage from '@/components/admin/AdminContentPage';

export default function AdminHeretics() {
  return (
    <AdminContentPage 
      title="Hall of Heretics"
      description="Manage historical figures of rationalism and dissent."
      collectionName="heretics"
      displayFields={['name', 'era', 'title']}
      fields={[
        { key: 'name', label: 'Name', type: 'text', required: true },
        { key: 'era', label: 'Era', type: 'select', options: ['Ancient', 'Enlightenment', 'Modern'], required: true },
        { key: 'dates', label: 'Dates (e.g. 341–270 BC)', type: 'text', required: true },
        { key: 'title', label: 'Title (e.g. The Logician)', type: 'text', required: true },
        { key: 'bio', label: 'Full Biography', type: 'textarea', required: true },
        { key: 'quote', label: 'Famous Quote', type: 'textarea', required: true },
        { key: 'image', label: 'Image URL', type: 'url', required: true },
        { key: 'legacy', label: 'Legacy Description', type: 'textarea', required: true }
      ]}
    />
  );
}
