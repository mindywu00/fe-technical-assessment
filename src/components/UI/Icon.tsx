import React from 'react';

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: 'search' | 'chevron-down';
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, size = 20, className = '', ...props }) => {
  const icons = {
    search: (
      <svg
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        className={className}
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    'chevron-down': (
      <svg
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        className={className}
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    ),
  };

  return icons[name];
};

export default Icon;
