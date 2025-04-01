import { randomUUID } from "crypto";

export class DbMemory{
    #fotos = new Map();

    list(){
        return Array.from(this.#fotos.values());
    }

    create(foto){

        const fotoId = randomUUID();
        this.#fotos.set(fotoId, foto);
    }

    update(id, foto){
        this.#fotos.set( id, foto);
    }

    delete(id){
        this.#fotos.delete(id);
    }

}