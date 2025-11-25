// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Simple filter for news page
const newsCategoryFilter = document.getElementById('newsCategoryFilter');
const newsSearch = document.getElementById('newsSearch');
const newsList = document.getElementById('newsList');

if (newsList && newsCategoryFilter && newsSearch) {
  const newsCards = Array.from(newsList.querySelectorAll('.card'));

  function applyNewsFilter() {
    const category = newsCategoryFilter.value;
    const term = newsSearch.value.toLowerCase();

    newsCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category') || '';
      const text = card.innerText.toLowerCase();
      const matchCategory = category === 'all' || cardCategory === category;
      const matchSearch = !term || text.includes(term);

      card.style.display = matchCategory && matchSearch ? 'flex' : 'none';
    });
  }

  newsCategoryFilter.addEventListener('change', applyNewsFilter);
  newsSearch.addEventListener('input', applyNewsFilter);
}

// Simple filter for reviews list
const reviewTypeFilter = document.getElementById('reviewTypeFilter');
const reviewSearch = document.getElementById('reviewSearch');
const reviewList = document.getElementById('reviewList');

if (reviewList && reviewTypeFilter && reviewSearch) {
  const reviewCards = Array.from(reviewList.querySelectorAll('.card'));

  function applyReviewFilter() {
    const type = reviewTypeFilter.value;
    const term = reviewSearch.value.toLowerCase();

    reviewCards.forEach((card) => {
      const cardType = card.getAttribute('data-type') || '';
      const labels = (card.getAttribute('data-labels') || '').toLowerCase();
      const text = card.innerText.toLowerCase();

      const matchType = type === 'all' || cardType === type;
      const matchSearch = !term || labels.includes(term) || text.includes(term);

      card.style.display = matchType && matchSearch ? 'flex' : 'none';
    });
  }

  reviewTypeFilter.addEventListener('change', applyReviewFilter);
  reviewSearch.addEventListener('input', applyReviewFilter);
}

// Dorm filters (distance, price, type, search)
const dormList = document.getElementById('dormList');
const dormSearch = document.getElementById('dormSearch');
const dormDistanceFilter = document.getElementById('dormDistanceFilter');
const dormPriceFilter = document.getElementById('dormPriceFilter');
const dormTypeFilter = document.getElementById('dormTypeFilter');

if (
  dormList &&
  dormSearch &&
  dormDistanceFilter &&
  dormPriceFilter &&
  dormTypeFilter
) {
  const dormCards = Array.from(dormList.querySelectorAll('.dorm-card'));

  function applyDormFilter() {
    const term = dormSearch.value.toLowerCase();
    const maxDistance = dormDistanceFilter.value;
    const priceRange = dormPriceFilter.value;
    const type = dormTypeFilter.value;

    let minPriceFilter = 0;
    let maxPriceFilter = Infinity;
    if (priceRange !== 'all') {
      const [minStr, maxStr] = priceRange.split('-');
      minPriceFilter = parseFloat(minStr);
      maxPriceFilter = parseFloat(maxStr);
    }

    dormCards.forEach((card) => {
      const labels = (card.getAttribute('data-labels') || '').toLowerCase();
      const distance = parseFloat(card.getAttribute('data-distance') || '0');
      const minPrice = parseFloat(card.getAttribute('data-minprice') || '0');
      const maxPrice = parseFloat(card.getAttribute('data-maxprice') || '0');
      const dormType = card.getAttribute('data-type') || '';

      const matchSearch =
        !term ||
        labels.includes(term) ||
        card.innerText.toLowerCase().includes(term);

      const matchDistance =
        maxDistance === 'all' || distance <= parseFloat(maxDistance);

      const matchPrice =
        priceRange === 'all' ||
        (minPrice <= maxPriceFilter && maxPrice >= minPriceFilter);

      const matchType = type === 'all' || dormType === type;

      const visible = matchSearch && matchDistance && matchPrice && matchType;
      card.style.display = visible ? 'flex' : 'none';
    });
  }

  dormSearch.addEventListener('input', applyDormFilter);
  dormDistanceFilter.addEventListener('change', applyDormFilter);
  dormPriceFilter.addEventListener('change', applyDormFilter);
  dormTypeFilter.addEventListener('change', applyDormFilter);
}
