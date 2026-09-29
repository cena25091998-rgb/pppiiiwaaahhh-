const openBtn = document.getElementById('open-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

let isPlaying = false;

// Saat tombol "Buka Kejutan" diklik
openBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    // Putar musik otomatis
    bgMusic.play().then(() => {
        isPlaying = true;
        musicToggle.textContent = "⏸️ Jeda Musik";
    }).catch(error => {
        console.log("Autoplay dicegah oleh browser:", error);
    });
});

// Tombol kontrol musik manual
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.textContent = "🎵 Putar Musik";
        isPlaying = false;
    } else {
        bgMusic.play();
        musicToggle.textContent = "⏸️ Jeda Musik";
        isPlaying = true;
    }
});
 