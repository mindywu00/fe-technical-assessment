import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Table, { Column, TableRow } from '../components/Table/Table';
import { TagGroup, Actions, TypeBadge } from '../components/Table/TableCell';
import { executeWorkflow, formatLastUpdated, WorkflowData } from '../services/airops';

const WorkflowsPage: React.FC = () => {
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        setLoading(true);
        const response = await executeWorkflow();
        setWorkflows(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch workflows');
        console.error('Error fetching workflows:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  const columns: Column[] = [
    { key: 'type', header: 'Type', width: '15%' },
    { key: 'name', header: 'Name', width: '25%' },
    { key: 'tags', header: 'Tags', width: '25%' },
    { key: 'lastUpdated', header: 'Last Updated', width: '20%' },
    { key: 'actions', header: 'Actions', width: '15%' },
  ];

  const tableData: TableRow[] = workflows.map((workflow) => ({
    id: workflow.id,
    type: <TypeBadge type={workflow.type} />,
    name: workflow.name,
    tags: <TagGroup tags={workflow.tags} />,
    lastUpdated: formatLastUpdated(workflow.lastUpdated),
    actions: <Actions />,
  }));

  return (
    <div className="flex flex-col h-screen">
      <Header title="Workflows" />
      <main className="flex-1 bg-white overflow-auto">
        <div className="p-8">
          {loading && (
            <div className="text-center py-12 text-gray-500">
              Loading workflows...
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          {!loading && !error && (
            <Table columns={columns} data={tableData} />
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkflowsPage;
