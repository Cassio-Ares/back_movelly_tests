export class NotFoundError extends Error{
    readonly message: string;
    readonly statusCode: number
    readonly reason?: string

    constructor(message: string, statusCode: number, reason?: string) {
        super()
        this.message = message;
        this.statusCode = statusCode;
        this.reason = reason;
    }
}

/**
 * Criamos uma classe para trabalhar
 *  com erros dentro do express-async-error
 * 
 * dai onde eu quiser usar este erro é só chamar:
 * 
 * throw new NotFoundError("not found ...", 404)
 */