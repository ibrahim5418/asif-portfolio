/**
 * Single source of truth for every piece of copy and every link on the card.
 * Edit this file to update the site — no component holds content of its own.
 *
 * The card is two sections and nothing else: who he is and how to reach him,
 * then who he works for. Every route below appears exactly once on the page.
 */

/* ------------------------------------------------------------------ *
 *  EMPLOYEE — name, role, and where he works
 * ------------------------------------------------------------------ */
export const person = {
  name: 'Asif bin Hossain',
  givenName: 'Asif',
  familyName: 'bin Hossain',
  role: 'Senior Chartering Manager',
};

/* ------------------------------------------------------------------ *
 *  CONTACT
 *      whatsapp — digits only, country code first, no +, spaces or dashes
 * ------------------------------------------------------------------ */
const CONTACT_RAW = {
  whatsapp: '971504020908',
  phone: '971504020908',
  linkedin: 'https://www.linkedin.com/in/asifbh/',
  email: 'asif@hilfshipping.com',
};

export const phone = `+${CONTACT_RAW.phone}`;
export const phoneDisplay = '+971 50 402 0908';
export const email = CONTACT_RAW.email;
export const linkedin = CONTACT_RAW.linkedin;

/* ------------------------------------------------------------------ *
 *  COMPANY — where he works.
 *  The description is HILF Shipping's own wording from hilfshipping.com.
 * ------------------------------------------------------------------ */
export const company = {
  name: 'HILF Shipping LLC FZ',
  site: 'https://hilfshipping.com/',
  siteLabel: 'hilfshipping.com',
  tagline: 'Dry bulk chartering with ethical global execution.',
  intro:
    'HILF Shipping supports the worldwide movement of dry bulk commodities through voyage charter, time charter and commercial management services.',
};

/* ------------------------------------------------------------------ *
 *  OFFICE — one location, no directions button. The address block is
 *  itself the link to the listing on Google Maps.
 * ------------------------------------------------------------------ */
export const office = {
  label: 'HILF Shipping LLC FZ',
  lines: ['Tamani Arts Building', 'Al Asayel St, Business Bay', 'Dubai, United Arab Emirates'],
  /** vCard fields */
  street: 'Tamani Arts Building, Al Asayel St, Business Bay',
  city: 'Dubai',
  country: 'United Arab Emirates',
  /** The office's own Google Maps listing (its place ID). */
  map: 'https://maps.google.com/?cid=12299312600407320269',
};

/* ------------------------------------------------------------------ *
 *  CONTACT ROUTES — one button each, rendered in one place.
 *  Order is the order they appear, and the order they are most used.
 *
 *  Call and Save contact are not in this list: they are the two actions
 *  a scanned card is for, so they sit at the top of the card as a pair.
 *  `handle` is the second line under the label.
 * ------------------------------------------------------------------ */
export const routes = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    handle: 'Message directly',
    href: `https://wa.me/${CONTACT_RAW.whatsapp}`,
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    handle: CONTACT_RAW.email,
    href: `mailto:${CONTACT_RAW.email}`,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: '/in/asifbh',
    href: CONTACT_RAW.linkedin,
    external: true,
  },
];
