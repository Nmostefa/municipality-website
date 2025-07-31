// Database management class
class AdminDatabase {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users') || '[]');
        this.settings = JSON.parse(localStorage.getItem('settings') || '{}');
        
        // Initialize default admin user if not exists
        if (this.users.length === 0) {
            this.users.push({
                id: 1,
                username: 'admin',
                email: 'admin@mun.gov.sa',
                password: 'admin123',
                role: 'admin'
            });
            this.saveUsers();
        }
        
        // Initialize default settings if not exists
        if (!this.settings.siteName) {
            this.settings = {
                siteName: 'بلدية المدينة',
                adminEmail: 'admin@mun.gov.sa',
                primaryColor: '#1a5276'
            };
            this.saveSettings();
        }
    }

    // Users management
    getUsers() {
        return this.users;
    }

    addUser(user) {
        user.id = Date.now();
        this.users.push(user);
        this.saveUsers();
    }

    deleteUser(id) {
        this.users = this.users.filter(user => user.id !== id);
        this.saveUsers();
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    // Settings management
    getSettings() {
        return this.settings;
    }

    updateSettings(settings) {
        this.settings = { ...this.settings, ...settings };
        this.saveSettings();
    }

    saveSettings() {
        localStorage.setItem('settings', JSON.stringify(this.settings));
    }

    // Authentication
    authenticate(username, password) {
        return this.users.find(user => 
            user.username === username && user.password === password
        );
    }
}

// Initialize admin database
const adminDb = new AdminDatabase();

// DOM Elements
const loginForm = document.getElementById('loginForm');
const loginPage = document.getElementById('loginPage');
const dashboard = document.getElementById('dashboard');
const logoutBtn = document.getElementById('logoutBtn');
const sidebarLinks = document.querySelectorAll('.sidebar-menu a[data-page]');
const contentSections = {
    'dashboard': 'dashboardContent',
    'news': 'newsContent',
    'projects': 'projectsContent',
    'services': 'servicesContent',
    'users': 'usersContent',
    'settings': 'settingsContent'
};

// Login functionality
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const user = adminDb.authenticate(username, password);
        
        if (user) {
            // Hide login page and show dashboard
            loginPage.style.display = 'none';
            dashboard.style.display = 'flex';
            
            // Load dashboard data
            loadDashboardStats();
            loadRecentNews();
        } else {
            alert('اسم المستخدم أو كلمة المرور غير صحيحة');
        }
    });
}

// Logout functionality
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show login page and hide dashboard
        dashboard.style.display = 'none';
        loginPage.style.display = 'flex';
        
        // Reset form
        if (loginForm) {
            loginForm.reset();
        }
    });
}

// Sidebar navigation
sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        sidebarLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Hide all content sections
        Object.values(contentSections).forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'none';
            }
        });
        
        // Show selected content section
        const page = this.getAttribute('data-page');
        if (contentSections[page]) {
            const section = document.getElementById(contentSections[page]);
            if (section) {
                section.style.display = 'block';
                
                // Load section-specific data
                if (page === 'news') {
                    loadNewsTable();
                } else if (page === 'projects') {
                    loadProjectsTable();
                } else if (page === 'services') {
                    loadServicesTable();
                } else if (page === 'users') {
                    loadUsersTable();
                }
            }
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });
}

// Load dashboard statistics
function loadDashboardStats() {
    const db = new Database();
    
    // Update counts
    document.getElementById('newsCount').textContent = db.getNews().length;
    document.getElementById('projectsCount').textContent = db.getProjects().length;
    document.getElementById('servicesCount').textContent = db.getServices().length;
    document.getElementById('usersCount').textContent = adminDb.getUsers().length;
}

// Load recent news for dashboard
function loadRecentNews() {
    const db = new Database();
    const news = db.getNews().slice(0, 3);
    const container = document.getElementById('recentNews');
    
    if (container) {
        container.innerHTML = news.map(item => `
            <div class="recent-news-item">
                <h4>${item.title}</h4>
                <p>${item.summary}</p>
                <div class="date">${item.date}</div>
            </div>
        `).join('');
    }
}

