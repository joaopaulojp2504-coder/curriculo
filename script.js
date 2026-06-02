/* =============================================================
   João Paulo Drago · CV - renderização e interações
   - Monta o currículo a partir de window.CV_DATA (data.js)
   - Troca de idioma EN/PT (memória via localStorage)
   - Ano dinâmico, botão compartilhar, impressão/PDF
   Textos são inseridos com textContent (seguro). Seção sem itens
   não é renderizada.
   ============================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'drago-cv-lang';
  var currentLang = 'en';
  var D = window.CV_DATA;

  /* ---------- helpers ---------- */
  function pick(v, lang) {
    if (v && typeof v === 'object' && ('en' in v || 'pt' in v)) {
      return v[lang] != null ? v[lang] : (v.en != null ? v.en : v.pt);
    }
    return v != null ? v : '';
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null && text !== '') { n.textContent = text; }
    return n;
  }
  function icon(name) {
    var s = '<svg class="icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="16" height="16">';
    var P = {
      location: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/>',
      whatsapp: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
      email: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="22,6 12,13 2,6"/>',
      linkedin: '<path fill="currentColor" d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>',
      behance: '<path fill="currentColor" d="M8.2 7.6c.7 0 1.3.06 1.86.18.55.12 1.02.32 1.4.6.4.26.7.63.9 1.1.2.46.3 1.03.3 1.7 0 .73-.16 1.34-.5 1.82-.32.48-.82.88-1.48 1.18.9.26 1.57.71 2.01 1.36.44.64.66 1.42.66 2.33 0 .73-.14 1.36-.42 1.9-.28.53-.67.97-1.15 1.3-.49.34-1.04.59-1.67.74-.62.16-1.26.24-1.92.24H1V7.6h7.2zM7.77 12.3c.56 0 1.02-.13 1.38-.4.36-.27.54-.7.54-1.3 0-.34-.06-.62-.18-.83a1.3 1.3 0 0 0-.49-.5 2.05 2.05 0 0 0-.71-.25 4.7 4.7 0 0 0-.85-.07H4.3v3.34h3.47zm.2 4.95c.31 0 .61-.03.89-.09.28-.06.53-.17.74-.32.21-.15.38-.36.5-.62.13-.27.19-.6.19-1 0-.78-.22-1.34-.66-1.67-.44-.34-1.02-.5-1.74-.5H4.3v4.2h3.67zM15.64 17.1c.38.37.93.56 1.65.56.52 0 .96-.13 1.34-.39.37-.26.6-.53.69-.82h2.46c-.39 1.22-.99 2.09-1.81 2.62-.81.53-1.79.79-2.94.79-.8 0-1.52-.13-2.16-.38a4.5 4.5 0 0 1-1.63-1.09 4.86 4.86 0 0 1-1.03-1.7 6.34 6.34 0 0 1-.36-2.18c0-.78.12-1.5.37-2.16a5.02 5.02 0 0 1 2.7-2.84 5.2 5.2 0 0 1 2.1-.41c.85 0 1.6.16 2.24.49.64.33 1.17.77 1.58 1.33.41.55.71 1.19.89 1.91.18.72.24 1.47.18 2.26h-7.11c0 .81.2 1.41.58 1.78zM18.5 12.16c-.3-.33-.79-.51-1.42-.51-.41 0-.76.07-1.03.21-.27.14-.49.31-.65.52-.16.2-.27.42-.34.65-.06.23-.1.43-.11.61h4.4c-.07-.69-.3-1.16-.85-1.49zM15 8.1h5.48v1.34H15V8.1z"/>',
      instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/>',
      link: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10 13a5 5 0 0 0 7.07 0l3-3A5 5 0 0 0 13 3l-1.5 1.5M14 11a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21l1.5-1.5"/>'
    };
    return s + (P[name] || P.link) + '</svg>';
  }
  function withIcon(node, name) {
    node.insertAdjacentHTML('afterbegin', icon(name));
    return node;
  }
  function block(idBase, titleText) {
    var sec = el('section', 'block');
    sec.setAttribute('aria-labelledby', idBase + '-title');
    var h2 = el('h2', 'block__title', titleText);
    h2.id = idBase + '-title';
    sec.appendChild(h2);
    return sec;
  }
  function initials(name) {
    var parts = String(name || '').trim().split(/\s+/);
    var a = parts[0] ? parts[0].charAt(0) : '';
    var b = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
    return (a + b).toUpperCase();
  }

  /* ---------- render: header ---------- */
  function renderHeader(lang) {
    var host = document.getElementById('cv-header');
    host.textContent = '';
    var h1 = el('h1', 'header__name', D.header.name);
    if (D.header.nickname) {
      var nk = el('span', 'header__nickname', '"' + D.header.nickname + '"');
      h1.appendChild(document.createTextNode(' '));
      h1.appendChild(nk);
    }
    host.appendChild(h1);
    host.appendChild(el('p', 'header__headline', pick(D.header.headline, lang)));
    var loc = el('p', 'header__location');
    withIcon(loc, 'location');
    loc.appendChild(el('span', null, pick(D.header.location, lang)));
    host.appendChild(loc);
  }

  /* ---------- render: sidebar ---------- */
  function renderSidebar(lang) {
    var host = document.getElementById('cv-sidebar');
    host.textContent = '';

    // foto / iniciais
    var prof = el('div', 'profile');
    prof.appendChild(el('span', 'profile__initials', initials(D.header.name)));
    var img = document.createElement('img');
    img.className = 'profile__photo';
    img.src = 'assets/profile.jpg';
    img.alt = 'Photo of ' + D.header.name;
    img.width = 120; img.height = 120;
    img.setAttribute('loading', 'eager');
    img.onerror = function () { this.remove(); };
    prof.appendChild(img);
    host.appendChild(prof);

    // contato
    if (D.contact && D.contact.items && D.contact.items.length) {
      var c = block('contact', pick(D.contact.title, lang));
      var ul = el('ul', 'contact-list');
      D.contact.items.forEach(function (it) {
        var li = document.createElement('li');
        var a = el('a', 'contact-link');
        a.href = it.href || '#';
        if (/^https?:/i.test(a.href)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        a.setAttribute('aria-label', it.label || it.type);
        withIcon(a, it.type);
        a.appendChild(el('span', null, it.label));
        li.appendChild(a);
        ul.appendChild(li);
      });
      c.appendChild(ul);
      host.appendChild(c);
    }

    // idiomas
    if (D.languages && D.languages.items && D.languages.items.length) {
      var lsec = block('languages', pick(D.languages.title, lang));
      var dl = el('dl', 'skills');
      D.languages.items.forEach(function (it) {
        dl.appendChild(el('dt', null, pick(it.name, lang)));
        dl.appendChild(el('dd', null, pick(it.level, lang)));
      });
      lsec.appendChild(dl);
      host.appendChild(lsec);
    }

    // habilidades
    if (D.skills && D.skills.items && D.skills.items.length) {
      var ssec = block('skills', pick(D.skills.title, lang));
      var dls = el('dl', 'skills');
      D.skills.items.forEach(function (it) {
        dls.appendChild(el('dt', null, pick(it.label, lang)));
        dls.appendChild(el('dd', null, pick(it.value, lang)));
      });
      ssec.appendChild(dls);
      host.appendChild(ssec);
    }

    // formação
    if (D.education && D.education.items && D.education.items.length) {
      var esec = block('education', pick(D.education.title, lang));
      var eul = el('ul', 'plain-list');
      D.education.items.forEach(function (it) {
        var li = document.createElement('li');
        li.appendChild(el('strong', null, pick(it.title, lang)));
        if (it.meta) { li.appendChild(el('span', 'muted', pick(it.meta, lang))); }
        eul.appendChild(li);
      });
      esec.appendChild(eul);
      host.appendChild(esec);
    }
  }

  /* ---------- render: main ---------- */
  function renderMain(lang) {
    var host = document.getElementById('cv-main');
    host.textContent = '';

    // resumo + pills
    if (D.summary && (pick(D.summary.text, lang) || (D.summary.highlights || []).length)) {
      var tag = el('section', 'tagline');
      tag.setAttribute('aria-label', 'Professional summary');
      if (pick(D.summary.text, lang)) { tag.appendChild(el('p', null, pick(D.summary.text, lang))); }
      var hi = (D.summary.highlights || []);
      if (hi.length) {
        var hp = el('p', 'tagline__highlights');
        hi.forEach(function (h, i) {
          if (i > 0) { hp.appendChild(el('span', 'tagline__sep', '·')); }
          hp.appendChild(el('span', null, pick(h, lang)));
        });
        tag.appendChild(hp);
      }
      host.appendChild(tag);
    }

    // experiência
    if (D.experience && D.experience.items && D.experience.items.length) {
      var exp = el('section', 'experience');
      exp.setAttribute('aria-labelledby', 'experience-title');
      var et = el('h2', 'section-title', pick(D.experience.title, lang));
      et.id = 'experience-title';
      exp.appendChild(et);
      D.experience.items.forEach(function (job) {
        var art = el('article', 'job');
        var hd = el('header', 'job__header');
        hd.appendChild(el('h3', 'job__title', pick(job.title, lang)));
        if (job.meta) { hd.appendChild(el('p', 'job__meta', pick(job.meta, lang))); }
        art.appendChild(hd);
        if (job.bullets && job.bullets.length) {
          var bl = el('ul', 'job__bullets');
          job.bullets.forEach(function (b) { bl.appendChild(el('li', null, pick(b, lang))); });
          art.appendChild(bl);
        }
        if (job.stack) {
          var sp = el('p', 'job__stack');
          sp.appendChild(el('span', 'job__stack-label', 'Stack:'));
          sp.appendChild(document.createTextNode(' ' + job.stack));
          art.appendChild(sp);
        }
        exp.appendChild(art);
      });
      host.appendChild(exp);
    }

    // projetos
    if (D.projects && D.projects.items && D.projects.items.length) {
      var pj = el('section', 'projects');
      pj.setAttribute('aria-labelledby', 'projects-title');
      var pt = el('h2', 'section-title', pick(D.projects.title, lang));
      pt.id = 'projects-title';
      pj.appendChild(pt);
      D.projects.items.forEach(function (p) {
        var art = el('article', 'project');
        var h3 = el('h3', 'project__title');
        if (p.url) {
          h3.appendChild(document.createTextNode((p.name || '') + ' · '));
          var a = el('a', null, p.url.replace(/^https?:\/\//, ''));
          a.href = p.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
          a.setAttribute('aria-label', p.url.replace(/^https?:\/\//, '') + ' (opens in a new tab)');
          h3.appendChild(a);
        } else {
          h3.textContent = p.name || '';
        }
        art.appendChild(h3);
        if (p.role) { art.appendChild(el('p', 'project__role', pick(p.role, lang))); }
        if (p.description) { art.appendChild(el('p', null, pick(p.description, lang))); }
        pj.appendChild(art);
      });
      host.appendChild(pj);
    }

    // antes & acadêmico
    if (D.earlier && D.earlier.items && D.earlier.items.length) {
      var er = el('section', 'earlier');
      er.setAttribute('aria-labelledby', 'earlier-title');
      var ert = el('h2', 'section-title', pick(D.earlier.title, lang));
      ert.id = 'earlier-title';
      er.appendChild(ert);
      var eul = el('ul', 'earlier__list');
      D.earlier.items.forEach(function (it) {
        var li = document.createElement('li');
        li.appendChild(el('strong', null, pick(it.title, lang)));
        if (it.meta) {
          li.appendChild(document.createTextNode(' '));
          li.appendChild(el('span', 'muted', pick(it.meta, lang)));
        }
        eul.appendChild(li);
      });
      er.appendChild(eul);
      host.appendChild(er);
    }
  }

  /* ---------- render: footer ---------- */
  function renderFooter(lang) {
    var p = document.getElementById('footer-line');
    if (!p) { return; }
    p.textContent = '';
    var y = el('span', null, String(new Date().getFullYear()));
    p.appendChild(document.createTextNode('© '));
    p.appendChild(y);
    var note = D.footer && D.footer.note ? pick(D.footer.note, lang) : '';
    p.appendChild(document.createTextNode(' ' + D.header.name + ' · Vitória, ES · ' + note));
  }

  /* ---------- aplica idioma ---------- */
  function applyLang(lang) {
    if (lang !== 'pt') { lang = 'en'; }
    currentLang = lang;
    document.documentElement.lang = (lang === 'pt') ? 'pt-BR' : 'en';

    if (D.meta && D.meta.title) { document.title = pick(D.meta.title, lang); }
    var md = document.getElementById('meta-description');
    if (md && D.meta && D.meta.description) { md.setAttribute('content', pick(D.meta.description, lang)); }

    renderHeader(lang);
    renderSidebar(lang);
    renderMain(lang);
    renderFooter(lang);

    // textos estáticos da interface (skip-link, botões PDF/compartilhar)
    var sNodes = document.querySelectorAll('[data-en]');
    for (var s = 0; s < sNodes.length; s++) {
      var sv = sNodes[s].getAttribute('data-' + lang);
      if (sv !== null) { sNodes[s].textContent = sv; }
    }
    var lbl = document.querySelectorAll('[data-en-label]');
    for (var l = 0; l < lbl.length; l++) {
      lbl[l].setAttribute('aria-label', lbl[l].getAttribute('data-' + lang + '-label'));
    }

    var btns = document.querySelectorAll('.lang-btn');
    for (var k = 0; k < btns.length; k++) {
      var active = btns[k].getAttribute('data-lang') === lang;
      btns[k].classList.toggle('is-active', active);
      btns[k].setAttribute('aria-pressed', active ? 'true' : 'false');
    }
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function initialLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved === 'pt' || saved === 'en') { return saved; }
    var nav = (navigator.language || 'en').toLowerCase();
    return nav.indexOf('pt') === 0 ? 'pt' : 'en';
  }

  /* ---------- mensagens do botão compartilhar ---------- */
  var SHARE = {
    en: { share: 'CV of João Paulo Drago', copied: 'Link copied!', manual: 'Copy the link from the address bar' },
    pt: { share: 'Currículo de João Paulo Drago', copied: 'Link copiado!', manual: 'Copie o link na barra de endereços' }
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (!D) {
      var m = document.getElementById('cv-main');
      if (m) { m.textContent = 'Erro: data.js não carregou.'; }
      return;
    }

    var langButtons = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < langButtons.length; i++) {
      langButtons[i].addEventListener('click', function () { applyLang(this.getAttribute('data-lang')); });
    }
    applyLang(initialLang());

    var btn = document.querySelector('.action-share');
    var feedback = document.getElementById('share-feedback');
    if (btn && feedback) {
      var timer;
      var announce = function (msg) {
        feedback.textContent = msg;
        feedback.classList.add('is-visible');
        clearTimeout(timer);
        timer = setTimeout(function () { feedback.classList.remove('is-visible'); }, 3000);
      };
      btn.addEventListener('click', function () {
        var url = window.location.href;
        var s = SHARE[currentLang];
        if (navigator.share) { navigator.share({ title: document.title, text: s.share, url: url }).catch(function () {}); return; }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () { announce(s.copied); }, function () { announce(s.manual); });
          return;
        }
        announce(s.manual);
      });
    }
  });
})();
