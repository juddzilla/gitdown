export default (a, b) => {
  const aNotB = a.filter((x) => !b.includes(x));
  const bNotA = b.filter((x) => !a.includes(x));
  return { aNotB, bNotA };
};