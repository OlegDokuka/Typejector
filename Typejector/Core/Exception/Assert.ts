namespace Typejector.Exception {
    export class IllegalArgumentException implements Error {
        name: string = "IllegalArgumentException";
        message: string = "Argument cannot be null";
        prototype: Error = new Error;

        constructor(message?: string) {
            this.message = message ? message : this.message;
        }
    }

    export function assert(object: any, message?: string): void {
        if (object == undefined) {
            throw new IllegalArgumentException(message);
        }
    }
}

function assert(object: any, message?: string) {
    Typejector.Exception.assert(object, message);
}