document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById('open-btn');
    const overlay = document.getElementById('envelope-overlay');
    const mainWebsite = document.getElementById('main-website');
    const music = document.getElementById('bg-music');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            if (mainWebsite) {
                mainWebsite.classList.remove('hidden-content');
            }
            if (music) {
                music.play().catch(e => console.log("Audio diblokir:", e));
            }
        });
    }

    const cards = document.querySelectorAll('.card');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const indicator = document.getElementById('slide-indicator');
    let currentIndex = 0;

    function updateCard() {
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        if (indicator) {
            indicator.textContent = `${currentIndex + 1} / ${cards.length}`;
        }

        if (prevBtn) prevBtn.disabled = (currentIndex === 0);
        if (nextBtn) nextBtn.disabled = (currentIndex === cards.length - 1);

        document.querySelectorAll('.card-media video').forEach(v => v.pause());
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCard();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCard();
            }
        });
    }

    updateCard();
});
