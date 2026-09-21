import Icon from './Icon';
import SoundingBand from './SoundingBand';
import { company, office } from '../data/profile';
import { useReveal } from '../lib/motion';
import logo from '../assets/hilf-logo.webp';
import './company.css';

/**
 * Section two: the company, in its own words.
 *
 * The mark is the company's name, so the name is not set again in type
 * beside it — the heading is there for screen readers and search only.
 * One button, to the one place this section can send anyone.
 */
export default function Company() {
  const ref = useReveal();

  return (
    <section id="company" ref={ref} className="co" aria-labelledby="co-title" data-reveal>
      {/* The seam where the dark card meets the paper, drawn as soundings
          hanging from it. The page's one piece of ornament, and it earns
          its place by marking the boundary rather than decorating it. */}
      <SoundingBand className="co__band" />

      <h2 id="co-title" className="sr-only">
        {company.name}
      </h2>

      <img className="co__logo" src={logo} width="319" height="240" alt={company.name} />

      <p className="co__lead">{company.tagline}</p>
      <p className="co__about">{company.intro}</p>

      {/* The two places this section can send anyone: the site, and the
          office on the map. One button each, side by side. */}
      <div className="co__cta">
        <a className="btn btn--acid" href={company.site} target="_blank" rel="noopener noreferrer">
          {company.siteLabel}
          <Icon name="arrow" size={17} />
        </a>
        <a
          className="btn btn--stone"
          href={office.map}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${office.label}, ${office.city} — opens in Google Maps in a new tab`}
        >
          <Icon name="pin" size={17} />
          Location
        </a>
      </div>
    </section>
  );
}
