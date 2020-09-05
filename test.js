console.log("             __       ___                     __                   \r\n            \/\\ \\     \/\\_ \\                   \/\\ \\__                \r\n            \\ \\ \\____\\\/\/\\ \\      __      ____\\ \\ ,_\\    __   _ __  \r\n             \\ \\ '__`\\ \\ \\ \\   \/'__`\\   \/',__\\\\ \\ \\\/  \/'__`\\\/\\`'__\\\r\n              \\ \\ \\L\\ \\ \\_\\ \\_\/\\ \\L\\.\\_\/\\__, `\\\\ \\ \\_\/\\  __\/\\ \\ \\\/ \r\n               \\ \\_,__\/ \/\\____\\ \\__\/.\\_\\\/\\____\/ \\ \\__\\ \\____\\\\ \\_\\ \r\n                \\\/___\/  \\\/____\/\\\/__\/\\\/_\/\\\/___\/   \\\/__\/\\\/____\/ \\\/_\/ ");

const Nightmare = require('nightmare');
require('nightmare-wait-for-url');
const nightmare = Nightmare({show: true});

var url = 'https://slack.com/signin';
var slackOrg = "geometricenergy";
var email = '';
var pw = '';

console.log(url);
console.log("---");

nightmare
    .wait(1000)
    //Spoof useragent, slack doesn't like electron, so we make slack think we're chrome
    .useragent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36')
    //Go to slack login
    .goto(url)
    //Slack address entry
    .type('#domain', slackOrg)
    .click('#submit_team_domain')
    //wait because the script will try to progress before the page fully loads, should be replaced later
    .wait(3000)
    .type('#email',email)
    .type('#password',pw)
    .click('#signin_form > div > label > input[type="checkbox"]')
    .click('#signin_btn')
    .evaluate(function() {
        return document.url;
    })
    //wait because the script will try to progress before the auth key arrives, should be replaced later
    //YIKES, wait times out after 30,000ms -- must be changed
    .wait(30000)
    //type into the chat box
    .type('body > div.p-client_container > div > div.p-workspace.p-workspace--context-pane-collapsed.p-workspace--classic-nav.p-workspace--iap1 > div.p-workspace__primary_view > div > div.p-file_drag_drop__container > footer > div > div > div.p-workspace__input.p-message_input > div.p-message_input_field.c-texty_input--multi_line.c-texty_input.ql-container.c-texty_input--sticky_composer.c-texty_input--double_decker.focus', 'bot activated')
    //click submit
    .click('body > div.p-client_container > div > div.p-workspace.p-workspace--context-pane-collapsed.p-workspace--classic-nav.p-workspace--iap1 > div.p-workspace__primary_view > div > div.p-file_drag_drop__container > footer > div > div > div.p-workspace__input.p-message_input > div.p-message_input_field.c-texty_input--multi_line.c-texty_input.ql-container.c-texty_input--sticky_composer.c-texty_input--double_decker > div.ql-buttons > button.c-button-unstyled.c-icon_button.c-icon_button--light.c-icon_button--size_medium.c-texty_input__button.c-texty_input__button--send')
    .catch(function(e)  {
            console.log(e);
    });