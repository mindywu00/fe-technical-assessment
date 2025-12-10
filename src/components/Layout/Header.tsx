import React from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Icon from '../UI/Icon';

interface HeaderProps {
  title: string;
  className?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  className = '',
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search...'
}) => {
  return (
    <header className={`bg-white border-b border-gray-200 px-8 py-6 ${className}`}>
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

        <div className="flex items-start gap-4">
          <Button variant="secondary" className="flex items-center gap-2">
            <span>Sort</span>
            <Icon name="chevron-down" size={16} />
          </Button>

          <Input
            type="text"
            placeholder={searchPlaceholder}
            className="w-64"
            icon={<Icon name="search" size={20} className="text-gray-400" />}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
