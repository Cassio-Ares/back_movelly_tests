import { Response } from "express";

export let responseFakeJsonResult: any;

export const responseFake = {
    status: (code: number) => responseFake,
    json: (data: any)=> {
        responseFakeJsonResult = data; 
        return responseFake;
    }, 
}as Response;

/**
 * Para testar list eu crio um responseFakeJsonResult que retorna um [] 
 * e o chamo no test
 */

// Versão em class da função acima

export class ClassResponseFake{
    public jsonResult: any //responseFakeJsonResult

    public status(code: number){
      return this;
    }

    public json(data: any){
        this.jsonResult = data; 
        return this;
    }
}