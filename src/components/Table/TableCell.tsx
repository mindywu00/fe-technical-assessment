import React from 'react';

interface TagProps {
  label: string;
  color?: string;
}

export const Tag: React.FC<TagProps> = ({ label, color }) => {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-gray-700 border border-gray-300 px-2 py-1 rounded-full">
      <span 
        className="w-2 h-2 rounded-full "
        style={{ backgroundColor: color || '#9CA3AF' }}
      />
      {label}
    </span>
  );
};

interface TagGroupProps {
  tags: Array<{ name: string; color: string }>;
}

export const TagGroup: React.FC<TagGroupProps> = ({ tags }) => {
  if (tags.length > 1) {
    return (
      <div className="inline-flex items-center gap-2 text-xs text-gray-700 border border-gray-300 px-2 py-1 rounded-full">
        <div className="flex gap-1">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: tag.color || '#9CA3AF' }}
            />
          ))}
        </div>
        <span>{tags.length} tags</span>
      </div>
    );
  }
  
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag, index) => (
        <Tag key={index} label={tag.name} color={tag.color} />
      ))}
    </div>
  );
};

interface ActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const Actions: React.FC<ActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

interface TypeBadgeProps {
  type: string;
  icon?: React.ReactNode;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type, icon }) => {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  
  return (
    <div className="flex items-center gap-2">
      {icon && <span className="text-gray-400">{icon}</span>}
      <span className="text-sm text-gray-500">{capitalizedType}</span>
    </div>
  );
};
