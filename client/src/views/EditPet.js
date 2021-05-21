
import React, { useEffect, useState } from "react";

import { navigate, Link } from "@reach/router";
import axios from "axios";
import Pet from "./Pet";


const EditPet = (props) => {

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skill_1, setSkill_1] = useState("");
    const [skill_2, setSkill_2] = useState("");
    const [skill_3, setSkill_3] = useState("");
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pets/" + props.id)
            .then((res) => {
                setName(res.data.name);
                setType(res.data.type);
                setDescription(res.data.description);
                setSkill_1(res.data.skill_1);
                setSkill_2(res.data.skill_2);
                setSkill_3(res.data.skill_3);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.id])

    const handleEditPetSubmit = (event) => {
        event.preventDefault();

        const editedPet = {
            name,
            type,
            description,
            skill_1,
            skill_2,
            skill_3
        }

        axios
            .put("http://localhost:8000/api/pets/" + props.id,
            editedPet)
            .then((res) => {
                console.log("edit pet response: ", res);
                navigate(`/pets/${props.id}`);
            })
            .catch((err) => {
                setErrors(err.response?.data?.errors);
            });
    };


    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1>Pet Shelter</h1>
                <Link to="/pets"><span style={{textDecoration: "underline"}}>back to home</span></Link>
            </div>
            <h3>Edit {name}</h3>
            <form onSubmit={(event) => {
                handleEditPetSubmit(event)
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
                    value={name}
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
                    value={type}
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
                    value={description}
                    />
                </div>

                <h5>Skills optional:</h5>
                <div>
                    <label>Skill 1: </label>
                    <input onChange={(event) => {
                        setSkill_1(event.target.value)
                    }}
                    type="text"
                    value={skill_1}
                    />
                </div>
                <div>
                    <label>Skill 2: </label>
                    <input onChange={(event) => {
                        setSkill_2(event.target.value)
                    }}
                    type="text"
                    value={skill_2}
                    />
                </div>
                <div>
                    <label>Skill 3: </label>
                    <input onChange={(event) => {
                        setSkill_3(event.target.value)
                    }}
                    type="text"
                    value={skill_3}
                    />
                </div>
                <button className="btn btn-sm btn-outline-primary">Edit Pet</button>
            </form>
        </div>
    )
}

export default EditPet;