export default {
  title: 'CGC Overseas Construction Group (中地海外集团)',
  role: 'Business Assistant & Financial Administrator',
  location: 'Abeokuta, Nigeria & Abuja HQ',
  period: 'Mar 2021 – Jul 2022',
  slug: 'cgc-overseas',
  summary: 'Managed business operations and financial administration for water supply projects worth over $13.5M in Nigeria.',
  achievements: [
    'Built relationships with state stakeholders including the Water Resources SA, GM, PIU engineers, and SGI supervisors',
    'Organized bi-weekly project meetings and managed over 100+ business correspondences',
    'Drafted contracts with subcontractors (sand supply, drilling, dorms, etc.)',
    'Resolved critical issues such as passport disputes and tax audits through diplomatic negotiation',
    'Handled daily operations of project bank accounts and cash flow',
    'Managed payroll and HR affairs for drivers, cleaners, security, and local staff',
    'Supervised six military guards on-site; maintained relations with local COVID-19 response officials'
  ],
  tags: ['international', 'construction', 'finance', 'project-management'],
  metadata: {
    type: 'Construction Project',
    field: 'Water Resources',
    teamSize: 'Medium (50-100)',
    role: 'Business Assistant & Financial Administrator',
    projectValue: '$13.5M+'
  },
  projects: [
    {
      name: 'Abeokuta Urban Water Supply Project – LOT1',
      value: '$6.19M'
    },
    {
      name: 'Abeokuta Pipeline Project – LOT2',
      value: '$7.4M'
    }
  ],
  // For future detailed content
  getContent: () => import('../content/cgc-overseas.md')
} 