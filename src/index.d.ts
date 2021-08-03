export interface TrackPoint {
  '@_lat': string
  '@_lon': string
  ele: number,
  time: string,
  // course: 23.26,
  // speed: 0.63,
  // fix: '3d',
  // sat: 5,
  // hdop: 1.4
}

interface Track {
  trkseg: {
    trkpt: TrackPoint[]
  }
}

export interface GPX {
  gpx: {
    trk: Track[]
  }
}
