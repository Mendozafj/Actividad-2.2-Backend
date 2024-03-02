export class BaseModelo {
    constructor() {
        if (new.target === BaseModelo) {
            throw new TypeError("No se puede instanciar directamente la clase abstracta.");
        }
    }

    static agregar(item) {
        throw new Error("agregar no implementado.");
    }

    static listar() {
        throw new Error("listar no implementado.");
    }

    static buscarPorId(id) {
        throw new Error("buscarPorId no implementado.");
    }

    static actualizar(id, item) {
        throw new Error("actualizar no implementado.");
    }

    static eliminar(id) {
        throw new Error("eliminar no implementado.");
    }

}