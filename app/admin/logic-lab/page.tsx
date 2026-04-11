'use client';

import AdminContentPage from '@/components/admin/AdminContentPage';

export default function AdminLogicLab() {
  return (
    <AdminContentPage 
      title="Logic Lab"
      description="Manage common religious claims and their rationalist rebuttals."
      collectionName="logic_lab"
      displayFields={['claim', 'category', 'difficulty']}
      fields={[
        { key: 'claim', label: 'The Claim', type: 'textarea', required: true },
        { key: 'rebuttal', label: 'The Rebuttal', type: 'textarea', required: true },
        { key: 'category', label: 'Category', type: 'select', options: ['Cosmological', 'Teleological', 'Moral', 'Ontological', 'Historical', 'Presuppositional'], required: true },
        { key: 'difficulty', label: 'Difficulty', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'], required: true },
        { key: 'tags', label: 'Tags (comma separated)', type: 'text' }
      ]}
    />
  );
}
