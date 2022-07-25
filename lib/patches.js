"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield (yield fetch("https://raw.githubusercontent.com/ProdigyAPI/ProdigyGameFilePatchGenerator/master/game-files/current.js")).text();
    const cheatMenuRequest = yield (yield fetch("https://raw.githubusercontent.com/ProdigyAPI/ProdigyX/master/dist/extension-bundle.js")).text();
    document.documentElement.setAttribute("onreset", `${request}\nSW.Load.decrementLoadSemaphore();\n${cheatMenuRequest.replace(/new URL/g, "new window.URL")}`);
    // eslint-disable-next-line no-undef
    document.documentElement.dispatchEvent(new CustomEvent("reset"));
    document.documentElement.removeAttribute("onreset");
});
main();
