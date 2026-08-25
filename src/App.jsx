import { useEffect, useState, useCallback } from 'react';
import {
  FaArrowRight, FaArrowUp, FaBaby, FaBirthdayCake, FaClock,
  FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPuzzlePiece,
  FaShieldAlt, FaSocks, FaStar, FaTiktok, FaUsers, FaWhatsapp,
  FaTimes, FaChevronLeft, FaChevronRight, FaHeart, FaCheck,
  FaPhone, FaCalendarAlt, FaGift, FaCamera,
} from 'react-icons/fa';
import { GiMountainClimbing, GiKidSlide, GiPartyPopper } from 'react-icons/gi';
import { MdCleanHands, MdClose, MdMenu, MdOutlineToys } from 'react-icons/md';

const WA = 'https://wa.me/923265652798';

const links = [
  ['Home', '/'],
  ['About Us', '/about-us'],
  ['Play Zones', '/play-zones'],
  ['Birthday Parties', '/birthday-parties'],
  ['Gallery', '/gallery'],
  ['Contact Us', '/contact-us'],
];

const pageMeta = {
  '/': {
    title: 'Little Explorers World | Indoor Kids Play Zone Islamabad',
    desc: 'A colourful indoor playground for kids aged 0–10 in Bahria Town Phase 4, Islamabad. 6 play zones, birthday parties & more.',
  },
  '/birthday-parties': {
    title: 'Birthday Parties in Islamabad | Little Explorers World',
    desc: 'Book an unforgettable kids birthday party in Islamabad at Little Explorers World. Fun packages with décor, games, food & cake in Bahria Town Phase 4.',
  },
  '/about-us': {
    title: 'About Us | Little Explorers World Islamabad',
    desc: 'Learn about Little Explorers World — a safe, clean and colourful indoor playground in Bahria Town Phase 4, Islamabad for children aged 0–10.',
  },
  '/play-zones': {
    title: 'Play Zones & Pricing | Little Explorers World Islamabad',
    desc: '6 amazing play zones for kids in Islamabad. Slides, ball pit, climbing wall, kinetic sand & more. Rs. 1,199–1,999/hr. Daily 11AM–9PM.',
  },
  '/gallery': {
    title: 'Gallery | Little Explorers World Islamabad',
    desc: 'See photos from our indoor play zones and birthday parties at Little Explorers World, Bahria Town Islamabad.',
  },
  '/partner-with-us': {
    title: 'Partner with Us | Little Explorers World',
    desc: 'Partner with Little Explorers World Islamabad — schools, events, brand collaborations and community activations.',
  },
  '/contact-us': {
    title: 'Contact Us | Little Explorers World Islamabad',
    desc: 'Visit Little Explorers World in Bahria Town Phase 4, Islamabad. Open daily 11AM–9PM. Call +92 326 5652798.',
  },
};

const pics = Array.from({ length: 6 }, (_, i) => `/assets/gallery-${i + 1}.png`);

