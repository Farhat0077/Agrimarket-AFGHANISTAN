import { Link } from "react-router-dom";
import { CheckCircle2, Heart, MapPin, Package } from "lucide-react";
import { money } from "../data/market";
import { useApp } from "../context/AppContext";
export function SectionHead({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5 mb-8">
      <div>
        <div className="eyebrow mb-3">{eyebrow}</div>
        <h2 className="section-title">{title}</h2>
        {description && (
          <p className="muted mt-3 max-w-xl leading-7">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
export function ProductCard({ product }) {
  const { favorites, toggleFavorite, t } = useApp();
  const productNameKeys = { 1: "prodKandaharPomegranates", 2: "prodHeratSaffron", 3: "prodBalkhWheat", 4: "prodNangarharOranges", 5: "prodBadakhshanWalnuts", 6: "prodKandaharGrapes", 7: "prodHelmandLentils", 8: "prodSpinach", 9: "prodAlmonds" };
  const categoryKeys = { Fruits: "catFruits", Vegetables: "catVegetables", "Grains & Cereals": "catGrains", "Nuts & Seeds": "catNuts", Dairy: "catDairy", "Herbs & Spices": "catHerbs", Livestock: "catLivestock", Equipment: "catEquipment" };
  return (
    <article className="card p-3 group">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            className="product-image transition duration-500 group-hover:scale-[1.015]"
            src={product.image}
            alt={product.name}
          />
        </Link>
        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label={t("toggleFavorite")}
          className="absolute right-3 top-3 rounded-full bg-white/95 p-2 shadow"
        >
          <Heart
            size={17}
            fill={favorites.includes(product.id) ? "#d65a54" : "none"}
            color={favorites.includes(product.id) ? "#d65a54" : "#536253"}
          />
        </button>
        {product.verified && (
          <span className="absolute left-3 top-3 tag">
            <CheckCircle2 size={12} /> {t("verified")}
          </span>
        )}
      </div>
      <div className="px-1 pt-4">
        <div className="flex justify-between gap-2 text-[11px] text-[#778176]">
          <span>{t(categoryKeys[product.category] || product.category)}</span>
          <span>{t("qualityGrade")}: {product.grade === "Premium" ? t("premium") : product.grade}</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-extrabold text-[16px] mt-2 hover:text-[#397346]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-3 flex items-baseline gap-1">
          <strong className="text-xl text-[#245b34]">
            {money(product.price)}
          </strong>
          <span className="text-xs text-[#7b857b]">/ {product.unit}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-[#edf0e9] flex flex-col gap-2 text-xs text-[#69756a]">
          <span className="flex items-center gap-1">
            <MapPin size={13} />
            {product.location}
          </span>
          <span className="flex items-center gap-1">
            <Package size={13} />
            {product.quantity.toLocaleString()} {product.unit} {t("available")} · {t("minimumOrder")}: {product.minimum}
          </span>
        </div>
        <div className="mt-3 text-xs font-semibold text-[#405b45]">
          {product.seller}
        </div>
      </div>
    </article>
  );
}
export function Stat({ label, value, icon: Icon }) {
  return (
    <div className="card p-5">
      <div className="flex justify-between items-center">
        <span className="text-xs text-[#748074] font-semibold">{label}</span>
        {Icon && <Icon size={18} className="text-[#54815a]" />}
      </div>
      <div className="font-display text-3xl font-extrabold mt-3 text-[#203d29]">
        {value}
      </div>
    </div>
  );
}
