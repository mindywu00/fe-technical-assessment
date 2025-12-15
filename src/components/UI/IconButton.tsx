import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  alt: string;
  iconSize?: number;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  src, 
  alt, 
  iconSize = 16,
  className = '', 
  ...props 
}) => {
  return (
    <button
      className={`bg-gray-100 p-2 rounded-md hover:opacity-70 transition-opacity flex-shrink-0 ${className}`}
      {...props}
    >
      <img 
        src={src} 
        alt={alt} 
        style={{ width: `${iconSize}px`, height: `${iconSize}px`, minWidth: `${iconSize}px`, minHeight: `${iconSize}px` }} 
        className="flex-shrink-0 block" 
      />
    </button>
  );
};

export default IconButton;
