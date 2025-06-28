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
let lyrics = [];
let currentLyricIndex = 0;
let lyricsInterval;
let buttonClicked = false;

// SRT Parser function
function parseSRT(srtContent) {
    const lines = srtContent.trim().split('\n');
    const subtitles = [];
    let currentSubtitle = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line === '') {
            if (currentSubtitle.text) {
                subtitles.push(currentSubtitle);
                currentSubtitle = {};
            }
        } else if (/^\d+$/.test(line)) {
            // Subtitle number - skip
        } else if (line.includes('-->')) {
            // Time line
            const times = line.split(' --> ');
            currentSubtitle.startTime = parseTime(times[0]);
            currentSubtitle.endTime = parseTime(times[1]);
        } else {
            // Text line
            if (currentSubtitle.text) {
                currentSubtitle.text += ' ' + line;
            } else {
                currentSubtitle.text = line;
            }
        }
    }

    // Add the last subtitle if it exists
    if (currentSubtitle.text) {
        subtitles.push(currentSubtitle);
    }

    return subtitles;
}

// Parse time string (HH:MM:SS,mmm) to seconds
function parseTime(timeString) {
    const parts = timeString.split(':');
    const seconds = parts[2].split(',');
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(seconds[0]) + parseInt(seconds[1]) / 1000;
}

// Load lyrics from SRT file
async function loadLyrics() {
    try {
        const response = await fetch('harmoni-cinta.srt');
        const srtContent = await response.text();
        lyrics = parseSRT(srtContent);
        console.log('Lyrics loaded:', lyrics);
    } catch (error) {
        console.error('Error loading lyrics:', error);
        // Fallback to hardcoded lyrics if SRT loading fails
        lyrics = [
            { text: "disenja itu kita bertemu", startTime: 14.333, endTime: 17.200 },
            { text: "didepan ruangan musik yang syahdu", startTime: 21.066, endTime: 25.366 },
            { text: "hatiku bergetar", startTime: 27.566, endTime: 31.333 },
            { text: "pandang mu memikat", startTime: 31.866, endTime: 35.066 },
            { text: "Riana", startTime: 35.766, endTime: 36.700 },
            { text: "kau yang tak terlupakan", startTime: 37.066, endTime: 39.900 },
            { text: "aku mencintaimu Rianaku", startTime: 41.333, endTime: 44.166 },
            { text: "dalam setiap hembusan nafasku", startTime: 44.833, endTime: 47.966 },
            { text: "kau adalah lagu yang ku dendangkan", startTime: 48.333, endTime: 52.166 },
            { text: "hingga kini kau jadi istriku sayang", startTime: 52.900, endTime: 57.366 },
            { text: "kita berjalan bersama waktu", startTime: 63.766, endTime: 67.600 },
            { text: "melewati suka duka yang ada", startTime: 70.800, endTime: 75.266 },
            { text: "setiap nada dan irama", startTime: 77.266, endTime: 80.566 },
            { text: "mengukir cinta yang abadi selamanya", startTime: 80.966, endTime: 87.133 },
            { text: "aku mencintaimu Rianaku", startTime: 87.533, endTime: 90.900 },
            { text: "dalam setiap hembusan nafasku", startTime: 91.033, endTime: 94.166 },
            { text: "kau adalah lagu yang ku dendangkan", startTime: 94.533, endTime: 98.366 },
            { text: "hingga kini kau jadi istriku sayang", startTime: 99.100, endTime: 103.566 },
            { text: "kini aku takbisa tanpamu", startTime: 108.633, endTime: 111.466 },
            { text: "kau hadirkan bahagia di hidupku", startTime: 116.833, endTime: 121.433 },
            { text: "Riana kau yang selalu ku nanti", startTime: 123.533, endTime: 128.133 },
            { text: "kita selamanya dalam harmoni", startTime: 128.366, endTime: 132.966 },
            { text: "aku mencintaimu Rianaku", startTime: 133.833, endTime: 137.200 },
            { text: "dalam setiap hembusan nafasku", startTime: 137.333, endTime: 140.466 },
            { text: "kau adalah lagu yang ku dendangkan", startTime: 140.833, endTime: 144.666 },
            { text: "hingga kini kau jadi istriku sayang", startTime: 145.400, endTime: 149.866 },
            { text: "kini aku takbisa tanpamu", startTime: 150.033, endTime: 153.400 },
            { text: "kau hadirkan bahagia dihidupku", startTime: 153.533, endTime: 156.666 },
            { text: "Riana kau yang selalu ku nanti", startTime: 157.033, endTime: 160.300 },
            { text: "kita selamanya dalam harmoni", startTime: 160.466, endTime: 164.366 },
            { text: "wo u woo", startTime: 164.966, endTime: 166.766 },
            { text: "selamanya kau di hati", startTime: 168.033, endTime: 171.133 },
            { text: "Riana", startTime: 172.100, endTime: 172.900 },
            { text: "aku mencintaimu", startTime: 173.866, endTime: 176.500 }
        ];
    }
}

