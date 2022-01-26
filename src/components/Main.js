import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {

    const [people, setPeople] = useState(null)

    const URL = "http://localhost:4000/people/";
    
    // fetch people data from backend
    const getPeople = async () => {
        const response = await fetch(URL);
        const data = await response.json(); // console.log(response.json);
        setPeople(data);
    }

    // Create people using fetch
    const createPeople = async (person) => {

        await fetch (URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify(person),
        });
        // Update list of people
        getPeople();

    };

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route
                    path="/people/:id"
                    render={(rp) => (
                        <Show
                            {...rp}
                        />
                    )}
                />
            </Switch>
        </main>
    );
}

export default Main;