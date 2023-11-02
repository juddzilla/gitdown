export default (filepath) => filepath
    .split('/')
    .pop()
    .split('.')
    .shift();