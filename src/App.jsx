import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  FaArrowRight, FaArrowUp, FaBaby, FaBirthdayCake, FaClock,
  FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPuzzlePiece,
  FaShieldAlt, FaSocks, FaStar, FaTiktok, FaUsers, FaWhatsapp,
  FaTimes, FaChevronLeft, FaChevronRight, FaHeart, FaCheck,
  FaPhone, FaCalendarAlt, FaGift, FaCamera, FaEnvelope,
  FaHandshake, FaBullhorn, FaMedal, FaBuilding,
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
  ['Partner with Us', '/partner-with-us'],
  ['Contact Us', '/contact-us'],
];

const pageMeta = {
  '/': {
    title: 'Little Explorers World | Indoor Kids Play Zone Islamabad',
    desc: 'A colourful indoor playground for kids aged 0–10 in Bahria Town Phase 4, Islamabad. 8 play zones, birthday parties & more.',
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
    desc: '8 amazing play zones for kids in Islamabad. Slides, ball pit, climbing wall, sensory room, kinetic sand, lego table & more. Rs. 1,199–1,999/hr. Daily 11AM–11PM.',
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
    desc: 'Visit Little Explorers World in Bahria Town Phase 4, Islamabad. Open daily 11AM–11PM. Call +92 326 5652798.',
  },
};

const pics = Array.from({ length: 15 }, (_, i) => `/assets/gallery-${i + 1}.webp`);

const zonePics = [
  '/assets/zone-slides.webp',
  '/assets/zone-ball-pit.webp',
  '/assets/zone-climbing.webp',
  '/assets/zone-pretend-play.webp',
  '/assets/zone-sensory.webp',
  '/assets/zone-lego.webp',
  '/assets/zone-kinetic-sand.webp',
  '/assets/zone-latcher.webp',
];

const zones = [
  ['01', 'Slides & Climb', 'Zoom down colourful slides, scale soft climbing structures and build strength, courage and physical confidence — a favourite for active kids in Islamabad.', GiKidSlide, '/assets/zone-slides.webp', 'gold'],
  ['02', 'Ball Pit', 'Dive into thousands of soft, clean, multicoloured balls and enjoy endless bouncing fun. Our supervised ball pit in Islamabad is safe, hygienic and refreshed daily.', FaBaby, '/assets/zone-ball-pit.webp', 'purple'],
  ['03', 'Climbing Wall', 'Challenge grip, balance and determination on our indoor climbing wall. Colourful holds at varying heights make it perfect for toddlers and older kids building real-world motor skills.', GiMountainClimbing, '/assets/zone-climbing.webp', 'green'],
  ['04', 'Pretend Play', 'A kitchen, market and grooming salon where children role-play real-world scenarios, sparking creativity, language skills and social interaction in a beautifully designed space.', FaPuzzlePiece, '/assets/zone-pretend-play.webp', 'pink'],
  ['05', 'Sensory Room', 'A calm, low-stimulation retreat designed for children who need a quieter space. Soft lighting, textures and calming activities support sensory exploration, relaxation and emotional regulation.', FaStar, '/assets/zone-sensory.webp', 'aqua'],
  ['06', 'Lego Table', 'Build, create and imagine with thousands of colourful LEGO bricks at our dedicated Lego table. Great for developing problem-solving, spatial thinking and fine motor skills.', MdOutlineToys, '/assets/zone-lego.webp', 'orange'],
  ['07', 'Kinetic Sand', 'Scoop, mould, sculpt and squish our mess-free kinetic sand — the satisfying tactile play that kids absolutely love. Ideal for creative expression and sensory development.', FaSocks, '/assets/zone-kinetic-sand.webp', 'pink'],
  ['08', 'Latcher Table', 'Boost fine motor skills and problem-solving with hands-on latches, bolts, doors and locks. A Montessori-inspired activity perfect for toddlers and early childhood development.', FaShieldAlt, '/assets/zone-latcher.webp', 'aqua'],
];

const stats = [
  ['3,000+', 'Happy Families', FaHeart],
  ['8', 'Play Zones', FaPuzzlePiece],
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

  return createPortal(
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
    </div>,
    document.body
  );
}

