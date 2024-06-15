import { Link } from 'react-router-dom'
import './User.css'

const User = ({username, profile_picture, Account_name}) => {
    return (
        <Link to={`/profile/${username}`}>
            <div className="user">
                <div className="img">
                    <img className='profile-img' src={profile_picture} alt="" />
                </div>
                <div className="info">
                    <p>{Account_name}</p>
                    <span>@{username}</span>
                </div>
            </div>
        </Link>
    )
}

export default User