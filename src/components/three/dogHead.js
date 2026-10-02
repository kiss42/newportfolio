import * as THREE from 'three';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';

// Procedural 3D head of a black-and-white Staffy mix, modeled after a reference photo.
// The skull, cheeks and muzzle are blended signed-distance shapes polygonized with marching cubes;
// the coat pattern is painted per-vertex. Eyes, nose and ears are separate meshes for crisp materials.
// Coordinates: +y up, +z out of the face, +x toward the viewer's right (the dog's left).

const BLACK = new THREE.Color('#0b0b0e');
const WHITE = new THREE.Color('#f1ede6');
const GREY = new THREE.Color('#77767a');

// ---------- SDF helpers ----------
function sdEllipsoid(px, py, pz, c, r, rx = 0) {
  let x = px - c[0];
  let y = py - c[1];
  let z = pz - c[2];
  if (rx) {
    // Rotate the sample point around X (tilts the shape).
    const cs = Math.cos(-rx);
    const sn = Math.sin(-rx);
    const ny = y * cs - z * sn;
    z = y * sn + z * cs;
    y = ny;
  }
  const k0 = Math.hypot(x / r[0], y / r[1], z / r[2]);
  const k1 = Math.hypot(x / (r[0] * r[0]), y / (r[1] * r[1]), z / (r[2] * r[2]));
  return (k0 * (k0 - 1)) / k1;
}

function smin(a, b, k) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}

// Smooth subtraction of b from a.
function ssub(a, b, k) {
  return -smin(-a, b, k);
}

const smoothstep = (e0, e1, x) => {
  const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1);
  return t * t * (3 - 2 * t);
};

// Cheap deterministic value noise for freckles and fur variation.
function hash3(x, y, z) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

export const EYE = { left: [-0.195, 0.075, 0.392], right: [0.2, 0.088, 0.388], radius: 0.098 };
const MOUTH_PINK = new THREE.Color('#5a1a26');
const LIP = new THREE.Color('#060608');

// The open, smiling mouth: a central opening plus two corners pulled up into a grin.
function mouthSDF(x, y, z) {
  let d = sdEllipsoid(x, y, z, [0, -0.268, 0.6], [0.14, 0.06, 0.2], 0.1);
  d = smin(d, sdEllipsoid(x, y, z, [-0.14, -0.232, 0.52], [0.065, 0.026, 0.11], 0.1), 0.04);
  d = smin(d, sdEllipsoid(x, y, z, [0.14, -0.232, 0.52], [0.065, 0.026, 0.11], 0.1), 0.04);
  // Upturned corners of the grin.
  d = smin(d, sdEllipsoid(x, y, z, [-0.19, -0.205, 0.46], [0.035, 0.018, 0.07], 0.1), 0.03);
  d = smin(d, sdEllipsoid(x, y, z, [0.19, -0.205, 0.46], [0.035, 0.018, 0.07], 0.1), 0.03);
  return d;
}

