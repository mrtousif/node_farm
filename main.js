const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");
//------------------------------------------------------
// FILES
// synchronous code
// const readText = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(readText)

// const writeText = `Food: ${readText}`

// fs.writeFileSync('./txt/output.txt', writeText)

// asynchronous code callback hell
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             fs.writeFile(`./txt/final.txt`, `${data2}\n\n${data3}`, (err) => {
//                 console.log(`file is written`)
//             })
//         })
//     })
// })
// console.log('Reading files...')

//------------------------------------------------------
const overviewPage = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/cardTemplate.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const arrObjects = JSON.parse(data);

const slug = arrObjects.map(el =>
  slugify(el.productName, {
    replacement: "-", // replace spaces with replacement
    remove: null, // regex to remove characters
    lower: true // result in lower case
  })
);

// SERVER
const server = http.createServer((request, response) => {
  const { query, pathname } = url.parse(request.url);

  // overview page
  if (pathname === "/" || pathname === "/overview") {
    response.writeHead(200, {
      "Content-type": "text/html"
    });
    // array to string
    const cardsHtml = arrObjects
      .map(element => replaceTemplate(cardTemplate, element))
      .join("");
    const output = overviewPage.replace(/%product-card%/g, cardsHtml);
    response.end(output);

    // product page
  } else if (pathname === "/product") {
    response.writeHead(200, {
      "Content-type": "text/html"
    });
    // extracting id from the query
    let id = parseInt(query.split("=").pop());

    const output = replaceTemplate(productTemplate, arrObjects[id]);
    response.end(output);

    // api page
  } else if (pathname === "/api") {
    response.writeHead(200, {
      "Content-type": "application/json"
    });
    response.end(data);

    // not found
  } else {
    response.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "something"
    });
    response.end("<h1> Page not found </h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening at port 8000");
});
