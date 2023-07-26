const PDFDocument = require('pdfkit');
const fs = require('fs');


let pdfDoc = new PDFDocument;

//alinhamento
pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
pdfDoc.text("This text is left aligned", { align: 'left'})
pdfDoc.text("This text is at the center", { align: 'center'})
pdfDoc.text("This text is right aligned", { align: 'right'})
pdfDoc.text("This text needs to be slightly longer so that we can see that justification actually works as intended", { align: 'justify'})


//Estilizando texto

pdfDoc
    .fillColor('blue')
    .text("This is a link", { link: 'https://pdfkit.org/docs/guide.pdf', underline: true });
pdfDoc
    .fillColor('black')
    .text("This text is underlined", { underline: true });
pdfDoc.text("This text is italicized", { oblique: true });
pdfDoc.text("This text is striked-through", { strike: true });

pdfDoc
    .fillColor('blue')
    .text("This text is blue and italicized", {oblique : true, lineBreak : false})
    .fillColor('red')
    .text(" This text is red");


//lista

let myArrayOfItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

pdfDoc.list(myArrayOfItems);
pdfDoc.moveDown(0.8);

let innerList = ['Nested Item 1', 'Nested Item 2'];
let nestedArrayOfItems = ['Example of a nested list', innerList];

pdfDoc.list(nestedArrayOfItems);

//fontes

pdfDoc.font('ZapfDingbats').text('This is a symbolic font.');
pdfDoc.font('Times-Roman').fontSize(25).fillColor('blue').text('You can set a color for any font');
pdfDoc.font('Courier').fontSize(5).fillColor('black').text('Some text to demonstrate.');

//imagem
// pdfDoc.text('By default, the image is loaded in its full size:')
// pdfDoc.image('raspberries.jpg');

// pdfDoc.moveDown(0.5)
// pdfDoc.text('Scaled to fit width and height')
// pdfDoc.image('raspberries.jpg', {width: 150, height: 150});

// pdfDoc.moveDown(0.5)
// pdfDoc.text('Scaled to fit width')
// pdfDoc.image('raspberries.jpg', {width: 150});
pdfDoc.end();