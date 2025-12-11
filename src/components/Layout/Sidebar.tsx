import React from 'react';
import Logo from '../UI/Logo';
import Button from '../UI/Button';
import NavList from '../Navigation/NavList';
import NavLink from '../Navigation/NavLink';

interface SidebarProps {
  className?: string;
}

interface Route {
  name: string;
  href: string;
  active?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const routes: Route[] = [
    { name: 'Data Name', href: '#', active: false },
    { name: 'Monitoring', href: '#', active: false },
    { name: 'Settings', href: '#', active: false },
  ];

  return (
    <aside className={`w-80 bg-white border-r border-gray-200 flex flex-col ${className}`}>
      <div className="px-6 py-3">
        <Logo name="AirOps" />
      </div>
      <div className="px-4">
        <Button 
          variant="ghost" 
          className="w-full flex items-center justify-center gap-2"
          style={{ boxShadow: '0px 1px 2px 0px #1018280D' }}
        >
          <span>New</span>
          <img src="/plus.svg" alt="Add" className="w-4 h-4" />
        </Button>
      </div>
      <NavList>
        {routes.map((route) => (
          <li key={route.name}>
            <NavLink href={route.href} active={route.active} icon="/data-name.svg">
              {route.name}
            </NavLink>
          </li>
        ))}
      </NavList>
    </aside>
  );
};

export default Sidebar;