function headSDF(x, y, z) {
  let d = sdEllipsoid(x, y, z, [0, 0.15, -0.02], [0.42, 0.4, 0.4]); // cranium
  d = smin(d, sdEllipsoid(x, y, z, [0, 0.12, 0.14], [0.4, 0.34, 0.36]), 0.12); // forehead
  d = smin(d, sdEllipsoid(x, y, z, [-0.25, -0.07, 0.14], [0.235, 0.24, 0.26]), 0.15); // cheeks
  d = smin(d, sdEllipsoid(x, y, z, [0.25, -0.07, 0.14], [0.235, 0.24, 0.26]), 0.15);
  d = smin(d, sdEllipsoid(x, y, z, [0, -0.115, 0.47], [0.205, 0.175, 0.31], 0.1), 0.12); // muzzle
  d = smin(d, sdEllipsoid(x, y, z, [-0.1, -0.195, 0.52], [0.13, 0.115, 0.25], 0.1), 0.07); // flews
  d = smin(d, sdEllipsoid(x, y, z, [0.1, -0.195, 0.52], [0.13, 0.115, 0.25], 0.1), 0.07);
  d = smin(d, sdEllipsoid(x, y, z, [0, -0.285, 0.41], [0.135, 0.075, 0.22], 0.12), 0.08); // chin
  // Smiling cheeks bunch up under the eyes.
  d = smin(d, sdEllipsoid(x, y, z, [-0.205, -0.03, 0.4], [0.1, 0.055, 0.075]), 0.05);
  d = smin(d, sdEllipsoid(x, y, z, [0.21, -0.02, 0.395], [0.1, 0.055, 0.075]), 0.05);
  // Brows: soft, even, and lifted, so she looks happy instead of critical.
  d = smin(d, sdEllipsoid(x, y, z, [-0.2, 0.225, 0.37], [0.12, 0.045, 0.08]), 0.08);
  d = smin(d, sdEllipsoid(x, y, z, [0.2, 0.225, 0.37], [0.12, 0.045, 0.08]), 0.08);
  d = smin(d, sdEllipsoid(x, y, z, [0, -0.29, -0.04], [0.29, 0.23, 0.25]), 0.18); // neck stub

  // Carve: eye sockets, the furrow between the eyes, and the mouth line.
  d = ssub(d, sdEllipsoid(x, y, z, EYE.left, [0.108, 0.108, 0.108]), 0.035);
  d = ssub(d, sdEllipsoid(x, y, z, EYE.right, [0.108, 0.108, 0.108]), 0.035);
  d = ssub(d, sdEllipsoid(x, y, z, [0, 0.32, 0.44], [0.012, 0.1, 0.03]), 0.04); // faint groove, no frown
  d = ssub(d, mouthSDF(x, y, z), 0.03);
  return d;
}

// Coat pattern from the photo: black head, white blaze up the center, white muzzle tip, white chin/throat.
function coatColor(x, y, z, out) {
  const ax = Math.abs(x);
  // Blaze: thin at the crown, widening as it runs down the bridge of the nose.
  const blazeHalfWidth = 0.03 + 0.075 * smoothstep(0.3, -0.04, y);
  const blaze = (1 - smoothstep(blazeHalfWidth - 0.012, blazeHalfWidth + 0.012, ax)) * smoothstep(0.1, 0.25, z) * smoothstep(0.56, 0.44, y);
  // Muzzle: white around the nose and down over the upper lips.
  const muzzle = smoothstep(0.56, 0.66, z + 0.3 * Math.max(0, -0.08 - y)) * (1 - smoothstep(0.15, 0.22, ax + Math.max(0, y + 0.02) * 0.9));
  // Chin, lower lip and throat.
  const chin = smoothstep(-0.21, -0.26, y) * smoothstep(0.0, 0.2, z) * (1 - smoothstep(0.17, 0.26, ax - Math.max(0, -0.3 - y)));
  const white = Math.min(1, blaze + muzzle + chin);

  out.copy(BLACK).lerp(WHITE, white);

  // Smile: black lips around the opening, dark pink inside.
  const m = mouthSDF(x, y, z);
  const lip = 1 - smoothstep(0.012, 0.03, m);
  out.lerp(LIP, lip * 0.95);
  if (m < 0.01) out.copy(LIP).lerp(MOUTH_PINK, smoothstep(0.01, -0.01, m));
  // Upturned smile line running out to the corners of the grin.
  const smileY = -0.262 + 1.45 * x * x;
  const smile = (1 - smoothstep(0.008, 0.022, Math.abs(y - smileY))) * smoothstep(0.38, 0.46, z) * (1 - smoothstep(0.2, 0.23, ax));
  out.lerp(LIP, smile * 0.95);

  // Grey ticking on the white beside the nose.
  if (white > 0.5 && z > 0.55 && y > -0.24 && ax > 0.07) {
    // Round freckles: one jittered dot per grid cell, only some cells get one.
    const g = 38;
    const cx = Math.floor(x * g);
    const cy = Math.floor(y * g);
    const cz = Math.floor(z * g);
    if (hash3(cx, cy, cz) > 0.55) {
      const jx = (cx + 0.25 + 0.5 * hash3(cy, cz, cx)) / g;
      const jy = (cy + 0.25 + 0.5 * hash3(cz, cx, cy)) / g;
      const jz = (cz + 0.25 + 0.5 * hash3(cx + 7, cy + 3, cz + 1)) / g;
      const dist = Math.hypot(x - jx, y - jy, z - jz) * g;
      out.lerp(GREY, 0.8 * (1 - smoothstep(0.12, 0.3, dist)));
    }
  }
  // Gentle, low-frequency tone variation so the coat doesn't read as plastic.
  const v = (Math.sin(x * 9 + y * 4) * Math.sin(y * 7 - z * 5) + Math.sin(z * 11 + x * 3) * 0.5) * 0.012;
  out.r = Math.max(0, out.r + v);
  out.g = Math.max(0, out.g + v);
  out.b = Math.max(0, out.b + v);
  return out;
}

