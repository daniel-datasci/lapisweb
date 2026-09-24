import { Compass, Workflow, Bot, Layers } from 'lucide-react';
import type { ServiceSlug } from './services';

export const serviceIcon = (slug: ServiceSlug, size = 26) => {
  const icons = { 'ai-consulting': Compass, 'ai-automation': Workflow, 'agentic-workflows': Bot, 'ai-infrastructure': Layers };
  const Icon = icons[slug];
  return <Icon size={size} aria-hidden="true" />;
};