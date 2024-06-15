import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
const Reset = () => {
    const { token } = useParams();
    const navigate = useNavigate()
    const [warn, setWarn] = useState(null);
    const [success, setSuccess] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tokenData, setTokenData] = useState(null)
    const [isValidToken, setIsValidToken] = useState(false)
    const [resetEmail, setResetEmail] = useState(false)
    useEffect(() => {
        fetch(`https://yofigram.onrender.com/api/users/auth/check`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json()).then(data => {
            if (data.status == "success") {
                setTokenData(data)
                setResetEmail(data.email)
                setIsValidToken(true)

            } else {
                setWarn(data.message)
                setTokenData(data)
                setIsValidToken(false)
            }
        }).catch(err => setWarn(err.message))
    }, [token])

    const resetHandler = (event) => {
        event.preventDefault();
        if (password.length >= 8) {
            if (password != confirmPassword) {
                setWarn("Please confirm the password")
                setTimeout(() => {
                    setWarn(null)
                }, 3000)
            } else {
                fetch(`https://yofigram.onrender.com/api/users/auth/reset/${tokenData.userID}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        password: password
                    })
                }).then(res => res.json()).then(data => {
                    if (data.status == "success") {
                        setSuccess(data.message)
                        setTimeout(() => { navigate("/login") }, 2000)
                    } else {
                        setWarn(data.message)
                    }
                }).catch(err => setWarn(err.message))
            }
        } else {
            setWarn("password length must be greater than 8 characters")
        }

    }
    return (
        <div className="main">
            {isValidToken && <div className="container">
                {warn && <div className='error'>
                    <h2 style={{ color: "#ffff" }}>{warn}</h2>
                </div>}
                {success && <div className='success'>
                    <h2 style={{ color: "#ffff" }}>{success}</h2>
                </div>}
                <br />
                <h1>Reset Password</h1>
                <br />
                <p>Please fill in this form to reset the password of <span className='active'>{resetEmail}</span> </p>
                <p>The session will be expired in 10 minutes </p>
                <br />
                {/* <ReactLoading type='spinningBubbles' color='#a0a0a0' /> */}
                <form onSubmit={resetHandler}>
                    <label htmlFor="email">
                        <b><i className="fa-solid fa-key"></i>New Password</b>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Your Email Address"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="psw">
                        <b><i className="fa-solid fa-lock"></i>Confirm Password</b>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    />
                    <br />
                    <div className="clearfix">
                        <button type="submit" className="signupbtn">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>}
        </div>
    )
}

export default Reset