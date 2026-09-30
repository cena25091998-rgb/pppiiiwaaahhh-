const openBtn = document.getElementById('open-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const fallingContainer = document.getElementById('falling-container');

let isPlaying = false;
let currentIndex = 0;
const cards = document.querySelectorAll('.story-card');
const totalCards = cards.length;
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');

// Fungsi Partikel Hati & Kelopak Bunga Jatuh Estetik Otomatis
function createFallingItem() {
    const item = document.createElement('div');
    item.classList.add('falling-item');
    item.innerHTML = ['❤️', '💖', '✨', '🌹', '💫', '🌸'][Math.floor(Math.random() * 6)];
    item.style.left = Math.random() * 100 + 'vw';
    item.style.animationDuration = (Math.random() * 4 + 4) + 's';
    item.style.fontSize = (Math.random() * 14 + 12) + 'px';
    item.style.opacity = Math.random() * 0.7 + 0.3;
    fallingContainer.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, 8000);
}

setInterval(createFallingItem, 400);

// Tombol Buka Hadiah
openBtn.addEventListener('click', () => {
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
    }, 500);

    bgMusic.play().then(() => {
        isPlaying = true;
        musicToggle.textContent = "🔊 Jeda Musik";
    }).catch(e => {
        console.log("Autoplay diblokir browser");
    });
});

// Kontrol Musik
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.textContent = "🎵 Putar Musik";
        isPlaying = false;
    } else {
        bgMusic.play();
        musicToggle.textContent = "🔊 Jeda Musik";
        isPlaying = true;
    }
});

// Fungsi Geser Kartu Slider dengan Auto-Play & Auto-Pause Video
function changeSlide(direction) {
    // 1. Jeda/pause video di halaman sebelumnya jika sedang aktif
    const prevVideo = cards[currentIndex].querySelector('video');
    if (prevVideo) {
        prevVideo.pause();
        prevVideo.currentTime = 0; // Reset video ke awal durasi
    }

    // 2. Pindah indeks kartu
    cards[currentIndex].classList.remove('active');
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= totalCards) currentIndex = totalCards - 1;

    cards[currentIndex].classList.add('active');
    pageIndicator.textContent = `${currentIndex + 1} / ${totalCards}`;

    // 3. Putar/play video otomatis jika halaman baru berisi video
    const currentVideo = cards[currentIndex].querySelector('video');
    if (currentVideo) {
        currentVideo.play().catch(error => {
            console.log("Autoplay video dicegah oleh kebijakan browser:", error);
        });
    }

    // Atur tombol navigasi aktif/tidak
    prevBtn.disabled = currentIndex === 0;

    if (currentIndex === totalCards - 1) {
        nextBtn.textContent = "❤️ Selesai";
        nextBtn.disabled = true;
    } else {
        nextBtn.textContent = "Selanjutnya ➡️";
        nextBtn.disabled = false;
    }
}
