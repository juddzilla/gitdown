export default function(value) {
  if (!value) {
    return [];
  }
  return !Array.isArray(value) ? value.split(',') : value;
}

