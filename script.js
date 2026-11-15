// Configuração mais simples para site estático: enviar direto para o Gmail via FormSubmit.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/navbee12@gmail.com";
if(!FORM_ENDPOINT)console.warn("[NAVBEE] FORM_ENDPOINT não configurado: o formulário de contato ainda não envia leads.");
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

function renderPeakChart(targetId = "peak-chart") {
  const target = document.getElementById(targetId);
  if (!target) return;

  const steps = [
    { label: "Diagnóstico", tone: "#FFD21A" },
    { label: "Estratégia", tone: "#f5d75c" },
    { label: "Execução", tone: "#e3d9a5" }
  ];

  target.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;height:100%;align-items:center;">
      ${steps.map(step => `
        <div style="display:flex;align-items:center;justify-content:center;text-align:center;border:1px solid rgba(255,255,255,0.14);background:rgba(255,255,255,0.02);border-radius:14px;padding:18px 12px;height:120px;color:#f5f5f5;font-weight:600;letter-spacing:0.03em;box-shadow:inset 0 0 0 1px rgba(255,210,26,0.06);">
          <span style="display:block;color:${step.tone};font-size:0.82rem;text-transform:uppercase;letter-spacing:0.08em;">${step.label}</span>
        </div>
      `).join("")}
    </div>
  `;
}

renderPeakChart();
const yearTarget = $("#y");
if (yearTarget) yearTarget.textContent = new Date().getFullYear();

// Menu
const mb=$("#mb"),nl=$("#nl");
if (mb && nl) {
  mb.onclick=()=>{const o=nl.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
  $$(".nl a").forEach(a=>a.addEventListener("click",()=>{nl.classList.remove("open");mb.setAttribute("aria-expanded",false)}));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nl.classList.contains("open")){nl.classList.remove("open");mb.setAttribute("aria-expanded",false);mb.focus()}});
}

// Reveal + nav indicator
if ("IntersectionObserver" in window) {
  const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.15});
  $$(".rv").forEach(el=>io.observe(el));

  const so=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)$$(".nl a:not(.btn)").forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+x.target.id))}),{rootMargin:"-40% 0px -55% 0px"});
  $$("main section[id]").forEach(s=>so.observe(s));
} else {
  $$(".rv").forEach(el=>el.classList.add("in"));
}

// Processo
const P=["Entendimento do negócio e identificação das necessidades.","Definição das prioridades e planejamento da solução.","Execução das ações e desenvolvimento do projeto.","Acompanhamento, análise e identificação de novas oportunidades."];
const tabs=$$('[role=tab]'),pn=$("#pn");
if (tabs.length && pn) {
  function sel(i){tabs.forEach((t,j)=>{t.setAttribute("aria-selected",i===j);t.tabIndex=i===j?0:-1});pn.textContent=P[i];pn.setAttribute("aria-labelledby","t"+i);tabs[i].focus()}
  tabs.forEach((t,i)=>{t.onclick=()=>sel(i);t.onkeydown=e=>{if(e.key==="ArrowRight")sel((i+1)%4);if(e.key==="ArrowLeft")sel((i+3)%4)}});
  pn.textContent=P[0];
}

// Serviço pré-selecionado
$$("[data-s]").forEach(a=>a.addEventListener("click",()=>{const selectEl=$("#sv"); if (selectEl) selectEl.value=a.dataset.s}));

// Formulário
const f=$("#f");
if (f) {
  const st=$("#st"),sb=$("#sb"),t0=Date.now(),fail=m=>{if (st) {st.className="bad";st.textContent=m;}};
  function chk(el){let m="";const ck=el.type==="checkbox",v=ck?(el.checked?"1":""):el.value.trim();
  if(el.required&&!v)m=ck?"É necessário concordar para enviar.":"Campo obrigatório.";
  else if(el.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))m="Informe um e-mail válido.";
  else if(el.type==="url"&&v&&!/^https?:\/\/[^\s.]+\.[^\s]+$/.test(v))m="Use um endereço completo (https://...).";
  else if(el.name==="msg"&&v.length<20)m="Descreva com ao menos 20 caracteres.";
  el.setAttribute("aria-invalid",!!m);const label=el.closest("label"); if (label) { const err = label.querySelector(".err"); if (err) err.textContent = m; }
  return !m}

  const fields=[...f.querySelectorAll("input:not(.hp),select,textarea")];
  fields.forEach(el=>el.addEventListener(el.type==="checkbox"?"change":"blur",()=>chk(el)));

  f.addEventListener("submit",async e=>{e.preventDefault();if (st) st.className="";
  const ok=fields.map(chk).every(Boolean);if(!ok){const invalid = fields.find(x=>x.getAttribute("aria-invalid")==="true"); if (invalid) invalid.focus(); return}
  if(f.website_hp.value)return; // spam bot (honeypot)
  if(Date.now()-t0<3000){fail("Aguarde alguns segundos antes de enviar novamente.");return}
  if(!FORM_ENDPOINT){fail("O envio não está disponível no momento. Tente novamente mais tarde.");return}
  if(!navigator.onLine){fail("Sem conexão com a internet. Verifique sua rede e tente novamente.");return}
  if (sb) {sb.disabled=true;sb.textContent="Enviando…";}

  const ac=new AbortController(),to=setTimeout(()=>ac.abort(),15000);
  const data=Object.fromEntries(fields.map(x=>[x.name,x.type==="checkbox"?x.checked:x.value.trim()]));
  data.website_hp=f.website_hp.value;
  data._subject="Nova solicitação de proposta - NAVBEE";
  data._replyto=data.email || "";
  data._captcha="false";

  const mailtoBody = [
    `Nome: ${data.nome || ""}`,
    `Empresa: ${data.empresa || ""}`,
    `E-mail: ${data.email || ""}`,
    `Site: ${data.site || ""}`,
    `Serviço: ${data.servico || ""}`,
    "",
    "Descrição da necessidade:",
    `${data.msg || ""}`,
    "",
    `Consentimento: ${data.consent ? "Sim" : "Não"}`
  ].join("\n");

  try {
    const r=await fetch(FORM_ENDPOINT,{method:"POST",signal:ac.signal,headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(data)});
    if(!r.ok) throw new Error(r.status);
    if (st) {st.className="ok";st.textContent="Mensagem enviada com sucesso. Em breve entraremos em contato por e-mail.";}
    f.reset();
  }
  catch(err){
    const mailto = `mailto:navbee12@gmail.com?subject=${encodeURIComponent("Nova solicitação de proposta - NAVBEE")}&body=${encodeURIComponent(mailtoBody)}`;
    if (st) {st.className="bad";st.textContent="O envio automático falhou. O e-mail foi preparado para envio direto.";}
    window.location.href = mailto;
    setTimeout(()=>{ if (st) { st.className="bad"; st.textContent = err.name === "AbortError" ? "O envio demorou demais. Verifique sua conexão e tente novamente." : "Não foi possível enviar sua mensagem agora. Verifique seu e-mail e tente novamente em alguns instantes."; }}, 500);
  }
  finally{
    clearTimeout(to);
    if (sb){sb.disabled=false;sb.textContent="Enviar solicitação";}
  }
  });
}
