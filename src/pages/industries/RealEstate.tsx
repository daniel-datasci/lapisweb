import IndustryPage from '@/components/IndustryPage';
import { industries } from '@/data/industries';

export default function RealEstate() {
  return <IndustryPage industry={industries[1]} />;
}
