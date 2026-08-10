import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import logo from '@assets/logo-cleancutz.png';
import poolTable from '@assets/shop/pool-table.jpg';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Copy,
  ExternalLink,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const galleryModules = import.meta.glob('@assets/gallery/cut-*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const galleryImages = Object.entries(galleryModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

const services = [
  {
    name: 'VIP Cutz',
    price: '$41',
    duration: '30 min',
    description: 'Hair cut, sponge curls, enhancement, razor line and chalk line.',
  },
  {
    name: 'Hair Cut',
    price: '$31',
    duration: '25 min',
    description: 'Hair cut and beard trim.',
  },
  {
    name: 'Weekend Booking',
    price: '$36',
    duration: '25 min',
    description: 'Friday & Saturday only. Limited spots for regular hair cutz and beard trim. VIP treatments are additional.',
  },
  {
    name: 'Senior Citizen (60 & Up)',
    price: '$26',
    duration: '25 min',
    description: 'Regular cut pricing for clients 60 and up.',
  },
  {
    name: 'Kids Cutz (12 & Under)',
    price: '$26',
    duration: '25 min',
    description: 'Designs and enhancement additional charge.',
  },
  {
    name: 'VIP Special',
    price: '$52',
    duration: '30 min',
    description: 'Hot towel and facial treatment with steam application. Appointments only.',
  },
  {
    name: 'Women Cutz',
    price: '$31',
    duration: '25 min',
    description: 'Women cutz with design additional charge.',
  },
  {
    name: 'Line Up',
    price: '$21',
    duration: '15 min',
    description: 'Line up includes head and beard.',
  },
];

const hours = [
  { day: 'Sunday', time: 'Closed', closed: true },
  { day: 'Monday', time: 'Closed', closed: true },
  { day: 'Tuesday', time: '10:00 AM – 5:00 PM', closed: false },
  { day: 'Wednesday', time: '9:00 AM – 5:00 PM', closed: false },
  { day: 'Thursday', time: '9:00 AM – 6:00 PM', closed: false },
  { day: 'Friday', time: '8:00 AM – 6:00 PM', closed: false },
  { day: 'Saturday', time: '8:00 AM – 3:00 PM', closed: false },
];

const TRUSTMARY_SCRIPT = 'https://widget.trustmary.com/DhtFSMbZn';

function TrustmaryReviews() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.src = TRUSTMARY_SCRIPT;
    script.async = true;
    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, []);

  return <div ref={containerRef} className="mt-14" data-testid="trustmary-reviews" />;
}

