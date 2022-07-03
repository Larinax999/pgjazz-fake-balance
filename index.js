// ==UserScript==
// @name         pg fake balance
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  pgjazz
// @author       larinax999
// @run-at       document-start
// @match        https://m.pg-demo.com/*
// @match        https://m.pgjazz.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=m.pgjazz.com
// @grant        GM_log
// ==/UserScript==

window.XMLHttpRequest.prototype.resp_=window.XMLHttpRequest.prototype.__lookupGetter__("response");
window.XMLHttpRequest.prototype.__defineGetter__("response",function(){
    let resp=this.resp_();
    if (resp != undefined && resp.dt != null) { // hook balance
        if (document.first == undefined && resp.dt.bl != null) {
            document.first=1;
            document.bal_ogi=resp.dt.bl;
            document.bal_fake=20000.25; // set balance here
            GM_log("[PG FAKE BALANCE] SETUP BALANCE",document.bal_ogi,document.bal_fake)
        }
        //GM_log("bef fake >>",document.bal_ogi,"bal >",resp.dt?.bl,"bal >",resp.dt?.si?.bl,"bal spin >",resp.dt?.si?.blab);
        if (resp.dt?.bl != undefined) { // first
            resp.dt.bl=document.bal_fake;
        }
        let x;
        if (resp.dt?.si?.bl != undefined) { // after spin
            x=(resp.dt.si.bl-document.bal_ogi)+document.bal_fake;
            resp.dt.si.bl=document.bal_ogi;
            document.bal_ogi=x;
        }
        if (resp.dt?.si?.blab != undefined) { // spin
            resp.dt.si.blab=resp.dt.si.bl;
        }
        //GM_log("fake >>",document.bal_ogi,"bal >",resp.dt?.bl,"bal >",resp.dt?.si?.bl,"bal spin >",resp.dt?.si?.blab);
        return resp;
    }
    return resp;
});
GM_log("[PG FAKE BALANCE] INJECTED")
