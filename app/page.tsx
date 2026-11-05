import { Band } from '@/components/Band';
import { Hero } from '@/components/Hero';
import { PackagesTeaser } from '@/components/PackagesTeaser';
import {
  Final,
  HowItWorks,
  Security,
  Status,
  WhatsNew,
} from '@/components/Sections';

/** Words may come from SethuCMS, so look again at most once a minute. */
export const revalidate = 60;

/** The home page: every part is a component, in reading order. */
export default function Home() {
  return (
    <>
      <div className="wrap">
        <Hero />
      </div>
      <Band />
      <div className="wrap">
        <HowItWorks />
        <WhatsNew />
        <PackagesTeaser />
        <Security />
        <Status />
        <Final />
      </div>
    </>
  );
}
