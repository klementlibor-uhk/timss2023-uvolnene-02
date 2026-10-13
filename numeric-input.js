'use strict';
(function(root) {
  const isDigits=value=>/^\d*$/.test(String(value));
  const remember=input=>{if(isDigits(input.value))input.dataset.numericValue=input.value;};
  function bind(input) {
    if(input.dataset.integer!=='true'||input.dataset.numericBound)return;
    input.dataset.numericBound='true';remember(input);
    input.addEventListener('beforeinput',e=>{
      if(e.data!=null&&!isDigits(e.data))e.preventDefault();
    });
    input.addEventListener('keydown',e=>{
      if(!e.ctrlKey&&!e.metaKey&&!e.altKey&&e.key.length===1&&!isDigits(e.key))e.preventDefault();
    });
    function insert(e,text) {
      e.preventDefault();
      if(input.readOnly||input.disabled)return;
      const value=text.trim();
      if(!isDigits(value)||!value)return;
      const start=input.selectionStart??input.value.length,end=input.selectionEnd??start;
      if(input.maxLength>=0&&input.value.length-end+start+value.length>input.maxLength)return;
      input.setRangeText(value,start,end,'end');
      input.dispatchEvent(new Event('input',{bubbles:true}));
    }
    input.addEventListener('paste',e=>insert(e,e.clipboardData?.getData('text/plain')||''));
    input.addEventListener('drop',e=>insert(e,e.dataTransfer?.getData('text/plain')||''));
    input.addEventListener('input',e=>{
      if(!isDigits(input.value)){
        input.value=input.dataset.numericValue||'';
        e.stopImmediatePropagation();
      }else remember(input);
    },true);
  }
  root.NumericInputs={isDigits,remember,bind};
  if(typeof module!=='undefined')module.exports=root.NumericInputs;
})(typeof window==='undefined'?globalThis:window);
