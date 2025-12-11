import React, { useEffect, useState, useMemo } from 'react';
import Header from '../components/Layout/Header';
import Table, { Column, TableRow } from '../components/Table/Table';
import { TagGroup, Actions, TypeBadge } from '../components/Table/TableCell';
import { executeWorkflow, formatLastUpdated, WorkflowData } from '../services/airops';
import { useDebounce } from '../hooks/useDebounce';
import { DEBOUNCE_DELAY, DEFAULT_ITEM_COUNT } from '../constants';
import Spinner from '../components/UI/Spinner';

const WorkflowsPage: React.FC = () => {
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Debounce the search query to avoid filtering on every keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        setLoading(true);
        const response = await executeWorkflow(DEFAULT_ITEM_COUNT);
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

  // Filter workflows based on the debounced search query
  const filteredWorkflows = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return workflows;
    }

    const query = debouncedSearchQuery.toLowerCase();

    return workflows.filter((workflow) => {
      // Search in type
      if (workflow.type.toLowerCase().includes(query)) {
        return true;
      }

      // Search in name
      if (workflow.name.toLowerCase().includes(query)) {
        return true;
      }

      // Search in tags
      if (workflow.tags.some(tag => tag.name.toLowerCase().includes(query))) {
        return true;
      }

      return false;
    });
  }, [workflows, debouncedSearchQuery]);

  const columns: Column[] = [
    { key: 'type', header: 'Type', width: '10%' },
    { key: 'name', header: 'Name', width: '50%' },
    { key: 'tags', header: 'Tags', width: '15%' },
    { key: 'lastUpdated', header: 'Last Updated', width: '15%' },
    { key: 'actions', header: 'Actions', width: '10%' },
  ];

  const tableData: TableRow[] = filteredWorkflows.map((workflow) => ({
    id: workflow.id,
    type: <TypeBadge type={workflow.type} />,
    name: <span className="font-medium text-sm">📄 {workflow.name}</span>,
    tags: <TagGroup tags={workflow.tags} />,
    lastUpdated: <span className="text-sm font-normal text-gray-500">{formatLastUpdated(workflow.lastUpdated)}</span>,
    actions: <Actions />,
  }));

  return (
    <div className="flex flex-col h-screen">
      <Header 
        title="Workflows"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search workflows"
      />
      <main className="flex-1 bg-white overflow-auto">
        <div className="px-8">
          {loading && (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          {!loading && !error && (
            <>
              <Table columns={columns} data={tableData} />
              {filteredWorkflows.length === 0 && searchQuery && (
                <div className="text-center py-12 text-gray-500">
                  No workflows found matching "{searchQuery}"
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkflowsPage;
