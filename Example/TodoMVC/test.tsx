///<reference path="../../typings/main.d.ts"/>

interface Props {
    foo: string;
    onClick: React.EventHandler<React.MouseEvent>
}

function test():any{
    
}

class MyComponent extends React.Component<Props, {}> {
    render() {
        return <span onClick={this.props.onClick}>{this.props.foo}</span>
    }
}


ReactDOM.render( (<MyComponent onClick={test} foo="test"/>), document.body);