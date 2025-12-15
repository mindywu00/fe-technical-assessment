import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  icon?: React.ReactNode;
  buttonVariant?: 'primary' | 'secondary' | 'ghost';
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  className = '',
  buttonClassName = '',
  menuClassName = '',
  icon = <img src="/down-arrow.svg" alt="dropdown" className="w-3 h-3" />,
  buttonVariant = 'ghost'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const getSelectedLabel = () => {
    const selected = options.find(option => option.value === value);
    return selected?.label || '';
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button 
        variant={buttonVariant}
        className={`flex items-center gap-2 py-2 px-3 text-sm ${buttonClassName}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label && <span>{label}: </span>}
        <span>{getSelectedLabel()}</span>
        {icon}
      </Button>
      
      {isOpen && (
        <div className={`absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[160px] z-10 ${menuClassName}`}>
          {options.map((option) => (
            <button
              key={option.value}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                option.value === value ? 'bg-gray-50 font-medium' : ''
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
