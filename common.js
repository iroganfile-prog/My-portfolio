// Small helpers shared by the site and the admin page.

// el("div", {className: "x"}, child1, child2) -> creates an element
function el(tag, props = {}, ...kids) {
  const node = Object.assign(document.createElement(tag), props);
  kids.flat().forEach(k => node.append(k));
  return node;
}
const slug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Sets the accent (red) color from config.js
function applyAccent(s) { document.documentElement.style.setProperty("--red", s.accent); }

// Turns a YouTube/Vimeo link into embed info. Returns null for normal video files.
// Works with normal links, youtu.be links and YouTube Shorts links.
function parseVideo(url) {
  let m = url.match(/(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/);
  if (m) return {
    short: /\/shorts\//.test(url),
    embed: `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`,
    bg: `https://www.youtube.com/embed/${m[1]}?autoplay=1&mute=1&loop=1&playlist=${m[1]}&controls=0&playsinline=1&rel=0&modestbranding=1`,   // silent loop for the hero
    thumb: `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`
  };
  m = url.match(/vimeo\.com\/(\d+)/);
  if (m) return { short: false, embed: `https://player.vimeo.com/video/${m[1]}?autoplay=1`, bg: `https://player.vimeo.com/video/${m[1]}?background=1&autoplay=1&loop=1&muted=1`, thumb: null };
  return null;
}
