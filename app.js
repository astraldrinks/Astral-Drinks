(() => {
  "use strict";
  const cfg = window.ASTRAL_CONFIG?.links || {};
  const nav = document.getElementById("hotspots");
  const labels = {orcamento:"Orçamento",instagram:"Instagram",whatsapp:"WhatsApp",email:"E-mail",produtos:"Produtos",sobre:"Sobre"};
  let layouts = null;
  const mode = () => {
    const portrait = matchMedia("(orientation: portrait)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    if (portrait && innerWidth < 600) return "mobile";
    if (portrait) return "tablet-vertical";
    if (coarse) return "tablet-horizontal";
    return "desktop";
  };
  function renderHotspots(){
    if(!layouts || !nav) return;
    const layout = layouts[mode()]; if(!layout) return;
    nav.replaceChildren();
    for(const [key,b] of Object.entries(layout.boxes)){
      const href=cfg[key]; if(!href) continue;
      const a=document.createElement("a");
      a.className="hotspot"; a.href=href; a.setAttribute("aria-label",labels[key]||key);
      a.style.left=b[0]+"%";a.style.top=b[1]+"%";a.style.width=b[2]+"%";a.style.height=b[3]+"%";
      if(key!=="email"){a.target="_blank";a.rel="noopener noreferrer";}
      nav.appendChild(a);
    }
  }
  fetch("./hotspots.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error(`hotspots.json ${r.status}`);return r.json();}).then(d=>{layouts=d;renderHotspots();}).catch(e=>console.error("Astral Drinks: hotspots",e));
  addEventListener("resize",renderHotspots,{passive:true}); addEventListener("orientationchange",renderHotspots,{passive:true});

  if("serviceWorker" in navigator){addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(e=>console.error("Service Worker:",e)),{once:true});}
  let installPrompt=null; const btn=document.getElementById("installApp"), modal=document.getElementById("iosInstallModal"), close=document.getElementById("closeIosInstall"), title=document.getElementById("iosInstallTitle"), inst=document.getElementById("installInstructions");
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone=matchMedia("(display-mode: standalone)").matches || navigator.standalone===true;
  const mobileTablet=matchMedia("(pointer: coarse)").matches || matchMedia("(max-width: 1024px)").matches;
  if(mobileTablet && !standalone && btn) btn.hidden=false;
  addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;if(btn)btn.hidden=false;});
  btn?.addEventListener("click",async()=>{
    if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;return;}
    if(title&&inst){
      if(ios){title.textContent="Instalar Astral Drinks no iPhone/iPad";inst.innerHTML='<p>Abra no Safari e siga:</p><ol><li>Toque em <strong>Compartilhar</strong>.</li><li>Toque em <strong>Adicionar à Tela de Início</strong>.</li><li>Ative <strong>Abrir como App da Web</strong>, se aparecer.</li><li>Toque em <strong>Adicionar</strong>.</li></ol>';}
      else{title.textContent="Instalar Astral Drinks";inst.innerHTML='<p>No Chrome ou navegador compatível:</p><ol><li>Abra o menu do navegador.</li><li>Toque em <strong>Instalar aplicativo</strong> ou <strong>Adicionar à tela inicial</strong>.</li><li>Confirme em <strong>Instalar</strong>.</li></ol>';}
    }
    if(modal)modal.hidden=false;
  });
  close?.addEventListener("click",()=>{if(modal)modal.hidden=true;}); modal?.addEventListener("click",e=>{if(e.target===modal)modal.hidden=true;});
  addEventListener("appinstalled",()=>{installPrompt=null;if(btn)btn.hidden=true;});
})();
