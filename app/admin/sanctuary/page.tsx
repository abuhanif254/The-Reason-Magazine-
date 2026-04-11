'use client';

import AdminContentPage from '@/components/admin/AdminContentPage';

export default function AdminSanctuary() {
  return (
    <AdminContentPage 
      title="Secular Sanctuary"
      description="Manage support resources and organizations."
      collectionName="sanctuary"
      displayFields={['name', 'category', 'region']}
      fields={[
        { key: 'name', label: 'Organization Name', type: 'text', required: true },
        { key: 'category', label: 'Category', type: 'select', options: ['Legal Aid', 'Psychological Support', 'Community', 'Emergency'], required: true },
        { key: 'region', label: 'Region', type: 'select', options: ['Global', 'North America', 'Europe', 'Middle East', 'Asia', 'Africa'], required: true },
        { key: 'description', label: 'Description of Services', type: 'textarea', required: true },
        { key: 'website', label: 'Website URL', type: 'url', required: true },
        { key: 'contact', label: 'Contact Info (Phone/Email)', type: 'text', required: false },
        { key: 'tags', label: 'Tags (comma separated)', type: 'text', required: true }
      ]}
    />
  );
}
