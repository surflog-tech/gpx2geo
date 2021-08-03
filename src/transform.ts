import { GeoJSON, GeoJsonProperties } from 'geojson';
import { multiLineString as turfMultiLineString } from '@turf/helpers';
import { GPX, TrackPoint } from './index.d';

function dateStrToTimestamp(time: string) {
  return (new Date(time)).getTime();
}

function transform({ gpx: { trk } }: GPX): GeoJSON {
  const coordsMeta = [] as GeoJsonProperties[];
  function trackPoint(data: TrackPoint) {
    const meta = Object.assign({}, data) as GeoJsonProperties;
    if (meta !== null && data.time !== undefined) meta.time = dateStrToTimestamp(data.time);
    coordsMeta.push(meta);
    const point = [parseFloat(data['@_lon']), parseFloat(data['@_lat'])];
    if (data.ele !== undefined) point.push(data.ele);
    return point;
  }
  const multiLines = trk.map(({ trkseg: { trkpt } }) => {
    if (Array.isArray(trkpt)) return trkpt.map(trackPoint);
    return [trackPoint(trkpt)];
  });
  return turfMultiLineString(multiLines, { coordsMeta });
}

export default transform;
