import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [usePreciseLocation, setUsePreciseLocation] = useState(false);
  const [filters, setFilters] = useState({
    eventType: [],
    category: [],
    priceRange: { min: '', max: '' },
    duration: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [events, setEvents] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement API call to backend
    console.log('Searching for events:', { location, startDate, endDate, filters });
    // Placeholder: Set some mock events
    setEvents([
      { id: 1, name: 'Sample Event 1', location: location || 'Location', date: startDate || 'TBD' },
      { id: 2, name: 'Sample Event 2', location: location || 'Location', date: startDate || 'TBD' }
    ]);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handlePriceRangeChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [field]: value === '' ? '' : parseFloat(value) || ''
      }
    }));
  };

  const handleMultiSelectChange = (filterName, value) => {
    setFilters(prev => {
      const currentArray = prev[filterName] || [];
      const isSelected = currentArray.includes(value);
      
      if (isSelected) {
        // Remove the value if it's already selected
        return {
          ...prev,
          [filterName]: currentArray.filter(item => item !== value)
        };
      } else {
        // Add the value if it's not selected
        return {
          ...prev,
          [filterName]: [...currentArray, value]
        };
      }
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Event Finder</h1>
        <p className="subtitle">Discover events in your area with the click of a button</p>
      </header>

      <main className="main-content">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="form-section">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city, address, or area"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-section">
              <label htmlFor="start-date">Start Date & Time</label>
              <input
                type="datetime-local"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="form-section">
              <label htmlFor="end-date">End Date & Time</label>
              <input
                type="datetime-local"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-section checkbox-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={usePreciseLocation}
                onChange={(e) => setUsePreciseLocation(e.target.checked)}
              />
              Use My Precise Location
            </label>
          </div>

          <div className="filters-toggle">
            <button
              type="button"
              className="toggle-filters-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>

          {showFilters && (
            <div className="filters-section">
              <div className="form-section">
                <label>Event Type</label>
                <div className="checkbox-group">
                  {[
                    { value: 'concert', label: 'Concert' },
                    { value: 'sports', label: 'Sports' },
                    { value: 'theater', label: 'Theater' },
                    { value: 'festival', label: 'Festival' },
                    { value: 'conference', label: 'Conference' },
                    { value: 'workshop', label: 'Workshop' },
                    { value: 'other', label: 'Other' }
                  ].map(option => (
                    <label key={option.value} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={filters.eventType.includes(option.value)}
                        onChange={(e) => handleMultiSelectChange('eventType', option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <label>Category</label>
                <div className="checkbox-group">
                  {[
                    { value: 'music', label: 'Music' },
                    { value: 'arts', label: 'Arts & Culture' },
                    { value: 'food', label: 'Food & Drink' },
                    { value: 'outdoor', label: 'Outdoor' },
                    { value: 'family', label: 'Family' },
                    { value: 'networking', label: 'Networking' }
                  ].map(option => (
                    <label key={option.value} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={filters.category.includes(option.value)}
                        onChange={(e) => handleMultiSelectChange('category', option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <label>Price Range ($)</label>
                <div className="price-range-inputs">
                  <div className="price-input-group">
                    <label htmlFor="price-min">Min</label>
                    <input
                      type="number"
                      id="price-min"
                      min="0"
                      step="0.01"
                      value={filters.priceRange.min}
                      onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <span className="price-range-separator">-</span>
                  <div className="price-input-group">
                    <label htmlFor="price-max">Max</label>
                    <input
                      type="number"
                      id="price-max"
                      min="0"
                      step="0.01"
                      value={filters.priceRange.max}
                      onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                      placeholder="No limit"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <label>Duration</label>
                <div className="checkbox-group">
                  {[
                    { value: 'short', label: 'Less than 2 hours' },
                    { value: 'medium', label: '2-4 hours' },
                    { value: 'long', label: '4+ hours' },
                    { value: 'multi-day', label: 'Multi-day' }
                  ].map(option => (
                    <label key={option.value} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={filters.duration.includes(option.value)}
                        onChange={(e) => handleMultiSelectChange('duration', option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="search-button">
            Search Events
          </button>
        </form>

        <div className="results-section">
          <h2>Search Results</h2>
          {events.length === 0 ? (
            <div className="no-results">
              <p>Enter a location and click "Search Events" to find events in your area.</p>
            </div>
          ) : (
            <div className="events-list">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <h3>{event.name}</h3>
                  <p className="event-location">📍 {event.location}</p>
                  <p className="event-date">📅 {event.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Event Finder - Find events in your area</p>
      </footer>
    </div>
  );
}

export default App;