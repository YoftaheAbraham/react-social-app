import { useContext, useEffect, useState } from 'react'
import Button from '../Button/Button'
import "./profComp.css"
import { Store } from '../../store/Context'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup';

// type ProfileDataTypes = {
//   isMe: boolean
// }

const ProfileComponent = ({ UserID, ProfileIcon, Account_Name, Username, bio, following, postNumber, followers, isMe, isFollowed }) => {
  const { state, dispatch } = useContext(Store);
  const [profileData, setProfileData] = useState(null);
  const [logoutPopup, setLogouPopup] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setProfileData({
      UserID,
      ProfileIcon,
      Account_Name,
      Username,
      bio,
      following,
      postNumber,
      followers,
      isMe,
      isFollowed
    })
  }, [UserID, ProfileIcon, Account_Name, Username, bio, following, postNumber, followers, isMe, isFollowed])
  const EditProfile = () => {
    navigate('/EditProfile')
  }

  const followUser = () => {
    if (state.token) {
      fetch(`https://yofigram.onrender.com/api/users/follow/${profileData.UserID}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${state.token}`
        }
      }).then((data) => data.json()).then(res => {
        if (res.status == "success") {
          setProfileData({
            UserID,
            ProfileIcon,
            Account_Name,
            Username,
            bio,
            following,
            postNumber,
            followers: profileData?.followers + 1,
            isMe,
            isFollowed: true
          })
        }
      })
    } else {
      navigate("/login")
    }
  }
  const unfollowUser = () => {
    if (state.token) {
      fetch(`https://yofigram.onrender.com/api/users/unfollow/${profileData.UserID}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${state.token}`
        }
      }).then((data) => data.json()).then(res => {
        if (res.status == "success") {
          setProfileData({ ...profileData, isFollowed: false, followers: profileData.followers - 1 })
        }
      })
    } else {
      navigate("/login")
    }

  }
  const logout = () => {
    dispatch({ type: "REMOVE_TOKEN" })
    window.location.assign('/')
  }
  return (
    <div className='profile-info-container'>
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
      {profileData && <>
        {profileData.isMe &&
          <div className="heading-btn">
            <button className="logout" onClick={() => setLogouPopup(true)}>
              <p>Logout</p> <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        }
        <div className="user-profile-pic">
          <img src={ProfileIcon} alt="" />
        </div>
        <div className="user-info">
          <span>{Account_Name}</span><br />
          <span>@{Username}</span>
        </div>
        <div className="user-responses">
          {profileData.isMe && <Button type='primary' clickHandler={EditProfile} padding={0.5} text='Edit Profile' />}
          {profileData.isFollowed && <Button type='secondary' clickHandler={unfollowUser} padding={0.5} text='Following' />}
          {!profileData.isFollowed && !profileData.isMe && <Button clickHandler={followUser} type='primary' padding={0.5} text='Follow' />}
        </div>
        <div className="user-bio">
          <p>
            {bio}
          </p>
        </div>
        <div className="user-numeric-info">
          <div className="numeric-info">
            <span className="value">{profileData.following}</span>
            <div className="text">Following</div>
          </div>
          <div className="numeric-info">
            <span className="value">{profileData.postNumber}</span>
            <div className="text">Posts</div>
          </div>
          <div className="numeric-info">
            <span className="value">{profileData.followers}</span>
            <div className="text">Followers</div>
          </div>
        </div>
      </>}
    </div>
  )
}

export default ProfileComponent