const zones = [
  ['01', 'Slides & Climb', 'Zoom down, climb up, and enjoy endless giggles in our thrilling slide zone.', GiKidSlide, pics[0], 'purple'],
  ['02', 'Ball Pit', 'Dive into a colourful world filled with fun, laughter and excitement.', FaBaby, pics[1], 'pink'],
  ['03', 'Climbing Wall', 'Build strength, confidence and reach new heights safely.', GiMountainClimbing, pics[5], 'green'],
  ['04', 'Play Area', 'Safe, cushioned play designed for little explorers of all ages.', MdOutlineToys, pics[2], 'aqua'],
  ['05', 'Pretend Play', 'Inspiring creativity and big imaginations through imaginative play.', FaPuzzlePiece, pics[3], 'orange'],
  ['06', 'Interactive Fun', 'Fun games that keep young minds active, curious and connected.', FaStar, pics[4], 'purple'],
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
          {links.slice(0, 5).map(([l, p]) => <A key={p} to={p}>{l}</A>)}
        </div>
        <div>
          <h4>Information</h4>
          <A to='/play-zones'>Pricing</A>
          <A to='/birthday-parties'>Birthday Parties</A>
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
    <section className='pricing-wrap reveal'>
      <div className='pricing-header'>
        <span className='eyebrow'>Simple & transparent</span>
        <h2>Play <i>Pricing</i></h2>
        <p>Open 7 days a week — just show up and play!</p>
      </div>

      <div className='pricing-grid'>
        {/* Play sessions card */}
        <div className='price-card'>
          <div className='price-card-top'>
            <span className='price-label'>Play Sessions</span>
            <span className='price-tag'><FaClock /> Daily 11AM – 9PM</span>
          </div>

          <div className='price-tiers'>
            <div className='price-tier tier-green'>
              <div className='tier-icon'><FaBaby /></div>
              <div className='tier-info'>
                <span>Kids Under 2 Years</span>
                <strong>Rs. 1,199 <em>/hr</em></strong>
              </div>
            </div>
            <div className='price-tier tier-purple'>
              <div className='tier-icon'><FaUsers /></div>
              <div className='tier-info'>
                <span>Kids Over 2 Years</span>
                <strong>Rs. 1,999 <em>/hr</em></strong>
              </div>
            </div>
          </div>

          <div className='price-note'>
            <FaArrowRight /> Additional 30 Minutes: <strong>Rs. 500</strong>
          </div>

          <div className='price-includes'>
            <span><FaShieldAlt /> Safety Supervision</span>
            <span><FaSocks /> Socks Required</span>
            <span><FaCheck /> All Play Zones</span>
          </div>

          <a className='btn green price-cta' href={WA}>
            <FaWhatsapp /> Book a Play Session
          </a>
        </div>

        {/* Birthday card */}
        <div className='party-card'>
          <div className='party-glow' />
          <GiPartyPopper className='party-icon' />
          <h2>Make Birthdays<br /><i>Unforgettable!</i></h2>
          <p>Fun-filled packages with décor, games, food and memories that last a lifetime.</p>
          <ul className='party-list'>
            <li><FaCheck /> Dedicated play area for your group</li>
            <li><FaCheck /> Full balloon & banner decorations</li>
            <li><FaCheck /> Custom birthday cake included</li>
            <li><FaCheck /> Dedicated party host</li>
            <li><FaCheck /> Goodie bags for all kids</li>
          </ul>
          <div className='party-actions'>
            <a className='btn party-wa-btn' href={`${WA}?text=Hi!%20I%20want%20to%20book%20a%20birthday%20party.`}>
              <FaWhatsapp /> Book on WhatsApp
            </a>
            <button className='party-link-btn' onClick={() => go('/birthday-parties')}>
              View Packages <FaArrowRight />
            </button>
          </div>
        </div>
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
function PageHero({ kicker, title, titleJsx, text, img = pics[0] }) {
  return (
    <section className='page-hero'>
      <div>
        <span className='eyebrow'>{kicker}</span>
        <h1>{titleJsx || title}</h1>
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
        titleJsx={<><span>Where</span> Play<br />Builds <i>Confidence</i></>}
        text='A safe, clean and colourful indoor playground designed to spark imagination, build confidence and create unforgettable childhood memories.'
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
        titleJsx={<><span>Endless</span> Fun<br />in Every <i>Zone</i></>}
        text='Climb, slide, imagine, build and discover in spaces thoughtfully designed for little minds and bodies.'
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
        titleJsx={<><span>Partner</span> with<br /><i>Little</i> <b>Explorers</b></>}
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
        titleJsx={<><span>Plan</span> Your<br /><i>Visit</i></>}
        text='Questions about play sessions, birthday parties or group bookings? Our friendly team is here to help.'
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

/* ─── Birthday Party ─── */
const bdPackages = [
  {
    name: 'Starter',
    color: 'aqua',
    price: 'Rs. 15,000',
    guests: 'Up to 10 Kids',
    duration: '2 Hours Play',
    features: [
      'Dedicated play area for your group',
      'Basic balloon decorations',
      'Birthday cake (1 kg)',
      'Complimentary entry for birthday child',
      'Staff assistance throughout',
      'Parent seating area',
    ],
  },
  {
    name: 'Premium',
    color: 'pink',
    price: 'Rs. 25,000',
    guests: 'Up to 20 Kids',
    duration: '3 Hours Play',
    highlight: true,
    features: [
      'Private zone for your celebration',
      'Full balloon & banner decorations',
      'Customised birthday cake (2 kg)',
      'Party games & prizes included',
      'Dedicated party host',
      'Goodie bags for all kids',
      'Photography moments',
      'Parent lounge with refreshments',
    ],
  },
  {
    name: 'Grand',
    color: 'purple',
    price: 'Rs. 40,000',
    guests: 'Up to 35 Kids',
    duration: '4 Hours Play',
    features: [
      'Exclusive venue for full party',
      'Premium themed décor & setup',
      'Custom birthday cake (3 kg)',
      'Full entertainment programme',
      'Dedicated party host + assistant',
      'Premium goodie bags',
      'Catering / food included',
      'Photo & video package',
      'Customised invitations',
    ],
  },
];

const bdFaqs = [
  ['How early should I book?', 'We recommend booking at least 1–2 weeks in advance, especially on weekends. Contact us on WhatsApp to check availability.'],
  ['What age group is suitable?', 'Our play zones are designed for children aged 0–10 years. All our birthday packages are perfect for this age range.'],
  ['Can we bring our own cake?', 'Absolutely! You are welcome to bring your own cake. We also offer in-house cakes with our Premium and Grand packages.'],
  ['Is there parking available?', 'Yes, Alpha Marina has ample parking available for guests.'],
  ['Can adults stay during the party?', 'Yes! Parents and guardians are always welcome. We have a comfortable parent lounge area with free Wi-Fi and refreshments.'],
  ['Do you offer custom themes?', 'Yes — our Grand package includes themed décor of your choice. Contact us on WhatsApp to discuss your preferred theme.'],
];

function BirthdayParty() {
  const [openFaq, setOpenFaq] = useState(null);
  const waParty = 'https://wa.me/923265652798?text=Hi!%20I%20would%20like%20to%20book%20a%20birthday%20party%20at%20Little%20Explorers%20World.';

  return (
    <>
      {/* Hero */}
      <section className='bp-hero'>
        <div className='bp-hero-copy'>
          <GiPartyPopper className='bp-balloons' />
          <span className='eyebrow'>Islamabad's favourite kids party venue</span>
          <h1>Birthday Parties<br />in <i>Islamabad</i></h1>
          <p>Create unforgettable childhood memories at Little Explorers World, Bahria Town Phase 4. Fun-filled packages with décor, cake, games and endless play!</p>
          <div className='bp-hero-actions'>
            <a className='btn pink' href={waParty}><FaWhatsapp /> Book a Party Now</a>
            <a className='btn' style={{ background: 'var(--purple)' }} href='tel:+923265652798'><FaPhone /> Call Us</a>
          </div>
          <div className='bp-trust-pills'>
            <span><FaCheck /> Free consultation</span>
            <span><FaCheck /> Customisable packages</span>
            <span><FaCheck /> Kids aged 0–10</span>
          </div>
        </div>
        <div className='bp-hero-img'>
          <img src={pics[3]} alt='Birthday party at Little Explorers World Islamabad' loading='eager' />
          <div className='bp-badge'><FaStar /><span>Islamabad's<br />Top Rated<br />Play Zone</span></div>
        </div>
      </section>

      {/* Why us */}
      <section className='bp-why reveal'>
        <span className='eyebrow'>Why families choose us</span>
        <h2>Everything done for <i>you</i></h2>
        <div className='bp-why-grid'>
          {[
            [GiPartyPopper, 'Hassle-Free Setup', 'We handle all decorations and arrangements so you can enjoy the day stress-free.'],
            [FaShieldAlt, 'Safe & Supervised', 'Fully trained staff and childproofed play zones — safety is our top priority.'],
            [FaCamera, 'Unforgettable Moments', 'Photo-worthy setups and joyful spaces that create lasting memories.'],
            [FaGift, 'Customisable Packages', 'Choose from 3 packages or talk to us about a bespoke celebration.'],
          ].map(([Icon, title, text]) => (
            <article className='bp-why-card' key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className='bp-packages reveal'>
        <span className='eyebrow'>Choose your celebration</span>
        <h2>Birthday <i>Packages</i></h2>
        <p className='bp-pkg-sub'>All packages include dedicated play time, staff assistance & parent seating. <a href={waParty} style={{ color: 'var(--pink)', fontWeight: 600 }}>Contact us</a> for custom requests.</p>
        <div className='bp-pkg-grid'>
          {bdPackages.map(pkg => (
            <div className={`bp-pkg-card ${pkg.highlight ? 'highlighted' : ''}`} key={pkg.name}>
              {pkg.highlight && <div className='bp-popular'>Most Popular</div>}
              <div className={`bp-pkg-icon ${pkg.color}`}><FaBirthdayCake /></div>
              <h3>{pkg.name}</h3>
              <div className='bp-price'>{pkg.price}</div>
              <div className='bp-pkg-meta'>
                <span><FaUsers /> {pkg.guests}</span>
                <span><FaClock /> {pkg.duration}</span>
              </div>
              <ul className='bp-features'>
                {pkg.features.map(f => <li key={f}><FaCheck className='check-icon' /> {f}</li>)}
              </ul>
              <a className={`btn ${pkg.highlight ? 'pink' : ''}`}
                style={!pkg.highlight ? { background: `var(--${pkg.color})` } : {}}
                href={waParty}>
                Book {pkg.name} <FaArrowRight />
              </a>
            </div>
          ))}
        </div>
        <p className='bp-note'>Prices are indicative — final quote shared after consultation. All prices include applicable taxes.</p>
      </section>

      {/* How to book */}
      <section className='bp-steps reveal'>
        <span className='eyebrow'>Simple & easy</span>
        <h2>How to <i>Book</i></h2>
        <div className='bp-steps-grid'>
          {[
            [FaWhatsapp, '01', 'Message Us', 'Send us a WhatsApp message with your preferred date and number of kids.'],
            [FaCalendarAlt, '02', 'Confirm & Plan', "We'll confirm availability and help you choose the perfect package and theme."],
            [GiPartyPopper, '03', 'Celebrate!', 'Show up and enjoy — we handle everything else for an unforgettable party!'],
          ].map(([Icon, num, title, text]) => (
            <div className='bp-step' key={num}>
              <div className='bp-step-num'>{num}</div>
              <Icon className='bp-step-icon' />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <a className='btn pink' href={waParty}><FaWhatsapp /> Start Booking on WhatsApp</a>
      </section>

      {/* Gallery */}
      <section className='bp-gallery reveal'>
        <span className='eyebrow'>Real parties, real smiles</span>
        <h2>Party <i>Moments</i></h2>
        <div className='bp-gallery-grid'>
          {[pics[3], pics[0], pics[4], pics[1], pics[5], pics[2]].map((p, i) => (
            <div className='gallery-item' key={i}>
              <img src={p} alt={`Birthday party at Little Explorers World Islamabad ${i + 1}`} loading='lazy' />
              <div className='gallery-overlay'><span>View Photo</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className='bp-faq reveal'>
        <span className='eyebrow'>Got questions?</span>
        <h2>Frequently Asked <i>Questions</i></h2>
        <div className='bp-faq-list'>
          {bdFaqs.map(([q, a], i) => (
            <div className={`bp-faq-item ${openFaq === i ? 'open' : ''}`} key={i}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{q}</span>
                <span className='faq-arrow'>{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && <p>{a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className='bp-cta reveal'>
        <GiPartyPopper className='bp-cta-icon' />
        <h2>Ready to Plan the <i>Perfect Party?</i></h2>
        <p>Get in touch today — availability fills up fast on weekends!</p>
        <div className='bp-cta-btns'>
          <a className='btn pink' href={waParty}><FaWhatsapp /> Book on WhatsApp</a>
          <a className='btn' style={{ background: 'var(--purple)' }} href='tel:+923265652798'><FaPhone /> +92 326 5652798</a>
          <a className='btn' style={{ background: 'var(--green)' }} href='mailto:Little.explorer904@gmail.com'>Email Us</a>
        </div>
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

    const meta = pageMeta[path] || pageMeta['/'];
    document.title = meta.title;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', meta.desc);

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
    '/birthday-parties': BirthdayParty,
    '/gallery': () => (
      <>
        <PageHero
          kicker='See the smiles'
          title='A Peek Inside the Fun'
          titleJsx={<><span>Moments</span><br />of <i>Joy</i></>}
          text='Explore colourful play spaces, birthday party setups and happy family moments.'
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
