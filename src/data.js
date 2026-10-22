// Pictures loaded from your pictures folder without any captions
export const USER_PICTURES = [
  "WhatsApp Image 2026-10-22 at 16.02.03.jpeg",
  "WhatsApp Image 2026-10-22 at 16.02.03 (1).jpeg",
  "WhatsApp Image 2026-10-22 at 16.02.03 (2).jpeg",
  "WhatsApp Image 2026-10-22 at 16.02.04.jpeg",
  "WhatsApp Image 2026-10-22 at 16.02.04 (1).jpeg",
  "WhatsApp Image 2026-10-22 at 16.02.04 (2).jpeg",
  "WhatsApp Image 2026-10-22 at 16.02.04 (3).jpeg",
  "WhatsApp Image 2026-10-22 at 16.02.04 (4).jpeg",
  "WhatsApp Image 2026-10-22 at 16.02.05.jpeg",
  "WhatsApp Image 2026-10-22 at 16.02.05 (1).jpeg",
  "WhatsApp Image 2026-10-22 at 16.07.51.jpeg",
  "WhatsApp Image 2026-10-22 at 16.07.51 (1).jpeg",
  "WhatsApp Image 2026-10-22 at 16.07.51 (2).jpeg",
  "WhatsApp Image 2026-10-22 at 16.07.52.jpeg"
].map((filename, index) => ({
  id: index + 1,
  image: `/pictures/${encodeURIComponent(filename)}`
}));

export const SECRET_LETTER = {
  recipient: "My Dearest,",
  body: [
    "From the very first moment our worlds crossed paths, time seemed to slow down and pick up a rhythm of its own. You brought light into corners I didn't even know were shadowed, and laughter into places that had grown quiet.",
    "Every memory we have etched together—every shared smile, quiet glance across crowded rooms, whispered hope, and spontaneous adventure—is guarded safely inside this vault.",
    "No matter where the road ahead winds, having you as my confidant, my anchor, and my favorite adventure is the greatest gift of my life. Thank you for simply being you.",
    "Forever and always,"
  ],
  signoff: "With all my heart & soul ✨"
};
