// 14 Special Pictures with clean ASCII filenames (100% reliable across iOS Safari, Android Chrome, and Render)
export const USER_PICTURES = [
  "photo_01.jpeg",
  "photo_02.jpeg",
  "photo_03.jpeg",
  "photo_04.jpeg",
  "photo_05.jpeg",
  "photo_06.jpeg",
  "photo_07.jpeg",
  "photo_08.jpeg",
  "photo_09.jpeg",
  "photo_10.jpeg",
  "photo_11.jpeg",
  "photo_12.jpeg",
  "photo_13.jpeg",
  "photo_14.jpeg"
].map((filename, index) => ({
  id: index + 1,
  image: `/pictures/${filename}`
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
