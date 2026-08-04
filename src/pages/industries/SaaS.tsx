import IndustryPage from '@/components/IndustryPage';
import { industries } from '@/data/industries';

export default function SaaS() {
  return <IndustryPage industry={industries[0]} />;
}
