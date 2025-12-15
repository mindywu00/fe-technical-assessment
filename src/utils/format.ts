// Helper function to capitalize values
export const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formatLastUpdated = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  
  // Reset time to start of day for accurate day comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const updateDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  const diffInMs = today.getTime() - updateDate.getTime();
  const daysDiff = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 0) {
    return 'Today';
  } else if (daysDiff === 1) {
    return 'Yesterday';
  } else if (daysDiff < 7) {
    return `${daysDiff} days ago`;
  } else {
    const weeks = Math.floor(daysDiff / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
};