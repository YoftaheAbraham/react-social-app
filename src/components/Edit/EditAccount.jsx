import { useState, useRef, useContext } from 'react'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../store/Context'
import Popup from 'reactjs-popup';
import ReactLoading from 'react-loading';
const EditAccount = ({ profilePicUrl, isNewUser, Account_name, Username, Bio }) => {
    const { state } = useContext(Store);
    const [username, setUsername] = useState(Username)
    const usernameSystemic = Username
    const [accountName, setAccountName] = useState(Account_name)
    const [bio, setBio] = useState(Bio);
    const [warn, setWarn] = useState(null)
    const [ProImage, setProImage] = useState(null)
    const [profilePic, setProfilePic] = useState(profilePicUrl);
    const [Loading, setLoading] = useState(false)
    const fileInput = useRef(null)
    const navigate = useNavigate();
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setProImage(file)
        setProfilePic(url);
    }
    const selectFile = () => {
        fileInput.current.click()
    }
    const updateProfile = () => {
        setLoading(true)
        const MultipartFormData = new FormData();
        {accountName && MultipartFormData.append("account_name", accountName)}
        {username && MultipartFormData.append("username", username)}
        {bio && MultipartFormData.append("bio", bio)}
        {ProImage && MultipartFormData.append("image", ProImage)}
        // {ProImage && formData.append('image', ProImage)}
        fetch(`https://yofigram.onrender.com/api/users/update`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${state.token}`
            },
            body: MultipartFormData
        }).then(res => res.json()).then(data => {
            setLoading(false)
            if (data.status == "success") {
                window.location.assign("/")
            } else {
                setWarn(data.message)
                setTimeout(() => {
                    setWarn(null)
                }, 5000)
            }

        }).catch(err => {
            setWarn(err.message)
        })
    }
    const goBack = () => {
        navigate(`/profile/${usernameSystemic}`)
    }
    return (
        <div className="content">
            {Loading && <Popup open={Loading} lockScroll disabled>
                <ReactLoading type='spokes' color='purple'/>
            </Popup>}
            <i style={{ cursor: "pointer" }} className="fa-solid fa-arrow-left-long go-back" onClick={goBack}></i>
            <div className="user-profile-pic">
                {isNewUser && <>
                    <div className="profile-img">
                        <img src={profilePic} style={{
                            borderRadius: "50%"
                        }} alt="" />
                    </div>
                    <i className="fa-solid fa-pen" onClick={selectFile} ></i>
                    <input type="file" style={{ display: "none" }} ref={fileInput} onChange={handleFileSelect} />
                </>}
            </div>
            {warn && <div className="warn">
                <p>{warn}</p>
            </div>}
            <div className="user-edit">
                <label htmlFor="Acc_name">Account Name:</label>
                <input maxLength={20} value={accountName} onChange={e => setAccountName(e.target.value)} type="text" /><br />
                <label htmlFor="user_name">Username:</label>
                <input maxLength={10} value={username} onChange={e => setUsername(e.target.value)} type="text" /><br />
                <label htmlFor="bio">Bio:</label>
                <textarea value={bio} className='Bio-Edit' onChange={e => setBio(e.target.value)}></textarea><br />
                <Button text='Done' type='primary' padding={0.7} clickHandler={updateProfile} />
            </div>
        </div>
    )
}

export default EditAccount