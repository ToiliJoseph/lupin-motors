
        // Vehicle Data
        const vehicles = [
            {
                id: 1,
                make: 'volvo',
                model: ' XC90 B6',
                year: 2020,
                price: 7750000,
                mileage: '46,000',
                fuel: 'Petrol',
                transmission: 'Automatic',
                image: 'images/cars/volvo/exterior1.jpg',
                badge: 'Brand new',
                description: 'The volvo xc90 b6  delivers exhilarating performance with its 503-hp twin-turbo inline-six engine. Features include carbon fiber roof, M Sport exhaust, and premium leather interior.'
            },
            {
                id: 2,
                make: 'Range Rover',
                model: 'Vogue 350D',
                year: 2022,
                price: 31000000,
                mileage: '27,000',
                fuel: 'disel',
                transmission: 'Automatic',
                image: 'images/cars/rangeRover/exterior1.jpg',
                badge: 'Brand new',
                description: 'Experience ultimate luxury with the Range Rover Vogue. Features Electric seats, augmented reality HUD, and advanced driver assistance systems.'
            },
            {
                id: 3,
                make: 'toyota',
                model: 'LAND CRUISER ZX ',
                year: 2023,
                price: 15800000,
                mileage: '29,000',
                fuel: 'petrol',
                transmission: 'Automatic',
                image: 'images/cars/pradozx/exterior1.jpg',
                badge: 'Brand new',
                description: 'The Toyota Prado J150  combines supercar performance with everyday usability. Naturally aspirated V10 engine produces 562 horsepower for an unforgettable driving experience.'
            },
            {
                id: 4,
                make: 'mercedes',
                model: 'Benz GLS400D',
                year: 2020,
                price: 14950000,
                mileage: '58,000',
                fuel: 'Disel',
                transmission: 'Automatic',
                image: 'images/cars/mercedes/exterior1.jpg',
                badge: 'New Arrival',
                description: 'The Mercedes Benz GLS400 delivers an exciting performance with its premium features ensuring user comfortability '
            },
            {
                id: 5,
                make: 'Subaru',
                model: 'Forester ',
                year: 2022,
                price: 4799999,
                mileage: '250,000',
                fuel: 'petrol',
                transmission: 'Automatic',
                image: 'images/cars/zubaru/exterior1.jpg',
                badge: 'new arrival',
                description: 'The 2022 Subaru Forester delivers an EPA-estimated fuel economy of up to 26 MPG city / 33 MPG highway (combined 28 MPG)'
            },
            {
                id: 6,
                make: 'Range Rover',
                model: 'SDV8',
                year: 2018,
                price: 19000000,
                mileage: '44,000',
                fuel: 'Disell',
                transmission: 'Automatic',
                image: 'images/cars/Range2/exterior1.jpg',
                badge: 'InStock',
                description: 'The Ranfe Rover Vogue SDV8 offers luxury SUV versatility with 4.4L Twin-turbo Disel V8 engine. updated inteior, panoramic roof, and executive lounge seating.'
            }
        ];

        // Initialize
        document.addEventListener('DOMContentLoaded', function () {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 1000);

            renderVehicles(vehicles);
            animateStats();
            setupScrollListener();
        });

        // Render Vehicles
        function renderVehicles(vehicleList) {
            const grid = document.getElementById('inventoryGrid');
            grid.innerHTML = vehicleList.map(vehicle => `
                <div class="vehicle-card" data-make="${vehicle.make}" data-price="${vehicle.price}" data-year="${vehicle.year}">
                    <span class="vehicle-badge">${vehicle.badge}</span>
                    <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-image">
                    <div class="vehicle-info">
                        <div class="vehicle-header">
                            <div>
                                <h3 class="vehicle-title">${vehicle.make.toUpperCase()} ${vehicle.model}</h3>
                                <p class="vehicle-year">${vehicle.year}</p>
                            </div>
                            <div class="vehicle-price">ksh${vehicle.price.toLocaleString()}</div>
                        </div>
                        <div class="vehicle-specs">
                            <div class="spec">
                                <i class="fas fa-tachometer-alt"></i>
                                ${vehicle.mileage} mi
                            </div>
                            <div class="spec">
                                <i class="fas fa-gas-pump"></i>
                                ${vehicle.fuel}
                            </div>
                            <div class="spec">
                                <i class="fas fa-cog"></i>
                                ${vehicle.transmission}
                            </div>
                        </div>
                        <div class="vehicle-actions">
                            <button class="btn-small btn-details" onclick="openModal(${vehicle.id})">View Details</button>
                            <button class="btn-small btn-contact" onclick="contactAbout(${vehicle.id})">Contact</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Filter Vehicles
        function filterVehicles() {
            const make = document.getElementById('makeFilter').value;
            const priceRange = document.getElementById('priceFilter').value;
            const year = document.getElementById('yearFilter').value;

            let filtered = vehicles;

            if (make) {
                filtered = filtered.filter(v => v.make === make);
            }

            if (year) {
                filtered = filtered.filter(v => v.year == year);
            }

            if (priceRange) {
                if (priceRange === '0-4000000') {
                    filtered = filtered.filter(v => v.price < 4000000);
                } else if (priceRange === '4000000-6000000') {
                    filtered = filtered.filter(v => v.price >= 4000000 && v.price <= 6000000);
                } else if (priceRange === '6000000-11000000') {
                    filtered = filtered.filter(v => v.price >= 6000000 && v.price <= 11000000);
                } else if (priceRange === '11000000+') {
                    filtered = filtered.filter(v => v.price > 11000000);
                }
            }

            renderVehicles(filtered);
        }

        // Modal Functions
        function openModal(vehicleId) {
            window.location.href = `vehicle-detail.html?id=${vehicleId}`;
        }
        function closeModal() {
            document.getElementById('vehicleModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function contactAbout(vehicleId) {
            const vehicle = vehicles.find(v => v.id === vehicleId);
            closeModal();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            // Pre-fill message could be added here
        }

        // Form Handling
        function handleSubmit(e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you shortly.');
            e.target.reset();
        }
        // Force mobile contact layout - form first, info second
function fixContactMobile() {
    if (window.innerWidth <= 768) {
        const content = document.querySelector('.contact-content');
        const left = document.querySelector('.contact-left');
        const right = document.querySelector('.contact-right');
        
        if (content && left && right) {
            content.style.display = 'block';
            content.insertBefore(right, left); // Moves form BEFORE info
        }
    }
}

// Run on load and resize
window.addEventListener('load', fixContactMobile);
window.addEventListener('resize', fixContactMobile);

        // Mobile Menu
        function toggleMobileMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.flexDirection = 'column';
            navLinks.style.background = 'var(--primary)';
            navLinks.style.padding = '2rem';
        }

        // Scroll Effects
        function setupScrollListener() {
            const navbar = document.getElementById('navbar');
            const scrollTop = document.getElementById('scrollTop');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(26, 26, 46, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
                    scrollTop.classList.add('visible');
                } else {
                    navbar.style.background = 'rgba(26, 26, 46, 0.95)';
                    navbar.style.boxShadow = 'none';
                    scrollTop.classList.remove('visible');
                }
            });
        }

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Animate Stats
        function animateStats() {
            const stats = document.querySelectorAll('.stat-number');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.getAttribute('data-target'));
                        animateValue(entry.target, 0, target, 2000);
                        observer.unobserve(entry.target);
                    }
                });
            });

            stats.forEach(stat => observer.observe(stat));
        }

        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Close modal on outside click
        window.onclick = function (event) {
            const modal = document.getElementById('vehicleModal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // Update model filter based on make selection
        document.getElementById('makeFilter').addEventListener('change', function () {
            const make = this.value;
            const modelSelect = document.getElementById('modelFilter');
            const models = {
                'bmw': ['M4 Competition', 'X7 M50i', 'M5 CS'],
                'mercedes': ['S-Class S580', 'AMG GT', 'GLE 63'],
                'audi': ['R8 V10', 'RS7', 'Q8'],
                'porsche': ['911 Carrera S', 'Cayenne Turbo', 'Panamera'],
                'lexus': ['LC 500', 'LX 600', 'RX 500h']
            };

            modelSelect.innerHTML = '<option value="">All Models</option>';
            if (make && models[make]) {
                models[make].forEach(model => {
                    modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
                });
            }
        });
    // API Base URL - Change this when deploying
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : 'https://lupin-motors.onrender.com/api';
// Check if user has already submitted (using email + phone fingerprint)
function hasAlreadySubmitted(email, phone) {
    const submissions = JSON.parse(localStorage.getItem('lupinSubmissions') || '[]');
    const fingerprint = (email + phone).toLowerCase().replace(/\s/g, '');
    return submissions.includes(fingerprint);
}

// Mark user as submitted
function markAsSubmitted(email, phone) {
    const submissions = JSON.parse(localStorage.getItem('lupinSubmissions') || '[]');
    const fingerprint = (email + phone).toLowerCase().replace(/\s/g, '');
    submissions.push(fingerprint);
    localStorage.setItem('lupinSubmissions', JSON.stringify(submissions));
}

// Handle contact form submission
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('contactSubmitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const responseDiv = document.getElementById('contactResponse');
    
    const email = document.getElementById('contactEmail').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    
    // Check for duplicate submission
    if (hasAlreadySubmitted(email, phone)) {
        responseDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-info-circle" style="font-size: 3rem; color: var(--accent); margin-bottom: 1rem; display: block;"></i>
                <h3 style="color: var(--primary); margin-bottom: 0.5rem;">Already Submitted!</h3>
                <p style="color: #666;">You have already sent an inquiry. Our team will contact you soon.</p>
                <p style="color: #888; font-size: 0.9rem; margin-top: 1rem;">Need urgent help? Call us at <strong>+1 (555) 123-4567</strong></p>
            </div>
        `;
        responseDiv.className = 'response-message success';
        responseDiv.style.display = 'block';
        responseDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    responseDiv.className = 'response-message';
    responseDiv.style.display = 'none';
    
    const formData = {
        firstName: document.getElementById('contactFirstName').value.trim(),
        lastName: document.getElementById('contactLastName').value.trim(),
        email: email,
        phone: phone,
        contactMethod: 'email',
        vehicleInterest: document.getElementById('contactInterest').value || 'General Inquiry',
        message: document.getElementById('contactMessage').value.trim()
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/inquiries/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            markAsSubmitted(email, phone);
            
            responseDiv.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #28a745, #34ce57); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; animation: scaleIn 0.5s ease;">
                        <i class="fas fa-check" style="font-size: 2.5rem; color: white;"></i>
                    </div>
                    <h3 style="color: #28a745; font-size: 1.5rem; margin-bottom: 0.5rem;">Successfully Submitted!</h3>
                    <p style="color: #666; font-size: 1.1rem; line-height: 1.6;">Thank you, <strong>${formData.firstName}</strong>! Your inquiry has been received.</p>
                    <p style="color: #888; margin-top: 1rem;">Inquiry ID: <strong style="color: var(--accent);">#${data.inquiryId?.slice(-6).toUpperCase() || 'N/A'}</strong></p>
                    <div style="background: #f8f9fa; border-radius: 10px; padding: 1rem; margin-top: 1.5rem;">
                        <p style="color: #666; font-size: 0.95rem;"><i class="fas fa-clock" style="color: var(--accent); margin-right: 0.5rem;"></i> We typically respond within <strong>24 hours</strong></p>
                        <p style="color: #666; font-size: 0.95rem; margin-top: 0.5rem;"><i class="fas fa-phone" style="color: var(--accent); margin-right: 0.5rem;"></i> For urgent matters: <strong>+1 (555) 123-4567</strong></p>
                    </div>
                </div>
            `;
            responseDiv.className = 'response-message success';
            
            document.getElementById('contactForm').reset();
            
            const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
            formInputs.forEach(input => input.disabled = true);
            submitBtn.style.display = 'none';
            
            setTimeout(() => {
                const newBtn = document.createElement('button');
                newBtn.className = 'submit-btn-contact';
                newBtn.style.marginTop = '1rem';
                newBtn.innerHTML = '<i class="fas fa-plus"></i> Submit Another Inquiry';
                newBtn.onclick = () => {
                    formInputs.forEach(input => input.disabled = false);
                    submitBtn.style.display = 'flex';
                    newBtn.remove();
                    responseDiv.style.display = 'none';
                };
                submitBtn.parentNode.insertBefore(newBtn, submitBtn.nextSibling);
            }, 5000);
            
        } else {
            responseDiv.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-exclamation-circle" style="font-size: 2rem; color: #dc3545; margin-bottom: 0.5rem; display: block;"></i>
                    <strong>Oops!</strong> ${data.message || 'Something went wrong. Please try again.'}
                </div>
            `;
            responseDiv.className = 'response-message error';
        }
        
    } catch (error) {
        console.error('Error:', error);
        responseDiv.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-wifi" style="font-size: 2rem; color: #dc3545; margin-bottom: 0.5rem; display: block;"></i>
                <strong>Network Error</strong><br>Please check your connection and try again.
            </div>
        `;
        responseDiv.className = 'response-message error';
    } finally {
        submitBtn.disabled = false;
        btnText.style.display = 'flex';
        btnLoader.style.display = 'none';
        responseDiv.style.display = 'block';
        responseDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}