// Must stay in sync with the enum in backend/models/Rec.js
export const CATEGORIES = [
  { value: 'Movie', emoji: '🎬', color: 'pink' },
  { value: 'Show', emoji: '📺', color: 'red' },
  { value: 'Book', emoji: '📚', color: 'orange' },
  { value: 'Music', emoji: '🎧', color: 'purple' },
  { value: 'Location', emoji: '📍', color: 'teal' },
  { value: 'Activity', emoji: '🎯', color: 'green' },
  { value: 'App', emoji: '📱', color: 'blue' },
];

export const getCategory = (value) =>
  CATEGORIES.find((c) => c.value === value) || { value, emoji: '✨', color: 'gray' };
