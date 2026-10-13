'use strict';
function answered(i) {
  return required[i].every(k=>{
    const value=answers[k];
    if(Array.isArray(value))return value.length>0;
    const text=String(value??'').trim();
    return text!==''&&(!text.includes('/')||text.split('/').every(s=>s.trim()!==''));
  });
}
function status(i) {
  if(TIMSS.score(answers)[i])return 'correct';
  return TIMSS.parts(answers)[i].some(Boolean)&&hasAnyAnswer(i)?'partial':'incorrect';
}
function hasAnyAnswer(i){return required[i].some(k=>Array.isArray(answers[k])?answers[k].length>0:String(answers[k]??'').trim()!=='');}
const statusLabel=s=>s==='correct'?'Správně':s==='partial'?'Částečně správně':'Nesprávně';
function renderSteps() {
  const rail=$('#steps');
  rail.innerHTML=TIMSS.ids.map((id,i)=>`<li class="${answered(i)?'done':''} ${finished?'review-step-'+status(i):''}"><button data-step="${i}" ${!finished&&i>unlocked?'disabled':''} ${page===i?'aria-current="step"':''} aria-label="Otázka ${i+1}${finished?', '+statusLabel(status(i)):answered(i)?', odpovězeno':''}"><span class="circle">${i+1}</span><span class="step-name">Otázka ${i+1}</span></button></li>`).join('');
  rail.querySelectorAll('button').forEach(b=>b.onclick=()=>go(Number(b.dataset.step)));
  $('#progress').textContent=`Vyplněno ${TIMSS.ids.filter((_,i)=>answered(i)).length} z 12 úloh.`;
}
function go(i) {
  if(i<0||i>=TIMSS.ids.length||(!finished&&i>unlocked))return;
  closePad();page=i;render();
}
function bindInteractions() {
  if(finished)return;
  if(page===2)CardTiles.bind($('[data-card-board]'),{
    values:[3,5,7,8],rows:cardRows,get:()=>[answers.q3top||'',answers.q3bottom||''],
    onchange:slots=>{[answers.q3top,answers.q3bottom]=slots;renderSteps();}
  });
  if(page===7)GridDrawing.bind($('[data-drawing-board]'),{get:()=>answers.q8||[],onchange:edges=>{answers.q8=edges;renderSteps();}});
}
function render(focus=true) {
  $('#question').dataset.page=page;
  document.body.classList.remove('results-view');
  renderSteps();
  const s=finished?status(page):null;
  $('#question').innerHTML=`<div class="question-header"><span class="eyebrow">${finished?'Prohlížení odpovědí':'Otázka '+(page+1)+' z 12'}</span><span class="qid">${TIMSS.ids[page]}</span></div><h1 class="task-heading">${titles[page]}</h1>${finished?`<p class="review-summary status ${s}">${s==='correct'?'✓':s==='partial'?'◐':'×'} ${hasAnyAnswer(page)?statusLabel(s):'Bez odpovědi'} · ${TIMSS.score(answers)[page]}/1 bod</p>`:''}${screens[page]()}${finished?`<div class="review-answer"><b>Správná odpověď</b><p>${solutions[page]}</p></div>${lessonButton(page)}`:''}`;
  $('#prev').disabled=page===0;$('#next').hidden=false;$('#next').disabled=page===11;
  $('#finish').textContent=finished?'Zpět na výsledek':'Odevzdat test';
  $('#pad-toggle').disabled=finished||![1,5,11].includes(page);
  if(!finished)bindNumberFields();bindInteractions();
  if(finished){markReview();bindLesson();}
  document.querySelector('.test-note').textContent=finished?'Po odevzdání si můžeš prohlédnout odpovědi a vysvětlení.':'Odpovědi můžeš před odevzdáním měnit.';
  if(focus){$('#question').focus({preventScroll:true});window.scrollTo({top:0,left:0,behavior:'instant'});}
}
$('#question').addEventListener('change',e=>{
  if(finished||!e.target.name)return;
  if(e.target.type==='checkbox')answers.q11=[...$('#question').querySelectorAll('input[name="q11"]:checked')].map(el=>el.value);
  else answers[e.target.name]=e.target.value;
  renderSteps();
});
function addPartStatus(element,ok) {
  if(!element)return;
  element.classList.add(ok?'part-correct':'part-incorrect');
  const label=document.createElement('span');label.className='part-status';label.textContent=ok?'✓ Správně':'× Nesprávně';element.append(label);
}
function markReview() {
  const values=TIMSS.parts(answers)[page];
  const expected={q1:'A',q4:'D',q5:'C',q7:'D',q9a:'C',q9b:'B',q9c:'C',q10a:'A'};
  $('#question').querySelectorAll('input[type="radio"]').forEach(el=>{
    const label=el.closest('label');
    if(el.value===expected[el.name]){label.classList.add('answer-correct');label.title='Správná odpověď';}
    else if(el.checked){label.classList.add('answer-incorrect');label.title='Nesprávná odpověď';}
  });
  const numericKeys={1:['q2'],5:['q6a','q6b'],11:['q12a','q12b','q12c']};
  (numericKeys[page]||[]).forEach((key,i)=>addPartStatus($(`[data-model="${key}"]`)?.closest('.answer-wrap'),values[i]));
  if(page===2)$('#question').querySelectorAll('[data-drop]').forEach((el,i)=>addPartStatus(el,values[i]));
  if(page===8)['q9a','q9b','q9c'].forEach((key,i)=>{
    const row=$(`[data-part="${key}"]`);row.classList.add(values[i]?'part-correct':'part-incorrect');
  });
  if(page===9)['q10b1','q10b2'].forEach((key,i)=>addPartStatus($(`[data-part="${key}"]`),values[i+1]));
  if(page===10)$('#question').querySelectorAll('input[type="checkbox"]').forEach(el=>{
    const correct=['B','C'].includes(el.value),label=el.closest('label');
    if(correct)label.classList.add(el.checked?'answer-correct':'answer-missing');
    else if(el.checked)label.classList.add('answer-incorrect');
    const mark=document.createElement('span');mark.className='part-status';
    mark.textContent=correct?(el.checked?'✓ Správná věta':'Správná věta – neoznačeno'):(el.checked?'× Nesprávná věta':'');
    if(mark.textContent)label.append(mark);
  });
}
$('#prev').onclick=()=>go(page-1);
$('#next').onclick=()=>{if(page<11){unlocked=Math.max(unlocked,page+1);go(page+1);}};
$('#finish').onclick=()=>{
  closePad();if(finished){result();return;}
  const missing=TIMSS.ids.filter((_,i)=>!answered(i)).length;
  $('#confirm-text').textContent=missing?`V ${missing} z 12 úloh chybí odpověď nebo její část. Chceš test přesto odevzdat?`:'Máš vyplněné všechny úlohy. Chceš test odevzdat?';
  $('#confirm').showModal();
};
$('#cancel').onclick=()=>$('#confirm').close();
$('#submit').onclick=()=>{
  if(finished)return;$('#confirm').close();closePad();
  elapsed=Math.floor((Date.now()-started)/1000);finished=true;$('#timer').textContent=formatTime(elapsed);result();
};
function result() {
  closePad();renderSteps();document.body.classList.add('results-view');
  const scores=TIMSS.score(answers),sum=scores.reduce((a,b)=>a+b,0),percent=(sum/12*100).toLocaleString('cs-CZ',{maximumFractionDigits:1});
  $('#question').innerHTML=`<section class="result"><div class="result-top"><div><span class="eyebrow">Test číslo 2 · Výsledek</span><h1>${TIMSS.grade(sum)}</h1></div><div><div class="result-numbers"><div class="result-score"><strong>${sum} / 12</strong><span>získaných bodů</span></div><div class="result-success"><strong>${percent} %</strong><span>úspěšnost</span></div></div><p class="subtle result-time">Čas ${formatTime(elapsed)}</p></div></div><p class="results-hint">Klikni na úlohu a prohlédni si svou odpověď.</p><p class="subtle">Za každou celou správně vyřešenou úlohu získáš jeden bod. U úloh s více částmi uvidíš i správnost jednotlivých odpovědí.</p><div class="result-grid">${TIMSS.ids.map((id,i)=>{const s=status(i);return `<button class="result-item" data-review="${i}" aria-label="Úloha ${i+1}, ${hasAnyAnswer(i)?statusLabel(s):'bez odpovědi'}, ${scores[i]} z 1 bodu. Prohlédnout odpověď."><span class="result-question"><span class="result-index">${i+1}</span><span>Úloha ${i+1}</span></span><span class="result-detail"><span class="status ${s}">${s==='correct'?'✓':s==='partial'?'◐':'×'} ${hasAnyAnswer(i)?statusLabel(s):'Bez odpovědi'}</span></span><span class="item-points">${scores[i]}/1</span></button>`;}).join('')}</div><div class="row result-actions"><button id="print" class="primary">Vytisknout certifikát</button><button id="print-answers" class="primary">Vytiskni své odpovědi</button><button id="home" class="secondary">Zpět na úvodní stránku</button><button id="again" class="secondary">Nový pokus</button></div></section>`;
  $('#prev').disabled=true;$('#next').disabled=true;$('#pad-toggle').disabled=true;$('#finish').textContent='Výsledek testu';
  $('#question').querySelectorAll('[data-review]').forEach(b=>b.onclick=()=>go(Number(b.dataset.review)));
  prepareCertificate();
  $('#print').onclick=()=>{prepareCertificate();document.body.classList.add('certificate-preview');$('#certificate-tools').hidden=false;window.scrollTo(0,0);$('#certificate-back').focus();};
  $('#print-answers').onclick=showPortfolio;
  $('#home').onclick=()=>{$('#leave-confirm').showModal();$('#leave-cancel').focus();};
  $('#again').onclick=()=>{if(window.confirm('Začít nový pokus? Tento výsledek se vymaže.'))location.reload();};
  $('#question').focus();
}
$('#leave-cancel').onclick=()=>{$('#leave-confirm').close();$('#home').focus();};
$('#leave-accept').onclick=()=>location.assign('index.html');
setInterval(()=>{if(!finished)$('#timer').textContent=formatTime(Math.floor((Date.now()-started)/1000));},1000);
render(false);
