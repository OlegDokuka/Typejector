module Typejector.Type {
    export type Class = {
        new (): any;
        new (...args:any[]): any;
    };
} 