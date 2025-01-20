export class HttpException extends Error {
    constructor(message: string | Record<string, unknown>) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        }
        super(message);

        this.name = 'HttpException';
    }
}
