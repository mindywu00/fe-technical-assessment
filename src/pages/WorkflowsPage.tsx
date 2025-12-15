import React, { useEffect, useState, useMemo } from 'react';
import Header from '../components/Layout/Header';
import Table, { Column, TableRow } from '../components/Table/Table';
import { TagGroup, Actions } from '../components/Table/TableCell';
import { executeWorkflow, formatLastUpdated, WorkflowData } from '../services/airops';
import { useDebounce } from '../hooks/useDebounce';
import { DEBOUNCE_DELAY, DEFAULT_ITEM_COUNT } from '../constants';
import Spinner from '../components/UI/Spinner';
import { capitalize } from '../utils/capitalize';

const WorkflowsPage: React.FC = () => {
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('name');

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

  const handleDelete = (workflowId: string | number) => {
    setWorkflows((prevWorkflows) => prevWorkflows.filter((workflow) => workflow.id !== workflowId));
  };

  // Filter and sort workflows based on the debounced search query and sort option
  const filteredWorkflows = useMemo(() => {
    let filtered = workflows;
    
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = workflows.filter((workflow) => 
        workflow.type.toLowerCase().includes(query) ||
        workflow.name.toLowerCase().includes(query) ||
        workflow.tags.some(tag => tag.name.toLowerCase().includes(query))
      );
    }

    // Sort the filtered workflows
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        // Sort by lastUpdated (most recent first)
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
    });

    return sorted;
  }, [workflows, debouncedSearchQuery, sortBy]);

  const columns: Column[] = [
    { key: 'type', header: 'Type', width: '10%' },
    { key: 'name', header: 'Name', width: '50%' },
    { key: 'tags', header: 'Tags', width: '15%' },
    { key: 'lastUpdated', header: 'Last Updated', width: '15%' },
    { key: 'actions', header: 'Actions', width: '10%' },
  ];

  const tableData: TableRow[] = filteredWorkflows.map((workflow) => ({
    id: workflow.id,
    type: <span className="text-sm font-normal text-gray-500">{capitalize(workflow.type)}</span>,
    name: (
      <span className="font-medium text-sm flex items-center">
        <span className="mr-2">📄</span>
        <span>{workflow.name}</span>
      </span>
    ),
    tags: <TagGroup tags={workflow.tags} />,
    lastUpdated: <span className="text-sm font-normal text-gray-500">{formatLastUpdated(workflow.lastUpdated)}</span>,
    actions: <Actions onDelete={() => handleDelete(workflow.id)} />,
  }));

  return (
    <div className="flex flex-col h-screen">
      <Header 
        title="Workflows"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search workflows"
        sortBy={sortBy}
        onSortChange={setSortBy}
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
              {workflows.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No workflows available
                </div>
              ) : (
                <>
                  <Table columns={columns} data={tableData} />
                  {filteredWorkflows.length === 0 && searchQuery && (
                    <div className="text-center py-12 text-gray-500">
                      No workflows found matching "{searchQuery}"
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkflowsPage;
