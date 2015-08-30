module Typejector.Component.Metadata {

    export class SingletonMetadata implements Metadata {
        name: string = SingletonMetadata.NAME;
        value: boolean = true;
    }
    export module SingletonMetadata {
        export const NAME = "singleton";

        export function test(items: Array<Metadata>): boolean {
            return items.some((val) => val.name === NAME);
        }
    }
}  