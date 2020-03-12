import React, { ComponentType } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import { ROUTES } from './routes';
import RootStore from "../stores/RootStore";
import {Roles} from "../stores/helpers/roles";

const { user } = RootStore;

interface PrivateRouterProps {
    component: ComponentType<any>;
    roles?: Roles[];
    // computedMatch?: any;
    [name: string]: unknown;
}

@observer
class PrivateRouter extends React.Component<PrivateRouterProps> {
    render() {
        const { component: Component, roles, computedMatch, ...rest } = this.props;
        // const key =
        //     computedMatch && computedMatch.params && computedMatch.params.id;
        const access =
            user.authenticated &&
            (!roles || roles.some(role => RootStore.user.roles.includes(role)));

        return (
            <Route
                {...rest}
                render={props =>
                    access ? (
                        <Component  {...props} /> //key={key}
                    ) : (
                        <Redirect to={ROUTES.users.login}/>
                    )
                }
            />
        );
    }
}

export default PrivateRouter;