const { crawlPage } = require("./crawl.js")
const { printReport } = require("./report.js")


async function main(){
    if (process.argv.length < 3){
        console.log("no website given")
        process.exit(1)
    }

    if (process.argv.length > 3){
        console.log("too many command line arguments")
        process.exit(1)
    }
    const baseurl = process.argv[2]
    console.log(`starting crawl of ${baseurl}`)
    const pages = await crawlPage(baseurl, baseurl, {})

    printReport(pages)

}

main()