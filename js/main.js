// Database simulation using localStorage
class Database {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        // Initialize news if not exists
        if (!localStorage.getItem('news')) {
            const defaultNews = [
                {
                    id: 1,
                    title: "إعلان عن مسابقة توظيف",
                    summary: "تعلم بلدية المدينة عن فتح باب التسجيل في مسابقة توظيف لعدة مناصب إدارية وفنية",
                    date: "2023-05-20",
                    status: "published",
                    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1770&q=80"
                },
                {
                    id: 2,
                    title: "افتتاح مشروع الحديقة العامة",
                    summary: "تم افتتاح مشروع الحديقة العامة الجديدة في حي النخيل بعد اكتمال جميع الأعمال",
                    date: "2023-05-18",
                    status: "published",
                    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1770&q=80"
                },
                {
                    id: 3,
                    title: "اجتماع المجلس البلدي",
                    summary: "يعقد المجلس الشعبي البلدي اجتماعه الدوري يوم الأحد القادم لمناقشة several مشاريع",
                    date: "2023-05-15",
                    status: "draft",
                    image: "https://images.unsplash.com/photo-1450101499163-c8848c71ca85?auto=format&fit=crop&w=1770&q=80"
                }
            ];
            localStorage.setItem('news', JSON.stringify(defaultNews));
        }

        // Initialize projects if not exists
        if (!localStorage.getItem('projects')) {
            const defaultProjects = [
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
                },
                {
                    id: 3,
                    name: "مشروع المتحف البلدي",
                    description: "إنشاء متحف بلدي يعرض تاريخ المدينة وتراثها الثقافي",
                    progress: 10,
                    status: "planned",
                    cost: "8 ملايين ريال"
                }
            ];
            localStorage.setItem('projects', JSON.stringify(defaultProjects));
        }

        // Initialize services if not exists
        if (!localStorage.getItem('services')) {
            const defaultServices = [
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
                },
                {
                    id: 3,
                    name: "رخص المركبات",
                    description: "تجديد رخص المركبات، نقل الملكية، وإصدار بدل فاقد",
                    category: "vehicles",
                    icon: "fas fa-car"
                },
                {
                    id: 4,
                    name: "رخص تجارية",
                    description: "إصدار وتجديد الرخص التجارية للمؤسسات والشركات",
                    category: "commercial",
                    icon: "fas fa-briefcase"
                }
            ];
            localStorage.setItem('services', JSON.stringify(defaultServices));
        }
    }

    getNews() {
        return JSON.parse(localStorage.getItem('news') || '[]');
    }

    getProjects() {
        return JSON.parse(localStorage.getItem('projects') || '[]');
    }

    getServices() {
        return JSON.parse(localStorage.getItem('services') || '[]');
    }

    addNews(news) {
        const newsList = this.getNews();
        news.id = Date.now();
        news.date = new Date().toISOString().split('T')[0];
        newsList.unshift(news);
        localStorage.setItem('news', JSON.stringify(newsList));
    }

    addProject(project) {
        const projectsList = this.getProjects();
        project.id = Date.now();
        projectsList.unshift(project);
        localStorage.setItem('projects', JSON.stringify(projectsList));
    }

    addService(service) {
        const servicesList = this.getServices();
        service.id = Date.now();
        servicesList.unshift(service);
        localStorage.setItem('services', JSON.stringify(servicesList));
    }

    deleteNews(id) {
        const newsList = this.getNews();
        const filtered = newsList.filter(news => news.id !== id);
        localStorage.setItem('news', JSON.stringify(filtered));
    }

    deleteProject(id) {
        const projectsList = this.getProjects();
        const filtered = projectsList.filter(project => project.id !== id);
        localStorage.setItem('projects', JSON.stringify(filtered));
    }

    deleteService(id) {
        const servicesList = this.getServices();
        const filtered = servicesList.filter(service => service.id !== id);
        localStorage.setItem('services', JSON.stringify(filtered));
    }
}

// Initialize database
const db = new Database();

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');

// Show home section by default
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('accueil').classList.add('active');
    loadNews();
    loadProjects();
    loadServices();
});

// Navigation functionality
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Check if it's an external link
        if (this.getAttribute('href').startsWith('admin.html')) {
            return;
        }

        e.preventDefault();
        
        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Show corresponding section
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.add('active');
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Load news dynamically
function loadNews() {
    const newsContainer = document.getElementById('newsContainer');
    const news = db.getNews();
    
    newsContainer.innerHTML = news.map(item => `
        <div class="news-card">
            <div class="news-img">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="news-content">
                <div class="news-date">${item.date}</div>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <a href="#" class="btn">التفاصيل</a>
            </div>
        </div>
    `).join('');
}

// Load projects dynamically
function loadProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    const projects = db.getProjects();
    
    projectsContainer.innerHTML = projects.map(project => {
        const statusClass = `status-${project.status}`;
        const statusText = {
            'completed': 'مكتمل',
            'ongoing': 'جاري',
            'planned': 'مستقبلي'
        }[project.status];
        
        return `
            <div class="project-card" data-category="${project.status}">
                <div class="project-img">
                    <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1770&q=80" alt="${project.name}">
                </div>
                <div class="project-content">
                    <span class="project-status ${statusClass}">${statusText}</span>
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${project.progress}%;"></div>
                    </div>
                    <p>نسبة الإنجاز: ${project.progress}%</p>
                    <p>التكلفة: ${project.cost}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Load services dynamically
function loadServices() {
    const servicesContainer = document.getElementById('servicesContainer');
    const services = db.getServices();
    
    servicesContainer.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <div class="service-content">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <a href="#" class="btn">تقديم طلب</a>
            </div>
        </div>
    `).join('');
}

// Project filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.style.backgroundColor = 'var(--success-color)';
        successMessage.style.color = 'white';
        successMessage.style.padding = '15px';
        successMessage.style.borderRadius = '5px';
        successMessage.style.marginTop = '20px';
        successMessage.style.textAlign = 'center';
        successMessage.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
        
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}