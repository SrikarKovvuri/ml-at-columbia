/* Page wiring. Both pages load this; each block runs only if its container exists. */
(function(){
  "use strict";
  var P = window.PROJECTS || [], motif = window.motif, rng = window.rng;

  function tagHTML(p){
    return '<div class="tags">' + p.tags.map(function(t){
      return '<span class="tag">' + t + '</span>';
    }).join("") + '</div>';
  }

  /* --- home: the three current projects --- */
  var feat = document.getElementById("feat");
  if (feat){
    feat.innerHTML = P.filter(function(p){ return p.feat; }).map(function(p){
      return '<a class="card" href="/projects">' +
        '<span class="art">' + motif(p.k, p.seed, false) + '</span>' +
        '<span class="body"><h3>' + p.n + '</h3><p>' + p.t + '</p>' + tagHTML(p) + '</span></a>';
    }).join("");
  }

  /* --- projects: filterable index, grouped by semester --- */
  var filters = document.getElementById("filters"), groups = document.getElementById("groups");
  if (filters && groups){
    var sems = [];
    P.forEach(function(p){ if (sems.indexOf(p.sem) < 0) sems.push(p.sem); });
    var active = "All";

    function renderFilters(){
      filters.innerHTML = ["All"].concat(sems).map(function(f){
        return '<button type="button" data-f="' + f + '" aria-pressed="' + (f === active) + '">' + f + '</button>';
      }).join("");
    }
    function renderGroups(){
      groups.innerHTML = sems.filter(function(s){ return active === "All" || active === s; }).map(function(sem){
        var items = P.filter(function(p){ return p.sem === sem; });
        return '<section class="group"><div class="group-label mono"><span class="dot"></span>' + sem +
          (sem === "Fall 2026" ? " &mdash; in progress" : "") +
          '<span class="count">' + items.length + " project" + (items.length > 1 ? "s" : "") + '</span></div>' +
          '<div class="rows">' + items.map(function(p){
            return '<div class="row">' +
              '<span class="thumb">' + motif(p.k, p.seed, true) + '</span>' +
              '<span class="nm">' + p.n + '</span>' +
              '<span class="ds">' + p.t + '</span>' +
              '<span class="meta">' + tagHTML(p) + '</span></div>';
          }).join("") + '</div></section>';
      }).join("");
    }
    filters.addEventListener("click", function(e){
      var b = e.target.closest("button[data-f]");
      if (!b) return;
      active = b.getAttribute("data-f");
      renderFilters();
      renderGroups();
    });
    renderFilters();
    renderGroups();
  }

  /* --- hero: an embedding space, drifting --- */
  var cv = document.getElementById("emb");
  if (cv && cv.getContext){
    var ctx = cv.getContext("2d"), pts = [], raf = 0;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    function accent(){
      return getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#1C63B8";
    }
    function seed(w, h){
      var r = rng(2718);
      pts = [];
      for (var c = 0; c < 5; c++){
        var cx = w * (.15 + r() * .8), cy = h * (.12 + r() * .78), n = 16 + Math.floor(r() * 14);
        for (var i = 0; i < n; i++){
          var a = r() * 6.283, rad = Math.pow(r(), .55) * Math.min(w, h) * .12;
          var x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad;
          pts.push({ x:x, y:y, bx:x, by:y, ph:r() * 6.283, sp:.3 + r() * .7,
                     r:r() > .86 ? 2.3 : 1.35, o:.25 + r() * .6 });
        }
      }
    }
    function draw(t){
      var w = cv.clientWidth, h = cv.clientHeight, col = accent();
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = col;
      ctx.fillStyle = col;
      for (var i = 0; i < pts.length; i++){
        pts[i].x = pts[i].bx + Math.sin(t / 3400 * pts[i].sp + pts[i].ph) * 9;
        pts[i].y = pts[i].by + Math.cos(t / 4100 * pts[i].sp + pts[i].ph) * 7;
      }
      ctx.lineWidth = .6;
      for (var a = 0; a < pts.length; a++){
        for (var b = a + 1; b < pts.length; b++){
          var dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y, d2 = dx * dx + dy * dy;
          if (d2 < 3200){
            ctx.globalAlpha = (1 - d2 / 3200) * .22;
            ctx.beginPath();
            ctx.moveTo(pts[a].x, pts[a].y);
            ctx.lineTo(pts[b].x, pts[b].y);
            ctx.stroke();
          }
        }
      }
      for (var j = 0; j < pts.length; j++){
        ctx.globalAlpha = pts[j].o;
        ctx.beginPath();
        ctx.arc(pts[j].x, pts[j].y, pts[j].r, 0, 6.283);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    function resize(){
      var rect = cv.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (rect.width < 2) return;
      cv.width = rect.width * dpr;
      cv.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed(rect.width, rect.height);
      draw(0);
    }
    function loop(t){ draw(t); raf = requestAnimationFrame(loop); }
    function start(){
      cancelAnimationFrame(raf);
      if (reduce.matches) draw(0); else raf = requestAnimationFrame(loop);
    }
    window.addEventListener("resize", function(){ resize(); start(); });
    if (reduce.addEventListener) reduce.addEventListener("change", start);
    var dark = window.matchMedia("(prefers-color-scheme: dark)");
    if (dark.addEventListener) dark.addEventListener("change", function(){ draw(performance.now()); });
    resize();
    start();
  }
})();
