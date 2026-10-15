'use strict';
function portfolioMark(parent,ok,filled=true) {
  const mark=document.createElement('span');
  mark.className='portfolio-mark '+(!filled?'missing':ok?'correct':'incorrect');
  mark.textContent=!filled?'— Bez odpovědi':ok?'✓ Správně':'× Nesprávně';
  parent.append(mark);
}
function preparePortfolio() {
  if(!finished)return;
  const root=$('#portfolio'),scores=TIMSS.score(answers),parts=TIMSS.parts(answers);
  const sum=scores.reduce((a,b)=>a+b,0),percent=(sum/12*100).toLocaleString('cs-CZ',{maximumFractionDigits:1});
  root.innerHTML=`<header class="portfolio-header"><p class="eyebrow">Moje práce do portfolia</p><h1>Matematický test číslo 2</h1>${pupilName?`<p class="portfolio-name">Jméno: <b>${esc(pupilName)}</b></p>`:''}<p><b>${sum} / 12 bodů</b> · <b>${percent} %</b> · Čas řešení ${formatTime(elapsed)} · ${esc(completedDate)}</p></header>`;
  const expected={q1:'A',q4:'D',q5:'C',q7:'D',q9a:'C',q9b:'B',q9c:'C',q10a:'A'};
  const numeric={1:['q2'],5:['q6a','q6b'],11:['q12a','q12b','q12c']};
  for(let i=0;i<TIMSS.ids.length;i++){
    const article=document.createElement('article');article.className='portfolio-task';
    const s=status(i),label=hasAnyAnswer(i)?statusLabel(s):'Bez odpovědi';
    article.innerHTML=`<div class="portfolio-task-head"><h2>Úloha ${i+1}</h2><span class="status ${s}">${label} · ${scores[i]}/1 bod</span></div><div class="portfolio-question">${screens[i]()}</div>`;
    for(const [j,key] of (numeric[i]||[]).entries()){
      const input=article.querySelector(`[data-model="${key}"]`);
      portfolioMark(input.closest('.answer-wrap'),parts[i][j],String(answers[key]??'').trim()!=='');
    }
    if(i===2){
      article.querySelector('.tile-pool').outerHTML='<p class="portfolio-card-options">Nabízené kartičky: 3, 5, 7, 8.</p>';
      article.querySelectorAll('[data-drop]').forEach((drop,j)=>{
        if(!drop.dataset.card)drop.innerHTML='<span>—</span>';
        portfolioMark(drop,parts[i][j],!!drop.dataset.card);
      });
    }
    if(i===7){
      const note=document.createElement('p');note.className='portfolio-grid-note';
      note.textContent=Array.isArray(answers.q8)&&answers.q8.length?'Modrá čára je tvoje odpověď.':'Bez odpovědi – žádná čára nebyla nakreslena.';
      article.querySelector('.portfolio-question').append(note);
    }
    if(i===8){
      const th=document.createElement('th');th.scope='col';th.textContent='Tvoje odpověď';
      article.querySelector('.shape-table thead tr').append(th);
      ['q9a','q9b','q9c'].forEach((key,j)=>{
        const td=document.createElement('td');portfolioMark(td,parts[i][j],!!answers[key]);
        article.querySelector(`[data-part="${key}"]`).append(td);
      });
    }
    if(i===9)['q10b1','q10b2'].forEach((key,j)=>portfolioMark(article.querySelector(`[data-part="${key}"]`),parts[i][j+1],!!answers[key]));
    article.querySelectorAll('input[type="radio"],input[type="checkbox"]').forEach(input=>{
      const chosen=input.checked,label=input.closest('label');
      if(chosen){
        label.classList.add('portfolio-selected');
        if(i!==8)portfolioMark(label,input.type==='checkbox'?['B','C'].includes(input.value):input.value===expected[input.name]);
      }
      const mark=document.createElement('span');mark.className='portfolio-choice-mark';
      mark.textContent=input.type==='checkbox'?(chosen?'☑':'☐'):(chosen?'●':'○');
      mark.setAttribute('aria-label',chosen?'Žákova odpověď':'Neoznačeno');input.replaceWith(mark);
    });
    article.querySelectorAll('[data-model]').forEach(input=>{
      const span=document.createElement('span');span.className='portfolio-number';span.textContent=input.value||'—';input.replaceWith(span);
    });
    article.querySelectorAll('select').forEach(select=>{
      const span=document.createElement('span');span.className='portfolio-dropdown';span.textContent=select.value||'— Bez odpovědi';select.replaceWith(span);
    });
    article.querySelectorAll('[data-drop]').forEach(button=>{
      const div=document.createElement('div');div.className=button.className;div.innerHTML=button.innerHTML;button.replaceWith(div);
    });
    article.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
    article.querySelectorAll('[tabindex]').forEach(el=>el.removeAttribute('tabindex'));
    root.append(article);
  }
  const source=document.createElement('p');source.className='portfolio-source';
  source.textContent='Uvolněné úlohy TIMSS 2023. © 2025 IEA. Vydavatel: TIMSS & PIRLS International Study Center, Boston College.';
  root.append(source);window.CzechTypography?.apply(root);
}
function showPortfolio() {
  if(!finished)return;
  closePad();preparePortfolio();
  document.body.classList.remove('certificate-preview');
  document.body.classList.add('portfolio-preview');
  $('#certificate-tools').hidden=true;$('#portfolio-tools').hidden=false;$('#portfolio').hidden=false;
  window.scrollTo(0,0);$('#portfolio-back').focus({preventScroll:true});
}
$('#portfolio-back').onclick=()=>{
  document.body.classList.remove('portfolio-preview');$('#portfolio-tools').hidden=true;$('#portfolio').hidden=true;
  window.scrollTo(0,0);$('#print-answers').focus({preventScroll:true});
};
$('#portfolio-print').onclick=async()=>{
  await Promise.all([...$('#portfolio').querySelectorAll('img')].map(async img=>{try{await img.decode();}catch{}}));
  window.print();
};
window.addEventListener('beforeprint',()=>{if(document.body.classList.contains('portfolio-preview')&&!$('#portfolio').hasChildNodes())preparePortfolio();});
