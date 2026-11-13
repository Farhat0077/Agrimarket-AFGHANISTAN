import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Package,
  ShieldCheck,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { money } from "../data/market";
import { ProductCard } from "../components/UI";
export default function ProductDetails() {
  const { id } = useParams();
  const { items, favorites, toggleFavorite, user, sendInquiry, t } = useApp();
  const productNameKeys = { 1: "prodKandaharPomegranates", 2: "prodHeratSaffron", 3: "prodBalkhWheat", 4: "prodNangarharOranges", 5: "prodBadakhshanWalnuts", 6: "prodKandaharGrapes", 7: "prodHelmandLentils", 8: "prodSpinach", 9: "prodAlmonds" };
  const categoryKeys = { Fruits: "catFruits", Vegetables: "catVegetables", "Grains & Cereals": "catGrains", "Nuts & Seeds": "catNuts", Dairy: "catDairy", "Herbs & Spices": "catHerbs", Livestock: "catLivestock", Equipment: "catEquipment" };
  const p = items.find((x) => String(x.id) === id);
  const [qty, setQty] = useState("");
  const [message, setMessage] = useState(
    "I am interested in this product. Please share availability and delivery details.",
  );
  const [sent, setSent] = useState(false);
  if (!p)
    return (
      <main className="page-shell container">
        <h2 className="section-title">{t("productNotFound")}</h2>
        <Link className="btn-primary mt-5" to="/marketplace">
          {t("backMarketplace")}
        </Link>
      </main>
    );
  const submit = (e) => {
    e.preventDefault();
    sendInquiry({
      productId: p.id,
      product: p.name,
      seller: p.seller,
      buyer: user?.name || "Guest buyer",
      quantity: qty,
      message,
    });
    setSent(true);
  };
  return (
    <main className="page-shell">
      <div className="container">
        <Link
          to="/marketplace"
          className="text-xs font-bold text-[#668068] flex gap-2 items-center mb-7"
        >
          <ArrowLeft size={15} /> {t("backMarketplace")}
        </Link>
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <img
              src={p.image}
              className="w-full h-[430px] object-cover rounded-[26px] bg-[#edf1e8]"
            />
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-[#edf3e8] h-24 grid place-items-center text-3xl">
                🌿
              </div>
              <div className="rounded-xl bg-[#f1eee4] h-24 grid place-items-center text-3xl">
                🌾
              </div>
              <div className="rounded-xl bg-[#e8f0e8] h-24 grid place-items-center text-3xl">
                📦
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-2">
              <span className="tag">{t(categoryKeys[p.category] || p.category)}</span>
              {p.verified && (
                <span className="tag">
                  <CheckCircle2 size={12} /> {t("verified")}
                </span>
              )}
            </div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight mt-4">
              {t(productNameKeys[p.id] || p.name)}
            </h1>
            <p className="muted leading-7 mt-4">{p.description}</p>
            <div className="mt-7 p-5 bg-[#edf3e8] rounded-2xl">
              <div className="text-xs text-[#6e7d6e]">{t("listedPrice")}</div>
              <div className="font-display text-3xl font-extrabold text-[#245a34] mt-1">
                {money(p.price)}{" "}
                <span className="text-sm font-medium">/ {p.unit}</span>
              </div>
              <div className="text-xs text-[#738073] mt-2">
                {t("bulkPricing")}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <div>
                <div className="text-xs text-[#859084]">{t("availableQuantity")}</div>
                <strong className="block mt-1">
                  {p.quantity.toLocaleString()} {p.unit}
                </strong>
              </div>
              <div>
                <div className="text-xs text-[#859084]">{t("minimumOrder")}</div>
                <strong className="block mt-1">
                  {p.minimum} {p.unit}
                </strong>
              </div>
              <div>
                <div className="text-xs text-[#859084]">{t("qualityGrade")}</div>
                <strong className="block mt-1">{p.grade}</strong>
              </div>
              <div>
                <div className="text-xs text-[#859084]">{t("harvest")}</div>
                <strong className="block mt-1">{p.harvest}</strong>
              </div>
              <div className="col-span-2">
                <div className="text-xs text-[#859084]">
                  {t("productionLocation")}
                </div>
                <strong className="flex gap-1 items-center mt-1">
                  <MapPin size={15} />
                  {p.location.replace("Afghanistan", t("marketAfghanistan"))}
                </strong>
              </div>
            </div>
            <div className="border-y border-[#e7ebe3] py-5 mt-6 flex items-center justify-between">
              <div>
                <div className="text-xs text-[#859084]">{t("supplier")}</div>
                <strong className="block mt-1">{p.seller}</strong>
                <span className="text-xs text-[#748174]">{p.type}</span>
              </div>
              <ShieldCheck className="text-[#54815a]" size={27} />
            </div>
            <button
              onClick={() => toggleFavorite(p.id)}
              className="btn-outline w-full mt-5"
            >
              <Heart
                size={16}
                fill={favorites.includes(p.id) ? "#d65a54" : "none"}
              />{" "}
              {favorites.includes(p.id)
                ? t("savedFavorites")
                : t("addFavorites")}
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 mt-16">
          <div>
            <h2 className="font-display text-2xl font-extrabold">
              {t("productOverviewTitle")}
            </h2>
            <p className="muted leading-8 mt-4">
              {t("listingDisclaimer")}
            </p>
            <h3 className="font-display text-xl font-extrabold mt-8">
              {t("deliveryCollection")}
            </h3>
            <p className="muted leading-7 mt-3">
              {t("deliveryDescription")}
            </p>
          </div>
          <form onSubmit={submit} className="card p-6">
            <h3 className="font-display text-xl font-extrabold">
              {t("sendInquiry")}
            </h3>
            <p className="text-xs text-[#7b867a] mt-2">
              {t("contactSupplier")}
            </p>
            {sent ? (
              <div className="mt-6 p-4 rounded-xl bg-[#edf5e9] text-sm text-[#386d40]">
                {t("inquiryThanks")}
              </div>
            ) : (
              <>
                <label className="text-xs font-bold block mt-5 mb-2">
                  {t("quantity")} ({p.unit})
                </label>
                <input
                  required
                  min={p.minimum}
                  max={p.quantity}
                  type="number"
                  className="field"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  placeholder={`Minimum ${p.minimum}`}
                />
                <label className="text-xs font-bold block mt-4 mb-2">
                  {t("inquiryMessage")}
                </label>
                <textarea
                  className="field min-h-28"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="btn-primary w-full mt-5">
                  <Send size={15} /> {t("sendInquiry")}
                </button>
              </>
            )}
            <p className="text-[10px] text-[#929b90] mt-4">
              Frontend demo only. No message is sent to a real supplier.
            </p>
          </form>
        </div>
        <div className="mt-16">
          <h2 className="font-display text-2xl font-extrabold mb-6">
            {t("youMayLike")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items
              .filter((x) => x.id !== p.id && x.category === p.category)
              .slice(0, 4)
              .map((x) => (
                <ProductCard key={x.id} product={x} />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
