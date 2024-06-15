import { useState, useContext } from 'react'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../store/Context'
const EditPost = ({ PostTextContent, PostID }) => {
    const { state } = useContext(Store);
    const [content, setContent] = useState(PostTextContent);
    const [success, setSuccess] = useState(null)
    const [warn, setWarn] = useState(null)
    const navigate = useNavigate();
    const updateProfile = () => {
        fetch(`https://yofigram.onrender.com/api/posts/update/${PostID}`, {
            method: "PUT",
            headers: {
                "Content-type": 'application/json',
                "Authorization": `Bearer ${state.token}`
            },
            body: JSON.stringify({
                content
            })
        }).then(res => res.json()).then(data => {
            if (data.status == "success") {
                setSuccess(data.message)
                setTimeout(() => {
                    window.location.assign("/")
                }, 1500)
            } else {
                setWarn(data.message)
                setTimeout(() => {
                    setWarn(null)
                }, 3000)
            }

        }).catch(err => {
            setWarn(err.message)
        })
    }
    const goBack = () => {
        navigate(-1)
    }
    return (
        <div className="content">
            <i style={{ cursor: "pointer" }} className="fa-solid fa-arrow-left-long go-back" onClick={goBack}></i>
            {warn && <div className="warn">
                <p>{warn}</p>
            </div>}
            {success && <div className="success">
                <p>{success}</p>
            </div>}
            <div className="user-edit">
                <label htmlFor="bio">Post content:</label>
                <textarea defaultValue={PostTextContent} className='Bio-Edit' onChange={e => setContent(e.target.value)}></textarea><br />
                <Button text='Done' type='primary' padding={0.7} clickHandler={updateProfile} />
            </div>
        </div>
    )
}

export default EditPost