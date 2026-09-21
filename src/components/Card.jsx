import Icon from './Icon';
import { person, company, phone, phoneDisplay, routes } from '../data/profile';
import { useReveal } from '../lib/motion';
import { saveContact } from '../lib/vcard';
import logoLight from '../assets/hilf-logo-light.webp';
import './card.css';

/**
 * Section one: who he is, where he works, and every way to reach him.
 *
 * The two things a scanned card is actually for — ring him, or keep him —
 * sit at the top as a pair, with the number printed under them. The rest
 * of the routes follow as a numbered register. Each route appears exactly
 * once: Call is a button here and not also a row below it.
 *
 * The office is not on this section. It is one button beside the company
 * website at the foot of the page, where the rest of HILF lives.
 */
export default function Card() {
  const ref = useReveal();

  return (
    <section id="card" ref={ref} className="card theme-dark" aria-labelledby="card-name" data-reveal>
      <header className="card__head">
        <h1 id="card-name" className="card__name">
          {person.name}
        </h1>
        <p className="card__role">{person.role}</p>

        <p className="card__at">
          <img src={logoLight} width="319" height="240" alt="" />
          <span>{company.name}</span>
        </p>
      </header>

      <div className="card__actions">
        <a className="btn btn--acid" href={`tel:${phone}`}>
          <Icon name="phone" size={17} />
          Call
        </a>
        <button className="btn btn--stone" onClick={saveContact}>
          <Icon name="download" size={17} />
          Save contact
        </button>
      </div>

      {/* Printed, not a control — the number a card is expected to show. */}
      {/* <p className="card__number">{phoneDisplay}</p> */}

      <p className="reg" aria-hidden="true">
        <span>Contact</span>
        <span className="reg__rule" />
        <span>{String(routes.length).padStart(2, '0')}</span>
      </p>

      <ul className="routes">
        {routes.map((r, i) => (
          <li key={r.id}>
            <a
              className={`route route--${r.id}`}
              href={r.href}
              {...(r.external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <span className="route__glyph">
                <Icon name={r.id} size={21} />
              </span>
              <span className="route__text">
                <span className="route__label">{r.label}</span>
                <span className="route__handle">{r.handle}</span>
              </span>
              <span className="route__index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