// Load news table
function loadNewsTable() {
    const db = new Database();
    const news = db.getNews();
    const tbody = document.getElementById('newsTableBody');
    
    if (tbody) {
        tbody.innerHTML = news.map(item => `
            <tr>
                <td>${item.title}</td>
                <td>${item.date}</td>
                <td>
                    <span style="color: ${item.status === 'published' ? 'var(--success-color)' : 'var(--warning-color)'};">
                        ${item.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                </td>
                <td class="actions">
                    <a href="#" onclick="editNews(${item.id})"><i class="fas fa-edit"></i></a>
                    <a href="#" class="delete" onclick="deleteNews(${item.id})"><i class="fas fa-trash"></i></a>
                </td>
            </tr>
        `).join('');
    }
}

// Load projects table
function loadProjectsTable() {
    const db = new Database();
    const projects = db.getProjects();
    const tbody = document.getElementById('projectsTableBody');
    
    if (tbody) {
        tbody.innerHTML = projects.map(project => {
            const statusText = {
                'completed': 'مكتمل',
                'ongoing': 'جاري',
                'planned': 'مستقبلي'
            }[project.status];
            
            return `
                <tr>
                    <td>${project.name}</td>
                    <td>${project.progress}%</td>
                    <td>
                        <span style="color: ${
                            project.status === 'completed' ? 'var(--success-color)' : 
                            project.status === 'ongoing' ? 'var(--warning-color)' : 
                            'var(--secondary-color)'
                        };">
                            ${statusText}
                        </span>
                    </td>
                    <td class="actions">
                        <a href="#" onclick="editProject(${project.id})"><i class="fas fa-edit"></i></a>
                        <a href="#" class="delete" onclick="deleteProject(${project.id})"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

// Load services table
function loadServicesTable() {
    const db = new Database();
    const services = db.getServices();
    const tbody = document.getElementById('servicesTableBody');
    
    if (tbody) {
        tbody.innerHTML = services.map(service => {
            const categoryText = {
                'documents': 'وثائق',
                'properties': 'عقارات',
                'vehicles': 'مركبات',
                'commercial': 'تجارية'
            }[service.category];
            
            return `
                <tr>
                    <td>${service.name}</td>
                    <td>${categoryText}</td>
                    <td class="actions">
                        <a href="#" onclick="editService(${service.id})"><i class="fas fa-edit"></i></a>
                        <a href="#" class="delete" onclick="deleteService(${service.id})"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

// Load users table
function loadUsersTable() {
    const users = adminDb.getUsers();
    const tbody = document.getElementById('usersTableBody');
    
    if (tbody) {
        tbody.innerHTML = users.map(user => {
            const roleText = {
                'admin': 'مدير النظام',
                'editor': 'محرر محتوى',
                'moderator': 'مشرف'
            }[user.role];
            
            return `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${roleText}</td>
                    <td class="actions">
                        <a href="#" onclick="editUser(${user.id})"><i class="fas fa-edit"></i></a>
                        <a href="#" class="delete" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

// Modal management
const modals = {
    'addNewsModal': {
        trigger: 'addNewsBtn',
        cancel: 'cancelNewsBtn',
        save: 'saveNewsBtn',
        form: 'addNewsForm'
    },
    'addProjectModal': {
        trigger: 'addProjectBtn',
        cancel: 'cancelProjectBtn',
        save: 'saveProjectBtn',
        form: 'addProjectForm'
    },
    'addServiceModal': {
        trigger: 'addServiceBtn',
        cancel: 'cancelServiceBtn',
        save: 'saveServiceBtn',
        form: 'addServiceForm'
    },
    'addUserModal': {
        trigger: 'addUserBtn',
        cancel: 'cancelUserBtn',
        save: 'saveUserBtn',
        form: 'addUserForm'
    }
};

// Setup modals
Object.keys(modals).forEach(modalId => {
    const modal = document.getElementById(modalId);
    const config = modals[modalId];
    
    if (!modal) return;
    
    // Open modal
    if (config.trigger) {
        const triggerBtn = document.getElementById(config.trigger);
        if (triggerBtn) {
            triggerBtn.addEventListener('click', function() {
                modal.style.display = 'flex';
            });
        }
    }
    
    // Close modal
    const closeBtns = modal.querySelectorAll('.modal-close, .' + config.cancel);
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.style.display = 'none';
            if (config.form) {
                const form = document.getElementById(config.form);
                if (form) form.reset();
            }
        });
    });
    
    // Save modal
    if (config.save) {
        const saveBtn = document.getElementById(config.save);
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                if (config.form) {
                    const form = document.getElementById(config.form);
                    if (form && form.checkValidity()) {
                        handleModalSave(modalId, form);
                        modal.style.display = 'none';
                        form.reset();
                    } else {
                        form.reportValidity();
                    }
                }
            });
        }
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            if (config.form) {
                const form = document.getElementById(config.form);
                if (form) form.reset();
            }
        }
    });
});

// Handle modal save actions
function handleModalSave(modalId, form) {
    const formData = new FormData(form);
    
    switch(modalId) {
        case 'addNewsModal':
            const news = {
                title: document.getElementById('newsTitle').value,
                summary: document.getElementById('newsSummary').value,
                status: document.getElementById('newsStatus').value
            };
            const db = new Database();
            db.addNews(news);
            loadNewsTable();
            loadDashboardStats();
            alert('تمت إضافة الخبر بنجاح!');
            break;
            
        case 'addProjectModal':
            const project = {
                name: document.getElementById('projectName').value,
                description: document.getElementById('projectDescription').value,
                progress: parseInt(document.getElementById('projectProgress').value),
                status: document.getElementById('projectStatus').value,
                cost: 'محدد لاحقاً'
            };
            const db2 = new Database();
            db2.addProject(project);
            loadProjectsTable();
            loadDashboardStats();
            alert('تمت إضافة المشروع بنجاح!');
            break;
            
        case 'addServiceModal':
            const service = {
                name: document.getElementById('serviceName').value,
                description: document.getElementById('serviceDescription').value,
                category: document.getElementById('serviceCategory').value,
                icon: 'fas fa-cogs'
            };
            const db3 = new Database();
            db3.addService(service);
            loadServicesTable();
            loadDashboardStats();
            alert('تمت إضافة الخدمة بنجاح!');
            break;
            
        case 'addUserModal':
            const user = {
                username: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                password: document.getElementById('userPassword').value,
                role: document.getElementById('userRole').value
            };
            adminDb.addUser(user);
            loadUsersTable();
            loadDashboardStats();
            alert('تمت إضافة المستخدم بنجاح!');
            break;
    }
}

// Delete functions
function deleteNews(id) {
    if (confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
        const db = new Database();
        db.deleteNews(id);
        loadNewsTable();
        loadDashboardStats();
    }
}

function deleteProject(id) {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
        const db = new Database();
        db.deleteProject(id);
        loadProjectsTable();
        loadDashboardStats();
    }
}

function deleteService(id) {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
        const db = new Database();
        db.deleteService(id);
        loadServicesTable();
        loadDashboardStats();
    }
}

function deleteUser(id) {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
        adminDb.deleteUser(id);
        loadUsersTable();
        loadDashboardStats();
    }
}

// Settings tabs
const settingsTabs = document.querySelectorAll('.settings-tab');
if (settingsTabs) {
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            settingsTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.settings-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            const content = document.getElementById(tabId + 'Settings');
            if (content) {
                content.classList.add('active');
            }
        });
    });
}

// Settings forms
const generalSettingsForm = document.getElementById('generalSettingsForm');
if (generalSettingsForm) {
    generalSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const settings = {
            siteName: document.getElementById('siteName').value,
            adminEmail: document.getElementById('adminEmail').value
        };
        
        adminDb.updateSettings(settings);
        alert('تم حفظ الإعدادات بنجاح!');
    });
}

const appearanceSettingsForm = document.getElementById('appearanceSettingsForm');
if (appearanceSettingsForm) {
    appearanceSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const selectedColor = document.querySelector('.color-option.selected');
        if (selectedColor) {
            const settings = {
                primaryColor: selectedColor.getAttribute('data-color')
            };
            
            adminDb.updateSettings(settings);
            alert('تم حفظ الإعدادات بنجاح!');
        }
    });
}

// Color picker
const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        colorOptions.forEach(o => o.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// Edit functions (placeholders)
function editNews(id) {
    alert('تحرير الخبر سيكون متاحاً في الإصدار القادم');
}

function editProject(id) {
    alert('تحرير المشروع سيكون متاحاً في الإصدار القادم');
}

function editService(id) {
    alert('تحرير الخدمة سيكون متاحاً في الإصدار القادم');
}

function editUser(id) {
    alert('تحرير المستخدم سيكون متاحاً في الإصدار القادم');
}