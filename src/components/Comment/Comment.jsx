import { useContext, useEffect, useState } from 'react'
import './Comment.css'
import { Store } from '../../store/Context'
import timesAgo from 'time-ago';
import { Link, useNavigate } from 'react-router-dom';


const Comment = ({ commentID, username, profile_picture, Account_name, commentText, isLiked, likes, Time }) => {
    const [commentData, setCommentData] = useState({ isLiked, likes, commentText })
    const { state } = useContext(Store);
    const navigate = useNavigate();

    const likeComment = () => {
        if (state.token) {
            fetch(`https://yofigram.onrender.com/api/posts/comments/like/${commentID}`, {
                method: "POST",
                headers: {
                    // "Content-type": "application/json",
                    "Authorization": `Bearer ${state.token}`
                }
            }).then((data) => data.json()).then(res => {

                if (res.status == "success") {
                    setCommentData({ ...commentData, isLiked: true, likes: commentData.likes + 1 })
                }
            })
        } else {
            navigate(`/signup`)
        }
    }
    const dislikeComment = () => {
        if (state.token) {
            fetch(`https://yofigram.onrender.com/api/posts/comments/dislike/${commentID}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${state.token}`
                }
            }).then((data) => data.json()).then(res => {
                if (res.status == "success") {
                    setCommentData({ ...commentData, isLiked: false, likes: commentData.likes - 1 })
                }
            })
        } else {
            navigate('/signup')
        }
    }
    useEffect(() => {
        console.log(commentText.split("\n"));
    }, [])
    return (
        <div className="comment-box">

            <Link to={`/profile/${username}`}>
                <div className="comment-heading">
                    <div className="start">
                        <img src={profile_picture} alt="" />
                        <span className='commented-Account_name'>{Account_name}</span>
                    </div>
                    <b>{Time && timesAgo.ago(Time)}</b>
                </div>
            </Link>
            <div className="comment-content">
                {commentData.commentText.split("\n").map((item, index) => {
                    return <p className='comment-text' key={index}>{item}</p>
                })}
            </div>
            <div className="information">
                {commentData.isLiked ? <i onClick={dislikeComment} style={{ color: "#ee5151" }} className="fa-solid fa-heart"></i> : <i onClick={likeComment} className="fa-regular fa-heart"></i>}
                <span style={{ fontSize: "1rem" }}>{commentData.likes}</span>
            </div>
        </div>
    )
}
// const Comment = ({ profile_picture, Account_name, commentText }: commentProps) => {
//     return (
//         <div className="comment-box">
//             <h1>{Account_name}</h1>
//         </div>
//     )
// }

export default Comment