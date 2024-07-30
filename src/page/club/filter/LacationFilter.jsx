import React, { useState, useRef, useEffect } from 'react';

const LocationFilter = ({
  selectedTags,
  onTagChange,
  locations,
  selectedLocation,
  onLocationChange,
  selectedSubLocation,
  onSubLocationChange,
}) => {
  const [locationDropdownVisible, setLocationDropdownVisible] = useState(false);
  const locationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationDropdownVisible(false);
      }
    };

    if (locationDropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [locationDropdownVisible]);

  const handleClick = () => {
    onTagChange('장소');
    setLocationDropdownVisible(true);
  };

  return (
    <li
      onClick={handleClick}
      className={
        selectedTags.includes('장소')
          ? 'club-filter-tag-list-selected'
          : 'club-filter-tag-list'
      }
    >
      {selectedSubLocation &&
      selectedTags.includes('장소') &&
      !locationDropdownVisible
        ? selectedSubLocation
        : '장소'}
      {selectedTags.includes('장소') && locationDropdownVisible && (
        <div
          ref={locationRef}
          className="club-filter-location-dropdown-container"
        >
          <div className="club-filter-location-left-container">
            <div className="club-filter-location-header">시/도</div>
            <div className="club-filter-location-list">
              {Object.keys(locations).map((location, index) => (
                <div
                  key={index}
                  className={
                    selectedLocation === location
                      ? 'club-filter-location-item-selected'
                      : 'club-filter-location-item'
                  }
                  onClick={() => onLocationChange(location)}
                >
                  {location}
                </div>
              ))}
            </div>
          </div>
          <div className="club-filter-location-right-container">
            <div className="club-filter-location-header">시/군/구</div>
            <div className="club-filter-location-list">
              {locations[selectedLocation].map((subLocation, index) => (
                <div
                  key={index}
                  className={
                    selectedSubLocation === subLocation
                      ? 'club-filter-location-item-selected'
                      : 'club-filter-location-item'
                  }
                  onClick={() => onSubLocationChange(subLocation)}
                >
                  {subLocation}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default LocationFilter;
