import React from 'react';
import Tooltip from '../UI/Tooltip';
import IconButton from '../UI/IconButton';
import { capitalize } from '../../utils/format';
import { DEFAULT_TAG_COLOR } from '../../constants';

interface TagProps {
  label: string;
  color?: string;
}

export const Tag: React.FC<TagProps> = ({ label, color }) => {
  return (
    <span className="inline-flex items-center gap-2 font-bold text-xs text-gray-700 border border-zinc-950/[0.08] px-2 py-1 rounded-full">
      <span 
        className="w-2 h-2 rounded-sm"
        style={{ backgroundColor: color || DEFAULT_TAG_COLOR }}
      />
      {capitalize(label)}
    </span>
  );
};

interface TagGroupProps {
  tags: Array<{ name: string; color: string }>;
}

export const TagGroup: React.FC<TagGroupProps> = ({ tags }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  if (tags.length === 0) {
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="min-w-[100px] min-h-[28px] flex items-center"
      >
        {isHovered && (
          <button className="inline-flex items-center gap-2 font-semibold text-xs text-gray-500 border border-zinc-950/[0.08] px-2 py-1 rounded-full hover:bg-gray-50 transition-colors">
            <img src="/plus.svg" alt="Add" className="w-3 h-3 opacity-60" />
            <span>Add Tag</span>
          </button>
        )}
      </div>
    );
  }

  if (tags.length > 1) {
    const tagNames = tags.map(tag => capitalize(tag.name)).join(', ');
    
    return (
      <Tooltip content={tagNames}>
        <div className="inline-flex items-center gap-2 font-bold text-xs text-gray-700 border border-zinc-950/[0.08] px-2 py-1 rounded-full">
          <div className="flex gap-1">
            {tags.map((tag) => (
              <span 
                key={`${tag.name}-${tag.color}`}
                className="w-2 h-2 rounded-sm"
                style={{ backgroundColor: tag.color || DEFAULT_TAG_COLOR }}
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
      {tags.map((tag) => (
        <Tag key={`${tag.name}-${tag.color}`} label={tag.name} color={tag.color} />
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
      <IconButton
        onClick={onEdit}
        src="/pencil.svg"
        alt="Edit"
        aria-label="Edit"
      />
      <IconButton
        onClick={onDelete}
        iconSize={18}
        src="/trash.svg"
        alt="Delete"
        aria-label="Delete"
      />
    </div>
  );
};
