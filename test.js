/** test.js */

const PATH_TO_CHROME = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        executablePath: PATH_TO_CHROME,
        devtools: true,
        slowMo: 333
    });
    
    const page = await browser.newPage();
    await page.goto('https://www.index.hr/');

    // Emitted when the DOM is parsed and ready (without waiting for resources)
    page.once('domcontentloaded', () => console.info('✅ DOM is ready'));

    // Emitted when the page is fully loaded
   

    // Emitted when a request, which is produced by the page, fails
    page.on('requestfailed', request => console.info(`❌ Failed request: ${request.url()}`));

    // Emitted when a new page, that belongs to the browser context, is opened
    page.on('popup', () => console.info('👉 New page is opened'));

    // Emitted when a response is received
    // page.on('response', response => console.info(`👉 Response: ${response.url()}`));

    // Changes to the north pole's location
    // await page.setGeolocation({ latitude: 90, longitude: 0 });

    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
        //page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    
    });

    console.log('Dimensions new:', dimensions);
    
    await page.waitForSelector('title');
    const title = await page.title();
    console.info(`the title is `);

   

    // await browser.close();
  })();