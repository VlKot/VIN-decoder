import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Home } from './components/Home';
import { VehicleVariables } from './components/VehicleVariables';

export default function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">VIN decoder</Link>
                    </li>
                    <li>
                        <Link to="/variables">Vehicle variables</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path="/variables/:id?" component={VehicleVariables} />
                <Route path="/:id?" component={Home} />
            </Switch>
        </Router>
    );
}

