const fs=require('fs'),vm=require('vm');
const els={count:{},results:{innerHTML:''},programFilter:{},ageFilter:{}};
const doc={getElementById:id=>els[id],querySelectorAll:()=>[]};
const ctx={window:{},document:doc,console};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('data.js','utf8'),ctx);vm.runInContext(fs.readFileSync('app.js','utf8'),ctx);
console.log('years:',Object.keys(ctx.window.RESULTS).sort().join(','));
console.log('rendered year sections:',(els.results.innerHTML.match(/<details class="year"/g)||[]).length);
console.log('total records:',Object.values(ctx.window.RESULTS).reduce((n,c)=>n+Object.values(c).reduce((a,p)=>a+Object.values(p).reduce((b,g)=>b+g.length,0),0),0));
