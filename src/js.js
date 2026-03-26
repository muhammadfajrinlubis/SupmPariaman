document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Inisialisasi Swiper
    if (document.querySelector(".myHeroSwiper")) {
        new Swiper(".myHeroSwiper", {
            loop: true,
            speed: 1000,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });
    }

    // 2. Pemanggilan Header & Footer
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
        fetch("header.html")
            .then(res => res.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                initNavbarLogic();
            })
            .catch(err => console.error("Gagal memuat header:", err));
    }

    // 3. Fungsi Inti Navbar yang Diperbaiki
    function initNavbarLogic() {
        const hamburger = document.querySelector('#hamburger');
        const navMenu = document.querySelector('#nav-menu');
        const header = document.querySelector('header');
        
        // CEK APAKAH INI HALAMAN INDEX ATAU BUKAN
        // window.location.pathname mengambil path file, misal "/index.html" atau "/humas.html"
        const isIndex = window.location.pathname === "/" || 
                        window.location.pathname.endsWith("index.html") || 
                        window.location.pathname === "";

        // Logika Warna Otomatis
        if (header) {
            if (!isIndex) {
                // Jika BUKAN index, langsung kasih warna biru (fixed) selamanya
                header.classList.add('navbar-fixed');
            } else {
                // Jika INDEX, gunakan logika scroll (transparan ke biru)
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 0) {
                        header.classList.add('navbar-fixed');
                    } else {
                        header.classList.remove('navbar-fixed');
                    }
                });
            }
        }

        // --- Hamburger Toggle ---
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function () {
                hamburger.classList.toggle('hamburger-active');
                navMenu.classList.toggle('hidden');
            });
        }

        // --- Dark Mode Toggle ---
        const darkToggle = document.querySelector('#dark-toggle');
        const html = document.querySelector('html');
        if (darkToggle) {
            darkToggle.addEventListener('click', function () {
                if (darkToggle.checked) {
                    html.classList.add('dark');
                } else {
                    html.classList.remove('dark');
                }
            });
        }
    }
});

// 4. Tambahan Tahun Otomatis untuk Footer
fetch('footer.html')
    .then(res => res.text())
    .then(data => {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = data;
            const yearElement = document.getElementById('year');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        }
    });

// Pemanggilan Footer
fetch('footer.html')
    .then(response => {
        if (!response.ok) throw new Error("Gagal mengambil file footer");
        return response.text();
    })
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
        
        // 1. Update tahun otomatis
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // 2. KUNCI UTAMA: Beritahu AOS bahwa ada elemen baru
        if (typeof AOS !== 'undefined') {
            AOS.init(); // Inisialisasi ulang
            AOS.refresh(); // Segarkan posisi elemen
        }
    })
    .catch(err => console.error("Error footer:", err));