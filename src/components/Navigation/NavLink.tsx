import React from 'react';

interface NavLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, active = false, children }) => {
  return (
    <a
      href={href}
      className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </a>
  );
};

export default NavLink;
