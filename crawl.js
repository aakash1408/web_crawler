const {JSDOM} = require("jsdom")

async function crawlPage(baseurl, currentURL, pages){
    const baseURLObj = new URL(baseurl)
    const currentURLObj = new URL(currentURL)
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }
    
    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1
    console.log(`currently crawling page ${currentURL}`)
    
    
    try{
    const resp = await fetch(currentURL)
    if (resp.status > 399){
        console.log(`error in fetch with status code ${resp.status}`)
        return pages
    }

    const contentType = resp.headers.get("content-type")
    if(!contentType.includes("text/html")){
        console.log(`error in fetch with status code ${resp.status}`)
        return pages
    }

    const htmlBody = await resp.text()
    const nextURLs = getURLsFromHTML(htmlBody,baseurl)

    for (const nextURL of nextURLs){
        pages = await crawlPage(baseurl, nextURL,pages)
    }

    }catch(err){
        console.log(`error ${err.message} while crawling page ${currentURL}`)
    }
    return pages
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