const epub = require('epub-gen')

const options = {
    title: "Teste Genival",
    author: "Auth Genival",
    output: '.moby-dick.epub',
    content: [
        {
            title: 'oidoiodsidosiod',
            data: '<p> call oioio djsaijdisjdisjadajsndjsanjdfnasjsfnjsanfjasn</p>'
        }
    ]
}

new epub(options).promise.then(() => console.log('done'))