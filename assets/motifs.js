/* Generated project artwork. No stock photos, no faces. Every project gets a
   deterministic little plot drawn from its seed, inheriting the theme accent
   through currentColor. */
(function(){
  "use strict";

  function rng(seed){
    return function(){
      seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  /* kind: curve (training run) | bars (spectrogram) | scatter (embedding)
           | grid (segmentation mask) | graph (k-NN) */
  function motif(kind, seed, small){
    var r = rng(seed), W = 100, H = 62, s = [];
    var sw = small ? 1.6 : 1.2;

    if (kind === "curve"){
      var d = "", n = small ? 18 : 34, last = H - 8;
      for (var i = 0; i <= n; i++){
        var x = 6 + i / n * 88;
        var base = H - 10 - Math.pow(i / n, .42) * (H - 24);
        var y = Math.max(6, Math.min(H - 6, base + (r() - .5) * (small ? 5 : 7) * (1 - i / n * .7)));
        d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
        last = y;
      }
      if (!small) for (var g = 1; g < 4; g++)
        s.push('<line x1="6" y1="' + (6 + g * 12.5) + '" x2="94" y2="' + (6 + g * 12.5) + '" stroke="currentColor" stroke-width=".4" opacity=".16"/>');
      s.push('<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linejoin="round" stroke-linecap="round"/>');
      s.push('<circle cx="94" cy="' + last.toFixed(1) + '" r="' + (small ? 2 : 2.4) + '" fill="currentColor"/>');
    }
    else if (kind === "bars"){
      var cols = small ? 11 : 26, gw = 88 / cols;
      for (var c = 0; c < cols; c++){
        var h = 4 + Math.pow(r(), 1.7) * (H - 16) * (.5 + .5 * Math.sin(c / cols * Math.PI));
        s.push('<rect x="' + (6 + c * gw).toFixed(1) + '" y="' + (H - 6 - h).toFixed(1) +
               '" width="' + (gw * .62).toFixed(1) + '" height="' + h.toFixed(1) +
               '" fill="currentColor" opacity="' + (.3 + r() * .65).toFixed(2) + '" rx=".6"/>');
      }
    }
    else if (kind === "scatter"){
      var clusters = small ? 2 : 3;
      for (var k = 0; k < clusters; k++){
        var cx = 18 + r() * 64, cy = 14 + r() * 36, m = small ? 7 : 16;
        for (var p = 0; p < m; p++){
          var a = r() * 6.283, rad = Math.pow(r(), .6) * (small ? 9 : 13);
          var px = cx + Math.cos(a) * rad, py = cy + Math.sin(a) * rad * .72;
          if (px < 5 || px > 95 || py < 5 || py > H - 5) continue;
          s.push('<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) +
                 '" r="' + (small ? 1.3 : 1.7) + '" fill="currentColor" opacity="' + (k === 1 ? ".9" : ".38") + '"/>');
        }
      }
    }
    else if (kind === "grid"){
      var cw = small ? 7 : 9, rows = Math.floor((H - 10) / cw), cols2 = Math.floor(88 / cw);
      for (var y2 = 0; y2 < rows; y2++) for (var x2 = 0; x2 < cols2; x2++){
        var v = r();
        s.push('<rect x="' + (6 + x2 * cw).toFixed(1) + '" y="' + (5 + y2 * cw).toFixed(1) +
               '" width="' + (cw - 1.4).toFixed(1) + '" height="' + (cw - 1.4).toFixed(1) +
               '" fill="currentColor" opacity="' + (v > .58 ? (.35 + v * .6).toFixed(2) : ".1") + '" rx="1"/>');
      }
    }
    else { /* graph */
      var N = small ? 6 : 11, pts = [];
      for (var q = 0; q < N; q++) pts.push([10 + r() * 80, 9 + r() * (H - 18)]);
      for (var a2 = 0; a2 < N; a2++){
        var best = -1, bd = Infinity;
        for (var b = 0; b < N; b++){
          if (b === a2) continue;
          var dd = Math.hypot(pts[a2][0] - pts[b][0], pts[a2][1] - pts[b][1]);
          if (dd < bd){ bd = dd; best = b; }
        }
        s.push('<line x1="' + pts[a2][0].toFixed(1) + '" y1="' + pts[a2][1].toFixed(1) +
               '" x2="' + pts[best][0].toFixed(1) + '" y2="' + pts[best][1].toFixed(1) +
               '" stroke="currentColor" stroke-width=".7" opacity=".3"/>');
      }
      pts.forEach(function(p, i){
        s.push('<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) +
               '" r="' + (i % 3 === 0 ? (small ? 2.2 : 2.8) : (small ? 1.4 : 1.9)) +
               '" fill="currentColor" opacity="' + (i % 3 === 0 ? ".95" : ".5") + '"/>');
      });
    }

    return '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + s.join("") + '</svg>';
  }

  window.rng = rng;
  window.motif = motif;
})();
