const {test, expect} = require("@jest/globals")
const { normalizeURL, getURLsFromHTML} = require("./crawl.js")


test("normalizeURL strip protocol", () => {
    const input = "https://amazon/path"
    const expected = "amazon/path"
    const actual = normalizeURL(input)
    expect(actual).toEqual(expected)
})

test("normalizeURL strip trailing /", () =>{
    const input = "https://amazon/path/"
    const expected = "amazon/path"
    const actual = normalizeURL(input)
    expect(actual).toEqual(expected)
})

test("normalizeURL capitalize" , () => {
    const input = 'https://AMAZON/path'
    const expected = 'amazon/path'
    const actual = normalizeURL(input)
    expect(actual).toEqual(expected)
})

test("normalizeURL http", ()=>{
    const input = "http://amazon/path"
    const expected = "amazon/path"
    const actual = normalizeURL(input)
    expect(actual).toEqual(expected)
})

test("get Urls from html absolute ", ()=>{
    const input = `
    <html>
        <body>
            <a href = "https://amazon/">
                Amazon Shopping
            </a>
        </body>
    </html>    
    `
    const inputbaseURL = "https://amazon"
    const expected = ["https://amazon/"]
    const actual = getURLsFromHTML(input, inputbaseURL)
    expect(actual).toEqual(expected)
})

test("get Urls from html relative ", ()=>{
    const input = `
    <html>
        <body>
            <a href = "/path/">
                Amazon Shopping
            </a>
        </body>
    </html>    
    `
    const inputbaseURL = "https://amazon"
    const expected = ["https://amazon/path/"]
    const actual = getURLsFromHTML(input, inputbaseURL)
    expect(actual).toEqual(expected)
})

test("get Urls from html both ", ()=>{
    const input = `
    <html>
        <body>
            <a href = "https://amazon/">
                Amazon Shopping
            </a>
            <a href = "/path/">
                Clothes
            </a>
        </body>
    </html>    
    `
    const inputbaseURL = "https://amazon"
    const expected = ["https://amazon/", "https://amazon/path/"]
    const actual = getURLsFromHTML(input, inputbaseURL)
    expect(actual).toEqual(expected)
})

test("get Urls from html invalid ", ()=>{
    const input = `
    <html>
        <body>
            <a href = "invalid">
                invalid
            </a>
        </body>
    </html>    
    `
    const inputbaseURL = "https://amazon"
    const expected = []
    const actual = getURLsFromHTML(input, inputbaseURL)
    expect(actual).toEqual(expected)
})

