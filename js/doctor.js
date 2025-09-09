document.addEventListener('DOMContentLoaded', function() {
            // Doctor data
            const doctors = [
                {
                    id: 1,
                    name: "Dr. Sarah Johnson",
                    specialty: "Orthodontics",
                    location: "MedLife Center, Floor 3",
                    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                    reviews: "4.9 (128 reviews)",
                    slots: 15
                },
                {
                    id: 2,
                    name: "Dr. Michael Chen",
                    specialty: "Pediatric dentist",
                    location: "SkinCare Clinic, Floor 1",
                    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                    reviews: "4.8 (96 reviews)",
                    slots: 22
                },
                {
                    id: 3,
                    name: "Dr. Emily Rodriguez",
                    specialty: "Endodontics",
                    location: "Children's Hospital, Floor 2",
                    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                    reviews: "4.9 (147 reviews)",
                    slots: 18
                },
                {
                    id: 4,
                    name: "Dr. James Wilson",
                    specialty: "Cosmetic dentistry",
                    location: "NeuroCare Institute, Floor 4",
                    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwa90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                    reviews: "4.7 (112 reviews)",
                    slots: 8
                },
                {
                    id: 5,
                    name: "Dr. Lisa Taylor",
                    specialty: "Oral and maxillofacial surgery",
                    location: "Bone & Joint Center, Floor 2",
                    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                    reviews: "4.8 (94 reviews)",
                    slots: 12
                },
                {
                    id: 6,
                    name: "Dr. Robert Kim",
                    specialty: "Oral and maxillofacial surgery",
                    location: "Heart Health Center, Floor 1",
                    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                    reviews: "4.9 (135 reviews)",
                    slots: 10
                },
                {
                    id: 7,
                    name: "Dr. Amanda Parker",
                    specialty: "Pediatric dentist",
                    location: "SkinCare Clinic, Floor 3",
                    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                    reviews: "4.8 (87 reviews)",
                    slots: 14
                },
                {
                    id: 8,
                    name: "Dr. David Miller",
                    specialty: "Cosmetic dentistry",
                    location: "Children's Hospital, Floor 1",
                    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                    reviews: "4.9 (121 reviews)",
                    slots: 16
                },
                {
                    id: 9,
                    name: "Dr. Jennifer Lee",
                    specialty: "Orthodontics",
                    location: "NeuroCare Institute, Floor 2",
                    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                    reviews: "4.7 (103 reviews)",
                    slots: 9
                }
            ];

            // DOM Elements
            const doctorsGrid = document.getElementById('doctorsGrid');
            const paginationContainer = document.getElementById('pagination');
            const modal = document.getElementById('bookingModal');
            const closeModalBtn = document.querySelector('.close-modal');
            const bookingForm = document.getElementById('bookingForm');
            const confirmationMessage = document.getElementById('confirmationMessage');
            const newBookingBtn = document.getElementById('newBookingBtn');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const searchInput = document.querySelector('.search-box input');
            
            // Pagination variables
            let currentPage = 1;
            const doctorsPerPage = 3;
            let filteredDoctors = [...doctors];
            let totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
            let selectedDoctor = null;
            
            // Initialize the application
            function init() {
                renderDoctors();
                renderPagination();
                setupEventListeners();
            }
            
            // Set up event listeners
            function setupEventListeners() {
                // Book appointment buttons (using event delegation)
                doctorsGrid.addEventListener('click', function(e) {
                    if (e.target.classList.contains('book-btn')) {
                        const doctorId = parseInt(e.target.getAttribute('data-doctor-id'));
                        selectedDoctor = doctors.find(d => d.id === doctorId);
                        
                        if (selectedDoctor) {
                            openBookingModal(selectedDoctor);
                        }
                    }
                });
                
                // Close modal
                closeModalBtn.addEventListener('click', closeModal);
                
                // Click outside modal to close
                window.addEventListener('click', function(event) {
                    if (event.target === modal) {
                        closeModal();
                    }
                });
                
                // Time slot selection (using event delegation)
                document.querySelector('.modal-body').addEventListener('click', function(e) {
                    if (e.target.classList.contains('time-slot')) {
                        // Remove selected class from all slots
                        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                        
                        // Add selected class to clicked slot
                        e.target.classList.add('selected');
                    }
                });
                
                // Form submission
                bookingForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Validate time slot selection
                    const selectedTimeSlot = document.querySelector('.time-slot.selected');
                    if (!selectedTimeSlot) {
                        alert('Please select a time slot for your appointment.');
                        return;
                    }
                    
                    // Get form data
                    const formData = {
                        doctorName: document.getElementById('modalDoctorName').textContent,
                        doctorSpecialty: document.getElementById('modalDoctorSpecialty').textContent,
                        patientName: document.getElementById('patientName').value,
                        patientPhone: document.getElementById('patientPhone').value,
                        patientEmail: document.getElementById('patientEmail').value,
                        appointmentDate: document.getElementById('appointmentDate').value,
                        doctorImage: selectedDoctor.image
                    };
                    
                    // Save to localStorage
                    saveAppointment(formData);
                    
                    // Show confirmation message
                    bookingForm.style.display = 'none';
                    confirmationMessage.style.display = 'block';
                });
                
                // New booking button
                newBookingBtn.addEventListener('click', function() {
                    closeModal();
                    // Reset the page to show all doctors
                    filteredDoctors = [...doctors];
                    currentPage = 1;
                    renderDoctors();
                    renderPagination();
                });
                
                // Filter functionality
                filterButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Remove active class from all buttons
                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        
                        // Add active class to clicked button
                        this.classList.add('active');
                        
                        // Filter doctors based on specialty
                        const specialty = this.textContent;
                        if (specialty === 'All Specialties') {
                            filteredDoctors = [...doctors];
                        } else {
                            filteredDoctors = doctors.filter(doctor => 
                                doctor.specialty === specialty
                            );
                        }
                        
                        // Reset to first page and render
                        currentPage = 1;
                        renderDoctors();
                        renderPagination();
                    });
                });
                
                // Search functionality
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    
                    if (searchTerm) {
                        filteredDoctors = doctors.filter(doctor => 
                            doctor.name.toLowerCase().includes(searchTerm) || 
                            doctor.specialty.toLowerCase().includes(searchTerm) ||
                            doctor.location.toLowerCase().includes(searchTerm)
                        );
                    } else {
                        // If search is empty, show all doctors
                        const activeFilter = document.querySelector('.filter-btn.active').textContent;
                        if (activeFilter === 'All Specialties') {
                            filteredDoctors = [...doctors];
                        } else {
                            filteredDoctors = doctors.filter(doctor => 
                                doctor.specialty === activeFilter
                            );
                        }
                    }
                    
                    // Reset to first page and render
                    currentPage = 1;
                    renderDoctors();
                    renderPagination();
                });
            }
            
            // Render doctors based on current page
            function renderDoctors() {
                doctorsGrid.innerHTML = '';
                
                const startIndex = (currentPage - 1) * doctorsPerPage;
                const endIndex = startIndex + doctorsPerPage;
                const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);
                
                if (paginatedDoctors.length === 0) {
                    doctorsGrid.innerHTML = '<p class="no-doctors" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">No doctors found matching your criteria.</p>';
                    return;
                }
                
                paginatedDoctors.forEach(doctor => {
                    const doctorCard = document.createElement('div');
                    doctorCard.className = 'doctor-card';
                    doctorCard.innerHTML = `
                        <div class="card-header">
                            <img src="${doctor.image}" alt="${doctor.name}">
                            <div class="specialty-badge">${doctor.specialty}</div>
                        </div>
                        <div class="card-content">
                            <h3 class="doctor-name">${doctor.name}</h3>
                            <div class="doctor-info">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${doctor.location}</span>
                            </div>
                            <div class="doctor-info">
                                <i class="fas fa-star"></i>
                                <span>${doctor.reviews}</span>
                            </div>
                            <div class="slots">
                                <i class="fas fa-calendar-check"></i>
                                <span>${doctor.slots} slots available this week</span>
                            </div>
                            <button class="book-btn" data-doctor-id="${doctor.id}">Book Appointment</button>
                        </div>
                    `;
                    doctorsGrid.appendChild(doctorCard);
                });
            }
            
            // Render pagination controls
            function renderPagination() {
                paginationContainer.innerHTML = '';
                
                totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
                
                if (totalPages <= 1) {
                    return; // Don't show pagination if there's only one page
                }
                
                // Previous button
                const prevBtn = document.createElement('button');
                prevBtn.className = 'pagination-btn';
                prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
                prevBtn.addEventListener('click', () => {
                    if (currentPage > 1) {
                        currentPage--;
                        renderDoctors();
                        renderPagination();
                    }
                });
                paginationContainer.appendChild(prevBtn);
                
                // Page number buttons
                for (let i = 1; i <= totalPages; i++) {
                    const pageBtn = document.createElement('button');
                    pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
                    pageBtn.textContent = i;
                    pageBtn.addEventListener('click', () => {
                        currentPage = i;
                        renderDoctors();
                        renderPagination();
                    });
                    paginationContainer.appendChild(pageBtn);
                }
                
                // Next button
                const nextBtn = document.createElement('button');
                nextBtn.className = 'pagination-btn';
                nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
                nextBtn.addEventListener('click', () => {
                    if (currentPage < totalPages) {
                        currentPage++;
                        renderDoctors();
                        renderPagination();
                    }
                });
                paginationContainer.appendChild(nextBtn);
            }
            
            // Open booking modal with doctor details
            function openBookingModal(doctor) {
                document.getElementById('modalDoctorImg').src = doctor.image;
                document.getElementById('modalDoctorName').textContent = doctor.name;
                document.getElementById('modalDoctorSpecialty').textContent = doctor.specialty;
                document.getElementById('modalDoctorLocation').textContent = doctor.location;
                
                // Reset form
                bookingForm.reset();
                confirmationMessage.style.display = 'none';
                bookingForm.style.display = 'grid';
                
                // Unselect all time slots
                document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
                
                // Set minimum date to today
                const today = new Date().toISOString().split('T')[0];
                document.getElementById('appointmentDate').setAttribute('min', today);
                
                // Show modal with enhanced CSS
                modal.classList.add('active');
            }
            
            // Close modal
            function closeModal() {
                modal.classList.remove('active');
            }
            
            // In doctor.html, update the saveAppointment function
            function saveAppointment(appointment) {
            let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
            appointment.id = Date.now(); // Unique ID
            appointment.status = 'upcoming'; // Add status field
            appointments.push(appointment);
            localStorage.setItem('appointments', JSON.stringify(appointments));
  }

            // Initialize the application
            init();
        });