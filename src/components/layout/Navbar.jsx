import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, MessageSquare, PlusCircle, User, ShieldCheck, ArrowRightLeft, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, isAuthenticated, role, switchRole } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        {/* Brand Logo */}
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <ShieldCheck size={22} className={styles.shield} />
          </div>
          <span className={styles.brandName}>
            Rent<span className={styles.brandAccent}>Any</span>
          </span>
        </Link>

        {/* Global Search Bar (hidden on homepage hero to avoid duplicate) */}
        <form onSubmit={handleSearch} className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search cameras, drones, consoles, tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </form>

        {/* Desktop Nav Actions */}
        <div className={styles.navActions}>
          {/* Quick Role Switcher Button for Pair Demo */}
          <button 
            type="button" 
            onClick={switchRole}
            className={styles.roleToggle}
            title="Switch Persona: Renter / Owner"
          >
            <ArrowRightLeft size={14} />
            <span>Mode: <strong>{role === 'owner' ? 'Owner' : 'Renter'}</strong></span>
          </button>

          {role === 'owner' ? (
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Owner Dashboard</Button>
            </Link>
          ) : (
            <Link to="/rentals">
              <Button variant="ghost" size="sm">My Rentals</Button>
            </Link>
          )}

          <Link to="/list">
            <Button variant="outline" size="sm" icon={PlusCircle}>
              List Item
            </Button>
          </Link>

          <Link to="/messages" className={styles.iconBtn} title="Inbox Messages">
            <MessageSquare size={20} />
            <span className={styles.unreadDot}></span>
          </Link>

          {isAuthenticated ? (
            <div className={styles.userProfile}>
              <img src={user?.avatar} alt={user?.name} className={styles.avatar} />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user?.name?.split(' ')[0]}</span>
                <span className={styles.userBadge}>{user?.role}</span>
              </div>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="primary" size="sm">Log In</Button>
            </Link>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <button
          className={styles.mobileMenuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <form onSubmit={handleSearch} className={styles.mobileSearch}>
            <input
              type="text"
              placeholder="Search gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button size="sm" type="submit">Search</Button>
          </form>
          <div className={styles.mobileLinks}>
            <Link to="/search" onClick={() => setMobileMenuOpen(false)}>Browse Catalog</Link>
            <Link to="/rentals" onClick={() => setMobileMenuOpen(false)}>My Rentals</Link>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Owner Dashboard</Link>
            <Link to="/list" onClick={() => setMobileMenuOpen(false)}>List an Item</Link>
            <Link to="/messages" onClick={() => setMobileMenuOpen(false)}>Messages</Link>
          </div>
        </div>
      )}
    </header>
  );
}
