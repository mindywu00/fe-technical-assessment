// API Configuration - Update these when ready to use real API
// const AIROPS_API_BASE_URL = 'https://api.airops.com/public/v1';
// const API_KEY = '7Mn1IMp7VGt_vU_K5LWY8PQx_nlteFMrU9mLapjb79KDCYLNcGetkeHUxqSw';
// const WORKFLOW_ID = '120926';
// const WORKSPACE_SLUG = 'test-3823';

export interface Tag {
  name: string;
  color: string;
}

export interface WorkflowData {
  id: number;
  type: string;
  name: string;
  tags: Tag[];
  lastUpdated: number;
}

export interface WorkflowResponse {
  count: number;
  data: WorkflowData[];
}

export const executeWorkflow = async (): Promise<WorkflowResponse> => {
  // Using mock data that matches your workflow format
  // TODO: Replace with actual API call once endpoint is confirmed
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        count: 8,
        data: [
          {
            type: "workflow",
            name: "Launch Sequence",
            tags: [
              { name: "automation", color: "#FF5733" },
              { name: "startup", color: "#33FF57" }
            ],
            lastUpdated: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
            id: 1
          },
          {
            type: "agent",
            name: "Robo Assistant",
            tags: [
              { name: "support", color: "#3357FF" },
              { name: "AI", color: "#FF33A5" }
            ],
            lastUpdated: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
            id: 2
          },
          {
            type: "workflow",
            name: "Creative Process",
            tags: [
              { name: "design", color: "#FF33D4" },
              { name: "brainstorm", color: "#33FF57" }
            ],
            lastUpdated: Math.floor(Date.now() / 1000) - 259200, // 3 days ago
            id: 3
          },
          {
            type: "integration",
            name: "Data Sync Pipeline",
            tags: [
              { name: "integration", color: "#FFA533" },
              { name: "scheduled", color: "#33D4FF" }
            ],
            lastUpdated: Math.floor(Date.now() / 1000) - 432000, // 5 days ago
            id: 4
          },
          {
            type: "workflow",
            name: "Customer Onboarding",
            tags: [
              { name: "automation", color: "#FF5733" },
              { name: "priority", color: "#FF3333" }
            ],
            lastUpdated: Math.floor(Date.now() / 1000) - 604800, // 1 week ago
            id: 5
          },
          {
            type: "agent",
            name: "Analytics Bot",
            tags: [
              { name: "analytics", color: "#8B33FF" },
              { name: "reporting", color: "#33FFF5" }
            ],
            lastUpdated: Math.floor(Date.now() / 1000) - 1209600, // 2 weeks ago
            id: 6
          },
          {
            type: "integration",
            name: "Slack Notifications",
            tags: [
              { name: "notification", color: "#FFD433" },
              { name: "slack", color: "#E01E5A" }
            ],
            lastUpdated: Math.floor(Date.now() / 1000) - 1814400, // 3 weeks ago
            id: 7
          },
          {
            type: "workflow",
            name: "Monthly Report Generator",
            tags: [
              { name: "scheduled", color: "#33D4FF" },
              { name: "reports", color: "#FF8C33" }
            ],
            lastUpdated: Math.floor(Date.now() / 1000) - 2592000, // 1 month ago
            id: 8
          }
        ]
      });
    }, 500); // Simulate API delay
  });
};

export const formatLastUpdated = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(diff / 604800000);
  const months = Math.floor(diff / 2592000000);
  
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  if (weeks < 4) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  return `${months} ${months === 1 ? 'month' : 'months'} ago`;
};
