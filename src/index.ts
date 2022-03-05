import parse from './parse';
import transform from './transform';

function handler(buffer: ArrayBuffer) {
  return transform(parse(buffer));
}

export default handler;
