import React from "react";
import { Switch, Route } from "react-router-dom";
import { DashbaordLayout } from "./layout/DashboardLayout";
import { BrowserRouter as Router } from "react-router-dom";
import { EventsPage } from "./pages/eventsPage";
import { EventDetailsPage } from "./pages/eventDetailsPage";

function App() {
    return (
        <Router>
            <DashbaordLayout>
                <Switch>
                    <Route path="/event/:uuid" strict>
                        <EventDetailsPage />
                    </Route>
                    <Route>
                        <EventsPage />
                    </Route>
                </Switch>
            </DashbaordLayout>
        </Router>
    );
}

export default App;
