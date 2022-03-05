import { GPX } from './index.d';
import { XMLParser, X2jOptionsOptional } from 'fast-xml-parser';

const options: X2jOptionsOptional = {
  ignoreAttributes: false,
  attributeNamePrefix : '@_',
};

const parser = new XMLParser(options);

function parseBuffer(buffer: ArrayBuffer) {
  return parser.parse(buffer.toString()) as GPX;
}

export default parseBuffer;
