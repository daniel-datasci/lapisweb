import IndustryPage from '@/components/IndustryPage';
import { industries } from '@/data/industries';

export default function Hospitality() {
  return <IndustryPage industry={industries[2]} />;
}
