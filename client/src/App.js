import './App.css';
import { Link, Redirect, Router } from "@reach/router";
import AllPets from './views/AllPets';
import NewPet from './views/NewPet';
import Pet from './views/Pet';
import EditPet from './views/EditPet';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
      <Router>
        <EditPet path="/pets/:id/edit"/>
        <Pet path="/pets/:id"/>
        <AllPets path="/pets"/>
        <NewPet path="/pets/new"/>
        <Redirect from="/" to="/pets" noThrow="true"/>
      </Router>
    </div>
  );
}

export default App;
