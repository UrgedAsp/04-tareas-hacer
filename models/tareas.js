import { Tarea } from "./tarea.js";

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((uid) => {
      const tarea = this._listado[uid];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas) {
    for (const tarea of tareas) {
      this._listado[tarea.id] = tarea;
    }
  }

  crearTarea(desc) {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, index) => {
      const idx = `${index + 1}.`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      console.log(`${idx} ${desc} :: ${estado}\n`);
    });
  }

  listarPendientesCompletadas(completadas) {
    console.log();
    let contador = 0;
    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      if (completadas) {
        if (completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${completadoEn}\n`);
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${estado}\n`);
        }
      }
    });
  }

  toggleCompletadas(ids) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

export { Tareas };
