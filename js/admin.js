// فئة إدارة قاعدة البيانات
class AdminDatabase {
    constructor() {
        this.loadData();
    }
    
    loadData() {
        try {
            // تحميل البيانات من localStorage
            this.users = JSON.parse(localStorage.getItem('municipality_users') || '[]');
            this.news = JSON.parse(localStorage.getItem('municipality_news') || '[]');
            this.projects = JSON.parse(localStorage.getItem('municipality_projects') || '[]');
            this.services = JSON.parse(localStorage.getItem('municipality_services') || '[]');
            this.settings = JSON.parse(localStorage.getItem('municipality_settings') || '{}');
            
            // تهيئة البيانات الافتراضية
            this.initializeDefaultData();
        } catch (error) {
            console.error('Error loading data:', error);
            this.initializeDefaultData();
        }
    }
    
    initializeDefaultData() {
        // تهيئة المستخدمين الافتراضيين
        if (this.users.length === 0) {
            this.users = [{
                id: 1,
                username: 'admin',
                email: 'admin@mun.gov.sa',
                password: 'admin123',
                role: 'admin',
                active: true
            }];
            this.saveUsers();
        }
        
        // تهيئة الأخبار الافتراضية
        if (this.news.length === 0) {
            this.news = [
                {
                    id: 1,
                    title: "إعلان عن مسابقة توظيف",
                    summary: "تعلم بلدية المدينة عن فتح باب التسجيل في مسابقة توظيف لعدة مناصب إدارية وفنية",
                    content: "تعلم بلدية المدينة عن فتح باب التسجيل في مسابقة توظيف لعدة مناصب إدارية وفنية. يرجى من الشركات المهنية المهتمة تقديم عروضها في الموعد المحدد.",
                    date: "2023-05-20",
                    status: "published",
                    image: "https://via.placeholder.com/400x200"
                },
                {
                    id: 2,
                    title: "افتتاح مشروع الحديقة العامة",
                    summary: "تم افتتاح مشروع الحديقة العامة الجديدة في حي النخيل بعد اكتمال جميع الأعمال",
                    content: "تم افتتاح مشروع الحديقة العامة الجديدة في حي النخيل بعد اكتمال جميع الأعمال. تشمل الحديقة مساحات خضراء وملاعب أطفال ومسارات للمشي والجري.",
                    date: "2023-05-18",
                    status: "published",
                    image: "https://via.placeholder.com/400x200"
                }
            ];
            this.saveNews();
        }
        
        // تهيئة المشاريع الافتراضية
        if (this.projects.length === 0) {
            this.projects = [
                {
                    id: 1,
                    name: "مشروع تجديد شارع الملك عبدالله",
                    description: "تجديد كامل لشارع الملك عبدالله بما في ذلك رصف الطريق وإنارة الشوارع",
                    progress: 100,
                    status: "completed",
                    cost: "5 ملايين ريال"
                },
                {
                    id: 2,
                    name: "مشروع توسعة المستشفى العام",
                    description: "إضافة جناح جديد للمستشفى بسعة 100 سرير وتجهيزه بأحدث المعدات الطبية",
                    progress: 65,
                    status: "ongoing",
                    cost: "25 مليون ريال"
                }
            ];
            this.saveProjects();
        }
        
        // تهيئة الخدمات الافتراضية
        if (this.services.length === 0) {
            this.services = [
                {
                    id: 1,
                    name: "وثائق شخصية",
                    description: "استخراج شهادات الميلاد، الوفاة، الزواج، والبطاقة الشخصية",
                    category: "documents",
                    icon: "fas fa-id-card"
                },
                {
                    id: 2,
                    name: "خدمات عقارية",
                    description: "استخراج وثائق الملكية، صكوك العقار، ورخص البناء",
                    category: "properties",
                    icon: "fas fa-home"
                }
            ];
            this.saveServices();
        }
        
        // تهيئة الإعدادات الافتراضية
        if (!this.settings.siteName) {
            this.settings = {
                siteName: 'بلدية المدينة',
                adminEmail: 'admin@mun.gov.sa',
                contactPhone: '0123456789',
                primaryColor: '#1a5276'
            };
            this.saveSettings();
        }
    }
    
    // إدارة المستخدمين
    getUsers() {
        return this.users;
    }
    
    addUser(user) {
        user.id = Date.now();
        user.active = user.active !== false;
        this.users.push(user);
        this.saveUsers();
    }
    
    deleteUser(id) {
        this.users = this.users.filter(user => user.id !== id);
        this.saveUsers();
    }
    
    saveUsers() {
        localStorage.setItem('municipality_users', JSON.stringify(this.users));
    }
    
