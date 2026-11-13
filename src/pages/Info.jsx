import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  MapPin,
  Phone,
  Leaf,
  ArrowRight,
  ArrowUpRight,
  Handshake,
  ShieldCheck,
  Globe2,
  Sprout,
  Wheat,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "../context/AppContext";

// --------------------------------------------------
// IMAGES
// --------------------------------------------------

const aboutPhoto =
  "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1800&q=90";

const contactPhoto =
  "https://images.unsplash.com/photo-1743636521230-15e192f1cfec?auto=format&fit=crop&w=1400&q=90";
const galleryImages = [
  { image: "https://images.unsplash.com/photo-1561978248-bffcdd0457ad?auto=format&fit=crop&w=900&q=85", titleKey: "aboutGalleryHarvest", categoryKey: "aboutGalleryCatHarvest" },
  { image: "https://images.unsplash.com/photo-1631641482600-b3448b29d17a?auto=format&fit=crop&w=900&q=85", titleKey: "aboutGalleryFresh", categoryKey: "aboutGalleryCatFresh" },
  { image: "https://images.unsplash.com/photo-1590531970580-046a37dfbb68?auto=format&fit=crop&w=900&q=85", titleKey: "aboutGalleryFuture", categoryKey: "aboutGalleryCatFuture" },
  { image: "https://images.unsplash.com/photo-1759993156184-cb73423c348c?auto=format&fit=crop&w=900&q=85", titleKey: "aboutGalleryLand", categoryKey: "aboutGalleryCatLand" },
];

const changingWordKeys = ["aboutWordLocal", "aboutWordConnections", "aboutWordProduce", "aboutWordCommunities"];

const values = [
  { number: "01", titleKey: "aboutValueLocal", descKey: "aboutValueLocalDesc", Icon: Leaf },
  { number: "02", titleKey: "aboutValueDirect", descKey: "aboutValueDirectDesc", Icon: Handshake },
  { number: "03", titleKey: "aboutValueTrust", descKey: "aboutValueTrustDesc", Icon: ShieldCheck },
];

// --------------------------------------------------
// TYPEWRITER
// --------------------------------------------------