// Load lyrics when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadLyrics();
});

function showLyric() {
    const lyricsContainer = document.getElementById('lyrics-container');

    // Clear previous lyrics
    lyricsContainer.innerHTML = '';

    // Create new lyric element
    const lyricElement = document.createElement('div');
    lyricElement.className = 'lyric-line';
    lyricElement.textContent = lyrics[currentLyricIndex].text;

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
    // Reset lyric index
    currentLyricIndex = 0;

    // Stop any existing lyrics
    stopLyrics();

    // Clear any existing lyric text
    window.currentLyricText = null;

    // Start synchronized lyrics based on SRT timing
    if (lyrics.length > 0) {
        showSynchronizedLyrics();
    } else {
        // Fallback to fixed interval if SRT loading failed
        lyricsInterval = setInterval(showLyric, 4000);
        showLyric();
    }
}

function stopLyrics() {
    if (lyricsInterval) {
        clearInterval(lyricsInterval);
        lyricsInterval = null;
    }
    // Clear lyrics container
    document.getElementById('lyrics-container').innerHTML = '';
}

function showSynchronizedLyrics() {
    const audio = document.getElementById('birthday-audio');

    function checkLyrics() {
        if (!audio.paused && lyrics.length > 0) {
            const currentTime = audio.currentTime;

            // Find the current lyric based on timing
            let currentLyric = null;
            for (let i = 0; i < lyrics.length; i++) {
                if (currentTime >= lyrics[i].startTime && currentTime < lyrics[i].endTime) {
                    currentLyric = lyrics[i];
                    break;
                }
            }

            // Show lyric if it's different from the current one
            if (currentLyric && (!window.currentLyricText || window.currentLyricText !== currentLyric.text)) {
                showSpecificLyric(currentLyric.text);
                window.currentLyricText = currentLyric.text;
                console.log('Showing lyric:', currentLyric.text, 'at time:', currentTime);
            }

            // Clear lyrics when no current lyric is found
            if (!currentLyric && window.currentLyricText) {
                const lyricsContainer = document.getElementById('lyrics-container');
                lyricsContainer.innerHTML = '';
                window.currentLyricText = null;
            }
        }

        // Continue checking
        requestAnimationFrame(checkLyrics);
    }

    // Start checking lyrics
    checkLyrics();
}

function showSpecificLyric(text) {
    const lyricsContainer = document.getElementById('lyrics-container');

    // Clear previous lyrics
    lyricsContainer.innerHTML = '';

    // Create new lyric element
    const lyricElement = document.createElement('div');
    lyricElement.className = 'lyric-line';
    lyricElement.textContent = text;

    // Add to container
    lyricsContainer.appendChild(lyricElement);

    // Remove lyric after animation
    setTimeout(() => {
        if (lyricElement.parentNode) {
            lyricElement.remove();
        }
    }, 3000);
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