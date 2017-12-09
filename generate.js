const generateBMFont  = require('msdf-bmfont');
const fs              = require('fs');
const path            = require('path');
const colors          = require('colors');

var args = process.argv.slice(2);
if (args.length < 2) {
  return console.log('Wrong arguments: must be [path_to_font] [name]'.red);
}

let pathToFont = args[0], name = args[1];

// Generate MSDF font..
const options = {
  charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijklmnopqrstuvwxyz0123456789éàèäöüÄÖÜ,.;:-_()+*ç%&/\=<>!$£°§ ',
};
generateBMFont(path.join(pathToFont, `${name}.ttf`), options, (err, textures, font) => {
  if (err) {
    return console.log(`Error on ${name}`, err);
  };

  // Create png
  textures.forEach((sheet, index) => {
    font.pages.push(`${name}png`);
    fs.writeFile(path.join(pathToFont,`${name}.png`), sheet, (err) => {
      if (err) {
        return console.log(`Error on ${name}`, err);
      };
    });
  });

  // Write JSON
  fs.writeFile(path.join(pathToFont,`${name}.json`), JSON.stringify(font), (err) => {
    if (err) {
      return console.log(`Error on ${name}`, err);
    };
    console.log(`${name} - OK`.green);
  });
});