    // إدارة الأخبار
    getNews() {
        return this.news;
    }
    
    addNews(news) {
        news.id = Date.now();
        news.date = new Date().toISOString().split('T')[0];
        this.news.unshift(news);
        this.saveNews();
    }
    
    deleteNews(id) {
        this.news = this.news.filter(news => news.id !== id);
        this.saveNews();
    }
    
    saveNews() {
        localStorage.setItem('municipality_news', JSON.stringify(this.news));
    }
    
    // إدارة المشاريع
    getProjects() {
        return this.projects;
    }
    
    addProject(project) {
        project.id = Date.now();
        this.projects.unshift(project);
        this.saveProjects();
    }
    
    deleteProject(id) {
        this.projects = this.projects.filter(project => project.id !== id);
        this.saveProjects();
    }
    
    saveProjects() {
        localStorage.setItem('municipality_projects', JSON.stringify(this.projects));
    }
    
    // إدارة الخدمات
    getServices() {
        return this.services;
    }
    
    addService(service) {
        service.id = Date.now();
        this.services.unshift(service);
        this.saveServices();
    }
    
    deleteService(id) {
        this.services = this.services.filter(service => service.id !== id);
        this.saveServices();
    }
    
    saveServices() {
        localStorage.setItem('municipality_services', JSON.stringify(this.services));
    }
    
    // إدارة الإعدادات
    getSettings() {
        return this.settings;
    }
    
    updateSettings(settings) {
        this.settings = { ...this.settings, ...settings };
        this.saveSettings();
    }
    
    saveSettings() {
        localStorage.setItem('municipality_settings', JSON.stringify(this.settings));
    }
    
    // المصادقة
    authenticate(username, password) {
        return this.users.find(user => 
            user.username === username && 
            user.password === password && 
            user.active
        );
    }
}

// تهيئة قاعدة بيانات المشرف
const adminDb = new AdminDatabase();

// عناصر DOM
const loginForm = document.getElementById('loginForm');
const loginPage = document.getElementById('loginPage');
const dashboard = document.getElementById('dashboard');
const logoutBtn = document.getElementById('logoutBtn');
const sidebarLinks = document.querySelectorAll('.sidebar-menu a[data-page]');

// وظيفة تسجيل الدخول
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const user = adminDb.authenticate(username, password);
        
        if (user) {
            // إخفاء صفحة تسجيل الدخول وإظهار لوحة التحكم
            loginPage.style.display = 'none';
            dashboard.style.display = 'flex';
            
            // تحميل بيانات لوحة التحكم
            loadDashboardData();
        } else {
            showMessage('اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
        }
    });
}

// وظيفة تسجيل الخروج
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // إظهار صفحة تسجيل الدخول وإخفاء لوحة التحكم
        dashboard.style.display = 'none';
        loginPage.style.display = 'flex';
        
        // إعادة تعيين النموذج
        if (loginForm) {
            loginForm.reset();
        }
    });
}

// التنقل في الشريط الجانبي
sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // إزالة الفئة النشطة من جميع الروابط
        sidebarLinks.forEach(l => l.classList.remove('active'));
        
        // إضافة الفئة النشطة للرابط المضغوط
        this.classList.add('active');
        
        // إخفاء جميع أقسام المحتوى
        document.querySelectorAll('[id$="Content"]').forEach(section => {
            if (section) section.style.display = 'none';
        });
        
        // إظهار قسم المحتوى المحدد
        const page = this.getAttribute('data-page');
        const section = document.getElementById(page + 'Content');
        if (section) {
            section.style.display = 'block';
            loadSectionData(page);
        }
    });
});

// تحميل بيانات لوحة التحكم
function loadDashboardData() {
    // تحديث الأعداد
    const newsCount = document.getElementById('newsCount');
    const projectsCount = document.getElementById('projectsCount');
    const servicesCount = document.getElementById('servicesCount');
    const usersCount = document.getElementById('usersCount');
    
    if (newsCount) newsCount.textContent = adminDb.getNews().length;
    if (projectsCount) projectsCount.textContent = adminDb.getProjects().length;
    if (servicesCount) servicesCount.textContent = adminDb.getServices().length;
    if (usersCount) usersCount.textContent = adminDb.getUsers().length;
    
    // تحميل آخر الأخبار في لوحة التحكم
    loadRecentNews();
}

