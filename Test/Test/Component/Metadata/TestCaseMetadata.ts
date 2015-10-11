module Typejector.Test.Component.Metadata {
    import Metadata = Typejector.Component.Metadata.Metadata;

    export class TestCaseMetadata implements Metadata {
        name: string = TestCaseMetadata.NAME;
        value: boolean = true;
    }

    export module TestCaseMetadata {
        export const NAME = "testCase";

        export function test(items: Array<Metadata>): boolean {
            return items.some((val) => val.name === NAME);
        }
    }
}  