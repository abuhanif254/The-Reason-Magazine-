'use client';

import AdminContentPage from '@/components/admin/AdminContentPage';

export default function AdminFallacies() {
  return (
    <AdminContentPage 
      title="Fallacy Finder"
      description="Manage logical fallacies and examples."
      collectionName="fallacies"
      displayFields={['name', 'category']}
      fields={[
        { key: 'name', label: 'Fallacy Name', type: 'text', required: true },
        { key: 'latinName', label: 'Latin Name (optional)', type: 'text', required: false },
        { key: 'category', label: 'Category', type: 'select', options: ['Relevance', 'Ambiguity', 'Presumption', 'Causal'], required: true },
        { key: 'description', label: 'Definition/Description', type: 'textarea', required: true },
        { key: 'example', label: 'Common Example', type: 'textarea', required: true },
        { key: 'rebuttal', label: 'How to Counter', type: 'textarea', required: true }
      ]}
    />
  );
}
