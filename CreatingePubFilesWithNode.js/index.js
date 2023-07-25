//test one creat epub 
// const epub = require('epub-gen')

// const options = {
//     title: "Teste Genival",
//     author: "Auth Genival",
//     output: '.moby-dick.epub',
//     content: [
//         {
//             title: 'oidoiodsidosiod',
//             data: '<p> call oioio djsaijdisjdisjadajsndjsanjdfnasjsfnjsanfjasn</p>'
//         }
//     ]
// }

// new epub(options).promise.then(() => console.log('done'))

const epub = require('epub-gen')
const axios = require('axios')

axios.get('http://www.gutenberg.org/files/2701/2701-0.txt').
  then(res => res.data).
  then(text => {
    text = text.slice(text.indexOf('EXTRACTS.'));
    text = text.slice(text.indexOf('CHAPTER 1.'));

    const lines = text.split('\r\n');
    const content = [];
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i];
      if (line.startsWith('CHAPTER ')) {
        if (content.length) {
          content[content.length - 1].data = content[content.length - 1].data.join('\n');
        }
        content.push({
          title: line,
          data: ['<h2>' + line + '</h2>']
        });
      } else if (line.trim() === '') {
        if (content[content.length - 1].data.length > 1) {
          content[content.length - 1].data.push('</p>');
        }
        content[content.length - 1].data.push('<p>');
      } else {
        content[content.length - 1].data.push(line);
      }
    }

    const options = {
      title: 'Moby-Dick',
      author: 'Herman Melville',
      output: './moby-dick.epub',
      content
    };

    return new epub(options).promise;
  }).
  then(() => console.log('Done'));
