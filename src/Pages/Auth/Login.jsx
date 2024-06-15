import { useContext, useState } from 'react';
import "./Auth.css"
import { Store } from '../../store/Context';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import ReactLoading from 'react-loading';

function LoginPage() {
    const { dispatch } = useContext(Store)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warn, setWarn] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isReseting, setIsReseting] = useState(false)
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://yofigram.onrender.com/api/users/auth/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json()).then(data => {
            if (data.status == "success") {
                dispatch({ type: "ADD_TOKEN", payload: data.token });
                setSuccess("successfully logged in to your account")
                setTimeout(() => { navigate('/EditProfile') }, 1500)
            } else {
                setWarn(data.message)
                setTimeout(() => { setWarn(null) }, 5000)
            }
        }).catch(err => setWarn(err.message))
    };
    const handleSubmitResetSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        fetch(`https://yofigram.onrender.com/api/users/auth/resetPass`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                clientURL: window.location.host
            })
        }).then(res => res.json()).then(data => {
            setLoading(false)
            if (data.status == "success") {
                setSuccess("We have sent a verification to your email, Please check your Gmail app")
            } else {
                setWarn(data.message)
                setTimeout(() => { setWarn(null) }, 5000)
            }
        }).catch(err => setWarn(err.message))
    };
    const resetPopup = () => {
        setIsReseting(true)
    }
    const goBack = () => {
        setIsReseting(false)
        setSuccess(null)
    }
    return (
        <div className="main">
            {Loading && <Popup open={Loading} lockScroll disabled>
                <ReactLoading type='spokes' color='purple' />
            </Popup>}
            <div className="app-info">
                <h1>YofiGram | Stay connected with others</h1><br />
                <p>Yofigram is static social media Platform built by <span className='active'>Yoftahe Abraham</span>  for bringing people together, smile and connect with others</p>
            </div>
            {!isReseting ? <div className="container">
                {warn && <div className='error'>
                    <span>{warn}</span>
                </div>}
                {success && <div className='success'>
                    <span>{success}</span>
                </div>}
                <h1>Login</h1>
                <br />
                <p>Please fill in this form to Log into your Account.</p>
                <br />
                {/* <ReactLoading type='spinningBubbles' color='#a0a0a0' /> */}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <b><i className="fa-regular fa-envelope"></i>Email</b>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Your Email Address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="password">
                        <b><i className="fa-solid fa-lock"></i>Password</b>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <br />
                    <div className="clearfix">
                        <span className='active' style={{
                            cursor: "pointer"
                        }} onClick={resetPopup}>Forgot pasword?</span><br />
                        <button type="submit" className="signupbtn">
                            Login
                        </button><br /><br />
                        <span> {"Don't have an Account?"} <Link to="/signup">Signup</Link></span><br />
                    </div>
                </form>
            </div> : <>
                <div className="container">
                    <i className="fa-solid fa-arrow-left go-back" onClick={goBack}></i>
                    {warn && <div className='error'>
                        <span>{warn}</span>
                    </div>}
                    {success && <div className='success'>
                        <span>{success}</span>
                    </div>}
                    {!success && <>
                        <h1>Forgot Password</h1>
                        <br />
                        <p>Please fill in this form to reset your password.</p>
                        <br />
                        {/* <ReactLoading type='spinningBubbles' color='#a0a0a0' /> */}
                        <form onSubmit={handleSubmitResetSubmit}>
                            <label htmlFor="email">
                                <b><i className="fa-regular fa-envelope"></i>Email</b>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Your Email Address"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                            <br />

                            <div className="clearfix">

                                <button type="submit" className="signupbtn">
                                    submit
                                </button><br /><br />
                            </div>
                        </form>
                    </>}
                </div>
            </>}

        </div>
    );
}

export default LoginPage;