const fetch = require("node-fetch");
const chalk = require("chalk");
const inquirer = require("inquirer");
const nodemailer = require("nodemailer");

let abrev;
const informacion = ["Coordenadas", "Fecha de inauguración"];
const comprobarLinea = async (nombreLinea, colorLinea) => {
  const response = await fetch(
    "https://api.tmb.cat/v1/transit/linies/metro?app_id=8ffe77b2&app_key=757c681387f95c390038e1e559ebe747"
  );
  const lineas = await response.json();
  const { features } = lineas;
  const linea = features.find(
    (linea) => linea.properties.NOM_LINIA === nombreLinea
  );
  if (linea) {
    if (colorLinea) {
      console.log(
        chalk.hex(colorLinea)(`${nombreLinea}: ${linea.properties.DESC_LINIA}`)
      );
    } else {
      console.log(
        chalk.hex(linea.properties.COLOR_LINIA)(
          `${nombreLinea}: ${linea.properties.DESC_LINIA}`
        )
      );
    }
    paradasMetro(linea.properties.CODI_LINIA);
  } else {
    console.log(chalk.red.bold(`No existe la línea ${nombreLinea}`));
    process.exit(1);
  }
};

const paradasMetro = async (codiLinia) => {
  const response = await fetch(
    `https://api.tmb.cat/v1/transit/linies/metro/${codiLinia}/estacions?app_id=8ffe77b2&app_key=757c681387f95c390038e1e559ebe747`
  );
  const paradas = await response.json();
  paradas.features.forEach((parada) => {
    if (abrev) {
      const paradaAbreviada = parada.properties.NOM_ESTACIO.substring(0, 3);
      console.log(`${paradaAbreviada}.`);
    } else if (!abrev) {
      console.log(parada.properties.NOM_ESTACIO);
    }
    const editedFecha = parada.properties.DATA_INAUGURACIO.slice(0, -1);
    if (informacion.some((element) => element === "Fecha de inauguración")) {
      console.log(`${editedFecha}`);
    }
    if (informacion.some((element) => element === "Coordenadas")) {
      parada.geometry.coordinates.forEach((coordenada) => {
        console.log(`${coordenada}`);
      });
    }
  });
  /* preguntarEmail(); */
};

/* const preguntarEmail = () => {
  inquirer
    .prompt([
      {
        name: "confirmar",
        type: "confirm",
        default: "Yes",
        message: "¿Quiere que le enviemos las paradas por email?",
      },
      {
        name: "email",
        type: "input",
        message: "Escriba su email por favor:",
        when: (respuestaAnterior) => respuestaAnterior.confirmar === true,
      },
    ])
    .then((response) => {
      console.log(`Hola ${response.confirmar}`);
      if (response.confirmar) {
        console.log(`Hola ${response.email}`);

        const transport = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: "pearline84@ethereal.email",
            pass: "1xEYbWnRpK8yR9JedJ",
          },
        });

        const mensaje = {
          from: "remitente@email.com",
          to: "destinatario@email.com",
          subject: "Correo electrónico de prueba",
          html: "<h1>Probando esto de enviar correos desde <strong>Node.js</strong></h1>",
        };

        transport.sendMail(mensaje, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });
      }
    });
}; */

/* comprobarLinea("L2"); */
module.exports = {
  comprobarLinea,
  paradasMetro,
};
