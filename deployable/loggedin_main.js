
function getUrlParam(name){
    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]);
    return null;
}

let r0 = getUrlParam("rate0");
let r1 = getUrlParam("rate1");
let r2 = getUrlParam("rate2");
let r3 = getUrlParam("rate3");
let r4 = getUrlParam("rate4");
let r5 = getUrlParam("rate5");
let r6 = getUrlParam("rate6");



console.log(r0);

console.log(r1);
console.log(r2);
console.log(r3);
console.log(r4);
console.log(r5);

