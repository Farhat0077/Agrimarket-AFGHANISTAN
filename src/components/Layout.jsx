
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  Menu,
  X,
  Leaf,
  Search,
  Globe2,
  LogOut,
  LayoutDashboard,
  Sun,
  Moon,
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Bell,
} from "lucide-react";

import { useApp } from "../context/AppContext";
import CustomCursor from "./CustomCursor";

const navItems = [
  ["home", "/"],
  ["marketplace", "/marketplace"],
  ["categories", "/#categories"],
  ["how", "/#how-it-works"],
  ["about", "/about"],
  ["contact", "/contact"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();

  const {
    user,
    logout,
    theme,
    setTheme,
    language,
    setLanguage,
    t,
    notifications = [],
    markNotificationsRead,
  } = useApp();

  const closeMenu = () => setOpen(false);

  const linkClass = ({ isActive }) =>
    `relative text-[13px] font-semibold tracking-wide transition-colors duration-300
    ${
      isActive
        ? "text-[#426c3d] dark:text-[#c1d5a5]"
        : "text-[#566356] hover:text-[#426c3d] dark:text-[#c0cbbd] dark:hover:text-[#d1e2b7]"
    }`;

  return (
    <>
      <CustomCursor />

      <header className="sticky top-0 z-50 border-b border-[#e8ebe3] bg-[#fbfcf9]/90 backdrop-blur-xl dark:border-[#394439] dark:bg-[#1d271f]/95">
        <div className="mx-auto flex min-h-[78px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#365b36] text-white shadow-lg shadow-[#365b36]/15 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105 dark:bg-[#b6ca98] dark:text-[#243324]">
              <Leaf size={23} strokeWidth={2.1} />
            </span>

            <span className="font-display text-[21px] font-extrabold tracking-[-1px] text-[#253b2b] dark:text-[#f1f4e9]">
              agri<span className="text-[#75965b] dark:text-[#b4ce91]">market</span>

              <small className="mt-[-3px] block text-[8px] font-bold tracking-[.25em] text-[#899487] dark:text-[#9cae98]">
                AFGHANISTAN
              </small>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 xl:flex">
            {navItems.map(([key, path]) =>
              path.includes("#") ? (
                <Link key={key} to={path} className={linkClass({ isActive: location.pathname === "/" && location.hash === path.slice(1) })}>
                  {t(key)}
                </Link>
              ) : (
                <NavLink key={key} to={path} end={path === "/"} className={linkClass}>
                  {t(key)}
                </NavLink>
              ),
            )}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">

            {user?.role === "Admin" && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setNotificationsOpen((value) => !value);
                    markNotificationsRead?.();
                  }}
                  aria-label={t("adminNotifications")}
                  aria-expanded={notificationsOpen}
                  className="relative grid h-10 w-10 place-items-center rounded-xl border border-[#e3e8df] bg-white text-[#526b4d] transition-colors hover:bg-[#edf2e8] dark:border-[#465345] dark:bg-[#29352b] dark:text-[#d5e5b7]"
                >
                  <Bell size={18} />
                  {notifications.some((item) => !item.read) && (
                    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                      {notifications.filter((item) => !item.read).length > 9 ? "9+" : notifications.filter((item) => !item.read).length}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      className="absolute right-0 top-12 z-[80] w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#e2e8dc] bg-white shadow-2xl dark:border-[#465345] dark:bg-[#243026]"
                    >
                      <div className="flex items-center justify-between border-b border-[#edf0e9] px-4 py-3 dark:border-[#465345]">
                        <strong className="text-sm text-[#263b2b] dark:text-[#f0f4e9]">{t("notifications")}</strong>
                        <button type="button" onClick={() => setNotificationsOpen(false)} className="text-xs text-[#668064]">{t("close")}</button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length ? notifications.slice(0, 8).map((item) => (
                          <div key={item.id} className="border-b border-[#f0f2ed] px-4 py-3 last:border-0 dark:border-[#39463b]">
                            <div className="flex items-start gap-2">
                              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#6f955d]" />
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-[#2d4231] dark:text-[#e8eee1]">{item.title || t("newMessage")}</p>
                                <p className="mt-1 break-words text-xs leading-5 text-[#687568] dark:text-[#c0cbbb]">{item.text}</p>
                                <p className="mt-1 text-[10px] text-[#98a194]">{item.date}</p>
                              </div>
                            </div>
                          </div>
                        )) : <p className="px-4 py-8 text-center text-xs text-[#849082]">{t("allCaughtUp")}</p>}
                      </div>
                      <Link to="/dashboard" onClick={() => setNotificationsOpen(false)} className="block border-t border-[#edf0e9] px-4 py-3 text-center text-xs font-bold text-[#4c7047] dark:border-[#465345]">{t("openAdminDashboard")}</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Search */}
            <Link
              to="/marketplace"
              aria-label={t("search")}
              title={t("search")}
              className="hidden h-10 w-10 items-center justify-center rounded-xl text-[#536b51] transition-all hover:bg-[#edf1e9] hover:text-[#315a35] sm:flex dark:text-[#c4d0bd] dark:hover:bg-[#344235] dark:hover:text-[#d4e5b8]"
            >
              <Search size={19} />
            </Link>

            {/* Language */}
            <label className="flex h-10 items-center gap-1.5 rounded-xl border border-[#e3e8df] bg-white px-2.5 text-[#52664f] transition-colors hover:border-[#a7b99a] dark:border-[#465345] dark:bg-[#29352b] dark:text-[#d1dcc8]">
              <Globe2 size={15} />

              <select
                aria-label={t("chooseLanguage")}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-[48px] cursor-pointer bg-transparent text-xs font-bold outline-none"
              >
                <option value="en">EN</option>
                <option value="fa">دری</option>
                <option value="ps">پښتو</option>
              </select>
            </label>

            {/* Theme toggle */}
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="grid h-10 w-10 place-items-center rounded-xl border border-[#e3e8df] bg-white text-[#657b51] transition-all duration-300 hover:border-[#a7b99a] hover:bg-[#edf2e8] dark:border-[#465345] dark:bg-[#29352b] dark:text-[#d5e5b7] dark:hover:bg-[#3b4939]"
              aria-label={
                theme === "dark" ? t("switchLight") : t("switchDark")
              }
              title={theme === "dark" ? t("switchLight") : t("switchDark")}
            >
              <motion.span
                key={theme}
                initial={{ rotate: -40, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </button>

            {/* Authentication */}
            <div className="hidden items-center gap-3 md:flex">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 rounded-xl border border-[#dfe6d9] px-4 py-2.5 text-xs font-bold text-[#3f5d3c] transition-all hover:border-[#91a985] hover:bg-[#eff4eb] dark:border-[#465345] dark:text-[#d1dfc2] dark:hover:bg-[#344235]"
                  >
                    <LayoutDashboard size={15} />
                    {t("dashboard")}
                  </Link>

                  <button
                    onClick={logout}
                    className="grid h-10 w-10 place-items-center rounded-xl text-[#718071] transition-all hover:bg-red-50 hover:text-red-600 dark:text-[#b9c5b3] dark:hover:bg-red-950/30 dark:hover:text-red-300"
                    title={t("logout")}
                    aria-label={t("logout")}
                  >
                    <LogOut size={17} />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-2 py-2 text-xs font-bold text-[#455b45] transition-colors hover:text-[#77965b] dark:text-[#d0dac8] dark:hover:text-[#c4d8a6]"
                  >
                    {t("login")}
                  </Link>

                  <Link
                    to="/register"
                    className="flex items-center gap-2 rounded-xl bg-[#3d623d] px-5 py-3 text-xs font-bold text-white shadow-md shadow-[#3d623d]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2e4d30] hover:shadow-lg dark:bg-[#b9ce9c] dark:text-[#243324] dark:hover:bg-[#cce0ae]"
                  >
                    {t("register")}
                    <ArrowUpRight size={15} />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-[#e3e8df] bg-white text-[#365536] transition-colors hover:bg-[#edf2e8] xl:hidden dark:border-[#465345] dark:bg-[#29352b] dark:text-[#d4e5b8]"
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-[#e8ebe3] bg-[#fbfcf9] xl:hidden dark:border-[#394439] dark:bg-[#202b22]"
            >
              <div className="mx-auto grid max-w-[1440px] gap-1 px-5 py-5 sm:px-8 lg:px-12">

                {navItems.map(([key, path], index) => (
                  <motion.div key={key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
                    {path.includes("#") ? (
                      <Link to={path} onClick={closeMenu} className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${location.pathname === "/" && location.hash === path.slice(1) ? "bg-[#eaf0e5] text-[#365d38] dark:bg-[#354633] dark:text-[#d0e4b0]" : "text-[#566356] hover:bg-[#f0f3ec] dark:text-[#c4d0bd] dark:hover:bg-[#303d32]"}`}>{t(key)}</Link>
                    ) : (
                      <NavLink to={path} end={path === "/"} onClick={closeMenu} className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${isActive ? "bg-[#eaf0e5] text-[#365d38] dark:bg-[#354633] dark:text-[#d0e4b0]" : "text-[#566356] hover:bg-[#f0f3ec] dark:text-[#c4d0bd] dark:hover:bg-[#303d32]"}`}>{t(key)}</NavLink>
                    )}
                  </motion.div>
                ))}

                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#e5e9e0] pt-4 dark:border-[#435043]">
                  <Link
                    onClick={closeMenu}
                    to="/marketplace"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#3d623d] px-4 py-3 text-sm font-bold text-white dark:bg-[#b9ce9c] dark:text-[#243324]"
                  >
                    {t("explore")}
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    onClick={closeMenu}
                    to={user ? "/dashboard" : "/login"}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#dce4d6] px-4 py-3 text-sm font-bold text-[#3d5b3d] dark:border-[#50604e] dark:text-[#d1dfc2]"
                  >
                    {user ? t("dashboard") : t("login")}
                  </Link>
                </div>

                {user && (
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30"
                  >
                    <LogOut size={16} />
                    {t("logout")}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export function Footer() {
  const { t } = useApp();
  const footerLinks = [
    [t("marketplace"), [[t("browseProducts"), "/marketplace"], [t("becomeSeller"), "/register"], [t("featuredSuppliers"), "/marketplace"]]],
    [t("company"), [[t("about"), "/about"], [t("contact"), "/contact"], [t("myAccount"), "/login"]]],
  ];

  return (
    <footer className="overflow-hidden bg-[#17271b] text-white">

      {/* Image call to action */}
      <div className="mx-auto max-w-[1440px] px-5 pt-12 sm:px-8 lg:px-12 lg:pt-16">
        <div className="group relative min-h-[360px] overflow-hidden rounded-[28px] md:min-h-[410px]">

          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=90"
            alt="Expansive green agricultural fields and cultivated farmland"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#14271a]/95 via-[#14271a]/75 to-[#14271a]/15" />

          <div className="relative z-10 flex min-h-[360px] flex-col justify-center px-7 py-12 md:min-h-[410px] md:px-14 lg:px-20">
            <span className="mb-5 flex items-center gap-3 text-[10px] font-bold tracking-[.28em] text-[#c1dba4] md:text-xs">
              <span className="h-px w-8 bg-[#c1dba4]" />
              {t("footerCtaEyebrow")}
            </span>

            <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.12] tracking-tight text-white md:text-5xl lg:text-6xl">
              {t("footerCtaTitle")}
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/85 md:text-base">
              {t("footerCtaText")}
            </p>

            <Link
              to="/marketplace"
              className="mt-8 flex w-fit items-center gap-3 rounded-xl bg-[#c3d8a6] px-6 py-3.5 text-sm font-bold text-[#263b27] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              {t("footerCtaButton")}
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="absolute bottom-7 right-8 hidden items-center gap-2 text-xs font-medium text-white/80 md:flex">
            <MapPin size={15} />
            Afghanistan
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-16 sm:px-8 lg:px-12 lg:pt-20">

        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr] lg:gap-20">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#c2d8a3] text-[#243724]">
                <Leaf size={23} />
              </span>

              <span className="font-display text-2xl font-extrabold tracking-tight text-white">
                agri<span className="text-[#b9d395]">market</span>
              </span>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#c0cbbd]">
              {t("footerPitch")}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-bold tracking-[.15em] text-[#c2d6a7]">
              <span className="h-2 w-2 rounded-full bg-[#9fc47d]" />
              BUILT FOR AFGHAN AGRICULTURE
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-6 text-sm font-bold tracking-wide text-white">
                {heading}
              </h3>

              <div className="grid gap-4">
                {links.map(([label, path]) => (
                  <Link
                    key={label}
                    to={path}
                    className="group flex w-fit items-center gap-2 text-sm text-[#bdc9b9] transition-colors duration-200 hover:text-[#c9dda9]"
                  >
                    {label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col justify-between gap-4 pt-7 text-xs text-[#aab8a7] sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} AgriMarket. Concept demonstration.
          </span>

          <span className="text-[#c1d0bb]">
            {t("footerTagline")}
          </span>
        </div>
      </div>
    </footer>
  );
}
