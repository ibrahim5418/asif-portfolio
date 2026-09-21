# Asif bin Hossain — HILF Shipping digital business card

The page behind the QR code on Asif bin Hossain's HILF Shipping business card.
React 18 + Vite, plain CSS with custom properties, no backend, no runtime dependencies beyond React.

This is a business card, not a portfolio. It is read on a phone, in about twenty
seconds, by someone who wants to get in touch. Two rules follow from that, and
everything on the page obeys them:

- **One button per destination.** There is one Call, one WhatsApp, one email, one
  LinkedIn, one website link and one location. Nothing is offered twice.
- **Two sections, then the small print.** No hero, no stats, no sticky bar.

When the QR code is scanned:

1. **The logo page** — it opens straight onto paper and the mark writes itself: the
   grey Arabic حلف right to left, the navy Latin "hilf" converging into it, one pass
   of light to finish. No coloured screen in front of it. Tapping skips it.
2. **The card** — Asif bin Hossain, Senior Chartering Manager, HILF Shipping, with
   Call and Save contact side by side and the three other ways to reach him.
3. **HILF Shipping** — what the company does, with its website and its office.

---

## Run it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`npm run build` writes a static site to `dist/`. Deploy that folder anywhere (Vercel, Netlify, S3, cPanel).

---

## Editing the card

**Every piece of copy and every link lives in [`src/data/profile.js`](src/data/profile.js).**

| Export | Controls |
|---|---|
| `person` | name, role, and the given/family split used in the saved contact |
| `CONTACT_RAW` | WhatsApp number, phone number, LinkedIn URL, email |
| `company` | company name, website, tagline and the short introduction |
| `office` | the Dubai office — the Location button and the saved contact both read from here |
| `routes` | the WhatsApp / Email / LinkedIn buttons, in display order |

Call and Save contact are not in `routes`: they are the two actions a scanned card
is for, so they sit at the top of the card as a pair, with the number printed under
them.

The company introduction is HILF Shipping's own wording from hilfshipping.com. The
office is the Google Maps listing for **HILF Shipping LLC FZ** (Tamani Arts
Building, Al Asayel St, Business Bay); `office.map` opens that exact listing by its
place ID. The address is not printed on the page — it is one Location button beside
the website, at the foot.

To make a card for another employee, change `person` and `CONTACT_RAW`. Everything
else is shared.

---

## The contact buttons

Each appears once, in one place.

| Button | Link | Where |
|---|---|---|
| Call | `tel:+971504020908` | the card, paired with Save contact |
| Save contact | downloads `Asif-bin-Hossain.vcf` | the card, paired with Call |
| WhatsApp | `https://wa.me/971504020908` | the card |
| Email | `mailto:asif@hilfshipping.com` | the card |
| LinkedIn | profile URL | the card |
| hilfshipping.com | `https://hilfshipping.com/` | the company section |
| Location | the office's Google Maps listing | the company section, beside the website |

The phone number is printed once, under the Call / Save contact pair, as text
rather than a second control. The saved contact carries name, company, role,
phone, email, office address, website and LinkedIn; on a phone it opens the
"add contact" screen.

---

## The logo intro

The mark is vector, drawn by CSS, in **its own two colours** — the Arabic حلف in
the brand grey `#606060`, the Latin "hilf" in the brand navy `#05005C`. That is
why the intro ground is paper: navy on navy is nothing. Do not recolour the mark
to suit a background; move the background. Nothing has to download before the
motion can start and it stays sharp at any screen density.

- [`src/components/LogoMark.jsx`](src/components/LogoMark.jsx) — **generated.** The
  paths are the supplied artwork untouched, framed by its own 2589 × 1941 box, so
  the mark fills whatever width it is given and is never letterboxed.
- [`src/components/intro.css`](src/components/intro.css) — the timeline, 2.05s:
  the Arabic wipe (a masked gradient travelling right to left), the nuqta drop,
  the three Latin letters converging out of blur, the sheen, and a slow settle
  under all of it. Then a datum rule draws beneath the mark and the soundings
  drop from it — the same figure that marks the seam between the two sections.
- [`src/components/IntroSplash.jsx`](src/components/IntroSplash.jsx) — the sequence
  around it. `DRAW`, `HOLD_AFTER` and `EXIT` are constants at the top; `DRAW` must
  match the 2.05s in the stylesheet. A pointer down at any moment ends the intro
  immediately. With `prefers-reduced-motion`, the finished mark shows briefly with
  no motion.

`index.html` paints the same paper before any script loads, so a refresh never
flashes another colour.

`hilf_logo_motion.html` is the same motion as a standalone file for preview or
screen capture. It defaults to the true lockup — grey Arabic and navy Latin on
paper — with `<html data-theme="reverse">` giving a one-colour white lockup for
placing the mark on a dark ground. Both come from one copy of the artwork — if the
logo changes, regenerate rather than editing the paths by hand.

---

## Structure

```
src/
  index.css              design tokens (light paper + .theme-dark band), reset, the one button style
  App.jsx                IntroSplash → Card, Company, footer
  data/profile.js        all content and links
  lib/motion.js          the reveal: one IntersectionObserver, no motion library
  lib/vcard.js           builds the downloadable contact card
  components/
    IntroSplash          the logo page and the sequence timing
    LogoMark             the HILF mark as SVG (generated)
    SoundingBand         the comb of hairlines — the intro's datum, and the seam
    Card                 name, role, company, Call + Save contact, the three routes
    Company              what HILF Shipping does, its website and its office
    Icon                 authored SVG icon set — only the marks this card draws
```

---

## Responsive behaviour

Phone first, and the phone layout is the layout: one column, one action per row,
every target at least 56px tall.

| Width | Layout |
|---|---|
| ≤ 639px | Full-bleed single column |
| ≥ 640px | The same column, centred at 30rem, with the name and the company section centred. It never becomes two columns — there is not enough on a business card to fill one. |
