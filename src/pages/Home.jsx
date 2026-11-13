
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Search,
  MapPin,
  Sprout,
  Truck,
  ShieldCheck,
  Users,
  Package,
  ShoppingBasket,
  Store,
  Handshake,
  ChevronDown,
} from "lucide-react";

import { categories, sellers } from "../data/market";
import { useApp } from "../context/AppContext";
import { ProductCard } from "../components/UI";
import CustomCursor from "../components/CustomCursor";
const agricultureVideo = import.meta.env.VITE_HERO_VIDEO_URL || "https://videos.pexels.com/video-files/6659062/6659062-hd_1920_1080_24fps.mp4";

/* ----------------------------------
   DATA
----------------------------------- */

const harvestProducts = [
  {
    id: 1,
    name: "Kandahar Pomegranates", nameKey: "harvestPomegranate",
    location: "Kandahar, Afghanistan",
    description:
      "Freshly harvested, naturally sweet Afghan pomegranates, known for their rich flavor and vibrant color.",
    image:
      "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&w=1000&q=85",
    tagKey: "harvestFresh", descriptionKey: "harvestPomegranateDesc",
  },
  {
    id: 2,
    name: "Herat Saffron", nameKey: "harvestSaffron",
    location: "Herat, Afghanistan",
    description:
      "Premium-quality saffron carefully harvested from the renowned agricultural fields of Herat.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=85",
    tagKey: "harvestPremium", descriptionKey: "harvestSaffronDesc",
  },
  {
    id: 3,
    name: "Afghan Wheat", nameKey: "harvestWheat",
    location: "Balkh, Afghanistan",
    description:
      "Quality wheat sourced from local agricultural producers and regional farming communities.",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1000&q=85",
    tagKey: "harvestFarmDirect", descriptionKey: "harvestWheatDesc",
  },
];

const steps = [
  {
    number: "01",
    icon: Users,
    titleKey: "stepAccount",
    descriptionKey: "stepAccountDesc",
  },
  {
    number: "02",
    icon: Store,
    titleKey: "stepDiscover",
    descriptionKey: "stepDiscoverDesc",
  },
  {
    number: "03",
    icon: Handshake,
    titleKey: "stepTrade",
    descriptionKey: "stepTradeDesc",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    titleKey: "benefitTrusted",
    descriptionKey: "benefitTrustedDesc",
  },
  {
    icon: Truck,
    titleKey: "benefitAccess",
    descriptionKey: "benefitAccessDesc",
  },
  {
    icon: Sprout,
    titleKey: "benefitFarmers",
    descriptionKey: "benefitFarmersDesc",
  },
];

const regions = [
  {
    name: "Kandahar",
    specialtyKey: "regionKandahar",
    image:
      "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Herat",
    specialtyKey: "regionHerat",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Balkh",
    specialtyKey: "regionBalkh",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Nangarhar",
    specialtyKey: "regionNangarhar",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=85",
  },
];

const faqs = [
  {
    questionKey: "faqWhat",
    answerKey: "faqWhatAnswer",
  },
  {
    questionKey: "faqWho",
    answerKey: "faqWhoAnswer",
  },
  {
    questionKey: "faqAdvertise",
    answerKey: "faqAdvertiseAnswer",
  },
  {
    questionKey: "faqRegions",
    answerKey: "faqRegionsAnswer",
  },
];

/* ----------------------------------
   THEME COLORS
----------------------------------- */

const sectionBg =
  "bg-[#fafbf8] dark:bg-[#202720]";

const alternateBg =
  "bg-[#f0f2eb] dark:bg-[#293229]";

const cardStyle =
  "border border-[#e1e5dc] bg-white dark:border-[#414d40] dark:bg-[#303a30]";

const headingStyle =
  "text-[#202d23] dark:text-[#f5f6ed]";

const paragraphStyle =
  "text-[#59665a] dark:text-[#c5cdbf]";

const accentStyle =
  "text-[#587348] dark:text-[#c3d2a6]";

