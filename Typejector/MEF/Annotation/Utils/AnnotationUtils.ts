namespace Typejector.Annotation.Utils {
    import ArrayUtils = Typejector.Util.ArrayUtils;
    import BeanNameGenerator = Typejector.Component.Factory.Support.BeanNameGenerator;
    export class AnnotationUtils {
        private static ANNOTATION_KEY = "design:annotation";
        private static ANNOTATION_DATA_KEY = "design:annotation:";

        public static add(annotation:any, annotationData:any, target:Object);
        public static add(annotation:any, annotationData:any, target:Object, targetKey:string | symbol);
        public static add(annotation:any, annotationData:any, target:Object, targetKey?:string | symbol) {
            let metadataValue:Array = Reflect.getMetadata(AnnotationUtils.ANNOTATION_KEY, target, targetKey);

            metadataValue = metadataValue == undefined ? [] : metadataValue;

            if (!ArrayUtils.contains(metadataValue, annotation)) {
                metadataValue.push(annotation);
            }

            Reflect.defineMetadata(AnnotationUtils.ANNOTATION_DATA_KEY + BeanNameGenerator.generateBeanName(annotation),
                annotationData, targetKey);
        }
    }
}