// تحميل آخر الأخبار للوحة التحكم
function loadRecentNews() {
    const recentNews = document.getElementById('recentNews');
    if (recentNews) {
        const news = adminDb.getNews().slice(0, 3);
        recentNews.innerHTML = news.map(item => `
            <div class="recent-news-item">
                <h4>${item.title}</h4>
                <p>${item.summary}</p>
                <div class="date">${item.date}</div>
            </div>
        `).join('');
    }
}

// تحميل بيانات القسم المحدد
function loadSectionData(page) {
    switch(page) {
        case 'news':
            loadNewsData();
            break;
        case 'projects':
            loadProjectsData();
            break;
        case 'services':
            loadServicesData();
            break;
        case 'users':
            loadUsersData();
            break;
    }
}

// تحميل بيانات الأخبار
function loadNewsData() {
    const news = adminDb.getNews();
    const tbody = document.getElementById('newsTableBody');
    
    if (tbody) {
        tbody.innerHTML = news.map(item => `
            <tr>
                <td>${item.title}</td>
                <td>${item.summary.substring(0, 50)}...</td>
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

// تحميل بيانات المشاريع
function loadProjectsData() {
    const projects = adminDb.getProjects();
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
                    <td>${project.description ? project.description.substring(0, 50) + '...' : ''}</td>
                    <td>${project.progress || 0}%</td>
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

// تحميل بيانات الخدمات
function loadServicesData() {
    const services = adminDb.getServices();
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
                    <td>${service.description ? service.description.substring(0, 50) + '...' : ''}</td>
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

// تحميل بيانات المستخدمين
function loadUsersData() {
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
                    <td>
                        <span style="color: ${user.active ? 'var(--success-color)' : 'var(--warning-color)'};">
                            ${user.active ? 'نشط' : 'معطل'}
                        </span>
                    </td>
                    <td class="actions">
                        <a href="#" onclick="editUser(${user.id})"><i class="fas fa-edit"></i></a>
                        <a href="#" class="delete" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

// إدارة النوافذ المنبثقة
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

// إعداد النوافذ المنبثقة
Object.keys(modals).forEach(modalId => {
    const modal = document.getElementById(modalId);
    const config = modals[modalId];
    
    if (!modal) return;
    
    // فتح النافذة
    if (config.trigger) {
        const triggerBtn = document.getElementById(config.trigger);
        if (triggerBtn) {
            triggerBtn.addEventListener('click', function() {
                modal.style.display = 'flex';
            });
        }
    }
    
    // إغلاق النافذة
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
    
    // حفظ النافذة
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
    
    // إغلاق النافذة عند النقر خارجها
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

// التعامل مع حفظ النوافذ المنبثقة
function handleModalSave(modalId, form) {
    switch(modalId) {
        case 'addNewsModal':
            const news = {
                title: document.getElementById('newsTitle').value,
                summary: document.getElementById('newsSummary').value,
                content: document.getElementById('newsContent').value,
                status: document.getElementById('newsStatus').value,
                image: 'https://via.placeholder.com/400x200'
            };
            adminDb.addNews(news);
            loadNewsData();
            loadDashboardData();
            showMessage('تمت إضافة الخبر بنجاح!', 'success');
            break;
            
        case 'addProjectModal':
            const project = {
                name: document.getElementById('projectName').value,
                description: document.getElementById('projectDescription').value,
                progress: parseInt(document.getElementById('projectProgress').value),
                status: document.getElementById('projectStatus').value,
                cost: document.getElementById('projectCost').value
            };
            adminDb.addProject(project);
            loadProjectsData();
            loadDashboardData();
            showMessage('تمت إضافة المشروع بنجاح!', 'success');
            break;
            
        case 'addServiceModal':
            const service = {
                name: document.getElementById('serviceName').value,
                description: document.getElementById('serviceDescription').value,
                category: document.getElementById('serviceCategory').value,
                icon: document.getElementById('serviceIcon').value
            };
            adminDb.addService(service);
            loadServicesData();
            loadDashboardData();
            showMessage('تمت إضافة الخدمة بنجاح!', 'success');
            break;
            
        case 'addUserModal':
            const user = {
                username: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                password: document.getElementById('userPassword').value,
                role: document.getElementById('userRole').value,
                active: document.getElementById('userActive').checked
            };
            adminDb.addUser(user);
            loadUsersData();
            loadDashboardData();
            showMessage('تمت إضافة المستخدم بنجاح!', 'success');
            break;
    }
}

// وظائف الحذف
function deleteNews(id) {
    if (confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
        adminDb.deleteNews(id);
        loadNewsData();
        loadDashboardData();
        showMessage('تم حذف الخبر بنجاح', 'success');
    }
}

function deleteProject(id) {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
        adminDb.deleteProject(id);
        loadProjectsData();
        loadDashboardData();
        showMessage('تم حذف المشروع بنجاح', 'success');
    }
}

function deleteService(id) {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
        adminDb.deleteService(id);
        loadServicesData();
        loadDashboardData();
        showMessage('تم حذف الخدمة بنجاح', 'success');
    }
}

function deleteUser(id) {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
        adminDb.deleteUser(id);
        loadUsersData();
        loadDashboardData();
        showMessage('تم حذف المستخدم بنجاح', 'success');
    }
}

// وظيفة عرض الرسائل
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        background-color: ${type === 'success' ? 'var(--success-color)' : 
                          type === 'error' ? 'var(--accent-color)' : 
                          'var(--secondary-color)'};
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

// إضافة أنيميشن للرسائل
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// وظائف التحرير (نماذج مؤقتة)
function editNews(id) {
    showMessage('تحرير الخبر سيكون متاحاً في الإصدار القادم', 'info');
}

function editProject(id) {
    showMessage('تحرير المشروع سيكون متاحاً في الإصدار القادم', 'info');
}

function editService(id) {
    showMessage('تحرير الخدمة سيكون متاحاً في الإصدار القادم', 'info');
}

function editUser(id) {
    showMessage('تحرير المستخدم سيكون متاحاً في الإصدار القادم', 'info');
}

// تبويبات الإعدادات
const settingsTabs = document.querySelectorAll('.settings-tab');
if (settingsTabs) {
    settingsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع التبويبات والمحتويات
            settingsTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.settings-content').forEach(c => c.classList.remove('active'));
            
            // إضافة الفئة النشطة للتبويب المضغوط
            this.classList.add('active');
            
            // إظهار المحتوى المقابل
            const tabId = this.getAttribute('data-tab');
            const content = document.getElementById(tabId + 'Settings');
            if (content) {
                content.classList.add('active');
            }
        });
    });
}

// نماذج الإعدادات
const generalSettingsForm = document.getElementById('generalSettingsForm');
if (generalSettingsForm) {
    generalSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const settings = {
            siteName: document.getElementById('siteName').value,
            adminEmail: document.getElementById('adminEmail').value,
            contactPhone: document.getElementById('contactPhone').value
        };
        
        adminDb.updateSettings(settings);
        showMessage('تم حفظ الإعدادات بنجاح!', 'success');
    });
}

const appearanceSettingsForm = document.getElementById('appearanceSettingsForm');
if (appearanceSettingsForm) {
    appearanceSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const selectedColor = document.querySelector('.color-option.selected');
        if (selectedColor) {
            const settings = {
                primaryColor: selectedColor.style.backgroundColor
            };
            
            adminDb.updateSettings(settings);
            showMessage('تم حفظ الإعدادات بنجاح!', 'success');
        }
    });
}

// منتقي الألوان
const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        colorOptions.forEach(o => o.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// تبديل القائمة للموبايل
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });
}

// التحقق من صلاحيات المسؤول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من وجود صفحة تسجيل الدخول ولوحة التحكم
    if (loginPage && dashboard) {
        // إخفاء لوحة التحكم بشكل افتراضي
        dashboard.style.display = 'none';
        
        // التحقق من وجود جلسة نشطة (يمكن إضافتها لاحقاً)
        const isLoggedIn = localStorage.getItem('adminLoggedIn');
        if (isLoggedIn === 'true') {
            loginPage.style.display = 'none';
            dashboard.style.display = 'flex';
            loadDashboardData();
        }
    }
});

// إضافة دعم للوحة المفاتيح
document.addEventListener('keydown', function(e) {
    // ESC لإغلاق النوافذ المنبثقة
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
    
    // Ctrl+S لحفظ في النوافذ المفتوحة
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        const visibleModal = document.querySelector('.modal[style*="flex"]');
        if (visibleModal) {
            const saveBtn = visibleModal.querySelector('[id$="Btn"]');
            if (saveBtn && saveBtn.textContent.includes('حفظ')) {
                saveBtn.click();
            }
        }
    }
});

// تحسين الأداء - تأخير تحميل البيانات غير الضرورية
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// استخدام debounce لتحديث البيانات
const debouncedLoadData = debounce(loadDashboardData, 300);

// إضافة دعم للطباعة
window.addEventListener('beforeprint', function() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
});

// إضافة دعم للتركيز على العناصر التفاعلية
document.addEventListener('focusin', function(e) {
    if (e.target.matches('input, textarea, select, button')) {
        e.target.style.outline = '2px solid var(--secondary-color)';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.matches('input, textarea, select, button')) {
        e.target.style.outline = 'none';
    }
});
