export const assetRoots = {
  image: "/assets/images",
  video: "/assets/video",
  audio: "/assets/audio",
  model: "/assets/models",
  texture: "/assets/textures",
} as const;

export type AssetKind = keyof typeof assetRoots;

export type AssetRequest = {
  id: string;
  src: string;
  kind: AssetKind;
};

/**
 * Scene-level loading lives here so later chapters can request
 * assets without coupling them to React components.
 * Phase 1 ships no media files.
 */
export class AssetManager {
  async loadImage(request: AssetRequest): Promise<HTMLImageElement | null> {
    try {
      const image = new Image();
      image.decoding = "async";

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error(`Failed to load image: ${request.src}`));
        image.src = request.src;
      });

      return image;
    } catch (error) {
      this.logFailure(request, error);
      return null;
    }
  }

  private logFailure(request: AssetRequest, error: unknown): void {
    if (process.env.NODE_ENV === "development") {
      console.error(`[AssetManager] ${request.kind} "${request.id}" failed`, error);
    }
  }
}
