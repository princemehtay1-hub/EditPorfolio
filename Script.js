(function () {
    var tracks = document.getElementById('tracks'), ph = document.getElementById('ph'), tc = document.getElementById('tc'), drag = false;
    function set(x) {
        var r = tracks.getBoundingClientRect(), laneL = 36, w = r.width - laneL;
        var p = Math.max(0, Math.min(1, (x - r.left - laneL) / w));
        ph.style.left = (laneL + p * w) + 'px';
        var f = Math.round(p * 90 * 24), s = Math.floor(f / 24), pad = function (n) { return String(n).padStart(2, '0') };
        tc.textContent = '00:' + pad(Math.floor(s / 60)) + ':' + pad(s % 60) + ':' + pad(f % 24);
    }
    tracks.addEventListener('pointerdown', function (e) { drag = true; tracks.setPointerCapture(e.pointerId); set(e.clientX) });
    tracks.addEventListener('pointermove', function (e) { if (drag) set(e.clientX) });
    tracks.addEventListener('pointerup', function () { drag = false });
    var btns = document.querySelectorAll('.filters button'), cards = document.querySelectorAll('.work');
    btns.forEach(function (b) {
        b.addEventListener('click', function () {
            btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b) });
            cards.forEach(function (c) { c.hidden = !(b.dataset.f === 'all' || c.dataset.c === b.dataset.f) });
        })
    });
})();

(function () {
    var h1 = document.querySelector('.scene h1');
    h1.setAttribute('aria-label', h1.textContent);
    h1.innerHTML = h1.textContent.split(' ').map(function (w, i) { return '<span aria-hidden="true" style="--i:' + i + '">' + w + '</span>' }).join(' ');
    var rt = document.getElementById('rt'), t0 = performance.now();
    function p(n) { return String(n).padStart(2, '0') }
    (function tick() {
        var f = Math.floor((performance.now() - t0) / 1000 * 24), s = Math.floor(f / 24);
        rt.textContent = '00:' + p(Math.floor(s / 60)) + ':' + p(s % 60) + ':' + p(f % 24); requestAnimationFrame(tick)
    })();
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }) }, { threshold: .15 });
    document.querySelectorAll('.work,.step,.stats div,section h2,.sub,.tools li,.tl').forEach(function (el, i) {
        el.classList.add('rv'); el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el)
    });
})();