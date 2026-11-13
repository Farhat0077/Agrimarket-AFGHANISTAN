import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, ArrowRight, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
export function Register() {
  const [name, SN] = useState("");
  const [email, SE] = useState("");
  const [password, SP] = useState("");
  const [role, SR] = useState("Farmer");
  const [error, ER] = useState("");
  const { login, t } = useApp();
  const go = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      ER(t("passwordMin"));
      return;
    }
    login(name, role, email);
    go("/dashboard");
  };
  return (
    <AuthShell
      title={t("createAccountTitle")}
      sub={t("createAccountSub")}
    >
      <form onSubmit={submit} className="grid gap-4">
        <Field label={t("fullNameBusiness")}>
          <input
            required
            className="field"
            value={name}
            onChange={(e) => SN(e.target.value)}
            placeholder={t("name")}
          />
        </Field>
        <Field label={t("email")}>
          <input
            required
            type="email"
            className="field"
            value={email}
            onChange={(e) => SE(e.target.value)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label={t("joinAs")}>
          <select
            className="field"
            value={role}
            onChange={(e) => SR(e.target.value)}
          >
            <option>Farmer</option>
            <option>Wholesaler</option>
            <option>Buyer</option>
          </select>
        </Field>
        <Field label={t("password")}>
          <input
            required
            type="password"
            className="field"
            value={password}
            onChange={(e) => SP(e.target.value)}
            placeholder={t("passwordMin")}
          />
        </Field>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button className="btn-primary w-full mt-2">
          {t("createAccount")} <ArrowRight size={16} />
        </button>
      </form>
      <p className="text-xs text-center text-[#788477] mt-5">
        {t("alreadyAccount")}{" "}
        <Link className="font-bold text-[#397346]" to="/login">
          {t("login")}
        </Link>
      </p>
    </AuthShell>
  );
}
export function Login() {
  const [email, SE] = useState("");
  const [password, SP] = useState("");
  const [role, SR] = useState("Buyer");
  const { login, t } = useApp();
  const go = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    login(email.split("@")[0] || "Demo user", role, email);
    go("/dashboard");
  };
  return (
    <AuthShell
      title={t("welcomeBack")}
      sub={t("signInSub")}
    >
      <form onSubmit={submit} className="grid gap-4">
        <Field label={t("email")}>
          <input
            required
            type="email"
            className="field"
            value={email}
            onChange={(e) => SE(e.target.value)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label={t("password")}>
          <input
            required
            type="password"
            className="field"
            value={password}
            onChange={(e) => SP(e.target.value)}
            placeholder={t("anyPassword")}
          />
        </Field>
        <Field label={t("demoRole")}>
          <select
            className="field"
            value={role}
            onChange={(e) => SR(e.target.value)}
          >
            <option>Buyer</option>
            <option>Farmer</option>
            <option>Wholesaler</option>
            <option>Admin</option>
          </select>
        </Field>
        <button className="btn-primary w-full mt-2">
          {t("login")} <ArrowRight size={16} />
        </button>
      </form>
      <p className="text-xs text-center text-[#788477] mt-5">
        {t("newTo")}{" "}
        <Link className="font-bold text-[#397346]" to="/register">
          {t("createAnAccount")}
        </Link>
      </p>
    </AuthShell>
  );
}
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-bold block mb-2">{label}</span>
      {children}
    </label>
  );
}
function AuthShell({ title, sub, children }) {
  return (
    <main className="page-shell container grid lg:grid-cols-2 gap-12 items-center">
      <div className="hidden lg:block rounded-[28px] overflow-hidden min-h-[540px] relative">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1100&q=85"
        />
        <div className="absolute inset-0 bg-[#173c29]/65" />
        <div className="relative p-12 text-white mt-48">
          <Leaf size={34} />
          <h2 className="font-display text-4xl font-extrabold mt-5">
            Good trade starts at the source.
          </h2>
          <p className="text-white/70 leading-7 mt-4">
            A digital meeting place for Afghanistan's farmers, suppliers, and
            buyers.
          </p>
        </div>
      </div>
      <div className="max-w-md w-full mx-auto">
        <div className="flex items-center gap-2 text-[#245a34] font-display font-extrabold text-xl mb-10">
          <Leaf /> AGRIMARKET
        </div>
        <h1 className="font-display text-3xl font-extrabold">{title}</h1>
        <p className="muted mt-3 mb-8">{sub}</p>
        {children}
        <div className="mt-8 p-4 bg-[#f0f4eb] rounded-xl text-[11px] text-[#718071] flex gap-2">
          <ShieldCheck size={16} className="shrink-0" /> Demo authentication
          only. Credentials are not securely verified or sent to a backend.
        </div>
      </div>
    </main>
  );
}
