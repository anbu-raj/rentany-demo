import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Zap } from 'lucide-react';
import listingsData from '../data/listings.json';
import ListingGrid from '../components/listing/ListingGrid';
import Button from '../components/ui/Button';
import styles from './SearchPage.module.css';

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'cameras', label: 'Cameras & Lenses' },
  { id: 'drones', label: 'Drones & Gimbals' },
  { id: 'gaming', label: 'Gaming Consoles' },
  { id: 'audio', label: 'Podcast & Audio' },
  { id: 'camping', label: 'Outdoor & Camping' },
  { id: 'tools', label: 'Tools & DIY' },
  { id: 'electronics', label: 'Displays & Projectors' }
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [instantOnly, setInstantOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'price-low' | 'price-high' | 'rating'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter listings
  const filteredListings = useMemo(() => {
    return listingsData.filter((item) => {
      // Category filter
      if (category !== 'all' && item.category !== category) return false;

      // Price filter
      if (item.pricePerDay > maxPrice) return false;

      // Instant booking filter
      if (instantOnly && !item.instantBooking) return false;

      // Search keyword filter
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCategory = item.categoryLabel.toLowerCase().includes(q);
        const matchLocation = item.location.neighborhood.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCategory && !matchLocation) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-high') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended
    });
  }, [category, query, maxPrice, instantOnly, sortBy]);

  const clearFilters = () => {
    setCategory('all');
    setQuery('');
    setMaxPrice(2500);
    setInstantOnly(false);
    setSortBy('recommended');
  };

  return (
    <div className={`container ${styles.searchPage}`}>
      {/* Header bar */}
      <div className={styles.headerBar}>
        <div>
          <h1 className={styles.pageTitle}>Rent Gear in Bengaluru</h1>
          <p className={styles.resultCount}>
            Showing <strong>{filteredListings.length}</strong> available items
          </p>
        </div>

        {/* Sorting dropdown & mobile filter trigger */}
        <div className={styles.sortControls}>
          <div className={styles.sortSelectWrapper}>
            <ArrowUpDown size={15} className={styles.sortIcon} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <button
            className={styles.mobileFilterBtn}
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className={styles.mainLayout}>
        {/* Left Sidebar Filters */}
        <aside className={`${styles.sidebar} ${mobileFilterOpen ? styles.mobileOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <h3>Filters</h3>
            <button onClick={clearFilters} className={styles.clearBtn}>Reset all</button>
          </div>

          {/* Search keyword */}
          <div className={styles.filterGroup}>
            <label className={styles.groupLabel}>Keyword</label>
            <input
              type="text"
              placeholder="Search gear title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.textInput}
            />
          </div>

          {/* Categories */}
          <div className={styles.filterGroup}>
            <label className={styles.groupLabel}>Category</label>
            <div className={styles.categoryRadioList}>
              {CATEGORIES.map((cat) => (
                <label key={cat.id} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat.id}
                    onChange={() => setCategory(cat.id)}
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className={styles.filterGroup}>
            <div className={styles.sliderLabelRow}>
              <label className={styles.groupLabel}>Max Price / Day</label>
              <span className={styles.sliderValue}>₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="300"
              max="3000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className={styles.rangeSlider}
            />
            <div className={styles.sliderLimits}>
              <span>₹300</span>
              <span>₹3,000+</span>
            </div>
          </div>

          {/* Instant Booking Toggle */}
          <div className={styles.filterGroup}>
            <label className={styles.toggleLabel}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleTitle}>
                  <Zap size={14} className={styles.zapIcon} />
                  <span>Instant Book Only</span>
                </div>
                <span className={styles.toggleSubtitle}>Items you can reserve without owner waiting</span>
              </div>
              <input
                type="checkbox"
                checked={instantOnly}
                onChange={(e) => setInstantOnly(e.target.checked)}
                className={styles.checkbox}
              />
            </label>
          </div>
        </aside>

        {/* Right Listings Grid */}
        <main className={styles.resultsArea}>
          <ListingGrid listings={filteredListings} />
        </main>
      </div>
    </div>
  );
}
