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
    <aside className={`w-64 bg-white border-r border-gray-200 flex flex-col ${className}`}>
      <div className="p-6">
        <Logo name="AirOps" />
      </div>

      <div className="p-4">
        <Button variant="ghost" className="w-full">
          New
        </Button>
      </div>

      <NavList>
        {routes.map((route) => (
          <li key={route.name}>
            <NavLink href={route.href} active={route.active}>
              {route.name}
            </NavLink>
          </li>
        ))}
      </NavList>
    </aside>
  );
};

export default Sidebar;
