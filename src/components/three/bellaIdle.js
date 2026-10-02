import * as THREE from 'three';

// Idle "living character" behavior for the dog head from dogHead.js.
// The head stays centered; she observes the viewer and her surroundings in irregular beats:
// eyes lead, the head follows (or doesn't), with blinks, squints, breathing, drift and ear follow-through.
// An optional pointer gives her something real to notice.

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (weights) => {
  const total = weights.reduce((s, w) => s + w[1], 0);
  let r = Math.random() * total;
  for (const [name, w] of weights) {
    if ((r -= w) <= 0) return name;
  }
  return weights[0][0];
};

// Critically damped spring: eases in and out with no fixed speed, never overshoots.
class Spring {
  constructor(value = 0, frequency = 2) {
    this.x = value;
    this.v = 0;
    this.target = value;
    this.w = frequency;
  }
  update(dt) {
    const w = this.w;
    const a = w * w * (this.target - this.x) - 2 * w * this.v;
    this.v += a * dt;
    this.x += this.v * dt;
    return this.x;
  }
}

// Fast exponential approach, used for eye saccades and lids.
const approach = (current, target, rate, dt) => current + (target - current) * (1 - Math.exp(-rate * dt));

export function createIdleAnimator(head, { reducedMotion = false } = {}) {
  const { eyes, ears, tongue } = head.userData;
  const base = {
    ball: eyes.map((e) => e.userData.ball.rotation.clone()),
    upper: eyes.map((e) => e.userData.upperLid.rotation.x),
    lower: eyes.map((e) => e.userData.lowerLid.rotation.x),
    ears: ears.map((e) => e.rotation.clone()),
    tongue: tongue ? { y: tongue.position.y, s: tongue.scale.y } : null,
    pos: head.position.clone(),
    rot: head.rotation.clone(),
  };

  // Where she is looking, in head-space radians: yaw (left/right) and pitch (up/down).
  const gaze = { yaw: 0, pitch: 0 }; // world gaze target for the eyes
  const eye = { yaw: 0, pitch: 0 }; // current eye angles relative to the head
  const headYaw = new Spring(0, 1.7);
  const headPitch = new Spring(0, 1.5);
  const headRoll = new Spring(0, 1.2);
  const earLag = new Spring(0, 5.5);

  let squint = 0; // 0 open, 1 half-lidded
  let squintTarget = 0;
  let blink = 0;
  let t = 0;

  // A queue of timed steps makes up the current beat; when it empties, a new beat is chosen.
  let steps = [];
  let wait = rand(0.6, 1.4);

  // Blinks run on their own irregular clock.
  let nextBlink = rand(1.5, 4);
  let blinkStart = -10;
  let doubleBlink = false;

  // Pointer interest.
  const pointer = { x: 0, y: 0, active: false, lastMove: -10, seenX: 0, seenY: 0 };

  const clampEye = (v, lim) => THREE.MathUtils.clamp(v, -lim, lim);

  function triggerBlink(delay = 0) {
    if (t + delay > blinkStart + 0.35) {
      blinkStart = t + delay;
      doubleBlink = Math.random() < 0.18;
      nextBlink = blinkStart + rand(2.2, 6.5);
    }
  }

  // Eyes jump to a point, a short pause, then the head eases most of the way there.
  function glanceThenFollow(yaw, pitch, { follow = rand(0.55, 0.85), reaction = rand(0.08, 0.2) } = {}) {
    steps.push({ at: reaction, run: () => { gaze.yaw = yaw; gaze.pitch = pitch; if (Math.abs(yaw - headYaw.target) > 0.3 && Math.random() < 0.45) triggerBlink(0.02); } });
    steps.push({ at: rand(0.3, 0.65), run: () => { headYaw.target = yaw * follow; headPitch.target = pitch * follow * 0.8; headRoll.target = -yaw * rand(0.02, 0.08); } });
    steps.push({ at: rand(1.4, 2.6), run: () => {} }); // hold
  }

  function chooseBeat() {
    // A recent pointer move is the most interesting thing in the room.
    if (pointer.active && t - pointer.lastMove < 2.5) {
      const py = pointer.x * 0.55;
      const pp = pointer.y * 0.28;
      const moved = Math.hypot(pointer.x - pointer.seenX, pointer.y - pointer.seenY);
      if (moved > 0.08) {
        pointer.seenX = pointer.x;
        pointer.seenY = pointer.y;
        if (moved < 0.25 && Math.random() < 0.5) {
          // Small move: her eyes track it, her head doesn't bother.
          steps.push({ at: rand(0.08, 0.18), run: () => { gaze.yaw = py; gaze.pitch = pp; } });
          steps.push({ at: rand(0.6, 1.2), run: () => {} });
        } else {
          glanceThenFollow(py, pp, { follow: rand(0.6, 0.8) });
        }
        return;
      }
    }

    const beat = pick([
      ['viewer', 3],
      ['wander', 3],
      ['eyesOnly', 2.5],
      ['sideEye', 1.2],
      ['adjust', 1.5],
      ['squint', 0.9],
    ]);
    const viewerYaw = pointer.active ? pointer.seenX * 0.55 : 0;
    const viewerPitch = pointer.active ? pointer.seenY * 0.28 : 0.05;

    switch (beat) {
      case 'viewer': // back to watching you
        glanceThenFollow(viewerYaw + rand(-0.05, 0.05), viewerPitch, { follow: rand(0.75, 0.95) });
        break;
      case 'wander': {
        // Something off to the side catches her attention.
        const side = Math.random() < 0.5 ? -1 : 1;
        glanceThenFollow(side * rand(0.25, 0.6), rand(-0.12, 0.18));
        break;
      }
      case 'eyesOnly': {
        // Eyes move, head stays: glance, hold, glance back.
        const back = { yaw: gaze.yaw, pitch: gaze.pitch };
        steps.push({ at: rand(0.05, 0.15), run: () => { gaze.yaw = headYaw.x + rand(-0.32, 0.32); gaze.pitch = headPitch.x + rand(-0.1, 0.14); } });
        steps.push({ at: rand(0.7, 1.6), run: () => { gaze.yaw = back.yaw; gaze.pitch = back.pitch; } });
        steps.push({ at: rand(0.6, 1.4), run: () => {} });
        break;
      }
      case 'sideEye': {
        // Mildly suspicious, in a cute way: half-lidded look to the side, head barely turning.
        const side = Math.random() < 0.5 ? -1 : 1;
        const back = { yaw: gaze.yaw, pitch: gaze.pitch };
        steps.push({ at: rand(0.1, 0.2), run: () => { gaze.yaw = headYaw.x + side * 0.3; gaze.pitch = headPitch.x - 0.03; squintTarget = rand(0.55, 0.8); } });
        steps.push({ at: rand(0.4, 0.7), run: () => { headYaw.target += side * 0.06; headRoll.target = side * 0.04; } });
        steps.push({ at: rand(1.0, 1.8), run: () => { squintTarget = 0; gaze.yaw = back.yaw; gaze.pitch = back.pitch; } });
        steps.push({ at: rand(0.6, 1.2), run: () => {} });
        break;
      }
      case 'adjust':
        // Tiny reorientation, the kind you make without noticing.
        steps.push({ at: rand(0.1, 0.3), run: () => { headYaw.target += rand(-0.08, 0.08); headPitch.target += rand(-0.04, 0.04); headRoll.target = rand(-0.05, 0.05); } });
        steps.push({ at: rand(1.0, 2.0), run: () => {} });
        break;
      case 'squint':
        // A soft, considering squint at whatever she's looking at.
        steps.push({ at: rand(0.1, 0.3), run: () => { squintTarget = rand(0.35, 0.6); headPitch.target -= 0.03; } });
        steps.push({ at: rand(0.9, 1.7), run: () => { squintTarget = 0; } });
        steps.push({ at: rand(0.5, 1.0), run: () => {} });
        break;
      default:
        break;
    }
  }

  function setPointer(x, y) {
    pointer.x = THREE.MathUtils.clamp(x, -1, 1);
    pointer.y = THREE.MathUtils.clamp(y, -1, 1);
    if (!pointer.active || Math.hypot(pointer.x - pointer.seenX, pointer.y - pointer.seenY) > 0.08) pointer.lastMove = t;
    pointer.active = true;
    // React promptly to a fresh, sizeable move instead of waiting out a long hold.
    if (Math.hypot(pointer.x - pointer.seenX, pointer.y - pointer.seenY) > 0.3 && wait > 0.35) {
      steps = [];
      wait = rand(0.1, 0.25);
    }
  }

  function update(dt) {
    dt = Math.min(dt, 0.05);
    t += dt;
    const motion = reducedMotion ? 0.25 : 1;

    // Run the beat script.
    wait -= dt;
    while (wait <= 0) {
      if (!steps.length) chooseBeat();
      const step = steps.shift();
      if (!step) break;
      step.run();
      wait += step.at;
    }

    // Blinks: irregular, occasionally doubled.
    if (t >= nextBlink) triggerBlink();
    const bt = t - blinkStart;
    const blinkDur = 0.16;
    let b = bt >= 0 && bt < blinkDur ? Math.sin((bt / blinkDur) * Math.PI) : 0;
    if (doubleBlink && bt >= blinkDur + 0.08 && bt < blinkDur * 2 + 0.08) b = Math.sin(((bt - blinkDur - 0.08) / blinkDur) * Math.PI);
    blink = b;

    // Head: slow, eased turns plus never-quite-still micro motion.
    headYaw.update(dt);
    headPitch.update(dt);
    headRoll.update(dt);
    const drift = (f1, f2, a) => (Math.sin(t * f1) + Math.sin(t * f2 + 1.3) * 0.6) * a;
    const breath = Math.sin(t * 1.55) * motion; // ~4 s breathing cycle
    head.rotation.y = base.rot.y + headYaw.x * motion + drift(0.37, 0.23, 0.008);
    head.rotation.x = base.rot.x - headPitch.x * motion + drift(0.29, 0.17, 0.006) - breath * 0.006;
    head.rotation.z = base.rot.z + headRoll.x * motion + drift(0.21, 0.13, 0.006);
    head.position.set(
      base.pos.x + drift(0.19, 0.11, 0.006) * motion,
      base.pos.y + breath * 0.006 + drift(0.27, 0.15, 0.005) * motion,
      base.pos.z + drift(0.15, 0.09, 0.004) * motion
    );

    // Eyes: fast saccades toward the gaze point, counter-rotating as the head catches up.
    const wantYaw = clampEye(gaze.yaw - headYaw.x, 0.36);
    const wantPitch = clampEye(gaze.pitch - headPitch.x, 0.18);
    eye.yaw = approach(eye.yaw, wantYaw, 28, dt);
    eye.pitch = approach(eye.pitch, wantPitch, 28, dt);
    eyes.forEach((e, i) => {
      e.userData.ball.rotation.y = base.ball[i].y + eye.yaw;
      e.userData.ball.rotation.x = base.ball[i].x - eye.pitch;
    });

    // Lids: blink, plus soft squints that also bring the lower lids up a little.
    squint = approach(squint, squintTarget, 6, dt);
    eyes.forEach((e, i) => {
      // Upper lids follow the eyes' pitch slightly, like real lids do.
      e.userData.upperLid.rotation.x = base.upper[i] + blink * 1.2 + squint * 0.5 - eye.pitch * 0.4;
      e.userData.lowerLid.rotation.x = base.lower[i] - squint * 0.22 - blink * 0.1;
    });

    // Ears: soft secondary motion that lags behind head turns.
    earLag.target = -headYaw.v * 0.12;
    earLag.update(dt);
    ears.forEach((e, i) => {
      const side = i === 0 ? -1 : 1;
      e.rotation.x = base.ears[i].x + earLag.x * side * 0.6 + Math.sin(t * 1.55 + i) * 0.006 * motion;
      e.rotation.z = base.ears[i].z + earLag.x * 0.5;
    });

    // Tongue just rides along with her breathing.
    if (tongue && base.tongue) {
      tongue.position.y = base.tongue.y - (breath * 0.5 + 0.5) * 0.004;
      tongue.scale.y = base.tongue.s * (1 + (breath * 0.5 + 0.5) * 0.03);
    }
  }

  return { update, setPointer, clearPointer: () => { pointer.active = false; } };
}