// Polygonizes the skull and paints the coat. Pure math with no DOM access, so it can run in a Web Worker.
// Returns plain typed arrays: { position, normal, color }.
export function buildHeadGeometryData(resolution = 120) {
  const mc = new MarchingCubes(resolution, new THREE.MeshBasicMaterial(), false, false, 400000);
  mc.isolation = 0;
  const { size, size2, field } = mc;
  const half = size / 2;
  for (let zi = 0; zi < size; zi++) {
    const z = (zi - half) / half;
    for (let yi = 0; yi < size; yi++) {
      const y = (yi - half) / half;
      for (let xi = 0; xi < size; xi++) {
        const x = (xi - half) / half;
        // Positive inside; scaled so the gradient (used for normals) is well behaved.
        field[xi + yi * size + zi * size2] = -headSDF(x, y, z) * 100;
      }
    }
  }
  mc.update();

  // Copy the generated triangles into right-sized arrays.
  const count = mc.count;
  const src = mc.geometry;
  const position = src.attributes.position.array.slice(0, count * 3);
  const normal = src.attributes.normal.array.slice(0, count * 3);
  const color = new Float32Array(count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < count; i++) {
    coatColor(position[i * 3], position[i * 3 + 1], position[i * 3 + 2], c);
    color[i * 3] = c.r;
    color[i * 3 + 1] = c.g;
    color[i * 3 + 2] = c.b;
  }
  mc.geometry.dispose();
  mc.material.dispose();
  return { position, normal, color };
}

function headGeometryFromData({ position, normal, color }) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(color, 3));
  geometry.computeBoundingSphere();
  return geometry;
}

