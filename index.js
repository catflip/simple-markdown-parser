const fs = require("fs"); // untuk membaca file, mengkonversi ke stream
const readline = require("readline"); // digunakan untuk membaca file line by line
const http = require("http");

const PORT = 3088;
const lineReader = readline.createInterface({
  input: fs.createReadStream('./README.md') // baca file 
});

// gunakan regex untuk mencocokan token Markdown
// regex dibawah adalah regex untuk link tag contoh: [ini](https://adalah.link)
const linkTagRegex = /\[([^\]]+)\][^\)]+\)/g;

let HTML = "";

// baca dan proses file per baris
lineReader
  .on("line", function (line) {
    parseLine(line);
  })
  .on("close", function () {
    // setelah selesai memparse semua line markdown,
    // serve sebagai HTML
    const result = generateValidHTML(HTML);
    http
      .createServer((request, response) => {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write(result);
        response.end();
      })
      .listen(PORT, () => console.log(`Server listen at port ${PORT}`));
  });

// fungsi ini berguna untuk merubah setiap line yang
// masuk menjadi file HTML
// untuk melihat beberapa aturan markdown bisa gunakan ini https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
// ingat buatlah dengan hasil semirip mungkin dengan https://maxsol-test-parser.glitch.me
function parseLine(line) {
  console.log(`line :`, line)
}
// beberapa aturan & tips
// - gunakan regex
// - jangan gunakan library parser :'( ini hanya test saja, silahkan manfaatkan core library node.js dan javascript!
// - Make it work then make it beautifull
// - Semangat! jikalau ada yang ditanyakan bisa langsung kontak Team Maxsol.id

function generateValidHTML(html) {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title> simple markdown parser </title>
        <head>
      <body>
        ${html}
      </body>
      </html>
    `;
}

// THANKS, created by - mandaputtra
