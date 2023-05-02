const {test, expect} = require("@jest/globals")
const { normalizeURL} = require("./crawl.js")


test("normalizeURL strip protocol " , () => {
const input = 'https://amazon/path'
const expected = 'amazon/path'
const actual = normalizeURL(input)
expect(expected).toEqual(actual)
})

test("normalizeURL strip trailing / " , () => {
    const input = 'https://amazon/path/'
    const expected = 'amazon/path'
    const actual = normalizeURL(input)
    expect(expected).toEqual(actual)
})

test("normalizeURL capitalize" , () => {
    const input = 'https://AMAZON/path'
    const expected = 'amazon/path'
    const actual = normalizeURL(input)
    expect(expected).toEqual(actual)
})

test("normalizeURL http " , () => {
    const input = 'http://amazon/path'
    const expected = 'amazon/path'
    const actual = normalizeURL(input)
    expect(expected).toEqual(actual)
})