'use client';

import AdminContentPage from '@/components/admin/AdminContentPage';

export default function AdminSecularMap() {
  return (
    <AdminContentPage 
      title="Secular Map"
      description="Manage global secularism data points."
      collectionName="map_locations"
      displayFields={['country', 'status', 'score']}
      fields={[
        { key: 'isoCode', label: 'ISO Country Code (e.g. USA, FRA)', type: 'text', required: true },
        { key: 'country', label: 'Country Name', type: 'text', required: true },
        { key: 'status', label: 'Status', type: 'select', options: ['Secular', 'State Religion', 'Religious Law', 'Hostile'], required: true },
        { key: 'blasphemy', label: 'Blasphemy Laws', type: 'select', options: ['None', 'Fines', 'Imprisonment', 'Death Penalty'], required: true },
        { key: 'score', label: 'Secularism Score (0-100)', type: 'number', required: true },
        { key: 'description', label: 'Detailed Status Description', type: 'textarea', required: true }
      ]}
    />
  );
}
