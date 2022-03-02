const puppeteer = require('puppeteer')


const codeObj = require('./codes')

//----03
const loginLink = 'https://www.hackerrank.com/auth/login'
const email = '@gmail.com'
const password = 'TypeYourPassword'




// ---01 
let browserOpen = puppeteer.launch(
    {
        headless : false,
        args : ['--start-maximized'],
        defaultViewport:null
    }
)

let page

//---02 and 04 
browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;
}).then(function(newTab){
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function(){
    let emailIsEntered = page.type("input[id='input-1']" , email ,{delay : 50})
    return emailIsEntered
}).then(function(){
    let passwordIsEntered = page.type("input[type='password']" , password ,{delay : 50})
    return passwordIsEntered
}).then(function(){
    let loginButtonClicked = page.click("button[data-analytics='LoginPassword']"  ,{delay : 50})
    return loginButtonClicked
}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]' , page )
    return clickOnAlgoPromise
}).then(function(){
    let getToWarmUp = waitAndClick('input[value="warmup"]' ,page )
    return getToWarmUp
}).then(function(){
    let getToWarmUp1 = waitAndClick('input[value="warmup"]' , page)
    return getToWarmUp1
}).then(function(){
    let getToWarmUp2 = waitAndClick('input[value="warmup"]' , page)
    return getToWarmUp2
}).then(function(){
    let waitfor3seconds = page.waitFor(3000)
    return waitfor3seconds
}).then(function(){
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled' ,{delay : 50} )
    return allChallengesPromise;
}).then(function(questionsArr){
    console.log('number of questions', questionsArr.length)
    let questionWillBeSolved = questionSolver(page , questionsArr[0] , codeObj.answer[0])
    return questionWillBeSolved
})



// --05
function waitAndClick(selector , cPage){
    return new Promise(function (resolve ,reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModel = cPage.click(selector)
            return clickModel
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}




function questionSolver(page , question , answer ){
    return new Promise(function(resolve , reject){
        let questionWillBeClicked = question.click()
        questionWillBeClicked
        .then(function(){
            let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return EditorInFocusPromise
        }).then(function(){
            return waitAndClick('.checkbox-input', page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput', page)
        }).then(function(){
            return page.type('textarea.custominput', answer , {delay : 10})
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A' , {delay : 100})
            return AisPressed
        }).then(function(){
            let XisPressed = page.keyboard.press('X' , {delay : 100})
            return XisPressed
        }).then(function(){
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed
        }).then(function(){
            let EditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return EditorInFocus
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A' , {delay : 100})
            return AisPressed
        }).then(function(){
            let VisPressed = page.keyboard.press('V' , {delay : 100})
            return VisPressed
        }).then(function(){
            let ctrlIsUnPressed = page.keyboard.up('Control')
            return ctrlIsUnPressed
        }).then(function(){
            return page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',  {delay : 50})
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject();
        })
    })
}

