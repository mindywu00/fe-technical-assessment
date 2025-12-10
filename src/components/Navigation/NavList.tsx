import React from 'react';

interface NavListProps {
  children: React.ReactNode;
  className?: string;
}

const NavList: React.FC<NavListProps> = ({ children, className = '' }) => {
  return (
    <nav className={`flex-1 px-4 ${className}`}>
      <ul className="space-y-1">
        {children}
      </ul>
    </nav>
  );
};

export default NavList;
