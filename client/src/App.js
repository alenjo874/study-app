import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import StudySessions from "./components/StudySessions";
import CreateSession from "./components/CreateSession";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/studysessions">
          <StudySessions />
        </Route>
        <Route path="/createsession">
          <CreateSession />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
