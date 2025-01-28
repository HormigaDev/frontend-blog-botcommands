import { HttpException } from '@/types/HttpException';
import { notify } from '@/utils/notify';

const host = 'http://localhost:3000';

export class Http {
    private host: string;

    constructor(host: string) {
        this.host = host;
    }

    private async gd(
        endpoint: string,
        options?: Record<string, unknown>,
        method: 'GET' | 'DELETE' = 'GET',
    ) {
        const params = new URLSearchParams();

        if (options) {
            for (const key of Object.keys(options)) {
                if (
                    options[key] !== null &&
                    typeof options[key] === 'object' &&
                    !Array.isArray(options[key])
                ) {
                    for (const k of Object.keys(options[key] as Record<string, unknown>)) {
                        const element = options[key] as Record<string, unknown>;
                        params.append(`${key}[${k}]`, JSON.stringify(element[k]));
                    }
                } else {
                    params.append(key, JSON.stringify(options[key]));
                }
            }
        }

        const res = await fetch(
            `${this.host}${endpoint}${options ? '?' + params.toString() : ''}`,
            {
                method,
                credentials: 'include',
            },
        );

        await this.handleResponse(res);

        if (res.status === 204) {
            return { status: 204 };
        } else {
            const json = await res.json();
            json.status = res.status;
            return json;
        }
    }

    private async pp(endpoint: string, data: unknown | FormData, method: 'POST' | 'PUT' = 'POST') {
        const body = data instanceof FormData ? data : JSON.stringify(data);
        const options: RequestInit = {
            method,
            body,
            credentials: 'include',
        };
        if (!(body instanceof FormData)) {
            options.headers = {
                'Content-Type': 'application/json',
            };
        }
        const res = await fetch(this.host + endpoint, options);

        await this.handleResponse(res);

        if (res.status === 204) {
            return { status: 204 };
        } else {
            const json = await res.json();
            json.status = res.status;
            return json;
        }
    }

    private async handleResponse(response: Response) {
        const errorStatus = [400, 401, 403, 409, 404, 500, 501];
        if (!response.ok) {
            const json = await response.json();
            if (!errorStatus.includes(response.status)) {
                throw new Error('Unknown error:' + json.message);
            } else {
                throw new HttpException(json.message, response.status);
            }
        }
    }

    async get(endpoint: string, options?: Record<string, unknown>) {
        return await this.gd(endpoint, options);
    }

    async post(endpoint: string, body: unknown | FormData = {}) {
        return await this.pp(endpoint, body, 'POST');
    }

    async put(endpoint: string, body: Record<string, unknown> | FormData) {
        return await this.pp(endpoint, body, 'PUT');
    }

    async delete(endpoint: string, options?: Record<string, unknown>) {
        return await this.gd(endpoint, options, 'DELETE');
    }

    handleError(error: unknown) {
        if (error instanceof HttpException) {
            notify({ message: error.message, type: 'error' });
        } else {
            notify({ message: 'Ocurrió un error inesperado', type: 'error' });
            console.log(error);
        }
    }
}

export const http = new Http(host);
