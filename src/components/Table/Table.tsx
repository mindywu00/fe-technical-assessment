import React from 'react';

export interface Column {
  key: string;
  header: string;
  width?: string;
}

export interface TableRow {
  id: string | number;
  [key: string]: any;
}

interface TableProps {
  columns: Column[];
  data: TableRow[];
  className?: string;
}

const Table: React.FC<TableProps> = ({ columns, data, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead className="border-b border-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-sm font-bold text-black"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition-colors"
            >
              {columns.map((column) => (
                <td
                  key={`${row.id}-${column.key}`}
                  className="px-6 py-4 text-sm text-gray-900"
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
