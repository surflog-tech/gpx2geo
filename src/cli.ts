#!/usr/bin/env node

import { readFile } from 'fs/promises';
import gpx2geo from './index';

function handler(filePath: string): Promise<void> {
  return readFile(filePath).then(gpx2geo).then(JSON.stringify).then(console.log);
}

const [,,filePath] = process.argv;

if (typeof filePath === 'string') {
  void handler(filePath);
}