// Equirectangular eye texture: dark chestnut iris with a black pupil, centered on the sphere's +z.
function makeEyeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#efe9e2'; // sclera
  ctx.fillRect(0, 0, 1024, 512);
  const cx = 256; // u = 0.25 faces +z on a three.js sphere
  const cy = 256;
  const irisR = 150;
  const g = ctx.createRadialGradient(cx, cy, 20, cx, cy, irisR);
  g.addColorStop(0, '#1a0d06');
  g.addColorStop(0.45, '#4a2410');
  g.addColorStop(0.8, '#6b3816');
  g.addColorStop(0.96, '#2b1407');
  g.addColorStop(1, '#1b0d05');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, irisR, 0, Math.PI * 2);
  ctx.fill();
  // Fine iris fibers.
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = '#c07a3a';
  for (let i = 0; i < 140; i++) {
    const a = (i / 140) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * 62, cy + Math.sin(a) * 62);
    ctx.lineTo(cx + Math.cos(a) * (irisR - 12), cy + Math.sin(a) * (irisR - 12));
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#050302';
  ctx.beginPath();
  ctx.arc(cx, cy, 64, 0, Math.PI * 2);
  ctx.fill();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function makeEye(eyeTexture, lidMaterial, position, lookUp, lookIn, droop = 0, tilt = 0) {
  const eye = new THREE.Group();
  eye.position.set(...position);
  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(EYE.radius, 48, 32),
    new THREE.MeshPhysicalMaterial({ map: eyeTexture, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.02, ior: 1.4 })
  );
  ball.rotation.set(-lookUp, lookIn, 0);
  eye.add(ball);
  // Dark eyelid rim hugging the eyeball.
  const lid = new THREE.Mesh(new THREE.TorusGeometry(EYE.radius * 0.93, 0.016, 12, 48), lidMaterial);
  lid.position.z = EYE.radius * 0.38;
  lid.scale.set(1, 0.96, 1.2);
  eye.add(lid);
  // Upper eyelid: a fur-covered shell over the top of the eyeball. `droop` sets how far it comes down.
  const upper = new THREE.Mesh(new THREE.SphereGeometry(EYE.radius * 1.06, 40, 20, 0, Math.PI * 2, 0, 1.0), lidMaterial.userData.fur);
  upper.rotation.x = 0.12 + droop;
  upper.rotation.z = tilt;
  eye.add(upper);
  // Lower lid: cheeks pushed up by the smile give the eyes a happy squint.
  const lower = new THREE.Mesh(new THREE.SphereGeometry(EYE.radius * 1.05, 40, 16, 0, Math.PI * 2, Math.PI - 1.15, 1.15), lidMaterial.userData.fur);
  lower.rotation.x = 0.08; // pushed up by the smile into a happy crescent
  eye.add(lower);
  // Princess lashes at the outer corner of the upper lid (they blink with it).
  const side = position[0] < 0 ? 1 : -1;
  [0.0, 0.28, 0.56].forEach((o, i) => {
    const phi = Math.PI / 2 + side * (0.62 + o);
    const th = 1.0;
    const r = EYE.radius * 1.07;
    const lash = new THREE.Mesh(new THREE.ConeGeometry(0.0095, 0.085 - i * 0.012, 6), lidMaterial);
    const px = -Math.cos(phi) * Math.sin(th) * r;
    const py = Math.cos(th) * r;
    const pz = Math.sin(phi) * Math.sin(th) * r;
    lash.position.set(px, py, pz);
    // Point outward from the eyeball, flicking up and out.
    const dir = new THREE.Vector3(px, py + r * 0.9, pz).normalize();
    lash.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    lash.translateY(0.036);
    upper.add(lash);
  });
  // Extra catchlights for bright, happy eyes.
  const sparkleMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  const big = new THREE.Mesh(new THREE.SphereGeometry(EYE.radius * 0.17, 16, 12), sparkleMat);
  big.position.set(EYE.radius * 0.3 * (position[0] < 0 ? 1 : 1), EYE.radius * 0.38, EYE.radius * 0.88);
  const small = new THREE.Mesh(new THREE.SphereGeometry(EYE.radius * 0.08, 12, 8), sparkleMat);
  small.position.set(-EYE.radius * 0.28, -EYE.radius * 0.12, EYE.radius * 0.95);
  eye.add(big, small);
  eye.userData.ball = ball;
  eye.userData.upperLid = upper;
  eye.userData.lowerLid = lower;
  return eye;
}

function makeNose(material) {
  const nose = new THREE.Group();
  const body = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), material);
  body.scale.set(0.125, 0.088, 0.08);
  nose.add(body);
  const nostrilMat = new THREE.MeshStandardMaterial({ color: '#000000', roughness: 0.9 });
  [-1, 1].forEach((s) => {
    const nostril = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), nostrilMat);
    nostril.scale.set(0.034, 0.022, 0.03);
    nostril.position.set(s * 0.052, -0.016, 0.07);
    nostril.rotation.z = s * 0.5;
    nose.add(nostril);
  });
  return nose;
}

// A small rose/semi-folded ear: a soft, tapered flap that bends forward and over like a folded page.
function makeEarGeometry() {
  const geo = new THREE.SphereGeometry(1, 40, 28);
  const pos = geo.attributes.position;
  const L = 0.36; // flap length
  const foldStart = 0.1;
  const bend = 2.0; // total fold in radians
  const bendLen = 0.09;
  const k = bend / bendLen;
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = (pos.getY(i) + 1) / 2; // 0..1 along the flap
    let z = pos.getZ(i);
    const taper = 1 - 0.55 * y * y;
    x *= 0.165 * taper;
    z *= 0.028 * (1 - 0.4 * y);
    z -= 0.09 * (x / 0.14) * (x / 0.14) * 0.3; // slight cup
    let s = y * L;
    // Bend the flap beyond the fold line (beam-bending, so the crease stays soft).
    if (s > foldStart) {
      const t = s - foldStart;
      const tb = Math.min(t, bendLen);
      const theta = k * tb;
      let ny = foldStart + Math.sin(theta) / k;
      let nz = (1 - Math.cos(theta)) / k;
      // Carry the thickness offset around the bend.
      ny -= z * Math.sin(theta);
      nz += z * Math.cos(theta);
      if (t > bendLen) {
        const rest = t - bendLen;
        ny += Math.cos(bend) * rest;
        nz += Math.sin(bend) * rest;
      }
      s = ny;
      z = nz;
    }
    pos.setXYZ(i, x, s, z);
  }
  geo.computeVertexNormals();
  return geo;
}

