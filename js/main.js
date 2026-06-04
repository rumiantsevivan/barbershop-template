/* =============================================================================
   BEAUTY TEMPLATE — ENGINE
   Reads window.SITE (from data.js) and builds every page. Shared header/footer
   are injected here so nav/footer are edited in ONE place. You normally never
   touch this file for client work.
   ========================================================================== */
(function () {
  "use strict";
  var S = window.SITE || {};
  var B = S.business || {};
  var T = S.theme || {};
  var page = document.body.dataset.page || "home";

  /* ---- helpers ---- */
  function el(id){ return document.getElementById(id); }
  function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];}); }
  function stars(n){ var f=""; for(var i=0;i<5;i++) f+= i<n ? "★":"☆"; return f; }
  function t(strings){ return strings; }
  // "9:00 AM" / "12:30 PM" -> minutes since midnight (null if unparseable)
  function timeToMinutes(str){
    var m=String(str).match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if(!m) return null;
    var h=(+m[1])%12; if(/pm/i.test(m[3])) h+=12;
    return h*60+(+m[2]);
  }

  /* ---- THEME COLORS from data.theme ---- */
  var r=document.documentElement.style;
  if(T.brand) r.setProperty("--brand",T.brand);
  if(T.brandDark) r.setProperty("--brand-dark",T.brandDark);
  if(T.accent) r.setProperty("--accent",T.accent);

  /* ---- todays day index for hours highlight ---- */
  var DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var todayName=DAYS[new Date().getDay()];

  /* =========================================================================
     SHARED HEADER
     ====================================================================== */
  function bookHref(){ return B.bookingLink ? B.bookingLink : "contact.html"; }
  function navLink(href,label,key){
    return '<a href="'+href+'"'+(page===key?' class="active"':"")+'>'+label+'</a>';
  }
  function buildHeader(){
    var slot=el("header"); if(!slot) return;
    slot.outerHTML =
    '<header class="site-header" id="siteHeader"><div class="wrap nav">'+
      '<a class="brand" href="index.html">'+
        '<span class="brand__name">'+esc(B.name)+'</span>'+
        '<span class="brand__type">'+esc(B.type)+'</span>'+
      '</a>'+
      '<nav class="nav__links" id="navLinks">'+
        navLink("index.html","Home","home")+
        navLink("services.html","Services","services")+
        navLink("gallery.html","Gallery","gallery")+
        navLink("team.html","Team","team")+
        navLink("contact.html","Contact","contact")+
      '</nav>'+
      '<div class="nav__cta">'+
        '<a class="nav__phone" href="tel:'+esc(B.phoneTel)+'">'+'<span>☎</span> '+esc(B.phone)+'</a>'+
        '<a class="btn btn--primary" href="'+bookHref()+'"'+(B.bookingLink?' target="_blank" rel="noopener"':"")+'>Book Now</a>'+
        '<button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>'+
      '</div>'+
    '</div></header>';

    var burger=el("burger"), links=el("navLinks");
    if(burger) burger.addEventListener("click",function(){ burger.classList.toggle("open"); links.classList.toggle("open"); });
    var hdr=el("siteHeader");
    window.addEventListener("scroll",function(){ hdr.classList.toggle("scrolled",window.scrollY>8); });
  }

  /* =========================================================================
     SHARED FOOTER
     ====================================================================== */
  function socialIcon(key){
    var paths={
      instagram:'<path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7C3.43 9.05 3.43 9.4 3.43 12s0 2.95.07 4.19c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.07 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.07-1.24.07-1.59.07-4.19s0-2.95-.07-4.19c-.04-.9-.19-1.38-.32-1.7a2.85 2.85 0 0 0-.68-1.06 2.85 2.85 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.5 4 15.15 4 12 4zm0 3.07a4.93 4.93 0 1 1 0 9.86 4.93 4.93 0 0 1 0-9.86zm0 1.8a3.13 3.13 0 1 0 0 6.26 3.13 3.13 0 0 0 0-6.26zm5.14-.86a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z"/>',
      facebook:'<path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/>',
      tiktok:'<path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.9a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12v-3.3a5.9 5.9 0 0 0-.78-.05A5.9 5.9 0 1 0 15.74 16V9.4a7.5 7.5 0 0 0 4.4 1.4V7.6a4.28 4.28 0 0 1-3.54-1.78z"/>',
      yelp:'<path d="M12.3 2.3c1.1-.18 3.6.74 4.2 1.55.2.27.3.6.27.94l-.55 7.3c-.08 1.06-1.45 1.42-2.05.54L9.9 6.85a1.07 1.07 0 0 1 .12-1.37c.6-.6 1.6-2.9 2.28-3.18zM8.2 14.2l-4.6-1.5c-1-.33-1.07-1.74-.1-2.17 0 0 2.45-1.07 3.2-1.07.42 0 .8.24.98.62l1.5 3.1c.45.92-.5 1.9-1 1.02zm.65 1.85c.5-.36 1.2-.05 1.27.56l.4 4.85c.08.98-1.15 1.45-1.74.66 0 0-1.6-2.13-1.83-2.85a1.07 1.07 0 0 1 .35-1.16zm5.2.3c.4-.45 1.13-.3 1.34.27l1.65 4.55c.34.93-.78 1.74-1.55 1.12 0 0-2-1.66-2.4-2.3a1.07 1.07 0 0 1 .07-1.2zm1.07-2.3c-.2-.6.34-1.18.95-1.05l4.77 1.02c.97.2.94 1.62-.05 1.96 0 0-2.5.83-3.26.78a1.07 1.07 0 0 1-.93-.78z"/>',
    };
    return paths[key]||"";
  }
  function buildFooter(){
    var slot=el("footer"); if(!slot) return;
    var soc=S.business.social||{};
    var socHtml=Object.keys(soc).filter(function(k){return soc[k];}).map(function(k){
      return '<a href="'+esc(soc[k])+'" target="_blank" rel="noopener" aria-label="'+k+'"><svg viewBox="0 0 24 24">'+socialIcon(k)+'</svg></a>';
    }).join("");
    var hoursHtml=(S.hours||[]).map(function(h){
      return '<li><span>'+esc(h.day.slice(0,3))+'</span><span>'+esc(h.open)+'</span></li>';
    }).join("");
    slot.outerHTML =
    '<footer class="site-footer"><div class="wrap">'+
      '<div class="footer-grid">'+
        '<div class="footer-col footer-brand">'+
          '<div class="footer-brand__name">'+esc(B.name)+'</div>'+
          '<p>'+esc(B.intro||B.tagline||"")+'</p>'+
          '<div class="socials">'+socHtml+'</div>'+
        '</div>'+
        '<div class="footer-col"><h5>Explore</h5>'+
          '<a href="index.html">Home</a><a href="services.html">Services</a>'+
          '<a href="gallery.html">Gallery</a><a href="team.html">Team</a>'+
          '<a href="contact.html">Contact</a>'+
        '</div>'+
        '<div class="footer-col"><h5>Visit</h5>'+
          '<a href="https://maps.google.com/?q='+encodeURIComponent(B.address||"")+'" target="_blank" rel="noopener">'+esc(B.address)+'</a>'+
          '<a href="tel:'+esc(B.phoneTel)+'">'+esc(B.phone)+'</a>'+
          '<a href="mailto:'+esc(B.email)+'">'+esc(B.email)+'</a>'+
        '</div>'+
        '<div class="footer-col"><h5>Hours</h5><ul class="footer-hours" style="list-style:none">'+hoursHtml+'</ul></div>'+
      '</div>'+
      '<div class="footer-bottom">'+
        '<span>© '+new Date().getFullYear()+' '+esc(B.name)+'. All rights reserved.</span>'+
        '<span>Designed with care · <a href="index.html">'+esc(B.name)+'</a></span>'+
      '</div>'+
    '</div></footer>';
  }

  /* =========================================================================
     RENDER PARTIAL BLOCKS (used across pages)
     ====================================================================== */
  function bookServiceHref(name){ return "contact.html?service="+encodeURIComponent(name); }
  function bookMasterHref(name){ return "contact.html?master="+encodeURIComponent(name); }

  function serviceCardsFlat(limit){
    var flat=[];
    (S.services||[]).forEach(function(g){ g.items.forEach(function(it){ flat.push(it); }); });
    if(limit) flat=flat.slice(0,limit);
    return flat.map(function(it){
      return '<article class="scard reveal">'+
        '<div class="scard__top"><span class="scard__name">'+esc(it.name)+'</span>'+
          '<span class="scard__price">'+esc(it.price)+'</span></div>'+
        (it.duration?'<div class="scard__meta">'+esc(it.duration)+'</div>':'')+
        '<p class="scard__desc">'+esc(it.desc||"")+'</p>'+
        '<a class="btn btn--ghost btn--sm scard__book" href="'+bookServiceHref(it.name)+'">Book this service</a>'+
      '</article>';
    }).join("");
  }
  function reviewCards(){
    return (S.reviews||[]).map(function(rv){
      return '<article class="rcard reveal">'+
        '<div class="rcard__stars">'+stars(rv.stars||5)+'</div>'+
        '<p class="rcard__text">“'+esc(rv.text)+'”</p>'+
        '<div class="rcard__foot"><span class="rcard__author">'+esc(rv.author)+'</span>'+
          '<span>'+esc(rv.source||"")+'</span></div>'+
      '</article>';
    }).join("");
  }
  function mapEmbed(){
    var q=encodeURIComponent(B.address||(B.lat+","+B.lng));
    return '<iframe class="map-embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" '+
      'src="https://www.google.com/maps?q='+q+'&z=15&output=embed"></iframe>';
  }
  function hoursList(){
    return '<ul class="hours-list">'+(S.hours||[]).map(function(h){
      var today=h.day===todayName?' class="today"':'';
      return '<li'+today+'><span class="day">'+esc(h.day)+'</span><span>'+esc(h.open)+'</span></li>';
    }).join("")+'</ul>';
  }

  /* =========================================================================
     PAGE RENDERERS
     ====================================================================== */
  function renderHome(){
    // hero
    var h=S.hero||{};
    if(el("hero")){
      el("hero").innerHTML =
        '<img class="hero__bg" src="'+esc(h.image)+'" alt="" />'+
        '<div class="wrap"><div class="hero__inner reveal in">'+
          '<span class="eyebrow">'+esc(h.eyebrow||B.type)+'</span>'+
          '<h1>'+esc(h.headline||B.tagline)+'</h1>'+
          '<p>'+esc(h.sub||B.intro)+'</p>'+
          '<div class="hero__cta">'+
            '<a class="btn btn--primary btn--lg" href="'+bookHref()+'"'+(B.bookingLink?' target="_blank" rel="noopener"':"")+'>Book Now</a>'+
            '<a class="btn btn--light btn--lg" href="tel:'+esc(B.phoneTel)+'">Call '+esc(B.phone)+'</a>'+
          '</div>'+
          '<div class="hero__rating"><span class="hero__stars">'+stars(Math.round(B.rating||5))+'</span>'+
            '<span>'+esc(B.rating)+' · '+esc(B.reviewCount)+' reviews · '+esc(B.address.split(",")[1]||"")+'</span></div>'+
        '</div></div>';
    }
    // highlights
    if(el("highlights")){
      el("highlights").innerHTML='<div class="wrap"><div class="highlights__grid">'+
        (S.highlights||[]).map(function(x){
          return '<div class="hl"><div class="hl__big">'+esc(x.big)+'</div><div class="hl__small">'+esc(x.small)+'</div></div>';
        }).join("")+'</div></div>';
    }
    // services preview
    if(el("homeServices")) el("homeServices").innerHTML=serviceCardsFlat(6);
    // gallery preview
    if(el("homeGallery")){
      el("homeGallery").innerHTML=(S.gallery||[]).slice(0,6).map(function(g,i){
        return galleryItem(g,i);
      }).join("");
    }
    // about
    if(el("homeAbout")){
      var a=S.about||{};
      el("homeAbout").innerHTML=
        '<div class="split__media reveal"><img src="'+esc(a.image||(S.gallery&&S.gallery[2]&&S.gallery[2].src)||"img/about.jpg")+'" alt="'+esc(B.name)+'"></div>'+
        '<div class="split__body reveal"><span class="eyebrow">About us</span>'+
          '<h2>'+esc(a.heading||"")+'</h2>'+
          (a.body||[]).map(function(p){return '<p>'+esc(p)+'</p>';}).join("")+
          '<p style="margin-top:24px"><a class="btn btn--ghost" href="team.html">Meet the team</a></p>'+
        '</div>';
    }
    // reviews
    if(el("homeReviews")) el("homeReviews").innerHTML=reviewCards();
    // contact info on home
    if(el("homeMap")) el("homeMap").innerHTML='<div class="map-wrap">'+mapEmbed()+'</div>';
    if(el("homeInfo")){
      el("homeInfo").innerHTML=
        '<div class="info-block"><h4>Address</h4><p><a href="https://maps.google.com/?q='+encodeURIComponent(B.address)+'" target="_blank" rel="noopener">'+esc(B.address)+'</a></p></div>'+
        '<div class="info-block"><h4>Phone</h4><p><a href="tel:'+esc(B.phoneTel)+'">'+esc(B.phone)+'</a></p></div>'+
        '<div class="info-block"><h4>Hours</h4>'+hoursList()+'</div>';
    }
  }

  function renderServices(){
    if(!el("svcGroups")) return;
    el("svcGroups").innerHTML=(S.services||[]).map(function(g){
      return '<div class="svc-group reveal"><div class="svc-group__head"><h3>'+esc(g.category)+'</h3></div>'+
        '<div class="svc-list">'+g.items.map(function(it){
          return '<div class="svc-row"><div class="svc-row__l">'+
            '<div class="svc-row__name">'+esc(it.name)+'</div>'+
            (it.desc?'<div class="svc-row__desc">'+esc(it.desc)+'</div>':'')+
            (it.duration?'<div class="svc-row__meta">'+esc(it.duration)+'</div>':'')+
          '</div><div class="svc-row__r"><div class="svc-row__price">'+esc(it.price)+'</div>'+
            '<a class="btn btn--primary btn--sm svc-row__book" href="'+bookServiceHref(it.name)+'">Book this service</a>'+
          '</div></div>';
        }).join("")+'</div></div>';
    }).join("");
  }

  function galleryItem(g,i){
    return '<figure class="gphoto" data-idx="'+i+'"><img loading="lazy" src="'+esc(g.src)+'" alt="'+esc(g.caption||"")+'">'+
      (g.caption?'<figcaption class="gphoto__cap">'+esc(g.caption)+'</figcaption>':'')+'</figure>';
  }
  function renderGallery(){
    if(!el("galleryGrid")) return;
    el("galleryGrid").innerHTML=(S.gallery||[]).map(galleryItem).join("");
  }

  function renderTeam(){
    if(!el("teamGrid")) return;
    var team=S.team||[];
    if(!team.length){ el("teamGrid").outerHTML='<div class="team-empty">Your team will appear here — add stylists in data.js.</div>'; return; }
    el("teamGrid").innerHTML=team.map(function(m){
      return '<article class="tcard reveal"><div class="tcard__photo"><img loading="lazy" src="'+esc(m.photo)+'" alt="'+esc(m.name)+'"></div>'+
        '<div class="tcard__name">'+esc(m.name)+'</div>'+
        '<div class="tcard__role">'+esc(m.role)+'</div>'+
        '<p class="tcard__bio">'+esc(m.bio||"")+'</p>'+
        '<a class="btn btn--primary btn--sm tcard__book" href="'+bookMasterHref(m.name)+'">Book with '+esc(m.name.split(" ")[0])+'</a></article>';
    }).join("");
  }

  function renderContact(){
    var c=S.contact||{};
    if(el("contactHead")){
      el("contactHead").innerHTML='<span class="eyebrow">Get in touch</span><h1>'+esc(c.heading||"Book your appointment")+'</h1><p>'+esc(c.sub||"")+'</p>';
    }
    if(el("contactInfo")){
      el("contactInfo").innerHTML=
        '<div class="info-block"><h4>Address</h4><p><a href="https://maps.google.com/?q='+encodeURIComponent(B.address)+'" target="_blank" rel="noopener">'+esc(B.address)+'</a></p></div>'+
        '<div class="info-block"><h4>Phone</h4><p><a href="tel:'+esc(B.phoneTel)+'">'+esc(B.phone)+'</a></p></div>'+
        '<div class="info-block"><h4>Email</h4><p><a href="mailto:'+esc(B.email)+'">'+esc(B.email)+'</a></p></div>'+
        '<div class="info-block"><h4>Hours</h4>'+hoursList()+'</div>'+
        '<div class="map-wrap" style="margin-top:18px">'+mapEmbed()+'</div>';
    }
    // --- SERVICE dropdown (grouped) ---
    var sel=el("svcSelect");
    if(sel){
      var opts='<option value="">Select a service…</option>';
      (S.services||[]).forEach(function(g){
        opts+='<optgroup label="'+esc(g.category)+'">';
        g.items.forEach(function(it){ opts+='<option>'+esc(it.name)+'</option>'; });
        opts+='</optgroup>';
      });
      sel.innerHTML=opts;
    }

    // --- STYLIST dropdown (from team[]) ---
    var msel=el("masterSelect");
    if(msel){
      var mo='<option value="">Any available barber</option>';
      (S.team||[]).forEach(function(m){ mo+='<option>'+esc(m.name)+'</option>'; });
      msel.innerHTML=mo;
    }

    // --- DATE dropdown (auto-generated, skips closed days) ---
    var dsel=el("dateSelect");
    if(dsel){
      var closed={};
      (S.hours||[]).forEach(function(h){ if(/closed/i.test(h.open)) closed[h.day]=true; });
      var days=(S.booking&&S.booking.daysAhead)||21;
      var dopts='<option value="">Select a date…</option>';
      var now=new Date();
      for(var i=0;i<days;i++){
        var d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i);
        if(closed[DAYS[d.getDay()]]) continue;
        var label=d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});
        if(i===0) label+=" (today)"; else if(i===1) label+=" (tomorrow)";
        dopts+='<option value="'+label+'" data-offset="'+i+'">'+label+'</option>';
      }
      dsel.innerHTML=dopts;
    }

    // --- TIME dropdown (from data.booking.times) ---
    // When "today" is selected, only show slots still in the future, based on
    // the VISITOR'S own local clock (new Date() = their device timezone) plus a
    // configurable lead time (booking.minLeadMinutes).
    var tsel=el("timeSelect");
    if(tsel){
      var allTimes=((S.booking&&S.booking.times)||[]);
      var lead=(S.booking&&S.booking.minLeadMinutes!=null)?S.booking.minLeadMinutes:60;
      var fillTimes=function(isToday){
        var avail=allTimes;
        if(isToday){
          var now=new Date();
          var cutoff=now.getHours()*60+now.getMinutes()+lead;
          avail=allTimes.filter(function(tm){ var mm=timeToMinutes(tm); return mm!=null && mm>=cutoff; });
        }
        if(!avail.length){
          tsel.innerHTML='<option value="">No times left today — pick another date</option>';
        } else {
          tsel.innerHTML='<option value="">Select a time…</option>'+avail.map(function(tm){ return '<option>'+esc(tm)+'</option>'; }).join("");
        }
      };
      fillTimes(false); // no date chosen yet -> show all
      if(dsel){
        dsel.addEventListener("change",function(){
          var opt=dsel.options[dsel.selectedIndex];
          fillTimes(opt && opt.getAttribute("data-offset")==="0");
        });
      }
    }

    // --- PREFILL from URL (?service=... / ?master=...) ---
    var qs=new URLSearchParams(location.search);
    var preSvc=qs.get("service"), preMaster=qs.get("master");
    var note=el("prefillNote");
    if(preSvc && sel){ sel.value=preSvc; }
    if(preMaster && msel){ msel.value=preMaster; }
    if((preSvc||preMaster) && note){
      var msg="You're booking";
      if(preSvc)    msg+=' <strong>'+esc(preSvc)+'</strong>';
      if(preMaster) msg+=(preSvc?' with ':' with ')+'<strong>'+esc(preMaster)+'</strong>';
      msg+=". Just add your details below.";
      note.innerHTML=msg; note.style.display="block";
      // bring the form into view on deep-links
      setTimeout(function(){ var f=el("bookForm"); if(f) f.scrollIntoView({behavior:"smooth",block:"center"}); },150);
    }

    wireForm();
  }

  /* ---- CONTACT / BOOKING FORM (mailto fallback OR Formspree) ---- */
  function wireForm(){
    var form=el("bookForm"); if(!form) return;
    form.addEventListener("submit",function(e){
      e.preventDefault();
      var data={
        name:form.name.value.trim(),
        phone:form.phone.value.trim(),
        email:form.email.value.trim(),
        service:form.service.value,
        stylist:form.master.value||"Any available",
        date:form.date.value,
        time:form.time.value,
        message:form.message.value.trim(),
      };
      if(!data.name||!data.phone){ return; }
      var endpoint=B.formEndpoint;
      if(endpoint){
        var btn=form.querySelector("[type=submit]");
        btn.disabled=true; btn.textContent="Sending…";
        fetch(endpoint,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},
          body:JSON.stringify(data)})
        .then(function(r){ if(r.ok) showSuccess(form); else throw new Error("bad"); })
        .catch(function(){ btn.disabled=false; btn.textContent="Request appointment"; mailtoFallback(data); });
      } else {
        mailtoFallback(data);
        showSuccess(form);
      }
    });
  }
  function mailtoFallback(d){
    var subject="Appointment request — "+(d.name||"");
    var body=
      "Name: "+d.name+"\nPhone: "+d.phone+"\nEmail: "+d.email+
      "\nService: "+d.service+"\nStylist: "+d.stylist+
      "\nDate: "+d.date+"\nTime: "+d.time+"\n\n"+d.message;
    window.location.href="mailto:"+B.email+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
  }
  function showSuccess(form){
    var box=el("formSuccess"); if(!box) return;
    form.style.display="none"; box.classList.add("show");
  }

  /* =========================================================================
     LIGHTBOX (gallery)
     ====================================================================== */
  function wireLightbox(){
    var photos=[].slice.call(document.querySelectorAll(".gphoto"));
    if(!photos.length) return;
    var lb=el("lightbox"); if(!lb) return;
    var imgEl=lb.querySelector("img");
    var srcs=(S.gallery||[]).map(function(g){return g.src;});
    var cur=0;
    function open(i){ cur=i; imgEl.src=srcs[i]; lb.classList.add("open"); }
    function show(i){ cur=(i+srcs.length)%srcs.length; imgEl.src=srcs[cur]; }
    photos.forEach(function(p){ p.addEventListener("click",function(){ open(+p.dataset.idx); }); });
    lb.querySelector(".lightbox__close").addEventListener("click",function(){ lb.classList.remove("open"); });
    lb.querySelector(".prev").addEventListener("click",function(e){ e.stopPropagation(); show(cur-1); });
    lb.querySelector(".next").addEventListener("click",function(e){ e.stopPropagation(); show(cur+1); });
    lb.addEventListener("click",function(e){ if(e.target===lb) lb.classList.remove("open"); });
    document.addEventListener("keydown",function(e){
      if(!lb.classList.contains("open")) return;
      if(e.key==="Escape") lb.classList.remove("open");
      if(e.key==="ArrowLeft") show(cur-1);
      if(e.key==="ArrowRight") show(cur+1);
    });
  }

  /* =========================================================================
     SCROLL REVEAL
     ====================================================================== */
  function wireReveal(){
    var els=document.querySelectorAll(".reveal:not(.in)");
    if(!("IntersectionObserver" in window)){ els.forEach(function(e){e.classList.add("in");}); return; }
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    },{threshold:.12,rootMargin:"0px 0px -40px 0px"});
    els.forEach(function(e){ io.observe(e); });
  }

  /* =========================================================================
     BOOT
     ====================================================================== */
  document.title = (page==="home")
    ? B.name+" — "+B.type+" in "+(B.address?B.address.split(",")[1]||"":"")
    : document.title;

  buildHeader();
  buildFooter();
  if(page==="home")     renderHome();
  if(page==="services") renderServices();
  if(page==="gallery")  renderGallery();
  if(page==="team")     renderTeam();
  if(page==="contact")  renderContact();
  wireLightbox();
  wireReveal();
})();
