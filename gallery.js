document.addEventListener('DOMContentLoaded', () => {

    // ========================================================
    // EDIT HERE: list every file from your local certificates
    // folder. Put the folder next to gallery.html (e.g. a
    // folder named "certificates") and match the filenames
    // below. Add or remove entries freely.
    // ========================================================
    const certList = [
        {
            title: 'AI Fundamentals',
            issuer: 'Microsoft · Durban University of Technology',
            date: 'June 2025',
            image: 'certificates/ai-fundamentals.jpg'
        },
        {
            title: 'Generative AI',
            issuer: 'Microsoft · Durban University of Technology',
            date: 'June 2025',
            image: 'certificates/generative-ai.jpg'
        },
        {
            title: 'Search Technology',
            issuer: 'Microsoft · Durban University of Technology',
            date: 'June 2025',
            image: 'certificates/search-technology.jpg'
        },
        {
            title: 'Responsible AI',
            issuer: 'Microsoft · Durban University of Technology',
            date: 'June 2025',
            image: 'certificates/responsible-ai.jpg'
        },
        {
            title: 'Microsoft Copilot',
            issuer: 'Microsoft · Durban University of Technology',
            date: 'June 2025',
            image: 'certificates/microsoft-copilot.jpg'
        },
        {
            title: 'AI and Accessibility',
            issuer: 'Microsoft · Durban University of Technology',
            date: 'June 2025',
            image: 'certificates/ai-and-accessibility.jpg'
        },
        {
            title: 'NDG Linux Unhatched',
            issuer: 'Cisco Networking Academy',
            date: 'September 2024',
            image: 'certificates/ndg-linux-unhatched.jpg'
        },
    ];

    // ============== Category cards -> modals ==============
    const cards = document.querySelectorAll('.category-card');
    const modals = document.querySelectorAll('.modal');

    function openModal(modal) {
        modal.classList.add('open');
        document.body.classList.add('modal-open');
    }

    function closeModal(modal) {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            const modal = document.getElementById(`modal-${category}`);
            if (modal) openModal(modal);
        });
    });

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close-modal');

        closeBtn.addEventListener('click', () => closeModal(modal));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // ============== Certificate folder ==============
    const folderTrigger = document.getElementById('folder-trigger');
    const folderContents = document.getElementById('folder-contents');
    const certGrid = document.getElementById('certificates-grid');
    const certCount = document.getElementById('cert-count');
    const folderIconEl = folderTrigger ? folderTrigger.querySelector('.folder-icon i') : null;

    if (certCount) {
        certCount.textContent = certList.length === 1 ? '1 file' : `${certList.length} files`;
    }

    if (certGrid) {
        if (certList.length === 0) {
            certGrid.innerHTML = `
                <div class="folder-empty">
                    This folder is empty for now. Drop your certificate images into a
                    "certificates" folder next to gallery.html and list them in gallery.js.
                </div>
            `;
        } else {
            certList.forEach((cert, index) => {
                const thumb = document.createElement('div');
                thumb.className = 'certificate-thumb';
                thumb.setAttribute('data-index', index);
                thumb.innerHTML = `
                    <img src="${cert.image}" alt="${cert.title}" loading="lazy">
                    <div class="cert-zoom"><i class='bx bx-expand'></i></div>
                    <div class="cert-label">${cert.title}</div>
                `;
                thumb.addEventListener('click', () => openLightbox(index));
                certGrid.appendChild(thumb);
            });
        }
    }

    if (folderTrigger && folderContents) {
        folderTrigger.addEventListener('click', () => {
            const isOpen = folderTrigger.getAttribute('aria-expanded') === 'true';

            folderTrigger.setAttribute('aria-expanded', String(!isOpen));
            folderContents.classList.toggle('is-open', !isOpen);

            if (folderIconEl) {
                folderIconEl.className = !isOpen ? 'bx bxs-folder-open' : 'bx bxs-folder';
            }
        });
    }

    // ============== Certificate lightbox ==============
    const lightbox = document.getElementById('cert-lightbox');
    const lightboxImg = document.getElementById('cert-lightbox-img');
    const lightboxTitle = document.getElementById('cert-lightbox-title');
    const lightboxMeta = document.getElementById('cert-lightbox-meta');
    const lightboxClose = lightbox ? lightbox.querySelector('.cert-lightbox-close') : null;
    const prevBtn = lightbox ? lightbox.querySelector('.cert-prev') : null;
    const nextBtn = lightbox ? lightbox.querySelector('.cert-next') : null;

    let currentIndex = 0;

    function renderLightbox() {
        const cert = certList[currentIndex];
        if (!cert) return;

        lightboxImg.src = cert.image;
        lightboxImg.alt = cert.title;
        lightboxTitle.textContent = cert.title;
        lightboxMeta.textContent = [cert.issuer, cert.date].filter(Boolean).join(' \u00b7 ');

        if (prevBtn) prevBtn.style.visibility = certList.length > 1 ? 'visible' : 'hidden';
        if (nextBtn) nextBtn.style.visibility = certList.length > 1 ? 'visible' : 'hidden';
    }

    function openLightbox(index) {
        currentIndex = index;
        renderLightbox();
        lightbox.classList.add('open');
        document.body.classList.add('modal-open');
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.classList.remove('modal-open');
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + certList.length) % certList.length;
        renderLightbox();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % certList.length;
        renderLightbox();
    }

    if (lightbox) {
        lightboxClose.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // ============== Keyboard controls ==============
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('open')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
            return;
        }

        if (e.key === 'Escape') {
            modals.forEach(modal => closeModal(modal));
        }
    });
});
