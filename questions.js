'use strict';
const titles=['Vypočítej rozdíl','Najdi číslo','Doplň kartičky','Tašky s míči','Výška budov','Změř třídu kroky','Kolik váží meloun?','Cesty v parku','Vlastnosti obrazců','Body ve hře','Sněhové srážky','Papírová zvířátka'];
function choice(key,value,text) {return `<label class="choice"><input type="radio" name="${key}" value="${value}" ${answers[key]===value?'checked':''} ${finished?'disabled':''}><span class="bubble">${value}</span><span>${text}</span></label>`;}
const options=(key,items)=>`<div class="options" role="group">${items.map((t,i)=>choice(key,'ABCD'[i],t)).join('')}</div>`;
const figureSizes={'q04-bags':[387,110],'q05-buildings':[253,262],'q06-footprints':[565,43],'q07-scales':[263,349],'q09-shapes':[373,198],'q11-charts':[771,273]};
const figure=(name,alt,cls='')=>`<img class="figure original-figure ${cls}" src="assets/original/${name}.${name==='q11-charts'?'svg':'png'}" width="${figureSizes[name][0]}" height="${figureSizes[name][1]}" alt="${alt}">`;
const required=[['q1'],['q2'],['q3top','q3bottom'],['q4'],['q5'],['q6a','q6b'],['q7'],['q8'],['q9a','q9b','q9c'],['q10a','q10b1','q10b2'],['q11'],['q12a','q12b','q12c']];
const solutions=[
  'A: 597. Výpočet: 1 000 − 400 = 600, potom 600 − 3 = 597.',
  '36. Je větší než 24 a menší než 42, je to násobek 9 a je sudé.',
  'Do prvního políčka patří 8: 5 + 8 = 13, tedy více než 12. Do druhého patří 3: 20 − 3 = 17, tedy více než 15.',
  'D: (40 : 8) + (10 : 2). Pro každý druh míčů spočítáme tašky zvlášť a pak počty sečteme. Celkem je potřeba 10 tašek.',
  'C: 180 m. Budova B je přibližně třikrát vyšší než budova A.',
  'A: 800 cm (40 × 20). B: 24 kroků (600 : 25).',
  'D: 6 kg. Ananas váží 3 kg, neoznačené závaží 5 kg a meloun 6 kg.',
  'Vodorovná cesta procházející hvězdičkou. Pokračuje alespoň jedno políčko vlevo i vpravo od hvězdičky, je souvislá a nejsou přidané další čáry.',
  '5 stran: C – oba obrazce. Stejně dlouhé strany: B – obrazec B. Obvod 15: C – oba obrazce.',
  'A: Marek. B: Marek a Jirka; jejich pořadí v nabídkách nerozhoduje.',
  'B a C. V únoru 2017 napadlo 30 cm sněhu, v únoru 1893 méně než 25 cm. Diagramy mají různá měřítka. Bod získáš, pokud označíš právě obě správné věty.',
  'Modré ryby: 10. Červené ryby: 6. Žluté ryby: 11.'
];
const cardRows=[{prefix:'5 +',suffix:'je větší než 12.'},{prefix:'20 −',suffix:'je větší než 15.'}];
function cards() {return CardTiles.markup({values:[3,5,7,8],slots:[answers.q3top||'',answers.q3bottom||''],rows:cardRows,disabled:finished,showHelp:false});}
function shapeChoices() {
  return `<div class="shape-layout">${figure('q09-shapes','Obrazec A má strany délek 2, 2, 4, 3, 4. Obrazec B má pět stran délky 3.','shapes')}<p>Jsou toto vlastnosti obrazce A, obrazce B, nebo obou obrazců?</p><p>U každé vlastnosti označ jeden kroužek.</p><div class="table-scroll"><table class="shape-table"><thead><tr><th scope="col">Vlastnost</th><th scope="col">Obrazec A</th><th scope="col">Obrazec B</th><th scope="col">Oba obrazce</th></tr></thead><tbody>${[['q9a','5 stran'],['q9b','Všechny strany jsou stejně dlouhé.'],['q9c','Obvod je 15.']].map(([key,label])=>`<tr data-part="${key}"><th scope="row">${label}</th>${['A','B','C'].map((v,i)=>`<td><label class="matrix-choice"><input type="radio" name="${key}" value="${v}" aria-label="${label}: ${['obrazec A','obrazec B','oba obrazce'][i]}" ${answers[key]===v?'checked':''} ${finished?'disabled':''}><span class="bubble">${v}</span></label></td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
}
const children=['Marek','Tereza','Jirka','Jana'];
function gameTable(){return `<div class="table-scroll"><table class="game-table"><thead><tr><th scope="col">Kolo</th>${children.map(n=>`<th scope="col">${n}</th>`).join('')}</tr></thead><tbody>${[[19,18,20,11],[17,12,14,9],[15,16,13,16]].map((row,i)=>`<tr><th scope="row">${i+1}. kolo</th>${row.map(n=>`<td>${n}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function dropdown(key,label) {return `<label class="select-answer" data-part="${key}"><select name="${key}" aria-label="${label}" ${finished?'disabled':''}><option value="">Vyber jednu možnost</option>${children.map(name=>`<option value="${name}" ${answers[key]===name?'selected':''}>${name}</option>`).join('')}</select></label>`;}
const sentences=[
  'V únoru 1893 napadlo více sněhu.',
  'V únoru 2017 napadlo 30 cm sněhu. V únoru 1893 napadlo méně než 25 cm.',
  'Měřítka diagramů jsou odlišná, proto sloupec z roku 1893 vypadá vyšší, i když sněhu bylo méně.',
  'V únoru 2017 napadlo 30 cm sněhu. V únoru 1893 napadlo jen asi 9 cm.'
];
function multiple() {
  const selected=Array.isArray(answers.q11)?answers.q11:[];
  return `<fieldset class="options multi-options"><legend class="sr-only">Označ všechny správné věty.</legend>${sentences.map((text,i)=>`<label class="choice multi-choice"><input type="checkbox" name="q11" value="${'ABCD'[i]}" ${selected.includes('ABCD'[i])?'checked':''} ${finished?'disabled':''}><span class="bubble">${'ABCD'[i]}</span><span>${text}</span></label>`).join('')}</fieldset>`;
}
function animals() {
  return `<p>Žáci ve třídě vyráběli tři různé skládačky zvířátek, použili k tomu modrý, červený a žlutý papír. V tabulce je uvedeno, kolik zvířátek udělali z každého barevného papíru.</p><div class="table-scroll"><table class="animal-table"><thead><tr><th scope="col" rowspan="2">Zvíře</th><th scope="colgroup" colspan="3">Barevný papír</th></tr><tr><th scope="col">Modrý</th><th scope="col">Červený</th><th scope="col">Žlutý</th></tr></thead><tbody><tr><th scope="row"><img src="assets/original/q12-turtle.png" alt=""><span>Želva</span></th><td>8</td><td>4</td><td>3</td></tr><tr><th scope="row"><img src="assets/original/q12-giraffe.png" alt=""><span>Žirafa</span></th><td>3</td><td>2</td><td>10</td></tr><tr><th scope="row"><img src="assets/original/q12-fish.png" alt=""><span>Ryba</span></th><td>${input('q12a','Modré ryby:')}</td><td>${input('q12b','Červené ryby:')}</td><td>${input('q12c','Žluté ryby:')}</td></tr></tbody></table></div><p>Doplň tabulku podle těchto pravidel:</p><ul class="task-rules"><li>Modrých ryb je stejný počet jako žlutých žiraf.</li><li>Červených ryb je stejný počet jako dvou zbývajících červených zvířátek dohromady.</li><li>Žlutých zvířátek je celkem 24.</li></ul>`;
}
const screens=[
 ()=>`<p class="math-question">1 000 − 403 =</p>${options('q1',['597','603','607','697'])}`,
 ()=>`<p>Pro které číslo jsou tato tři tvrzení pravdivá?</p><ul class="task-rules"><li>Je větší než 24 a menší než 42.</li><li>Je to násobek 9.</li><li>Je sudé.</li></ul>${input('q2')}`,
 ()=>`<p>Doplň prázdná políčka tak, aby věty byly pravdivé.</p><p>Do každého políčka přetáhni jednu kartu s číslem.</p>${cards()}`,
 ()=>`<p>Trenér potřebuje dát 40 tenisových míčků a 10 fotbalových míčů do tašek.</p><p>Do každé tašky se vejde <b>buď</b> 8 tenisových míčků, <b>nebo</b> 2 fotbalové míče.</p>${figure('q04-bags','Taška pro osm tenisových míčků, nebo taška pro dva fotbalové míče.','bags')}<p>Kterým způsobem může trenér spočítat, kolik tašek bude celkem potřebovat?</p>${options('q4',['40 + (10 : 2)','(40 : 2) + (10 : 8)','(40 + 8) : (10 + 2)','(40 : 8) + (10 : 2)'])}`,
 ()=>`<p>Výška budovy A je 60 metrů.</p>${figure('q05-buildings','Budova A s výškou 60 metrů a vyšší budova B.','buildings')}<p>Který odhad výšky budovy B je nejlepší?</p>${options('q5',['120 m','150 m','180 m','210 m'])}`,
 ()=>`<p>Katka a Šárka měřily velikost třídy tak, že počítaly kroky z jedné strany místnosti na druhou.</p><p>Dělaly při tom kroky bez mezer mezi chodidly, jak vidíš na obrázku:</p>${figure('q06-footprints','Chodidla položená těsně za sebou bez mezer.','footprints')}<section data-part="q6a"><p><b class="sub">A.</b> Katka má chodidlo dlouhé 20 cm a udělala 40 kroků, aby přešla celou délku třídy.</p><p>Kolik je délka třídy v centimetrech?</p>${input('q6a','Odpověď:','cm')}</section><section data-part="q6b"><p><b class="sub">B.</b> Šířka třídy je 600 cm. Šárka má chodidlo dlouhé 25 cm.</p><p>Kolik kroků musí Šárka udělat, aby přešla celou šířku třídy?</p>${input('q6b')}</section>`,
 ()=>`<p>Na každé váze váží předměty nalevo stejně jako předměty napravo.</p>${figure('q07-scales','Tři vyrovnané váhy: 1 kg a 2 kg proti ananasu; ananas a 2 kg proti neoznačenému závaží; neoznačené závaží a 1 kg proti melounu.','scales')}<p>Kolik váží meloun?</p>${options('q7',['3 kg','4 kg','5 kg','6 kg'])}`,
 ()=>`<p>Marie jde po cestě v parku.</p><p>V parku je druhá cesta, která je s Mariinou cestou <b>rovnoběžná</b> a prochází <span aria-label="hvězdičkou">★</span>.</p><p>Nakresli druhou cestu.</p>${GridDrawing.markup({edges:answers.q8||[],disabled:finished,showHelp:false})}`,
 shapeChoices,
 ()=>`<p>V tabulce vidíš počty bodů, které žáci získali ve třech kolech hry.</p>${gameTable()}<section data-part="q10a"><p><b class="sub">A.</b> Kdo získal nejvíce bodů ve 2. kole?</p>${options('q10a',children)}</section><p><b class="sub">B.</b> Kdo získal méně bodů ve 3. kole než ve 2. kole?</p><p>Použij rozbalovací nabídky.</p><div class="select-pair">${dropdown('q10b1','První rozbalovací nabídka')}<span>a</span>${dropdown('q10b2','Druhá rozbalovací nabídka')}</div>`,
 ()=>`<p>Toto jsou sloupcové diagramy sněhových srážek v Zedlandu v letech 1892–1893 v porovnání s lety 2016–2017.</p>${figure('q11-charts','Dva sloupcové diagramy sněhových srážek: vlevo roky 1892–1893 s osou do 30 cm, vpravo roky 2016–2017 s osou do 50 cm.','charts')}<p>Julie si myslí, že v únoru 1893 bylo více sněhu než v únoru 2017, ale <b>nemá</b> pravdu.</p><p>Označ <b>všechny</b> věty, které zdůvodňují, proč Julie nemá pravdu.</p>${multiple()}`,
 animals
];
