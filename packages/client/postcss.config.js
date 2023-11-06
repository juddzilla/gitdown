import PostcssNested from 'postcss-nested';
import PostcssSimpleVars from 'postcss-simple-vars';
import PostcssMixins from 'postcss-mixins';
import PostcssMapGet from 'postcss-map-get';
import PostcssFor from 'postcss-for';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default {
  plugins: [
    PostcssNested(),
    PostcssSimpleVars(),
    PostcssMixins(),
    PostcssMapGet(),
    PostcssFor(),
    autoprefixer(),
    tailwindcss,
  ],
}