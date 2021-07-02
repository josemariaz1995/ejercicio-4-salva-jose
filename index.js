const fs = require("fs");
const { comprobarLinea } = require("./api");
const { preguntas } = require("./datos/preguntas");

const inquirer = require("inquirer");
const { program } = require("commander");

program
  .option("--color <color>", "Elige un color")
  .option("--abrev", "Quieres las lineas abreviadas?");

program.parse();
const { color } = program.opts();
let colorUsuario;
if (!color) {
  colorUsuario = "";
} else {
  colorUsuario = process.argv[2].split("=")[1];
}
inquirer.prompt(preguntas).then((response) => {
  comprobarLinea(response.linia, colorUsuario);

  fs.writeFile(
    "./datos/adjunto.txt",
    JSON.stringify({ ...response }),
    (err) => {
      if (err) {
        console.log("no se a podido generar el archivo adjunto");
        return;
      }
    }
  );
});
