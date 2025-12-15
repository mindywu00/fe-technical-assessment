// API Configuration
const AIROPS_API_URL = 'https://api.airops.com/public_api/airops_apps/4a3d717a-d598-4663-8b63-4e503130a403/execute';
const API_KEY = '7Mn1IMp7VGt_vU_K5LWY8PQx_nlteFMrU9mLapjb79KDCYLNcGetkeHUxqSw';

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

export const executeWorkflow = async (totalCount: number): Promise<WorkflowResponse> => {
  try {
    const response = await fetch(AIROPS_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          item_count: totalCount,
        },
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`Failed to execute workflow: ${response.status}`);
    }

    const result = await response.json();
    
    // Handle different response structures
    if (result.result) {
      return result.result;
    }
    // If result.result is not present, return an empty response
    return { count: 0, data: [] };
  } catch (error) {
    console.error('Fetch Error:', error);
    // Return an empty response in case of error
    return { count: 0, data: [] };
  }
};
