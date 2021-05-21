
import React, { useEffect, useState } from "react";

import { Link } from "@reach/router";
import axios from "axios";

const AllPets = (props) => {

    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pets")
            .then((res) => {
                setPets(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const sortArray = (event) => {
        event.preventDefault();

        const sorted = [...pets].sort((a, b) => a.type.localeCompare(b.type));
        console.log("these pets are sorted: ", sorted);
        setPets(sorted);
    }


    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1>Pet Shelter</h1>
                <Link to={`/pets/new`}><span style={{textDecoration: "underline"}}>add a pet to the shelter</span></Link>
            </div>
            <h3>These pets are looking for a good home</h3>
            <button onClick={(event) => {
                sortArray(event)
            }}>Sort pets by type</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet) => {
                        return (
                            <tr key={pet._id}>
                                <td>{pet.name}</td>
                                <td>{pet.type}</td>
                                <td>
                                    <Link to={`/pets/${pet._id}`}>details</Link>
                                    |
                                    <Link to={`/pets/${pet._id}/edit`}>edit</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )

}

export default AllPets;