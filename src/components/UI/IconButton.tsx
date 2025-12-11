import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  alt: string;
  iconSize?: 'sm' | 'md' | 'lg';
}

const IconButton: React.FC<IconButtonProps> = ({ 
  src, 
  alt, 
  iconSize = 'md',
  className = '', 
  ...props 
}) => {
  const sizeStyles = {
    sm: { width: '12px', height: '12px' },
    md: { width: '16px', height: '16px' },
    lg: { width: '20px', height: '20px' },
  };

  return (
    <button
      className={`bg-gray-100 p-2 rounded-md hover:opacity-70 transition-opacity flex-shrink-0 ${className}`}
      {...props}
    >
      <img 
        src={src} 
        alt={alt} 
        style={{ ...sizeStyles[iconSize], minWidth: sizeStyles[iconSize].width, minHeight: sizeStyles[iconSize].height }} 
        className="flex-shrink-0 block" 
      />
    </button>
  );
};

export default IconButton;
