import React, { useEffect, useState } from "react";

import axios from "axios";
import { navigate, Link } from "@reach/router";


const Pet = (props) => {

    const [pet, setPet] = useState(null);


    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pets/" + props.id)
            .then((res) => {
                setPet(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }, [props.id])

    const handleDelete = () => {
        axios
            .delete("http://localhost:8000/api/pets/" + pet._id)
            .then((res) => {
                navigate("/pets");
            })
            .catch((err) => {
                console.log(err);
            });
    };



    if(pet === null) {
        return "Loading...";
    }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1>Pet Shelter</h1>
                <Link to="/pets"><span style={{textDecoration: "underline"}}>back to home</span></Link>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h3>Details about: {pet.name}</h3>
                <button onClick={(event) => {
                    handleDelete();
                }}
                className="btn btn-sm btn-outline-danger"
                >Adopt {pet.name}</button>
            </div>
            <div style={{outline: "solid black 1px", paddingLeft: "10px", marginTop: "10px"}}>
                <p>Pet type: {pet.type}</p>
                <p>Description: {pet.description}</p>
                <div style={{display: "flex"}}>
                    <p>Skills: </p>
                    <ul>
                        <li style={{listStyleType: "none"}}>{pet.skill_1}</li>
                        <li style={{listStyleType: "none"}}>{pet.skill_2}</li>
                        <li style={{listStyleType: "none"}}>{pet.skill_3}</li>
                    </ul>
                </div>
            </div>
        </div>

    )

}

export default Pet;