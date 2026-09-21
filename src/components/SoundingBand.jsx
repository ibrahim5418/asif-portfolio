/**
 * The sounding band — the seam between the two sections.
 *
 * A comb of hairlines hanging from the boundary where the dark card meets
 * the paper, each one its own depth. It is the page's datum line: the
 * place where what is above meets what is below.
 *
 * The profile is six detuned harmonics. The frequencies are deliberately
 * not in harmonic ratio — harmonics fold back on themselves and the eye
 * hears the sine. Detuned, the line never repeats and reads as something
 * observed rather than something plotted.
 *
 * Computed once at module load, drawn as a single <path>: one DOM node,
 * no asset to download, crisp at any density.
 */
/* The band stretches to the viewport, so the count sets the pitch: 96
   soundings land at roughly 4px apart on a phone, which is the closest
   they can sit and still be read as separate marks rather than as a
   wash. Denser than this and the comb greys out at the top of the page. */
const COUNT = 96;
const VB_W = 960; // 10 units of run per sounding
const VB_H = 100;

const WAVE = [
  [1.0, 2.17, 1.42502],
  [0.47, 3.71, 3.68004],
  [0.55, 6.29, 4.82506],
  [0.26, 11.13, 1.2669],
  [0.1, 19.87, 5.4751],
  [0.04, 32.41, 4.56694],
];

const raw = Array.from({ length: COUNT }, (_, i) => {
  const u = i / (COUNT - 1);
  return WAVE.reduce((s, [a, f, p]) => s + a * Math.sin(u * f * Math.PI + p), 0);
});

const lo = Math.min(...raw);
const span = Math.max(...raw) - lo;

/* The shallowest reading still shows: a comb with a gap in it reads as a
   fault, not as a measurement. Depths run from a fifth to the full band. */
const D = raw.map((v) => 0.2 + 0.8 * ((v - lo) / span));

const PATH = D.map((d, i) => `M${i * 10} 0V${(d * VB_H).toFixed(1)}`).join('');

export default function SoundingBand({ className }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATH} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