function Typewriter({ words }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const currentWord = words[wordIndex] || "";

  useEffect(() => {

    let delay = deleting ? 45 : 90;

    if (!deleting && text === currentWord) delay = 1500;
    if (deleting && text === "") delay = 300;

    const timer = setTimeout(() => {
      if (!deleting) {
        if (text === currentWord) {
          setDeleting(true);
        } else {
          setText(currentWord.slice(0, text.length + 1));
        }
      } else {
        if (text === "") {
          setDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        } else {
          setText(currentWord.slice(0, text.length - 1));
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, currentWord]);

  return (
    <span className="text-[#638b5c]">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// --------------------------------------------------
// ABOUT PAGE
// --------------------------------------------------

export function About() {
  const { t, language } = useApp();
  const [activeImage, setActiveImage] = useState(0);
  const visionWords = changingWordKeys.map((key) => t(key));

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % galleryImages.length);
  };

  const previousImage = () => {
    setActiveImage(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <main className="page-shell overflow-hidden">
      {/* HERO */}
      <section className="container pt-12 pb-24 md:pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="eyebrow flex items-center gap-2">
              <Sprout size={15} />
              {t("aboutEyebrow")}
            </div>

            <h1 className="section-title mt-5 leading-tight">
              {t("aboutTitle")}
            </h1>

            <p className="muted leading-8 mt-6">{t("aboutIntro")}</p>

            <p className="muted leading-8 mt-4">
              {t("aboutStory")}
            </p>

            <div className="mt-8 border-l-2 border-[#638b5c] pl-5">
              <p className="text-xs uppercase tracking-[0.2em] muted font-bold">
                {t("aboutVisionLabel")}
              </p>

              <div className="font-display text-xl md:text-2xl font-bold mt-2 min-h-9">
                <Typewriter key={language} words={visionWords} />
              </div>
            </div>

            <Link
              to="/marketplace"
              className="btn-primary mt-9 inline-flex items-center gap-3 group"
            >
              {t("aboutExplore")}
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="rounded-[28px] overflow-hidden relative">
              <motion.img
                src={aboutPhoto}
                alt={t("aboutPhotoAlt")}
                className="w-full h-[380px] md:h-[520px] object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.7 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-7 left-7 text-white pointer-events-none">
                <p className="text-xs uppercase tracking-[0.2em] text-white/75">
                  {t("aboutPhotoEyebrow")}
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-bold mt-3">
                  {t("aboutPhotoTitle")}
                </h2>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-3 md:-left-7 bg-white dark:bg-[#202a23] rounded-2xl p-5 shadow-xl max-w-[220px]"
            >
              <div className="flex items-center gap-2 text-[#638b5c]">
                <Leaf size={17} />
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  {t("aboutRoots")}
                </span>
              </div>
              <p className="font-display text-lg font-bold mt-2">
                {t("aboutRootsText")}
              </p>
            </motion.div>

            <motion.div
              animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-5 -right-4 bg-[#e8efe2] text-[#568259] rounded-full p-4 shadow-lg"
            >
              <Wheat size={24} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="container pb-24">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow">{t("aboutValuesEyebrow")}</div>
          <h2 className="section-title mt-4">{t("aboutValuesTitle")}</h2>
          <p className="muted mt-4 leading-7 max-w-2xl">
            {t("aboutValuesIntro")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {values.map(({ number, titleKey, descKey, Icon }, index) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -8 }}
              className="card p-7 group relative overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-2xl bg-[#edf3e9] dark:bg-[#344336] text-[#568259] flex items-center justify-center">
                  <Icon size={22} />
                </div>
                <span className="text-xs tracking-widest muted">{number}</span>
              </div>

              <h3 className="font-bold text-lg mt-7">{t(titleKey)}</h3>
              <p className="muted text-sm leading-7 mt-3">{t(descKey)}</p>

              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#638b5c] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="container pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <div className="eyebrow">{t("aboutGalleryEyebrow")}</div>
            <h2 className="section-title mt-4">{t("aboutGalleryTitle")}</h2>
            <p className="muted mt-3 max-w-xl leading-7">
              {t("aboutGalleryIntro")}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={previousImage}
              aria-label={t("aboutPreviousImage")}
              className="w-11 h-11 rounded-full border border-[#dce3d7] dark:border-white/15 flex items-center justify-center hover:bg-[#568259] hover:text-white transition"
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label={t("aboutNextImage")}
              className="w-11 h-11 rounded-full border border-[#dce3d7] dark:border-white/15 flex items-center justify-center hover:bg-[#568259] hover:text-white transition"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((item, index) => (
            <motion.button
              type="button"
              key={item.titleKey}
              onClick={() => setActiveImage(index)}
              whileHover={{ y: -7 }}
              className={`relative h-[230px] md:h-[340px] overflow-hidden rounded-2xl text-left ${
                activeImage === index
                  ? "ring-2 ring-[#638b5c] ring-offset-4 dark:ring-offset-[#151a16]"
                  : ""
              }`}
            >
              <motion.img
                src={item.image}
                alt={t(item.titleKey)}
                className="w-full h-full object-cover"
                animate={{ scale: activeImage === index ? 1.07 : 1 }}
                transition={{ duration: 0.6 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="absolute top-4 left-4 text-white/80 text-xs tracking-widest">
                0{index + 1}
              </div>

              <div className="absolute bottom-5 left-4 right-4 text-white">
                <p className="text-[9px] md:text-[10px] tracking-widest">
                  {t(item.categoryKey)}
                </p>
                <h3 className="font-bold text-sm md:text-lg mt-2">
                  {t(item.titleKey)}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex justify-between mt-5"
          >
            <p className="muted text-sm">{t(galleryImages[activeImage].titleKey)}</p>
            <p className="muted text-xs">
              0{activeImage + 1} / 0{galleryImages.length}
            </p>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[28px] bg-[#243b2a] text-white p-8 md:p-14"
        >
          <div className="absolute -right-20 -top-20 w-80 h-80 border border-white/10 rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#b9d2ac]">
              {t("aboutCtaEyebrow")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-5 leading-tight">
              {t("aboutCtaTitle")}
            </h2>
            <p className="text-white/70 leading-7 mt-5">
              {t("aboutCtaText")}
            </p>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-3 bg-white text-[#263b2a] px-6 py-4 rounded-full font-bold text-sm mt-8 hover:bg-[#e9f0e4] transition"
            >
              {t("aboutCtaButton")}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* DISCLAIMER */}
      <section className="container pb-10">
        <div className="p-5 rounded-2xl bg-[#f0f4eb] dark:bg-[#222c23] text-xs text-[#738073] dark:text-[#aebba9] leading-6">
          {t("aboutDisclaimer")}
        </div>
      </section>
    </main>
  );
}

// --------------------------------------------------
// CONTACT PAGE
// --------------------------------------------------

export function Contact() {
  const { t, createNotification } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const sender = String(formData.get("name") || "Visitor").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    if (!sender || !email || !message) return;
    createNotification?.({
      title: "New contact message",
      text: `${sender} (${email}): ${message}`,
      sender,
      email,
      message,
      type: "contact",
    });
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <main className="page-shell overflow-hidden">
      <section className="container pt-12 pb-24 md:pt-20">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-14"
        >
          <div className="eyebrow flex items-center gap-2">
            <Send size={15} />
            {t("contactEyebrow")}
          </div>

          <h1 className="section-title mt-5">{t("contactTitle")}</h1>

          <p className="muted mt-5 leading-8 max-w-2xl">
            {t("contactIntro")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-16 items-start">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="card p-6 md:p-9"
          >
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[#668c5e] font-bold">
                {t("contactFormEyebrow")}
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold mt-3">
                {t("contactFormTitle")}
              </h2>
              <p className="muted text-sm mt-3 leading-6">
                {t("contactFormDescription")}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[#e8f2e4] dark:bg-[#344936] text-[#568259] mx-auto flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-display text-2xl font-bold mt-6">
                    {t("contactThankYou")}
                  </h3>
                  <p className="muted text-sm mt-3 leading-6">
                    {t("contactDemoSuccess")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-primary mt-7"
                  >
                    {t("contactSendAnother")}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="grid gap-5"
                >
                  <label className="text-xs font-bold">
                    {t("name")}
                    <input
                      className="field mt-2"
                      name="name"
                      required
                      placeholder={t("contactNamePlaceholder")}
                    />
                  </label>

                  <label className="text-xs font-bold">
                    {t("email")}
                    <input
                      className="field mt-2"
                      name="email"
                      type="email"
                      required
                      placeholder={t("contactEmailPlaceholder")}
                    />
                  </label>

                  <label className="text-xs font-bold">
                    {t("message")}
                    <textarea
                      className="field mt-2 min-h-36 resize-y"
                      name="message"
                      required
                      placeholder={t("contactMessagePlaceholder")}
                    />
                  </label>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary inline-flex items-center justify-center gap-3"
                  >
                    {t("send")}
                    <ArrowRight size={17} />
                  </motion.button>

                  <p className="text-[11px] text-[#899287]">
                    {t("contactDemoNote")}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* IMAGE + CONTACT INFORMATION */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-[28px]">
              <motion.img
                src={contactPhoto}
                alt="Fresh apples, peaches and grapes at a local fruit stall"
                className="w-full h-[320px] md:h-[430px] object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.7 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-7 left-7 right-7 text-white pointer-events-none">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  {t("contactImageEyebrow")}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold mt-3">
                  {t("contactImageTitle")}
                </h3>
              </div>
            </div>

            {/* CONTACT DETAILS */}
            <div className="grid sm:grid-cols-2 gap-4 mt-7">
              {[
                { Icon: Leaf, title: t("contactPlatformLabel"), value: t("contactPlatformValue") },
                { Icon: MapPin, title: t("contactCoverageLabel"), value: t("contactCoverageValue") },
                { Icon: Mail, title: t("contactMessageLabel"), value: t("contactMessageValue") },
              ].map(({ Icon, title, value }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="card p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#edf3e9] dark:bg-[#344336] text-[#568259] flex items-center justify-center">
                    <Icon size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs muted font-semibold">{title}</p>
                    <p className="text-sm font-semibold mt-2 break-words">
                      {value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-5 mt-8">
              <span className="text-xs uppercase tracking-widest muted font-bold">
                {t("contactFollowUs")}
              </span>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#dce3d7] dark:border-white/15 flex items-center justify-center hover:bg-[#568259] hover:text-white transition font-bold text-xs"
              >
                IG
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-[#dce3d7] dark:border-white/15 flex items-center justify-center hover:bg-[#568259] hover:text-white transition font-bold text-sm"
              >
                f
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
