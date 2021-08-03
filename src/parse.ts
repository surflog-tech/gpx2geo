import { GPX } from './index.d';
import { parse } from 'fast-xml-parser';

const options = {
  ignoreAttributes: false,
  attributeNamePrefix : '@_',
};

function parseBuffer(buffer: ArrayBuffer): GPX {
  return parse(buffer.toString(), options) as GPX;
}

export default parseBuffer;