// A goofy tongue hanging out of the smile, draped over the lower lip with a center groove.
function makeTongue() {
  const geo = new THREE.SphereGeometry(1, 40, 24);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i) * 0.072;
    let y = pos.getY(i) * 0.022;
    let z = pos.getZ(i) * 0.13;
    x *= 1 + 0.25 * Math.max(0, z / 0.13); // wider toward the tip
    y -= 0.01 * Math.exp(-(x * x) / 0.0004) * (y > 0 ? 1 : 0); // groove down the middle
    // Drape: the front half curls down over the chin.
    const f = Math.max(0, z + 0.02);
    y -= 3.2 * f * f;
    z -= 0.6 * f * f;
    pos.setXYZ(i, x, y, z);
  }
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: '#e46f86', roughness: 0.35, clearcoat: 0.7, clearcoatRoughness: 0.2, sheen: 0.4, sheenColor: new THREE.Color('#ffb3c1') }));
  return mesh;
}

// Princess tiara: a gold band on the crown with scalloped arches, tall points, and a pink heart gem in front.
function makeTiara() {
  const tiara = new THREE.Group();
  const gold = new THREE.MeshPhysicalMaterial({ color: '#f2c75c', metalness: 1, roughness: 0.2, clearcoat: 0.6 });
  const R0 = 0.22;
  const band = new THREE.Mesh(new THREE.TorusGeometry(R0, 0.016, 10, 72, Math.PI * 1.1), gold);
  band.rotation.set(Math.PI / 2, 0, -0.05 * Math.PI);
  tiara.add(band);
  const pearl = new THREE.MeshPhysicalMaterial({ color: '#fff6fb', roughness: 0.15, clearcoat: 1, sheen: 1, sheenColor: new THREE.Color('#ffd1e8') });
  const gemPurple = new THREE.MeshPhysicalMaterial({ color: '#b86bff', roughness: 0.05, clearcoat: 1, emissive: '#5b21b6', emissiveIntensity: 0.3 });
  const angles = [-1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2];
  const heights = [0.07, 0.1, 0.14, 0.2, 0.14, 0.1, 0.07];
  const tips = angles.map((t, i) => {
    const a = Math.PI / 2 + t; // front = +z
    return new THREE.Vector3(Math.cos(a) * R0, heights[i], Math.sin(a) * R0);
  });
  tips.forEach((tip, i) => {
    const base = new THREE.Vector3(tip.x, 0, tip.z);
    // Each point is a slim cone rising from the band.
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.02, heights[i], 6), gold);
    spike.position.set(tip.x, heights[i] / 2, tip.z);
    tiara.add(spike);
    if (i !== 3) {
      const gem = new THREE.Mesh(new THREE.SphereGeometry(i % 2 ? 0.022 : 0.018, 16, 12), i % 2 ? gemPurple : pearl);
      gem.position.set(tip.x, heights[i] + 0.01, tip.z);
      tiara.add(gem);
    }
    // Scalloped arch between neighbouring points.
    if (i < tips.length - 1) {
      const next = tips[i + 1];
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(tip.x, heights[i] * 0.55, tip.z),
        new THREE.Vector3((tip.x + next.x) / 2 * 1.04, 0.012, (tip.z + next.z) / 2 * 1.04),
        new THREE.Vector3(next.x, heights[i + 1] * 0.55, next.z)
      );
      tiara.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.0075, 6), gold));
    }
    base.y = 0;
  });
  // Heart gem at the front.
  const heart = new THREE.Shape();
  heart.moveTo(0, -0.03);
  heart.bezierCurveTo(-0.045, 0.0, -0.035, 0.035, 0, 0.018);
  heart.bezierCurveTo(0.035, 0.035, 0.045, 0.0, 0, -0.03);
  const heartGeo = new THREE.ExtrudeGeometry(heart, { depth: 0.012, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.006, bevelSegments: 3, curveSegments: 20 });
  heartGeo.center();
  const heartMesh = new THREE.Mesh(heartGeo, new THREE.MeshPhysicalMaterial({ color: '#ff5fa2', roughness: 0.05, clearcoat: 1, emissive: '#c0265f', emissiveIntensity: 0.4 }));
  heartMesh.position.set(0, 0.215, R0 + 0.01);
  heartMesh.scale.setScalar(1.35);
  tiara.add(heartMesh);
  return tiara;
}

