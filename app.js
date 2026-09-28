(() => {
  "use strict";
  const config = window.ASTRAL_CONFIG || {};
  const stage = document.getElementById("stage");
  const cover = document.getElementById("cover");
  const nav = document.getElementById("hotspots");
  const labels = {orcamento:"Orçamento",instagram:"Instagram",whatsapp:"WhatsApp",email:"E-mail",produtos:"Produtos",sobre:"Sobre"};
  const hotspots = {"desktop":{"orcamento":[72.4,22.0,21.8,5.7],"instagram":[72.4,29.3,21.8,5.7],"whatsapp":[72.4,36.6,21.8,5.7],"email":[72.4,43.9,21.8,5.7],"produtos":[72.4,51.2,21.8,5.7],"sobre":[72.4,58.5,21.8,5.7]},"tablet-horizontal":{"orcamento":[74.0,23.4,23.2,5.8],"instagram":[74.0,30.4,23.2,5.8],"whatsapp":[74.0,37.4,23.2,5.8],"email":[74.0,44.4,23.2,5.8],"produtos":[74.0,51.4,23.2,5.8],"sobre":[74.0,58.4,23.2,5.8]},"tablet-vertical":{"orcamento":[27.3,60.5,46.5,5.2],"instagram":[27.3,66.6,46.5,5.2],"whatsapp":[27.3,72.7,46.5,5.2],"email":[27.3,78.8,46.5,5.2],"produtos":[27.3,84.9,46.5,5.2],"sobre":[27.3,91.0,46.5,5.2]},"mobile":{"orcamento":[23.0,52.5,54.5,5.0],"instagram":[23.0,59.1,54.5,5.0],"whatsapp":[23.0,65.7,54.5,5.0],"email":[23.0,72.3,54.5,5.0],"produtos":[23.0,78.9,54.5,5.0],"sobre":[23.0,85.5,54.5,5.0]}};
  const names = Object.keys(labels);
  function layout() {
    const width = window.innerWidth;
    if (width <= 600) return "mobile";
    if (width <= 1200) return window.matchMedia("(orientation: portrait)").matches ? "tablet-vertical" : "tablet-horizontal";
    return "desktop";
  }
  function render() {
    const boxes = hotspots[layout()];
    const fragment = document.createDocumentFragment();
    for (const name of names) {
      const url = config[name];
      if (typeof url !== "string" || !/^(https:\/\/|mailto:)/i.test(url)) continue;
      const [x,y,w,h] = boxes[name];
      const a = document.createElement("a");
      a.className = "hotspot";
      a.href = url;
      a.setAttribute("aria-label", labels[name]);
      a.title = labels[name];
      a.style.cssText = `left:${x}%;top:${y}%;width:${w}%;height:${h}%;`;
      if (!url.startsWith("mailto:")) {a.target="_blank";a.rel="noopener noreferrer";}
      fragment.appendChild(a);
    }
    nav.replaceChildren(fragment);
  }
  let queued = false;
  function onResize() {if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;render();});}
  window.addEventListener("resize", onResize, {passive:true});
  window.addEventListener("orientationchange", onResize, {passive:true});
  render();
  // SW kept for feature parity, but not registered automatically: prevents stale offline caches
  // from masking a fresh GitHub Pages deployment. Existing SWs are unregistered on HTTPS.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(reg => { if (reg.scope.startsWith(new URL("./", location.href).href)) reg.unregister(); });
      }).catch(() => {});
    }, {once:true});
  }
})();
