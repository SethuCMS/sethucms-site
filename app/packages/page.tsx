import type { Metadata } from 'next';
import { Packages } from '@/components/Packages';

export const metadata: Metadata = {
  title: 'Packages · SethuCMS',
  description:
    'The SethuCMS packages on npm: the client, the database adapters and the building blocks.',
};

/** Every npm package, in plain words, on a page of its own. */
export default function PackagesPage() {
  return (
    <div className="wrap page">
      <Packages page />
    </div>
  );
}