/**
 * Builds the dog head (Bella). Returns a THREE.Group with userData handles for animation:
 *   userData.eyes  -> [leftEyeGroup, rightEyeGroup] (rotate `.userData.ball` to look around)
 *   userData.ears  -> [leftEar, rightEar] (rotate to perk/flop)
 *   userData.nose, userData.tongue, userData.tiara -> meshes/groups for secondary motion or toggling
 */
export function createDogHead({ resolution = 120, tiara = true, geometryData = null } = {}) {
  const head = new THREE.Group();

  const furMaterial = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    roughness: 0.5,
    metalness: 0,
    sheen: 0.7,
    sheenRoughness: 0.4,
    sheenColor: new THREE.Color('#45434e'),
    clearcoat: 0.12,
    clearcoatRoughness: 0.45,
  });
  // Pass `geometryData` (from buildHeadGeometryData, e.g. built in a worker) to skip the expensive step here.
  const skull = new THREE.Mesh(headGeometryFromData(geometryData || buildHeadGeometryData(resolution)), furMaterial);
  head.add(skull);

  const lidMaterial = new THREE.MeshStandardMaterial({ color: '#08080a', roughness: 0.5 });
  lidMaterial.userData.fur = new THREE.MeshPhysicalMaterial({ color: '#0b0b0e', roughness: 0.5, sheen: 0.7, sheenRoughness: 0.4, sheenColor: new THREE.Color('#45434e') });
  const eyeTexture = makeEyeTexture();
  // Both eyes look up at the viewer, slightly converged, like in the photo.
  // Open, even upper lids and smiling lower lids: a happy, bright-eyed look.
  const leftEye = makeEye(eyeTexture, lidMaterial, EYE.left, 0.18, 0.1, -0.16, 0.14);
  const rightEye = makeEye(eyeTexture, lidMaterial, EYE.right, 0.18, -0.1, -0.16, -0.14);
  head.add(leftEye, rightEye);

  const noseMaterial = new THREE.MeshPhysicalMaterial({ color: '#0b0b0d', roughness: 0.32, clearcoat: 0.9, clearcoatRoughness: 0.25 });
  const nose = makeNose(noseMaterial);
  nose.position.set(0, -0.045, 0.745);
  nose.rotation.x = 0.15;
  head.add(nose);

  const earMaterial = new THREE.MeshPhysicalMaterial({ color: '#0b0b0e', roughness: 0.5, sheen: 0.7, sheenRoughness: 0.4, sheenColor: new THREE.Color('#45434e'), side: THREE.DoubleSide });
  const earGeo = makeEarGeometry();
  const leftEar = new THREE.Mesh(earGeo, earMaterial);
  leftEar.position.set(-0.3, 0.42, -0.02);
  leftEar.rotation.set(1.0, -0.3, 1.25);
  const rightEar = new THREE.Mesh(earGeo, earMaterial);
  rightEar.position.set(0.3, 0.43, -0.02);
  rightEar.rotation.set(0.85, 0.3, -1.12);
  head.add(leftEar, rightEar);

  const tongue = makeTongue();
  tongue.position.set(0.03, -0.285, 0.6);
  tongue.scale.setScalar(1.18);
  tongue.rotation.set(0.05, 0.06, -0.12); // hangs a little to one side, for goofiness
  head.add(tongue);

  const crown = makeTiara();
  crown.position.set(0.02, 0.5, -0.03);
  crown.rotation.set(-0.18, 0, 0.13); // perched just a bit crooked
  crown.visible = tiara;
  head.add(crown);

  head.userData = { eyes: [leftEye, rightEye], ears: [leftEar, rightEar], nose, tongue, tiara: crown };
  return head;
}
