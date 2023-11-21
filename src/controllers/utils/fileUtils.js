// fileUtils.js
const fs = require('fs').promises;

// Métodos de utilidad para la lectura y escritura de archivos
const readFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    throw new Error(`Error al leer el archivo ${filePath}: ${error.message}`);
  }
};

const writeFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, data, 'utf8');
  } catch (error) {
    throw new Error(`Error al escribir en el archivo ${filePath}: ${error.message}`);
  }
};

// Exportar métodos de utilidad
module.exports = {
  readFile,
  writeFile,
};
