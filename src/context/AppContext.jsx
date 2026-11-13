import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products as seed } from "../data/market";
const C = createContext(null);
export const useApp = () => useContext(C);
const readStored = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value == null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
};
export const translations = {
  en: {
    home: "Home", marketplace: "Marketplace", categories: "Categories", how: "How it works",
    about: "About us", contact: "Contact", login: "Log in", register: "Get started",
    search: "Search products", explore: "Explore marketplace", dashboard: "Dashboard", logout: "Log out",
    heroEyebrow: "Afghanistan’s agricultural marketplace",
    heroTitle: "Connecting Agriculture. Empowering Trade.",
    heroText: "Discover fresh agricultural products, connect directly with trusted farmers, and grow your business through Afghanistan’s agricultural marketplace.",
    exploreMarketplace: "Explore the marketplace", shopByCategory: "Shop by category",
    categoryIntro: "Explore a wide range of agricultural products from local producers and suppliers.",
    simpleAndStraightforward: "Simple and straightforward", howAgriMarketWorks: "How AgriMarket works",
    howIntro: "Three simple steps to discover products and build agricultural business connections.",
    aboutTitle: "A stronger connection between farm and market.",
    aboutIntro: "AGRIMARKET is a digital marketplace concept designed to connect farmers, wholesalers, retailers, and buyers across Afghanistan.",
    aboutEyebrow: "OUR PURPOSE · AFGHANISTAN", aboutStory: "From Kandahar pomegranates and Herat saffron to Balkh grains and Badakhshan nuts, our platform brings Afghanistan's agricultural diversity into one accessible digital marketplace.", aboutVisionLabel: "Our vision is to create", aboutWordLocal: "local farmers.", aboutWordConnections: "better connections.", aboutWordProduce: "fresh produce.", aboutWordCommunities: "stronger communities.", aboutExplore: "Explore the marketplace", aboutRoots: "Our roots", aboutRootsText: "A market with a local heart.", aboutPhotoAlt: "Rows of grapevines in a vineyard under warm evening sun", aboutPhotoEyebrow: "GROWING TOGETHER", aboutPhotoTitle: "Rooted in the land. Connected by purpose.", aboutValuesEyebrow: "WHAT WE BELIEVE IN", aboutValuesTitle: "More than a marketplace.", aboutValuesIntro: "We believe agricultural trade should be more accessible, connected and transparent for everyone.", aboutValueLocal: "Local first", aboutValueLocalDesc: "Built around Afghan regions, local farmers and seasonal produce.", aboutValueDirect: "Direct connections", aboutValueDirectDesc: "Helping buyers discover farmers and connect with suppliers.", aboutValueTrust: "Trust by design", aboutValueTrustDesc: "Clear listings and transparent demonstration workflows.", aboutGalleryEyebrow: "A CLOSER LOOK", aboutGalleryTitle: "The beauty of agriculture.", aboutGalleryIntro: "Discover the land, the harvest and the people behind agricultural products.", aboutGalleryHarvest: "The harvest season", aboutGalleryFresh: "Fresh from the farm", aboutGalleryFuture: "Growing a better future", aboutGalleryLand: "Cultivating the land", aboutGalleryCatHarvest: "THE HARVEST", aboutGalleryCatFresh: "FRESH PRODUCE", aboutGalleryCatFuture: "THE FUTURE", aboutGalleryCatLand: "THE LAND", aboutPreviousImage: "Previous image", aboutNextImage: "Next image", aboutCtaEyebrow: "DISCOVER THE DIFFERENCE", aboutCtaTitle: "Let's grow something meaningful together.", aboutCtaText: "Discover agricultural products and new connections across the Afghan marketplace.", aboutCtaButton: "Discover products", aboutDisclaimer: "This is a demonstration platform, not an operating trading company. Supplier identities, certifications, transactions, and market prices are not independently verified.",
    contactTitle: "Let’s grow something together.",
    contactIntro: "Have feedback about AGRIMARKET? Send us a message using this demo form.",
    contactEyebrow: "LET’S CONNECT", contactFormEyebrow: "SEND A MESSAGE", contactFormTitle: "We’d love to hear from you.", contactFormDescription: "Have a question about the marketplace? Send us a message.", contactThankYou: "Thank you!", contactDemoSuccess: "Your message has been received in this demo interface. It has not been sent to a server.", contactSendAnother: "Send another message", contactNamePlaceholder: "Your full name", contactEmailPlaceholder: "you@example.com", contactMessagePlaceholder: "Tell us how we can help...", contactDemoNote: "Demo form only — messages are not sent to a server.", contactImageEyebrow: "AGRICULTURE CONNECTS US", contactImageTitle: "Every connection starts with a conversation.", contactPlatformLabel: "Platform", contactPlatformValue: "Agricultural marketplace", contactCoverageLabel: "Regional reach", contactCoverageValue: "Across Afghanistan", contactMessageLabel: "Get in touch", contactMessageValue: "Send a message using this form", contactFollowUs: "Follow us",
    name: "Your name", email: "Email address", message: "Your message", send: "Send message",
    browseProducts: "Browse products", becomeSeller: "Become a seller", featuredSuppliers: "Featured suppliers",
    company: "Company", myAccount: "My account", footerPitch: "A better way to discover Afghan agricultural products, connect with local suppliers, and grow trade from farm to market.",
    footerCtaEyebrow: "Growing together", footerCtaTitle: "Connecting farms. Growing opportunities.",
    footerCtaText: "Discover agricultural products, connect with local suppliers, and help create stronger trade opportunities across Afghanistan.",
    footerCtaButton: "Explore marketplace", footerTagline: "Connecting Afghanistan's agricultural community.",
    chooseLanguage: "Choose language", switchLight: "Switch to light mode", switchDark: "Switch to dark mode",
    filters: "Filters", refineSearch: "Refine your search", reset: "Reset", category: "Category", allCategories: "All categories", province: "Province", allProvinces: "All provinces", sellerType: "Seller type", allSellers: "All sellers", farmers: "Farmers", wholesalers: "Wholesalers", buyers: "Buyers", searchPlaceholder: "Search products, sellers, locations...", newestFirst: "Newest first", lowestPrice: "Lowest price", highestPrice: "Highest price", mostStock: "Most stock", verifiedOnly: "Verified listings only", noProducts: "No products found", noProductsText: "We couldn't find products matching your search. Try adjusting your filters or exploring another category.", clearFilters: "Clear all filters", viewDetails: "View details", verified: "Verified", productOverview: "Product overview", listedPrice: "Listed price", availableQuantity: "Available quantity", minimumOrder: "Minimum order", qualityGrade: "Quality grade", harvest: "Harvest", productionLocation: "Production location", supplier: "Supplier", savedFavorites: "Saved to favorites", addFavorites: "Add to favorites", sendInquiry: "Send an inquiry", quantity: "Quantity", inquiryMessage: "Message", send: "Send message", dashboardSignIn: "Sign in to your dashboard", signOut: "Sign out", overview: "Overview", myProducts: "My Products", inquiries: "Inquiries", notifications: "Notifications", profileSettings: "Profile Settings", myOrders: "My Orders", savedProducts: "Saved Products", myInquiries: "My Inquiries", adminTools: "Admin tools" ,
    productNotFound: "Product not found", backMarketplace: "Back to marketplace",
    createAccountTitle: "Create your marketplace account", createAccountSub: "Join local agricultural trade and build new connections.",
    fullNameBusiness: "Full name or business name", joinAs: "I want to join as", password: "Password", passwordMin: "At least 6 characters",
    createAccount: "Create account", alreadyAccount: "Already have an account?", welcomeBack: "Welcome back", signInSub: "Sign in to continue to your AGRIMARKET workspace.",
    demoRole: "Demo role", anyPassword: "Any password for demo", newTo: "New to AGRIMARKET?", createAnAccount: "Create an account",
    heroSearchPlaceholder: "Search pomegranates, wheat, saffron...", exploreButton: "Explore Marketplace", acrossAfghanistan: "Across Afghanistan", productListings: "product listings", suppliers: "suppliers",
    stepAccount: "Create your account", stepAccountDesc: "Join AgriMarket as a farmer, wholesaler, or buyer and create your business profile.",
    stepDiscover: "Discover products", stepDiscoverDesc: "Explore agricultural products, compare offers, and connect with suppliers.",
    stepTrade: "Connect and trade", stepTradeDesc: "Contact sellers directly and build valuable agricultural business relationships.",
    marketEyebrow: "Afghanistan's digital produce market", agriculturalProducts: "Agricultural products", browseAvailable: "Browse available products and supplier listings", showing: "Showing", of: "of", supportingAgriculture: "Supporting Afghanistan's agriculture", marketTitle: "Explore the marketplace.", marketDescription: "Discover quality agricultural products directly from farmers and trusted suppliers across Afghanistan.", availableListings: "Available listings", browseCategories: "Browse categories", exploreProducts: "Explore products", allProducts: "All products", allGrades: "All grades", gradeA: "Grade A", gradeB: "Grade B", premium: "Premium", maximumPrice: "Maximum price", priceLimit: "Price limit", results: "results", result: "result", listView: "List view", gridView: "Grid view", noImage: "Product image", contactSupplier: "Contact the supplier about stock, bulk rates, or delivery.", messageReceived: "Your message has been received.",
    catFruits: "Fruits", catVegetables: "Vegetables", catGrains: "Grains & Cereals", catNuts: "Nuts & Seeds", catDairy: "Dairy", catHerbs: "Herbs & Spices", catLivestock: "Livestock", catEquipment: "Equipment",
    provinceKabul: "Kabul", provinceKandahar: "Kandahar", provinceHerat: "Herat", provinceBalkh: "Balkh", provinceNangarhar: "Nangarhar", provinceBadakhshan: "Badakhshan", provinceHelmand: "Helmand", provinceKunduz: "Kunduz", provinceParwan: "Parwan", provinceGhazni: "Ghazni",
    gradeLabel: "Quality grade", sellerFarmers: "Farmers", sellerWholesalers: "Wholesalers", maximumPriceLabel: "Maximum price", verifiedListings: "Verified listings only", searchMarketPlaceholder: "Search products, sellers, locations...", viewGrid: "Grid view", viewList: "List view", clearAll: "Clear all filters", filterResults: "Filter results", close: "Close", applyFilters: "Apply filters", available: "available", toggleFavorite: "Toggle favorite", profileName: "Full name", profileEmail: "Email address", profilePhone: "Phone number", profileBusiness: "Business / organization", profileLocation: "Location", saveProfile: "Save profile", profileSaved: "Profile saved on this device.", markRead: "Mark all as read", adminNotifications: "Admin notifications", newMessage: "New message", allCaughtUp: "You're all caught up.", openAdminDashboard: "Open admin dashboard", bulkPricing: "Bulk pricing may be discussed directly with the supplier.", productOverviewTitle: "Product overview", listingDisclaimer: "This listing is part of the AGRIMARKET demonstration catalogue. Product specifications, stock, pricing, seller identity, and availability are sample information and must be confirmed with a supplier before any real-world trade.", deliveryCollection: "Delivery & collection", deliveryDescription: "Delivery arrangements are coordinated directly between buyer and supplier. Transport cost, route availability, packaging, and delivery date should be agreed before confirming a purchase.", inquiryThanks: "Your demo inquiry has been saved. You can view it in your dashboard.", youMayLike: "You may also like",

    homeSeasonEyebrow: 'Seasonal selection',
    homeSeasonTitle: 'Harvest of the season',
    homeSeasonDesc: 'Discover agricultural products and regional specialties from Afghanistan.',
    harvestFresh: 'Fresh harvest',
    harvestPremium: 'Premium quality',
    harvestFarmDirect: 'Farm direct',
    harvestPomegranateDesc: 'Freshly harvested, naturally sweet Afghan pomegranates, known for their rich flavor and vibrant color.',
    harvestSaffronDesc: 'Premium-quality saffron carefully harvested from the renowned agricultural fields of Herat.',
    harvestWheatDesc: 'Quality wheat sourced from local agricultural producers and regional farming communities.',
    homeExploreProduct: 'Explore product',
    homePreviousHarvest: 'Previous harvest',
    homeNextHarvest: 'Next harvest',
    homeHowEyebrow: 'Simple and straightforward',
    homeHowTitle: 'How AgriMarket works',
    homeHowDesc: 'Three simple steps to discover products and build agricultural business connections.',
    homeBenefitsEyebrow: 'A stronger agricultural network',
    homeBenefitsTitle: 'Bringing agricultural opportunities closer.',
    homeBenefitsDesc: "Agriculture is an important part of Afghanistan's economy. AgriMarket aims to make it easier for agricultural businesses to discover products, reach new customers, and build lasting connections.",
    homeMission: 'Discover our mission',
    benefitTrusted: 'Trusted connections',
    benefitTrustedDesc: 'Find suppliers and buyers through a marketplace designed to support reliable business relationships.',
    benefitAccess: 'Wider market access',
    benefitAccessDesc: 'Help agricultural businesses reach customers and trading opportunities across Afghanistan.',
    benefitFarmers: 'Supporting farmers',
    benefitFarmersDesc: 'Give local producers a digital platform to showcase their harvest and grow their businesses.',
    homeRegionsEyebrow: 'From every corner of the country',
    homeRegionsTitle: "Afghanistan's agricultural regions",
    homeRegionsDesc: 'Discover the agricultural specialties associated with different regions of Afghanistan.',
    homeAgriculturalRegions: 'Agricultural regions',
    homeAgriculturalRegion: 'Agricultural region',
    homeExploreRegion: 'Explore region',
    homeRotationPaused: 'Rotation paused',
    homeDiscoverRegions: 'Discover our regions',
    regionKandahar: 'Pomegranates & grapes',
    regionHerat: 'Saffron & dried fruits',
    regionBalkh: 'Wheat & grains',
    regionNangarhar: 'Citrus & vegetables',
    homeFeaturedEyebrow: 'Meet the people behind the products',
    homeFeaturedTitle: 'Featured suppliers',
    homeFeaturedDesc: 'Discover agricultural suppliers and businesses participating in the marketplace.',
    homeSupplierType: 'Agricultural supplier',
    homeSupplierEmpty: 'Supplier profiles will appear here as businesses join.',
    homeDiscoverMarket: 'Discover the marketplace',
    homeGrowEyebrow: 'Grow with AgriMarket',
    homeGrowTitle: 'Your products deserve a bigger market.',
    homeGrowDesc: 'Whether you grow, supply, or buy agricultural products, there is a place for you in our marketplace.',
    homeJoinMarket: 'Join the marketplace',
    homeBrowseProducts: 'Browse products',
    homeFaqEyebrow: 'Need to know more?',
    homeFaqTitle: 'Frequently asked questions.',
    homeFaqDesc: 'Learn more about using AgriMarket and connecting with agricultural businesses.',
    homeContactTeam: 'Contact our team',
    faqWhat: 'What is AgriMarket?',
    faqWhatAnswer: 'AgriMarket is an online agricultural marketplace that helps farmers, wholesalers, and buyers discover products and connect with one another.',
    faqWho: 'Who can use the platform?',
    faqWhoAnswer: 'Farmers, agricultural suppliers, wholesalers, retailers, and buyers can create accounts and use the platform.',
    faqAdvertise: 'Can farmers advertise their products?',
    faqAdvertiseAnswer: 'Yes. Farmers can create listings with product details, photos, prices, and location so potential buyers can discover their products.',
    faqRegions: 'Does AgriMarket support different regions?',
    faqRegionsAnswer: 'The platform is designed to connect agricultural businesses across Afghanistan and showcase products from different provinces.',
    homeStatProducts: 'Product listings',
    homeStatSuppliers: 'Suppliers',
    homeStatCategories: 'Categories',
    homeStatProvinces: 'Provinces to connect',
    homeHeroStrip: 'Growing together. Trading smarter.',
    homeHeroAudience: 'FARMERS · WHOLESALERS · BUYERS',
    marketDemoNotice: 'Product listings and prices are sample data for this frontend demonstration.',
    marketActiveFilters: 'Active filters:',
    marketVerified: 'Verified',
    marketMax: 'Max:',
    marketAfghanistan: 'Afghanistan',
    marketAvailableListings: 'Available listings',

    harvestPomegranate: 'Kandahar Pomegranates',
    harvestSaffron: 'Herat Saffron',
    harvestWheat: 'Afghan Wheat',
    homeShowHarvest: 'Show',
    marketSortNewest: 'Newest',
    marketSortLow: 'Lowest price',
    marketSortHigh: 'Highest price',
    marketSortStock: 'Most stock',

    prodKandaharPomegranates: 'Kandahar Red Pomegranates',
    prodHeratSaffron: 'Herat Premium Saffron',
    prodBalkhWheat: 'Balkh Golden Wheat',
    prodNangarharOranges: 'Nangarhar Fresh Oranges',
    prodBadakhshanWalnuts: 'Badakhshan Walnuts',
    prodKandaharGrapes: 'Kandahar Black Grapes',
    prodHelmandLentils: 'Helmand Red Lentils',
    prodSpinach: 'Fresh Spinach Bundles',
    prodAlmonds: 'Afghan Almonds',

    homeFeaturedProductsEyebrow: "Discover what's available",
    homeFeaturedProductsTitle: 'Featured products',
    homeFeaturedProductsDesc: 'Explore agricultural listings shared by producers and suppliers.',
    homeProductsSoon: 'Products are coming soon',
    homeBeFirst: 'Be among the first to discover agricultural listings.',
    homeViewAllProducts: 'View all products',
  },
  fa: {
    home: "خانه", marketplace: "بازار", categories: "دسته‌بندی‌ها", how: "نحوهٔ کار",
    about: "دربارهٔ ما", contact: "تماس", login: "ورود", register: "شروع کنید",
    search: "جستجوی محصولات", explore: "مشاهدهٔ بازار", dashboard: "داشبورد", logout: "خروج",
    heroEyebrow: "بازار محصولات زراعتی افغانستان",
    heroTitle: "پیوند زراعت، توانمندسازی تجارت",
    heroText: "محصولات تازهٔ زراعتی را بیابید، مستقیماً با کشاورزان مورد اعتماد ارتباط بگیرید و تجارت خود را در بازار زراعتی افغانستان گسترش دهید.",
    exploreMarketplace: "کاوش در بازار", shopByCategory: "خرید بر اساس دسته‌بندی",
    categoryIntro: "انواع محصولات زراعتی را از تولیدکنندگان و عرضه‌کنندگان محلی بررسی کنید.",
    simpleAndStraightforward: "ساده و روشن", howAgriMarketWorks: "اگری‌مارکت چگونه کار می‌کند؟",
    howIntro: "با سه گام ساده محصولات را پیدا کنید و ارتباطات تجاری زراعتی بسازید.",
    aboutTitle: "پیوندی نیرومندتر میان مزرعه و بازار.",
    aboutIntro: "اگری‌مارکت یک بازار دیجیتالی است که کشاورزان، عمده‌فروشان، خرده‌فروشان و خریداران را در سراسر افغانستان به هم وصل می‌کند.",
    aboutEyebrow: "هدف ما · افغانستان", aboutStory: "از انار قندهار و زعفران هرات تا غلات بلخ و مغزهای بدخشان، پلتفرم ما تنوع زراعتی افغانستان را در یک بازار دیجیتالی و در دسترس گرد هم می‌آورد.", aboutVisionLabel: "چشم‌انداز ما ایجادِ", aboutWordLocal: "فرصت برای کشاورزان محلی است.", aboutWordConnections: "ارتباطات بهتر است.", aboutWordProduce: "محصولات تازه است.", aboutWordCommunities: "جوامع نیرومندتر است.", aboutExplore: "مشاهدهٔ بازار", aboutRoots: "ریشه‌های ما", aboutRootsText: "بازاری با قلبی محلی.", aboutPhotoAlt: "ردیف‌های تاکستان زیر نور گرم غروب", aboutPhotoEyebrow: "رشد در کنار هم", aboutPhotoTitle: "ریشه در خاک؛ پیوند با هدف.", aboutValuesEyebrow: "باورهای ما", aboutValuesTitle: "فراتر از یک بازار.", aboutValuesIntro: "ما باور داریم تجارت زراعتی باید برای همه در دسترس‌تر، پیوسته‌تر و شفاف‌تر باشد.", aboutValueLocal: "اولویت با تولید محلی", aboutValueLocalDesc: "بر پایهٔ مناطق افغانستان، کشاورزان محلی و محصولات فصلی ساخته شده است.", aboutValueDirect: "ارتباط مستقیم", aboutValueDirectDesc: "به خریداران کمک می‌کنیم کشاورزان را پیدا کنند و با عرضه‌کنندگان ارتباط بگیرند.", aboutValueTrust: "اعتماد در طراحی", aboutValueTrustDesc: "آگهی‌های روشن و روندهای آزمایشی شفاف.", aboutGalleryEyebrow: "نگاهی نزدیک‌تر", aboutGalleryTitle: "زیبایی زراعت.", aboutGalleryIntro: "با زمین، فصل برداشت و مردمی آشنا شوید که در پس محصولات زراعتی قرار دارند.", aboutGalleryHarvest: "فصل برداشت", aboutGalleryFresh: "تازه از مزرعه", aboutGalleryFuture: "ساختن آینده‌ای بهتر", aboutGalleryLand: "کشت و پرورش زمین", aboutGalleryCatHarvest: "فصل برداشت", aboutGalleryCatFresh: "محصولات تازه", aboutGalleryCatFuture: "آینده", aboutGalleryCatLand: "زمین", aboutPreviousImage: "تصویر قبلی", aboutNextImage: "تصویر بعدی", aboutCtaEyebrow: "تفاوت را کشف کنید", aboutCtaTitle: "بیایید با هم آینده‌ای پربار بسازیم.", aboutCtaText: "محصولات زراعتی و ارتباطات تازه را در بازار افغانستان کشف کنید.", aboutCtaButton: "مشاهدهٔ محصولات", aboutDisclaimer: "این پلتفرم نمایشی است و یک شرکت تجاری فعال نیست. هویت عرضه‌کنندگان، گواهی‌نامه‌ها، معاملات و قیمت‌های بازار به‌طور مستقل تأیید نشده‌اند.",
    contactTitle: "بیایید با هم رشد کنیم.",
    contactIntro: "نظر یا پیشنهادی دربارهٔ اگری‌مارکت دارید؟ از طریق این فورم آزمایشی برای ما پیام بفرستید.",
    contactEyebrow: "بیایید در ارتباط باشیم", contactFormEyebrow: "پیام بفرستید", contactFormTitle: "خوشحال می‌شویم از شما بشنویم.", contactFormDescription: "دربارهٔ بازار پرسشی دارید؟ برای ما پیام بفرستید.", contactThankYou: "سپاسگزاریم!", contactDemoSuccess: "پیام شما در این محیط نمایشی دریافت شد؛ اما به سرور فرستاده نشده است.", contactSendAnother: "ارسال پیام دیگر", contactNamePlaceholder: "نام کامل شما", contactEmailPlaceholder: "you@example.com", contactMessagePlaceholder: "بگویید چگونه می‌توانیم کمک کنیم...", contactDemoNote: "این فورم نمایشی است؛ پیام‌ها به سرور فرستاده نمی‌شوند.", contactImageEyebrow: "زراعت ما را به هم پیوند می‌دهد", contactImageTitle: "هر ارتباطی با یک گفتگو آغاز می‌شود.", contactPlatformLabel: "پلتفرم", contactPlatformValue: "بازار محصولات زراعتی", contactCoverageLabel: "گسترهٔ فعالیت", contactCoverageValue: "در سراسر افغانستان", contactMessageLabel: "ارتباط با ما", contactMessageValue: "از طریق این فورم پیام بفرستید", contactFollowUs: "ما را دنبال کنید",
    name: "نام شما", email: "آدرس ایمیل", message: "پیام شما", send: "ارسال پیام",
    browseProducts: "مشاهدهٔ محصولات", becomeSeller: "فروشنده شوید", featuredSuppliers: "عرضه‌کنندگان برگزیده",
    company: "شرکت", myAccount: "حساب من", footerPitch: "راهی بهتر برای یافتن محصولات زراعتی افغانستان، ارتباط با عرضه‌کنندگان محلی و گسترش تجارت از مزرعه تا بازار.",
    footerCtaEyebrow: "رشد با هم", footerCtaTitle: "مزارع را پیوند می‌دهیم؛ فرصت‌ها را گسترش می‌دهیم.",
    footerCtaText: "محصولات زراعتی را کشف کنید، با عرضه‌کنندگان محلی ارتباط بگیرید و به ایجاد فرصت‌های تجاری بهتر در افغانستان کمک کنید.",
    footerCtaButton: "مشاهدهٔ بازار", footerTagline: "پیونددهندهٔ جامعهٔ زراعتی افغانستان.",
    chooseLanguage: "انتخاب زبان", switchLight: "تغییر به حالت روشن", switchDark: "تغییر به حالت تاریک",
    filters: "فیلترها", refineSearch: "جستجوی خود را دقیق‌تر کنید", reset: "بازنشانی", category: "دسته‌بندی", allCategories: "همهٔ دسته‌بندی‌ها", province: "ولایت", allProvinces: "همهٔ ولایت‌ها", sellerType: "نوع فروشنده", allSellers: "همهٔ فروشندگان", farmers: "کشاورزان", wholesalers: "عمده‌فروشان", buyers: "خریداران", searchPlaceholder: "جستجوی محصولات، فروشندگان و موقعیت‌ها...", newestFirst: "جدیدترین", lowestPrice: "ارزان‌ترین", highestPrice: "گران‌ترین", mostStock: "بیشترین موجودی", verifiedOnly: "فقط آگهی‌های تأییدشده", noProducts: "محصولی پیدا نشد", noProductsText: "محصولی مطابق جستجوی شما پیدا نشد. فیلترها را تغییر دهید یا دسته‌بندی دیگری را بررسی کنید.", clearFilters: "پاک کردن همهٔ فیلترها", viewDetails: "مشاهدهٔ جزئیات", verified: "تأییدشده", productOverview: "نمای کلی محصول", listedPrice: "قیمت ثبت‌شده", availableQuantity: "مقدار موجود", minimumOrder: "حداقل سفارش", qualityGrade: "درجهٔ کیفیت", harvest: "برداشت", productionLocation: "محل تولید", supplier: "عرضه‌کننده", savedFavorites: "به علاقه‌مندی‌ها افزوده شد", addFavorites: "افزودن به علاقه‌مندی‌ها", sendInquiry: "ارسال درخواست", quantity: "مقدار", inquiryMessage: "پیام", dashboardSignIn: "برای ورود به داشبورد وارد شوید", signOut: "خروج", overview: "نمای کلی", myProducts: "محصولات من", inquiries: "درخواست‌ها", notifications: "اعلان‌ها", profileSettings: "تنظیمات نمایه", myOrders: "سفارش‌های من", savedProducts: "محصولات ذخیره‌شده", myInquiries: "درخواست‌های من", adminTools: "ابزارهای مدیر",
    productNotFound: "محصول پیدا نشد", backMarketplace: "بازگشت به بازار",
    createAccountTitle: "ایجاد حساب بازار", createAccountSub: "به تجارت زراعتی محلی بپیوندید و ارتباطات تازه بسازید.",
    fullNameBusiness: "نام کامل یا نام تجارت", joinAs: "می‌خواهم به‌عنوان ... بپیوندم", password: "رمز عبور", passwordMin: "حداقل ۶ حرف",
    createAccount: "ایجاد حساب", alreadyAccount: "از قبل حساب دارید؟", welcomeBack: "خوش آمدید", signInSub: "برای ادامه به فضای کاری اگری‌مارکت وارد شوید.",
    demoRole: "نقش آزمایشی", anyPassword: "هر رمز عبوری برای نسخهٔ آزمایشی", newTo: "در اگری‌مارکت تازه هستید؟", createAnAccount: "حساب بسازید",
    heroSearchPlaceholder: "انار، گندم، زعفران جستجو کنید...", exploreButton: "مشاهدهٔ بازار", acrossAfghanistan: "در سراسر افغانستان", productListings: "فهرست محصولات", suppliers: "عرضه‌کنندگان",
    stepAccount: "حساب خود را بسازید", stepAccountDesc: "به‌عنوان کشاورز، عمده‌فروش یا خریدار به اگری‌مارکت بپیوندید و نمایهٔ تجاری بسازید.",
    stepDiscover: "محصولات را بیابید", stepDiscoverDesc: "محصولات زراعتی را بررسی کنید، پیشنهادها را مقایسه کنید و با عرضه‌کنندگان ارتباط بگیرید.",
    stepTrade: "ارتباط بگیرید و تجارت کنید", stepTradeDesc: "مستقیماً با فروشندگان تماس بگیرید و روابط تجاری ارزشمند بسازید.",
    marketEyebrow: "بازار دیجیتال محصولات زراعتی افغانستان", agriculturalProducts: "محصولات زراعتی", browseAvailable: "محصولات موجود و فهرست عرضه‌کنندگان را ببینید", showing: "نمایش", of: "از", supportingAgriculture: "حمایت از زراعت افغانستان", marketTitle: "بازار را بررسی کنید.", marketDescription: "محصولات باکیفیت زراعتی را مستقیماً از کشاورزان و عرضه‌کنندگان معتبر سراسر افغانستان پیدا کنید.", availableListings: "محصولات موجود", browseCategories: "دسته‌بندی‌ها را ببینید", exploreProducts: "محصولات را بررسی کنید", allProducts: "همهٔ محصولات", allGrades: "همهٔ درجه‌ها", gradeA: "درجه A", gradeB: "درجه B", premium: "اعلی", maximumPrice: "حداکثر قیمت", priceLimit: "محدودیت قیمت", results: "نتیجه", result: "نتیجه", listView: "نمای فهرستی", gridView: "نمای شبکه‌ای", noImage: "تصویر محصول", contactSupplier: "برای موجودی، قیمت عمده یا تحویل با عرضه‌کننده تماس بگیرید.", messageReceived: "پیام شما دریافت شد.",
    catFruits: "میوه‌ها", catVegetables: "سبزیجات", catGrains: "غلات و حبوبات", catNuts: "مغزها و دانه‌ها", catDairy: "لبنیات", catHerbs: "گیاهان و ادویه‌جات", catLivestock: "دامداری", catEquipment: "تجهیزات",
    provinceKabul: "کابل", provinceKandahar: "قندهار", provinceHerat: "هرات", provinceBalkh: "بلخ", provinceNangarhar: "ننگرهار", provinceBadakhshan: "بدخشان", provinceHelmand: "هلمند", provinceKunduz: "کندز", provinceParwan: "پروان", provinceGhazni: "غزنی",
    gradeLabel: "درجهٔ کیفیت", sellerFarmers: "کشاورزان", sellerWholesalers: "عمده‌فروشان", maximumPriceLabel: "حداکثر قیمت", verifiedListings: "فقط محصولات تأییدشده", searchMarketPlaceholder: "جستجوی محصولات، فروشندگان و موقعیت‌ها...", viewGrid: "نمای شبکه‌ای", viewList: "نمای فهرستی", clearAll: "پاک کردن همهٔ فیلترها", filterResults: "فیلتر نتایج", close: "بستن", applyFilters: "اعمال فیلترها", available: "موجود", toggleFavorite: "تغییر علاقه‌مندی", profileName: "نام کامل", profileEmail: "نشانی ایمیل", profilePhone: "شماره تماس", profileBusiness: "کسب‌وکار / سازمان", profileLocation: "موقعیت", saveProfile: "ذخیرهٔ نمایه", profileSaved: "نمایه در این دستگاه ذخیره شد.", markRead: "همه را خوانده‌شده علامت بزن", adminNotifications: "اعلان‌های مدیر", newMessage: "پیام جدید", allCaughtUp: "همهٔ پیام‌ها بررسی شده‌اند.", openAdminDashboard: "باز کردن داشبورد مدیر", bulkPricing: "قیمت عمده را می‌توانید مستقیماً با عرضه‌کننده گفتگو کنید.", productOverviewTitle: "نمای کلی محصول", listingDisclaimer: "این آگهی بخشی از فهرست آزمایشی اگری‌مارکت است. مشخصات محصول، موجودی، قیمت، هویت فروشنده و موجودی واقعی نمونه‌ای هستند و پیش از هر معامله باید با عرضه‌کننده تأیید شوند.", deliveryCollection: "تحویل و دریافت", deliveryDescription: "جزئیات تحویل مستقیماً میان خریدار و عرضه‌کننده هماهنگ می‌شود. هزینهٔ انتقال، مسیر، بسته‌بندی و تاریخ تحویل باید پیش از خرید توافق شود.", inquiryThanks: "درخواست آزمایشی شما ذخیره شد. می‌توانید آن را در داشبورد ببینید.", youMayLike: "محصولات مشابه",

    homeSeasonEyebrow: 'گزیدهٔ فصل',
    homeSeasonTitle: 'محصولات فصل',
    homeSeasonDesc: 'محصولات زراعتی و فرآورده\u200cهای ویژهٔ مناطق مختلف افغانستان را کشف کنید.',
    harvestFresh: 'برداشت تازه',
    harvestPremium: 'کیفیت ممتاز',
    harvestFarmDirect: 'مستقیم از مزرعه',
    harvestPomegranateDesc: 'انارهای تازه\u200cبرداشت\u200cشده و طبیعی افغانستان با طعم غنی و رنگ درخشان.',
    harvestSaffronDesc: 'زعفران باکیفیت که با دقت از کشتزارهای شناخته\u200cشدهٔ هرات برداشت شده است.',
    harvestWheatDesc: 'گندم باکیفیت از تولیدکنندگان محلی و جوامع کشاورزی منطقه\u200cای.',
    homeExploreProduct: 'مشاهدهٔ محصول',
    homePreviousHarvest: 'محصول قبلی',
    homeNextHarvest: 'محصول بعدی',
    homeHowEyebrow: 'ساده و روشن',
    homeHowTitle: 'اگری\u200cمارکت چگونه کار می\u200cکند؟',
    homeHowDesc: 'با سه گام ساده محصولات را پیدا کنید و ارتباطات تجاری زراعتی بسازید.',
    homeBenefitsEyebrow: 'شبکهٔ زراعتی نیرومندتر',
    homeBenefitsTitle: 'فرصت\u200cهای زراعتی را نزدیک\u200cتر می\u200cسازیم.',
    homeBenefitsDesc: 'زراعت بخش مهمی از اقتصاد افغانستان است. اگری\u200cمارکت می\u200cخواهد به کسب\u200cوکارهای زراعتی کمک کند تا محصولات را بیابند، به مشتریان تازه دسترسی پیدا کنند و ارتباطات پایدار بسازند.',
    homeMission: 'آشنایی با مأموریت ما',
    benefitTrusted: 'ارتباطات قابل اعتماد',
    benefitTrustedDesc: 'عرضه\u200cکنندگان و خریداران را از طریق بازاری بیابید که برای پشتیبانی از روابط تجاری مطمئن طراحی شده است.',
    benefitAccess: 'دسترسی گسترده\u200cتر به بازار',
    benefitAccessDesc: 'به کسب\u200cوکارهای زراعتی کمک کنید تا به مشتریان و فرصت\u200cهای تجاری در سراسر افغانستان دسترسی یابند.',
    benefitFarmers: 'پشتیبانی از کشاورزان',
    benefitFarmersDesc: 'برای تولیدکنندگان محلی بستری دیجیتالی فراهم کنید تا محصولات خود را معرفی کرده و تجارت\u200cشان را گسترش دهند.',
    homeRegionsEyebrow: 'از هر گوشهٔ کشور',
    homeRegionsTitle: 'مناطق زراعتی افغانستان',
    homeRegionsDesc: 'با محصولات و فرآورده\u200cهای ویژهٔ زراعتی مناطق مختلف افغانستان آشنا شوید.',
    homeAgriculturalRegions: 'مناطق زراعتی',
    homeAgriculturalRegion: 'منطقهٔ زراعتی',
    homeExploreRegion: 'مشاهدهٔ منطقه',
    homeRotationPaused: 'چرخش متوقف شد',
    homeDiscoverRegions: 'کشف مناطق افغانستان',
    regionKandahar: 'انار و انگور',
    regionHerat: 'زعفران و میوه\u200cهای خشک',
    regionBalkh: 'گندم و غلات',
    regionNangarhar: 'مرکبات و سبزیجات',
    homeFeaturedEyebrow: 'آشنایی با تولیدکنندگان',
    homeFeaturedTitle: 'عرضه\u200cکنندگان برگزیده',
    homeFeaturedDesc: 'با عرضه\u200cکنندگان و کسب\u200cوکارهای زراعتی فعال در بازار آشنا شوید.',
    homeSupplierType: 'عرضه\u200cکنندهٔ محصولات زراعتی',
    homeSupplierEmpty: 'با پیوستن کسب\u200cوکارها، نمایهٔ عرضه\u200cکنندگان در این بخش نمایش داده می\u200cشود.',
    homeDiscoverMarket: 'مشاهدهٔ بازار',
    homeGrowEyebrow: 'با اگری\u200cمارکت رشد کنید',
    homeGrowTitle: 'محصولات شما شایستهٔ بازاری بزرگ\u200cتر هستند.',
    homeGrowDesc: 'چه تولیدکننده باشید، چه عرضه\u200cکننده یا خریدار محصولات زراعتی، در بازار ما جای شما هست.',
    homeJoinMarket: 'پیوستن به بازار',
    homeBrowseProducts: 'مشاهدهٔ محصولات',
    homeFaqEyebrow: 'می\u200cخواهید بیشتر بدانید؟',
    homeFaqTitle: 'پرسش\u200cهای متداول',
    homeFaqDesc: 'دربارهٔ استفاده از اگری\u200cمارکت و ارتباط با کسب\u200cوکارهای زراعتی بیشتر بدانید.',
    homeContactTeam: 'تماس با تیم ما',
    faqWhat: 'اگری\u200cمارکت چیست؟',
    faqWhatAnswer: 'اگری\u200cمارکت یک بازار آنلاین زراعتی است که به کشاورزان، عمده\u200cفروشان و خریداران کمک می\u200cکند محصولات را پیدا کرده و با یکدیگر ارتباط بگیرند.',
    faqWho: 'چه کسانی می\u200cتوانند از این پلتفرم استفاده کنند؟',
    faqWhoAnswer: 'کشاورزان، عرضه\u200cکنندگان زراعتی، عمده\u200cفروشان، خرده\u200cفروشان و خریداران می\u200cتوانند حساب بسازند و از این پلتفرم استفاده کنند.',
    faqAdvertise: 'آیا کشاورزان می\u200cتوانند محصولات خود را اعلان کنند؟',
    faqAdvertiseAnswer: 'بله. کشاورزان می\u200cتوانند با افزودن جزئیات محصول، عکس، قیمت و موقعیت، آگهی بسازند تا خریداران بالقوه محصولات\u200cشان را پیدا کنند.',
    faqRegions: 'آیا اگری\u200cمارکت از مناطق مختلف پشتیبانی می\u200cکند؟',
    faqRegionsAnswer: 'این پلتفرم برای پیوند دادن کسب\u200cوکارهای زراعتی در سراسر افغانستان و معرفی محصولات ولایت\u200cهای گوناگون طراحی شده است.',
    homeStatProducts: 'فهرست محصولات',
    homeStatSuppliers: 'عرضه\u200cکنندگان',
    homeStatCategories: 'دسته\u200cبندی\u200cها',
    homeStatProvinces: 'ولایت\u200cهای قابل پیوند',
    homeHeroStrip: 'با هم رشد می\u200cکنیم؛ هوشمندانه\u200cتر تجارت می\u200cکنیم.',
    homeHeroAudience: 'کشاورزان · عمده\u200cفروشان · خریداران',
    marketDemoNotice: 'فهرست محصولات و قیمت\u200cها، اطلاعات نمونه برای نمایش نسخهٔ آزمایشی این وب\u200cسایت هستند.',
    marketActiveFilters: 'فیلترهای فعال:',
    marketVerified: 'تأییدشده',
    marketMax: 'حداکثر:',
    marketAfghanistan: 'افغانستان',
    marketAvailableListings: 'محصولات موجود',

    harvestPomegranate: 'انار قندهار',
    harvestSaffron: 'زعفران هرات',
    harvestWheat: 'گندم افغانستان',
    homeShowHarvest: 'نمایش',
    marketSortNewest: 'جدیدترین',
    marketSortLow: 'کمترین قیمت',
    marketSortHigh: 'بیشترین قیمت',
    marketSortStock: 'بیشترین موجودی',

    prodKandaharPomegranates: 'انار سرخ قندهار',
    prodHeratSaffron: 'زعفران ممتاز هرات',
    prodBalkhWheat: 'گندم طلایی بلخ',
    prodNangarharOranges: 'پرتقال تازهٔ ننگرهار',
    prodBadakhshanWalnuts: 'گردوی بدخشان',
    prodKandaharGrapes: 'انگور سیاه قندهار',
    prodHelmandLentils: 'عدس سرخ هلمند',
    prodSpinach: 'دسته\u200cهای اسفناج تازه',
    prodAlmonds: 'بادام افغانستان',

    homeFeaturedProductsEyebrow: 'محصولات موجود را کشف کنید',
    homeFeaturedProductsTitle: 'محصولات برگزیده',
    homeFeaturedProductsDesc: 'آگهی\u200cهای زراعتی منتشرشده از سوی تولیدکنندگان و عرضه\u200cکنندگان را بررسی کنید.',
    homeProductsSoon: 'به\u200cزودی محصولات تازه',
    homeBeFirst: 'از نخستین کسانی باشید که آگهی\u200cهای زراعتی را کشف می\u200cکنند.',
    homeViewAllProducts: 'مشاهدهٔ همهٔ محصولات',
  },
  ps: {
    home: "کور", marketplace: "بازار", categories: "کټګورۍ", how: "د کار کولو طریقه",
    about: "زموږ په اړه", contact: "اړیکه", login: "ننوتل", register: "پیل وکړئ",
    search: "محصولات ولټوئ", explore: "بازار وګورئ", dashboard: "ډشبورډ", logout: "وتل",
    heroEyebrow: "د افغانستان د کرنې بازار",
    heroTitle: "کرنه نښلوو، سوداګري پیاوړې کوو",
    heroText: "تازه کرنیز محصولات ومومئ، له باوري بزګرانو سره مستقیمه اړیکه ونیسئ او د افغانستان په کرنیز بازار کې خپل کاروبار پراخ کړئ.",
    exploreMarketplace: "بازار وپلټئ", shopByCategory: "د کټګورۍ له مخې پېرود",
    categoryIntro: "د سیمه‌ییزو تولیدوونکو او عرضه‌کوونکو بېلابېل کرنیز محصولات وګورئ.",
    simpleAndStraightforward: "ساده او روښانه", howAgriMarketWorks: "اګري‌مارکېټ څنګه کار کوي؟",
    howIntro: "په درې ساده ګامونو کې محصولات ومومئ او سوداګریزې اړیکې جوړې کړئ.",
    aboutTitle: "د کروندې او بازار ترمنځ پیاوړې اړیکه.",
    aboutIntro: "اګري‌مارکېټ یو ډیجیټلي بازار دی چې د افغانستان بزګران، عمده پلورونکي، پرچون پلورونکي او پېرودونکي سره نښلوي.",
    aboutEyebrow: "زموږ موخه · افغانستان", aboutStory: "د کندهار له انارو او د هرات له زعفرانو څخه د بلخ تر غلو او د بدخشان تر مغزبابو پورې، زموږ پلاتفورم د افغانستان کرنیز تنوع په یوه اسانه ډیجیټلي بازار کې راټولوي.", aboutVisionLabel: "زموږ لیدلوری دا دی چې", aboutWordLocal: "سیمه‌ییز بزګران پیاوړي کړو.", aboutWordConnections: "ښې اړیکې جوړې کړو.", aboutWordProduce: "تازه محصولات وړاندې کړو.", aboutWordCommunities: "پیاوړې ټولنې جوړې کړو.", aboutExplore: "بازار وپلټئ", aboutRoots: "زموږ ریښې", aboutRootsText: "د سیمه‌ییزې مینې لرونکی بازار.", aboutPhotoAlt: "د ماښام د لمر په تودو رڼا کې د انګورو د تاکونو کتارونه", aboutPhotoEyebrow: "یوځای وده کوو", aboutPhotoTitle: "په خاوره کې ریښې؛ په موخه سره نښتي.", aboutValuesEyebrow: "زموږ باورونه", aboutValuesTitle: "یوازې یو بازار نه دی.", aboutValuesIntro: "موږ باور لرو چې کرنیزه سوداګري باید د ټولو لپاره لا اسانه، تړلې او روښانه وي.", aboutValueLocal: "سیمه‌ییز لومړیتوب", aboutValueLocalDesc: "د افغانستان د سیمو، سیمه‌ییزو بزګرانو او موسمي محصولاتو پر بنسټ جوړ شوی.", aboutValueDirect: "مستقیمې اړیکې", aboutValueDirectDesc: "پېرودونکو سره مرسته کوي چې بزګران ومومي او له عرضه‌کوونکو سره اړیکه ونیسي.", aboutValueTrust: "په ډیزاین کې باور", aboutValueTrustDesc: "روښانه اعلانونه او شفافې ازمایښتي چارې.", aboutGalleryEyebrow: "له نږدې کتنه", aboutGalleryTitle: "د کرنې ښکلا.", aboutGalleryIntro: "ځمکه، حاصلات او هغه خلک وپېژنئ چې د کرنیزو محصولاتو تر شا ولاړ دي.", aboutGalleryHarvest: "د حاصلاتو فصل", aboutGalleryFresh: "له کروندې تازه", aboutGalleryFuture: "ښه راتلونکی جوړول", aboutGalleryLand: "د ځمکې کرنه", aboutGalleryCatHarvest: "حاصلات", aboutGalleryCatFresh: "تازه محصولات", aboutGalleryCatFuture: "راتلونکی", aboutGalleryCatLand: "ځمکه", aboutPreviousImage: "مخکینی انځور", aboutNextImage: "راتلونکی انځور", aboutCtaEyebrow: "توپیر ومومئ", aboutCtaTitle: "راځئ په ګډه ارزښتناک پرمختګ وکړو.", aboutCtaText: "د افغانستان په بازار کې کرنیز محصولات او نوې اړیکې ومومئ.", aboutCtaButton: "محصولات ومومئ", aboutDisclaimer: "دا یوه ازمایښتي پلاتفورم ده، نه یو فعال سوداګریز شرکت. د عرضه‌کوونکو پېژندنه، سندونه، راکړې ورکړې او د بازار بیې په خپلواکه توګه نه دي تایید شوي.",
    contactTitle: "راځئ یوځای وده وکړو.",
    contactIntro: "د اګري‌مارکېټ په اړه نظر لرئ؟ د دې ازمایښتي فورم له لارې موږ ته پیغام واستوئ.",
    contactEyebrow: "راځئ اړیکه ونیسو", contactFormEyebrow: "پیغام ولېږئ", contactFormTitle: "ستاسو له پیغام څخه به خوښ شو.", contactFormDescription: "د بازار په اړه پوښتنه لرئ؟ موږ ته پیغام راولېږئ.", contactThankYou: "مننه!", contactDemoSuccess: "ستاسو پیغام په دې ازمایښتي بڼه کې ترلاسه شو، خو سرور ته نه دی لېږل شوی.", contactSendAnother: "بل پیغام ولېږئ", contactNamePlaceholder: "ستاسو بشپړ نوم", contactEmailPlaceholder: "you@example.com", contactMessagePlaceholder: "موږ ته ووایاست چې څنګه مرسته وکړو...", contactDemoNote: "دا یوازې ازمایښتي فورم دی؛ پیغامونه سرور ته نه لېږل کېږي.", contactImageEyebrow: "کرنه موږ سره نښلوي", contactImageTitle: "هره اړیکه له یوې خبرې پیل کېږي.", contactPlatformLabel: "پلېټفارم", contactPlatformValue: "د کرنیزو محصولاتو بازار", contactCoverageLabel: "د فعالیت سیمه", contactCoverageValue: "په ټول افغانستان کې", contactMessageLabel: "له موږ سره اړیکه", contactMessageValue: "د دې فورم له لارې پیغام راولېږئ", contactFollowUs: "موږ تعقیب کړئ",
    name: "ستاسو نوم", email: "برېښنالیک", message: "ستاسو پیغام", send: "پیغام ولېږئ",
    browseProducts: "محصولات وګورئ", becomeSeller: "پلورونکی شئ", featuredSuppliers: "غوره عرضه‌کوونکي",
    company: "شرکت", myAccount: "زما حساب", footerPitch: "د افغانستان د کرنیزو محصولاتو موندلو، له سیمه‌ییزو عرضه‌کوونکو سره د اړیکې او له کروندې تر بازاره د سوداګرۍ د پراختیا غوره لاره.",
    footerCtaEyebrow: "یوځای وده کوو", footerCtaTitle: "کروندې نښلوو، فرصتونه پراخوو.",
    footerCtaText: "کرنیز محصولات ومومئ، له سیمه‌ییزو عرضه‌کوونکو سره اړیکه ونیسئ او په افغانستان کې د سوداګرۍ د پیاوړو فرصتونو په جوړولو کې مرسته وکړئ.",
    footerCtaButton: "بازار وګورئ", footerTagline: "د افغانستان کرنیزه ټولنه سره نښلوو.",
    chooseLanguage: "ژبه وټاکئ", switchLight: "روښانه حالت ته واوړئ", switchDark: "تیاره حالت ته واوړئ",
    filters: "چاڼګرونه", refineSearch: "خپل لټون لا کره کړئ", reset: "بیا تنظیم", category: "کټګوري", allCategories: "ټولې کټګورۍ", province: "ولایت", allProvinces: "ټول ولایتونه", sellerType: "د پلورونکي ډول", allSellers: "ټول پلورونکي", farmers: "بزګران", wholesalers: "عمده پلورونکي", buyers: "پېرودونکي", searchPlaceholder: "محصولات، پلورونکي او ځایونه ولټوئ...", newestFirst: "تر ټولو نوي", lowestPrice: "تر ټولو ټیټه بیه", highestPrice: "تر ټولو لوړه بیه", mostStock: "تر ټولو ډېر زېرمتون", verifiedOnly: "یوازې تایید شوي اعلانونه", noProducts: "محصول ونه موندل شو", noProductsText: "ستاسو د لټون سره سم محصول ونه موندل شو. چاڼګرونه بدل کړئ یا بله کټګوري وپلټئ.", clearFilters: "ټول چاڼګرونه پاک کړئ", viewDetails: "جزیات وګورئ", verified: "تایید شوی", productOverview: "د محصول عمومي کتنه", listedPrice: "ثبت شوې بیه", availableQuantity: "شته اندازه", minimumOrder: "لږ تر لږه فرمایش", qualityGrade: "د کیفیت درجه", harvest: "حاصل", productionLocation: "د تولید ځای", supplier: "عرضه‌کوونکی", savedFavorites: "د خوښې په لېست کې خوندي شو", addFavorites: "د خوښې لېست ته ورزیات کړئ", sendInquiry: "غوښتنه واستوئ", quantity: "اندازه", inquiryMessage: "پیغام", dashboardSignIn: "خپل ډشبورډ ته د ننوتلو لپاره ننوځئ", signOut: "وتل", overview: "عمومي کتنه", myProducts: "زما محصولات", inquiries: "غوښتنې", notifications: "خبرتیاوې", profileSettings: "د پروفایل امستنې", myOrders: "زما فرمایشونه", savedProducts: "خوندي شوي محصولات", myInquiries: "زما غوښتنې", adminTools: "د مدیر وسایل",
    productNotFound: "محصول ونه موندل شو", backMarketplace: "بازار ته بېرته ستنېدل",
    createAccountTitle: "د بازار حساب جوړ کړئ", createAccountSub: "سیمه‌ییزې کرنیزې سوداګرۍ ته ورشئ او نوې اړیکې جوړې کړئ.",
    fullNameBusiness: "بشپړ نوم یا د سوداګرۍ نوم", joinAs: "زه غواړم د ... په توګه ګډون وکړم", password: "پټنوم", passwordMin: "لږ تر لږه ۶ توري",
    createAccount: "حساب جوړ کړئ", alreadyAccount: "له مخکې حساب لرئ؟", welcomeBack: "بېرته ښه راغلاست", signInSub: "د اګري‌مارکېټ کاري ځای ته د دوام لپاره ننوځئ.",
    demoRole: "ازمایښتي رول", anyPassword: "د ازمایښتي نسخې لپاره هر پټنوم", newTo: "اګري‌مارکېټ ته نوي یاست؟", createAnAccount: "حساب جوړ کړئ",
    heroSearchPlaceholder: "انار، غنم، زعفران ولټوئ...", exploreButton: "بازار وګورئ", acrossAfghanistan: "په ټول افغانستان کې", productListings: "د محصولاتو لړلیکونه", suppliers: "عرضه‌کوونکي",
    stepAccount: "خپل حساب جوړ کړئ", stepAccountDesc: "د بزګر، عمده پلورونکي یا پېرودونکي په توګه اګري‌مارکېټ ته ورشئ او سوداګریز پروفایل جوړ کړئ.",
    stepDiscover: "محصولات ومومئ", stepDiscoverDesc: "کرنیز محصولات وګورئ، وړاندیزونه پرتله کړئ او له عرضه‌کوونکو سره اړیکه ونیسئ.",
    stepTrade: "اړیکه او سوداګري وکړئ", stepTradeDesc: "له پلورونکو سره مستقیم تماس ونیسئ او ارزښتناکې سوداګریزې اړیکې جوړې کړئ.",
    marketEyebrow: "د افغانستان د کرنیزو محصولاتو ډیجیټل بازار", agriculturalProducts: "کرنیز محصولات", browseAvailable: "شته محصولات او د عرضه کوونکو لېستونه وګورئ", showing: "ښودل", of: "له", supportingAgriculture: "د افغانستان د کرنې ملاتړ", marketTitle: "بازار وپلټئ.", marketDescription: "د افغانستان له بزګرانو او باوري عرضه کوونکو څخه باکیفیته کرنیز محصولات ومومئ.", availableListings: "شته اعلانونه", browseCategories: "کټګورۍ وپلټئ", exploreProducts: "محصولات وپلټئ", allProducts: "ټول محصولات", allGrades: "ټولې درجې", gradeA: "A درجه", gradeB: "B درجه", premium: "اعلی", maximumPrice: "لوړه بیه", priceLimit: "د بیې حد", results: "پایلې", result: "پایله", listView: "د لېست بڼه", gridView: "د شبکې بڼه", noImage: "د محصول انځور", contactSupplier: "د زېرمو، عمده بیې یا لېږد په اړه له عرضه کوونکي سره اړیکه ونیسئ.", messageReceived: "ستاسو پیغام ترلاسه شو.",
    catFruits: "مېوې", catVegetables: "سابه", catGrains: "غلې دانې او حبوبات", catNuts: "مغز لرونکي او تخمونه", catDairy: "لبنیات", catHerbs: "بوټي او مصالحې", catLivestock: "مالداري", catEquipment: "وسایل",
    provinceKabul: "کابل", provinceKandahar: "کندهار", provinceHerat: "هرات", provinceBalkh: "بلخ", provinceNangarhar: "ننګرهار", provinceBadakhshan: "بدخشان", provinceHelmand: "هلمند", provinceKunduz: "کندز", provinceParwan: "پروان", provinceGhazni: "غزني",
    gradeLabel: "د کیفیت درجه", sellerFarmers: "بزګران", sellerWholesalers: "عمده پلورونکي", maximumPriceLabel: "لوړه بیه", verifiedListings: "یوازې تایید شوي اعلانونه", searchMarketPlaceholder: "محصولات، پلورونکي او ځایونه ولټوئ...", viewGrid: "د شبکې بڼه", viewList: "د لېست بڼه", clearAll: "ټول چاڼګرونه پاک کړئ", filterResults: "پایلې چاڼ کړئ", close: "بندول", applyFilters: "چاڼګرونه پلي کړئ", available: "شته", toggleFavorite: "د خوښې حالت بدل کړئ", profileName: "بشپړ نوم", profileEmail: "برېښنالیک", profilePhone: "د ټیلیفون شمېره", profileBusiness: "سوداګري / اداره", profileLocation: "ځای", saveProfile: "پروفایل خوندي کړئ", profileSaved: "پروفایل په دې وسیله کې خوندي شو.", markRead: "ټولې لوستل شوې وښایئ", adminNotifications: "د مدیر خبرتیاوې", newMessage: "نوی پیغام", allCaughtUp: "ټولې خبرتیاوې کتل شوې دي.", openAdminDashboard: "د مدیر ډشبورډ پرانیزئ", bulkPricing: "د عمده بیې په اړه له عرضه کوونکي سره مستقیمه خبرې کولی شئ.", productOverviewTitle: "د محصول عمومي کتنه", listingDisclaimer: "دا اعلان د اګري‌مارکېټ د ازمایښتي کتلاګ برخه ده. د محصول ځانګړتیاوې، زېرمه، بیه، د پلورونکي پېژندنه او شتون نمونه‌ییز معلومات دي او له رښتینې معاملې مخکې باید له عرضه کوونکي سره تایید شي.", deliveryCollection: "لېږد او ترلاسه کول", deliveryDescription: "د لېږد ترتیبات د پېرودونکي او عرضه کوونکي ترمنځ مستقیم همغږي کېږي. د لېږد لګښت، لاره، بسته‌بندي او نېټه باید له پېرود مخکې هوکړه شي.", inquiryThanks: "ستاسو ازمایښتي غوښتنه خوندي شوه. په ډشبورډ کې یې لیدلی شئ.", youMayLike: "دا محصولات هم خوښولی شئ",

    homeSeasonEyebrow: 'د موسم غوره شوي محصولات',
    homeSeasonTitle: 'د موسم حاصلات',
    homeSeasonDesc: 'د افغانستان کرنیز محصولات او د بېلابېلو سیمو ځانګړي توکي ومومئ.',
    harvestFresh: 'تازه حاصل',
    harvestPremium: 'لوړ کیفیت',
    harvestFarmDirect: 'مستقیم له کروندې',
    harvestPomegranateDesc: 'د افغانستان تازه راټول شوي، طبیعي خوږ انار چې بډایه خوند او روښانه رنګ لري.',
    harvestSaffronDesc: 'د هرات له مشهورو کرنیزو ځمکو څخه په پاملرنې راټول شوی لوړکیفیته زعفران.',
    harvestWheatDesc: 'د سیمه\u200cییزو کرنیزو تولیدوونکو او بزګرانو له ټولنو څخه ترلاسه شوی باکیفیته غنم.',
    homeExploreProduct: 'محصول وګورئ',
    homePreviousHarvest: 'مخکینی حاصل',
    homeNextHarvest: 'راتلونکی حاصل',
    homeHowEyebrow: 'ساده او روښانه',
    homeHowTitle: 'اګري\u200cمارکېټ څنګه کار کوي؟',
    homeHowDesc: 'په درې ساده ګامونو کې محصولات ومومئ او سوداګریزې کرنیزې اړیکې جوړې کړئ.',
    homeBenefitsEyebrow: 'پیاوړې کرنیزه شبکه',
    homeBenefitsTitle: 'کرنیز فرصتونه نږدې کوو.',
    homeBenefitsDesc: 'کرنه د افغانستان د اقتصاد مهمه برخه ده. اګري\u200cمارکېټ غواړي کرنیزو سوداګرو ته د محصولاتو موندل، نویو پېرودونکو ته رسېدل او تلپاتې اړیکې جوړول اسانه کړي.',
    homeMission: 'زموږ له موخې سره اشنا شئ',
    benefitTrusted: 'باوري اړیکې',
    benefitTrustedDesc: 'د داسې بازار له لارې عرضه\u200cکوونکي او پېرودونکي ومومئ چې د باوري سوداګریزو اړیکو د ملاتړ لپاره جوړ شوی.',
    benefitAccess: 'بازار ته پراخ لاسرسی',
    benefitAccessDesc: 'کرنیزو سوداګرو سره مرسته وکړئ چې په ټول افغانستان کې پېرودونکو او سوداګریزو فرصتونو ته ورسېږي.',
    benefitFarmers: 'د بزګرانو ملاتړ',
    benefitFarmersDesc: 'ځايي تولیدوونکو ته ډیجیټلي زمینه برابره کړئ چې خپل حاصلات وښيي او کاروبار پراخ کړي.',
    homeRegionsEyebrow: 'د هېواد له هر ګوټ څخه',
    homeRegionsTitle: 'د افغانستان کرنیزې سیمې',
    homeRegionsDesc: 'د افغانستان د بېلابېلو سیمو له ځانګړو کرنیزو محصولاتو سره اشنا شئ.',
    homeAgriculturalRegions: 'کرنیزې سیمې',
    homeAgriculturalRegion: 'کرنیزه سیمه',
    homeExploreRegion: 'سیمه وګورئ',
    homeRotationPaused: 'څرخېدل ودرېدل',
    homeDiscoverRegions: 'زموږ سیمې ومومئ',
    regionKandahar: 'انار او انګور',
    regionHerat: 'زعفران او وچې مېوې',
    regionBalkh: 'غنم او دانې',
    regionNangarhar: 'لیموډوله مېوې او سابه',
    homeFeaturedEyebrow: 'د محصولاتو له تولیدوونکو سره اشنا شئ',
    homeFeaturedTitle: 'غوره عرضه\u200cکوونکي',
    homeFeaturedDesc: 'په بازار کې له ګډون کوونکو کرنیزو عرضه\u200cکوونکو او سوداګریو سره اشنا شئ.',
    homeSupplierType: 'کرنیز عرضه\u200cکوونکی',
    homeSupplierEmpty: 'د سوداګریو په ګډون سره به د عرضه\u200cکوونکو پېژندپاڼې دلته ښکاره شي.',
    homeDiscoverMarket: 'بازار ومومئ',
    homeGrowEyebrow: 'له اګري\u200cمارکېټ سره وده وکړئ',
    homeGrowTitle: 'ستاسو محصولات د لوی بازار وړ دي.',
    homeGrowDesc: 'که کرنه کوئ، محصولات عرضه کوئ یا یې اخلئ، زموږ په بازار کې ستاسو لپاره ځای شته.',
    homeJoinMarket: 'بازار سره یوځای شئ',
    homeBrowseProducts: 'محصولات وګورئ',
    homeFaqEyebrow: 'نور معلومات غواړئ؟',
    homeFaqTitle: 'ډېرې پوښتل شوې پوښتنې',
    homeFaqDesc: 'د اګري\u200cمارکېټ د کارولو او له کرنیزو سوداګریو سره د اړیکو په اړه نور معلومات ترلاسه کړئ.',
    homeContactTeam: 'زموږ له ډلې سره اړیکه',
    faqWhat: 'اګري\u200cمارکېټ څه شی دی؟',
    faqWhatAnswer: 'اګري\u200cمارکېټ انلاین کرنیز بازار دی چې له بزګرانو، عمده پلورونکو او پېرودونکو سره د محصولاتو په موندلو او اړیکو جوړولو کې مرسته کوي.',
    faqWho: 'څوک له دې پلاتفورم څخه کار اخیستلای شي؟',
    faqWhoAnswer: 'بزګران، کرنیز عرضه\u200cکوونکي، عمده پلورونکي، پرچون پلورونکي او پېرودونکي حساب جوړولای او له دې پلاتفورم څخه کار اخیستلای شي.',
    faqAdvertise: 'ایا بزګران خپل محصولات اعلانولای شي؟',
    faqAdvertiseAnswer: 'هو. بزګران د محصول د معلوماتو، انځورونو، بیو او ځای په ورزیاتولو اعلانونه جوړولای شي، څو احتمالي پېرودونکي یې ومومي.',
    faqRegions: 'ایا اګري\u200cمارکېټ د بېلابېلو سیمو ملاتړ کوي؟',
    faqRegionsAnswer: 'دا پلاتفورم په ټول افغانستان کې د کرنیزو سوداګریو د نښلولو او د بېلابېلو ولایتونو د محصولاتو د ښودلو لپاره جوړ شوی.',
    homeStatProducts: 'د محصولاتو اعلانونه',
    homeStatSuppliers: 'عرضه\u200cکوونکي',
    homeStatCategories: 'کټګورۍ',
    homeStatProvinces: 'د نښلولو ولایتونه',
    homeHeroStrip: 'یوځای وده کوو، هوښیار تجارت کوو.',
    homeHeroAudience: 'بزګران · عمده پلورونکي · پېرودونکي',
    marketDemoNotice: 'د محصولاتو اعلانونه او بیې د دې مخکینۍ نسخې د نندارې لپاره بېلګې دي.',
    marketActiveFilters: 'فعال چاڼګرونه:',
    marketVerified: 'تایید شوی',
    marketMax: 'لوړه کچه:',
    marketAfghanistan: 'افغانستان',
    marketAvailableListings: 'شته اعلانونه',

    harvestPomegranate: 'د کندهار انار',
    harvestSaffron: 'د هرات زعفران',
    harvestWheat: 'افغان غنم',
    homeShowHarvest: 'ښودل',
    marketSortNewest: 'تر ټولو نوي',
    marketSortLow: 'تر ټولو ټیټه بیه',
    marketSortHigh: 'تر ټولو لوړه بیه',
    marketSortStock: 'تر ټولو ډېر زېرمتون',

    prodKandaharPomegranates: 'د کندهار سره انار',
    prodHeratSaffron: 'د هرات غوره زعفران',
    prodBalkhWheat: 'د بلخ زرین غنم',
    prodNangarharOranges: 'د ننګرهار تازه مالټې',
    prodBadakhshanWalnuts: 'د بدخشان غوزان',
    prodKandaharGrapes: 'د کندهار تور انګور',
    prodHelmandLentils: 'د هلمند سره مسور',
    prodSpinach: 'د پالک تازه ګېډۍ',
    prodAlmonds: 'افغان بادام',

    homeFeaturedProductsEyebrow: 'شته محصولات ومومئئ',
    homeFeaturedProductsTitle: 'غوره شوي محصولات',
    homeFeaturedProductsDesc: 'د تولیدوونکو او عرضه\u200cکوونکو له خوا خپاره شوي کرنیز اعلانونه وګورئ.',
    homeProductsSoon: 'محصولات ډېر ژر راځي',
    homeBeFirst: 'د کرنیزو اعلانونو په موندلو کې له لومړنیو کسانو څخه اوسئ.',
    homeViewAllProducts: 'ټول محصولات وګورئ',
  },
};
export function AppProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = readStored("agri_products", null);
    if (!Array.isArray(saved)) return seed;
    const savedIds = new Set(saved.map((p) => p.id));
    return [...seed.filter((p) => !savedIds.has(p.id)), ...saved];
  });
  const [favorites, setFavorites] = useState(() =>
    (Array.isArray(readStored("agri_favorites", [])) ? readStored("agri_favorites", []) : []),
  );
  const [user, setUser] = useState(() =>
    readStored("agri_user", null),
  );
  const [inquiries, setInquiries] = useState(() =>
    (Array.isArray(readStored("agri_inquiries", [])) ? readStored("agri_inquiries", []) : []),
  );
  const [orders, setOrders] = useState(() =>
    (Array.isArray(readStored("agri_orders", [])) ? readStored("agri_orders", []) : []),
  );
  const [notifications, setNotifications] = useState(() => (Array.isArray(readStored("agri_notifications", [])) ? readStored("agri_notifications", []) : []));
  const [theme, setTheme] = useState(() => localStorage.getItem("agri_theme") === "dark" ? "dark" : "light");
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem("agri_language");
    return saved && translations[saved] ? saved : "en";
  });
  const setLanguage = (next) => {
    if (translations[next]) setLanguageState(next);
  };
  useEffect(
    () => localStorage.setItem("agri_products", JSON.stringify(items)),
    [items],
  );
  useEffect(
    () => localStorage.setItem("agri_favorites", JSON.stringify(favorites)),
    [favorites],
  );
  useEffect(
    () => localStorage.setItem("agri_user", JSON.stringify(user)),
    [user],
  );
  useEffect(
    () => localStorage.setItem("agri_inquiries", JSON.stringify(inquiries)),
    [inquiries],
  );
  useEffect(
    () => localStorage.setItem("agri_orders", JSON.stringify(orders)),
    [orders],
  );
  useEffect(
    () =>
      localStorage.setItem("agri_notifications", JSON.stringify(notifications)),
    [notifications],
  );
  useEffect(() => {
    const syncNotifications = (event) => {
      if (event.key === "agri_notifications") setNotifications((Array.isArray(readStored("agri_notifications", [])) ? readStored("agri_notifications", []) : []));
    };
    window.addEventListener("storage", syncNotifications);
    return () => window.removeEventListener("storage", syncNotifications);
  }, []);
  useEffect(() => {
    localStorage.setItem("agri_theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("agri_language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "en" ? "ltr" : "rtl";
    document.documentElement.dataset.language = language;
  }, [language]);
  const t = (key) =>
    translations[language]?.[key] || translations.en[key] || key;
  const toggleFavorite = (id) =>
    setFavorites((v) =>
      v.includes(id) ? v.filter((x) => x !== id) : [...v, id],
    );
  const addProduct = (p) =>
    setItems((v) => [{ ...p, id: Date.now(), verified: false }, ...v]);
  const updateProduct = (p) =>
    setItems((v) => v.map((x) => (x.id === p.id ? p : x)));
  const deleteProduct = (id) => setItems((v) => v.filter((x) => x.id !== id));
  const createNotification = (notification) => {
    setNotifications((v) => [{
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      read: false,
      type: "message",
      date: new Date().toLocaleString(),
      ...notification,
    }, ...v]);
  };
  const markNotificationsRead = () => setNotifications((v) => v.map((n) => ({ ...n, read: true })));
  const updateProfile = (updates) => {
    if (!user) return;
    if (updates.name && updates.name !== user.name) {
      setItems((existing) => existing.map((item) => item.seller === user.name ? { ...item, seller: updates.name } : item));
    }
    setUser({ ...user, ...updates });
  };
  const sendInquiry = (i) => {
    const inquiryId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setInquiries((v) => [
      {
        ...i,
        id: inquiryId,
        status: "Pending",
        date: new Date().toLocaleDateString(),
      },
      ...v,
    ]);
    createNotification({
      title: "New product inquiry",
      text: `${i.buyer || "A buyer"} sent an inquiry about ${i.product || "a product"}. Message: ${i.message || "No additional message provided."}`,
      type: "inquiry",
      inquiryId,
    });
  };
  const login = (name, role, email) => setUser({ name, role, email });
  const logout = () => setUser(null);
  const value = useMemo(
    () => ({
      items,
      favorites,
      user,
      inquiries,
      orders,
      notifications,
      theme,
      setTheme,
      language,
      setLanguage,
      t,
      toggleFavorite,
      addProduct,
      updateProduct,
      deleteProduct,
      sendInquiry,
      createNotification,
      markNotificationsRead,
      updateProfile,
      login,
      logout,
      setOrders,
      setInquiries,
      setNotifications,
    }),
    [items, favorites, user, inquiries, orders, notifications, theme, language],
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}
