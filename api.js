const fetch = require("node-fetch");
const chalk = require("chalk");

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
    /* paradasMetro(linea.properties.CODI_LINIA); */
  } else {
    console.log(chalk.red.bold(`No existe la línea ${nombreLinea}`));
    process.exit(1);
  }
};

module.exports = {
  comprobarLinea,
};

/* const paradasMetro = async (codiLinia) => {
  const response = await fetch(
    `https://api.tmb.cat/v1/transit/linies/metro/${codiLinia}/estacions?app_id=8ffe77b2&app_key=757c681387f95c390038e1e559ebe747`
  );
  const paradas = await response.json();
  paradas.features.forEach((parada) => {
    console.log(parada.properties.NOM_ESTACIO);
  });
};

comprobarLinea("L2"); */
