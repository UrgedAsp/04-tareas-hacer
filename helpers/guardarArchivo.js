import fs from "fs";
const archivo = "./db/data.json";

const guardarDB = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};

const leerDB = () => {
  if (!fs.existsSync(archivo)) return null;
  const info = JSON.parse(fs.readFileSync(archivo, { encoding: "utf-8" }));
  return info;
};

export { guardarDB, leerDB };
