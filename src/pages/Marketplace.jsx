
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import {
  Search,
  SlidersHorizontal,
  Grid2X2,
  List,
  MapPin,
  RotateCcw,
  Leaf,
  ArrowUpDown,
  ArrowRight,
  CheckCircle2,
  Package,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'motion/react';

import { categories, provinces } from '../data/market';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/UI';


/* =========================================
   ANIMATION VARIANTS
========================================= */

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.96,
    transition: {
      duration: 0.2,
    },
  },
};


/* =========================================
   CUSTOM FRAMER MOTION CURSOR
========================================= */

function CustomCursor({ disabled }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = {
    damping: 25,
    stiffness: 300,
    mass: 0.5,
  };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const media = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    );

    if (!media.matches) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target;

      setHovering(
        Boolean(
          target.closest(
            'a, button, input, select, textarea, [role="button"]'
          )
        )
      );
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener('pointermove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, [disabled, mouseX, mouseY]);

  if (disabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.7 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      >
        <div
          className={`w-3 h-3 rounded-full transition-colors duration-200 ${
            hovering ? 'bg-white' : 'bg-[#54815a]'
          }`}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: visible ? 0.7 : 0,
          scale: hovering ? 2.4 : 3.2,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      >
        <div className="w-3 h-3 rounded-full border border-[#54815a]/70" />
      </motion.div>
    </>
  );
}


/* =========================================
   MAIN MARKETPLACE
========================================= */

const categoryTranslationKeys = {
  Fruits: "catFruits", Vegetables: "catVegetables", "Grains & Cereals": "catGrains",
  "Nuts & Seeds": "catNuts", Dairy: "catDairy", "Herbs & Spices": "catHerbs",
  Livestock: "catLivestock", Equipment: "catEquipment",
};
const productNameTranslationKeys = { 1: "prodKandaharPomegranates", 2: "prodHeratSaffron", 3: "prodBalkhWheat", 4: "prodNangarharOranges", 5: "prodBadakhshanWalnuts", 6: "prodKandaharGrapes", 7: "prodHelmandLentils", 8: "prodSpinach", 9: "prodAlmonds" };
const provinceTranslationKeys = Object.fromEntries(
  ["Kabul", "Kandahar", "Herat", "Balkh", "Nangarhar", "Badakhshan", "Helmand", "Kunduz", "Parwan", "Ghazni"].map((name) => [name, `province${name}`]),
);

