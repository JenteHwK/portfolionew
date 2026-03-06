/**
 * JENTE HOOGWERFF KROON PORTFOLIO
 * JavaScript - Animations & Interactions
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initThemeToggle();
    initCustomCursor();
    initNavigation();
    initParallax();
    initRevealAnimations();
    initSkillCircles();
    initCountUp();
    initSmoothScroll();
    initHeaderScroll();
    initLanguageToggle();
    initProjectsInteraction();
    initBreathingEffect();
    initAboutSection();
    initScrollProgress();
    initBackToTop();
    initContactForm();
    initTimelineAnimations();
});

/**
 * Theme Toggle (Dark/Light Mode)
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Save preference to localStorage
        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        
        // Add a subtle animation effect
        themeToggle.style.transform = 'rotate(360deg) scale(1.1)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

/**
 * Custom Cursor
 */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    // Check if touch device
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor with smooth follow
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower has lag
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .project-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // Special cursor for project items - "View Case" indicator
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-view');
            follower.classList.add('cursor-view');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-view');
            follower.classList.remove('cursor-view');
        });
    });
}

/**
 * Navigation
 */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    let isMenuOpen = false;

    // Mobile menu toggle with enhanced animations
    if (menuToggle && mobileMenu) {
        const openMenu = () => {
            isMenuOpen = true;
            menuToggle.classList.add('active');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Trap focus inside menu for accessibility
            mobileMenu.setAttribute('aria-hidden', 'false');
            menuToggle.setAttribute('aria-expanded', 'true');
        
            // Focus first link after animation
            setTimeout(() => {
                const firstLink = mobileMenu.querySelector('.mobile-nav-link');
                if (firstLink) firstLink.focus();
            }, 800);
        };
        
        const closeMenu = () => {
            isMenuOpen = false;
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            
            mobileMenu.setAttribute('aria-hidden', 'true');
            menuToggle.setAttribute('aria-expanded', 'false');
        };
        
        menuToggle.addEventListener('click', () => {
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu on link click with smooth transition
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Add a small delay for visual feedback
                link.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    link.style.transform = '';
                    closeMenu();
                }, 150);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
                menuToggle.focus();
            }
        });
        
        // Close menu on resize if desktop width
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && isMenuOpen) {
                closeMenu();
            }
        });
        
        // Touch gestures - swipe up to close
        let touchStartY = 0;
        let touchEndY = 0;
        
        mobileMenu.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        mobileMenu.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            const swipeDistance = touchStartY - touchEndY;
            
            // Swipe up to close (threshold: 100px)
            if (swipeDistance > 100 && isMenuOpen) {
                closeMenu();
            }
        }, { passive: true });
        
        // Add hover effect for nav items
        mobileNavItems.forEach(item => {
            const link = item.querySelector('.mobile-nav-link');
            const arrow = item.querySelector('.link-arrow');
            
            item.addEventListener('mouseenter', () => {
                if (arrow) {
                    gsap.to(arrow, {
                        x: 5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            item.addEventListener('mouseleave', () => {
                if (arrow) {
                    gsap.to(arrow, {
                        x: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
}

/**
 * Parallax Scrolling Effect
 */
function initParallax() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const hero = document.querySelector('.hero');
    
    if (!hero || parallaxLayers.length === 0) return;
    
    function updateParallax() {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;
        
        // Only apply parallax while hero is in view
        if (scrollY < heroHeight) {
            parallaxLayers.forEach(layer => {
                const speed = parseFloat(layer.dataset.speed) || 0.5;
                const yPos = scrollY * speed;
                
                layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }
    }
    
    // Use requestAnimationFrame for smooth animation
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    updateParallax();
}

/**
 * Reveal Animations on Scroll
 */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-up');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
    
    // Trigger hero animations after short delay
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal-text').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 150);
        });
    }, 300);
}

/**
 * Circular Skill Progress Indicators
 */
function initSkillCircles() {
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const percent = parseInt(circle.dataset.percent);
                const progressCircle = circle.querySelector('.skill-circle-progress');

                if (progressCircle) {
                    // Calculate stroke-dashoffset based on percentage
                    // Circle circumference = 2 * PI * radius = 2 * PI * 54 = 339.292
                    const circumference = 339.292;
                    const offset = circumference - (percent / 100) * circumference;
                
                setTimeout(() => {
                        progressCircle.style.strokeDashoffset = offset;
                }, 200);
                }
                
                observer.unobserve(circle);
            }
        });
    }, observerOptions);
    
    skillCircles.forEach(circle => observer.observe(circle));
}

/**
 * Count Up Animation
 */
function initCountUp() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                function updateCounter() {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Add background on scroll
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Language Toggle
 */
function initLanguageToggle() {
    const langToggle = document.querySelector('.lang-toggle');
    const flagNL = document.querySelector('.flag-nl');
    const flagEN = document.querySelector('.flag-en');
    
    if (!langToggle) return;
    
    // Check for saved language preference
    let currentLang = localStorage.getItem('portfolio-lang') || 'en';
    
    // Apply saved language on load
    if (currentLang === 'nl') {
        switchLanguage('nl');
    }
    
    langToggle.addEventListener('click', () => {
        // Toggle language
        currentLang = currentLang === 'en' ? 'nl' : 'en';
        switchLanguage(currentLang);
        
        // Save preference
        localStorage.setItem('portfolio-lang', currentLang);
    });
    
    function switchLanguage(lang) {
        // Update flag visuals
        if (lang === 'nl') {
            flagNL.classList.add('active');
            flagEN.classList.remove('active');
        } else {
            flagEN.classList.add('active');
            flagNL.classList.remove('active');
        }
        
        // Update html lang attribute
        document.documentElement.lang = lang;
        
        // Update all translatable elements
        const translatableElements = document.querySelectorAll('[data-en][data-nl]');
        
        translatableElements.forEach(el => {
            const translation = el.dataset[lang];
            if (translation) {
                el.textContent = translation;
            }
        });
    }
}



/**
 * Projects Interactive Case Studies
 */
function initProjectsInteraction() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Split project titles into letters
    splitProjectTitles();

    // Initialize project items
    const projectItems = document.querySelectorAll('.project-item');
    const caseOverlay = document.querySelector('.case-study-overlay');
    const closeBtn = document.querySelector('.case-close-btn');
    const nextProjectBtn = document.querySelector('.next-project-btn');
    const projectsList = document.querySelector('.projects-list');

    if (!caseOverlay || !projectItems.length) return;

    // Project data for case studies
    const projectsData = {
        ecommerce: {
            index: '01',
            title: 'E-Commerce Platform',
            year: '2025',
            category: { en: 'Web Development', nl: 'Webontwikkeling' },
            heroImage: 'images/bc1.jpeg',
            problem: {
                en: 'The client needed a modern e-commerce solution that could handle high traffic volumes while providing a seamless shopping experience. Their existing platform was outdated, slow, and difficult to maintain.',
                nl: 'De klant had een moderne e-commerce oplossing nodig die hoge verkeersvolumes aankon en tegelijkertijd een naadloze winkelervaring bood. Hun bestaande platform was verouderd, traag en moeilijk te onderhouden.'
            },
            solution: {
                en: 'I designed and developed a custom e-commerce platform with a focus on performance, user experience, and scalability. The solution featured a clean, minimalist design with intuitive navigation and a streamlined checkout process.',
                nl: 'Ik heb een aangepast e-commerce platform ontworpen en ontwikkeld met focus op prestaties, gebruikerservaring en schaalbaarheid. De oplossing bevatte een strak, minimalistisch design met intuïtieve navigatie en een gestroomlijnd afrekenproces.'
            },
            result: {
                en: 'The new platform delivered exceptional results: 40% faster page load times, 25% increase in conversion rates, and a 60% reduction in bounce rate. The client reported record sales in the first quarter after launch.',
                nl: 'Het nieuwe platform leverde uitzonderlijke resultaten: 40% snellere laadtijden, 25% toename in conversieratio\'s, en een 60% afname in bouncepercentage. De klant meldde recordverkopen in het eerste kwartaal na de lancering.'
            },
            stats: [
                { number: '40%', label: { en: 'Faster Loading', nl: 'Sneller Laden' } },
                { number: '25%', label: { en: 'More Conversions', nl: 'Meer Conversies' } },
                { number: '60%', label: { en: 'Less Bounce', nl: 'Minder Bounce' } }
            ],
            next: 'banking'
        },
        banking: {
            index: '02',
            title: 'Mobile Banking App',
            year: '2025',
            category: { en: 'UI/UX Design', nl: 'UI/UX Ontwerp' },
            heroImage: 'images/Image.jpeg',
            problem: {
                en: 'Users struggled with a cluttered, confusing mobile banking interface. The client needed a complete redesign that prioritized security without sacrificing usability.',
                nl: 'Gebruikers worstelden met een rommelige, verwarrende mobiele bankierinterface. De klant had een complete herontwerp nodig dat veiligheid prioriteerde zonder bruikbaarheid op te offeren.'
            },
            solution: {
                en: 'Through extensive user research and iterative prototyping, I created a streamlined interface with biometric authentication, intuitive navigation, and a focus on the most common banking tasks.',
                nl: 'Door uitgebreid gebruikersonderzoek en iteratieve prototyping heb ik een gestroomlijnde interface gecreëerd met biometrische authenticatie, intuïtieve navigatie en focus op de meest voorkomende banktaken.'
            },
            result: {
                en: 'The redesigned app received a 4.8-star rating on app stores. Customer support calls decreased by 35%, and daily active users increased by 50% within three months.',
                nl: 'De herontworpen app ontving een 4.8-ster rating in app stores. Klantenservice gesprekken namen af met 35%, en dagelijks actieve gebruikers stegen met 50% binnen drie maanden.'
            },
            stats: [
                { number: '4.8', label: { en: 'Star Rating', nl: 'Ster Rating' } },
                { number: '35%', label: { en: 'Less Support', nl: 'Minder Support' } },
                { number: '50%', label: { en: 'More Users', nl: 'Meer Gebruikers' } }
            ],
            next: 'dashboard'
        },
        dashboard: {
            index: '03',
            title: 'Dashboard Analytics',
            year: '2024',
            category: { en: 'Full Stack', nl: 'Full Stack' },
            heroImage: 'images/1.jpeg',
            problem: {
                en: 'The company was drowning in data but lacked actionable insights. Multiple disconnected tools made it impossible to get a unified view of business performance.',
                nl: 'Het bedrijf verdronk in data maar miste bruikbare inzichten. Meerdere losgekoppelde tools maakten het onmogelijk om een uniforme kijk op bedrijfsprestaties te krijgen.'
            },
            solution: {
                en: 'I built a comprehensive analytics dashboard that aggregated data from multiple sources, featuring real-time updates, customizable widgets, and automated reporting.',
                nl: 'Ik heb een uitgebreid analytics dashboard gebouwd dat data uit meerdere bronnen samenbracht, met real-time updates, aanpasbare widgets en geautomatiseerde rapportages.'
            },
            result: {
                en: 'Decision-making time was reduced by 60%. The executive team gained instant access to KPIs, leading to faster strategic pivots and a 20% improvement in quarterly targets.',
                nl: 'Besluitvormingstijd werd verminderd met 60%. Het managementteam kreeg directe toegang tot KPI\'s, wat leidde tot snellere strategische wijzigingen en een 20% verbetering in kwartaaldoelen.'
            },
            stats: [
                { number: '60%', label: { en: 'Faster Decisions', nl: 'Snellere Beslissingen' } },
                { number: '20%', label: { en: 'Better Results', nl: 'Betere Resultaten' } },
                { number: '100%', label: { en: 'Data Unified', nl: 'Data Verenigd' } }
            ],
            next: 'portfolio'
        },
        portfolio: {
            index: '04',
            title: 'Portfolio Website',
            year: '2024',
            category: { en: 'Web Design', nl: 'Webdesign' },
            heroImage: 'images/bc1.jpeg',
            problem: {
                en: 'As a creative professional, I needed a portfolio that would stand out in a sea of template-based websites while effectively showcasing my work and skills.',
                nl: 'Als creatieve professional had ik een portfolio nodig dat zou opvallen in een zee van template-gebaseerde websites terwijl het effectief mijn werk en vaardigheden toonde.'
            },
            solution: {
                en: 'I designed a minimalist, high-contrast portfolio with custom animations, interactive case studies, and a focus on storytelling. Every element was crafted to create a memorable experience.',
                nl: 'Ik ontwierp een minimalistisch, hoog-contrast portfolio met aangepaste animaties, interactieve case studies en focus op storytelling. Elk element werd gemaakt om een memorabele ervaring te creëren.'
            },
            result: {
                en: 'The portfolio generated significant interest from potential clients and employers. Interview requests increased by 300%, and several high-profile projects were secured as a direct result.',
                nl: 'Het portfolio genereerde significante interesse van potentiële klanten en werkgevers. Sollicitatiegesprekken namen toe met 300%, en verschillende high-profile projecten werden direct als resultaat binnengehaald.'
            },
            stats: [
                { number: '300%', label: { en: 'More Inquiries', nl: 'Meer Aanvragen' } },
                { number: '5+', label: { en: 'New Projects', nl: 'Nieuwe Projecten' } },
                { number: '∞', label: { en: 'Possibilities', nl: 'Mogelijkheden' } }
            ],
            next: 'ecommerce'
        }
    };

    let currentProject = null;
    let isAnimating = false;

    // Open case study
    function openCaseStudy(projectId) {
        if (isAnimating || !projectsData[projectId]) return;
        isAnimating = true;
        currentProject = projectId;

        const data = projectsData[projectId];
        const lang = localStorage.getItem('portfolio-lang') || 'en';

        // Update case study content
        updateCaseContent(data, lang);

        // Show overlay
        caseOverlay.classList.add('active');
        caseOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // GSAP animations
        if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
            gsap.fromTo('.case-header',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
            );

            gsap.fromTo('.case-hero-image',
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1, delay: 0.4, ease: 'power3.out' }
            );

            gsap.fromTo('.case-section',
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    delay: 0.5,
                    ease: 'power3.out'
                }
            );

            gsap.fromTo('.case-next',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
            );

            gsap.fromTo('.case-close-btn',
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5, delay: 0.5, ease: 'power3.out' }
            );
        }

        // Scroll to top of case study
        caseOverlay.scrollTop = 0;

        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    }

    // Close case study
    function closeCaseStudy() {
        if (isAnimating) return;
        isAnimating = true;

        if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
            gsap.to('.case-study-content > *', {
                opacity: 0,
                y: -20,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power3.in',
                onComplete: () => {
                    caseOverlay.classList.remove('active');
                    caseOverlay.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                    currentProject = null;
                    isAnimating = false;

                    // Reset elements for next open
                    gsap.set('.case-study-content > *', { clearProps: 'all' });
                }
            });
        } else {
            caseOverlay.classList.remove('active');
            caseOverlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            currentProject = null;
            isAnimating = false;
        }
    }

    // Update case study content
    function updateCaseContent(data, lang) {
        const caseIndex = document.querySelector('.case-index');
        const caseTitle = document.querySelector('.case-title');
        const caseYear = document.querySelector('.case-year');
        const caseCategory = document.querySelector('.case-category');
        const caseHeroImg = document.querySelector('.case-hero-image .case-img');
        const problemText = document.querySelector('.case-problem .case-text');
        const solutionText = document.querySelector('.case-solution .case-text');
        const resultText = document.querySelector('.case-result .case-text');
        const statsContainer = document.querySelector('.case-stats');
        const nextBtn = document.querySelector('.next-project-btn');
        const nextTitle = document.querySelector('.next-title');

        if (caseIndex) caseIndex.textContent = data.index;
        if (caseTitle) caseTitle.textContent = data.title;
        if (caseYear) caseYear.textContent = data.year;
        if (caseCategory) caseCategory.textContent = data.category[lang];
        if (caseHeroImg) caseHeroImg.src = data.heroImage;
        if (problemText) problemText.textContent = data.problem[lang];
        if (solutionText) solutionText.textContent = data.solution[lang];
        if (resultText) resultText.textContent = data.result[lang];

        // Update stats
        if (statsContainer && data.stats) {
            statsContainer.innerHTML = data.stats.map(stat => `
                <div class="case-stat">
                    <span class="case-stat-number">${stat.number}</span>
                    <span class="case-stat-label">${stat.label[lang]}</span>
                </div>
            `).join('');
        }

        // Update next project
        if (nextBtn && data.next) {
            nextBtn.setAttribute('data-next', data.next);
            const nextData = projectsData[data.next];
            if (nextTitle && nextData) {
                nextTitle.textContent = nextData.title;
            }
        }
    }

    // Event listeners for project items
    projectItems.forEach(item => {
        const projectId = item.getAttribute('data-project');

        // Click event
        item.addEventListener('click', () => {
            openCaseStudy(projectId);
        });

        // Keyboard support
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCaseStudy(projectId);
            }
        });
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCaseStudy);
    }

    // Next project button
    if (nextProjectBtn) {
        nextProjectBtn.addEventListener('click', () => {
            const nextId = nextProjectBtn.getAttribute('data-next');
            if (nextId && projectsData[nextId]) {
                isAnimating = true;

                if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
                    gsap.to('.case-study-content', {
                        opacity: 0,
                        y: -30,
                        duration: 0.4,
                        ease: 'power3.in',
                        onComplete: () => {
                            caseOverlay.scrollTop = 0;
                            const data = projectsData[nextId];
                            const lang = localStorage.getItem('portfolio-lang') || 'en';
                            updateCaseContent(data, lang);
                            currentProject = nextId;

                            gsap.fromTo('.case-study-content',
                                { opacity: 0, y: 30 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    ease: 'power3.out',
                                    onComplete: () => {
                                        isAnimating = false;
                                    }
                                }
                            );
                        }
                    });
                } else {
                    caseOverlay.scrollTop = 0;
                    const data = projectsData[nextId];
                    const lang = localStorage.getItem('portfolio-lang') || 'en';
                    updateCaseContent(data, lang);
                    currentProject = nextId;
                    isAnimating = false;
                }
            }
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && caseOverlay.classList.contains('active')) {
            closeCaseStudy();
        }
    });

    // Initialize GSAP ScrollTrigger for case study sections if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
        gsap.registerPlugin(ScrollTrigger);

        // Animate project items on scroll
        projectItems.forEach((item, index) => {
            gsap.fromTo(item,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }
}

/**
 * Split project titles into individual letters
 */
function splitProjectTitles() {
    const titles = document.querySelectorAll('.project-title-split');

    titles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';

        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${index * 0.02}s`;
            title.appendChild(span);
        });
    });
}

/**
 * Breathing Effect - Subtle scale and opacity animation on scroll
 * Makes content feel alive and organic
 */
function initBreathingEffect() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Select all sections that should have the breathing effect
    const breathingSections = document.querySelectorAll('.section');

    breathingSections.forEach(section => {
        // Add breathing class for CSS
        section.classList.add('breathing-section');

        // Create the breathing animation
        gsap.fromTo(section,
            {
                scale: 0.98,
                opacity: 0.85
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    end: 'top 20%',
                    scrub: 0.8,
                    // When leaving viewport (scrolling past)
                    onLeave: () => {
                        gsap.to(section, {
                            scale: 0.99,
                            opacity: 0.95,
                            duration: 0.5,
                            ease: 'power2.inOut'
                        });
                    },
                    // When entering again from below
                    onEnterBack: () => {
                        gsap.to(section, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.5,
                            ease: 'power2.out'
                        });
                    }
                }
            }
        );
    });

    // Add breathing effect to individual content blocks within sections
    const contentBlocks = document.querySelectorAll(
        '.about-content, .skills-content, .contact-content, .projects-list'
    );

    contentBlocks.forEach(block => {
        gsap.fromTo(block,
            {
                scale: 0.985,
                opacity: 0.9
            },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: block,
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 1
                }
            }
        );
    });

    // Subtle breathing on hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.to(heroContent, {
            scale: 0.98,
            opacity: 0.9,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5
            }
        });
    }

    // Add subtle parallax breathing to section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        gsap.fromTo(header,
            {
                y: 30,
                opacity: 0.8
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 90%',
                    end: 'top 50%',
                    scrub: 0.6
                }
            }
        );
    });
}

/**
 * About Section - Awwwards Inspired Animations
 */
function initAboutSection() {
    const aboutSection = document.querySelector('.about-section');
    
    if (!aboutSection) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        aboutSection.classList.add('in-view');
        return;
    }
    
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        // Fallback to Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add('in-view');
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(aboutSection);
        return;
    }
    
    // Use GSAP ScrollTrigger for the in-view class
    gsap.registerPlugin(ScrollTrigger);
    
    ScrollTrigger.create({
        trigger: aboutSection,
        start: 'top 70%',
        once: true,
        onEnter: () => {
            aboutSection.classList.add('in-view');
        }
    });
    
    // Parallax effect on the image
    const aboutImage = aboutSection.querySelector('.about-img');
    if (aboutImage) {
        gsap.to(aboutImage, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }
    
    // Stats counter animation
    const statNumbers = aboutSection.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count')) || 0;
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to(stat, {
                    innerText: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerText: 1 },
                    onUpdate: function() {
                        stat.innerText = Math.round(this.targets()[0].innerText);
                    }
                });
            }
        });
    });
    
    // Marquee pause on hover
    const marqueeTracks = aboutSection.querySelectorAll('.marquee-track');
    if (marqueeTracks.length) {
        aboutSection.querySelector('.about-marquee')?.addEventListener('mouseenter', () => {
            marqueeTracks.forEach(track => track.style.animationPlayState = 'paused');
        });
        aboutSection.querySelector('.about-marquee')?.addEventListener('mouseleave', () => {
            marqueeTracks.forEach(track => track.style.animationPlayState = 'running');
        });
    }
}

/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    // Show/hide button based on scroll position
    function toggleButton() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleButton);

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Contact Form with EmailJS Integration
 */
function initContactForm() {
const contactForm = document.querySelector('.contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.querySelector('span').textContent;
        
        // Show loading state
        btn.querySelector('span').textContent = 'Sending...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        
        // Simulated success (remove when EmailJS is configured)
        setTimeout(() => {
            showFormMessage('Message sent successfully!', 'success');
        contactForm.reset();
        
        // Reset button after delay
        setTimeout(() => {
            btn.querySelector('span').textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 2000);
        }, 1000);
    });
}

function showFormMessage(message, type) {
    const contactForm = document.querySelector('.contact-form');
    const btn = contactForm.querySelector('.submit-btn');
    const span = btn.querySelector('span');

    span.textContent = message;

    if (type === 'success') {
        btn.style.background = 'var(--white)';
        btn.style.color = 'var(--black)';
    } else {
        btn.style.background = '#ff4444';
        btn.style.color = 'var(--white)';
    }
}

/**
 * Timeline Animations with GSAP
 */
function initTimelineAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        gsap.fromTo(item,
            {
                opacity: 0,
                x: -50
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate timeline marker
        const marker = item.querySelector('.timeline-marker');
        if (marker) {
            gsap.fromTo(marker,
                {
                    scale: 0,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.3,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    });

    // Animate CV download button
    const cvBtn = document.querySelector('.cv-download');
    if (cvBtn) {
        gsap.fromTo(cvBtn,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: cvBtn,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    // Animate skill circles
    const skillCircles = document.querySelectorAll('.skill-circle-item');
    skillCircles.forEach((item, index) => {
        gsap.fromTo(item,
            {
                opacity: 0,
                scale: 0.8
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

/**
 * Loading Screen - Shows JHK for 2 seconds
 */
/**
 * Masked Image Reveal Animation
 * Creates a cinematic clip-path reveal effect for images
 */
function initMaskReveal() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const maskElements = document.querySelectorAll('.mask-reveal');
    
    if (!maskElements.length) return;
    
    maskElements.forEach((mask, index) => {
        const maskInner = mask.querySelector('.mask-inner');
        
        if (prefersReducedMotion) {
            // Instantly reveal without animation
            mask.classList.add('revealed');
            if (maskInner) {
                maskInner.style.transform = 'scale(1)';
            }
            return;
        }
        
        // Check if this is a hero image (animate on page load)
        const isHeroImage = mask.closest('.parallax-image') !== null;
        
        if (isHeroImage) {
            // Hero image - animate after loader
            const delay = 0.3 + (index * 0.2);
            
            gsap.to(mask, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1.4,
                delay: delay,
                ease: 'power4.inOut',
                onComplete: () => {
                    mask.classList.add('revealed');
                }
            });
            
            if (maskInner) {
                gsap.to(maskInner, {
                    scale: 1,
                    duration: 1.8,
                    delay: delay,
                    ease: 'power3.out'
                });
            }
        } else {
            // Other images - animate on scroll
            gsap.to(mask, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1.2,
                ease: 'power4.inOut',
                scrollTrigger: {
                    trigger: mask,
                    start: 'top 80%',
                    once: true
                },
                onComplete: () => {
                    mask.classList.add('revealed');
                }
            });
            
            if (maskInner) {
                gsap.to(maskInner, {
                    scale: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: mask,
                        start: 'top 80%',
                        once: true
                    }
                });
            }
        }
    });
}

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');

    if (loader) {
        // Hide loader after 2 seconds
        setTimeout(() => {
            loader.classList.add('hidden');
    document.body.classList.add('loaded');
            
            // Initialize mask reveal after loader
            initMaskReveal();
        }, 2000);
    } else {
        document.body.classList.add('loaded');
        initMaskReveal();
    }
});
