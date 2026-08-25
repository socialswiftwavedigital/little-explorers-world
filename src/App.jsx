import { useEffect, useState, useCallback } from 'react';
import {
  FaArrowRight, FaArrowUp, FaBaby, FaBirthdayCake, FaClock,
  FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPuzzlePiece,
  FaShieldAlt, FaSocks, FaStar, FaTiktok, FaUsers, FaWhatsapp,
  FaTimes, FaChevronLeft, FaChevronRight, FaHeart
} from 'react-icons/fa';
import { GiMountainClimbing, GiKidSlide, GiPartyPopper } from 'react-icons/gi';
import { MdCleanHands, MdClose, MdMenu, MdOutlineToys } from 'react-icons/md';

const WA = 'https://wa.me/923265652798';

const links = [
  ['Home', '/'],
  ['About Us', '/about-us'],
  ['Play Zones', '/play-zones'],
  ['Gallery', '/gallery'],
  ['Partner with Us', '/partner-with-us'],
  ['Contact Us', '/contact-us'],
];

const pics = Array.from({ length: 6 }, (_, i) => `/assets/gallery-${i + 1}.png`);

const zones = [
  ['01', 'Slides & Climb', 'Zoom down, climb up, and enjoy endless giggles.', GiKidSlide, pics[0], 'purple'],
  ['02', 'Ball Pit', 'Dive into a colourful world of movement and excitement.', FaBaby, pics[1], 'pink'],
  ['03', 'Climbing Wall', 'Build strength, confidence, and reach new heights.', GiMountainClimbing, pics[5], 'green'],
  ['04', 'Kinetic Sand', 'Shape, scoop and discover through calming sensory play.', MdOutlineToys, pics[2], 'aqua'],
  ['05', 'Pretend Play', 'Big imaginations come alive in a world made for little roles.', FaPuzzlePiece, pics[3], 'orange'],
  ['06', 'Interactive Fun', 'Games that keep young minds active, curious and connected.', FaStar, pics[4], 'purple'],
];

const stats = [
  ['3,000+', 'Happy Families', FaHeart],
  ['6', 'Play Zones', FaPuzzlePiece],
  ['7', 'Days a Week', FaClock],
  ['0–10', 'Age Range (yrs)', FaBaby],
];

function go(p) {
  history.pushState({}, '', p);
  dispatchEvent(new PopStateEvent('popstate'));
  scrollTo({ top: 0, behavior: 'smooth' });
}

const A = ({ to, children, className = '' }) => (
  <a
    className={className}
    href={to}
    onClick={e => {
      if (to[0] === '/') { e.preventDefault(); go(to); }
    }}
  >
    {children}
  </a>
);

/* ─── Lightbox ─── */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}><FaTimes /></button>
      <button className="lightbox-prev" onClick={e => { e.stopPropagation(); onPrev(); }}><FaChevronLeft /></button>
      <img
        src={images[index]}
        alt={`Gallery ${index + 1}`}
        className="lightbox-img"
        onClick={e => e.stopPropagation()}
      />
      <button className="lightbox-next" onClick={e => { e.stopPropagation(); onNext(); }}><FaChevronRight /></button>
      <div className="lightbox-counter">{index + 1} / {images.length}</div>
    </div>
  );
}

/* ─── Header ─── */
function Header({ path }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <A to='/' className='logo'>
        <img src='/assets/logo.png' alt='Little Explorers World' />
      </A>
      <button className='menu' onClick={() => setOpen(!open)} aria-label='Menu'>
        {open ? <MdClose /> : <MdMenu />}
      </button>
      <nav className={open ? 'open' : ''}>
        {links.map(([l, p]) => (
          <A key={p} to={p} className={path === p ? 'active' : ''} onClick={() => setOpen(false)}>
            {l}
          </A>
        ))}
      </nav>
      <a className='btn book' href={WA}>
        <FaWhatsapp /> Book Your Visit
      </a>
    </header>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer>
      <div className='footer-grid'>
        <div className='brand'>
          <img src='/assets/logo.png' alt='Little Explorers World' />
          <p>A colourful indoor play adventure for kids in Islamabad.</p>
          <div className='social'>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' aria-label='Facebook'><FaFacebookF /></a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' aria-label='Instagram'><FaInstagram /></a>
            <a href='https://tiktok.com' target='_blank' rel='noopener noreferrer' aria-label='TikTok'><FaTiktok /></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          {links.slice(0, 4).map(([l, p]) => <A key={p} to={p}>{l}</A>)}
        </div>
        <div>
          <h4>Information</h4>
          <A to='/play-zones'>Pricing</A>
          <a href={WA}>Birthday Parties</a>
          <A to='/about-us'>Safety & Cleanliness</A>
          <A to='/partner-with-us'>Partner with Us</A>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p><FaMapMarkerAlt /> 2nd Floor, Plaza 42, Alpha Marina, Bahria Town Phase 4, Islamabad</p>
          <a href='tel:+923265652798'>+92 326 5652798</a>
          <a href='mailto:Little.explorer904@gmail.com'>Little.explorer904@gmail.com</a>
        </div>
        <div>
          <h4>Opening Hours</h4>
          <p>Mon – Sun<br /><b>11:00 AM – 09:00 PM</b></p>
          <span className='pill'>Open 7 Days</span>
          <a className='btn green footer-wa' href={WA} style={{ marginTop: '16px' }}>
            <FaWhatsapp /> WhatsApp Us
          </a>
        </div>
      </div>
      <div className='copy'>© 2026 Little Explorers World. All Rights Reserved. Made with <FaHeart style={{ color: 'var(--pink)', verticalAlign: 'middle' }} /> in Islamabad.</div>
    </footer>
  );
}

