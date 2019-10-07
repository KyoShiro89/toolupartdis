//load in puppeteer
const puppeteer = require('puppeteer')
const chromeOptions = {
    headless:false,
    defaultViewport: null,
    slowMo:10,};
var XLSX = require('xlsx')
var workbook = XLSX.readFile('listing.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

//console.log(xlData);
void (async()=>{
    try{
        const brower = await puppeteer.launch(chromeOptions)
        const page = await brower.newPage()
        // await page.goto('https://scrapethissite.com/pages/forms/')

        // await page.screenshot({
        //     path: './screenshots/page1.png'
        // })

        // await page.pdf({path: './pdfs/page1.pdf'})
       // await brower.close()

       //xorder
        // await page.goto('https://cms.xorder.vn/login/');
        // await page.waitFor(5000);
        // console.log('New Page URL:', page.url());
        // // await page.focus('username')
        // // await page.keyboard.type('kienmt')
        // // await page.focus('password')
        // // await page.keyboard.type('Kyoshiro89@')
        // await page.type('#username', 'kienmt');
        // await page.type('#password', 'Kyoshiro89@');
        // await page.keyboard.press('Enter');
        
        // await page.waitForNavigation();
        // console.log('New Page URL:', page.url());
        // await page.waitFor(5000);
        // await page.screenshot({
        //      path: './screenshots/page1.png'
        // })

        // await page.pdf({path: './pdfs/page1.pdf'})

        //displate
        // console.log(1);
        // for (let i = 0; i < xlData.length; i++) {
        //     var element = xlData[i];
        //     console.log(element.Imagename);
        //     console.log(i);
        // }
        await page.goto('https://displate.com/auth/signin');
        await page.waitFor(100000);
        console.log('New Page URL:', page.url());
        // await page.focus('username')
        // await page.keyboard.type('kienmt')
        // await page.focus('password')
        // await page.keyboard.type('Kyoshiro89@')
        // await page.type('#login-form > div:nth-child(2) > div > input', 'kienmtv@gmail.com');
        // await page.type('#login-form > div:nth-child(3) > div > input', '123456aA@');
        // await page.keyboard.press('Enter');
        
        //await page.waitForNavigation();
        //console.log('New Page URL:', page.url());
        //await page.waitFor(1000);
        //await page.screenshot({
        //      path: './screenshots/page1.png'
        // })
        
        //await page.pdf({path: './pdfs/page1.pdf'})
        await page.goto('https://displate.com/file-upload');
        await page.waitFor(2000);
        //await page.click('#multiuploader > div > div.landing-container.start-page > div > div > button');
        var pilot = 1;
        for (let i = 0; i < xlData.length; i++) {
            var element = xlData[i];
            pilot = pilot +1;
            const input = await page.$('input[type="file"]')
            await input.uploadFile('D:/deverloper/puppeteer/upload displate/design/'+ element.Foldername + '/' + element.Imagename)
            await page.waitFor(5000);
            //kick design just upload
            await page.click('#previewList > li:nth-child(' + pilot + ') > div.title.text.text--bold');
            await page.waitFor(500);
            //title
            await page.focus('#title')
            await page.keyboard.type(element.Title)
            //des
            await page.focus('#description')
            await page.keyboard.type(element.Des)
            //colection
            await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.editor__group--collection > div.input-select.input-select--full-width > div.input-select__item.input-select__item--selected');
            await page.waitFor(500);
            await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.editor__group--collection > div.input-select.input-select--full-width > div.input-select__dropdown.collection__dropdown > div:nth-child('+ element.Collection + ')');
              //Category
            var cate = element.Category.split(',');
            await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.category > div > div > div.simplebar-scroll-content > div > div > label:nth-child(' + cate[0] + ') > span.input-checkbox__checkmark');
            await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.category > div > div > div.simplebar-scroll-content > div > div > label:nth-child(' + cate[1] + ') > span.input-checkbox__checkmark');
            await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.category > div > div > div.simplebar-scroll-content > div > div > label:nth-child(' + cate[2] + ') > span.input-checkbox__checkmark');
            //tag
            async function setSelectVal(sel, val) {
                    page.evaluate((data) => {
                        return document.querySelector(data.sel).value = data.val;
                    }, {sel, val})
                }
            await setSelectVal('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.tags > ul > li > input[type=text]', '')
            await page.waitFor(500);
            await page.focus('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.tags > ul > li > input[type=text]')
            await page.keyboard.type(element.Tag);
            //await promise;
        }
        
        //await page.keyboard.press('Escape');
        //await delay(1000);
        //await page.keyboard.down('Escape');
        //await page.keyboard.up('Escape');
        //await page.type(String.fromCharCode(27));
        //title
    //     await page.focus('#title')
    //     await page.keyboard.type('title 1')
    //     //des
    //     await page.focus('#description')
    //     await page.keyboard.type('des 1')
    //     //colection
    //     await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.editor__group--collection > div.input-select.input-select--full-width > div.input-select__item.input-select__item--selected');
    //     await page.waitFor(1000);
    //     await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.editor__group--collection > div.input-select.input-select--full-width > div.input-select__dropdown.collection__dropdown > div:nth-child(4)');
    //    // await page.evaluate(() => document.querySelector('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.editor__group--collection > div.input-select.input-select--full-width').value = '180960');
    //    // await page.select('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.editor__group--collection > div.input-select.input-select--full-width', '180960')
    //     //Category
    //     await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.category > div > div > div.simplebar-scroll-content > div > div > label:nth-child(4) > span.input-checkbox__checkmark');
    //     await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.category > div > div > div.simplebar-scroll-content > div > div > label:nth-child(16) > span.input-checkbox__checkmark');
    //     await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.category > div > div > div.simplebar-scroll-content > div > div > label:nth-child(15) > span.input-checkbox__checkmark');
    //     // const locationcheckbox1  = await page.$('#\37 4');
    //     // await locationcheckbox1.click();
    //     // const locationcheckbox2  = await page.$('#\36 1');
    //     // await locationcheckbox2.click();
    //     // const locationcheckbox3  = await page.$('#\35 2');
    //     // await locationcheckbox3.click();
    //     //tag
    //     await page.focus('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.tags > ul > li > input[type=text]')
    //     await page.keyboard.type('kienmt man city abc united today tomorrow game dota 234 zeus')
        
    //     //price
    //     async function setSelectVal(sel, val) {
    //         page.evaluate((data) => {
    //             return document.querySelector(data.sel).value = data.val
    //         }, {sel, val})
    //     }
        
    //     await setSelectVal('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.price > div.price__container > div.price__medium > input', '49')
    //     // await page.evaluate((a , b) => {
    //     //     document.querySelector('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.price > div.price__container > div.price__medium > input').value = 49;
    //     //   }, a, b);
    //     //await page.type('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.price > div.price__container > div.price__medium > input', '49');

    //     await page.screenshot({
    //         path: './screenshots/page1.png'
    //    })
       
       //click button
       //await page.click('#multi-submit');

       //up hinh 2
    //    const input2 = await page.$('input[type="file"]')
    //    await input2.uploadFile('D:/deverloper/puppeteer/anhtest/Sergio-Agüero.jpg')
    //     await page.waitFor(5000);
    //     //title
    //     await page.click('#previewList > li:nth-child(3) > div.title.text.text--bold');
    //     await page.waitFor(1000);
    //     await page.focus('#title')
    //     await page.keyboard.type('title 2')
    //     //des
    //     await page.focus('#description')
    //     await page.keyboard.type('des 2')
    //     //colection
    //     //colection
    //     await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.editor__group--collection > div.input-select.input-select--full-width > div.input-select__item.input-select__item--selected');
    //     await page.waitFor(1000);
    //     await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.editor__group--collection > div.input-select.input-select--full-width > div.input-select__dropdown.collection__dropdown > div:nth-child(4)');
    //    // await page.evaluate(() => document.querySelector('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.editor__group--collection > div.input-select.input-select--full-width').value = '180960');
    //    // await page.select('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.editor__group--collection > div.input-select.input-select--full-width', '180960')
    //     //Category
    //     await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.category > div > div > div.simplebar-scroll-content > div > div > label:nth-child(4) > span.input-checkbox__checkmark');
    //     await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.category > div > div > div.simplebar-scroll-content > div > div > label:nth-child(16) > span.input-checkbox__checkmark');
    //     await page.click('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.category > div > div > div.simplebar-scroll-content > div > div > label:nth-child(15) > span.input-checkbox__checkmark');
    //    //tag
    //    await page.focus('#multiuploader > div > div.multiuploader-container > div.editor-container > div.sidebar-wrapper > div.sidebar.editor > div.simplebar-scroll-content > div > div.editor__group.tags > ul > li > input[type=text]')
    //    await page.keyboard.type('2kienmt 2man 2city abc 2united today tomorrow game dota 234 zeus')
    //    //click button
    //    await page.click('#multi-submit');
       // await browser.close();


    }catch (error){
        console.log(error);
    }
})()