export default function Marketplace() {
  const { items = [], t } = useApp();

  const [params] = useSearchParams();

  const shouldReduceMotion = useReducedMotion();

  const [q, setQ] = useState(() => params.get('search') || '');

  const [category, setCategory] = useState(
    params.get('category') || 'All'
  );

  const [province, setProvince] = useState('All');
  const [seller, setSeller] = useState('All');
  const [grade, setGrade] = useState('All');

  const [verified, setVerified] = useState(false);

  const [sort, setSort] = useState('Newest');
  const [view, setView] = useState('grid');

  const [max, setMax] = useState('');

  const [showMobileFilters, setShowMobileFilters] = useState(false);


  /* =========================================
     PRICE RANGE
  ========================================= */

  const maxPriceLimit = useMemo(() => {
    return Math.max(
      100,
      ...items.map((item) => Number(item.price) || 0)
    );
  }, [items]);

  const currentMax = max
    ? Number(max)
    : maxPriceLimit;


  /* =========================================
     FILTER PRODUCTS
  ========================================= */

  const filtered = useMemo(() => {
    let result = items.filter((p) => {
      const searchMatch =
        `${p.name} ${p.seller} ${p.location} ${p.category}`
          .toLowerCase()
          .includes(q.toLowerCase());

      return (
        (category === 'All' || p.category === category) &&
        (province === 'All' || p.location.startsWith(province)) &&
        (seller === 'All' || p.type === seller) &&
        (grade === 'All' || p.grade === grade) &&
        (!verified || p.verified) &&
        (!max || Number(p.price) <= Number(max)) &&
        searchMatch
      );
    });

    if (sort === 'Lowest price') {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === 'Highest price') {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === 'Most stock') {
      result.sort((a, b) => b.quantity - a.quantity);
    }

    if (sort === 'Newest') {
      result = [...result].reverse();
    }

    return result;
  }, [
    items,
    q,
    category,
    province,
    seller,
    grade,
    verified,
    max,
    sort,
  ]);


  /* =========================================
     RESET FILTERS
  ========================================= */

  const reset = () => {
    setQ('');
    setCategory('All');
    setProvince('All');
    setSeller('All');
    setGrade('All');
    setVerified(false);
    setMax('');
    setSort('Newest');
  };


  const hasFilters =
    q ||
    category !== 'All' ||
    province !== 'All' ||
    seller !== 'All' ||
    grade !== 'All' ||
    verified ||
    max;


  const transition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      };


  /* =========================================
     FILTER CONTENT
  ========================================= */

  const filterContent = (
    <>
      {/* FILTER HEADER */}

      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#edf3e9] text-[#47734d] flex items-center justify-center">
            <SlidersHorizontal size={17} />
          </div>

          <div>
            <h3 className="font-bold text-[#253b2c]">
              {t("filters")}
            </h3>

            <p className="text-[11px] text-gray-400">
              {t("refineSearch")}
            </p>
          </div>
        </div>

        <button
          onClick={reset}
          className="text-xs font-semibold text-[#56815b] hover:text-[#294d32] flex items-center gap-1 transition-colors"
        >
          <RotateCcw size={13} />
          {t("reset")}
        </button>
      </div>


      {/* CATEGORY */}

      <div className="mb-6">
        <label className="block text-xs font-bold text-[#35483a] mb-2">
          {t("category")}
        </label>

        <select
          className="field"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">{t("allCategories")}</option>

          {categories.map((c) => (
            <option key={c.name} value={c.name}>
              {t(categoryTranslationKeys[c.name] || c.name)}
            </option>
          ))}
        </select>
      </div>


      {/* LOCATION */}

      <div className="mb-6">
        <label className="block text-xs font-bold text-[#35483a] mb-2">
          {t("province")}
        </label>

        <select
          className="field"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        >
          <option value="All">{t("allProvinces")}</option>

          {provinces.map((p) => (
            <option key={p} value={p}>
              {t(provinceTranslationKeys[p] || p)}
            </option>
          ))}
        </select>
      </div>


      {/* SELLER */}

      <div className="mb-6">
        <label className="block text-xs font-bold text-[#35483a] mb-2">
          {t("sellerType")}
        </label>

        <select
          className="field"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
        >
          <option value="All">{t("allSellers")}</option>
          <option value="Farmer">{t("sellerFarmers")}</option>
          <option value="Wholesaler">{t("sellerWholesalers")}</option>
        </select>
      </div>


      {/* QUALITY */}

      <div className="mb-6">
        <label className="block text-xs font-bold text-[#35483a] mb-2">
          {t("gradeLabel")}
        </label>

        <select
          className="field"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="All">{t("allGrades")}</option>
          <option value="A">{t("gradeA")}</option>
          <option value="B">{t("gradeB")}</option>
          <option value="Premium">{t("premium")}</option>
        </select>
      </div>


      {/* PRICE RANGE SLIDER */}

      <div className="mb-7">
        <div className="flex justify-between items-center mb-3">
          <label className="text-xs font-bold text-[#35483a]">
            {t("maximumPriceLabel")}
          </label>

          <span className="text-xs font-bold text-[#54815a]">
            AFN
          </span>
        </div>

        <div className="bg-[#f5f8f3] rounded-xl p-4">

          <div className="flex justify-between items-center mb-4">
            <span className="text-[11px] text-gray-400">
              {t("priceLimit")}
            </span>

            <span className="text-sm font-extrabold text-[#355c3d] tabular-nums">
              {currentMax.toLocaleString()} AFN
            </span>
          </div>

          <input
            type="range"
            min="0"
            max={maxPriceLimit}
            step={Math.max(1, Math.ceil(maxPriceLimit / 100))}
            value={Math.min(currentMax, maxPriceLimit)}
            onChange={(e) => {
              const value = Number(e.target.value);

              setMax(
                value >= maxPriceLimit
                  ? ''
                  : String(value)
              );
            }}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#54815a] bg-[#dce7d8]"
            style={{
              accentColor: '#54815a',
            }}
          />

          <div className="flex justify-between text-[10px] text-gray-400 mt-2">
            <span>0 AFN</span>
            <span>
              {maxPriceLimit.toLocaleString()} AFN
            </span>
          </div>
        </div>
      </div>


      {/* VERIFIED */}

      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={verified}
          onChange={(e) => setVerified(e.target.checked)}
          className="w-4 h-4 accent-[#54815a]"
        />

        <div className="flex items-center gap-1.5">
          <CheckCircle2
            size={14}
            className="text-[#54815a]"
          />

          <span className="text-xs font-semibold text-[#455447] group-hover:text-[#54815a] transition-colors">
            {t("verifiedOnly")}
          </span>
        </div>
      </label>


      {/* DEMO NOTICE */}

      <div className="mt-7 p-3.5 rounded-xl bg-[#f5f7f1] border border-[#e8eee3]">
        <div className="flex gap-2 items-start">
          <Leaf
            size={15}
            className="text-[#54815a] mt-0.5 shrink-0"
          />

          <p className="text-[10px] text-[#788475] leading-5">
            {t("marketDemoNotice")}
          </p>
        </div>
      </div>
    </>
  );


  /* =========================================
     PAGE
  ========================================= */

  return (
    <motion.main
      className="page-shell min-h-screen overflow-hidden bg-[#fafbf8] [@media(hover:hover)_and_(pointer:fine)]:cursor-none"
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={pageVariants}
    >

      <CustomCursor disabled={shouldReduceMotion} />

      <div className="container py-8 md:py-12">


        {/* =====================================
            PAGE HEADER
        ===================================== */}

        <motion.div
          variants={fadeUp}
          className="mb-9"
        >

          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-[#6e916d]">
            <Leaf size={14} />
            <span>{t("marketEyebrow")}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mt-4">

            <div>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[#23362a]">
                {t("marketTitle")}
              </h1>

              <p className="text-sm md:text-base text-[#899188] mt-3 max-w-xl leading-7">
                {t("marketDescription")}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white border border-[#edf0e9] rounded-2xl px-4 py-3 shadow-sm w-fit">

              <div className="w-9 h-9 rounded-xl bg-[#edf4e9] flex items-center justify-center text-[#54815a]">
                <Package size={18} />
              </div>

              <div>
                <p className="text-lg font-extrabold text-[#304533] leading-none">
                  {items.length}
                </p>

                <p className="text-[10px] text-gray-400 mt-1">
                  {t("availableListings")}
                </p>
              </div>
            </div>

          </div>
        </motion.div>


        {/* =====================================
            CATEGORY SLIDER
        ===================================== */}

        <motion.div
          variants={fadeUp}
          className="mb-9"
        >

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#35483a]">
              {t("browseCategories")}
            </h2>

            <span className="text-[10px] text-gray-400">
              {t("exploreProducts")}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory('All')}
              className={`shrink-0 px-5 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
                category === 'All'
                  ? 'bg-[#355b3d] text-white shadow-lg shadow-[#355b3d]/15'
                  : 'bg-white text-[#687568] border border-[#e9eee5] hover:border-[#9db69b]'
              }`}
            >
              {t("allProducts")}
            </motion.button>

            {categories.map((c) => (
              <motion.button
                key={c.name}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : { y: -3 }
                }
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(c.name)}
                className={`shrink-0 px-5 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
                  category === c.name
                    ? 'bg-[#355b3d] text-white shadow-lg shadow-[#355b3d]/15'
                    : 'bg-white text-[#687568] border border-[#e9eee5] hover:border-[#9db69b]'
                }`}
              >
                {t(categoryTranslationKeys[c.name] || c.name)}
              </motion.button>
            ))}

          </div>
        </motion.div>


        {/* =====================================
            MAIN LAYOUT
        ===================================== */}

        <div className="grid lg:grid-cols-[255px_minmax(0,1fr)] gap-6 items-start">


          {/* =====================================
              DESKTOP FILTER SIDEBAR
          ===================================== */}

          <motion.aside
            variants={fadeUp}
            className="hidden lg:block bg-white border border-[#edf0e9] rounded-2xl p-5 shadow-[0_8px_35px_rgba(35,54,42,0.035)] sticky top-24"
          >
            {filterContent}
          </motion.aside>


          {/* =====================================
              PRODUCTS SECTION
          ===================================== */}

          <motion.section variants={fadeUp} className="min-w-0">


            {/* SEARCH AND CONTROLS */}

            <div className="bg-white border border-[#edf0e9] rounded-2xl p-3 shadow-sm mb-5">

              <div className="flex flex-col sm:flex-row gap-3">

                {/* SEARCH */}

                <div className="relative flex-1">

                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#91a08f]"
                  />

                  <input
                    className="w-full h-12 bg-[#f8faf6] border border-transparent focus:border-[#b4cbb0] focus:bg-white rounded-xl pl-11 pr-10 text-sm outline-none transition-all placeholder:text-[#a3aca0]"
                    placeholder={t("searchMarketPlaceholder")}
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />

                  {q && (
                    <button
                      onClick={() => setQ('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>


                {/* MOBILE FILTER BUTTON */}

                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden h-12 px-4 rounded-xl border border-[#e8eee5] bg-white flex items-center justify-center gap-2 text-xs font-bold text-[#46644b]"
                >
                  <SlidersHorizontal size={16} />
                  {t("filters")}

                  {hasFilters && (
                    <span className="w-2 h-2 rounded-full bg-[#54815a]" />
                  )}
                </button>


                {/* SORT */}

                <div className="relative">

                  <ArrowUpDown
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#829080] pointer-events-none"
                  />

                  <select
                    className="h-12 w-full sm:w-[175px] bg-[#f8faf6] border border-transparent rounded-xl pl-9 pr-3 text-xs font-semibold text-[#566456] outline-none focus:border-[#b4cbb0] cursor-pointer"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="Newest">{t("marketSortNewest")}</option>
                    <option value="Lowest price">{t("marketSortLow")}</option>
                    <option value="Highest price">{t("marketSortHigh")}</option>
                    <option value="Most stock">{t("marketSortStock")}</option>
                  </select>
                </div>


                {/* VIEW SWITCH */}

                <div className="hidden sm:flex items-center gap-1 bg-[#f5f8f2] rounded-xl p-1">

                  <button
                    onClick={() => setView('grid')}
                    aria-label={t("viewGrid")}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                      view === 'grid'
                        ? 'bg-white text-[#47744e] shadow-sm'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    <Grid2X2 size={17} />
                  </button>

                  <button
                    onClick={() => setView('list')}
                    aria-label={t("viewList")}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                      view === 'list'
                        ? 'bg-white text-[#47744e] shadow-sm'
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    <List size={18} />
                  </button>

                </div>

              </div>
            </div>


            {/* RESULTS HEADER */}

            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold text-[#304333]">
                    {t("agriculturalProducts")}
                  </h2>

                  <span className="px-2 py-1 rounded-md bg-[#edf4e9] text-[#54815a] text-[10px] font-bold">
                    {filtered.length}
                  </span>
                </div>

                <p className="text-[11px] text-[#9ba398] mt-1">
                  {t("browseAvailable")}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#7e8c7d]">
                <MapPin size={14} className="text-[#648c65]" />
                {t("marketAfghanistan")}
              </div>

            </div>


            {/* ACTIVE FILTERS */}

            <AnimatePresence>
              {hasFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap items-center gap-2 mb-5 overflow-hidden"
                >
                  <span className="text-[10px] text-gray-400 font-semibold">
                    {t("marketActiveFilters")}
                  </span>

                  {category !== 'All' && (
                    <span className="px-3 py-1.5 bg-[#edf4e9] text-[#4f7652] rounded-full text-[10px] font-semibold">
                      {t(categoryTranslationKeys[category] || category)}
                    </span>
                  )}

                  {province !== 'All' && (
                    <span className="px-3 py-1.5 bg-[#edf4e9] text-[#4f7652] rounded-full text-[10px] font-semibold">
                      {t(provinceTranslationKeys[province] || province)}
                    </span>
                  )}

                  {seller !== 'All' && (
                    <span className="px-3 py-1.5 bg-[#edf4e9] text-[#4f7652] rounded-full text-[10px] font-semibold">
                      {seller === "Farmer" ? t("sellerFarmers") : t("sellerWholesalers")}
                    </span>
                  )}

                  {verified && (
                    <span className="px-3 py-1.5 bg-[#edf4e9] text-[#4f7652] rounded-full text-[10px] font-semibold">
                      {t("marketVerified")}
                    </span>
                  )}

                  {max && (
                    <span className="px-3 py-1.5 bg-[#edf4e9] text-[#4f7652] rounded-full text-[10px] font-semibold">
                      {t("marketMax")} {Number(max).toLocaleString()} AFN
                    </span>
                  )}

                  <button
                    onClick={reset}
                    className="text-[10px] font-bold text-[#b16b59] hover:underline"
                  >
                    {t("clearAll")}
                  </button>

                </motion.div>
              )}
            </AnimatePresence>


            {/* =====================================
                PRODUCT GRID / LIST
            ===================================== */}

            <AnimatePresence mode="wait">

              {filtered.length > 0 ? (

                <motion.div
                  key={`${view}-${category}-${province}-${seller}-${grade}-${verified}-${max}-${q}-${sort}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={transition}
                  className={
                    view === 'grid'
                      ? 'grid sm:grid-cols-2 xl:grid-cols-3 gap-4'
                      : 'grid gap-4'
                  }
                >

                  {filtered.map((p, index) => (

                    <motion.div
                      key={p.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout={!shouldReduceMotion}
                      transition={{
                        layout: { duration: 0.4 },
                        delay: Math.min(index * 0.045, 0.3),
                      }}
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : {
                              y: -5,
                              transition: {
                                duration: 0.25,
                              },
                            }
                      }
                      className="h-full"
                    >

                      {view === 'grid' ? (

                        <ProductCard product={p} />

                      ) : (

                        <Link
                          to={`/product/${p.id}`}
                          className="group flex flex-col sm:flex-row gap-4 bg-white border border-[#edf0e9] rounded-2xl p-3 hover:shadow-[0_12px_35px_rgba(35,54,42,0.08)] hover:border-[#d5e3d1] transition-all duration-300"
                        >

                          <div className="w-full sm:w-40 h-48 sm:h-32 shrink-0 overflow-hidden rounded-xl bg-[#f1f4ee]">

                            <motion.img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover"
                              whileHover={
                                shouldReduceMotion
                                  ? {}
                                  : { scale: 1.08 }
                              }
                              transition={{ duration: 0.5 }}
                            />

                          </div>

                          <div className="flex-1 min-w-0 py-1">

                            <div className="flex items-center justify-between gap-2">

                              <span className="text-[10px] uppercase tracking-wider font-bold text-[#789078]">
                                {p.category}
                              </span>

                              {p.verified && (
                                <span className="flex items-center gap-1 text-[10px] font-semibold text-[#54815a]">
                                  <CheckCircle2 size={12} />
                                  {t("verified")}
                                </span>
                              )}

                            </div>

                            <h3 className="font-extrabold text-[#304333] text-base mt-2 group-hover:text-[#54815a] transition-colors">
                              {p.name}
                            </h3>

                            <p className="flex items-center gap-1 text-[11px] text-[#929d91] mt-2">
                              <MapPin size={12} />
                              {p.location}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">

                              <div>
                                <strong className="text-lg font-extrabold text-[#416d48]">
                                  {p.price.toLocaleString()} AFN
                                </strong>

                                <span className="text-[10px] text-gray-400 ml-1">
                                  / {p.unit}
                                </span>

                                <p className="text-[10px] text-gray-400 mt-1">
                                  {p.quantity.toLocaleString()} {p.unit} {t("available")}
                                </p>
                              </div>

                              <span className="flex items-center gap-1 text-xs font-bold text-[#54815a] group-hover:gap-2 transition-all">
                                {t("viewDetails")}
                                <ArrowRight size={14} />
                              </span>

                            </div>

                          </div>

                        </Link>

                      )}

                    </motion.div>

                  ))}

                </motion.div>

              ) : (

                /* EMPTY STATE */

                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={transition}
                  className="bg-white border border-[#edf0e9] rounded-3xl p-10 md:p-16 text-center"
                >

                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? {}
                        : { y: [0, -8, 0] }
                    }
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-20 h-20 rounded-3xl bg-[#edf4e9] flex items-center justify-center mx-auto"
                  >
                    <Leaf
                      size={35}
                      className="text-[#638b65]"
                    />
                  </motion.div>

                  <h3 className="font-display font-extrabold text-2xl text-[#304333] mt-6">
                    {t("noProducts")}
                  </h3>

                  <p className="text-sm text-[#929d91] mt-2 max-w-sm mx-auto leading-6">
                    {t("noProductsText")}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={reset}
                    className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#355b3d] text-white text-xs font-bold shadow-lg shadow-[#355b3d]/15"
                  >
                    <RotateCcw size={14} />
                    {t("clearAll")}
                  </motion.button>

                </motion.div>

              )}

            </AnimatePresence>


            {/* BOTTOM INFORMATION */}

            {filtered.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-3 py-5 border-t border-[#e9eee5]"
              >
                <p className="text-[11px] text-[#9ba398]">
                  {t("showing")} {filtered.length} {t("of")} {items.length} {t("results")}
                </p>

                <span className="flex items-center gap-1.5 text-[11px] text-[#668568] font-semibold">
                  <Sparkles size={13} />
                  {t("supportingAgriculture")}
                </span>
              </motion.div>
            )}

          </motion.section>

        </div>

      </div>


      {/* =====================================
          MOBILE FILTER DRAWER
      ===================================== */}

      <AnimatePresence>

        {showMobileFilters && (

          <motion.div
            className="fixed inset-0 z-[100] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            {/* OVERLAY */}

            <div
              className="absolute inset-0 bg-[#14251a]/50 backdrop-blur-sm"
              onClick={() => setShowMobileFilters(false)}
            />

            {/* DRAWER */}

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                damping: 28,
                stiffness: 250,
              }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-white overflow-y-auto p-6 shadow-2xl"
            >

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h2 className="font-extrabold text-xl text-[#304333]">
                    {t("filterResults")}
                  </h2>

                  <p className="text-xs text-gray-400 mt-1">
                    {t("refineSearch")}
                  </p>
                </div>

                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f3f6f0] text-[#526952]"
                >
                  <X size={19} />
                </button>

              </div>

              {filterContent}

              <div className="sticky bottom-0 bg-white pt-5 pb-2 flex gap-3">

                <button
                  onClick={reset}
                  className="flex-1 py-3 rounded-xl border border-[#e6ece2] text-[#58715a] text-xs font-bold"
                >
                  {t("reset")}
                </button>

                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-[2] py-3 rounded-xl bg-[#355b3d] text-white text-xs font-bold"
                >
                  {t("applyFilters")} · {filtered.length}
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.main>
  );
}
