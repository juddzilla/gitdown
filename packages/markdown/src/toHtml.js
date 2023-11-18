import Showdown from 'showdown';

export default (md) => {
  const converter = new Showdown.Converter();
  return converter.makeHtml(md);
};