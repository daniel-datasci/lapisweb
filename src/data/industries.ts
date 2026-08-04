export type Industry = {
  slug: string;
  path: string;
  name: string;
  icon: string;
  heroHeading: string;
  painTitle: string;
  pains: string[];
  costTitle: string;
  cost: string;
  offer: string;
  included: string[];
  riskReversal: string;
  crossSell: { label: string; path: string; icon: string }[];
  finalCta: string;
};

export const industries: Industry[] = [
  {
    slug: 'saas',
    path: '/industries/saas',
    name: 'SaaS',
    icon: 'Cloud',
    heroHeading:
      'Your competitor changed their pricing page yesterday. You found out today from a customer.',
    painTitle: 'The Pain',
    pains: [
      'A competitor launches a feature that undercuts your positioning — you hear about it from a churned customer.',
      'Pricing pages change overnight and your sales team is quoting against stale intelligence.',
      'Hiring signals, funding rounds, and GTM shifts in your category pass by unnoticed for weeks.',
      'Product and marketing decisions are made on gut feel because no one has time to monitor the market manually.',
    ],
    costTitle: 'The Cost of Staying the Same',
    cost: 'Every quarter you fly blind is a quarter your competitors compound an advantage you can\u2019t even see. Lost deals get attributed to \u201cprice\u201d or \u201ctiming\u201d when the real cause was an intelligence gap.',
    offer:
      'We monitor your top competitors\u2019 pricing, features, messaging, and hiring signals every single day — and alert you the moment something changes — so your team never walks into a deal blind again.',
    included: [
      'Daily monitoring of your top 5 competitors\u2019 pricing pages, feature pages, and changelogs',
      'Real-time alerts when a competitor changes positioning, launches a feature, or shifts pricing',
      'Weekly competitive intelligence brief summarizing what changed and what it means',
      'Hiring and funding signal tracking across your category',
      'A shared intelligence dashboard your whole GTM team can access',
    ],
    riskReversal:
      'We\u2019ll run the monitoring for two weeks for free and show you exactly what your competitors changed this month. If it isn\u2019t useful, you owe nothing.',
    crossSell: [
      { label: 'AI Agents for GTM automation', path: '/services/ai-agents', icon: 'Bot' },
      { label: 'AI Infrastructure for your data stack', path: '/services/ai-infrastructure', icon: 'Server' },
    ],
    finalCta: 'Show me what changed this month for free',
  },
  {
    slug: 'real-estate',
    path: '/industries/real-estate',
    name: 'Real Estate',
    icon: 'Building2',
    heroHeading:
      'Your agents are the last to know. A competitor just dropped price three blocks from your listing.',
    painTitle: 'The Pain',
    pains: [
      'Price reductions and new listings in your farm area happen daily — but your agents find out from MLS refreshes that lag behind.',
      'A competitor underprices a comparable listing and you lose the buyer before you can react.',
      'Neighborhood-level market shifts (inventory, days-on-market, price trends) are tracked manually, if at all.',
      'Agents spend hours pulling comps instead of being in front of clients.',
    ],
    costTitle: 'The Cost of Staying the Same',
    cost: 'In a market that shifts weekly, stale information costs you listings, buyers, and commission. The agent with the freshest intelligence wins the deal — and right now that isn\u2019t you.',
    offer:
      'We deploy agents that monitor your local market in real time — new listings, price changes, inventory shifts — and alert your agents the moment something changes in their farm area.',
    included: [
      'Real-time monitoring of new listings and price changes in your target neighborhoods',
      'Instant alerts to your agents when a comparable property hits the market or drops price',
      'Weekly local market intelligence brief: inventory trends, days-on-market, price movement',
      'Automated comp reports so agents stop spending hours on manual research',
      'A shared market dashboard visible to your whole brokerage',
    ],
    riskReversal:
      'We\u2019ll monitor your top three farm areas for two weeks for free and show you every price change and new listing you missed. If it doesn\u2019t help your agents win more deals, you owe nothing.',
    crossSell: [
      { label: 'AI Agents for lead qualification', path: '/services/ai-agents', icon: 'Bot' },
      { label: 'AI Infrastructure for MLS/CRM integration', path: '/services/ai-infrastructure', icon: 'Server' },
    ],
    finalCta: 'Show me my local market for free',
  },
  {
    slug: 'hospitality',
    path: '/industries/hospitality',
    name: 'Hospitality',
    icon: 'BedDouble',
    heroHeading:
      'Your revenue team is pricing rooms on yesterday\u2019s information in a market that changes by the hour.',
    painTitle: 'The Pain',
    pains: [
      'Competitor rate changes and occupancy signals hit the market hourly — but your revenue team reviews pricing once a day, at best.',
      'Events, demand spikes, and competitor sell-outs are spotted too late to adjust rates in time.',
      'Channel managers and PMS systems hold the data, but nobody is watching it continuously.',
      'Revenue decisions rely on lagging reports instead of live competitive intelligence.',
    ],
    costTitle: 'The Cost of Staying the Same',
    cost: 'Every night you price a room off yesterday\u2019s data is revenue you never recover. In hospitality, the market doesn\u2019t wait for your morning report.',
    offer:
      'We deploy agents that continuously monitor your competitors\u2019 rates, occupancy signals, and local demand drivers — and alert your revenue team the moment the market shifts.',
    included: [
      'Continuous monitoring of competitor room rates across your compset',
      'Real-time alerts when a competitor changes rates or sells out a category',
      'Local demand signal tracking: events, search trends, and booking velocity',
      'Hourly intelligence brief during high-demand windows',
      'Integration with your PMS and channel manager so insights reach the system that prices your rooms',
    ],
    riskReversal:
      'We\u2019ll monitor your compset\u2019s rates for two weeks for free and show you every rate change your team missed. If it doesn\u2019t change how you price, you owe nothing.',
    crossSell: [
      { label: 'AI Infrastructure for PMS & channel manager integration', path: '/services/ai-infrastructure', icon: 'Server' },
    ],
    finalCta: 'Show me my competitors\u2019 rates for free',
  },
];
