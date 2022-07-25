const main = async () => {
    const request = await (await fetch("https://raw.githubusercontent.com/ProdigyAPI/ProdigyGameFilePatchGenerator/master/game-files/current.js")).text()
    const cheatMenuRequest = await (await fetch("https://raw.githubusercontent.com/ProdigyAPI/ProdigyX/master/dist/extension-bundle.js")).text()
    document.documentElement.setAttribute("onreset", `${request}\nSW.Load.decrementLoadSemaphore();\n${cheatMenuRequest.replace(/new URL/g, "new window.URL")}`)
    // eslint-disable-next-line no-undef
    document.documentElement.dispatchEvent(new CustomEvent("reset"))
    document.documentElement.removeAttribute("onreset")
}

main()
