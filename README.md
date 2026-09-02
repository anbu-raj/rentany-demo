# RentAny — Peer-to-Peer Rental Marketplace

A modern, production-grade peer-to-peer equipment rental web application created from Google Stitch design (`Project ID: 13255353061404149299`).

![RentAny Platform](https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=80)

## 🚀 Key Features

### 🟢 Renter Journey
- **Home & Catalog Search**: Interactive search with instant category filters, daily price range slider (₹300 - ₹3,000+), instant booking toggle, and sorting.
- **Listing Details**: Gallery with interactive thumbnails, technical specifications, included accessories checklist, verified host details, and live pricing calculator.
- **Booking & Checkout**: Pickup/return schedule, instant UPI payment selection (GPay/PhonePe), and escrow deposit accounting.
- **Confirmed Handover OTP**: Displays 4-digit handover verification code (`4829`) to present at pickup.
- **Rental Lifecycle Management**: Tabbed rentals dashboard (Active, Upcoming, Completed) with tracking timeline.
- **Return & Inspection**: Gear condition photo upload log, condition declaration, and deposit refund status.
- **Reviews & Ratings**: Interactive star rating and creator review submission.

### 🟠 Owner / Host Journey
- **Host Dashboard**: August earnings KPI (₹28,450), active equipment counter, pending requests alert, and host ratings.
- **Booking Requests Review**: Review renter identity verification (Aadhaar-verified), rental dates, and 0% promotional host fee payout.
- **Inventory Management**: Complete listings table with one-click pause and resume actions.
- **4-Step Listing Wizard**: Multi-step flow for category, photos, daily rate & security deposit pricing, and live preview before publishing.

### 💬 Messaging & Auth
- **Direct Messaging**: Two-panel conversation inbox with real-time chat messages and read receipts.
- **OTP Auth**: Phone login with 6-box auto-advancing code entry and fast demo persona switching.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router DOM v6
- **State Management**: Zustand
- **Icons**: Lucide React
- **Styling**: CSS Modules + CSS Custom Properties (Stitch Modern Teal design tokens)

---

## 📦 Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/anbu-raj/rentany-demo.git
   cd rentany-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
