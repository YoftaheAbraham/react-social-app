import { useContext } from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'
import { Store } from '../../store/Context'

const Navbar = () => {
    const { state } = useContext(Store);
    const navigate = useNavigate();
    const redirectToSignup = () => {
        navigate('/signup')
    }
    const redirectToLogin = () => {
        navigate('/login')
    }

    return (
        <nav>
            <div className="content">
                <div className="top-nav">
                    <div className="logo">
                        <h1>Yofi<span style={{ color: "rgb(177, 14, 142)" }}>gram</span></h1>
                    </div>
                    <div>
                        {!state.token && <button className='signup-btn' onClick={redirectToSignup}>Signup</button>}
                        {!state.token && <button className='signup-btn' onClick={redirectToLogin}>Login</button>}
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar