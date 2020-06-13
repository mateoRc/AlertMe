const PATH_TO_CHROME = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const URL = 'http://localhost:3333/';

let res = (async () => {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({
        executablePath: PATH_TO_CHROME,
        devtools: true,
        slowMo: 100
    });

    const page = await browser.newPage();
    await page.goto(URL);

    await page.type('#username', 'puppet');
    await page.click('#submit');

    // Emitted when the DOM is parsed and ready (without waiting for resources)
    page.once('domcontentloaded', () => console.info('✅ DOM is ready'));

    try {
        let res1 = await page.evaluate(() => {
            const listElementObserver = new MutationObserver((mutation) => {

                mutation.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        console.log('new Element!'); //  prints in devtools!
                        return 1; 
                    } 
                });

            });

            // choose element to evaluate
            const msgArea = document.getElementById('message-area');
            listElementObserver.observe(msgArea, {attributes: true, childList: true, subtree: true})
        });

        // test
        console.log('res1' + res1);
        return res1;
    } catch (e) {
        console.log(e);
    }
})();

/* TODO
console.log(res1)
(async (res) => {
    if (res = 1) {
        console.log('new element!');
    }
})();

function triggerEmail() {
    console.log('it works! (te)');
}
*/