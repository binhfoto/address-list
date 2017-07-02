import React, {PropTypes} from "react";
import Card from "material-ui/Card";
import {body} from "../style";
import injectTapEventPlugin from "react-tap-event-plugin";

const Layout = ({children}) => {
    return (
        <div style={body}>
            <div>
                <Card style={{width: '1200px', height: '600px'}}>
                    {children}
                </Card>
            </div>
        </div>
    );
};

/*Layout.componentDidMount = () => {
    injectTapEventPlugin();
};*/

injectTapEventPlugin();

export default Layout;