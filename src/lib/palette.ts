import type { Artist } from "@/lib/definitions";

export type Palette = {
  background: string;
  foreground: string;
  accent: string;
};

export const FALLBACK_PALETTE: Palette = {
  background: "#010106",
  foreground: "#8d8a88",
  accent: "#19c628",
};

export function paletteFrom(artist: Artist): Palette {
  const colours = artist.styling?.colours;
  return {
    background: colours?.background ?? FALLBACK_PALETTE.background,
    foreground: colours?.foreground ?? FALLBACK_PALETTE.foreground,
    accent: colours?.accent ?? FALLBACK_PALETTE.accent,
  };
}
