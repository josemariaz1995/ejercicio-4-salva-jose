const inquirer = require("inquirer");
const { program } = require("commander");

program
  .options("--color <color>", "Eligue un color")
  .options("--abrev <abreviatura>", "Quieres las lineas abreviadas?");

inquirer
  .prompt([
    {
      name: "transporte",
      message: "¿Qué tipo de transporte quiere consultar?",
      type: "list",
      choices: ["Metro", "Bus"],
    },
    {
      name: "informacion",
      message: "¿Qué información extra quiere obtener de cada parada?",
      type: "checkbox",
      choices: [
        {
          name: "Coordenadas",
        },
        {
          name: "Fecha de inauguración",
        },
      ],
      when: (respuestaAnterior) => respuestaAnterior.transporte === "Metro",
    },
    {
      name: "confirmar",
      type: "confirm",
      default: "Yes",
      message: "¿Quiere que le informemos de los errores?",
      when: (respuestaAnterior) => respuestaAnterior.transporte === "Metro",
    },
    {
      name: "linia",
      type: "input",
      message: "¿Qué línea quiere consultar?",
      when: (respuestaAnterior) => respuestaAnterior.transporte === "Metro",
    },
  ])
  .then((response) => console.log(response));
