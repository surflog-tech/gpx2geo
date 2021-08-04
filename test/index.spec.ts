// import assert from 'assert';
import { readFileSync, writeFileSync } from 'fs';
// import parseBuffer from '../src/parse';
import gpx2geo from '../src/index';

const file = './assets/test.gpx';
// const file = './assets/activity_7239122045.gpx';
// const file = './assets/activity_7240644361.gpx';
// const file = './assets/Waterspeed 2021-08-03T12.17.40.000Z.gpx';

describe('gpx2geo', () => {

  xit('should be able to parse a GPX file', function() {
    // this.timeout(10000);
    const buffer:ArrayBuffer = readFileSync(file);
    writeFileSync('./assets/geo.json', JSON.stringify(gpx2geo(buffer)));
  });

  it('should be able to parse a GPX file', function() {
    // this.timeout(10000);
    console.log(gpx2geo(readFileSync(file)));
  });

});
