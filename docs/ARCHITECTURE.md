# KNOWBEYONDME — Phase 1 Architecture

This document describes the technical foundation only. The story, opening, and CMS are not implemented.

## Existing repository

The repository contained a single `README.md` and no application code. Phase 1 introduced the Next.js application and journey engine.

## Stack

- Next.js App Router
- React
- TypeScript (strict)
- Tailwind CSS v4
- GSAP + ScrollTrigger for scroll-to-progress
- No Three.js / React Three Fiber
- No Framer Motion

## Experience modes

| Route | Mode | Phase 1 status |
| --- | --- | --- |
| `/` | Journey | Opening through The Call |
| `/?engine=test` | Journey | Phase 1 engine test |
| `/professional` | Professional | Route stub |

## Journey flow

```text
Browser scroll / keyboard / (later) swipe
        ↓
ScrollController  →  normalized progress 0–1
        ↓
JourneyEngine.update()
        ↓
SceneManager.resolve(progress)
        ↓
current scene + sceneProgress
        ↓
CameraController + AnimationManager
        ↓
JourneyWorld / HUD
```

Progress is input-agnostic via `ProgressDriver`. `ScrollController` is the Phase 1 driver. A later swipe driver can implement the same interface and call `setProgress`.

## Engine modules

| Module | Responsibility |
| --- | --- |
| `JourneyEngine` | Owns snapshot state and subscriptions |
| `SceneManager` | Registers scenes and maps progress → scene |
| `ProgressDriver` | Input-agnostic progress contract |
| `ScrollController` | Native scroll → progress, direction, velocity |
| `CameraController` | Interpolates lightweight 2D camera keyframes |
| `AnimationManager` | Purpose-tagged GSAP helpers with reduced-motion |
| `TriggerManager` | Scene-progress thresholds |
| `AssetManager` | Safe scene-level loading with fallbacks |
| `ContentManager` | Local typed content; Strapi-replaceable later |
| `AudioManager` | Stub |
| `AchievementManager` | Stub |

## Design tokens

Defined in `src/design/tokens.ts` and `src/app/globals.css`.

Gold is reserved for emphasis. Rose and technical blue are supporting accents.

## Assets

```text
public/assets/images
public/assets/video
public/assets/audio
public/assets/models
public/assets/textures
```

No placeholder media is shipped in Phase 1.

## Debug

Development only:

- `?debug=1`
- `NEXT_PUBLIC_JOURNEY_DEBUG=true`
- `Ctrl+Shift+J`

The overlay never renders in production builds.
