import React from 'react';

interface TagProps {
  label: string;
  color?: string;
}

export const Tag: React.FC<TagProps> = ({ label, color }) => {
  const style = color ? {
    backgroundColor: `${color}20`,
    color: color,
    borderColor: `${color}40`,
  } : undefined;

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
      style={style || { backgroundColor: '#E5E7EB', color: '#374151', borderColor: '#D1D5DB' }}
    >
      {label}
    </span>
  );
};

interface TagGroupProps {
  tags: Array<{ name: string; color: string }>;
}

export const TagGroup: React.FC<TagGroupProps> = ({ tags }) => {
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
  return (
    <div className="flex items-center gap-2">
      {icon && <span className="text-gray-400">{icon}</span>}
      <span className="text-sm font-medium text-gray-900">{type}</span>
    </div>
  );
};
