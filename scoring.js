'use strict';
(function(root) {
  const ids = ['ME71013','ME71026','ME71036','ME71040','ME71068','ME71075','ME71080','ME71211','ME71178','ME71135','ME71201','ME71175'];
  function number(value) {
    let text = String(value ?? '').trim();
    if (!text) return NaN;
    const mixed = text.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
    if (mixed) return Number(mixed[3]) ? Number(mixed[1]) + Number(mixed[2])/Number(mixed[3]) : NaN;
    text = text.replace(/\s+/g, '').replace(',', '.');
    if (/^\d+\/\d+$/.test(text)) { const [a,b] = text.split('/').map(Number); return b ? a/b : NaN; }
    return /^\d+(?:\.\d+)?$/.test(text) ? Number(text) : NaN;
  }
  function gridCheck(edges, {starX=5,starY=2,size=7}={}) {
    if (!Array.isArray(edges) || edges.length < 2) return false;
    const segments = [...new Set(edges)];
    const xs = [];
    for (const edge of segments) {
      const match = String(edge).match(/^(\d+),(\d+):(\d+),(\d+)$/);
      if (!match) return false;
      const [x,y,u,v] = match.slice(1).map(Number);
      if (y !== starY || v !== starY || u !== x+1 || x<0 || u>size) return false;
      xs.push(x);
    }
    xs.sort((a,b)=>a-b);
    if (!xs.every((x,i)=>i===0 || x===xs[i-1]+1)) return false;
    return xs[0] <= starX-1 && xs[xs.length-1]+1 >= starX+1;
  }
  function parts(a) {
    const names = ['Marek','Jirka'];
    const pairDifferent = a.q10b1 !== a.q10b2;
    const selected = Array.isArray(a.q11) ? a.q11 : [];
    return [
      [a.q1==='A'],
      [number(a.q2)===36],
      [String(a.q3top)==='8',String(a.q3bottom)==='3'],
      [a.q4==='D'],
      [a.q5==='C'],
      [number(a.q6a)===800,number(a.q6b)===24],
      [a.q7==='D'],
      [gridCheck(a.q8)],
      [a.q9a==='C',a.q9b==='B',a.q9c==='C'],
      [a.q10a==='A',names.includes(a.q10b1)&&pairDifferent,names.includes(a.q10b2)&&pairDifferent],
      [selected.includes('B'),selected.includes('C')],
      [number(a.q12a)===10,number(a.q12b)===6,number(a.q12c)===11]
    ];
  }
  function score(a) {
    const p=parts(a);
    return p.map((values,i)=> {
      if(i===10) { const s=a.q11; return Number(Array.isArray(s)&&s.length===2&&new Set(s).size===2&&s.includes('B')&&s.includes('C')); }
      return Number(values.every(Boolean));
    });
  }
  function grade(n) {
    return n>=11?'Výborně!':n>=9?'Velmi dobře!':n>=6?'Dobře!':n>=3?'Ještě trochu procvičování a půjde to lépe.':'Nevzdávej to, zkus úlohy znovu.';
  }
  root.TIMSS={ids,maximum:12,number,gridCheck,parts,score,grade};
  if(typeof module!=='undefined') module.exports=root.TIMSS;
})(typeof window==='undefined'?globalThis:window);
