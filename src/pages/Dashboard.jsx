import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Heart,
  ShoppingBag,
  Settings,
  Plus,
  Trash2,
  Edit3,
  LogOut,
  Bell,
  Users,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Stat } from "../components/UI";
import { money, categories, provinces } from "../data/market";
export default function Dashboard() {
  const {
    user,
    items,
    addProduct,
    deleteProduct,
    inquiries,
    favorites,
    orders,
    setOrders,
    logout,
    setInquiries,
    notifications,
    markNotificationsRead,
    updateProfile,
    t,
  } = useApp();
  const [tab, setTab] = useState("Overview");
  const [showForm, setShowForm] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", business: user?.business || "", location: user?.location || "" });
  const [profileSaved, setProfileSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Fruits",
    description: "",
    price: "",
    unit: "kg",
    quantity: "",
    minimum: "",
    grade: "A",
    harvest: "",
    province: "Kabul",
    district: "",
    seller: user?.name || "",
    type: user?.role || "Farmer",
    location: "Kabul, Kabul",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=85",
  });
  if (!user)
    return (
      <main className="page-shell container text-center">
        <h1 className="section-title">{t("dashboardSignIn")}</h1>
        <Link to="/login" className="btn-primary mt-6">
          {t("login")}
        </Link>
      </main>
    );
  const isSeller = ["Farmer", "Wholesaler", "Admin"].includes(user.role);
  const mine = items.filter((p) => p.seller === user.name);
  const myInquiries = inquiries.filter((i) =>
    user.role === "Buyer" ? i.buyer === user.name : true,
  );
  const nav = isSeller
    ? [
        ["Overview", LayoutDashboard],
        ["My Products", Package],
        ["Inquiries", MessageSquare],
        ["Notifications", Bell],
        ["Profile Settings", Settings],
      ]
    : [
        ["Overview", LayoutDashboard],
        ["My Orders", ShoppingBag],
        ["Saved Products", Heart],
        ["My Inquiries", MessageSquare],
        ["Notifications", Bell],
        ["Profile Settings", Settings],
      ];
  const create = (e) => {
    e.preventDefault();
    addProduct({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
      minimum: Number(form.minimum),
      location: `${form.province}, ${form.district || form.province}`,
    });
    setShowForm(false);
    setTab("My Products");
    setForm({ ...form, name: "", price: "", quantity: "", minimum: "" });
  };
  const setStatus = (id, status) =>
    setInquiries((v) => v.map((x) => (x.id === id ? { ...x, status } : x)));
  return (
    <main className="page-shell bg-[#f5f6f1]">
      <div className="container">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
          <div>
            <div className="eyebrow">{user.role} workspace · demo</div>
            <h1 className="font-display text-3xl font-extrabold mt-2">
              Good day, {user.name.split(" ")[0]}.
            </h1>
            <p className="muted mt-2 text-sm">
              Here's what's happening in your marketplace workspace.
            </p>
          </div>
          <button onClick={logout} className="btn-outline !py-2.5">
            <LogOut size={15} /> Sign out
          </button>
        </div>
        <div className="grid lg:grid-cols-[230px_1fr] gap-6">
          <aside className="card p-4 h-fit">
            <div className="p-3 border-b mb-3">
              <div className="w-11 h-11 rounded-full bg-[#eaf2e5] text-[#32643b] grid place-items-center font-extrabold">
                {user.name.slice(0, 1).toUpperCase()}
              </div>
              <div className="font-bold mt-3">{user.name}</div>
              <div className="text-xs text-[#7a8679] mt-1">{user.role}</div>
              <span className="tag mt-3">Demo account</span>
            </div>
            <nav className="dashboard-nav grid gap-1">
              {nav.map(([n, I]) => (
                <button
                  key={n}
                  onClick={() => setTab(n)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-left text-[13px] font-semibold ${tab === n ? "bg-[#eaf2e5] text-[#245a34]" : "text-[#657165] hover:bg-[#f5f7f2]"}`}
                >
                  <I size={17} />
                  {t(({ Overview: "overview", "My Products": "myProducts", Inquiries: "inquiries", Notifications: "notifications", "Profile Settings": "profileSettings", "My Orders": "myOrders", "Saved Products": "savedProducts", "My Inquiries": "myInquiries" })[n] || n)}
                </button>
              ))}
              {user.role === "Admin" && (
                <button
                  onClick={() => setTab("Admin tools")}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-left text-[13px] font-semibold"
                >
                  <ShieldCheck size={17} />
                  {t("adminTools")}
                </button>
              )}
            </nav>
          </aside>
          <section className="min-w-0">
            {tab === "Overview" && (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {(isSeller
                    ? [
                        ["My listings", mine.length, Package],
                        ["Total inquiries", inquiries.length, MessageSquare],
                        ["Favorites", favorites.length, Heart],
                        ["Sample orders", orders.length, ShoppingBag],
                      ]
                    : [
                        ["Saved products", favorites.length, Heart],
                        ["My inquiries", myInquiries.length, MessageSquare],
                        ["Orders", orders.length, ShoppingBag],
                        ["Notifications", notifications.length, Bell],
                      ]
                  ).map(([l, v, I]) => (
                    <Stat key={l} label={l} value={v} icon={I} />
                  ))}
                </div>
                <div className="grid xl:grid-cols-[1.3fr_.7fr] gap-5 mt-5">
                  <div className="card p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-display font-extrabold text-lg">
                        {isSeller
                          ? "Your product listings"
                          : "Recently saved products"}
                      </h3>
                      {isSeller && (
                        <button
                          onClick={() => {
                            setTab("My Products");
                            setShowForm(true);
                          }}
                          className="btn-primary !py-2 !px-3 text-xs"
                        >
                          <Plus size={14} /> Add product
                        </button>
                      )}
                    </div>
                    {(isSeller
                      ? mine
                      : items.filter((p) => favorites.includes(p.id))
                    )
                      .slice(0, 4)
                      .map((p) => (
                        <div
                          className="flex items-center gap-3 py-4 border-b last:border-0"
                          key={p.id}
                        >
                          <img
                            src={p.image}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-bold text-sm">{p.name}</div>
                            <div className="text-xs text-[#7c887b]">
                              {p.location}
                            </div>
                          </div>
                          <strong className="text-sm text-[#2c6739]">
                            {money(p.price)}
                          </strong>
                        </div>
                      ))}
                    {(isSeller
                      ? mine
                      : items.filter((p) => favorites.includes(p.id))
                    ).length === 0 && (
                      <p className="muted text-sm py-8">
                        Nothing here yet. Your activity will appear as you use
                        the demo.
                      </p>
                    )}
                  </div>
                  <div className="card p-6">
                    <h3 className="font-display font-extrabold text-lg">
                      Quick actions
                    </h3>
                    <div className="grid gap-3 mt-5">
                      <button
                        onClick={() => {
                          setTab(isSeller ? "My Products" : "Saved Products");
                          setShowForm(isSeller);
                        }}
                        className="btn-outline justify-start"
                      >
                        <Plus size={16} />
                        {isSeller ? "Add a product" : "Browse products"}
                      </button>
                      <button
                        onClick={() =>
                          setTab(isSeller ? "Inquiries" : "My Inquiries")
                        }
                        className="btn-outline justify-start"
                      >
                        <MessageSquare size={16} />
                        View inquiries
                      </button>
                      <Link to="/marketplace" className="btn-outline">
                        <ShoppingBag size={16} />
                        Explore marketplace
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-[11px] text-[#929a90]">
                  All analytics and activity on this dashboard are local
                  demonstration data.
                </div>
              </>
            )}
            {tab === "My Products" && (
              <div className="card p-6">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="font-display text-xl font-extrabold">
                    Product management
                  </h2>
                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary !py-2 !px-3 text-xs"
                  >
                    <Plus size={15} /> Add product
                  </button>
                </div>
                {showForm && (
                  <form
                    onSubmit={create}
                    className="grid sm:grid-cols-2 gap-3 p-4 bg-[#f5f7f1] rounded-2xl mb-5"
                  >
                    {[
                      ["name", "Product name"],
                      ["price", "Price (AFN)"],
                      ["quantity", "Available quantity"],
                      ["minimum", "Minimum order"],
                      ["harvest", "Harvest date"],
                      ["district", "District"],
                    ].map(([k, l]) => (
                      <label key={k} className="text-xs font-bold">
                        {l}
                        <input
                          required
                          className="field mt-2"
                          type={
                            ["price", "quantity", "minimum"].includes(k)
                              ? "number"
                              : "text"
                          }
                          min="0"
                          value={form[k]}
                          onChange={(e) =>
                            setForm({ ...form, [k]: e.target.value })
                          }
                        />
                      </label>
                    ))}
                    <label className="text-xs font-bold">
                      Category
                      <select
                        className="field mt-2"
                        value={form.category}
                        onChange={(e) =>
                          setForm({ ...form, category: e.target.value })
                        }
                      >
                        {categories.map((c) => (
                          <option key={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs font-bold">
                      Unit
                      <select
                        className="field mt-2"
                        value={form.unit}
                        onChange={(e) =>
                          setForm({ ...form, unit: e.target.value })
                        }
                      >
                        {["kg", "ton", "bag", "box", "piece", "liter"].map(
                          (x) => (
                            <option key={x}>{x}</option>
                          ),
                        )}
                      </select>
                    </label>
                    <label className="text-xs font-bold">
                      Province
                      <select
                        className="field mt-2"
                        value={form.province}
                        onChange={(e) =>
                          setForm({ ...form, province: e.target.value })
                        }
                      >
                        {provinces.map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs font-bold sm:col-span-2">
                      Description
                      <textarea
                        className="field mt-2"
                        value={form.description}
                        onChange={(e) =>
                          setForm({ ...form, description: e.target.value })
                        }
                      />
                    </label>
                    <div className="sm:col-span-2 flex gap-2">
                      <button className="btn-primary">Save listing</button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
                <div className="grid gap-3">
                  {mine.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 border-b pb-3"
                    >
                      <img
                        src={p.image}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <strong className="text-sm">{p.name}</strong>
                        <div className="text-xs text-[#788477]">
                          {p.quantity} {p.unit} · {money(p.price)}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-2 text-red-500"
                        title="Delete listing"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}
                  {!mine.length && (
                    <p className="muted text-sm py-6">
                      You have not added any products yet.
                    </p>
                  )}
                </div>
              </div>
            )}
            {(tab === "Inquiries" || tab === "My Inquiries") && (
              <div className="card p-6">
                <h2 className="font-display text-xl font-extrabold mb-5">
                  {tab}
                </h2>
                {(tab === "My Inquiries" ? myInquiries : inquiries).map((i) => (
                  <div
                    key={i.id}
                    className="border-b py-4 flex flex-wrap justify-between gap-3"
                  >
                    <div>
                      <strong className="text-sm">{i.product}</strong>
                      <div className="text-xs text-[#7a8679] mt-1">
                        {i.buyer} · {i.quantity} requested · {i.date}
                      </div>
                      <p className="text-xs mt-2 text-[#5f6c60]">{i.message}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="tag">{i.status}</span>
                      {isSeller && (
                        <>
                          <button
                            onClick={() => setStatus(i.id, "Accepted")}
                            className="text-xs font-bold text-green-700"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => setStatus(i.id, "Declined")}
                            className="text-xs font-bold text-red-600"
                          >
                            Decline
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {!inquiries.length && (
                  <p className="muted text-sm">No inquiries yet.</p>
                )}
              </div>
            )}
            {tab === "Saved Products" && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {items
                  .filter((p) => favorites.includes(p.id))
                  .map((p) => (
                    <div className="card p-3" key={p.id}>
                      <img src={p.image} className="product-image" />
                      <strong className="block mt-3">{p.name}</strong>
                      <div className="text-sm text-[#2d6639] mt-2">
                        {money(p.price)} / {p.unit}
                      </div>
                      <Link
                        to={`/product/${p.id}`}
                        className="text-xs text-[#547e57] mt-3 block"
                      >
                        View product →
                      </Link>
                    </div>
                  ))}
              </div>
            )}
            {tab === "My Orders" && (
              <div className="card p-6">
                <h2 className="font-display text-xl font-extrabold mb-5">
                  Order tracking
                </h2>
                {orders.map((o) => (
                  <div
                    className="flex justify-between py-3 border-b text-sm"
                    key={o.id}
                  >
                    <span>{o.product}</span>
                    <span className="tag">{o.status}</span>
                  </div>
                ))}
                {!orders.length && (
                  <p className="muted text-sm">
                    No orders yet. Orders will appear here when a backend
                    trading workflow is connected.
                  </p>
                )}
              </div>
            )}
            {tab === "Notifications" && (
              <div className="card p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-xl font-extrabold">Notifications</h2>
                  <button type="button" onClick={markNotificationsRead} className="text-xs font-bold text-[#547e57]">{t("markRead")}</button>
                </div>
                {notifications.map((n) => (
                  <div key={n.id} className={`py-3 border-b text-sm ${n.read ? "opacity-70" : ""}`}>
                    <div className="flex items-start gap-2">
                      {!n.read && <span className="mt-1.5 h-2 w-2 rounded-full bg-[#6f955d]" />}
                      <div className="min-w-0">
                        <strong className="block text-sm">{n.title || "Notification"}</strong>
                        <p className="mt-1 text-sm">{n.text}</p>
                        {n.email && <p className="mt-1 text-xs text-[#6d7b6c]">{n.email}</p>}
                        <div className="text-xs text-[#849084] mt-1">{n.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {!notifications.length && (
                  <p className="muted text-sm">You're all caught up.</p>
                )}
              </div>
            )}
            {tab === "Profile Settings" && (
              <form className="card grid gap-4 p-6" onSubmit={(event) => { event.preventDefault(); updateProfile(profileForm); setProfileSaved(true); }}>
                <div>
                  <h2 className="font-display text-xl font-extrabold">Profile settings</h2>
                  <p className="muted mt-2 text-xs">Update the profile information shown in your AgriMarket account.</p>
                </div>
                <label className="grid gap-2 text-xs font-bold">{t("profileName")}
                  <input className="field" required value={profileForm.name} onChange={(e) => setProfileForm((v) => ({ ...v, name: e.target.value }))} />
                </label>
                <label className="grid gap-2 text-xs font-bold">{t("profileEmail")}
                  <input className="field" type="email" required value={profileForm.email} onChange={(e) => setProfileForm((v) => ({ ...v, email: e.target.value }))} />
                </label>
                <label className="grid gap-2 text-xs font-bold">{t("profilePhone")}
                  <input className="field" value={profileForm.phone} onChange={(e) => setProfileForm((v) => ({ ...v, phone: e.target.value }))} placeholder="+93 ..." />
                </label>
                <label className="grid gap-2 text-xs font-bold">{t("profileBusiness")}
                  <input className="field" value={profileForm.business} onChange={(e) => setProfileForm((v) => ({ ...v, business: e.target.value }))} />
                </label>
                <label className="grid gap-2 text-xs font-bold">{t("profileLocation")}
                  <input className="field" value={profileForm.location} onChange={(e) => setProfileForm((v) => ({ ...v, location: e.target.value }))} />
                </label>
                <div className="text-xs text-[#899287]">Account role: {user.role}</div>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="btn-primary w-fit" type="submit">{t("saveProfile")}</button>
                  {profileSaved && <span className="text-xs font-semibold text-green-700">{t("profileSaved")}</span>}
                </div>
              </form>
            )}
            {tab === "Admin tools" && (
              <div className="card p-6">
                <h2 className="font-display text-xl font-extrabold">
                  Admin overview
                </h2>
                <div className="grid sm:grid-cols-3 gap-3 mt-5">
                  <Stat label="Demo users" value="128" icon={Users} />
                  <Stat
                    label="Sample listings"
                    value={items.length}
                    icon={Package}
                  />
                  <Stat label="Pending review" value="3" icon={ShieldCheck} />
                </div>
                <p className="text-xs muted mt-5">
                  Administrative actions are not connected to a secure backend.
                  Sample users and approval counts are illustrative only.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
