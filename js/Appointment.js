  document.addEventListener('DOMContentLoaded', function() {
            // Load appointments from localStorage
            function loadAppointments() {
                return JSON.parse(localStorage.getItem('appointments')) || [];
            }

            // Save appointments to localStorage
            function saveAppointments(appointments) {
                localStorage.setItem('appointments', JSON.stringify(appointments));
            }

            // Categorize appointments by status
            function categorizeAppointments(appointments) {
                return {
                    upcoming: appointments.filter(a => a.status === 'upcoming'),
                    past: appointments.filter(a => a.status === 'past'),
                    cancelled: appointments.filter(a => a.status === 'cancelled')
                };
            }

            // Format date for display
            function formatDate(dateString) {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(dateString).toLocaleDateString(undefined, options);
            }

            // Render appointment cards
            function renderAppointmentCard(appointment, tabType) {
                const card = document.createElement('div');
                card.className = 'appointment-card';
                card.dataset.id = appointment.id;

                // Create status badge
                let statusClass = '';
                let statusText = '';
                
                switch(appointment.status) {
                    case 'upcoming':
                        statusClass = 'status-upcoming';
                        statusText = 'Upcoming';
                        break;
                    case 'past':
                        statusClass = 'status-completed';
                        statusText = 'Completed';
                        break;
                    case 'cancelled':
                        statusClass = 'status-cancelled';
                        statusText = 'Cancelled';
                        break;
                }

                card.innerHTML = `
                    <div class="appointment-header">
                        <img src="${appointment.doctorImage}" alt="${appointment.doctorName}">
                        <div class="doctor-info">
                            <h3>${appointment.doctorName}</h3>
                            <p>${appointment.doctorSpecialty}</p>
                        </div>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                    <div class="appointment-details">
                        <div class="detail-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Date: ${formatDate(appointment.appointmentDate)}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-user"></i>
                            <span>Patient: ${appointment.patientName}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-phone"></i>
                            <span>Phone: ${appointment.patientPhone}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-envelope"></i>
                            <span>Email: ${appointment.patientEmail}</span>
                        </div>
                    </div>
                `;

                // Add action buttons based on tab type
                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'appointment-actions';

                if (tabType === 'upcoming') {
                    actionsDiv.innerHTML = `
                        <button class="btn btn-danger cancel-btn">Cancel Appointment</button>
                        <button class="btn btn-outline reschedule-btn">Reschedule</button>
                    `;
                    
                    // Add event listener for cancel button
                    actionsDiv.querySelector('.cancel-btn').addEventListener('click', function() {
                        cancelAppointment(appointment.id);
                    });
                    
                    // Add event listener for reschedule button
                    actionsDiv.querySelector('.reschedule-btn').addEventListener('click', function() {
                        alert('Reschedule functionality would open the booking modal');
                    });
                } else if (tabType === 'past') {
                    actionsDiv.innerHTML = `
                        <button class="btn btn-outline">Book Again</button>
                        <button class="btn btn-outline">Leave Review</button>
                    `;
                } else if (tabType === 'cancelled') {
                    actionsDiv.innerHTML = `
                        <button class="btn btn-outline">Book New Appointment</button>
                    `;
                }

                card.appendChild(actionsDiv);
                return card;
            }

            // Cancel an appointment
            function cancelAppointment(appointmentId) {
                if (confirm('Are you sure you want to cancel this appointment?')) {
                    const appointments = loadAppointments();
                    const updatedAppointments = appointments.map(app => {
                        if (app.id === appointmentId) {
                            return { ...app, status: 'cancelled' };
                        }
                        return app;
                    });
                    
                    saveAppointments(updatedAppointments);
                    renderAppointments();
                }
            }

            // Render all appointments
            function renderAppointments() {
                const appointments = loadAppointments();
                const categorized = categorizeAppointments(appointments);
                
                // Update stats
                document.getElementById('upcoming-count').textContent = categorized.upcoming.length;
                document.getElementById('past-count').textContent = categorized.past.length;
                document.getElementById('cancelled-count').textContent = categorized.cancelled.length;
                
                // Render stats cards
                document.getElementById('stats').innerHTML = `
                    <div class="card">
                        <div class="value">${categorized.upcoming.length}</div>
                        <div class="label">Upcoming</div>
                    </div>
                    <div class="card">
                        <div class="value">${categorized.past.length}</div>
                        <div class="label">Completed</div>
                    </div>
                    <div class="card">
                        <div class="value">${categorized.cancelled.length}</div>
                        <div class="label">Cancelled</div>
                    </div>
                `;
                
                // Render appointments for each tab
                renderTabContent('upcoming', categorized.upcoming);
                renderTabContent('past', categorized.past);
                renderTabContent('cancelled', categorized.cancelled);
                
                // Show no appointments message if needed
                if (appointments.length === 0) {
                    document.getElementById('no-appointments').style.display = 'block';
                } else {
                    document.getElementById('no-appointments').style.display = 'none';
                }
                
                // Show content and hide loading
                document.getElementById('loading').style.display = 'none';
                document.getElementById('content').style.display = 'block';
            }
            
            // Render content for a specific tab
            function renderTabContent(tabId, appointments) {
                const container = document.getElementById(tabId);
                container.innerHTML = '';
                
                if (appointments.length === 0) {
                    container.innerHTML = `
                        <div class="empty">
                            <h3>No ${tabId} appointments</h3>
                            <p>You don't have any ${tabId} appointments.</p>
                            ${tabId === 'upcoming' ? '<a href="/doctor.html" class="btn btn-primary">Book Appointment</a>' : ''}
                        </div>
                    `;
                } else {
                    appointments.forEach(appointment => {
                        const card = renderAppointmentCard(appointment, tabId);
                        container.appendChild(card);
                    });
                }
            }
            
            // Set up tab functionality
            function setupTabs() {
                document.querySelectorAll('.tab').forEach(tab => {
                    tab.addEventListener('click', function() {
                        // Remove active class from all tabs and contents
                        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                        
                        // Add active class to clicked tab and corresponding content
                        this.classList.add('active');
                        document.getElementById(this.dataset.tab).classList.add('active');
                    });
                });
            }
            
            // Initialize the page
            function init() {
                setupTabs();
                renderAppointments();
            }
            
            // Simulate loading
            setTimeout(init, 1500);
        });