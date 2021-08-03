import { GeoJSON } from 'geojson';
import parse from './parse';
import transform from './transform';

function handler(buffer: ArrayBuffer): GeoJSON {
  return transform(parse(buffer));
}

export default handler;
