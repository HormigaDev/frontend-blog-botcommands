export class HttpException extends Error {
    statusCode: number;
    constructor(message: string | Record<string, unknown>, statusCode?: number) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        }
        super(message);

        this.name = 'HttpException';
        this.statusCode = statusCode as number;
    }
}
