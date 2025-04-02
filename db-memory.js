import { randomUUID } from "crypto";

export class DbMemory{
    #fotos = new Map();

    list(search){
        return Array.from(this.#fotos.entries())
        .map((foto ) =>{
            const id = fotoArray[0];
            const data = fotoArray[1];
            
            return {
                id,
                ... data,
            }
        })
        .filter(foto =>{
            if(search){
                return foto.descricao.includes(search)
            }
        })
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