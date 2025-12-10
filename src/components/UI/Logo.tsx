import React from 'react';

interface LogoProps {
  name: string;
  iconColor?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  name, 
  iconColor = 'bg-violet-300',
  className = '' 
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`w-8 h-8 ${iconColor} rounded`}></div>
      <span className="text-lg font-semibold text-gray-900">{name}</span>
    </div>
  );
};

export default Logo;
