import { Compass, Workflow, Bot, Layers, GraduationCap, Lightbulb, BarChart3, FileSpreadsheet } from 'lucide-react';
import type { ServiceSlug } from './services';

export const serviceIcon = (slug: ServiceSlug, size = 26) => {
  const icons = {
    'ai-consulting': Compass,
    'ai-automation': Workflow,
    'agentic-workflows': Bot,
    'ai-infrastructure': Layers,
    'ai-analytics-training': GraduationCap,
  };
  const Icon = icons[slug];
  return <Icon size={size} aria-hidden="true" />;
};

const programmeIcons = [Lightbulb, BarChart3, FileSpreadsheet];

export const programmeIcon = (index: number, size = 26) => {
  const Icon = programmeIcons[index % programmeIcons.length];
  return <Icon size={size} aria-hidden="true" />;
};
