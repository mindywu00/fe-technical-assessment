import { Workflow } from '../types/workflow';

export const mockWorkflows: Workflow[] = [
  {
    id: 1,
    type: 'Automation',
    name: 'Customer Onboarding Flow',
    tags: ['active', 'priority'],
    lastUpdated: '2 hours ago',
  },
  {
    id: 2,
    type: 'Integration',
    name: 'Salesforce Sync',
    tags: ['integration', 'crm'],
    lastUpdated: '1 day ago',
  },
  {
    id: 3,
    type: 'Automation',
    name: 'Weekly Report Generator',
    tags: ['scheduled', 'reports'],
    lastUpdated: '3 days ago',
  },
  {
    id: 4,
    type: 'Workflow',
    name: 'Lead Qualification Process',
    tags: ['sales', 'active'],
    lastUpdated: '5 days ago',
  },
  {
    id: 5,
    type: 'Integration',
    name: 'Slack Notifications',
    tags: ['notification', 'slack'],
    lastUpdated: '1 week ago',
  },
  {
    id: 6,
    type: 'Automation',
    name: 'Data Cleanup Task',
    tags: ['maintenance', 'scheduled'],
    lastUpdated: '2 weeks ago',
  },
  {
    id: 7,
    type: 'Workflow',
    name: 'Support Ticket Routing',
    tags: ['support', 'active'],
    lastUpdated: '3 weeks ago',
  },
  {
    id: 8,
    type: 'Integration',
    name: 'Google Sheets Export',
    tags: ['export', 'google'],
    lastUpdated: '1 month ago',
  },
];
