export default (string) => string
    .split('_')
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(' ');
