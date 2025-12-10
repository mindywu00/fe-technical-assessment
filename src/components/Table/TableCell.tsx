import React from 'react';
import Tooltip from '../UI/Tooltip';

// Helper function to capitalize tag names
const capitalizeTag = (tag: string): string => {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
};

interface TagProps {
  label: string;
  color?: string;
}

export const Tag: React.FC<TagProps> = ({ label, color }) => {
  return (
    <span className="inline-flex items-center gap-2 font-bold text-xs text-gray-700 border border-gray-300 px-2 py-1 rounded-full">
      <span 
        className="w-2 h-2 rounded-sm"
        style={{ backgroundColor: color || '#9CA3AF' }}
      />
      {capitalizeTag(label)}
    </span>
  );
};

interface TagGroupProps {
  tags: Array<{ name: string; color: string }>;
}

export const TagGroup: React.FC<TagGroupProps> = ({ tags }) => {
  if (tags.length > 1) {
    const tagNames = tags.map(tag => capitalizeTag(tag.name)).join(', ');
    
    return (
      <Tooltip content={tagNames}>
        <div className="inline-flex items-center gap-2 font-bold text-xs text-gray-700 border border-gray-300 px-2 py-1 rounded-full">
          <div className="flex gap-1">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="w-2 h-2 rounded-sm"
                style={{ backgroundColor: tag.color || '#9CA3AF' }}
              />
            ))}
          </div>
          <span>{tags.length} tags</span>
        </div>
      </Tooltip>
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
        className="hover:opacity-70 transition-opacity"
        aria-label="Edit"
      >
        <img src="/pencil.svg" alt="Edit" className="w-5 h-5" />
      </button>
      <button
        onClick={onDelete}
        className="hover:opacity-70 transition-opacity"
        aria-label="Delete"
      >
        <img src="/trash-2.svg" alt="Delete" className="w-5 h-5" />
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
