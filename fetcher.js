const request = require('request');
const readline = require('readline');
let rl = readline.createInterface(process.stdin, process.stdout);
const fs = require('fs');
const fetchData = () => {
  const args = process.argv.slice(2);
  const domain = args[0];
  const destination = args[1];

  request(domain, (error, response, body) => {
    if (error) {
      console.log(error);
      process.exit();
    }
  }).on('data', (data) => {
    userInput(data, destination);
  });
}

const userInput = (data, path) => {
  fs.readFile(path, (err, file) => {
    if (err) {
      console.log(err);
      process.exit();
    }
    if (file.length !== 0) {
      rl.question('File already exists, overwrite the file? (y/n)', (answer) => {
        if (answer === 'y') {
          writeFile(data, path);
        } else if (answer === 'n') {
          console.log('Exit.');
          process.exit();
        }
      });
    } else {
      writeFile(data, path);
    }
  })
}

const writeFile = (data, path) => {
  fs.writeFile(path, data, (err) => {
    if (err) console.log(err);
    console.log(`Downloaded and saved ${data.length} bytes to ${path}`);
    process.exit();
  })
}

fetchData();