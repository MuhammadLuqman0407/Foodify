import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/auth-shared.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const UserRegister = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value.trim();
        const lastName = e.target.lastName.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;
        

        const response = await axios.post("http://localhost:3000/api/auth/user/register",{
            fullname: firstName + " "+lastName,
            email,
            password
        },
        {
            withCredentials: true // saved the token in cookies
        })
        console.log(response.data);
        navigate("/")

    }

    return (
        <div className='auth-page-wrapper'>
            <div className='auth-card' role='region' aria-labelledby='user-register-title'>
                <header>
                    <h1 id="user-register-title" className='auth-title'> Create your Account</h1>
                <p className='auth-subtitle'> Join to explore and enjoy delicious meals.</p>
                </header>
                <nav className='auth-alt-action' style={{marginTop:'-4px'}}>
                    <strong style={{fontWeight:600}}> Switch:</strong> <Link to="/user/register"> User </Link>••<Link to="/food-partner/register"> Food Partner</Link>
                </nav>
                <form className='auth-form' onSubmit={handleSubmit} noValidate>
                    <div className='two-col'>
                        <div className='field-group'>
                            <label htmlFor='firstName'>
                                    First Name
                            </label>
                            <input id='firstName' name='firstName' placeholder='Muhammad' autoComplete='given-name' />
                        </div>

                        <div className='field-group'>
                            <label htmlFor='lastName'>
                                    Last Name
                            </label>
                            <input id='lastName' name='lastName' placeholder='Ali' autoComplete='family-name' />
                        </div>
                    </div>

                    <div className='field-group'>
                        <label htmlFor='email'> Email</label>
                        <input id='email' name='email' type="email" placeholder='your@example.com' autoComplete='email' />

                    </div>

                    <div className='field-group'>
                        <label htmlFor = "password"> Password</label>
                        <input id='password' name='password' type='password' placeholder='•••••••' autoComplete='new-password' />
                    </div>

                    <button className='auth-submit' type='submit'> Sign Up</button>
                </form>
                <div className='auth-alt-action'>
                    Already have an account? <Link to="/user/login"> Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default UserRegister;