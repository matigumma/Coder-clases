// Hands on Lab en clase
const fs = require("fs");
const path = "./usuarios.json";

class ManagerUsuario {
  async crearUsuario(usuario) {
    try {
      const usuarioArchivados = await this.consultarUsuarios(); // para poder modificar el arreglo del archivo tengo que traerlo completo y sobreescribirlo
      usuarioArchivados.push(usuario);
      await fs.promises.writeFile(path, JSON.stringify(usuarioArchivados));
    } catch (error) {
      console.log(error);
    }
  }
  async consultarUsuarios() {
    try {
      if (fs.existsSync(path)) {
        const usuario = await fs.promises.readFile(path, "utf-8");
        const usuariosJSON = JSON.parse(usuario);
        return usuariosJSON;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const manager = new ManagerUsuario();
const usuario = {
  nombre: "Ramiro",
  apellido: "Gumma",
  edad: "23",
  iq: 221,
};
const usuario2 = {
  nombre: "Josefina",
  apellido: "Ritter",
  edad: "22",
  iq: 230,
};

async function prueba() {
  const consultarUsuarios = await manager.consultarUsuarios();
  // await manager.crearUsuario(usuario2);
  console.log(consultarUsuarios);
}

prueba();
