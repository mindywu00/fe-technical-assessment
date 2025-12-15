import React from 'react';
import Input from '../UI/Input';
import Dropdown, { DropdownOption } from '../UI/Dropdown';

interface HeaderProps {
  title: string;
  className?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
}

const sortOptions: DropdownOption[] = [
  { value: 'name', label: 'Name' },
  { value: 'lastUpdated', label: 'Last Updated' },
];

const Header: React.FC<HeaderProps> = ({ 
  title, 
  className = '',
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search...',
  sortBy = 'name',
  onSortChange
}) => {
  return (
    <header className={`bg-white border-b border-gray-200 px-8 py-6 ${className}`}>
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>

        <div className="flex items-start gap-4">
          <Dropdown
            options={sortOptions}
            value={sortBy}
            onChange={(value) => onSortChange?.(value)}
            label="Sort"
          />

          <Input
            type="text"
            placeholder={searchPlaceholder}
            className="w-64"
            icon={<img src="./search.svg" alt="Search" className="w-4 h-4 opacity-60" />}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            style={{ boxShadow: '0px 1px 3px 0px #1018281A' }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
