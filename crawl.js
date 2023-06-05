const {JSDOM} = require("jsdom")

async function crawlPage(currentURL){
    console.log(`crawling page ${currentURL}`)
    try{
    const resp = await fetch(currentURL)
    if (resp.status > 399){
        console.log(`error in fetch with status code ${resp.status}`)
        return
    }

    const contentType = resp.headers.get("content-type")
    if(!contentType.includes("text/html")){
        console.log(`error in fetch with status code ${resp.status}`)
        return
    }

    console.log(await resp.text())
    
    }catch(err){
        console.log(`error ${err.message} while crawling page ${currentURL}`)
    }
}


function getURLsFromHTML(htmlbody, baseurl){
    const URLs = []
    const dom = new JSDOM(htmlbody)
    const linkElements = dom.window.document.querySelectorAll("a")
    
    for (const linkElement of linkElements){
        if (linkElement.href.slice(0,1) === "/"){
            //the url is relative
            try{
                const urlObj = new URL(`${baseurl}${linkElement.href}`)
                URLs.push(urlObj.href)
            }
            catch (err){
                console.log(`error with relative url : ${err.message}`)
            }
        }
        else{
            // the url is absolute
            try{
                const urlObj = new URL(linkElement.href)    
                URLs.push(linkElement.href) 
            }
            catch (err){
                console.log(`error with relative url : ${err.message}`)
            }  
        }
        
    }
    return URLs
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === "/"){
        return hostPath.slice(0,-1)
    }
    return hostPath

}



module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}