function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const phone = '(843) 680-0814';
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=CleanCutz+Barbering+LLC+208+N+Maple+St+Pageland+SC+29728';
  const bookingUrl = 'https://app.thecut.co/barbers/Walt-Gifted-Hands';
  const facebookUrl = 'https://www.facebook.com/p/CleanCutz-Barbering-LLC-100063871770587/';
  const navItems = useMemo(
    () => [
      { id: 'services', label: 'Services' },
      { id: 'gallery', label: 'Gallery' },
      { id: 'story', label: 'The shop' },
      { id: 'reviews', label: 'Reviews' },
      { id: 'visit', label: 'Find us' },
    ],
    [],
  );

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowRight') {
        setLightboxIndex((current) =>
          current === null ? current : (current + 1) % galleryImages.length,
        );
      }
      if (event.key === 'ArrowLeft') {
        setLightboxIndex((current) =>
          current === null
            ? current
            : (current - 1 + galleryImages.length) % galleryImages.length,
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex]);

  return (
    <div className="site-shell grain bg-background text-foreground">
      <header className="relative z-20 border-b border-border/80 bg-background/95 backdrop-blur-sm">
        <div className="container-wide flex h-[88px] items-center justify-between">
          <a href="#top" className="flex items-center gap-3" data-testid="link-home">
            <img
              src={logo}
              alt="CleanCutz Barbering"
              className="h-12 w-auto object-contain sm:h-14"
            />
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="eyebrow text-foreground/70 transition-colors hover:text-accent"
                data-testid={`link-${item.id}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-sm bg-accent px-4 py-2.5 text-xs font-bold uppercase tracking-[.1em] text-accent-foreground transition-transform hover:-translate-y-0.5 sm:flex"
              data-testid="link-header-book"
            >
              Book now
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center border border-border lg:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
              aria-label={mobileMenu ? 'Close menu' : 'Open menu'}
              data-testid="button-mobile-menu"
            >
              {mobileMenu ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <nav className="border-t border-border bg-background px-4 py-4 lg:hidden" aria-label="Mobile navigation">
            <div className="container-wide grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="border-b border-border/60 py-3 text-sm font-bold"
                  onClick={() => setMobileMenu(false)}
                  data-testid={`link-mobile-${item.id}`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-4 py-3 text-xs font-extrabold uppercase tracking-[.12em] text-accent-foreground"
                onClick={() => setMobileMenu(false)}
                data-testid="link-mobile-book"
              >
                Book an appointment
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-grid relative border-b border-border/70">
          <div className="container-wide grid min-h-[690px] items-center gap-12 py-16 lg:grid-cols-[.95fr_1.05fr] lg:gap-20 lg:py-20">
            <div className="relative z-10">
              <div className="rise flex items-center gap-3 text-accent">
                <span className="h-px w-10 bg-accent" />
                <span className="eyebrow font-medium tracking-[.2em]">CleanCutz Barbering · Pageland</span>
              </div>
              <p className="rise rise-delay-1 mt-6 font-display text-[clamp(1.75rem,4vw,2.35rem)] font-bold tracking-[-.02em] text-accent">
                CleanCutz Barbering
              </p>
              <h1 className="display-title rise rise-delay-1 mt-3 max-w-[590px] text-[clamp(3.4rem,9vw,7.2rem)]">
                Come in<br /><em className="text-accent">sharp.</em>
              </h1>
              <p className="rise rise-delay-2 mt-8 max-w-[420px] text-[15px] leading-7 text-muted-foreground">
                A clean cut, a good conversation, and a shop with a pool table while you wait. CleanCutz Barbering is Pageland’s spot for looking put together without making a production of it.
              </p>
              <div className="rise rise-delay-3 mt-9 flex flex-wrap gap-3">
                <a href={bookingUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 rounded-sm bg-accent px-5 py-3.5 text-xs font-extrabold uppercase tracking-[.12em] text-accent-foreground shadow-[5px_5px_0_hsl(var(--primary))] transition-transform hover:-translate-y-0.5 active:translate-y-0" data-testid="link-book-hero">
                  Book an appointment <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a href="tel:+18436800814" className="inline-flex items-center gap-2 rounded-sm border border-primary/25 bg-background/60 px-5 py-3.5 text-xs font-extrabold uppercase tracking-[.12em] transition-colors hover:border-accent hover:text-accent" data-testid="link-call-hero">
                  <Phone size={15} /> {phone}
                </a>
              </div>
              <div className="mt-12 flex items-center gap-5 border-t border-border/80 pt-5">
                <div className="flex items-center gap-1 text-accent" aria-label="4.8 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill="currentColor" strokeWidth={1} />)}
                </div>
                <span className="text-xs font-bold">4.8 <span className="font-normal text-muted-foreground">from 45 local reviews</span></span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[540px] lg:justify-self-end">
              <div className="absolute -left-5 top-12 hidden h-32 w-2.5 red-stripe sm:block" />
              <div className="image-frame hero-image relative aspect-[3/4] max-h-[620px] overflow-hidden rounded-sm border-[10px] border-border/40 bg-background">
                <img src={logo} alt="CleanCutz Barbering logo with a barber pole, chair, and gold lettering" className="h-full w-full object-contain p-2 sm:p-4" data-testid="img-logo-hero" />
              </div>
              <div className="absolute -bottom-4 -right-4 hidden border border-border bg-card px-5 py-4 text-foreground sm:block">
                <p className="eyebrow text-muted-foreground">Open Tuesday–Saturday</p>
                <p className="mt-1 text-sm font-bold">Pool table while you wait</p>
              </div>
            </div>
          </div>
          <a href="#services" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-muted-foreground transition-colors hover:text-accent lg:flex" data-testid="link-scroll-services">
            <span className="eyebrow">Scroll the shop</span><ArrowDown size={14} />
          </a>
        </section>

        <div className="overflow-hidden border-b border-border bg-card py-3 text-foreground">
          <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
            {[1, 2].map((group) => (
              <div key={group} className="flex items-center gap-8">
                <span className="eyebrow">Clean lines</span><span className="text-accent" aria-hidden="true">•</span>
                <span className="eyebrow">Fresh fades</span><span className="text-accent" aria-hidden="true">•</span>
                <span className="eyebrow">Pool table in the shop</span><span className="text-accent" aria-hidden="true">•</span>
                <span className="eyebrow">Walk out ready</span><span className="text-accent" aria-hidden="true">•</span>
              </div>
            ))}
          </div>
        </div>

        <section id="services" className="container-wide py-24 md:py-32">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="eyebrow text-accent">01 / What we do</p>
              <h2 className="display-title mt-5 max-w-[330px] text-5xl md:text-6xl">The usual.<br /><em>Done right.</em></h2>
              <p className="mt-7 max-w-[300px] text-sm leading-6 text-muted-foreground">Straight prices, clear times. Book the cut that fits — from a quick line up to the full VIP treatment.</p>
              <a href={bookingUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-accent pb-2 text-xs font-extrabold uppercase tracking-[.12em] text-accent transition-colors hover:text-foreground" data-testid="link-book-services">Book your appointment <ArrowRight size={15} /></a>
            </div>
            <div className="grid gap-3">
              {services.map((service) => (
                <article
                  key={service.name}
                  className="service-card group flex flex-col gap-3 border border-border bg-card p-5 transition-colors hover:border-accent sm:flex-row sm:items-start sm:justify-between sm:gap-8"
                  data-testid={`service-${service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl font-bold sm:text-2xl">{service.name}</h3>
                    <p className="mt-1.5 max-w-[420px] text-xs leading-5 text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
                    <span className="font-display text-2xl font-bold text-accent">{service.price}</span>
                    <span className="font-mono-ui text-[11px] uppercase tracking-[.12em] text-muted-foreground">{service.duration}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="border-y border-border bg-secondary/40">
          <div className="container-wide py-24 md:py-32">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="eyebrow text-accent">02 / Our work</p>
                <h2 className="display-title mt-5 text-5xl md:text-6xl">Cuts that<br /><em>speak.</em></h2>
              </div>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border-b border-foreground pb-2 text-xs font-extrabold uppercase tracking-[.1em] transition-colors hover:border-accent hover:text-accent"
                data-testid="link-book-gallery"
              >
                Book on theCut <ExternalLink size={14} />
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {galleryImages.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  className="group relative aspect-square overflow-hidden border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  onClick={() => setLightboxIndex(index)}
                  data-testid={`button-gallery-${index + 1}`}
                  aria-label={`Open gallery photo ${index + 1}`}
                >
                  <img
                    src={src}
                    alt={`CleanCutz Barbering haircut ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-primary/0 transition-colors group-hover:bg-primary/20" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="story" className="bg-background">
          <div className="container-wide grid items-center gap-14 py-24 md:py-32 lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -left-6 -top-6 h-20 w-20 border-l border-t border-accent" />
              <div className="image-frame relative overflow-hidden border border-border bg-card">
                <img
                  src={poolTable}
                  alt="CleanCutz Barbering waiting area with a blue pool table, chairs, and TVs"
                  className="aspect-[4/3] w-full object-cover"
                  data-testid="img-pool-table"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-xs font-bold">
                  <Check size={14} className="text-accent" /> Pool table
                </span>
                <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-xs font-bold">
                  <Check size={14} className="text-accent" /> Plenty of seats
                </span>
                <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-xs font-bold">
                  <Check size={14} className="text-accent" /> TVs while you wait
                </span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="eyebrow text-accent">03 / The place</p>
              <h2 className="display-title mt-5 text-5xl md:text-7xl">More than<br /><em>a chair.</em></h2>
              <p className="mt-8 max-w-[430px] text-[15px] leading-7 text-muted-foreground">
                Walk in, shoot a game on the pool table, catch the TV, and settle into a neighborhood shop that feels like yours. Serious detail in the chair — easy vibe everywhere else.
              </p>
              <div className="mt-9 grid max-w-[430px] grid-cols-2 border-y border-border py-5">
                <div>
                  <p className="font-display text-3xl font-bold">4.8</p>
                  <p className="eyebrow mt-1 text-muted-foreground">Local rating</p>
                </div>
                <div className="border-l border-border pl-5">
                  <p className="font-display text-3xl font-bold">45</p>
                  <p className="eyebrow mt-1 text-muted-foreground">Reviews counted</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-xs font-bold">
                  <Check size={14} className="text-accent" /> Good for kids
                </span>
                <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-xs font-bold">
                  <Check size={14} className="text-accent" /> Restroom
                </span>
                <span className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-xs font-bold">
                  <Star size={14} className="text-accent" /> Walt Gifted Hands
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="container-wide py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow text-accent">04 / Word on the street</p>
              <h2 className="display-title mt-5 text-5xl md:text-6xl">People leave<br /><em>looking good.</em></h2>
            </div>
            <a href="https://www.google.com/search?q=CleanCutz+Barbering+LLC+Pageland+reviews" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-b border-foreground pb-2 text-xs font-extrabold uppercase tracking-[.1em] transition-colors hover:border-accent hover:text-accent" data-testid="link-google-reviews">Read all Google reviews <ExternalLink size={14} /></a>
          </div>
          <TrustmaryReviews />
        </section>

        <section id="visit" className="border-y border-border bg-card text-foreground">
          <div className="container-wide grid gap-12 py-24 md:py-32 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="eyebrow text-accent">05 / Come through</p>
              <h2 className="display-title mt-5 text-5xl md:text-7xl">Find the<br /><em className="text-accent">shop.</em></h2>
              <p className="mt-7 max-w-[350px] text-sm leading-6 text-muted-foreground">
                208 N Maple St, Pageland. Book online through theCut, or call if you want to check the chair first.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3.5 text-xs font-extrabold uppercase tracking-[.1em] text-accent-foreground transition-transform hover:-translate-y-0.5" data-testid="link-get-directions"><MapPin size={15} /> Get directions</a>
                <button type="button" onClick={copyPhone} className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3.5 text-xs font-extrabold uppercase tracking-[.1em] transition-colors hover:border-accent hover:text-accent" data-testid="button-copy-phone"><Copy size={14} /> {copied ? 'Number copied' : 'Copy number'}</button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="border border-border bg-background p-6 sm:col-span-2">
                <Clock3 size={21} className="text-accent" />
                <p className="eyebrow mt-8 text-muted-foreground">Hours</p>
                <div className="mt-5 grid gap-2">
                  {hours.map((row) => (
                    <div key={row.day} className="flex items-center justify-between gap-4 border-b border-border/60 py-2 text-sm last:border-b-0">
                      <span className="font-bold">{row.day}</span>
                      <span className={row.closed ? 'text-pole font-bold' : 'text-muted-foreground'}>{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-border bg-background p-6">
                <MapPin size={21} className="text-accent" />
                <p className="eyebrow mt-10 text-muted-foreground">Address</p>
                <p className="mt-3 font-display text-2xl">208 N Maple St</p>
                <p className="mt-2 text-sm text-muted-foreground">Pageland, SC 29728</p>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-accent" data-testid="link-address-map">Open in maps <ExternalLink size={13} /></a>
              </div>
              <div className="border border-border bg-background p-6">
                <Phone size={21} className="text-accent" />
                <p className="eyebrow mt-10 text-muted-foreground">Call the shop</p>
                <a href="tel:+18436800814" className="mt-3 block font-mono-ui text-2xl tracking-tight transition-colors hover:text-accent" data-testid="link-phone-location">{phone}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="container-wide flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
            <div>
              <p className="eyebrow text-accent">Also on theCut</p>
              <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Book through the app you already know.</h2>
            </div>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-sm border border-accent px-6 py-4 text-xs font-extrabold uppercase tracking-[.12em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
              data-testid="link-thecut-bridge"
            >
              Book on theCut <ArrowRight size={15} />
            </a>
          </div>
        </section>

        <section className="border-b border-border bg-accent text-accent-foreground">
          <div className="container-wide flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
            <div>
              <p className="eyebrow opacity-70">Ready when you are</p>
              <h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Let’s get you in the chair.</h2>
            </div>
            <a href={bookingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-sm bg-background px-6 py-4 text-xs font-extrabold uppercase tracking-[.12em] text-foreground transition-transform hover:-translate-y-0.5" data-testid="link-book-bottom">Book an appointment <ArrowRight size={15} /></a>
          </div>
        </section>
      </main>

      <footer className="container-wide flex flex-col gap-7 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="CleanCutz Barbering" className="h-14 w-auto object-contain" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">CleanCutz Barbering · Pageland, South Carolina</p>
        </div>
        <div className="flex items-center gap-5">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="CleanCutz Barbering on Instagram" className="text-muted-foreground transition-colors hover:text-accent" data-testid="link-instagram"><Instagram size={17} /></a>
          <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="CleanCutz Barbering on Facebook" className="text-muted-foreground transition-colors hover:text-accent" data-testid="link-facebook"><Facebook size={17} /></a>
          <span className="eyebrow text-muted-foreground">Made for the neighborhood</span>
        </div>
      </footer>

      {lightboxIndex !== null && (
        <div
          className="modal-backdrop fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-accent hover:text-accent"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close gallery"
            data-testid="button-lightbox-close"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-colors hover:border-accent hover:text-accent md:left-6"
            onClick={(event) => {
              event.stopPropagation();
              setLightboxIndex((current) =>
                current === null
                  ? current
                  : (current - 1 + galleryImages.length) % galleryImages.length,
              );
            }}
            aria-label="Previous photo"
            data-testid="button-lightbox-prev"
          >
            <ArrowLeft size={18} />
          </button>
          <img
            src={galleryImages[lightboxIndex]}
            alt={`CleanCutz Barbering haircut ${lightboxIndex + 1}`}
            className="modal-panel max-h-[85vh] max-w-[min(920px,92vw)] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-colors hover:border-accent hover:text-accent md:right-6"
            onClick={(event) => {
              event.stopPropagation();
              setLightboxIndex((current) =>
                current === null ? current : (current + 1) % galleryImages.length,
              );
            }}
            aria-label="Next photo"
            data-testid="button-lightbox-next"
          >
            <ArrowRight size={18} />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono-ui text-[11px] uppercase tracking-[.16em] text-white/70">
            {lightboxIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
