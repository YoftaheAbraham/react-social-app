import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { Store } from '../../store/Context'
const BottomNav = () => {
    const { state, dispatch } = useContext(Store);
    const [Data, setData] = useState(null);

    useEffect(() => {
        if(state.token) {
            fetch(`https://yofigram.onrender.com/api/users/currentUser`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${state.token}`
                }
            }).then(res => res.json()).then(data => {
                if(data.status == "success") {
                    setData(data)
                } else{
                    setData(null)
                }
            }).catch(() => {
                dispatch({type: "REMOVE_TOKEN"})
            })
        } else {
            setData(null)
        }
    }, [state])
    return (
        <div className="nav-links">
            {Data && <>
                <Link to="/">
                    <div className="link">
                        <i className="fa-solid fa-house"></i>
                    </div>
                </Link>
                <Link to='/saved'>
                    <div className="link">
                        <i className="fa-regular fa-bookmark"></i>
                    </div>
                </Link>
                <Link to='/Following'>
                    <div className="link">
                        <i className="fa-solid fa-user-group"></i>
                    </div>
                </Link>

                <Link to={`/profile/${Data.data.username}`}>
                    <div className="link">
                        <img src={Data.data.profile_picture} alt="" />
                    </div>
                </Link>
            </>}
        </div>
    )
}

export default BottomNav