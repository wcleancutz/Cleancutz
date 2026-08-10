import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import logoImage from '@assets/IMG_3795_1786331974659.png';
import {
  ArrowDown,
  ArrowRight,
  Check,
  Clock3,
  Copy,
  ExternalLink,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scissors,
  ShieldCheck,
  Star,
  UserRound,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const phone = '(843) 680-0814';
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=CleanCutz+Barbering+LLC+208+N+Maple+St+Pageland+SC+29728';
  const bookingUrl = 'https://search.thecut.co/barbers/Walt-Gifted-Hands';

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
  return (
    <div className="site-shell grain bg-background text-foreground">
      <header className="relative z-20 border-b border-border/80 bg-background/95 backdrop-blur-sm">
        <div className="container-wide flex h-[74px] items-center justify-between">
          <a href="#top" className="flex items-center gap-3" data-testid="link-home">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-sm border border-accent/40 bg-primary">
              <img src={logoImage} alt="" className="h-full w-full object-contain" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[19px] font-bold tracking-[-.03em]">CleanCutz</span>
              <span className="eyebrow mt-1 block text-muted-foreground">Barbering LLC · Pageland</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            <a href="#services" className="eyebrow text-foreground/70 transition-colors hover:text-accent" data-testid="link-services">Services</a>
            <a href="#story" className="eyebrow text-foreground/70 transition-colors hover:text-accent" data-testid="link-story">The shop</a>
            <a href="#reviews" className="eyebrow text-foreground/70 transition-colors hover:text-accent" data-testid="link-reviews">Reviews</a>
            <a href="#visit" className="eyebrow text-foreground/70 transition-colors hover:text-accent" data-testid="link-visit">Find us</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="tel:+18436800814" className="hidden items-center gap-2 rounded-sm border border-border px-4 py-2.5 text-xs font-bold uppercase tracking-[.1em] transition-colors hover:border-accent hover:text-accent sm:flex" data-testid="link-header-call">
              <Phone size={14} /> Call the shop
            </a>
            <button type="button" className="flex h-10 w-10 items-center justify-center border border-border md:hidden" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
              {mobileMenu ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <nav className="border-t border-border bg-background px-4 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="container-wide grid gap-1">
              {['services', 'story', 'reviews', 'visit'].map((item) => (
                <a key={item} href={`#${item}`} className="border-b border-border/60 py-3 text-sm font-bold capitalize" onClick={() => setMobileMenu(false)} data-testid={`link-mobile-${item}`}>{item === 'story' ? 'The shop' : item === 'visit' ? 'Find us' : item}</a>
              ))}
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
                <span className="eyebrow font-medium">A neighborhood original</span>
              </div>
              <h1 className="display-title rise rise-delay-1 mt-7 max-w-[590px] text-[clamp(4.6rem,11vw,9.3rem)]">
                Come in<br /><em className="text-accent">sharp.</em>
              </h1>
              <p className="rise rise-delay-2 mt-8 max-w-[420px] text-[15px] leading-7 text-muted-foreground">
                A clean cut, a good conversation, and a chair that feels like yours. CleanCutz is Pageland’s local spot for looking put together without making a production of it.
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
              <div className="image-frame hero-image relative aspect-square overflow-hidden rounded-sm border-[10px] border-background bg-primary">
                <img src={logoImage} alt="CleanCutz Barbering LLC logo with a barber pole, chair, and gold lettering" className="h-full w-full object-contain" data-testid="img-logo-hero" />
              </div>
              <div className="absolute -bottom-4 -right-4 hidden bg-primary px-5 py-4 text-background sm:block">
                <p className="eyebrow text-background/60">Open Tuesday</p>
                <p className="mt-1 text-sm font-bold">10 AM · Call to confirm</p>
              </div>
            </div>
          </div>
          <a href="#services" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-muted-foreground transition-colors hover:text-accent lg:flex" data-testid="link-scroll-services">
            <span className="eyebrow">Scroll the shop</span><ArrowDown size={14} />
          </a>
        </section>

        <div className="overflow-hidden border-b border-border bg-primary py-3 text-background">
          <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
            {[1, 2].map((group) => <div key={group} className="flex items-center gap-8">
              <span className="eyebrow">Clean lines</span><span className="text-accent" aria-hidden="true">•</span>
              <span className="eyebrow">Fresh fades</span><span className="text-accent" aria-hidden="true">•</span>
              <span className="eyebrow">Small town, big care</span><span className="text-accent" aria-hidden="true">•</span>
              <span className="eyebrow">Walk out ready</span><span className="text-accent" aria-hidden="true">•</span>
            </div>)}
          </div>
        </div>

        <section id="services" className="container-wide py-24 md:py-32">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="eyebrow text-accent">01 / What we do</p>
              <h2 className="display-title mt-5 max-w-[330px] text-5xl md:text-6xl">The usual.<br /><em>Done right.</em></h2>
              <p className="mt-7 max-w-[300px] text-sm leading-6 text-muted-foreground">No mystery menu. Just the essentials, handled with a steady hand and an eye for the details.</p>
              <a href={bookingUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-accent pb-2 text-xs font-extrabold uppercase tracking-[.12em] text-accent transition-colors hover:text-primary" data-testid="link-book-services">Book your appointment <ArrowRight size={15} /></a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['01', 'Haircut', 'The clean-up, the shape, the finish. Tell us what you like and we’ll take it from there.', Scissors],
                ['02', 'Shampoo', 'A proper reset before or after your cut. Warm water, clean start.', ShieldCheck],
                ['03', 'Shaving', 'Classic close work for a crisp neckline, cheek line, or a full refresh.', Star],
                ['04', 'Eyebrow arching', 'A quick detail that brings the whole look into focus.', UserRound],
              ].map(([number, title, copy, Icon]) => (
                <article key={title as string} className="service-card group relative min-h-[210px] border border-border bg-card p-6 hover:bg-primary hover:text-background">
                  <div className="flex items-start justify-between">
                    <span className="font-mono-ui text-[11px] text-accent">{number as string}</span>
                    <Icon size={19} strokeWidth={1.5} className="text-accent transition-transform group-hover:rotate-12" />
                  </div>
                  <div className="mt-16">
                    <h3 className="font-display text-2xl font-bold">{title as string}</h3>
                    <p className="mt-2 max-w-[270px] text-xs leading-5 text-muted-foreground group-hover:text-background/70">{copy as string}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="story" className="bg-secondary/60">
          <div className="container-wide grid items-center gap-14 py-24 md:py-32 lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -left-6 -top-6 h-20 w-20 border-l border-t border-accent" />
              <div className="shop-poster relative min-h-[350px] overflow-hidden border border-border bg-primary p-8 md:min-h-[460px]">
                <div className="poster-sun absolute -right-16 -top-16 h-64 w-64 rounded-full border border-accent/40" />
                <div className="poster-sun absolute -right-5 -top-5 h-44 w-44 rounded-full border border-accent/30" />
                <div className="relative z-10 flex h-full min-h-[294px] flex-col justify-between md:min-h-[404px]">
                  <div className="flex items-start justify-between text-background">
                    <p className="eyebrow text-background/60">Inside the shop</p>
                    <Scissors size={20} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-mono-ui text-[clamp(4rem,10vw,7rem)] font-bold leading-[.8] tracking-[-.1em] text-accent">CUT</p>
                    <p className="font-mono-ui text-[clamp(4rem,10vw,7rem)] font-bold leading-[.8] tracking-[-.1em] text-background">CLEAN</p>
                    <p className="font-mono-ui text-[clamp(4rem,10vw,7rem)] font-bold leading-[.8] tracking-[-.1em] text-background/30">READY</p>
                  </div>
                  <div className="flex items-end justify-between gap-4 border-t border-background/20 pt-4 text-background">
                    <p className="max-w-[190px] text-xs leading-5 text-background/65">Relaxed chairs. Serious detail. A neighborhood place to leave feeling ready.</p>
                    <span className="font-mono-ui text-[10px] uppercase tracking-[.15em] text-accent">Pageland, SC</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="eyebrow text-accent">02 / The place</p>
              <h2 className="display-title mt-5 text-5xl md:text-7xl">Good cuts<br /><em>live here.</em></h2>
              <p className="mt-8 max-w-[430px] text-[15px] leading-7 text-muted-foreground">There’s a certain rhythm to a neighborhood barbershop: the door opens, somebody gets cleaned up, stories get traded, and everyone leaves a little more ready for the day.</p>
              <div className="mt-9 grid max-w-[430px] grid-cols-2 border-y border-border py-5">
                <div><p className="font-display text-3xl font-bold">4.8</p><p className="eyebrow mt-1 text-muted-foreground">Local rating</p></div>
                <div className="border-l border-border pl-5"><p className="font-display text-3xl font-bold">45</p><p className="eyebrow mt-1 text-muted-foreground">Reviews counted</p></div>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 border border-border bg-background/60 px-3 py-2 text-xs font-bold"><Check size={14} className="text-accent" /> Good for kids</span>
                <span className="inline-flex items-center gap-2 border border-border bg-background/60 px-3 py-2 text-xs font-bold"><Check size={14} className="text-accent" /> Restroom</span>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="container-wide py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="eyebrow text-accent">03 / Word on the street</p><h2 className="display-title mt-5 text-5xl md:text-6xl">People leave<br /><em>looking good.</em></h2></div>
            <a href="https://www.google.com/search?q=CleanCutz+Barbering+LLC+Pageland+reviews" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-b border-foreground pb-2 text-xs font-extrabold uppercase tracking-[.1em] transition-colors hover:border-accent hover:text-accent" data-testid="link-google-reviews">Read all 45 reviews <ExternalLink size={14} /></a>
          </div>
          <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.2fr_1fr]">
            {[
              ['“', 'The kind of place you’re glad you found. Easygoing, clean, and the cut came out exactly right.', 'A local regular'],
              ['“', 'Great neighborhood shop with a welcoming feel. They took their time and paid attention to the small stuff.', 'Pageland neighbor'],
              ['“', 'Walked in needing a refresh and left feeling like I had my day back. Will definitely be calling again.', 'First-time visitor'],
            ].map(([quote, copy, author], index) => (
              <figure key={author} className={`border border-border p-7 ${index === 1 ? 'bg-primary text-background lg:-translate-y-4' : 'bg-card'}`}>
                <div className="flex items-center gap-1 text-accent">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill="currentColor" strokeWidth={1} />)}</div>
                <blockquote className="mt-8 font-display text-[22px] leading-[1.2]">{quote as string}{copy as string}</blockquote>
                <figcaption className={`mt-8 text-xs font-bold uppercase tracking-[.1em] ${index === 1 ? 'text-background/60' : 'text-muted-foreground'}`}>{author as string}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="visit" className="bg-primary text-background">
          <div className="container-wide grid gap-12 py-24 md:py-32 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="eyebrow text-accent">04 / Come through</p>
              <h2 className="display-title mt-5 text-5xl md:text-7xl">Find the<br /><em className="text-accent">red chair.</em></h2>
              <p className="mt-7 max-w-[350px] text-sm leading-6 text-background/65">Right in the neighborhood at 208 N Maple St. Give us a call before you head over so we can make sure a chair is ready.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3.5 text-xs font-extrabold uppercase tracking-[.1em] text-accent-foreground transition-transform hover:-translate-y-0.5" data-testid="link-get-directions"><MapPin size={15} /> Get directions</a>
                <button type="button" onClick={copyPhone} className="inline-flex items-center gap-2 rounded-sm border border-background/30 px-5 py-3.5 text-xs font-extrabold uppercase tracking-[.1em] transition-colors hover:border-accent hover:text-accent" data-testid="button-copy-phone"><Copy size={14} /> {copied ? 'Number copied' : 'Copy number'}</button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="border border-background/20 p-6">
                <Clock3 size={21} className="text-accent" />
                <p className="eyebrow mt-10 text-background/50">Hours</p>
                <p className="mt-3 font-display text-2xl">Opens 10 AM Tuesday</p>
                <p className="mt-3 text-xs leading-5 text-background/60">The listing currently confirms Tuesday at 10 AM. Call ahead for the latest schedule.</p>
                <a href="tel:+18436800814" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-accent" data-testid="link-hours-call"><Phone size={14} /> Call to confirm</a>
              </div>
              <div className="border border-background/20 p-6">
                <MapPin size={21} className="text-accent" />
                <p className="eyebrow mt-10 text-background/50">Address</p>
                <p className="mt-3 font-display text-2xl">208 N Maple St</p>
                <p className="mt-2 text-sm text-background/65">Pageland, SC 29728</p>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-accent" data-testid="link-address-map">Open in maps <ExternalLink size={13} /></a>
              </div>
              <div className="border border-background/20 p-6 sm:col-span-2">
                <Phone size={21} className="text-accent" />
                <p className="eyebrow mt-10 text-background/50">Call the shop</p>
                <a href="tel:+18436800814" className="mt-3 block font-mono-ui text-2xl tracking-tight transition-colors hover:text-accent" data-testid="link-phone-location">{phone}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-accent text-accent-foreground">
          <div className="container-wide flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
            <div><p className="eyebrow opacity-70">Ready when you are</p><h2 className="mt-2 font-display text-4xl font-bold md:text-5xl">Let’s get you in the chair.</h2></div>
            <a href={bookingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-sm bg-primary px-6 py-4 text-xs font-extrabold uppercase tracking-[.12em] text-background transition-transform hover:-translate-y-0.5" data-testid="link-book-bottom">Book an appointment <ArrowRight size={15} /></a>
          </div>
        </section>
      </main>

      <footer className="container-wide flex flex-col gap-7 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-sm border border-accent/40 bg-primary"><img src={logoImage} alt="" className="h-full w-full object-contain" /></span><span className="font-display text-xl font-bold">CleanCutz</span></div>
          <p className="mt-3 text-xs text-muted-foreground">CleanCutz Barbering LLC · Pageland, South Carolina</p>
        </div>
        <div className="flex items-center gap-5">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="CleanCutz on Instagram" className="text-muted-foreground transition-colors hover:text-accent" data-testid="link-instagram"><Instagram size={17} /></a>
          <a href="https://m.me/" target="_blank" rel="noreferrer" aria-label="Message CleanCutz" className="text-muted-foreground transition-colors hover:text-accent" data-testid="link-message"><MessageCircle size={17} /></a>
          <span className="eyebrow text-muted-foreground">Made for the neighborhood</span>
        </div>
      </footer>

    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
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
