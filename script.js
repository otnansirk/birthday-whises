// JavaScript to create a confetti effect
document.addEventListener('DOMContentLoaded', () => {
    const confettiContainer = document.getElementById('confetti-container');
    const confettiCount = 100;
    const colors = ['#EC4899', '#F472B6', '#F9A8D4', '#FBCFE8', '#FFD700']; // Pinks and a touch of gold

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.setProperty('--color', color);
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.animationDuration = 3 + Math.random() * 2 + 's'; // Varies fall speed
        confetti.style.height = 8 + Math.random() * 10 + 'px';
        confetti.style.width = 4 + Math.random() * 4 + 'px';
        // When animation ends, respawn at the top
        confetti.addEventListener('animationend', () => {
            confetti.remove();
            confettiContainer.appendChild(createConfetti());
        });
        return confetti;
    }

    for (let i = 0; i < confettiCount; i++) {
        confettiContainer.appendChild(createConfetti());
    }
});

// Floating Lyrics System
const lyrics = [
    "Harmoni cinta kita",
    "Bersatu dalam suka",
    "Di hari ulang tahunmu",
    "Ku ucapkan selamat",
    "Semoga panjang umur",
    "Dan selalu bahagia",
    "Bersama kita berdua",
    "Sampai akhir masa",
    "Cinta kita abadi",
    "Seperti bintang di malam",
    "Terang dan indah",
    "Selamanya bersinar",
    "Happy Birthday Sayang",
    "Ku cinta kamu selalu"
];

let currentLyricIndex = 0;
let lyricsInterval;
let buttonClicked = false;

function showLyric() {
    const lyricsContainer = document.getElementById('lyrics-container');

    // Clear previous lyrics
    lyricsContainer.innerHTML = '';

    // Create new lyric element
    const lyricElement = document.createElement('div');
    lyricElement.className = 'lyric-line';
    lyricElement.textContent = lyrics[currentLyricIndex];

    // Add to container
    lyricsContainer.appendChild(lyricElement);

    // Remove lyric after animation
    setTimeout(() => {
        if (lyricElement.parentNode) {
            lyricElement.remove();
        }
    }, 3000);

    // Move to next lyric
    currentLyricIndex = (currentLyricIndex + 1) % lyrics.length;
}

function startLyrics() {
    // Start showing lyrics every 4 seconds
    lyricsInterval = setInterval(showLyric, 4000);
    // Show first lyric immediately
    showLyric();
}

function stopLyrics() {
    if (lyricsInterval) {
        clearInterval(lyricsInterval);
        lyricsInterval = null;
    }
    // Clear lyrics container
    document.getElementById('lyrics-container').innerHTML = '';
}

function playCakeAnimation() {
  const anim = document.getElementById('bizcocho_1');
  if (anim) anim.beginElement();
}

function startSurprise() {
  // Check if button has already been clicked
  if (buttonClicked) {
    return;
  }

  // Mark button as clicked
  buttonClicked = true;

  // Disable the button permanently
  const button = document.querySelector('.play-btn');
  button.disabled = true;
  button.style.opacity = '0.8';
  button.style.cursor = 'not-allowed';
  button.textContent = 'Surprise Started!';

  // Show glass background with animation
  const glassBg = document.querySelector('.glass-bg');
  if (glassBg) {
    // Small delay to ensure smooth animation
    setTimeout(() => {
      glassBg.classList.add('show');
    }, 100);
  }

  const audio = document.getElementById('birthday-audio');
  audio.play();
  playCakeAnimation();

  // Start lyrics when music starts
  startLyrics();

  // Candle will be shown after cake animation is finished
  const cremaAnim = document.getElementById('crema');
  if (cremaAnim) {
    cremaAnim.addEventListener('endEvent', function handler() {
      document.querySelector('.cake').classList.add('visible');
      cremaAnim.removeEventListener('endEvent', handler);
    });
  }
}

// Scroll listener for lyrics positioning
window.addEventListener('scroll', () => {
  const lyricsContainer = document.getElementById('lyrics-container');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 0) {
    lyricsContainer.style.transform = `translateY(${Math.min(scrollTop, 100)}px)`;
  } else {
    lyricsContainer.style.transform = 'translateY(0px)';
  }
});