const PATH_TO_CHROME = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const URL = 'http://localhost:3333/';

const puppeteer = require('puppeteer');

async function triggerEmail() {
    console.log('sending email...');
}

(async () => {

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
        await page.evaluate(() => {
            const listElementObserver = new MutationObserver((mutation) => {

                mutation.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        console.log('Alert, new element inside forEach'); 
                        triggerEmail(); 
                    } 
                });

            });
            const msgArea = document.getElementById('message-area');
            listElementObserver.observe(msgArea, {attributes: true, childList: true, subtree: true})
        });
    } catch (e) {
        console.log(e);
    }
    
    
})();