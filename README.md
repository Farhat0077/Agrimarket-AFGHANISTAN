# AGRIMARKET — Afghanistan Agricultural Marketplace

A React + Vite frontend demonstration for an Afghanistan-focused agricultural products marketplace.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Production build: `npm run build`.

## Included in this starter

- Responsive public homepage with selective Three.js / React Three Fiber farm scene and graceful static image backdrop.
- Afghanistan-focused product catalogue, categories, regional sample listings, AFN pricing and marketplace filters/search/sorting/grid-list views.
- Product details, favorites, inquiry form, sample supplier profiles.
- Demo registration/login with Farmer, Wholesaler, Buyer and Admin roles.
- Role-aware dashboard, local product creation/deletion, inquiry review, favorites, notifications and order placeholder.
- LocalStorage persistence and separated sample data/context/service-ready state boundary.
- About and Contact pages.

## Important limitations

This is a **frontend-only demonstration**, not a production trading platform. Listings, prices, seller profiles, statistics, and activity are sample data. Login is not secure authentication. LocalStorage is not a database. Inquiries and notifications are stored only in the current browser; no real supplier receives them. No payment, delivery booking, identity verification, or real orders are processed.

## Before production

Connect a backend API and database; implement secure authentication and authorization; verify sellers and listings; add image storage, messaging, order state transitions, audit logs, rate limiting, moderation, backups, privacy/security policies, and tested logistics/payment integrations. Add a proper localization dictionary and RTL layout before enabling Dari and Pashto. Do not publish demo data as real market information.

## Suggested next architecture step

Replace the context's LocalStorage implementation with repository/service modules (`src/services/`) exposing the same methods. Keep UI components independent of the storage mechanism.


## Latest UI update

- Expanded the Afghanistan sample catalogue to 39 agricultural listings across fruits, vegetables, grains, nuts and seeds, dairy, herbs and spices, livestock, and equipment.
- Added a persistent light/dark theme toggle in the main navigation.
- Replaced the 3D hero canvas with a responsive agricultural landscape photograph.
- Removed Three.js, React Three Fiber, and Drei dependencies to keep the frontend lighter.
- Refined the visual direction with a clean, botanical, photography-led layout inspired by the VerdaAgro reference.

All product data and prices remain illustrative demo content, not live offers or verified sellers. Existing locally saved listings are retained while the expanded seed catalogue is added.


## Hero video

The original `src/assets/agriculture.mp4` file was not included in the uploaded project archive. The Home page now reads an externally hosted MP4 from `VITE_HERO_VIDEO_URL`, avoiding a missing local import and allowing the video to remain outside Git history. Copy `.env.example` to `.env.local` and set the variable to your hosted MP4 URL.

## Navigation and language

The navbar uses React Router links for pages and hash-aware links for the Home page sections. `ScrollToLocation` scrolls after route changes so section navigation also works when opened from another page. Language preference is persisted in local storage; the global translation dictionary is in `src/context/AppContext.jsx`.


## Hero background video

The homepage hero uses a free farm-field video from Pexels by default (video page: https://www.pexels.com/video/drone-footage-of-an-agricultural-field-6659062/). The original `src/assets/agriculture.mp4` file was not present in the supplied project archive, so the app no longer imports a missing local asset. To use your own video, set `VITE_HERO_VIDEO_URL` in `.env.local` to a publicly accessible MP4 URL and restart Vite. The poster image remains visible while the video loads or if playback is unavailable.

## Notifications and user profiles

New contact-form messages and product inquiries are recorded in the app's local notification store. Admin demo accounts see an unread-count bell in the top navigation and can open the notification list. Users can edit their name, email, phone, business, and location in Dashboard → Profile Settings. These are frontend-demo features stored in the current browser's local storage; cross-device delivery, email/push alerts, secure identity management, and shared multi-user synchronization require a backend and database.
