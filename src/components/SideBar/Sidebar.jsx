import { useContext, useEffect, useState } from 'react'
import "./Sidebar.css"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Store } from '../../store/Context'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const Sidebar = () => {
    const { state, dispatch } = useContext(Store);
    const [Data, setData] = useState(null);
    const [logoutPopup, setLogouPopup] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (state.token) {
            fetch(`https://yofigram.onrender.com/api/users/currentUser`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${state.token}`
                }
            }).then(res => res.json()).then(data => {
                if (data.status == "success") {
                    setData(data)
                } else if (data.message == "jwt expired") {
                    dispatch({ type: "REMOVE_TOKEN" })
                    window.location.assign('/')
                }
            }).catch(() => {
                dispatch({type: "REMOVE_TOKEN"})
            })
        } else {
            setData(null)
        }
    }, [state, dispatch])

    const logout = () => {
        dispatch({ type: "REMOVE_TOKEN" })
        window.location.assign('/')
    }
    return (
        <aside>
            <div className="content">
                <div className="links">
                    <>
                        <NavLink to="/">
                            <div className="link">
                                <i className="fa-solid fa-house"></i>
                                <span>Home</span>
                            </div>
                        </NavLink>
                        <NavLink to='/saved'>
                            <div className="link">
                                <i className="fa-regular fa-bookmark"></i>
                                <span>Saved</span>
                            </div>
                        </NavLink>
                        <NavLink to={`/Following`}>
                            <div className="link">
                                <i className="fa-solid fa-user-group"></i>
                                <span>Following</span>
                            </div>
                        </NavLink>

                    </>
                    {/* <div className="btn-link">
                        + Create New Post
                        </div> */}
                </div>
            </div>
            {/* <Link to={`/profile/${Data.data.username}`}>
                <div className="link">
                <img src={Data.data.profile_picture} alt="Home" />
                <span>Login</span>
                </div>
                </Link>
                <Link to={`/profile/${Data.data.username}`}>
                <div className="link">
                <img src={Data.data.profile_picture} alt="Home" />
                <span>Signup</span>
                </div>
                </Link> */}
            {Data && <Link to={`/profile/${Data.data.username}`}>

                <div className="currentProfile">
                    <>
                        <img className='profileImage' src={Data.data.profile_picture} alt="" />
                        <div className="current-user-info">
                            <span>{Data.data.Account_name}</span>
                            <span>@{Data.data.username}</span>
                        </div>
                    </>
                </div>
            </Link>}
            <Popup open={logoutPopup} lockScroll>
                <div className="pop-up">
                    <p>Please make sure to save your work before logging out.</p>
                    <button style={{
                        background: 'orange',
                        border: 'none'
                    }} onClick={logout}>Logout</button>
                    <button onClick={() => setLogouPopup(false)}>Cancel</button>
                </div>
            </Popup>
            {!state.token && <>
                <button className="signup" onClick={() => navigate(`/signup`)}>
                    <p>Signup</p>
                </button>
                <button className="signin" onClick={() => navigate(`/login`)}>
                    <p>Login</p>
                </button>
            </>}
            {Data && <button className="logout" onClick={() => setLogouPopup(true)}>
                <p>Logout</p> <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>}
        </aside>
    )
}

export default Sidebar