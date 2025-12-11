import React from 'react';

interface NavLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
  icon?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, active = false, children, icon }) => {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon && <img src={icon} alt="" className="w-4 h-4" />}
      {children}
    </a>
  );
};

export default NavLink;