/* ─── Top Bar ─── */
function TopBar() {
  return (
    <div className='top-bar'>
      <span className='top-bar-tagline'>Islamabad&apos;s Favourite Kids Play Zone — Bahria Town Phase 4</span>
      <div className='top-bar-right'>
        <a className='top-bar-phone' href='tel:+923265652798'><FaPhone /> +92 326 5652798</a>
        <div className='top-bar-social'>
          <a href='https://facebook.com/littleexplorersworld' target='_blank' rel='noopener noreferrer' aria-label='Facebook'><FaFacebookF /></a>
          <a href='https://instagram.com/littleexplorersworld' target='_blank' rel='noopener noreferrer' aria-label='Instagram'><FaInstagram /></a>
          <a href='https://tiktok.com/@littleexplorersworld' target='_blank' rel='noopener noreferrer' aria-label='TikTok'><FaTiktok /></a>
        </div>
      </div>
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
        <div className='footer-seo'>
          <A to='/'><img src='/assets/logo.png' alt='Little Explorers World' className='footer-logo' /></A>
          <p>Islamabad's favourite indoor kids play zone in Bahria Town Phase 4. Safe, colourful and fully supervised play spaces for children aged 0–10 years — including slides, ball pit, climbing wall, sensory room, kinetic sand, Lego table and more. Perfect for birthday parties, school trips and family outings. Open daily 11 AM – 9 PM.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          {links.map(([l, p]) => <A key={p} to={p}>{l}</A>)}
        </div>
        <div>
          <h4>Contact Us</h4>
          <p className='footer-contact-item'><FaMapMarkerAlt className='fc-icon' /> 2nd Floor, Plaza No. 42, Alpha Marina, Marina Commercial, Corniche Road, Bahria Town Phase 4, Islamabad 46220, Pakistan</p>
          <a className='footer-contact-item' href='tel:+923265652798'><FaPhone className='fc-icon' /> <b>+92 326 5652798</b></a>
          <a className='footer-contact-item' href='mailto:Little.explorer904@gmail.com'><FaEnvelope className='fc-icon' /> <b>Little.explorer904@gmail.com</b></a>
        </div>
        <div>
          <h4>Opening Hours</h4>
          <p>Mon – Sun<br /><b>11:00 AM – 09:00 PM</b></p>
          <span className='pill'>Open 7 Days</span>
          <div className='social' style={{ marginTop: '18px' }}>
            <a href='https://facebook.com/littleexplorersworld' target='_blank' rel='noopener noreferrer' aria-label='Facebook'><FaFacebookF /></a>
            <a href='https://instagram.com/littleexplorersworld' target='_blank' rel='noopener noreferrer' aria-label='Instagram'><FaInstagram /></a>
            <a href='https://tiktok.com/@littleexplorersworld' target='_blank' rel='noopener noreferrer' aria-label='TikTok'><FaTiktok /></a>
          </div>
        </div>
      </div>
      <div className='copy'>© 2026 Little Explorers World. All Rights Reserved.</div>
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
      <span className='eyebrow' style={{ display: 'block', margin: '0 auto 8px' }}>Why families love us</span>
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
/* Gallery page — zone images */
function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const open  = useCallback(i => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev  = useCallback(() => setLightboxIndex(i => (i - 1 + zonePics.length) % zonePics.length), []);
  const next  = useCallback(() => setLightboxIndex(i => (i + 1) % zonePics.length), []);

  return (
    <section className='gallery reveal'>
      <span className='eyebrow'>Explore every zone</span>
      <h2>Inside <i>Little Explorers World</i></h2>
      <div>
        {zonePics.map((p, i) => (
          <div className='gallery-item' key={p} onClick={() => open(i)}>
            <img src={p} alt={`Play zone ${i + 1}`} loading='lazy' />
            <div className='gallery-overlay'><span>View Photo</span></div>
          </div>
        ))}
      </div>
      {lightboxIndex !== null && (
        <Lightbox images={zonePics} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
}

/* Home photo strip — all 15 real landscape photos */
function HomePhotos() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const open  = useCallback(i => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev  = useCallback(() => setLightboxIndex(i => (i - 1 + pics.length) % pics.length), []);
  const next  = useCallback(() => setLightboxIndex(i => (i + 1) % pics.length), []);

  return (
    <section className='home-photos reveal'>
      <div className='heading-center'>
        <span className='eyebrow'>Real moments, happy memories</span>
        <h2 style={{ marginTop: '12px' }}>A Peek Inside <i>Our World</i></h2>
      </div>
      <div className='photo-strip'>
        {pics.map((p, i) => (
          <div className='photo-strip-item' key={p} onClick={() => open(i)}>
            <img src={p} alt={`Little Explorers World photo ${i + 1}`} loading='lazy' />
            <div className='gallery-overlay'><span>View Photo</span></div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '28px' }}>
        <button className='btn purple' onClick={() => go('/gallery')}>
          Explore Play Zones <FaArrowRight />
        </button>
      </div>
      {lightboxIndex !== null && (
        <Lightbox images={pics} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
}

/* ─── Home ─── */
function Home() {
  return (
    <>
      {/* Hero */}
      <section className='hero'>
        <span className='le-float-icon le-slide' aria-hidden='true' />
        <span className='le-float-icon le-ballpit' aria-hidden='true' />
        <span className='le-float-icon le-climbing' aria-hidden='true' />
        <span className='le-float-icon le-blocks' aria-hidden='true' />

        <p className='le-welcome'>Welcome to</p>

        <p className='le-little' aria-hidden='true'>
          <span className='lc-purple'>L</span><span className='lc-green'>i</span><span className='lc-orange'>t</span><span className='lc-pink'>t</span><span className='lc-aqua'>l</span><span className='lc-green'>e</span>
        </p>
        <h1 className='sr-only'>Little Explorers World — Indoor Kids Play Zone Islamabad</h1>

        <p className='le-world'>
          <span className='le-explorers'>EXPLORERS</span>
          <span className='le-worldtxt'> WORLD</span>
        </p>

        <p className='le-tagline'>A colorful indoor play adventure<br />for kids</p>

        <div className='actions le-actions'>
          <a className='btn green' href={WA}><FaWhatsapp /> Chat on WhatsApp</a>
          <button onClick={() => go('/about-us')}>About Us <FaArrowRight /></button>
        </div>
      </section>

      <Stats />

      {/* Zones Icon Grid */}
      <section className='zones-section reveal'>
        <div className='section-head'>
          <span className='eyebrow'>6 amazing play zones</span>
          <h2>
            <span className='sparkle'>✦✦</span> Endless Fun in <i>Every Zone</i> <span className='sparkle'>✦✦</span>
          </h2>
          <p>Thoughtfully designed spaces that inspire imagination, movement and joy.</p>
        </div>
        <div className='zones-icon-grid'>
          {zones.map(([num, name, desc, Icon, , color]) => (
            <div key={num} className={`zone-icon-card z-${color}`}>
              <div className='zone-circle'><Icon /></div>
              <h3>{name}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Pricing />
      <Trust />
      <Testimonials />
      <HomePhotos />

      <section className='cta reveal'>
        <h2>Ready To Explore <i>Every Zone?</i></h2>
        <p>Create happy memories with your little ones at Little Explorers World.</p>
        <div className='actions' style={{ justifyContent: 'center' }}>
          <a className='btn green' href={WA}><FaWhatsapp /> Chat on WhatsApp</a>
          <button onClick={() => go('/contact-us')}>Contact Us <FaArrowRight /></button>
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
        text='A safe, clean and inclusive indoor play space where children of all abilities can come together to explore, imagine, learn and grow.'
        img='/assets/zone-pretend-play.webp'
      />

      {/* Intro statement */}
      <section className='about-intro reveal'>
        <span className='eyebrow' style={{ margin: '0 auto 12px', display: 'block' }}>Little Explorers World Islamabad</span>
        <h2>Pakistan's Most <i>Loved</i> Indoor Play Space</h2>
        <p>A safe, clean, and inclusive indoor play space in Islamabad where children of all abilities can come together to explore, imagine, learn, and grow. Our thoughtfully designed environment combines hygiene, security, creativity, and joyful activities to give children the freedom to play with confidence while parents enjoy complete peace of mind.</p>
      </section>

      {/* Who We Are */}
      <section className='story reveal'>
        <div>
          <span className='eyebrow'>Who We Are</span>
          <h2>Dedicated to <i>Every Child</i></h2>
          <p>At Little Explorers, we are dedicated to creating safe, inclusive and inspiring play spaces across Pakistan where children of all abilities feel welcomed, valued and free to be themselves. Our aim is to provide a joyful environment where every child can explore, connect, learn and grow through meaningful play experiences.</p>
          <p>Our thoughtfully designed space encourages imagination, physical movement, confidence, creativity and positive social interaction. From active play to calm sensory experiences, every area is created to support different stages of childhood development in a safe and engaging way.</p>
        </div>
        <div className='values'>
          {[
            [FaShieldAlt, 'Safety by Design', 'Every zone built with soft materials, padded surfaces and age-appropriate equipment.'],
            [MdCleanHands, 'Clean Every Day', 'Daily deep-cleaning and sanitization — high standards maintained every session.'],
            [FaUsers, 'Everyone Belongs', 'Inclusive spaces for children of all abilities and ages up to 10.'],
          ].map(([Icon, title, text]) => (
            <article key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className='about-vm reveal'>
        <div className='about-vm-card vision'>
          <span className='eyebrow'>Our Vision</span>
          <h2>A World of <i>Joyful Play</i></h2>
          <p>We envision a world where every child in Pakistan has access to a safe, clean, and joyful play environment that sparks their imagination and nurtures their development. Our play area will be a safe space for children, embracing diversity and inclusion, where laughter and learning come together to create lasting memories.</p>
        </div>
        <div className='about-vm-card mission'>
          <span className='eyebrow'>Our Mission</span>
          <h2>Play That <i>Matters</i></h2>
          <p>Our mission is to evoke change by fostering a play community that prioritises the well-being of all children. We strive to create a hygienic and inclusive space where kids can explore, play, and connect with others. Through education and engagement, we empower parents to understand the importance of play, cultivating a generation that values creativity, kindness, and social interaction.</p>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className='about-special reveal'>
        <div className='section-head'>
          <span className='eyebrow'>Why choose us</span>
          <h2>What Makes Us <i>Special</i></h2>
        </div>
        <div className='about-special-grid'>
          {[
            [FaShieldAlt, 'Safe & Hygienic', 'Clean, secure and thoughtfully designed spaces where children can play comfortably.'],
            [FaUsers, 'Inclusive for All', 'A welcoming environment created for children of all abilities and backgrounds.'],
            [FaPuzzlePiece, 'Play with Purpose', 'Activities that encourage creativity, physical movement, learning and social development.'],
            [FaClock, 'Parent-Friendly', 'A comfortable and supervised space where parents can relax while their children explore.'],
          ].map(([Icon, title, text]) => (
            <div className='about-special-card' key={title}>
              <div className='about-special-icon'><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Owner Message */}
      <section className='about-owners reveal'>
        <div className='about-owners-inner'>
          <div className='about-owners-text'>
            <span className='eyebrow'>Message From the Owners</span>
            <h2>A Letter from <i>Our Founders</i></h2>
            <blockquote>
              <p>Dear Families and Aspiring Partners,</p>
              <p>We started Little Explorers World with one simple dream — to create a place where every child feels safe, valued, and completely free to be themselves. Having witnessed firsthand how meaningful, purposeful play shapes a child's confidence, creativity and character, we knew Islamabad deserved a space truly designed with children at its heart.</p>
              <p>Every zone you walk through was built with love, careful thought, and a deep commitment to inclusion. We believe play is not just fun — it is how children learn empathy, build friendships, and discover who they are. From the soft padded floors to the vibrant climbing wall, every corner was chosen with your child's wellbeing in mind.</p>
              <p>Our mission goes beyond a play area. We want to build a community where families feel at home, where children of all abilities feel welcomed, and where parents can relax knowing their little ones are in the safest of hands.</p>
              <p>Thank you for trusting us with your most precious gift — your child.</p>
              <p style={{marginTop: 16, fontWeight: 600}}>Warm regards,</p>
            </blockquote>
            <div className='about-founders'>
              <div className='founder-card'>
                <strong>Muhammad Usman</strong>
                <span>CEO &amp; Founder</span>
              </div>
              <div className='founder-card'>
                <strong>Infaal Usman</strong>
                <span>Co-Founder</span>
              </div>
            </div>
          </div>
          <div className='about-owners-photo'>
            <img src='/assets/owners.webp' alt='Muhammad Usman and Infaal Usman, Founders of Little Explorers World' loading='lazy' />
          </div>
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
        kicker='Eight zones. Endless possibilities.'
        title='Endless Fun in Every Zone'
        titleJsx={<><span>Endless</span> Fun<br />in Every <i>Zone</i></>}
        text='Step into a world of fun, adventure, and discovery. Our indoor play centre provides a safe and stimulating environment where children can stay active, spark their imagination, build friendships, and create lasting memories through play.'
        img='/assets/zone-slides.webp'
      />

      {/* 8 Zones Grid */}
      <section className='zones-section reveal'>
        <div className='section-head'>
          <span className='eyebrow'>8 amazing play zones</span>
          <h2><span className='sparkle'>✦✦</span> Explore Every <i>Zone</i> <span className='sparkle'>✦✦</span></h2>
          <p>Every area thoughtfully designed to support different stages of childhood development.</p>
        </div>
        <div className='zones-icon-grid zones-8'>
          {zones.map(([num, name, desc, Icon, , color]) => (
            <div key={num} className={`zone-icon-card z-${color}`}>
              <div className='zone-circle'><Icon /></div>
              <h3>{name}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zone Features – Ticket Banner */}
      <section className='zone-features reveal'>
        <div className='zone-ticket'>
          <div className='zone-ticket-head'>
            <span className='eyebrow'>Everything included in one visit</span>
            <h2><span className='sparkle'>✦</span> One Ticket, <i>All</i> Play Zones Included <span className='sparkle'>✦</span></h2>
          </div>
          <div className='zone-ticket-grid'>
            {[
              [FaClock, 'Indoor & Weather Proof', 'Play comfortably, no matter the season', 'purple'],
              [FaUsers, 'Active Play Zones', 'Movement, balance & healthy development for every child', 'pink'],
              [MdCleanHands, 'Clean & Supervised', 'Our team keeps every area safe and spotless', 'gold'],
              [FaStar, 'Great for Learning', 'Play that supports growth, creativity & confidence', 'aqua'],
            ].map(([Icon, title, text, color]) => (
              <div className='zone-ticket-item' key={title}>
                <div className={`zone-ticket-icon zti-${color}`}><Icon /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone Detail Sections */}
      <section className='zone-details reveal'>
        <article className='zone-detail-block'>
          <div className='zone-detail-copy'>
            <span className='eyebrow'>Ball Pit &amp; Slides</span>
            <h2>Joyful Movement <i>&amp; Excitement</i></h2>
            <p>Race down the slides into a sea of soft, colourful balls! This zone builds coordination, balance and brings every child pure joy.</p>
            <a className='btn green' href={WA}><FaWhatsapp /> Plan Your Visit</a>
          </div>
          <div className='zone-detail-img'>
            <img src='/assets/zone-slides.webp' alt='Ball Pit and Slides at Little Explorers World' loading='lazy' />
          </div>
        </article>

        <article className='zone-detail-block reverse'>
          <div className='zone-detail-copy'>
            <span className='eyebrow'>Pretend Play &amp; Lego Table</span>
            <h2>Imagination, Creativity <i>&amp; Social Play</i></h2>
            <p>From role-play adventures to building masterpieces, this zone inspires storytelling, teamwork and endless creativity.</p>
            <a className='btn green' href={WA}><FaWhatsapp /> Plan Your Visit</a>
          </div>
          <div className='zone-detail-img'>
            <img src='/assets/zone-pretend-play.webp' alt='Pretend Play and Lego Table at Little Explorers World' loading='lazy' />
          </div>
        </article>

        <article className='zone-detail-block'>
          <div className='zone-detail-copy'>
            <span className='eyebrow'>Sensory Room &amp; Kinetic Sand</span>
            <h2>Calm Exploration <i>&amp; Tactile Play</i></h2>
            <p>Soothing lights, textures and hands-on play help children explore, relax and develop sensory awareness in a safe space.</p>
            <a className='btn green' href={WA}><FaWhatsapp /> Plan Your Visit</a>
          </div>
          <div className='zone-detail-img'>
            <img src='/assets/zone-sensory.webp' alt='Sensory Room and Kinetic Sand at Little Explorers World' loading='lazy' />
          </div>
        </article>
      </section>

      {/* Made for all abilities */}
      <section className='zone-inclusive reveal'>
        <div className='section-head'>
          <span className='eyebrow'>For every child</span>
          <h2>Made for Little Explorers <i>of All Abilities</i></h2>
        </div>
        <div className='zone-inclusive-grid'>
          {[
            [FaUsers, 'Inclusive Play', 'Welcoming environment for every child to play and thrive.', 'pink'],
            [FaShieldAlt, 'Safe Padded Setup', 'Soft, secure equipment for worry-free adventures.', 'gold'],
            [FaClock, 'Parent-Friendly', 'Relax in comfort while your little ones explore and have fun.', 'purple'],
            [FaBaby, 'For Every Age', 'Fun, engaging zones perfect for children aged 0–10.', 'aqua'],
          ].map(([Icon, title, text, color]) => (
            <div className={`zone-incl-card zic-${color}`} key={title}>
              <div className='zone-incl-icon'><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <Gallery />
      <Pricing />
    </>
  );
}

/* ─── Partner ─── */
function Partner() {
  const [success, setSuccess] = useState(false);

  const whyCards = [
    [FaHandshake, 'Meaningful Impact',    'Help us create safe, inclusive spaces where children can learn, play and grow.', 'purple'],
    [FaUsers,     'Stronger Community',   'Be part of a movement that brings families, organisations and changemakers together.', 'aqua'],
    [FaBullhorn,  'Shared Mission',       'Work alongside a passionate team committed to building a better tomorrow for children.', 'orange'],
    [FaMedal,     'Long-Term Difference', 'Your support helps create sustainable change that continues to benefit future generations.', 'pink'],
  ];

  const opportunities = [
    [FaUsers,       'Community Collaboration',  'Collaborate with us on initiatives that support children, families and inclusive play.', 'pink'],
    [FaCalendarAlt, 'Event Support & Sponsorships', 'Support special events, activities and community-based experiences.', 'gold'],
    [FaGift,        'Resource & Donations',     'Contribute useful resources, equipment or financial support to help us grow.', 'purple'],
    [FaBuilding,    'Brand Partnerships',       'Partner with Little Explorers through meaningful campaigns and shared initiatives.', 'aqua'],
    [FaBullhorn,    'Spread the Word',          'Help us reach more families by sharing our mission within your community.', 'green'],
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className='pw-hero'>
        <div className='pw-hero-text'>
          <span className='eyebrow'>Grow with a joyful local brand</span>
          <h1>
            Partner With Us.<br />
            <span className='pw-hero-sub'>
              <span style={{color:'#A796D4'}}>Build </span>
              <span style={{color:'#A9C63E'}}>Better </span>
              <span style={{color:'#F59A50'}}>Tom</span><span style={{color:'#E98BAD'}}>or</span><span style={{color:'#A6D9DB'}}>rows</span>
            </span>
          </h1>
          <p>We believe in the power of community, collaboration, and shared purpose. Join us in creating a brighter, more inclusive future where every child has the opportunity to explore, play, and grow.</p>
          <p>Together, we can create meaningful experiences, support local families, and make a lasting impact through fun, learning, and connection.</p>
          <A className='btn green' to='/about-us'>Learn More About Us <FaArrowRight /></A>
        </div>
        <div className='pw-hero-img blob-wrap'>
          <img src='/assets/zone-ball-pit.webp' alt='Kids playing at Little Explorers World' />
        </div>
      </section>

      {/* ── Why Partner ── */}
      <section className='pw-why reveal'>
        <div className='heading'>
          <span className='eyebrow'>Why choose us</span>
          <h2><span className='sparkle'>✦</span> Why <i>Partner</i> With Us <span className='sparkle'>✦</span></h2>
        </div>
        <div className='pw-why-grid'>
          {whyCards.map(([Icon, title, text, color]) => (
            <div className={`pw-why-card pwc-${color}`} key={title}>
              <div className='pw-why-icon'><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Opportunities ── */}
      <section className='pw-opps reveal'>
        <div className='heading'>
          <span className='eyebrow'>How you can collaborate</span>
          <h2>Partner <i>Opportunities</i></h2>
        </div>
        <div className='pw-opps-grid'>
          {opportunities.map(([Icon, title, text, color]) => (
            <div className={`pw-opp-card pwoc-${color}`} key={title}>
              <div className='pw-opp-icon'><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <p className='pw-opps-note'>Every contribution, big or small, helps us create more smiles, greater confidence and more possibilities. <FaHeart style={{ color: 'var(--pink)', verticalAlign: 'middle' }} /></p>
      </section>

      {/* ── Inquiry Form ── */}
      <section className='pw-form-wrap reveal'>
        <div className='pw-form-inner'>
          <div className='pw-form-left'>
            <span className='eyebrow'>Get in touch</span>
            <h2>Let's Create <i>Impact</i> Together</h2>
            <p>If you share our passion for helping children thrive, we would love to hear from you. Fill out the form and our team will get in touch to discuss potential partnership opportunities.</p>
            <img src='/assets/zone-pretend-play.webp' alt='Kids playing together' className='pw-form-img' />
          </div>
          <div>
            <h3 className='pw-form-title'>Send us a Message</h3>
            <form className='pw-form' onSubmit={e => { e.preventDefault(); setSuccess(true); }}>
              <div className='pw-form-row'>
                <label>Full Name<input required placeholder='Full Name' /></label>
                <label>Organisation<input placeholder='Organization (If Any)' /></label>
              </div>
              <label>Email Address<input type='email' required placeholder='Email Address' /></label>
              <label>Phone Number<input placeholder='Phone Number' /></label>
              <label>
                I am Interested in
                <select>
                  <option value=''>— I am Interested in</option>
                  <option>Community Collaboration</option>
                  <option>Event Sponsorship</option>
                  <option>Brand Partnership</option>
                  <option>Resource or Equipment Support</option>
                  <option>Donations</option>
                  <option>Volunteering</option>
                  <option>Other</option>
                </select>
              </label>
              <label>Message<textarea rows='4' placeholder='How would you like to partner with us?' /></label>
              <button className='btn pink'>Send Inquiry <FaArrowRight /></button>
              {success && <p className='success'>Thank you! We'll be in touch soon.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className='pw-cta reveal'>
        <div className='pw-cta-inner'>
          <span className='eyebrow' style={{ color: '#ffffffcc' }}>Every partner, every child</span>
          <h2>Every Partner. Every Child.<br /><i>Every Step Forward.</i></h2>
          <p>Together, we can build a world where every child has the chance to explore, play and shine.</p>
          <div className='pw-cta-btns'>
            <A className='btn' style={{ background: '#fff', color: 'var(--purple)' }} to='/contact-us'>Contact Us <FaArrowRight /></A>
            <a className='btn pink' href={WA}><FaWhatsapp /> Chat on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Contact ─── */
function Contact() {
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    ['What age group is Little Explorers suitable for?', 'Little Explorers is designed for children aged 0–10 years, with activities and play zones tailored to different age groups.'],
    ['What are your ticket prices?', 'Kids under 2 years: Rs. 1,199/hr. Kids over 2 years: Rs. 1,999/hr. Additional 30 minutes: Rs. 500. All play zones are included in one ticket.'],
    ['Do you host birthday parties and group bookings?', 'Yes! We offer fun-filled birthday party packages with décor, games, food and memories that last a lifetime. Contact us on WhatsApp to discuss your requirements and availability.'],
  ];

  return (
    <>
      <PageHero
        kicker="We'd love to welcome you"
        title='Get In Touch'
        titleJsx={<><span>Get</span> In<br /><i>Touch</i></>}
        text="At Little Explorers World, we believe every child's learning journey starts with curiosity and connection. Whether you're a parent looking for more information, interested in a play session, or want to book a birthday party — we're here to help."
        img='/assets/zone-lego.webp'
      />
      <section className='contact reveal'>
        <div>
          <h2>Come say hello</h2>
          <p><FaMapMarkerAlt /> 2nd Floor, Plaza No. 42, Alpha Marina, Marina Commercial, Corniche Road, Bahria Town Phase 4, Islamabad</p>
          <p><FaClock /> Open daily: 11:00 AM – 11:00 PM (7 Days a Week)</p>
          <a href='tel:+923265652798'><FaPhone /> +92 326 5652798</a>
          <a href='mailto:little.explorer904@gmail.com'>little.explorer904@gmail.com</a>
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
          <label>Email<input type='email' placeholder='your@email.com' /></label>
          <label>Phone Number<input required placeholder='03XX XXXXXXX' /></label>
          <label>Child&apos;s Age<input placeholder='e.g. 3 years' /></label>
          <label>Subject<input placeholder='How can we help?' /></label>
          <label>Message<textarea rows='4' placeholder='Tell us more...' /></label>
          <button className='btn pink'>Send Message <FaArrowRight /></button>
          {success && <p className='success'>Thank you! We'll get back to you shortly.</p>}
        </form>
      </section>

      {/* FAQs */}
      <section className='bp-faq reveal' style={{ marginBottom: '60px' }}>
        <span className='eyebrow' style={{ display: 'block', textAlign: 'center' }}>Got questions?</span>
        <h2 style={{ textAlign: 'center', fontSize: '34px', margin: '8px 0 32px', fontWeight: 500 }}>
          Frequently Asked <i style={{ color: 'var(--pink)', fontStyle: 'normal' }}>Questions</i>
        </h2>
        <div className='bp-faq-list'>
          {faqs.map(([q, a], i) => (
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

const bpPhotos = [
  '/assets/zone-slides.webp', '/assets/zone-ball-pit.webp', '/assets/zone-pretend-play.webp',
  '/assets/zone-lego.webp', '/assets/zone-kinetic-sand.webp', '/assets/zone-climbing.webp',
];

function BpGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const open  = useCallback(i => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const prev  = useCallback(() => setLightboxIndex(i => (i - 1 + bpPhotos.length) % bpPhotos.length), []);
  const next  = useCallback(() => setLightboxIndex(i => (i + 1) % bpPhotos.length), []);
  return (
    <section className='bp-gallery reveal'>
      <span className='eyebrow'>Real parties, real smiles</span>
      <h2>Party <i>Moments</i></h2>
      <div className='bp-gallery-grid'>
        {bpPhotos.map((p, i) => (
          <div className='gallery-item' key={i} onClick={() => open(i)}>
            <img src={p} alt={`Birthday party at Little Explorers World ${i + 1}`} loading='lazy' />
            <div className='gallery-overlay'><span>View Photo</span></div>
          </div>
        ))}
      </div>
      {lightboxIndex !== null && (
        <Lightbox images={bpPhotos} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
}

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
          <img src='/assets/zone-pretend-play.webp' alt='Birthday party at Little Explorers World Islamabad' loading='eager' />
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
            [FaWhatsapp, '01', 'Message Us', 'Send us a WhatsApp message with your preferred date and number of kids.', 'green'],
            [FaCalendarAlt, '02', 'Confirm & Plan', "We'll confirm availability and help you choose the perfect package and theme.", 'purple'],
            [GiPartyPopper, '03', 'Celebrate!', 'Show up and enjoy — we handle everything else for an unforgettable party!', 'pink'],
          ].map(([Icon, num, title, text, color]) => (
            <div className={`bp-step bps-${color}`} key={num}>
              <div className='bp-step-num'>{num}</div>
              <div className='bp-step-circle'><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <a className='btn pink' href={waParty}><FaWhatsapp /> Start Booking on WhatsApp</a>
      </section>

      {/* Gallery */}
      <BpGallery />

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
          img='/assets/zone-climbing.webp'
        />
        <Gallery />
      </>
    ),
    '/partner-with-us': Partner,
    '/contact-us': Contact,
  };

  const Page = routes[path] || Home;

  const pageBg = {
    '/': 'bg-yellow',
    '/about-us': 'bg-purple',
    '/play-zones': 'bg-green',
    '/birthday-parties': 'bg-pink',
    '/gallery': 'bg-yellow',
    '/partner-with-us': 'bg-purple',
    '/contact-us': 'bg-green',
  };

  return (
    <>
      <TopBar />
      <Header path={path} />
      <main className={pageBg[path] || ''}><Page /></main>
      <Footer />
      <a className='float' href={WA} aria-label='Chat on WhatsApp'><FaWhatsapp /></a>
      <BackToTop />
    </>
  );
}
