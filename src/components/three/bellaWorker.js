import { buildHeadGeometryData } from './dogHead';

// Builds Bella's skull off the main thread so the page stays responsive while she's sculpted.
// eslint-disable-next-line no-restricted-globals
const ctx = self;

ctx.onmessage = (e) => {
  const data = buildHeadGeometryData(e.data.resolution);
  ctx.postMessage(data, [data.position.buffer, data.normal.buffer, data.color.buffer]);
};
