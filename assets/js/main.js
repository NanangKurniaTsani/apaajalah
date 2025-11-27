(function() {

    /* ====================
    Preloader
    ======================= */
    window.onload = function () {
        window.setTimeout(fadeout, 300);
    }

    function fadeout() {
        document.querySelector('.preloader').style.opacity = '0';
        document.querySelector('.preloader').style.display = 'none';
    }

    /* ====================
    Sticky Header & Scroll to Top
    ======================= */
    window.onscroll = function () {
        var header_navbar = document.querySelector(".hero-section-wrapper-2 .header");
        var sticky = header_navbar.offsetTop;

        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
        } else {
            header_navbar.classList.remove("sticky");
        }

        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };

    /* ====================
    Navbar Toggler
    ======================= */
    let navbarToggler2 = document.querySelector(".header-2 .navbar-toggler");
    var navbarCollapse2 = document.querySelector(".header-2 .navbar-collapse");

    document.querySelectorAll(".header-2 .page-scroll").forEach(e =>
        e.addEventListener("click", () => {
            navbarToggler2.classList.remove("active");
            navbarCollapse2.classList.remove('show')
        })
    );
    navbarToggler2.addEventListener('click', function() {
        navbarToggler2.classList.toggle("active");
    })

    /* ====================
    Section Menu Active
    ======================= */
    function onScroll(event) {
        var sections = document.querySelectorAll('.page-scroll');
        var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        for (var i = 0; i < sections.length; i++) {
            var currLink = sections[i];
            var val = currLink.getAttribute('href');
            // Skip jika href adalah # atau tidak valid
            if (!val || val === '#' || val === '#0') continue;
            
            var refElement = document.querySelector(val);
            if (!refElement) continue;
            
            var scrollTopMinus = scrollPos + 73;
            if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
                document.querySelectorAll('.page-scroll').forEach(link => {
                    link.classList.remove('active');
                });
                currLink.classList.add('active');
            } else {
                currLink.classList.remove('active');
            }
        }
    }

    window.document.addEventListener('scroll', onScroll);

    /* ====================
    Counter Up
    ======================= */
    var cu = new counterUp({
        start: 0,
        duration: 2000,
        intvalues: true,
        interval: 100,
        append: " ",
    });
    cu.start();

    /* ====================
    WOW Animation
    ======================= */
    new WOW().init();

    /* ====================
    Article Card Interactions
    ======================= */
    document.addEventListener('DOMContentLoaded', function() {
        // Fungsi untuk modal artikel
        const readMoreButtons = document.querySelectorAll('.btn-read-more');
        const modalCloseButtons = document.querySelectorAll('.modal-close');
        const modalOverlays = document.querySelectorAll('.modal-overlay');
        
        // Buka modal
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const articleId = this.getAttribute('data-article');
                const modal = document.getElementById(`modal-${articleId}`);
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Klik pada card artikel juga membuka modal
        document.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.btn-like')) {
                    const articleId = this.getAttribute('data-article');
                    const modal = document.getElementById(`modal-${articleId}`);
                    if (modal) {
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                }
            });
        });
        
        // Tutup modal
        function closeModal() {
            const modals = document.querySelectorAll('.article-modal');
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }
        
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', closeModal);
        });
        
        modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', closeModal);
        });
        
        // Tombol like
        const likeButtons = document.querySelectorAll('.btn-like');
        likeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const articleId = this.getAttribute('data-article');
                const likeCount = this.querySelector('.like-count');
                let count = parseInt(likeCount.textContent);
                
                if (this.classList.contains('liked')) {
                    count--;
                    this.classList.remove('liked');
                    showNotification('Artikel dihapus dari favorit!');
                } else {
                    count++;
                    this.classList.add('liked');
                    showNotification('Artikel ditambahkan ke favorit!');
                    
                    // Animasi like
                    this.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 200);
                }
                
                likeCount.textContent = count;
            });
        });

        // Fungsi untuk menampilkan notifikasi
        function showNotification(message, type = 'success') {
            // Hapus notifikasi sebelumnya jika ada
            const existingNotification = document.querySelector('.custom-notification');
            if (existingNotification) {
                existingNotification.remove();
            }

            // Buat elemen notifikasi
            const notification = document.createElement('div');
            notification.className = `custom-notification ${type === 'error' ? 'error' : ''}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="lni ${type === 'error' ? 'lni-warning' : 'lni-checkmark-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Animasi masuk
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Animasi keluar setelah 3 detik
            setTimeout(() => {
                notification.style.transform = 'translateX(150%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }, 3000);
        }

        // Smooth scrolling untuk semua link dengan hash
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll to top functionality
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Form submission handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validasi form sederhana
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                if (!name || !email || !message) {
                    showNotification('Harap lengkapi semua field yang wajib diisi!', 'error');
                    return;
                }
                
                // Validasi email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showNotification('Format email tidak valid!', 'error');
                    return;
                }
                
                // Simulasi pengiriman form
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<i class="lni lni-spinner-alt spinning"></i> Mengirim...';
                submitButton.disabled = true;
                
                // Simulasi delay pengiriman
                setTimeout(() => {
                    showNotification('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.');
                    this.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 2000);
            });
        }

        // Tutup modal dengan ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Tambahkan style untuk spinner dan notifikasi
        const style = document.createElement('style');
        style.textContent = `
            .lni-spinner-alt.spinning {
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            /* Custom Notification Styles */
            .custom-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                transform: translateX(150%);
                transition: transform 0.3s ease;
                max-width: 300px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .custom-notification.error {
                background: #dc3545;
            }
            
            .custom-notification .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .custom-notification .notification-content i {
                font-size: 20px;
            }
            
            /* Gallery item hover effects */
            .gallery-item {
                transition: all 0.3s ease;
            }
            
            .gallery-item:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(47, 237, 145, 0.3);
            }
            
            /* Modal animations */
            .article-modal.active .modal-container {
                animation: modalSlideIn 0.3s ease;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Like button animation */
            .btn-like {
                transition: all 0.3s ease;
            }
            
            .btn-like.liked {
                background: #dc3545;
                color: #ffffff;
            }
            
            /* Article card hover effects */
            .article-card {
                transition: all 0.3s ease;
            }
            
            .article-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 15px 35px rgba(47, 237, 145, 0.15);
            }
        `;
        document.head.appendChild(style);
    });
    /* ====================
    Smooth Scrolling & Active Nav
    ======================= */
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling untuk semua link dengan hash
    document.querySelectorAll('a.page-scroll').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active class setelah scroll
                setTimeout(() => {
                    updateActiveNav();
                }, 1000);
            }
        });
    });

    // Update active nav on scroll
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.page-scroll');
        
        let current = '';
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Update active nav on page load
    updateActiveNav();
});

})();