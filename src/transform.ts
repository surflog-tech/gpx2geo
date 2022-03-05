import { featureCollection, lineString, Feature, LineString, Position, Properties } from '@turf/helpers';
import bbox from '@turf/bbox';
import { GPX, TrackPoint } from './index.d';

function getPosition({ '@_lon': lon, '@_lat': lat, ele }: TrackPoint): Position {
  const position = [Number(lon), Number(lat)];
  if (ele !== undefined) position.push(Number(ele));
  return position;
}

function getRecords(trackPoints: TrackPoint[], index: number) {
  if (index > 0) {
    return [trackPoints[index - 1], trackPoints[index]];
  }
  if (trackPoints.length === 1) {
    return [trackPoints[index], trackPoints[index]];
  }
  return [trackPoints[index], trackPoints[index + 1]];
}

function mapProperties(trackPoint: Properties) {
  return {
    ...trackPoint,
    timestamp: trackPoint?.time as string,
  }
}

function makeLineStringFeature(accumulator: Feature<LineString, Properties>[], currentValue: TrackPoint, index: number, trackPoints: TrackPoint[]) {
  accumulator.push(lineString(getRecords(trackPoints, index).map(getPosition), mapProperties(currentValue)));
  return accumulator;
}

function makeTrackPoints(trk: GPX['gpx']['trk']) {
  const trkData = Array.isArray(trk) ? trk : [trk];
  return trkData.reduce((trackPoints, { trkseg: { trkpt } }) => {
    if (Array.isArray(trkpt)) {
      trackPoints.push(...trkpt);
    } else {
      trackPoints.push(trkpt);
    }
    return trackPoints;
  }, [] as TrackPoint[]);
}

function transform({ gpx: { trk } }: GPX) {
  const trackPoints = makeTrackPoints(trk);
  const lineStringFeatures = featureCollection(trackPoints.reduce(makeLineStringFeature, []));
  lineStringFeatures.bbox = bbox(lineStringFeatures);
  return lineStringFeatures;
}

export default transform;
