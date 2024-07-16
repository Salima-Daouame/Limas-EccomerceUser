import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link}  from 'react-router-dom'
import singin from '../Images/singup.png';
import swal from 'sweetalert';
import { useMediaQuery } from 'react-responsive';

const SignIn = () => {
    const [client, setClient] = useState({
        email: "",
        password: ""
    });
    const [msg, setMsg] = useState('');
    let navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { email, password } = client;
    const onInputChange = e => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const signIn = async (e) => {
        e.preventDefault();
        
        if (email === '') {
            swal('Email Field is empty');
            return;
        }
        if (password === '') {
            swal('Password Field is empty');
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/login", client);
            const data = response.data;
            setMsg(data);
            // localStorage.setItem("token", data.token); // Save the token
            localStorage.setItem("clientEmail", data.email);
            localStorage.setItem("clientName", data.name);
            localStorage.setItem("image", data.image);
            localStorage.setItem("clientpassword", data.password);
            localStorage.setItem('client_id', response.data.client_id);
     console.log('Client ID set in localStorage:', response.data.client_id); 
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data) {
                setMsg(error.response.data.error);
            } else {
                setMsg('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen  -mb-20 ">
            <div className="flex w-full md:w-4/5 lg:w-3/4  ">
                <div className="w-full flex justify-center">
                    <form className={`bg-white p-8  ${isMobile ? 'm-8 ' : ''} rounded-xl shadow-lg   w-full max-w-md `} onSubmit={signIn}>
                        <h2 className="text-3xl font-semibold mb-6 text-center">Sign In</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email" value={email} onChange={onInputChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="password" placeholder="******************" value={password} onChange={onInputChange} />
                        </div>
                        <h4 className=' text-xs text-red-700'>{msg}</h4>
                        <br />
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition duration-500 hover:scale-105" type="submit">
                                Sign In
                            </button>
                            <div>
                                <Link to='/signup' className='hover:text-sky-500 font-medium dark:text-black' >Create account</Link>
                         </div>
                        </div>
                    </form>
                    <img src={singin} alt="Sign In" className="hidden md:block w-1/2 bg-blue-500 flex justify-center object-cover rounded-lg shadow-2xl" />
                </div>
            </div>
        </div>
    );
};

export default SignIn;

