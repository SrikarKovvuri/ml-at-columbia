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
      return '<a class="card" href="/projects.html">' +
        '<span class="art">' + (p.art ? '<img src="/assets/' + p.art + '.svg" alt="" loading="lazy">' : motif(p.k, p.seed, false)) + '</span>' +
        '<span class="body"><span class="org mono">' + p.org + '</span>' +
        '<h3>' + p.n + '</h3><p>' + p.t + '</p>' + tagHTML(p) + '</span></a>';
    }).join("");
  }

  /* --- projects: filterable index, grouped by semester --- */
  var filters = document.getElementById("filters"), groups = document.getElementById("groups");
  if (filters && groups){
    var sems = [];
    P.forEach(function(p){ if (sems.indexOf(p.group) < 0) sems.push(p.group); });
    var active = "All";

    function renderFilters(){
      filters.innerHTML = ["All"].concat(sems).map(function(f, index){
        return '<button type="button" data-f="' + index + '" aria-pressed="' + (f === active) + '">' + f + '</button>';
      }).join("");
    }
    function renderGroups(){
      groups.innerHTML = sems.filter(function(s){ return active === "All" || active === s; }).map(function(sem){
        var items = P.filter(function(p){ return p.group === sem; });
        return '<section class="group"><div class="group-label mono"><span class="dot"></span>' + sem +
          '</div>' +
          '<div class="rows">' + items.map(function(p){
            return '<div class="row">' +
              '<span class="thumb">' + '<img src="/assets/icons/' + p.icon + '.svg" alt="" width="52" height="52">' + '</span>' +
              '<span class="nm">' + p.n + '<span class="org mono">' + p.org + '</span></span>' +
              '<span class="ds">' + p.t + '</span>' +
              '<span class="meta">' + tagHTML(p) + '</span></div>';
          }).join("") + '</div></section>';
      }).join("");
    }
    filters.addEventListener("click", function(e){
      var b = e.target.closest("button[data-f]");
      if (!b) return;
      active = ["All"].concat(sems)[Number(b.getAttribute("data-f"))];
      renderFilters();
      renderGroups();
    });
    renderFilters();
    renderGroups();
  }

  /* --- hero: interactive nearest-neighbor classification --- */
  var cv = document.getElementById("emb");
  if (cv && cv.getContext){
    var ctx = cv.getContext("2d"), pts = [], raf = 0, lastTime = null;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var random = rng(2718);
    for (var i=0;i<48;i++){
      var label=i%2, y=.06+random()*.88;
      var center=.72+.055*Math.sin(y*6);
      pts.push({x:center+(label?1:-1)*(.045+random()*.17),y:y,label:label,
        phase:random()*6.283,speed:.6+random()*.7,weight:1});
    }
    function draw(t){
      var w=cv.clientWidth,h=cv.clientHeight;
      if (!w || !h) return;
      var dt=lastTime===null?0:Math.min(.05,Math.max(0,(t-lastTime)/1000));lastTime=t;
      var motion=reduce.matches?0:t/1000;
      var style=getComputedStyle(document.documentElement);
      var colors=[style.getPropertyValue("--accent").trim()||"#1C63B8","#ba7954"];
      pts.forEach(function(p){
        p.px=p.x+(p.user?0:Math.sin(motion*p.speed+p.phase)*.018);
        p.py=p.y+(p.user?0:Math.cos(motion*p.speed*.8+p.phase)*.02);
      });
      ctx.clearRect(0,0,w,h);
      // New samples connect to their nearest examples and take the majority class.
      pts.filter(function(p){return p.user;}).forEach(function(p){
        var neighbors=pts.filter(function(q){return !q.user;}).map(function(q){
          return {point:q,d:Math.pow((q.px-p.px)*w,2)+Math.pow((q.py-p.py)*h,2)};
        }).sort(function(a,b){return a.d-b.d;}).slice(0,3);
        p.label=neighbors.filter(function(n){return n.point.label===1;}).length>=2?1:0;
        neighbors.forEach(function(n){
          ctx.globalAlpha=.18;ctx.strokeStyle=colors[n.point.label];ctx.lineWidth=1;
          ctx.beginPath();ctx.moveTo(p.px*w,p.py*h);ctx.lineTo(n.point.px*w,n.point.py*h);ctx.stroke();
        });
      });
      pts.forEach(function(p){
        // Keep the left side quiet behind the headline and buttons.
        ctx.globalAlpha=p.px<.5?.25:.8;
        ctx.fillStyle=colors[p.label];ctx.beginPath();
        ctx.arc(p.px*w,p.py*h,p.user?5:3,0,Math.PI*2);ctx.fill();
        if(p.user){ctx.globalAlpha=.25;ctx.strokeStyle=colors[p.label];ctx.lineWidth=1;ctx.beginPath();ctx.arc(p.px*w,p.py*h,9,0,Math.PI*2);ctx.stroke();}
      });
      ctx.globalAlpha=1;
    }
    function spawn(x,y){
      // Retain training examples from both classes; cap user-added points.
      if(pts.length>=60)pts.splice(48,1);
      pts.push({x:Math.max(.02,Math.min(.98,x/cv.clientWidth)),y:Math.max(.02,Math.min(.98,y/cv.clientHeight)),
        label:0,user:true,weight:6});
      draw(reduce.matches?0:performance.now());
    }
    cv.parentElement.addEventListener("click",function(e){
      if(e.target.closest("a, button") || window.getSelection().toString())return;
      var rect=cv.getBoundingClientRect();spawn(e.clientX-rect.left,e.clientY-rect.top);
    });
    cv.addEventListener("keydown",function(e){
      if(e.key!=="Enter" && e.key!==" ")return;
      e.preventDefault();spawn(cv.clientWidth*(.55+Math.random()*.35),cv.clientHeight*(.15+Math.random()*.7));
    });
    function resize(){
      var rect=cv.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
      if(rect.width<2)return;
      cv.width=rect.width*dpr;cv.height=rect.height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
      lastTime=null;draw(reduce.matches?0:performance.now());
    }
    function loop(t){draw(t);raf=requestAnimationFrame(loop);}
    function start(){cancelAnimationFrame(raf);lastTime=null;if(reduce.matches)draw(0);else raf=requestAnimationFrame(loop);}
    window.addEventListener("resize",resize);
    if(reduce.addEventListener)reduce.addEventListener("change",start);
    var dark=window.matchMedia("(prefers-color-scheme: dark)");
    if(dark.addEventListener)dark.addEventListener("change",function(){draw(performance.now());});
    resize();start();
  }
})();
