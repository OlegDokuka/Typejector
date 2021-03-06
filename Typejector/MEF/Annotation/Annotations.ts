namespace Typejector.Annotation {
    import Collections = Typejector.Util.Collections;
    import BeanNameGenerator = Typejector.Component.Factory.Support.BeanNameGenerator;
    //ToDo: Params Annotation
    export class Annotations {
        public static ANNOTATION_KEY = "design:annotation";
        private static ANNOTATION_DATA_KEY = "design:annotation:";

        public static add(annotation: any, annotationData: any, target: Object);
        public static add(annotation: any, annotationData: any, target: Object, targetKey: string | symbol);
        public static add(annotation: any, annotationData: any, target: Object, targetKey: string | symbol, paramIndex: number);
        public static add(annotation: any, annotationData: any, target: Object, targetKey?: string | symbol, paramIndex?: number) {
            let metadataValue: Array<any> = Reflect.getMetadata(
                Annotations.ANNOTATION_KEY,
                target,
                targetKey = paramIndex == undefined ? targetKey : `${targetKey}$${paramIndex}`
            );
            //todo introduce optional class
            metadataValue = metadataValue == undefined ? [] : metadataValue;

            if (!Collections.contains(metadataValue, annotation)) {
                metadataValue.push(annotation);
            }

            Reflect.defineMetadata(Annotations.ANNOTATION_DATA_KEY + BeanNameGenerator.generateBeanName(annotation),
                annotationData, target, targetKey);
            Reflect.defineMetadata(Annotations.ANNOTATION_KEY, metadataValue, target, targetKey);

            return Annotations;
        }

        public static get(target: Object): Map<any, any>;
        public static get(target: Object, targetKey: string | symbol): Map<any, any>;
        public static get(target: Object, targetKey: string | symbol, paramIndex: number): Map<any, any>;
        public static get(target: Object, targetKey?: string | symbol, paramIndex?: number): Map<any, any> {
            const result: Map<any, any> = new Map<any, any>();
            const metadataValue: Array<any> = Reflect.getMetadata(
                Annotations.ANNOTATION_KEY,
                target,
                targetKey = paramIndex == undefined ? targetKey : `${targetKey}$${paramIndex}`
            );

            if (metadataValue) {
                metadataValue.forEach(annotation => result.set(annotation, Reflect.getMetadata(
                    Annotations.ANNOTATION_DATA_KEY + BeanNameGenerator.generateBeanName(annotation), target, targetKey))
                );
            }

            return result;
        }
    }
}
