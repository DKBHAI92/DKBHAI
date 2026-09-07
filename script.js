/**
 * ============================================================================
 * ROMANTIC SCRIPT FOR SHRISHTI YADAV ❤️
 * High-performance 60fps animations, Web Audio synthesizer, interactive letter,
 * love meter, celestial night sky, fireworks, and delightful easter eggs.
 * ============================================================================
 */

(function () {
  'use strict';

  // State
  let isMusicPlaying = false;
  let webAudioCtx = null;
  let webAudioOscillators = [];
  let melodyIntervalId = null;
  let loveMeterCalculating = false;
  let isTouchDevice = false;

  // Detect Touch Device
  try {
    isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  } catch (e) {
    isTouchDevice = false;
  }

  /* ==========================================================================
     1. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  function showToast(message, icon = '❤️') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode === container) {
        container.removeChild(toast);
      }
    }, 4000);
  }

  /* ==========================================================================
     2. FLOATING CLICK HEART BURST EFFECT
     ========================================================================== */
  function spawnClickHearts(x, y, count = 8) {
    const heartSymbols = ['❤️', '💖', '💕', '🌸', '✨', '💗'];
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'click-heart';
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.setProperty('--dx', `${dx}px`);
      heart.style.setProperty('--dy', `${dy}px`);
      heart.style.fontSize = `${14 + Math.random() * 18}px`;

      document.body.appendChild(heart);

      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 1200);
    }
  }

  // Global click heart listener on romantic buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-romantic, .choice-box, .gallery-card, .tilt-card, .floating-action-heart, .nav-logo, .timeline-card, .timeline-node')) {
      spawnClickHearts(e.clientX, e.clientY, 7);
    }
  });

  /* ==========================================================================
     3. AMBIENT ROSE PETALS & SPARKLES CANVAS ENGINE
     ========================================================================== */
  const petalsCanvas = document.getElementById('petals-canvas');
  if (petalsCanvas) {
    const ctx = petalsCanvas.getContext('2d');
    let width = (petalsCanvas.width = window.innerWidth);
    let height = (petalsCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = petalsCanvas.width = window.innerWidth;
      height = petalsCanvas.height = window.innerHeight;
    });

    const petalCount = window.innerWidth < 768 ? 24 : 45;
    const petals = [];

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -20;
        this.size = 8 + Math.random() * 14;
        this.speedY = 1 + Math.random() * 1.8;
        this.speedX = -0.5 + Math.random() * 1;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.03;
        this.flip = Math.random() * Math.PI;
        this.flipSpeed = 0.02 + Math.random() * 0.03;
        this.opacity = 0.35 + Math.random() * 0.45;
        this.isHeart = Math.random() > 0.4;
        this.color = Math.random() > 0.5 ? '#ff758f' : '#f43f5e';
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.angle) * 1.2 + this.speedX;
        this.angle += this.angleSpeed;
        this.flip += this.flipSpeed;

        if (this.y > height + 30 || this.x < -30 || this.x > width + 30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.scale(Math.cos(this.flip), 1);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;

        if (this.isHeart) {
          // Mini heart
          const s = this.size * 0.6;
          ctx.beginPath();
          ctx.moveTo(0, s / 4);
          ctx.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, s / 4);
          ctx.bezierCurveTo(-s / 2, s / 2, 0, s * 0.8, 0, s);
          ctx.bezierCurveTo(0, s * 0.8, s / 2, s / 2, s / 2, s / 4);
          ctx.bezierCurveTo(s / 2, 0, 0, 0, 0, s / 4);
          ctx.fill();
        } else {
          // Rose petal curve
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(this.size / 2, -this.size / 2, this.size, 0);
          ctx.quadraticCurveTo(this.size / 2, this.size, 0, 0);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal());
    }

    let animationFrameId;
    function renderPetals() {
      if (!document.hidden) {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < petals.length; i++) {
          petals[i].update();
          petals[i].draw();
        }
      }
      animationFrameId = requestAnimationFrame(renderPetals);
    }
    renderPetals();
  }

  /* ==========================================================================
     4. DESKTOP ROMANTIC CURSOR TRAIL
     ========================================================================== */
  const cursorCanvas = document.getElementById('cursor-canvas');
  if (cursorCanvas && !isTouchDevice) {
    const cCtx = cursorCanvas.getContext('2d');
    let cWidth = (cursorCanvas.width = window.innerWidth);
    let cHeight = (cursorCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      cWidth = cursorCanvas.width = window.innerWidth;
      cHeight = cursorCanvas.height = window.innerHeight;
    });

    const sparkles = [];

    class Sparkle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3 + Math.random() * 6;
        this.alpha = 1;
        this.decay = 0.03 + Math.random() * 0.03;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5 - 0.5;
        this.color = Math.random() > 0.5 ? '#ff3366' : '#fda4af';
        this.isHeart = Math.random() > 0.6;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        cCtx.save();
        cCtx.globalAlpha = Math.max(0, this.alpha);
        cCtx.fillStyle = this.color;
        cCtx.beginPath();
        if (this.isHeart) {
          const s = this.size;
          cCtx.translate(this.x, this.y);
          cCtx.moveTo(0, s / 4);
          cCtx.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, s / 4);
          cCtx.bezierCurveTo(-s / 2, s / 2, 0, s * 0.8, 0, s);
          cCtx.bezierCurveTo(0, s * 0.8, s / 2, s / 2, s / 2, s / 4);
          cCtx.bezierCurveTo(s / 2, 0, 0, 0, 0, s / 4);
          cCtx.fill();
        } else {
          cCtx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
          cCtx.fill();
        }
        cCtx.restore();
      }
    }

    let lastSparkleTime = 0;
    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastSparkleTime > 35) {
        sparkles.push(new Sparkle(e.clientX, e.clientY));
        lastSparkleTime = now;
      }
    });

    function renderSparkles() {
      if (!document.hidden) {
        cCtx.clearRect(0, 0, cWidth, cHeight);
        for (let i = sparkles.length - 1; i >= 0; i--) {
          const sp = sparkles[i];
          sp.update();
          sp.draw();
          if (sp.alpha <= 0) {
            sparkles.splice(i, 1);
          }
        }
      }
      requestAnimationFrame(renderSparkles);
    }
    renderSparkles();
  }

  /* ==========================================================================
     5. SPLASH SCREEN INTERACTIONS
     ========================================================================== */
  const splashScreen = document.getElementById('splash-screen');
  const btnOpenHeart = document.getElementById('btn-open-heart');
  const splashHeartIcon = document.getElementById('splash-heart-icon');

  // Populate floating hearts inside splash screen
  const splashHeartsContainer = document.getElementById('splash-hearts');
  if (splashHeartsContainer) {
    const emojis = ['💖', '💕', '🌸', '✨', '💗', '❤️', '🌹'];
    for (let i = 0; i < 22; i++) {
      const span = document.createElement('span');
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      span.style.position = 'absolute';
      span.style.left = `${Math.random() * 100}%`;
      span.style.top = `${Math.random() * 100}%`;
      span.style.fontSize = `${16 + Math.random() * 24}px`;
      span.style.opacity = `${0.2 + Math.random() * 0.5}`;
      span.style.filter = 'blur(0.5px)';
      span.style.animation = `auroraFloat ${4 + Math.random() * 6}s infinite alternate ease-in-out`;
      span.style.animationDelay = `-${Math.random() * 5}s`;
      splashHeartsContainer.appendChild(span);
    }
  }

  function dismissSplashScreen(e) {
    if (!splashScreen || splashScreen.classList.contains('hidden')) return;

    if (e) {
      spawnClickHearts(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 24);
    }

    splashScreen.classList.add('hidden');
    document.body.style.overflow = 'auto';

    showToast('Welcome, Shrishti! This little world is just for you ❤️', '🌸');

    // Attempt gentle autoplay of romantic melody if user clicked
    startRomanticMusic(true);
  }

  if (btnOpenHeart) {
    btnOpenHeart.addEventListener('click', dismissSplashScreen);
  }

  if (splashHeartIcon) {
    splashHeartIcon.addEventListener('click', (e) => {
      spawnClickHearts(e.clientX, e.clientY, 15);
    });
    splashHeartIcon.addEventListener('dblclick', (e) => {
      dismissSplashScreen(e);
    });
  }

  /* ==========================================================================
     6. ROMANTIC AUDIO ENGINE (Web Audio API Harp / Music-Box Synth + MP3 Fallback)
     ========================================================================== */
  const bgAudio = document.getElementById('bg-audio');
  const btnMusicToggle = document.getElementById('btn-music-toggle');
  const musicIcon = document.getElementById('music-icon');

  function initWebAudio() {
    if (!webAudioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        webAudioCtx = new AudioContextClass();
      }
    }
    if (webAudioCtx && webAudioCtx.state === 'suspended') {
      webAudioCtx.resume();
    }
  }

  // Play a soft, beautiful bell/harp chime note
  function playHarpNote(freq, timeOffset = 0, duration = 2.2) {
    if (!webAudioCtx) return;
    const now = webAudioCtx.currentTime + timeOffset;

    // Oscillator 1 (Warm Sine Tone)
    const osc1 = webAudioCtx.createOscillator();
    const gain1 = webAudioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Oscillator 2 (Gentle Harmonic Chime)
    const osc2 = webAudioCtx.createOscillator();
    const gain2 = webAudioCtx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Filter for warmth
    const filter = webAudioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    // Envelope
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.06, now + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(webAudioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  // Pentatonic romantic arpeggio melody in C Major / A Minor:
  // C4, E4, G4, A4, C5, D5, E5, G5
  const romanticMelodyNotes = [
    261.63, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63,
    220.00, 261.63, 329.63, 392.00, 440.00, 523.25, 659.25, 523.25
  ];
  let melodyIndex = 0;

  function runMelodyStep() {
    if (!isMusicPlaying) return;
    const note = romanticMelodyNotes[melodyIndex % romanticMelodyNotes.length];
    playHarpNote(note, 0, 2.5);

    // Occasional gentle harmony note
    if (melodyIndex % 4 === 0) {
      playHarpNote(note * 0.5, 0.05, 3.2);
    }

    melodyIndex++;
  }

  function startRomanticMusic(isSoft = false) {
    initWebAudio();

    // Check if user has an MP3 source available in bgAudio
    if (bgAudio && bgAudio.src && !bgAudio.error) {
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isMusicPlaying = true;
            updateMusicUI(true);
            if (!isSoft) showToast('Playing romantic melody 🎵', '🎶');
          })
          .catch(() => {
            // If MP3 file missing or blocked, run our lovely Web Audio synthesizer!
            startSynthesizerMelody(isSoft);
          });
        return;
      }
    }

    startSynthesizerMelody(isSoft);
  }

  function startSynthesizerMelody(isSoft = false) {
    if (melodyIntervalId) clearInterval(melodyIntervalId);
    isMusicPlaying = true;
    updateMusicUI(true);

    // Initial sequence
    runMelodyStep();
    melodyIntervalId = setInterval(runMelodyStep, 800);

    if (!isSoft) {
      showToast('Playing soothing music-box melody for Shrishti 🎵', '🎶');
    }
  }

  function stopRomanticMusic() {
    isMusicPlaying = false;
    if (bgAudio) {
      try {
        bgAudio.pause();
      } catch (e) {}
    }
    if (melodyIntervalId) {
      clearInterval(melodyIntervalId);
      melodyIntervalId = null;
    }
    updateMusicUI(false);
    showToast('Music paused ⏸️', '🎵');
  }

  function updateMusicUI(playing) {
    if (!btnMusicToggle) return;
    if (playing) {
      btnMusicToggle.classList.add('playing');
      if (musicIcon) musicIcon.textContent = '🎶';
      btnMusicToggle.title = 'Pause Romantic Music ⏸️';
    } else {
      btnMusicToggle.classList.remove('playing');
      if (musicIcon) musicIcon.textContent = '🎵';
      btnMusicToggle.title = 'Play Romantic Music 🎵';
    }
  }

  if (btnMusicToggle) {
    btnMusicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isMusicPlaying) {
        stopRomanticMusic();
      } else {
        startRomanticMusic(false);
      }
    });
  }

  /* ==========================================================================
     7. STICKY NAVBAR & MOBILE MENU
     ========================================================================== */
  const mainHeader = document.getElementById('main-header');
  const btnHamburger = document.getElementById('btn-hamburger');
  const navMenu = document.getElementById('nav-menu');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }

    // Scrollspy for active nav link
    const sections = document.querySelectorAll('main section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach((link) => link.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  });

  // Mobile menu toggling
  function toggleMobileMenu() {
    const isOpen = navMenu.classList.toggle('open');
    btnHamburger.classList.toggle('active', isOpen);
    mobileBackdrop.classList.toggle('active', isOpen);
    btnHamburger.setAttribute('aria-expanded', isOpen);
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    btnHamburger.classList.remove('active');
    mobileBackdrop.classList.remove('active');
    btnHamburger.setAttribute('aria-expanded', 'false');
  }

  if (btnHamburger) {
    btnHamburger.addEventListener('click', toggleMobileMenu);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  /* ==========================================================================
     8. DIGITAL LOVE LETTER INTERACTION
     ========================================================================== */
  const envelope = document.getElementById('envelope');
  const letterSheet = document.getElementById('letter-sheet');
  const btnRefoldLetter = document.getElementById('btn-refold-letter');
  const letterParas = document.querySelectorAll('.letter-para');

  function openLoveLetter(e) {
    if (e) spawnClickHearts(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 12);
    envelope.classList.add('open');

    setTimeout(() => {
      letterSheet.classList.add('active');
      letterSheet.setAttribute('aria-hidden', 'false');

      // Stagger paragraph reveal
      letterParas.forEach((p, idx) => {
        setTimeout(() => {
          p.classList.add('revealed');
        }, idx * 450 + 200);
      });

      showToast('A heartfelt letter just for you, Shrishti 💌', '💖');
    }, 450);
  }

  function foldLoveLetter() {
    letterSheet.classList.remove('active');
    letterSheet.setAttribute('aria-hidden', 'true');
    letterParas.forEach((p) => p.classList.remove('revealed'));

    setTimeout(() => {
      envelope.classList.remove('open');
    }, 400);
  }

  if (envelope) {
    envelope.addEventListener('click', openLoveLetter);
    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        openLoveLetter(e);
      }
    });
  }

  if (btnRefoldLetter) {
    btnRefoldLetter.addEventListener('click', foldLoveLetter);
  }

  /* ==========================================================================
     9. "WHY YOU ARE SPECIAL" (FULL SCREEN LOVE EXPLOSION & 3D CARD TILT)
     ========================================================================== */
  const explosionOverlay = document.getElementById('full-screen-love-explosion');
  const screenLoveParticles = document.getElementById('screen-love-particles');

  function triggerSpecialLoveExplosion(clickX, clickY) {
    if (!explosionOverlay || !screenLoveParticles) return;

    const originX = clickX || window.innerWidth / 2;
    const originY = clickY || window.innerHeight / 2;

    // Play celestial ascending harp fanfare
    try {
      initWebAudio();
      if (webAudioCtx) {
        const fanfareNotes = [392.00, 523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51]; // G4 to E6
        fanfareNotes.forEach((freq, idx) => {
          playHarpNote(freq, idx * 0.08, 2.5);
        });
      }
    } catch (e) {}

    // Populate 140+ love particles across the entire viewport
    screenLoveParticles.innerHTML = '';
    const loveEmojis = [
      '❤️', '💖', '💕', '💗', '💓', '💞', '💘', '💝', '💟', '💌',
      '🌹', '🌸', '✨', '⭐', '💫', '🥰', '👑', '🤍', '🔥', '💍', '💐', '🦋'
    ];

    const particleCount = 140;
    const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 0.95;

    for (let i = 0; i < particleCount; i++) {
      const span = document.createElement('span');
      span.className = 'screen-love-particle';
      span.textContent = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];

      const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.45;
      const distance = 80 + Math.random() * maxRadius;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rot = (Math.random() - 0.5) * 900;
      const dur = 1.3 + Math.random() * 1.1;
      const del = Math.random() * 0.35;
      const size = 18 + Math.random() * 42; // Up to 60px!
      const scale = 0.8 + Math.random() * 0.8;

      span.style.left = `${originX}px`;
      span.style.top = `${originY}px`;
      span.style.setProperty('--tx', `${tx}px`);
      span.style.setProperty('--ty', `${ty}px`);
      span.style.setProperty('--rot', `${rot}deg`);
      span.style.setProperty('--p-dur', `${dur}s`);
      span.style.setProperty('--p-del', `${del}s`);
      span.style.setProperty('--p-size', `${size}px`);
      span.style.setProperty('--scale', `${scale}`);

      screenLoveParticles.appendChild(span);
    }

    // Trigger full screen visual explosion
    explosionOverlay.classList.remove('active');
    void explosionOverlay.offsetWidth; // Reflow
    explosionOverlay.classList.add('active');

    showToast('Because you are truly the most special person, Shrishti! 💖✨', '🌹');

    // Smooth scroll to #why-special destination after initial blast
    setTimeout(() => {
      const whySection = document.getElementById('why-special');
      if (whySection) {
        whySection.scrollIntoView({ behavior: 'smooth' });
        // Pulse cards with shimmering highlight aura
        const cards = whySection.querySelectorAll('.tilt-card');
        cards.forEach((card, idx) => {
          setTimeout(() => {
            card.classList.add('special-highlight-pulse');
            setTimeout(() => card.classList.remove('special-highlight-pulse'), 2000);
          }, idx * 110);
        });
      }
    }, 600);

    // Hide explosion after animation finishes
    setTimeout(() => {
      if (explosionOverlay) {
        explosionOverlay.classList.remove('active');
      }
    }, 2800);
  }

  // Attach love explosion to Why You're Special buttons & links
  const btnWhySpecial = document.getElementById('btn-why-special');
  if (btnWhySpecial) {
    btnWhySpecial.addEventListener('click', (e) => {
      e.preventDefault();
      triggerSpecialLoveExplosion(e.clientX, e.clientY);
    });
  }

  document.querySelectorAll('a[href="#why-special"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      triggerSpecialLoveExplosion(e.clientX, e.clientY);
    });
  });

  const tiltCards = document.querySelectorAll('.tilt-card');
  if (!isTouchDevice) {
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -9;
        const rotateY = ((x - centerX) / centerX) * 9;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  /* ==========================================================================
     10. OUR BEAUTIFUL MOMENTS (GALLERY, LOVE BLAST SPLASH & ROMANTIC LIGHTBOX)
     ========================================================================== */
  const memoriesData = [
    {
      id: 1,
      title: "That Beautiful Smile ❤️",
      category: "🌸 Smile",
      date: "Year 2023",
      desc: "The brightest light in any room is your genuine, warm smile. It instantly makes any gloomy day bright.",
      photos: [
        { src: "assets/images/photo1.jpg", caption: "“Your smile is my favorite daydream, Shrishti ✨”" }
      ]
    },
    {
      id: 2,
      title: "Little Moments, Big Memories ✨",
      category: "🌙 Night",
      date: "Year 2023",
      desc: "The quiet, comfortable moments under the starry night that mean the absolute world. Simple, pure, and forever cherished.",
      photos: [
        { src: "assets/images/photo2.jpg", caption: "“Holding your hand feels like holding my entire universe 💕”" },
        { src: "assets/images/photo3.jpg", caption: "“Two hands intertwined, making every quiet second count 🤝”" }
      ]
    },
    {
      id: 3,
      title: "Just You Being You 🌸",
      category: "🌸 Blossom",
      date: "Year 2024",
      desc: "Your natural grace, warmth, and authentic self are pure poetry. Never change who you are, Shrishti.",
      photos: [
        { src: "assets/images/photo5.jpg", caption: "“Golden hour serenity with the sweetest soul I know ☀️💖”" }
      ]
    },
    {
      id: 4,
      title: "A Moment Worth Remembering 💕",
      category: "💕 Twilight",
      date: "Year 2024",
      desc: "Golden hour tranquility, sky lanterns floating into twilight, and dreams held close to heart.",
      photos: [
        { src: "assets/images/photo4.jpg", caption: "“Raindrops on the terrace, and your gentle hand in mine 🌧️☕”" },
        { src: "assets/images/photo2.jpg", caption: "“A tender memory held forever deep in my heart ✨”" }
      ]
    },
    {
      id: 5,
      title: "Cozy Coffee & Whispers ☕",
      category: "☕ Cozy",
      date: "Year 2024",
      desc: "Warm cups in our hands, latte art hearts, and conversations where hours felt like seconds. The coziest feeling ever.",
      photos: [
        { src: "assets/images/photo3.jpg", caption: "“Cozy conversations, whispered secrets, and endless smiles ☕❤️”" }
      ]
    },
    {
      id: 6,
      title: "Holding Hands Forever 🤝",
      category: "🤝 Together",
      date: "Year 2025",
      desc: "Two hands intertwined against the twilight sky. An unspoken promise to walk side by side through every path of life.",
      photos: [
        { src: "assets/images/photo9.jpg", caption: "“Walking beside you through rain and sunshine always 🌧️✨”" },
        { src: "assets/images/photo4.jpg", caption: "“An unbreakable bond sealed with affection and trust 🔐”" },
        { src: "assets/images/photo3.jpg", caption: "“Never letting go of your hand, no matter where life leads 💖”" }
      ]
    },
    {
      id: 7,
      title: "Fairy Lights & Stolen Glances 🏮",
      category: "🏮 Magic",
      date: "Year 2025",
      desc: "Glowing amber bulbs strung along the balcony terrace, cool evening air, and catching your eyes sparkle with joy.",
      photos: [
        { src: "assets/images/photo6.jpg", caption: "“Catching that stolen glance across the warm golden light 🌟”" },
        { src: "assets/images/photo8.jpg", caption: "“Your radiant charm makes my whole world sparkle 🌸”" },
        { src: "assets/images/photo5.jpg", caption: "“The sweetest smile looking right back at me 💖”" }
      ]
    },
    {
      id: 8,
      title: "Seaside Serenade & Sunset Waves 🌊",
      category: "🌊 Ocean",
      date: "Year 2025",
      desc: "The gentle lull of ocean waves, golden sunset reflecting across the shore, and carving our little heart symbol into the sand.",
      photos: [
        { src: "assets/images/photo7.jpg", caption: "“Sunsets are infinitely more breathtaking with you by my side 🌅”" },
        { src: "assets/images/photo5.jpg", caption: "“Serene evening peace, wrapped in pure affection 🌊❤️”" },
        { src: "assets/images/photo1.jpg", caption: "“Forever my favorite view, my favorite smile, my favorite person 🌹”" }
      ]
    }
  ];

  let currentMemoryIndex = 0;
  let currentPhotoIndex = 0;
  let loveBlastTimer = null;

  // DOM Elements
  const loveBlastSplash = document.getElementById('love-blast-splash');
  const loveBlastParticles = document.getElementById('love-blast-particles');
  const loveBlastTitle = document.getElementById('love-blast-title');
  const loveBlastTag = document.getElementById('love-blast-tag');
  const loveBlastSub = document.getElementById('love-blast-sub');

  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxPhotoNote = document.getElementById('lightbox-photo-note');
  const lightboxBadge = document.getElementById('lightbox-badge');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxDate = document.getElementById('lightbox-date');
  const photoCounterBadge = document.getElementById('photo-counter-badge');
  const lightboxPhotoDots = document.getElementById('lightbox-photo-dots');
  const btnPhotoPrev = document.getElementById('btn-photo-prev');
  const btnPhotoNext = document.getElementById('btn-photo-next');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');
  const btnLoveBlastReplay = document.getElementById('btn-love-blast-replay');
  const btnLightboxLike = document.getElementById('btn-lightbox-like');
  const btnPrevLightbox = document.getElementById('btn-prev-lightbox');
  const btnNextLightbox = document.getElementById('btn-next-lightbox');
  const btnMemoryStepPrev = document.getElementById('btn-memory-step-prev');
  const btnMemoryStepNext = document.getElementById('btn-memory-step-next');
  const memoryStepLabel = document.getElementById('memory-step-label');

  // Play romantic ascending harp chime on love blast
  function playLoveBlastChime() {
    try {
      initWebAudio();
      if (!webAudioCtx) return;
      const chimeNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      chimeNotes.forEach((freq, idx) => {
        playHarpNote(freq, idx * 0.11, 2.2);
      });
    } catch (e) {
      // Audio graceful fallback
    }
  }

  // Create 45+ explosive radial particles for Love Blast
  function createLoveBlastParticles(container, count = 48) {
    if (!container) return;
    container.innerHTML = '';
    const emojis = ['❤️', '💖', '💕', '💗', '💓', '🌸', '🌹', '✨', '⭐', '💘', '🤍', '🎉'];
    
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.className = 'love-blast-particle';
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
      const distance = 130 + Math.random() * 320;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rot = (Math.random() - 0.5) * 720;
      const dur = 0.9 + Math.random() * 0.5;
      const del = Math.random() * 0.12;
      const size = 18 + Math.random() * 22;
      const scale = 0.8 + Math.random() * 0.7;

      span.style.setProperty('--tx', `${tx}px`);
      span.style.setProperty('--ty', `${ty}px`);
      span.style.setProperty('--rot', `${rot}deg`);
      span.style.setProperty('--p-dur', `${dur}s`);
      span.style.setProperty('--p-del', `${del}s`);
      span.style.setProperty('--p-size', `${size}px`);
      span.style.setProperty('--scale', `${scale}`);

      container.appendChild(span);
    }
  }

  // Trigger Love Blast Splash Screen and reveal memory
  function triggerLoveBlast(memoryIndex, photoIndex = 0, isReplay = false) {
    currentMemoryIndex = (memoryIndex + memoriesData.length) % memoriesData.length;
    currentPhotoIndex = photoIndex;
    const mem = memoriesData[currentMemoryIndex];

    if (loveBlastTimer) clearTimeout(loveBlastTimer);

    if (loveBlastSplash) {
      if (loveBlastTitle) loveBlastTitle.textContent = mem.title;
      if (loveBlastTag) loveBlastTag.textContent = `${mem.category} • Cherished Memory`;
      if (loveBlastSub) loveBlastSub.textContent = isReplay 
        ? "Blasting pure love and affection for Shrishti! 💥💖"
        : "Unlocking a sweet piece of our love story...";

      createLoveBlastParticles(loveBlastParticles, 52);
      playLoveBlastChime();

      loveBlastSplash.classList.add('active');
      loveBlastSplash.setAttribute('aria-hidden', 'false');

      // After romantic blast animation, transition to lightbox modal
      loveBlastTimer = setTimeout(() => {
        loveBlastSplash.classList.remove('active');
        loveBlastSplash.setAttribute('aria-hidden', 'true');
        renderLightboxMemory(currentMemoryIndex, currentPhotoIndex);
        if (lightboxModal) {
          lightboxModal.classList.add('active');
          lightboxModal.setAttribute('aria-hidden', 'false');
        }
      }, 820);
    } else {
      renderLightboxMemory(currentMemoryIndex, currentPhotoIndex);
      if (lightboxModal) {
        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
      }
    }
  }

  // Render active memory and photo in the Lightbox
  function renderLightboxMemory(memIdx, photoIdx = 0) {
    const mem = memoriesData[memIdx];
    if (!mem) return;

    const photos = mem.photos || [];
    currentPhotoIndex = (photoIdx + photos.length) % photos.length;
    const activePhoto = photos[currentPhotoIndex] || { src: 'assets/images/photo1.jpg', caption: '' };

    // Update Image with bloom animation
    if (lightboxImg) {
      lightboxImg.classList.remove('bloom-in');
      void lightboxImg.offsetWidth; // Trigger reflow
      lightboxImg.src = activePhoto.src;
      lightboxImg.alt = `${mem.title} - Photo ${currentPhotoIndex + 1}`;
      lightboxImg.classList.add('bloom-in');
    }

    // Photo Counter Badge
    if (photoCounterBadge) {
      if (photos.length > 1) {
        photoCounterBadge.textContent = `📸 Photo ${currentPhotoIndex + 1} of ${photos.length}`;
        photoCounterBadge.style.display = 'block';
      } else {
        photoCounterBadge.textContent = `🌸 1 Photo`;
        photoCounterBadge.style.display = 'block';
      }
    }

    // Photo Slide Arrows
    if (btnPhotoPrev && btnPhotoNext) {
      if (photos.length > 1) {
        btnPhotoPrev.classList.remove('hidden');
        btnPhotoNext.classList.remove('hidden');
      } else {
        btnPhotoPrev.classList.add('hidden');
        btnPhotoNext.classList.add('hidden');
      }
    }

    // Photo Dots / Pips
    if (lightboxPhotoDots) {
      if (photos.length > 1) {
        lightboxPhotoDots.classList.remove('hidden');
        lightboxPhotoDots.innerHTML = '';
        photos.forEach((_, idx) => {
          const pip = document.createElement('div');
          pip.className = `lightbox-photo-pip ${idx === currentPhotoIndex ? 'active' : ''}`;
          pip.title = `Photo ${idx + 1}`;
          pip.addEventListener('click', (e) => {
            e.stopPropagation();
            renderLightboxMemory(currentMemoryIndex, idx);
          });
          lightboxPhotoDots.appendChild(pip);
        });
      } else {
        lightboxPhotoDots.classList.add('hidden');
      }
    }

    // Details & Captions
    if (lightboxBadge) lightboxBadge.textContent = mem.category || '🌸 Memory';
    if (lightboxCounter) lightboxCounter.textContent = `Memory ${memIdx + 1} of ${memoriesData.length}`;
    if (lightboxDate) lightboxDate.textContent = mem.date || 'Forever & Always';
    if (lightboxTitle) lightboxTitle.textContent = mem.title;
    if (lightboxDesc) lightboxDesc.textContent = mem.desc;
    if (lightboxPhotoNote) {
      lightboxPhotoNote.textContent = activePhoto.caption || '';
      lightboxPhotoNote.style.display = activePhoto.caption ? 'block' : 'none';
    }

    // Bottom Memory Navigator Label
    if (memoryStepLabel) {
      memoryStepLabel.textContent = `Memory ${memIdx + 1} of ${memoriesData.length}`;
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
    }
    if (loveBlastSplash) {
      loveBlastSplash.classList.remove('active');
      loveBlastSplash.setAttribute('aria-hidden', 'true');
    }
  }

  // Next / Prev Photo inside current memory
  function nextPhoto() {
    const photos = memoriesData[currentMemoryIndex].photos || [];
    if (photos.length > 1) {
      renderLightboxMemory(currentMemoryIndex, currentPhotoIndex + 1);
    }
  }

  function prevPhoto() {
    const photos = memoriesData[currentMemoryIndex].photos || [];
    if (photos.length > 1) {
      renderLightboxMemory(currentMemoryIndex, currentPhotoIndex - 1);
    }
  }

  // Next / Prev Memory
  function nextMemory() {
    triggerLoveBlast((currentMemoryIndex + 1) % memoriesData.length, 0);
  }

  function prevMemory() {
    triggerLoveBlast((currentMemoryIndex - 1 + memoriesData.length) % memoriesData.length, 0);
  }

  // Attach gallery card listeners
  function attachGalleryCardListeners(card, index) {
    card.addEventListener('click', (e) => {
      // Ignore click if like button was clicked directly
      if (e.target.closest('.gallery-like-btn')) return;

      const memIdx = card.hasAttribute('data-memory-index') 
        ? parseInt(card.getAttribute('data-memory-index'), 10) 
        : index;

      triggerLoveBlast(memIdx, 0);
    });
  }

  document.querySelectorAll('.gallery-card').forEach((card, idx) => {
    attachGalleryCardListeners(card, idx);
  });

  // Modal Controls
  if (btnCloseLightbox) {
    btnCloseLightbox.addEventListener('click', closeLightbox);
  }

  if (btnPhotoPrev) btnPhotoPrev.addEventListener('click', (e) => { e.stopPropagation(); prevPhoto(); });
  if (btnPhotoNext) btnPhotoNext.addEventListener('click', (e) => { e.stopPropagation(); nextPhoto(); });

  if (btnPrevLightbox) btnPrevLightbox.addEventListener('click', (e) => { e.stopPropagation(); prevMemory(); });
  if (btnNextLightbox) btnNextLightbox.addEventListener('click', (e) => { e.stopPropagation(); nextMemory(); });

  if (btnMemoryStepPrev) btnMemoryStepPrev.addEventListener('click', (e) => { e.stopPropagation(); prevMemory(); });
  if (btnMemoryStepNext) btnMemoryStepNext.addEventListener('click', (e) => { e.stopPropagation(); nextMemory(); });

  // Love Blast Replay Button
  if (btnLoveBlastReplay) {
    btnLoveBlastReplay.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerLoveBlast(currentMemoryIndex, currentPhotoIndex, true);
    });
  }

  // Lightbox Like Button
  if (btnLightboxLike) {
    btnLightboxLike.addEventListener('click', (e) => {
      e.stopPropagation();
      spawnClickHearts(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2, 28);
      showToast('Shrishti loved this cherished memory! ❤️', '💖');
    });
  }

  // Close when clicking modal backdrop
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });

  // Add Memory Modal & Dynamic Card Creation
  const btnAddMemory = document.getElementById('btn-add-memory');
  const addMemoryModal = document.getElementById('add-memory-modal');
  const btnCloseAddMemory = document.getElementById('btn-close-add-memory');
  const addMemoryForm = document.getElementById('add-memory-form');
  const galleryGrid = document.getElementById('gallery-grid');

  if (btnAddMemory && addMemoryModal) {
    btnAddMemory.addEventListener('click', () => {
      addMemoryModal.classList.add('active');
      addMemoryModal.setAttribute('aria-hidden', 'false');
    });

    if (btnCloseAddMemory) {
      btnCloseAddMemory.addEventListener('click', () => {
        addMemoryModal.classList.remove('active');
        addMemoryModal.setAttribute('aria-hidden', 'true');
      });
    }

    addMemoryModal.addEventListener('click', (e) => {
      if (e.target === addMemoryModal) {
        addMemoryModal.classList.remove('active');
        addMemoryModal.setAttribute('aria-hidden', 'true');
      }
    });

    if (addMemoryForm) {
      addMemoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleInput = document.getElementById('memory-title').value.trim();
        const descInput = document.getElementById('memory-desc').value.trim();
        const urlInput = document.getElementById('memory-img-url').value.trim();
        const fileInput = document.getElementById('memory-file-input');

        function insertMemoryCard(imageSrc) {
          const newIdx = memoriesData.length;
          memoriesData.push({
            id: newIdx + 1,
            title: titleInput,
            category: "💖 Special",
            date: "Year 2026",
            desc: descInput,
            photos: [{ src: imageSrc, caption: `“${descInput}”` }]
          });

          const newCard = document.createElement('div');
          newCard.className = 'gallery-card glass-panel';
          newCard.setAttribute('data-memory-index', newIdx);
          newCard.setAttribute('data-category', 'special');
          newCard.setAttribute('data-title', titleInput);
          newCard.setAttribute('data-desc', descInput);
          newCard.innerHTML = `
            <div class="gallery-img-container">
              <img src="${imageSrc}" alt="${titleInput}" class="gallery-img">
              <div class="gallery-overlay">
                <span class="zoom-icon">💖 View Memory</span>
              </div>
              <span class="gallery-badge">💖 New • 1 Photo</span>
            </div>
            <div class="gallery-caption">
              <div class="gallery-meta">
                <span class="gallery-date">Year 2026</span>
                <button type="button" class="gallery-like-btn" title="Like this memory">❤️ <span class="like-num">1</span></button>
              </div>
              <h4>${titleInput}</h4>
              <p>${descInput}</p>
            </div>
          `;
          galleryGrid.appendChild(newCard);
          attachGalleryCardListeners(newCard, newIdx);

          addMemoryModal.classList.remove('active');
          addMemoryModal.setAttribute('aria-hidden', 'true');
          addMemoryForm.reset();

          showToast('New memory added for Shrishti! 📸💖', '✨');
          spawnClickHearts(window.innerWidth / 2, window.innerHeight / 2, 25);
        }

        if (fileInput.files && fileInput.files[0]) {
          const reader = new FileReader();
          reader.onload = function (event) {
            insertMemoryCard(event.target.result);
          };
          reader.readAsDataURL(fileInput.files[0]);
        } else if (urlInput) {
          insertMemoryCard(urlInput);
        } else {
          insertMemoryCard('assets/images/photo1.jpg');
        }
      });
    }
  }

  /* ==========================================================================
     11. CUTE INTERACTIVE SECTION ("Choose One ❤️")
     ========================================================================== */
  const choiceData = {
    message: {
      icon: '💌',
      title: 'A Gentle Reminder',
      text: '“You are more special than you probably realize. ❤️”'
    },
    surprise: {
      icon: '🤗',
      title: 'Cozy Delivery!',
      text: '“Surprise! You just received an unlimited supply of virtual hugs 🤗❤️”'
    },
    sweet: {
      icon: '🌸',
      title: 'Pure Sweetness',
      text: '“If smiles were flowers, you’d have an entire garden. 🌸”'
    }
  };

  const choiceButtons = document.querySelectorAll('.choice-box');
  const choiceRevealArea = document.getElementById('choice-reveal-area');
  const revealIcon = document.getElementById('reveal-icon');
  const revealTitle = document.getElementById('reveal-title');
  const revealText = document.getElementById('reveal-text');
  const btnCloseReveal = document.getElementById('btn-close-reveal');

  choiceButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const choiceKey = btn.getAttribute('data-choice');
      const item = choiceData[choiceKey];
      if (item) {
        revealIcon.textContent = item.icon;
        revealTitle.textContent = item.title;
        revealText.textContent = item.text;
        choiceRevealArea.style.display = 'block';

        choiceRevealArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        spawnClickHearts(e.clientX, e.clientY, 15);
        showToast('You unlocked something sweet! ✨', item.icon);
      }
    });
  });

  if (btnCloseReveal) {
    btnCloseReveal.addEventListener('click', () => {
      choiceRevealArea.style.display = 'none';
    });
  }

  /* ==========================================================================
     12. LOVE METER SECTION (Dramatic Overflow to ∞%)
     ========================================================================== */
  const btnCalculateLove = document.getElementById('btn-calculate-love');
  const meterDisplayVal = document.getElementById('meter-display-val');
  const meterStatusLbl = document.getElementById('meter-status-lbl');
  const meterArc = document.getElementById('meter-arc');
  const meterOverflowMsg = document.getElementById('meter-overflow-msg');
  const meterContainer = document.getElementById('meter-container');

  if (btnCalculateLove) {
    btnCalculateLove.addEventListener('click', () => {
      if (loveMeterCalculating) return;
      loveMeterCalculating = true;
      meterOverflowMsg.style.display = 'none';
      btnCalculateLove.disabled = true;

      const totalArcLength = 251.2;
      let currentVal = 0;
      meterStatusLbl.textContent = 'Measuring affection...';

      const interval = setInterval(() => {
        currentVal += Math.floor(Math.random() * 4) + 2;

        if (currentVal >= 100) {
          clearInterval(interval);
          currentVal = 100;

          meterDisplayVal.textContent = '100%';
          meterArc.style.strokeDashoffset = '0';
          meterStatusLbl.textContent = 'Limit reached... wait...';

          // Dramatic overcharge pause!
          setTimeout(() => {
            // Shake effect!
            meterContainer.classList.add('shake-screen');
            meterDisplayVal.textContent = '∞%';
            meterDisplayVal.style.color = '#e11d48';
            meterStatusLbl.textContent = 'SYSTEM OVERFLOW! 💖';

            meterOverflowMsg.style.display = 'block';
            spawnClickHearts(window.innerWidth / 2, window.innerHeight / 2, 35);
            showToast('Shrishti, your love broke the scale! ∞% ❤️', '💖');

            setTimeout(() => {
              meterContainer.classList.remove('shake-screen');
              btnCalculateLove.disabled = false;
              loveMeterCalculating = false;
            }, 800);
          }, 700);
        } else {
          meterDisplayVal.textContent = `${currentVal}%`;
          const offset = totalArcLength - (currentVal / 100) * totalArcLength;
          meterArc.style.strokeDashoffset = offset;
        }
      }, 35);
    });
  }

  /* ==========================================================================
     13. NIGHT SKY & CELESTIAL SHOOTING STARS
     ========================================================================== */
  const starsCanvas = document.getElementById('stars-canvas');
  if (starsCanvas) {
    const sCtx = starsCanvas.getContext('2d');
    let sWidth = (starsCanvas.width = starsCanvas.parentElement.offsetWidth);
    let sHeight = (starsCanvas.height = starsCanvas.parentElement.offsetHeight);

    window.addEventListener('resize', () => {
      if (starsCanvas.parentElement) {
        sWidth = starsCanvas.width = starsCanvas.parentElement.offsetWidth;
        sHeight = starsCanvas.height = starsCanvas.parentElement.offsetHeight;
      }
    });

    const stars = [];
    const shootingStars = [];

    class Star {
      constructor() {
        this.x = Math.random() * sWidth;
        this.y = Math.random() * sHeight;
        this.radius = 0.6 + Math.random() * 1.8;
        this.baseAlpha = 0.2 + Math.random() * 0.7;
        this.alpha = this.baseAlpha;
        this.twinkleSpeed = 0.01 + Math.random() * 0.03;
      }

      update() {
        this.alpha = this.baseAlpha + Math.sin(Date.now() * this.twinkleSpeed) * 0.3;
      }

      draw() {
        sCtx.save();
        sCtx.globalAlpha = Math.max(0.1, Math.min(1, this.alpha));
        sCtx.fillStyle = '#ffffff';
        sCtx.beginPath();
        sCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        sCtx.fill();
        sCtx.restore();
      }
    }

    class ShootingStar {
      constructor(startX, startY) {
        this.x = startX !== undefined ? startX : Math.random() * sWidth * 0.7;
        this.y = startY !== undefined ? startY : Math.random() * (sHeight * 0.4);
        this.len = 90 + Math.random() * 80;
        this.speed = 12 + Math.random() * 8;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
        this.opacity = 1;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.025;
      }

      draw() {
        sCtx.save();
        sCtx.globalAlpha = Math.max(0, this.opacity);
        const grad = sCtx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos(this.angle) * this.len,
          this.y - Math.sin(this.angle) * this.len
        );
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, '#fbcfe8');
        grad.addColorStop(1, 'transparent');

        sCtx.strokeStyle = grad;
        sCtx.lineWidth = 2.5;
        sCtx.beginPath();
        sCtx.moveTo(this.x, this.y);
        sCtx.lineTo(this.x - Math.cos(this.angle) * this.len, this.y - Math.sin(this.angle) * this.len);
        sCtx.stroke();
        sCtx.restore();
      }
    }

    for (let i = 0; i < 90; i++) {
      stars.push(new Star());
    }

    function spawnShootingStar(x, y) {
      shootingStars.push(new ShootingStar(x, y));
    }

    // Auto spawn shooting stars occasionally
    setInterval(() => {
      if (Math.random() > 0.4) spawnShootingStar();
    }, 3200);

    // Interactive sky click spawns shooting star
    starsCanvas.addEventListener('click', (e) => {
      const rect = starsCanvas.getBoundingClientRect();
      spawnShootingStar(e.clientX - rect.left - 50, e.clientY - rect.top - 50);
      showToast('A wish made upon a star for Shrishti ✨', '🌠');
    });

    const interactiveMoon = document.getElementById('interactive-moon');
    if (interactiveMoon) {
      interactiveMoon.addEventListener('click', (e) => {
        spawnShootingStar();
        spawnClickHearts(e.clientX, e.clientY, 15);
        showToast('The moon sends its sweetest glow to Shrishti 🌙💖', '✨');
      });
    }

    function renderSky() {
      if (!document.hidden) {
        sCtx.clearRect(0, 0, sWidth, sHeight);

        stars.forEach((star) => {
          star.update();
          star.draw();
        });

        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const sStar = shootingStars[i];
          sStar.update();
          sStar.draw();
          if (sStar.opacity <= 0) {
            shootingStars.splice(i, 1);
          }
        }
      }
      requestAnimationFrame(renderSky);
    }
    renderSky();
  }

  /* ==========================================================================
     14. GRAND FINALE CELEBRATION & FIREWORKS
     ========================================================================== */
  const finaleModal = document.getElementById('finale-modal');
  const btnOpenFinale = document.getElementById('btn-open-finale');
  const btnCloseFinale = document.getElementById('btn-close-finale');
  const btnReplayCelebration = document.getElementById('btn-replay-celebration');
  const fireworksCanvas = document.getElementById('fireworks-canvas');

  let fireworksRunning = false;
  let fwCtx = null;
  let fwWidth = 0;
  let fwHeight = 0;
  let fireworks = [];
  let fwParticles = [];

  if (fireworksCanvas) {
    fwCtx = fireworksCanvas.getContext('2d');
    fwWidth = fireworksCanvas.width = window.innerWidth;
    fwHeight = fireworksCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      fwWidth = fireworksCanvas.width = window.innerWidth;
      fwHeight = fireworksCanvas.height = window.innerHeight;
    });
  }

  class Firework {
    constructor() {
      this.x = fwWidth * 0.15 + Math.random() * (fwWidth * 0.7);
      this.y = fwHeight;
      this.targetY = fwHeight * 0.15 + Math.random() * (fwHeight * 0.35);
      this.speed = 8 + Math.random() * 5;
      this.color = ['#ff3366', '#ff758f', '#fbbf24', '#f43f5e', '#a855f7', '#ec4899'][
        Math.floor(Math.random() * 6)
      ];
      this.exploded = false;
    }

    update() {
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.exploded = true;
        this.explode();
      }
    }

    explode() {
      const particleCount = 45;
      for (let i = 0; i < particleCount; i++) {
        fwParticles.push(new FwParticle(this.x, this.y, this.color));
      }
    }

    draw() {
      fwCtx.save();
      fwCtx.fillStyle = this.color;
      fwCtx.beginPath();
      fwCtx.arc(this.x, this.y, 3.5, 0, Math.PI * 2);
      fwCtx.fill();
      fwCtx.restore();
    }
  }

  class FwParticle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = 2 + Math.random() * 3;
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = 0.015 + Math.random() * 0.02;
      this.gravity = 0.12;
      this.isHeart = Math.random() > 0.4;
    }

    update() {
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      fwCtx.save();
      fwCtx.globalAlpha = Math.max(0, this.alpha);
      fwCtx.fillStyle = this.color;
      if (this.isHeart) {
        const s = this.radius * 2.5;
        fwCtx.translate(this.x, this.y);
        fwCtx.beginPath();
        fwCtx.moveTo(0, s / 4);
        fwCtx.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, s / 4);
        fwCtx.bezierCurveTo(-s / 2, s / 2, 0, s * 0.8, 0, s);
        fwCtx.bezierCurveTo(0, s * 0.8, s / 2, s / 2, s / 2, s / 4);
        fwCtx.bezierCurveTo(s / 2, 0, 0, 0, 0, s / 4);
        fwCtx.fill();
      } else {
        fwCtx.beginPath();
        fwCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        fwCtx.fill();
      }
      fwCtx.restore();
    }
  }

  function loopFireworks() {
    if (!fireworksRunning) return;
    fwCtx.clearRect(0, 0, fwWidth, fwHeight);

    if (Math.random() < 0.1) {
      fireworks.push(new Firework());
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
      const fw = fireworks[i];
      fw.update();
      fw.draw();
      if (fw.exploded) fireworks.splice(i, 1);
    }

    for (let i = fwParticles.length - 1; i >= 0; i--) {
      const p = fwParticles[i];
      p.update();
      p.draw();
      if (p.alpha <= 0) fwParticles.splice(i, 1);
    }

    requestAnimationFrame(loopFireworks);
  }

  function launchFinaleCelebration() {
    if (!finaleModal) return;
    finaleModal.classList.add('active');
    finaleModal.setAttribute('aria-hidden', 'false');

    fireworksRunning = true;
    loopFireworks();

    // Spawn heart rain
    triggerHeartShower();
    showToast('For you, Shrishti — always and forever! 💖', '🌸');
  }

  function closeFinaleCelebration() {
    if (!finaleModal) return;
    finaleModal.classList.remove('active');
    finaleModal.setAttribute('aria-hidden', 'true');
    fireworksRunning = false;
    fireworks = [];
    fwParticles = [];
  }

  if (btnOpenFinale) {
    btnOpenFinale.addEventListener('click', launchFinaleCelebration);
  }

  if (btnCloseFinale) {
    btnCloseFinale.addEventListener('click', closeFinaleCelebration);
  }

  if (btnReplayCelebration) {
    btnReplayCelebration.addEventListener('click', () => {
      triggerHeartShower();
      for (let i = 0; i < 4; i++) {
        setTimeout(() => fireworks.push(new Firework()), i * 200);
      }
      showToast('Sparkles and hugs reloaded! ✨', '🥰');
    });
  }

  /* ==========================================================================
     15. EASTER EGGS & FLOATING ACTION BUTTON
     ========================================================================== */
  const logoEasterEgg = document.getElementById('logo-easter-egg');
  const easterEggModal = document.getElementById('easter-egg-modal');
  const btnCloseEasterEgg = document.getElementById('btn-close-easter-egg');
  const btnOkEasterEgg = document.getElementById('btn-ok-easter-egg');
  const heroMainHeart = document.getElementById('hero-main-heart');
  const btnFloatingHeart = document.getElementById('btn-floating-heart');

  // Easter Egg Modal Open
  if (logoEasterEgg && easterEggModal) {
    logoEasterEgg.addEventListener('click', (e) => {
      e.preventDefault();
      easterEggModal.classList.add('active');
      easterEggModal.setAttribute('aria-hidden', 'false');
      spawnClickHearts(e.clientX, e.clientY, 16);
    });

    const closeEE = () => {
      easterEggModal.classList.remove('active');
      easterEggModal.setAttribute('aria-hidden', 'true');
    };

    if (btnCloseEasterEgg) btnCloseEasterEgg.addEventListener('click', closeEE);
    if (btnOkEasterEgg) btnOkEasterEgg.addEventListener('click', closeEE);
    easterEggModal.addEventListener('click', (e) => {
      if (e.target === easterEggModal) closeEE();
    });
  }

  // Double-click hero heart triggers huge burst
  if (heroMainHeart) {
    heroMainHeart.addEventListener('dblclick', (e) => {
      spawnClickHearts(e.clientX, e.clientY, 35);
      showToast('Heart explosion unlocked for Shrishti! 💥💖', '❤️');
    });
  }

  // Floating heart shower function
  function triggerHeartShower() {
    const emojis = ['💖', '💕', '❤️', '🌸', '✨', '🌹', '🥰', '💗'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'click-heart';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = `${Math.random() * window.innerWidth}px`;
        heart.style.top = `${window.innerHeight - 20}px`;
        heart.style.setProperty('--dx', `${(Math.random() - 0.5) * 120}px`);
        heart.style.setProperty('--dy', `-${300 + Math.random() * 400}px`);
        heart.style.fontSize = `${20 + Math.random() * 24}px`;
        document.body.appendChild(heart);

        setTimeout(() => {
          if (heart.parentNode) heart.parentNode.removeChild(heart);
        }, 1500);
      }, i * 40);
    }
  }

  if (btnFloatingHeart) {
    btnFloatingHeart.addEventListener('click', () => {
      triggerHeartShower();
      showToast('Sending a fountain of love to Shrishti! 💖', '💌');
    });
  }

  // Welcome console easter egg
  console.log(
    '%c ❤️ Made with infinite love and care for Shrishti Yadav ❤️ ',
    'background: #ff3366; color: #fff; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 12px;'
  );
})();
