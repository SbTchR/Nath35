/* Atmosphère: étoiles, lucioles, confettis magiques */
(function(){
  const mqReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = mqReduced && mqReduced.matches;

  function rand(min, max){ return Math.random() * (max - min) + min; }
  function pick(arr){ return arr[(Math.random()*arr.length)|0]; }

  function spawnStars(count=80){
    const layer = document.getElementById('stars'); if (!layer) return;
    const w = window.innerWidth, h = window.innerHeight;
    const n = reduced ? Math.min(30, count/3) : count;
    const frag = document.createDocumentFragment();
    for (let i=0;i<n;i++){
      const s = document.createElement('div'); s.className = 'star';
      s.style.left = rand(0,w)+'px'; s.style.top = rand(0,h)+'px';
      s.style.opacity = String(rand(0.4,1));
      s.style.transform = `scale(${rand(0.6,1.4)})`;
      frag.appendChild(s);
    }
    layer.appendChild(frag);
  }

  function spawnFireflies(count=16){
    const layer = document.getElementById('fireflies'); if (!layer) return;
    const w = window.innerWidth, h = window.innerHeight;
    const n = reduced ? Math.min(6, count/3) : count;
    const frag = document.createDocumentFragment();
    for (let i=0;i<n;i++){
      const f = document.createElement('div'); f.className = 'firefly';
      f.style.left = rand(0,w)+'px'; f.style.top = rand(0,h)+'px';
      f.style.setProperty('--dx', `${rand(-120, 140)}px`);
      f.style.setProperty('--dy', `${rand(-100, 120)}px`);
      f.style.animationDuration = `${rand(8,14)}s, ${rand(1.4,2.2)}s`;
      f.style.animationDelay = `${rand(-8,0)}s, ${rand(0,1)}s`;
      frag.appendChild(f);
    }
    layer.appendChild(frag);
  }

  function makeShape(kind){
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS,'svg'); svg.setAttribute('viewBox','0 0 20 20'); svg.classList.add('shape');
    const path = document.createElementNS(svgNS, 'path');
    if (kind==='heart') {
      path.setAttribute('d','M10 17s-6-3.6-6-8.2S8.2 2.1 10 5c1.8-2.9 6-1.9 6 3.8S10 17 10 17z');
      svg.style.color = '#ff8fb7'; svg.classList.add('p-heart');
    } else if (kind==='leaf') {
      path.setAttribute('d','M3 10c7-7 14-2 14-2s-5 7-12 7c-1 0-2-2-2-5z');
      svg.style.color = '#9ed3b8'; svg.classList.add('p-leaf');
    } else { // star
      path.setAttribute('d','M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8 4.8 17l1-5.8L1.5 7.2l5.9-.9z');
      svg.style.color = '#ffdca8'; svg.classList.add('p-star');
    }
    path.setAttribute('fill','currentColor');
    svg.appendChild(path);
    return svg;
  }

  function celebrate(scene='any', opts={}){
    const count = opts.count || (reduced ? 20 : 60);
    const life = opts.life || 1600;
    const container = document.createElement('div'); container.className = 'particles';
    document.body.appendChild(container);
    const w = window.innerWidth, h = window.innerHeight;
    const shapes = ['heart','leaf','star'];
    for (let i=0;i<count;i++){
      const p = document.createElement('div'); p.className = 'particle';
      p.style.left = rand(0,w)+'px'; p.style.top = (h + 10)+'px';
      const s = makeShape(pick(shapes)); p.appendChild(s);
      container.appendChild(p);
      const x = rand(-120,120); const y = rand(-h*0.8,-h*0.4);
      const rot = rand(-360,360);
      const duration = life + rand(-300, 400);
      const scale = rand(0.7,1.2);
      if (p.animate) {
        p.animate([
          { transform: `translate(0,0) rotate(0deg) scale(${scale})`, opacity: 1 },
          { transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`, opacity: 0 }
        ], { duration, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' }).finished.then(()=> p.remove());
      } else {
        // Fallback simple
        p.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        requestAnimationFrame(()=>{
          p.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;
          p.style.opacity = '0';
        });
        setTimeout(()=> p.remove(), duration + 50);
      }
    }
    setTimeout(()=> container.remove(), (life+500)*1.2);
  }

  // Expose celebrate globally for puzzles to call
  window.celebrate = celebrate;

  // Init ambient
  document.addEventListener('DOMContentLoaded', ()=>{
    const scene = document.body?.dataset?.scene || 'intro';
    const starCount = scene==='intro' ? 80 : 60;
    const flyCount = scene==='intro' ? 16 : (scene==='sanctuaire' ? 18 : 14);
    spawnStars(starCount);
    spawnFireflies(flyCount);
  });
})();

