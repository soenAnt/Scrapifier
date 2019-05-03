const fs = require('fs');
const puppeteer = require('puppeteer');

const selectors = require('./selectors');
const configs = require('../../../configs/configs');

const { credentials } = configs.targets.grades;

async function run() {
  try {
    const browser = await puppeteer.launch({
      headless: configs.puppeteer.options.headless, // go headless or not
    });
    const page = await browser.newPage(); // open new browser instance

    await page.goto(selectors.authPage.pageUrl); // go to myconcordia login page

    await page.click(selectors.authPage.username); // click on username field
    await page.keyboard.type(credentials.username); // type in username

    await page.click(selectors.authPage.password); // click on password field
    await page.keyboard.type(credentials.password); // type in password

    await page.click(selectors.authPage.submitButton); // click submit button

    await page.waitFor(3 * 1000); // wait 3 secs

    await page.goto(selectors.frontPage.myGradesHref); // head to grades page

    await page.waitFor(3 * 1000);

    const gradeTable = await page.evaluate(
      async (radioButtonIdName, goButtonIdName, gradeTableId) => {
        const inputs = [];

        // Query all input elements into NodeList object
        document.querySelectorAll('iframe').forEach((item) => {
          inputs.push(item.contentWindow.document.body.querySelectorAll('input'));
        });

        // Only the first element in inputs array contains relavent data
        const arrayInputs = Array.from(inputs[0]); // make array out of DOM NodeList

        // Get element inside array related to the desired radio button for term
        const radioButton = arrayInputs.filter(
          e => e.id === radioButtonIdName,
        )[0];

        radioButton.click(); // select the radio button

        // Get element inside array related to the the go/continue button
        const goButton = arrayInputs.filter(
          e => e.id === goButtonIdName,
        )[0];

        goButton.click(); // click the button

        const wait = ms => new Promise(r => setTimeout(r, ms)); // make a sync wait
        await wait(3 * 1000); // wait 3 secs for iframe to load

        // Query select the desired element corresponding to the grade table inside
        // iframe and extract its innerText content
        const gt = document.querySelector('iframe')
          .contentWindow.document
          .querySelector(gradeTableId).innerText;

        return gt;
      },
      // Term id name is currently referenced using ids of row indices, hence it
      // might not actually correspond to the same term for everyone. This needs
      // to be refinedby selecting the adjacent columns value that identifies
      // the term by name (and not by index).
      selectors.gradesTermSelectionPage.radioSelectTermIdNames.winter2019,
      selectors.gradesTermSelectionPage.buttonContinueIdName,
      selectors.gradesTableViewPage.gradeTableId,
    );

    fs.writeFileSync(`${__dirname}/grades.txt`, gradeTable); // save the contents to file

    await browser.close(); // close the browser instance
  } catch (e) {
    console.error(e);
  }
}

run(); // run it
