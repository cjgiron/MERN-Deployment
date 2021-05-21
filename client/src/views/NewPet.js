import React, { useState } from "react";

import { navigate, Link } from "@reach/router";
import axios from "axios";

const NewPet = (props) => {

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skill_1, setSkill_1] = useState("");
    const [skill_2, setSkill_2] = useState("");
    const [skill_3, setSkill_3] = useState("");
    const [errors, setErrors] = useState(null);


    const handleNewPetSubmit = (event) => {
        event.preventDefault();

        const newPet = {
            name,
            type,
            description,
            skill_1,
            skill_2,
            skill_3
        };

        axios
            .post("http://localhost:8000/api/pets", newPet)
            .then((res) => {
                console.log("new pet response", res);
                navigate("/pets")
            })
            .catch((err) => {
                setErrors(err.response?.data?.errors)
                console.log(err.response)
            })
    }


    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1>Pet Shelter</h1>
                <Link to="/pets"><span style={{textDecoration: "underline"}}>back to home</span></Link>
            </div>
            <h3>Know a pet needing a home?</h3>
            <form onSubmit={(event) => {
                handleNewPetSubmit(event)
            }}
            style={{outline: "solid black 1px", padding:"10px"}}
            >
                <div>
                    <label>Pet Name: </label>
                    {errors?.name && (
                        <span className="text-danger"> - {errors?.name?.message}</span>
                    )}
                    <input onChange={(event) => {
                        setName(event.target.value);
                    }}
                    type="text"
                    />
                </div>
                <div>
                    <label>Pet Type: </label>
                    {errors?.type && (
                        <span className="text-danger"> - {errors?.type?.message}</span>
                    )}
                    <input onChange={(event) => {
                        setType(event.target.value);
                    }}
                    type="text"
                    />
                </div>
                <div>
                    <label>Pet Description: </label>
                    {errors?.description && (
                        <span className="text-danger"> - {errors?.description?.message}</span>
                    )}
                    <input onChange={(event) => {
                        setDescription(event.target.value);
                    }}
                    type="text"
                    />
                </div>

                <h5>Skills optional:</h5>
                <div>
                    <label>Skill 1: </label>
                    <input onChange={(event) => {
                        setSkill_1(event.target.value)
                    }}
                    type="text"
                    />
                </div>
                <div>
                    <label>Skill 2: </label>
                    <input onChange={(event) => {
                        setSkill_2(event.target.value)
                    }}
                    type="text"
                    />
                </div>
                <div>
                    <label>Skill 3: </label>
                    <input onChange={(event) => {
                        setSkill_3(event.target.value)
                    }}
                    type="text"
                    />
                </div>
                <button className="btn btn-sm btn-outline-primary">Add Pet</button>
            </form>

        </div>
    )

}

export default NewPet;