const primaryButton =
  "bg-[#405d3e] text-white hover:bg-[#304a30] dark:bg-[#c5d2aa] dark:text-[#243024] dark:hover:bg-[#d7e1c2]";

/* ----------------------------------
   SECTION HEADING
----------------------------------- */

function SectionHead({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-9 bg-[#71875f] dark:bg-[#c3d2a6]" />

        <span
          className={`text-[11px] font-bold uppercase tracking-[0.23em] ${accentStyle}`}
        >
          {eyebrow}
        </span>
      </div>

      <h2
        className={`text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[46px] ${headingStyle}`}
      >
        {title}
      </h2>

      {description && (
        <p className={`mt-5 max-w-xl text-[15px] leading-8 ${paragraphStyle}`}>
          {description}
        </p>
      )}
    </div>
  );
}

/* ----------------------------------
   REVEAL ANIMATION
----------------------------------- */

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------
   HERO SECTION
----------------------------------- */

function Hero({ itemCount, sellerCount }) {
  const navigate = useNavigate();
  const { t } = useApp();

  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const search = formData.get("search")?.toString().trim();

    navigate(
      search
        ? `/marketplace?search=${encodeURIComponent(search)}`
        : "/marketplace"
    );
  };

  return (
    <section className="hero-video-hero relative isolate min-h-[720px] h-[88vh] max-h-[950px] overflow-hidden bg-[#303a30]">
      <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=90"
          aria-hidden="true"
          className="hero-background-video absolute inset-0 z-0 h-full w-full object-cover"
        >
          <source src={agricultureVideo} type="video/mp4" />
        </video>

      {/* Video overlays for consistent contrast */}

      <div className="absolute inset-0 z-[1] bg-[#f5f4e9]/5 dark:bg-[#101a13]/12" />

      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#f6f5ed]/48 via-[#f6f5ed]/22 to-[#f6f5ed]/0 dark:from-[#17231a]/24 dark:via-[#17231a]/10 dark:to-[#17231a]/0" />

      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#e8ebdf]/22 via-transparent to-transparent dark:from-[#17231a]/14" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 pb-20 pt-28 sm:px-10 lg:px-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#587348] dark:bg-[#c5d2aa]" />

            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#344c32] dark:text-[#e0e9d3] sm:text-xs">
              {t("heroEyebrow")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="text-5xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#202d23] dark:text-white sm:text-6xl lg:text-[82px]"
          >
            {t("heroTitle")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mt-7 max-w-xl text-base font-medium leading-8 text-[#354a37] dark:text-[#f0f2e9] sm:text-lg"
          >
            {t("heroText")}
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSearch}
            className="mt-10 flex max-w-2xl flex-col gap-2 rounded-2xl border border-white/80 bg-white/95 p-2.5 shadow-[0_18px_50px_rgba(30,40,30,0.16)] backdrop-blur-xl dark:border-[#67745f] dark:bg-[#29362b]/95 sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
              <Search
                className="shrink-0 text-[#587348] dark:text-[#c5d2aa]"
                size={21}
              />

              <input
                name="search"
                type="search"
                placeholder={t("heroSearchPlaceholder")}
                className="w-full min-w-0 bg-transparent py-3 text-sm font-medium text-[#253326] outline-none placeholder:text-[#788276] dark:text-white dark:placeholder:text-[#bdc8b7]"
              />
            </div>

            <button
              type="submit"
              className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold transition duration-300 ${primaryButton}`}
            >
              {t("exploreButton")}
              <ArrowRight size={17} />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-semibold text-[#344735] dark:text-[#f0f2e9]"
          >
            <div className="flex items-center gap-2">
              <MapPin size={16} className={accentStyle} />
              {t("acrossAfghanistan")}
            </div>

            <div className="flex items-center gap-2">
              <Package size={16} className={accentStyle} />
              {itemCount} {t("productListings")}
            </div>

            <div className="flex items-center gap-2">
              <Users size={16} className={accentStyle} />
              {sellerCount} {t("suppliers")}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero bottom strip */}

      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/50 bg-white/45 backdrop-blur-md dark:border-white/15 dark:bg-[#17231a]/55">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 sm:px-10 lg:px-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#344735] dark:text-white sm:text-xs">
            {t("homeHeroStrip")}
          </span>

          <span className="text-[10px] font-bold tracking-[0.18em] text-[#344735] dark:text-white sm:text-xs">
            {t("homeHeroAudience")}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------
   HARVEST CAROUSEL
----------------------------------- */

function HarvestCarousel() {
  const [active, setActive] = useState(0);

  const next = () =>
    setActive((current) => (current + 1) % harvestProducts.length);

  const previous = () =>
    setActive(
      (current) =>
        (current - 1 + harvestProducts.length) % harvestProducts.length
    );

  const product = harvestProducts[active];
  const { t } = useApp();

  return (
    <section
      className={`overflow-hidden py-24 transition-colors duration-300 ${alternateBg}`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow={t("homeSeasonEyebrow")}
              title={t("homeSeasonTitle")}
              description={t("homeSeasonDesc")}
            />

            <div className="flex gap-3">
              <button
                onClick={previous}
                aria-label={t("homePreviousHarvest")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#cbd2c4] text-[#40543c] transition hover:bg-[#40543c] hover:text-white dark:border-[#596a54] dark:text-[#e3ead9] dark:hover:bg-[#c5d2aa] dark:hover:text-[#263326]"
              >
                <ChevronLeft size={21} />
              </button>

              <button
                onClick={next}
                aria-label={t("homeNextHarvest")}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#cbd2c4] text-[#40543c] transition hover:bg-[#40543c] hover:text-white dark:border-[#596a54] dark:text-[#e3ead9] dark:hover:bg-[#c5d2aa] dark:hover:text-[#263326]"
              >
                <ChevronRight size={21} />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative mx-auto flex h-[430px] w-full max-w-[520px] items-center justify-center">
            {harvestProducts.map((item, index) => {
              const offset =
                (index - active + harvestProducts.length) %
                harvestProducts.length;

              const position =
                offset === 0 ? 0 : offset === 1 ? 1 : -1;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActive(index)}
                  animate={{
                    x: position * 135,
                    scale: position === 0 ? 1 : 0.78,
                    opacity: position === 0 ? 1 : 0.4,
                    rotate: position * 6,
                    zIndex: position === 0 ? 3 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 22,
                  }}
                  className="absolute h-[360px] w-[250px] overflow-hidden rounded-[25px] text-left shadow-2xl sm:h-[390px] sm:w-[285px]"
                >
                  <img
                    src={item.image}
                    alt={t(item.nameKey)}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    {t(item.tagKey)}
                  </div>

                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-2xl font-semibold">{t(item.nameKey)}</h3>
                    <p className="mt-2 text-xs font-medium text-white/85">
                      {item.location}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <span className={`text-sm font-bold ${accentStyle}`}>
                  0{active + 1} / 0{harvestProducts.length}
                </span>

                <h3
                  className={`mt-5 text-4xl font-semibold leading-tight sm:text-5xl ${headingStyle}`}
                >
                  {t(product.nameKey)}
                </h3>

                <p className={`mt-4 flex items-center gap-2 text-sm font-medium ${paragraphStyle}`}>
                  <MapPin size={16} />
                  {product.location.replace("Afghanistan", t("marketAfghanistan"))}
                </p>

                <p className={`mt-7 text-[15px] leading-8 ${paragraphStyle}`}>
                  {t(product.descriptionKey)}
                </p>

                <Link
                  to={`/marketplace?search=${encodeURIComponent(product.name)}`}
                  className={`mt-9 inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold transition ${primaryButton}`}
                >
                  {t("homeExploreProduct")}
                  <ArrowUpRight size={17} />
                </Link>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex gap-2">
              {harvestProducts.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActive(index)}
                  aria-label={`${t("homeShowHarvest")} ${t(item.nameKey)}`}
                  className={`h-1.5 rounded-full transition-all ${
                    active === index
                      ? "w-10 bg-[#587348] dark:bg-[#c5d2aa]"
                      : "w-5 bg-[#cbd2c4] dark:bg-[#596653]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------
   AGRICULTURAL REGIONS RING
----------------------------------- */

function AgriculturalRegionsRing() {
  const [paused, setPaused] = useState(false);
  const { t } = useApp();

  const radius = 230;
  const cardWidth = 190;
  const cardHeight = 260;

  return (
    <section className={`overflow-hidden py-24 ${sectionBg}`}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <Reveal>
          <SectionHead
            eyebrow={t("homeRegionsEyebrow")}
            title={t("homeRegionsTitle")}
            description={t("homeRegionsDesc")}
          />
        </Reveal>

        <div className="relative mx-auto mt-12 flex h-[650px] w-full max-w-[850px] items-center justify-center [perspective:1200px]">
          <div className="pointer-events-none absolute h-[570px] w-[570px] rounded-full border border-[#9ba88c]/25 dark:border-[#aab59a]/15" />

          <div className="pointer-events-none absolute h-[480px] w-[480px] rounded-full border border-dashed border-[#9ba88c]/35 dark:border-[#aab59a]/20" />

          <div className="pointer-events-none absolute h-[360px] w-[360px] rounded-full border border-[#9ba88c]/25 dark:border-[#aab59a]/15" />

          {/* Center */}

          <div className="relative z-20 flex h-40 w-40 flex-col items-center justify-center rounded-full border border-[#dce1d3] bg-white shadow-[0_15px_60px_rgba(40,55,35,0.12)] dark:border-[#596353] dark:bg-[#303a30]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf1e6] text-[#587348] dark:bg-[#465543] dark:text-[#d1ddb9]">
              <Sprout size={27} />
            </div>

            <h3 className={`mt-3 text-lg font-semibold ${headingStyle}`}>
              Afghanistan
            </h3>

            <span className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] ${paragraphStyle}`}>
              {t("homeAgriculturalRegions")}
            </span>
          </div>

          {/* Rotating cards */}

          <motion.div
            className="absolute left-1/2 top-1/2 z-10 h-0 w-0"
            animate={{ rotate: paused ? undefined : 360 }}
            transition={{
              duration: 36,
              ease: "linear",
              repeat: Infinity,
            }}
            onHoverStart={() => setPaused(true)}
            onHoverEnd={() => setPaused(false)}
            style={{ transformStyle: "preserve-3d" }}
          >
            {regions.map((region, index) => {
              const angle = (index * 360) / regions.length;
              const radians = (angle * Math.PI) / 180;

              const x = Math.sin(radians) * radius;
              const y = -Math.cos(radians) * radius;

              return (
                <motion.div
                  key={region.name}
                  className="absolute"
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    left: -cardWidth / 2,
                    top: -cardHeight / 2,
                    x,
                    y,
                  }}
                >
                  <motion.div
                    className="h-full w-full"
                    animate={{ rotate: paused ? undefined : -360 }}
                    transition={{
                      duration: 36,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    <Link
                      to={`/marketplace?search=${encodeURIComponent(region.name)}`}
                      className="group relative block h-full w-full overflow-hidden rounded-[22px] border-[5px] border-white bg-[#29342b] shadow-[0_15px_45px_rgba(0,0,0,0.2)] transition-shadow duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] dark:border-[#465144]"
                    >
                      <img
                        src={region.image}
                        alt={region.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                      <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md">
                        <MapPin size={16} />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/75">
                          {t("homeAgriculturalRegion")}
                        </span>

                        <h3 className="mt-2 text-2xl font-semibold">
                          {region.name}
                        </h3>

                        <p className="mt-2 text-xs font-medium leading-5 text-white/85">
                          {t(region.specialtyKey)}
                        </p>

                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#d9e5c1]">
                          {t("homeExploreRegion")}
                          <ArrowUpRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#9ba88c]/50" />

          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${paragraphStyle}`}>
            {paused ? t("homeRotationPaused") : t("homeDiscoverRegions")}
          </p>

          <span className="h-px w-8 bg-[#9ba88c]/50" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------
   MAIN HOME PAGE
----------------------------------- */

export default function Home() {
  const { items = [], t } = useApp();

  const featuredProducts = items.slice(0, 8);
  const sellerList = sellers || [];

  const itemCount = items.length;
  const sellerCount = sellerList.length;

  return (
    <>
      <CustomCursor />

      <main className={`overflow-hidden transition-colors duration-300 ${sectionBg}`}>
        <Hero itemCount={itemCount} sellerCount={sellerCount} />

        {/* 02 — MARKETPLACE OVERVIEW */}

        <section className="relative z-10 mx-auto -mt-1 max-w-7xl px-6 sm:px-10 lg:px-12">
          <div className={`grid grid-cols-2 gap-4 rounded-2xl p-7 shadow-[0_15px_50px_rgba(35,35,30,0.06)] md:grid-cols-4 md:p-9 ${cardStyle}`}>
            {[
              { value: itemCount, labelKey: "homeStatProducts", icon: Package },
              { value: sellerCount, labelKey: "homeStatSuppliers", icon: Users },
              {
                value: categories.length,
                labelKey: "homeStatCategories",
                icon: ShoppingBasket,
              },
              { value: "34", labelKey: "homeStatProvinces", icon: MapPin },
            ].map((stat, index) => (
              <Reveal key={stat.labelKey} delay={index * 0.08}>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#edf1e6] text-[#587348] dark:bg-[#465543] dark:text-[#d1ddb9]">
                    <stat.icon size={22} />
                  </div>

                  <div>
                    <p className={`text-2xl font-bold ${headingStyle}`}>
                      {stat.value}
                    </p>

                    <p className={`mt-1 text-xs font-medium ${paragraphStyle}`}>
                      {t(stat.labelKey)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 03 — CATEGORIES */}

        <section id="categories" className={`scroll-mt-24 py-24 ${sectionBg}`}>
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
            <Reveal>
              <SectionHead
                eyebrow={t("exploreMarketplace")}
                title={t("shopByCategory")}
                description={t("categoryIntro")}
              />
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((category, index) => (
                <Reveal key={category.id || category.name} delay={index * 0.06}>
                  <Link
                    to={`/marketplace?category=${encodeURIComponent(category.name)}`}
                    className={`group flex min-h-[150px] flex-col justify-between rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:border-[#819274] ${cardStyle}`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf1e6] text-[#587348] transition group-hover:bg-[#405d3e] group-hover:text-white dark:bg-[#465543] dark:text-[#d1ddb9] dark:group-hover:bg-[#c5d2aa] dark:group-hover:text-[#243024]">
                      <Sprout size={22} />
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-2">
                      <h3 className={`font-semibold ${headingStyle}`}>
                        {t(({ Fruits: "catFruits", Vegetables: "catVegetables", "Grains & Cereals": "catGrains", "Nuts & Seeds": "catNuts", Dairy: "catDairy", "Herbs & Spices": "catHerbs", Livestock: "catLivestock", Equipment: "catEquipment" })[category.name] || category.name)}
                      </h3>

                      <ArrowUpRight
                        size={17}
                        className="text-[#788775] transition group-hover:-translate-y-1 group-hover:translate-x-1 dark:text-[#c3d2b3]"
                      />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 04 — FEATURED PRODUCTS */}

        <section className={`py-24 ${alternateBg}`}>
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
            <Reveal>
              <SectionHead
                eyebrow={t("homeFeaturedProductsEyebrow")}
                title={t("homeFeaturedProductsTitle")}
                description={t("homeFeaturedProductsDesc")}
              />
            </Reveal>

            {featuredProducts.length > 0 ? (
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredProducts.map((product, index) => (
                  <Reveal key={product.id} delay={index * 0.07}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className={`mt-12 rounded-2xl border border-dashed p-12 text-center ${cardStyle}`}>
                <Package className={`mx-auto ${accentStyle}`} size={34} />

                <h3 className={`mt-4 text-xl font-semibold ${headingStyle}`}>
                  {t("homeProductsSoon")}
                </h3>

                <p className={`mt-2 text-sm ${paragraphStyle}`}>
                  {t("homeBeFirst")}
                </p>
              </div>
            )}

            <div className="mt-10 text-center">
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 rounded-full border border-[#657b59] px-7 py-3.5 text-sm font-bold text-[#405d3e] transition hover:bg-[#405d3e] hover:text-white dark:border-[#879777] dark:text-[#e0ead7] dark:hover:bg-[#c5d2aa] dark:hover:text-[#243024]"
              >
                {t("homeViewAllProducts")}
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* 05 — SEASONAL HARVEST */}

        <HarvestCarousel />

        {/* 06 — HOW IT WORKS */}

        <section id="how-it-works" className={`scroll-mt-24 py-24 ${sectionBg}`}>
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
            <Reveal>
              <SectionHead
                eyebrow={t("simpleAndStraightforward")}
                title={t("howAgriMarketWorks")}
                description={t("howIntro")}
              />
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={index * 0.1}>
                  <div className={`h-full rounded-2xl p-8 transition hover:-translate-y-1 hover:shadow-xl ${cardStyle}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf1e6] text-[#587348] dark:bg-[#465543] dark:text-[#d1ddb9]">
                        <step.icon size={25} />
                      </div>

                      <span className="text-4xl font-light text-[#dce3d6] dark:text-[#75816d]">
                        {step.number}
                      </span>
                    </div>

                    <h3 className={`mt-8 text-xl font-bold ${headingStyle}`}>
                      {t(step.titleKey)}
                    </h3>

                    <p className={`mt-3 text-sm leading-7 ${paragraphStyle}`}>
                      {t(step.descriptionKey)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 07 — WHY AGRIMARKET */}

        <section className="bg-[#e9ede5] py-24 dark:bg-[#293329]">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:px-12">
            <Reveal>
              <div>
                <span className={`text-xs font-bold uppercase tracking-[0.25em] ${accentStyle}`}>
                  {t("homeBenefitsEyebrow")}
                </span>

                <h2 className={`mt-5 text-4xl font-semibold leading-tight sm:text-5xl ${headingStyle}`}>
                  {t("homeBenefitsTitle")}
                </h2>

                <p className={`mt-6 max-w-lg text-[15px] leading-8 ${paragraphStyle}`}>
                  {t("homeBenefitsDesc")}
                </p>

                <Link
                  to="/about"
                  className={`mt-9 inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold transition ${primaryButton}`}
                >
                  {t("homeMission")}
                  <ArrowRight size={17} />
                </Link>
              </div>
            </Reveal>

            <div className="space-y-7">
              {benefits.map((benefit, index) => (
                <Reveal key={t(benefit.titleKey)} delay={index * 0.1}>
                  <div className="flex gap-5 border-b border-[#d0d9cd] pb-7 last:border-0 dark:border-[#4c5b4a]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#587348] dark:bg-[#465543] dark:text-[#d1ddb9]">
                      <benefit.icon size={23} />
                    </div>

                    <div>
                      <h3 className={`text-lg font-bold ${headingStyle}`}>
                        {t(benefit.titleKey)}
                      </h3>

                      <p className={`mt-2 text-sm leading-7 ${paragraphStyle}`}>
                        {t(benefit.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 08 — AGRICULTURAL REGIONS */}

        <AgriculturalRegionsRing />

        {/* 09 — SUPPLIERS */}

        <section className={`py-24 ${alternateBg}`}>
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
            <Reveal>
              <SectionHead
                eyebrow={t("homeFeaturedEyebrow")}
                title={t("homeFeaturedTitle")}
                description={t("homeFeaturedDesc")}
              />
            </Reveal>

            {sellerList.length > 0 ? (
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sellerList.slice(0, 6).map((seller, index) => (
                  <Reveal key={seller.id || seller.name} delay={index * 0.07}>
                    <div className={`rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-lg ${cardStyle}`}>
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edf1e6] text-[#587348] dark:bg-[#465543] dark:text-[#d1ddb9]">
                          <Store size={24} />
                        </div>

                        <div>
                          <h3 className={`font-bold ${headingStyle}`}>
                            {seller.name}
                          </h3>

                          <p className={`mt-1 text-xs font-medium ${paragraphStyle}`}>
                            {t("homeSupplierType")}
                          </p>
                        </div>
                      </div>

                      <div className={`mt-6 flex items-center justify-between border-t border-[#e1e6dc] pt-4 text-sm dark:border-[#4c5b4a] ${paragraphStyle}`}>
                        <span className="flex items-center gap-2">
                          <MapPin size={15} />
                          {seller.location || "Afghanistan"}
                        </span>

                        <ArrowUpRight size={17} />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className={`mt-12 text-center text-sm ${paragraphStyle}`}>
                {t("homeSupplierEmpty")}
              </p>
            )}

            <div className="mt-10 text-center">
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 font-bold text-[#405d3e] transition hover:text-[#718b5c] dark:text-[#c5d2aa] dark:hover:text-white"
              >
                {t("homeDiscoverMarket")}
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        {/* 10 — JOIN AGRIMARKET */}

        <section className={`py-24 ${sectionBg}`}>
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
            <Reveal>
              <div className="relative overflow-hidden rounded-[30px] bg-[#304630] px-7 py-16 text-center text-white dark:bg-[#354936] sm:px-14 sm:py-20">
                <div className="pointer-events-none absolute -right-20 -top-36 h-96 w-96 rounded-full border border-white/10" />

                <div className="pointer-events-none absolute -bottom-48 -left-24 h-96 w-96 rounded-full border border-white/10" />

                <div className="pointer-events-none absolute right-[15%] top-[15%] h-48 w-48 rounded-full bg-[#c0c5ac]/10 blur-[80px]" />

                <div className="relative mx-auto max-w-2xl">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#dce8c9]">
                    {t("homeGrowEyebrow")}
                  </span>

                  <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                    {t("homeGrowTitle")}
                  </h2>

                  <p className="mx-auto mt-5 max-w-xl text-[15px] leading-8 text-white/85">
                    {t("homeGrowDesc")}
                  </p>

                  <div className="mt-9 flex flex-wrap justify-center gap-4">
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-2 rounded-full bg-[#d6e1c0] px-7 py-4 text-sm font-bold text-[#293829] transition hover:bg-white"
                    >
                      {t("homeJoinMarket")}
                      <ArrowRight size={17} />
                    </Link>

                    <Link
                      to="/marketplace"
                      className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/15"
                    >
                      {t("homeBrowseProducts")}
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 11 — FAQ */}

        <section className={`py-24 ${alternateBg}`}>
          <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
            <Reveal>
              <div>
                <span className={`text-xs font-bold uppercase tracking-[0.24em] ${accentStyle}`}>
                  {t("homeFaqEyebrow")}
                </span>

                <h2 className={`mt-4 text-4xl font-semibold leading-tight sm:text-5xl ${headingStyle}`}>
                  {t("homeFaqTitle")}
                </h2>

                <p className={`mt-5 max-w-sm text-[15px] leading-8 ${paragraphStyle}`}>
                  {t("homeFaqDesc")}
                </p>

                <Link
                  to="/contact"
                  className="mt-7 inline-flex items-center gap-2 font-bold text-[#405d3e] dark:text-[#c5d2aa]"
                >
                  {t("homeContactTeam")}
                  <ArrowRight size={17} />
                </Link>
              </div>
            </Reveal>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <Reveal key={faq.questionKey} delay={index * 0.06}>
                  <FaqItem
                    question={t(faq.questionKey)}
                    answer={t(faq.answerKey)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* ----------------------------------
   FAQ ITEM
----------------------------------- */

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-xl px-6 transition-colors duration-300 ${cardStyle}`}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-5 py-5 text-left"
      >
        <span className={`font-semibold ${headingStyle}`}>
          {question}
        </span>

        <ChevronDown
          size={19}
          className={`shrink-0 text-[#587348] transition-transform duration-300 dark:text-[#c5d2aa] ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className={`max-w-2xl pb-6 text-sm leading-7 ${paragraphStyle}`}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
