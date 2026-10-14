/* ================================================================
   Tezeon Services Ltd — Animation Suite
   Requires: GSAP 3.12 + ScrollTrigger (loaded in <head>)
   ================================================================ */
(function () {
    'use strict';
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    /* ──────────────────────────────────────────────────────────────
       1. VIDEO HERO SLIDER  (index.html)
    ────────────────────────────────────────────────────────────── */
    function initVideoHero() {
        var slides  = document.querySelectorAll('.vh-slide');
        if (!slides.length) return;

        var dots    = document.querySelectorAll('.vh-dot');
        var prevBtn = document.querySelector('.vh-prev');
        var nextBtn = document.querySelector('.vh-next');
        var fill    = document.getElementById('vhProgressFill');
        var hero    = document.getElementById('vidHero');
        var mq      = window.matchMedia('(min-width: 992px)');

        var current  = 0;
        var total    = slides.length;
        var timer    = null;
        var DURATION = 7000;

        /* ── Caption helpers ── */
        function animateCaption(slide) {
            var sub     = slide.querySelector('.vh-sub');
            var heading = slide.querySelector('.vh-heading');
            var cta     = slide.querySelector('.vh-cta');
            if (!sub) return;
            gsap.set([sub, heading, cta].filter(Boolean), { opacity: 0, y: 30 });
            var tl = gsap.timeline({ delay: 0.2 });
            tl.to(sub,     { opacity: 1, y: 0, duration: 0.7,  ease: 'power3.out' }, 0)
              .to(heading, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, 0.18)
              .to(cta,     { opacity: 1, y: 0, duration: 0.6,  ease: 'power3.out' }, 0.38);
        }

        function animateCombinedCaption() {
            var combined = document.querySelector('.vh-caption-combined');
            if (!combined) return;
            var sub     = combined.querySelector('.vh-sub');
            var heading = combined.querySelector('.vh-heading');
            var actions = combined.querySelector('.vh-caption-combined-actions');
            gsap.set([sub, heading, actions].filter(Boolean), { opacity: 0, y: 32 });
            var tl = gsap.timeline({ delay: 0.4 });
            tl.to(sub,     { opacity: 1, y: 0, duration: 0.6,  ease: 'power3.out' })
              .to(heading, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.3')
              .to(actions, { opacity: 1, y: 0, duration: 0.6,  ease: 'power3.out' }, '-=0.35');
        }

        /* ── Slide / timer helpers (mobile) ── */
        function showSlide(idx) {
            slides[current].classList.remove('active');
            if (dots[current]) dots[current].classList.remove('active');
            current = ((idx % total) + total) % total;
            slides[current].classList.add('active');
            if (dots[current]) dots[current].classList.add('active');

            var video = slides[current].querySelector('video');
            if (video) { video.currentTime = 0; video.play().catch(function () {}); }

            animateCaption(slides[current]);

            if (fill) {
                gsap.killTweensOf(fill);
                gsap.set(fill, { width: '0%' });
                gsap.to(fill, { width: '100%', duration: DURATION / 1000, ease: 'none' });
            }
        }

        function startTimer() {
            clearInterval(timer);
            timer = setInterval(function () { showSlide(current + 1); }, DURATION);
        }

        function stopTimer() {
            clearInterval(timer);
            timer = null;
        }

        /* ── Mode entry points ── */
        function enterDesktop() {
            stopTimer();
            /* Pause progress bar */
            if (fill) { gsap.killTweensOf(fill); gsap.set(fill, { width: '0%' }); }
            /* Play first 3 video panels */
            Array.prototype.slice.call(slides, 0, 3).forEach(function (slide) {
                var video = slide.querySelector('video');
                if (video) { video.setAttribute('preload', 'auto'); video.play().catch(function () {}); }
            });
            animateCombinedCaption();
        }

        function enterMobile() {
            /* Pause videos that aren't the active slide */
            slides.forEach(function (slide, i) {
                if (i !== current) {
                    var video = slide.querySelector('video');
                    if (video) video.pause();
                }
                slide.classList.toggle('active', i === current);
            });
            dots.forEach(function (dot, i) { dot.classList.toggle('active', i === current); });
            showSlide(current);
            startTimer();
        }

        /* ── Bind controls ONCE — guard with mq.matches so desktop ignores them ── */
        if (prevBtn) prevBtn.addEventListener('click', function () {
            if (!mq.matches) { showSlide(current - 1); startTimer(); }
        });
        if (nextBtn) nextBtn.addEventListener('click', function () {
            if (!mq.matches) { showSlide(current + 1); startTimer(); }
        });
        dots.forEach(function (dot, i) {
            dot.addEventListener('click', function () {
                if (!mq.matches) { showSlide(i); startTimer(); }
            });
        });

        /* Touch swipe — bound once, ignored on desktop */
        var swipeX = 0;
        if (hero) {
            hero.addEventListener('touchstart', function (e) { swipeX = e.touches[0].clientX; }, { passive: true });
            hero.addEventListener('touchend', function (e) {
                if (mq.matches) return;
                var diff = swipeX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {
                    diff > 0 ? showSlide(current + 1) : showSlide(current - 1);
                    startTimer();
                }
            }, { passive: true });
        }

        /* ── Breakpoint listener — re-initialises on resize ── */
        function onMQChange(e) {
            if (e.matches) { enterDesktop(); } else { enterMobile(); }
        }
        if (mq.addEventListener) {
            mq.addEventListener('change', onMQChange);
        } else {
            mq.addListener(onMQChange); /* Safari < 14 fallback */
        }

        /* ── Initial state ── */
        if (mq.matches) { enterDesktop(); } else { showSlide(0); startTimer(); }
    }

    /* ──────────────────────────────────────────────────────────────
       2. APPLE GLASS STICKY NAV
    ────────────────────────────────────────────────────────────── */
    function initGlassNav() {
        var nav = document.querySelector('.nav-bar');
        if (!nav) return;
        function update() { nav.classList.toggle('nav-glassed', window.scrollY > 60); }
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ──────────────────────────────────────────────────────────────
       3. SCROLL REVEAL  (ScrollTrigger)
    ────────────────────────────────────────────────────────────── */
    function initScrollReveal() {
        if (typeof ScrollTrigger === 'undefined') return;

        /* Helper — batch-reveal a selector with stagger */
        function reveal(sel, vars, stagger, start) {
            document.querySelectorAll(sel).forEach(function (el, i) {
                var v = Object.assign({ scrollTrigger: { trigger: el, start: start || 'top 87%', once: true }, delay: (i % 4) * (stagger || 0.1) }, vars);
                gsap.from(el, v);
            });
        }

        /* Section headers */
        document.querySelectorAll('.section-header').forEach(function (el) {
            var p = el.querySelector('p'), h2 = el.querySelector('h2');
            var tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
            if (p)  tl.from(p,  { opacity: 0, y: 20, duration: 0.55, ease: 'power3.out' });
            if (h2) tl.from(h2, { opacity: 0, y: 32, duration: 0.65, ease: 'power3.out' }, '-=0.22');
        });

        /* Cards & items */
        reveal('.service-item',   { opacity: 0, y: 50, scale: 0.95, duration: 0.7, ease: 'power3.out' }, 0.1);
        reveal('.team-item',      { opacity: 0, y: 40, duration: 0.65, ease: 'power3.out' }, 0.12);
        reveal('.portfolio-item', { opacity: 0, y: 40, scale: 0.96, duration: 0.6,  ease: 'power3.out' }, 0.09);
        reveal('.feature-item',   { opacity: 0, y: 35, duration: 0.6, ease: 'power3.out' }, 0.1);
        reveal('.contact-item',   { opacity: 0, x: -30, duration: 0.6, ease: 'power3.out' }, 0.1);

        /* About split */
        var aImg = document.querySelector('.about .about-img');
        var aHdr = document.querySelector('.about .section-header');
        var aTxt = document.querySelector('.about .about-text');
        if (aImg) gsap.from(aImg, { scrollTrigger: { trigger: aImg, start: 'top 80%', once: true }, opacity: 0, x: -55, duration: 0.85, ease: 'power3.out' });
        if (aHdr) gsap.from(aHdr, { scrollTrigger: { trigger: aHdr, start: 'top 80%', once: true }, opacity: 0, x: 45, duration: 0.7,  ease: 'power3.out' });
        if (aTxt) gsap.from(aTxt, { scrollTrigger: { trigger: aTxt, start: 'top 85%', once: true }, opacity: 0, y: 25, duration: 0.65, ease: 'power3.out', delay: 0.2 });

        /* Fact counters */
        document.querySelectorAll('.fact-text').forEach(function (el, i) {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 82%', once: true },
                opacity: 0, y: 28, scale: 0.88, duration: 0.65, delay: i * 0.14,
                ease: 'back.out(1.5)'
            });
        });

        /* Gallery collage */
        document.querySelectorAll('.collage-item').forEach(function (el, i) {
            gsap.from(el, {
                scrollTrigger: { trigger: '.gallery-collage', start: 'top 82%', once: true },
                opacity: 0, scale: 0.88, duration: 0.65, delay: i * 0.09, ease: 'power3.out'
            });
        });

        /* FAQ alternating */
        document.querySelectorAll('#accordion-1 .card').forEach(function (el, i) {
            gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%', once: true }, opacity: 0, x: -30, duration: 0.5, delay: i * 0.07, ease: 'power3.out' });
        });
        document.querySelectorAll('#accordion-2 .card').forEach(function (el, i) {
            gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%', once: true }, opacity: 0, x: 30,  duration: 0.5, delay: i * 0.07, ease: 'power3.out' });
        });

        /* Testimonial slider nav */
        var sliderNav = document.querySelector('.testimonial-slider-nav');
        if (sliderNav) gsap.from(sliderNav, { scrollTrigger: { trigger: sliderNav, start: 'top 85%', once: true }, opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' });

        /* Page-header text */
        var phTitle = document.querySelector('.page-header h2');
        var phBread = document.querySelector('.page-header .col-12:last-child');
        if (phTitle) gsap.from(phTitle, { opacity: 0, y: -28, duration: 0.7, ease: 'power3.out', delay: 0.1 });
        if (phBread) gsap.from(phBread, { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out', delay: 0.3 });
    }

    /* ──────────────────────────────────────────────────────────────
       4. PARALLAX
    ────────────────────────────────────────────────────────────── */
    function initParallax() {
        if (typeof ScrollTrigger === 'undefined') return;

        /* About media */
        var aboutMedia = document.querySelector('.about-img video, .about-img img');
        if (aboutMedia) {
            gsap.to(aboutMedia, {
                yPercent: -14, ease: 'none',
                scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true }
            });
        }

        /* Video section parallax bg */
        var videoSec = document.querySelector('.video');
        if (videoSec) {
            gsap.to(videoSec, {
                backgroundPositionY: '70%', ease: 'none',
                scrollTrigger: { trigger: videoSec, start: 'top bottom', end: 'bottom top', scrub: true }
            });
        }

        /* Testimonial parallax */
        var testSec = document.querySelector('.testimonial');
        if (testSec) {
            gsap.to(testSec, {
                backgroundPositionY: '60%', ease: 'none',
                scrollTrigger: { trigger: testSec, start: 'top bottom', end: 'bottom top', scrub: true }
            });
        }
    }

    /* ──────────────────────────────────────────────────────────────
       5. CARD HOVER LIFT  (mouse) — water ripple removed per spec
    ────────────────────────────────────────────────────────────── */

    /* ──────────────────────────────────────────────────────────────
       6. CARD HOVER LIFT  (mouse)
    ────────────────────────────────────────────────────────────── */
    function initCardHover() {
        document.querySelectorAll('.service-item, .team-item').forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                gsap.to(el, { y: -7, duration: 0.32, ease: 'power2.out', overwrite: true });
            });
            el.addEventListener('mouseleave', function () {
                gsap.to(el, { y: 0, duration: 0.55, ease: 'elastic.out(1, 0.5)', overwrite: true });
            });
        });
    }

    /* ──────────────────────────────────────────────────────────────
       7. INNER PAGE LOADER  (non-index pages)
    ────────────────────────────────────────────────────────────── */
    function initPageLoader() {
        var loader = document.getElementById('tez-page-loader');
        if (!loader) return;
        /* index.html has #tez-preloader instead — don't double-dismiss */
        if (document.getElementById('tez-preloader')) { loader.style.display = 'none'; return; }

        var fill = document.getElementById('tplFill');
        if (fill) requestAnimationFrame(function () { fill.style.width = '100%'; });

        var startTime = Date.now();
        var done = false;

        function dismiss() {
            if (done) return;
            done = true;
            gsap.to(loader, {
                scaleY: 0, transformOrigin: 'top center', duration: 0.75, ease: 'power4.inOut',
                onComplete: function () { loader.style.display = 'none'; document.body.classList.remove('tez-loading'); }
            });
        }

        window.addEventListener('load', function () {
            setTimeout(dismiss, Math.max(0, 800 - (Date.now() - startTime)));
        });
        setTimeout(dismiss, 3000);
    }

    /* ──────────────────────────────────────────────────────────────
       8. KINETIC COUNTER ENHANCEMENT
         (counterup.js handles counting; we just add the scale pop)
    ────────────────────────────────────────────────────────────── */
    function initCounterPop() {
        if (typeof ScrollTrigger === 'undefined') return;
        document.querySelectorAll('[data-toggle="counter-up"]').forEach(function (el) {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 80%', once: true },
                scale: 0.5, opacity: 0, duration: 0.6, ease: 'back.out(2)'
            });
        });
    }

    /* ──────────────────────────────────────────────────────────────
       INIT
    ────────────────────────────────────────────────────────────── */
    function init() {
        initVideoHero();
        initGlassNav();
        initScrollReveal();
        initParallax();
        initCardHover();
        initPageLoader();
        initCounterPop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
