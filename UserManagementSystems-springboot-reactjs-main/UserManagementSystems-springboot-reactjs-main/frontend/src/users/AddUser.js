import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"

export default function AddUser() {

    let navigate = useNavigate()


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    })


    const { name, username, email } = user

    const onInputChange = (e) => {

       
        setUser({ ...user, [e.target.name]: e.target.value })
      
    };

    const onSubmit = async (data) => {
        console.log(data);
        // data.preventDefault();
        await axios.post('http://localhost:8081/user', data);
        navigate('/');
       
    };
    // const onSubmit = data => console.log(data);
    // const onSubmit= async (e)=> {

    //     e.preventDefault();
    //     await axios.post("http://localhost:8081/user",user)
    //     navigate("/")

    // }

    return (
        <div className="container">
            <div className="container">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

                    <h2 className="text-center m-4">Register User</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">

                            <label htmlFor="Name" className="form-label"> Name</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                name="name"
                                value={name}

                                {...register("name", { required: true })}
                                onChange={(data) => onInputChange(data)}
                            />
                            <error>
                                {errors.name?.type === "required" && "name is required"}
                            </error>

                        </div>

                        <div className="mb-3">

                            <label htmlFor="Username" className="form-label"> Username</label>
                            <input type="text" className="form-control" placeholder="Enter your username" name="username"
                                {...register("username", { required: true })}
                                onChange={(data) => onInputChange(data)}
                                value={username}
                            />
                            <error>
                                {errors.username?.type === "required" && "username is required"}
                            </error>
                        </div>

                        <div className="mb-3">

                            <label htmlFor="email" className="form-label"> Email</label>
                            <input type="email" className="form-control" placeholder="Enter your email" name="email"
                                {...register("email", { required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                                onChange={(data) => onInputChange(data)}
                                value={email} />
                            <error>
                                {errors.email?.type === "required" && "email is required"}
                                {errors.email?.type === "pattern" && "Entered Email is wrong format"}
                            </error>
                        </div>

                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>

                    </form>
                </div>

            </div>

        </div>
    )
}
