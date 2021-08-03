// import assert from 'assert';
import { readFileSync, writeFileSync } from 'fs';
// import parseBuffer from '../src/parse';
import gpx2geo from '../src/index';

const file = './assets/test.gpx';

describe('gpx2geo', () => {

  it('should be able to parse a GPX file', function() {
    // this.timeout(10000);
    const buffer:ArrayBuffer = readFileSync(file);
    writeFileSync('./assets/geo.json', JSON.stringify(gpx2geo(buffer)));
  });

  it('should be able to parse a GPX file', function() {
    // this.timeout(10000);
    const buffer:ArrayBuffer = readFileSync(file);
    console.log(gpx2geo(buffer));
  });

});
