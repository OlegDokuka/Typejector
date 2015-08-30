///<reference path="MEF/Typejector"/>

import injection = Typejector.Annotation.injection;
import inject = Typejector.Annotation.inject;
import interface = Typejector.Annotation.interface;
import singleton = Typejector.Annotation.singleton;

@interface
class Qwe {
    qwe = undefined;
}
@injection
class Qwer extends Qwe {
    qwer = undefined;
}
@injection
class Qwert extends Qwe {
    qwert = undefined;
}


@interface
class Abc {
    @inject(Array, Qwe)
    qwe: Qwe[] = undefined;

    test( @inject(Qwe) qwe) {
        alert(qwe);
    }
}

var context = Typejector.getContext();

var bean = context.getBean<Abc>(Abc);

bean["ololo"] = "It singletoned";

bean = undefined;

bean = context.getBean<Abc>(Abc);

alert(bean["ololo"]);