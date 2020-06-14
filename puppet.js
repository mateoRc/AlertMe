const PATH_TO_CHROME = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const URL = 'http://localhost:3333/';
const puppeteer = require('puppeteer');
var nodemailer = require('nodemailer');

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
        await page.exposeFunction('triggerEmail', triggerEmail);

        await page.evaluate(() => {
            const listElementObserver = new MutationObserver((mutation) => {

                mutation.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        console.log('new Message!'); // prints in devtools!
                        triggerEmail();
                    }
                });
            });
            // choose element to evaluate
            const msgArea = document.getElementById('message-area');
            listElementObserver.observe(msgArea, {
                attributes: true, 
                childList: true, 
                subtree: true
            });
        });
    } catch (e) {
        console.log(e);
    }
})();

function triggerEmail() {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '',
          pass: ''
        }
    });
    
    var mailOptions = {
    from: 'sender@gmail.com',
    to: 'mateo19992@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

