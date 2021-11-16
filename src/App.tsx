import React, {lazy, Suspense} from 'react';
import './App.scss';
import {Redirect, Route, Switch} from "react-router-dom";
import {Preloader} from "./common/Preloader/Preloader";
import {Dashboard} from "./components/Dashboard/Dashboard";


const Finalize = lazy(() => import('./components/Finalize/Finalize'));
const Result = lazy(() => import('./components/Result/Result'));

function App() {
    return (
            <div className="container">
                <Suspense fallback={<Preloader/>}>
                    <Switch>
                        <Route path='/' exact render={() => <Redirect to={'dashboard'}/>}/>
                        <Route path='/dashboard' render={() => <Dashboard/>}/>
                        <Route path='/result/:id' render={() => <Result/>}/>
                        <Route path='/finalize/:id' render={() => <Finalize/>}/>
                    </Switch>
                </Suspense>
            </div>
    );
}

export default App;
