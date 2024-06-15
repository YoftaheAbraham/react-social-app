import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Auth.css"
import Popup from 'reactjs-popup';
import ReactLoading from 'react-loading';
function SignupPage() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [otp, setOtp] = useState(null)
    const [otpVerification, setOtpVerification] = useState(false);
    const [warn, setWarn] = useState(null);
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        
        if (password.length < 8 || repeatPassword.length < 8) {
            setWarn("Password length can't be less than 8 characters")
            setTimeout(() => {
                setWarn(null)
            }, 5000)
        } else if (password !== repeatPassword) {
            setWarn("Oops! The password and repeat password do not match")
            setTimeout(() => {
                setWarn(null)
            }, 5000)
        } else {
            fetch(`https://yofigram.onrender.com/api/users/auth/virtual`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    Account_name: fullname,
                    email,
                    username,
                    password
                })
            }).then(res => res.json()).then(data => {
                setLoading(false)
                if (data.status == "success") {
                    setOtpVerification(true)
                } else {
                    setWarn(data.message)
                    setTimeout(() => { setWarn(null) }, 5000)
                }
            }).catch(err => setWarn(err.message))
        }
    };

    const verifyOtp = (event) => {
        event.preventDefault();
        setLoading(true)
        fetch(`https://yofigram.onrender.com/api/users/auth/signup`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email,
                otp
            })
        }).then(res => res.json()).then(data => {
            setLoading(false)
            if (data.status == "success") {
                navigate('/login')
            } else {
                setWarn(data.message)
                setTimeout(() => setWarn(null), 3000)

            }
        }).catch(err => setWarn(err.message))
    }

    return (
        <div className="main">
            <div className="app-info">
                <h1>YofiGram</h1><br />
                <p>Yofigram is static social media Platform built by <span className='active'>Yoftahe Abraham</span>  for bringing people together, smile and connect with others</p>

            </div>
             {Loading && <Popup open={Loading} lockScroll disabled>
                <ReactLoading type='spokes' color='purple'/>
            </Popup>}
            {!otpVerification ? <div className="container">
                {warn && <div className='error'>
                    <span>{warn}</span>
                </div>}
                <h1>Sign Up</h1>
                <br />
                <p>Please fill in this form to create an account.</p>
                <br />

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <b><i className="fa-regular fa-circle-user"></i>Full name</b>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your Full Name"
                        value={fullname}
                        onChange={(event) => setFullname(event.target.value)}
                        required
                    />
                    <label htmlFor="email">
                        <b><i className="fa-regular fa-user"></i>Username</b>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                    <label htmlFor="email">
                        <b><i className="fa-regular fa-envelope"></i>Email</b>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter Your Email Address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <label htmlFor="password">
                        <b><i className="fa-solid fa-key"></i>Password</b>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <label htmlFor="password-repeat">
                        <b><i className="fa-solid fa-lock"></i>Repeat Password</b>
                    </label>
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        value={repeatPassword}
                        onChange={(event) => setRepeatPassword(event.target.value)}
                        required
                    />

                    {/* <label>
                    <input
                        type="checkbox"
                        checked={true}
                        style={{ marginBottom: '15px' }}
                    />
                    Remember me
                </label> */}

                    {/* <p>
                    By creating an account you agree to our{' '}
                    <a href="#" style={{ color: 'dodgerblue' }}>
                    Terms & Privacy
                    </a>
                    .
                    </p> */}

                    <div className="clearfix">
                        <span>Already have an Account? <Link to="/login">Login</Link></span><br />
                        <button type="submit" className="signupbtn">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div> : <div className="container">
                {warn && <div className='error'>
                    <span>{warn}</span>
                </div>}
                <h1>OTP verification</h1>
                <br />
                <p>Please enter 6 digit code sent to email <span style={{ color: "rgb(177, 14, 142)" }}>{email}</span></p>
                <br />
                <form onSubmit={verifyOtp}>
                    <label htmlFor="email">
                        <b>OTP code</b>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your OTP"
                        maxLength={6}
                        onChange={(event) => setOtp(event.target.value)}
                        required
                    />
                    <div className="clearfix">
                        <button type="submit" className="signupbtn">
                            Verify
                        </button>
                    </div>
                </form>
            </div>}

        </div>
    );
}

export default SignupPage;