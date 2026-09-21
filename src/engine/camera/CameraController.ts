import { lerp } from "@/engine/math";
import type { CameraKeyframe, CameraState, JourneyScene } from "@/engine/types";

export const identityCamera: CameraState = {
  x: 0,
  y: 0,
  z: 0,
  rotation: 0,
  scale: 1,
};

export class CameraController {
  fromScene(
    scene: JourneyScene | null,
    sceneProgress: number,
    reducedMotion: boolean,
  ): CameraState {
    if (!scene || reducedMotion || !scene.camera?.length) {
      return identityCamera;
    }

    return interpolateCamera(scene.camera, sceneProgress);
  }

  toCss(state: CameraState): string {
    return cameraToCss(state);
  }
}

export function cameraToCss(state: CameraState): string {
  return `translate3d(${state.x}px, ${state.y}px, ${state.z}px) scale(${state.scale}) rotate(${state.rotation}deg)`;
}

function interpolateCamera(keyframes: CameraKeyframe[], sceneProgress: number): CameraState {
  const sorted = [...keyframes].sort((a, b) => a.at - b.at);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  if (!first || !last) {
    return identityCamera;
  }

  if (sceneProgress <= first.at) {
    return { ...identityCamera, ...first.state };
  }

  if (sceneProgress >= last.at) {
    return { ...identityCamera, ...last.state };
  }

  const nextIndex = sorted.findIndex((frame) => frame.at >= sceneProgress);
  const previous = sorted[nextIndex - 1];
  const next = sorted[nextIndex];

  if (!previous || !next) {
    return identityCamera;
  }

  const span = next.at - previous.at;
  const t = span === 0 ? 1 : (sceneProgress - previous.at) / span;
  const from = { ...identityCamera, ...previous.state };
  const to = { ...identityCamera, ...next.state };

  return {
    x: lerp(from.x, to.x, t),
    y: lerp(from.y, to.y, t),
    z: lerp(from.z, to.z, t),
    rotation: lerp(from.rotation, to.rotation, t),
    scale: lerp(from.scale, to.scale, t),
  };
}
