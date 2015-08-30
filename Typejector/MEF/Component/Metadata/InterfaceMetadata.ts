module Typejector.Component.Metadata {

    export class InterfaceMetadata implements Metadata {
        name: string = InterfaceMetadata.NAME;
        value: boolean = true;
    }

    export module InterfaceMetadata {
        export const NAME = "interface";

        export function test(items: Array<Metadata>): boolean {
            return items.some((val) => val.name === NAME);
        }
    }
}  