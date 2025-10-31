// script.js - basic interactivity for FarmLink
// Stores listings in localStorage so demo works offline and on GitHub Pages

const cropForm = document.getElementById('cropForm');
const cropList = document.getElementById('cropList');
const openFormBtn = document.getElementById('openFormBtn');
const scrollToListings = document.getElementById('scrollToListings');
const clearBtn = document.getElementById('clearBtn');
const weatherEl = document.getElementById('weather');

// Utility: load from localStorage
function loadListings(){
  const raw = localStorage.getItem('farmlink_listings');
  return raw ? JSON.parse(raw) : [];
}

// Utility: save to localStorage
function saveListings(list){
  localStorage.setItem('farmlink_listings', JSON.stringify(list));
}

// Render listings to page
function renderListings(){
  const list = loadListings();
  cropList.innerHTML = '';
  if(list.length === 0){
    cropList.innerHTML = '<p class="muted">No listings yet. Be the first to register a crop!</p>';
    return;
  }
  list.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'crop-card';
    card.innerHTML = `
      <h4>${escapeHtml(item.cropName)} — ${escapeHtml(item.quantity)} kg</h4>
      <p><strong>Farmer:</strong> ${escapeHtml(item.farmerName)}</p>
      <p><strong>Price:</strong> ₹${escapeHtml(item.price)} / quintal</p>
      <p><strong>Location:</strong> ${escapeHtml(item.location)}</p>
      <p><strong>Contact:</strong> <a href="tel:${escapeHtml(item.contact)}">${escapeHtml(item.contact)}</a></p>
    `;
    cropList.appendChild(card);
  });
}

// Escape simple HTML
function escapeHtml(text){
  return String(text).replace(/[&<>"'`]/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;',"`":'&#96;'}[m]; });
}

// Handle form submit
cropForm.addEventListener('submit', function(e){
  e.preventDefault();
  const item = {
    farmerName: document.getElementById('farmerName').value.trim(),
    cropName: document.getElementById('cropName').value.trim(),
    quantity: document.getElementById('quantity').value.trim(),
    price: document.getElementById('price').value.trim(),
    location: document.getElementById('location').value.trim(),
    contact: document.getElementById('contact').value.trim(),
    createdAt: new Date().toISOString()
  };
  if(!item.farmerName || !item.cropName) return alert('Please fill required fields');
  const list = loadListings();
  list.unshift(item);
  saveListings(list);
  cropForm.reset();
  renderListings();
  window.location.href = '#listings';
});

// Clear all (for demo)
clearBtn.addEventListener('click', function(){
  if(confirm('Delete all local demo listings?')){
    localStorage.removeItem('farmlink_listings');
    renderListings();
  }
});

openFormBtn.addEventListener('click', function(){ window.location.href = '#formSection'; });
scrollToListings.addEventListener('click', function(){ window.location.href = '#listings'; });

// Weather (uses Open-Meteo free API)
function fetchWeatherByCoords(lat, lon){
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  fetch(url).then(r => r.json()).then(data => {
    if(data && data.current_weather){
      const w = data.current_weather;
      weatherEl.innerHTML = `<strong>${w.temperature}°C</strong>, Wind ${w.windspeed} km/h (weather code ${w.weathercode})`;
    } else {
      weatherEl.innerText = 'Weather unavailable';
    }
  }).catch(err => {
    console.error(err);
    weatherEl.innerText = 'Unable to fetch weather';
  });
}

// Try browser geolocation first, fallback to a sample location (Hyderabad coords)
function detectWeather(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos => {
      fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
    }, err => {
      // fallback coords: Hyderabad, India
      fetchWeatherByCoords(17.3850,78.4867);
    }, {timeout:8000});
  } else {
    fetchWeatherByCoords(17.3850,78.4867);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', function(){
  renderListings();
  detectWeather();
});