/* ─── Stats ─── */
function Stats() {
  return (
    <section className='stats reveal'>
      {stats.map(([num, label, Icon]) => (
        <div className='stat-item' key={label}>
          <Icon className='stat-icon' />
          <strong>{num}</strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}

/* ─── Trail ─── */
function Trail() {
  return (
    <section className='trail-section reveal'>
      <div className='heading'>
        <span className='eyebrow'>A journey made for curious minds</span>
        <h2>Your Child's Journey<br />of <i>Discovery</i></h2>
        <p>Thoughtfully designed spaces that inspire imagination, movement and joy.</p>
      </div>
      <div className='trail'>
        {zones.map(([n, name, text, Icon, img, color], i) => (
          <article className={'stop ' + (i % 2 ? 'reverse' : '')} key={name}>
            <b className={color}>{n}</b>
            <div className='zone-copy'>
              <Icon />
              <h3>{name}</h3>
              <p>{text}</p>
            </div>
            <img src={img} alt={name} loading='lazy' />
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
function Pricing() {
  return (
    <section className='pricing reveal'>
      <div className='price-card'>
        <span className='eyebrow'>Simple & transparent</span>
        <h2>Play Pricing</h2>
        <p>Available for kids, 7 days a week.</p>
        <div className='prices'>
          <div>
            <FaBaby />
            <small>Kids Under 2 Years</small>
            <strong>Rs. 1,199 <em>/ hour</em></strong>
          </div>
          <div>
            <FaUsers />
            <small>Kids Over 2 Years</small>
            <strong>Rs. 1,999 <em>/ hour</em></strong>
          </div>
        </div>
        <p>Additional 30 Minutes: Rs. 500</p>
        <aside>
          <span><FaShieldAlt /> Safety Supervision</span>
          <span><FaSocks /> Socks Required</span>
        </aside>
        <a className='btn green' href={WA} style={{ marginTop: '20px', display: 'inline-flex' }}>
          <FaWhatsapp /> Book Now
        </a>
      </div>
      <div className='party'>
        <div>
          <GiPartyPopper />
          <h2>Make Birthdays<br /><i>Unforgettable!</i></h2>
          <p>Fun-filled packages with décor, games, food and memories that last a lifetime.</p>
          <ul className='party-features'>
            <li>✓ Dedicated play area</li>
            <li>✓ Party decorations included</li>
            <li>✓ Custom birthday cake</li>
            <li>✓ Unlimited photo moments</li>
          </ul>
          <a className='btn pink' href={WA}>Book a Birthday Party <FaArrowRight /></a>
        </div>
        <img src={pics[3]} alt='Birthday party at Little Explorers' loading='lazy' />
      </div>
    </section>
  );
}

/* ─── Trust ─── */
function Trust() {
  const items = [
    [FaShieldAlt, 'Safety First', 'Soft flooring, padded walls and regular safety checks keep your child protected at all times.'],
    [MdCleanHands, 'Spotless & Sanitized', 'High standards of cleanliness and daily sanitization — every session, every day.'],
    [FaUsers, 'Trained Staff', 'Our friendly and experienced team is always present to assist your family.'],
    [FaClock, 'Parent Comfort', 'Relax with free Wi-Fi, comfortable seating and refreshments while kids play.'],
  ];
  return (
    <section className='trust reveal'>
      <span className='eyebrow' style={{ display: 'block', textAlign: 'center', marginBottom: '8px' }}>Why families love us</span>
      <h2>Safety. Cleanliness. <i>Peace of Mind.</i></h2>
      <div>
        {items.map(([Icon, title, text]) => (
          <article key={title}>
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const reviews = [
    { name: 'Ayesha K.', text: 'My daughter absolutely loves it here! The staff is so kind and the place is spotlessly clean. We come every weekend!', stars: 5 },
    { name: 'Bilal A.', text: 'Best birthday party venue in Islamabad! Everything was perfectly arranged and the kids had a blast. Highly recommended!', stars: 5 },
    { name: 'Sara M.', text: 'Great place for kids to burn energy! The play zones are well thought out and the safety standards are impressive.', stars: 5 },
  ];
  return (
    <section className='testimonials reveal'>
      <span className='eyebrow'>What parents are saying</span>
      <h2>Loved by <i>Families</i></h2>
      <div className='review-grid'>
        {reviews.map(({ name, text, stars }) => (
          <article className='review-card' key={name}>
            <div className='review-stars'>{Array.from({ length: stars }, (_, i) => <FaStar key={i} />)}</div>
            <p>"{text}"</p>
            <strong>— {name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── Gallery ─── */
function Gallery({ full = false }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((i) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => (i - 1 + pics.length) % pics.length), []);
  const nextImage = useCallback(() => setLightboxIndex(i => (i + 1) % pics.length), []);

  return (
    <section className='gallery reveal'>
      <span className='eyebrow'>Real moments, happy memories</span>
      <h2>Moments of <i>Joy</i></h2>
      <div>
        {pics.map((p, i) => (
          <div className='gallery-item' key={p} onClick={() => openLightbox(i)}>
            <img src={p} alt={`Play area ${i + 1}`} loading='lazy' />
            <div className='gallery-overlay'><span>View Photo</span></div>
          </div>
        ))}
      </div>
      {!full && (
        <button className='btn purple' onClick={() => go('/gallery')}>
          View Full Gallery <FaArrowRight />
        </button>
      )}
      {lightboxIndex !== null && (
        <Lightbox
          images={pics}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}

/* ─── Home ─── */
function Home() {
  return (
    <>
      <section className='hero'>
        <div className='hero-copy'>
          <div className='rainbow' />
          <h1>
            <span>Explore.</span><br />
            <i>Play.</i> <b>Grow.</b><br />
            <em>Repeat!</em>
          </h1>
          <p>A colourful indoor adventure for kids in Islamabad.</p>
          <div className='actions'>
            <a className='btn green' href={WA}><FaWhatsapp /> Chat on WhatsApp</a>
            <button onClick={() => go('/play-zones')}>Explore Play Zones <FaArrowRight /></button>
          </div>
          <div className='meta'>
            <span><FaMapMarkerAlt /> Bahria Town Phase 4</span>
            <span><FaClock /> Daily, 11 AM – 9 PM</span>
          </div>
        </div>
        <div className='hero-image'>
          <img src='/assets/hero.png' alt='Kids playing at Little Explorers World' />
          <label><FaStar /> Safe, clean & full of fun</label>
        </div>
      </section>
      <Stats />
      <Trail />
      <Pricing />
      <Trust />
      <Testimonials />
      <Gallery />
      <section className='cta reveal'>
        <h2>Ready for an <i>Adventure</i> Today?</h2>
        <p>Bring your little explorer to a world of play, learning and joy.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className='btn green' href={WA}><FaWhatsapp /> Book Your Visit</a>
          <button className='btn' style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }} onClick={() => go('/contact-us')}>
            Get in Touch <FaArrowRight />
          </button>
        </div>
      </section>
    </>
  );
}

/* ─── Page Hero ─── */
function PageHero({ kicker, title, text, img = pics[0] }) {
  return (
    <section className='page-hero'>
      <div>
        <span className='eyebrow'>{kicker}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        <a className='btn green' href={WA}><FaWhatsapp /> Book Your Visit</a>
      </div>
      <img src={img} alt={title} loading='lazy' />
    </section>
  );
}

/* ─── About ─── */
function About() {
  return (
    <>
      <PageHero
        kicker='Our happy little world'
        title='Where Play Builds Confidence'
        text='A safe, clean and colourful indoor playground thoughtfully created for children aged 0–10.'
        img={pics[2]}
      />
      <section className='story reveal'>
        <div>
          <span className='eyebrow'>Explore. Play. Grow. Repeat!</span>
          <h2>Designed for childhood's best moments</h2>
          <p>Imaginative play, active movement, sensory discovery and parent comfort come together under one joyful roof. Every corner of Little Explorers World has been carefully designed with your child's development and safety in mind.</p>
        </div>
        <div className='values'>
          {[
            [FaShieldAlt, 'Safety by design', 'Every zone built with soft materials, padded surfaces and age-appropriate equipment.'],
            [MdCleanHands, 'Clean every day', 'Daily deep-cleaning and sanitization after every session.'],
            [FaUsers, 'Everyone belongs', 'Inclusive spaces for children of all abilities and ages up to 10.'],
          ].map(([Icon, title, text]) => (
            <article key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <Stats />
      <Trust />
    </>
  );
}

/* ─── Zones ─── */
function Zones() {
  return (
    <>
      <PageHero
        kicker='Six zones. Endless possibilities.'
        title='Every Visit Is a New Adventure'
        text='Climb, slide, imagine, build and discover in spaces designed for little minds and bodies.'
      />
      <Trail />
      <Pricing />
    </>
  );
}

/* ─── Partner ─── */
function Partner() {
  return (
    <>
      <PageHero
        kicker='Grow with a joyful local brand'
        title='Partner with Little Explorers'
        text="Let's create family-friendly experiences together through schools, communities and brand collaborations."
        img={pics[4]}
      />
      <section className='partners reveal'>
        {[
          [FaUsers, 'Schools & Groups', 'Organise field trips, group sessions and educational play events for your students.'],
          [FaBirthdayCake, 'Events & Activations', 'Host brand activations, product launches or corporate family days in our vibrant space.'],
          [FaStar, 'Brand Collaborations', 'Co-create memorable campaigns that reach thousands of Islamabad families.'],
        ].map(([Icon, title, text]) => (
          <article key={title}>
            <Icon />
            <h2>{title}</h2>
            <p>{text}</p>
            <a href='mailto:Little.explorer904@gmail.com'>Start a conversation <FaArrowRight /></a>
          </article>
        ))}
      </section>
    </>
  );
}

/* ─── Contact ─── */
function Contact() {
  const [success, setSuccess] = useState(false);
  return (
    <>
      <PageHero
        kicker="We'd love to welcome you"
        title='Plan Your Visit'
        text='Questions about play sessions, memberships or birthdays? Our team is ready to help.'
        img={pics[3]}
      />
      <section className='contact reveal'>
        <div>
          <h2>Come say hello</h2>
          <p><FaMapMarkerAlt /> Alpha Marina, Bahria Town Phase 4, Islamabad</p>
          <p><FaClock /> Open daily: 11:00 AM – 09:00 PM</p>
          <a href='tel:+923265652798'>+92 326 5652798</a>
          <a href='mailto:Little.explorer904@gmail.com'>Little.explorer904@gmail.com</a>
          <a className='btn green' href={WA}><FaWhatsapp /> Chat on WhatsApp</a>
          <div className='map-embed'>
            <iframe
              title='Little Explorers World Location'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.!2d73.1!3d33.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMwJzAwLjAiTiA3M8KwMDYnMDAuMCJF!5e0!3m2!1sen!2spk!4v1234567890'
              width='100%'
              height='220'
              style={{ border: 0, borderRadius: '16px', marginTop: '24px' }}
              allowFullScreen
              loading='lazy'
            />
          </div>
        </div>
        <form onSubmit={e => { e.preventDefault(); setSuccess(true); }}>
          <label>Name<input required placeholder='Your name' /></label>
          <label>Phone<input required placeholder='03XX XXXXXXX' /></label>
          <label>How can we help?
            <select>
              <option>General enquiry</option>
              <option>Play session</option>
              <option>Birthday party</option>
              <option>School / Group booking</option>
              <option>Partnership</option>
            </select>
          </label>
          <label>Message<textarea rows='4' placeholder='Tell us more...' /></label>
          <button className='btn pink'>Send Enquiry <FaArrowRight /></button>
          {success && <p className='success'>Thank you! We'll get back to you shortly. 🎉</p>}
        </form>
      </section>
    </>
  );
}

/* ─── Back to Top ─── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  if (!visible) return null;
  return (
    <button
      className='back-to-top'
      onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label='Back to top'
    >
      <FaArrowUp />
    </button>
  );
}

/* ─── App ─── */
export function App() {
  const [path, setPath] = useState(location.pathname.replace(/\/$/, '') || '/');

  useEffect(() => {
    const pop = () => setPath(location.pathname.replace(/\/$/, '') || '/');
    addEventListener('popstate', pop);

    const ob = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(x => ob.observe(x));

    return () => {
      removeEventListener('popstate', pop);
      ob.disconnect();
    };
  }, [path]);

  const routes = {
    '/': Home,
    '/about-us': About,
    '/play-zones': Zones,
    '/gallery': () => (
      <>
        <PageHero
          kicker='See the smiles'
          title='A Peek Inside the Fun'
          text='Explore colourful play spaces, party setups and joyful moments.'
          img={pics[1]}
        />
        <Gallery full />
      </>
    ),
    '/partner-with-us': Partner,
    '/contact-us': Contact,
  };

  const Page = routes[path] || Home;

  return (
    <>
      <Header path={path} />
      <main><Page /></main>
      <Footer />
      <a className='float' href={WA} aria-label='Chat on WhatsApp'><FaWhatsapp /></a>
      <BackToTop />
    </>
  );
}
