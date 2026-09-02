import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ListingDetailPage from './pages/ListingDetailPage';
import ConfirmRentalPage from './pages/ConfirmRentalPage';
import BookingConfirmedPage from './pages/BookingConfirmedPage';
import MyRentalsPage from './pages/MyRentalsPage';
import RentalDetailPage from './pages/RentalDetailPage';
import ReturnRentalPage from './pages/ReturnRentalPage';
import RentalCompletePage from './pages/RentalCompletePage';
import LoginPage from './pages/auth/LoginPage';
import VerifyPage from './pages/auth/VerifyPage';
import OwnerDashboardPage from './pages/owner/OwnerDashboardPage';
import RentalRequestPage from './pages/owner/RentalRequestPage';
import ManageListingsPage from './pages/owner/ManageListingsPage';
import ListingWizard from './pages/owner/list-wizard/ListingWizard';
import MessagesPage from './pages/MessagesPage';

export default function App() {
  return (
    <div className="appShell">
      <Navbar />
      <main className="mainContent">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/listings/:id" element={<ListingDetailPage />} />
          <Route path="/listings/:id/confirm" element={<ConfirmRentalPage />} />
          <Route path="/listings/:id/confirmed" element={<BookingConfirmedPage />} />

          {/* Auth Routes */}
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/auth/verify" element={<VerifyPage />} />

          {/* Renter Lifecycle */}
          <Route path="/rentals" element={<MyRentalsPage />} />
          <Route path="/rentals/:id" element={<RentalDetailPage />} />
          <Route path="/rentals/:id/return" element={<ReturnRentalPage />} />
          <Route path="/rentals/:id/complete" element={<RentalCompletePage />} />

          {/* Owner Dashboard & Tools */}
          <Route path="/dashboard" element={<OwnerDashboardPage />} />
          <Route path="/dashboard/requests/:id" element={<RentalRequestPage />} />
          <Route path="/dashboard/listings" element={<ManageListingsPage />} />
          <Route path="/list" element={<ListingWizard />} />

          {/* Messaging */}
          <Route path="/messages" element={<MessagesPage />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
