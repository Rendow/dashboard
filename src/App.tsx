import React, {lazy, Suspense } from 'react';
import './App.scss';
import {NavLink, Route} from "react-router-dom";
import {Preloader} from "./common/Preloader/Preloader";
import { Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import {Dashboard} from "./components/Dashboard/Dashboard";


const Finalize = lazy(() => import('./components/Finalize/Finalize'));
const Result = lazy(() => import('./components/Result/Result'));

function App() {
    return (
            <div className="container">
                <div className="container" style={{position: 'absolute',top: '0', marginBottom: '30px'}}>
                    <NavLink to="/">dashboard</NavLink>
                    <NavLink to="/result">result</NavLink>
                    <NavLink to="/finalize">finalize</NavLink>
                </div>
                <Suspense fallback={<Preloader/>}>
                    <Switch>
                        <Route path='/' exact render={() => <Redirect to={'dashboard'}/>}/>
                        <Route path='/dashboard' render={() => <Dashboard/>}/>
                        <Route path='/result' render={() => <Result/>}/>
                        <Route path='/finalize' render={() => <Finalize/>}/>
                    </Switch>
                </Suspense>
            </div>
    );
}

export default App;
