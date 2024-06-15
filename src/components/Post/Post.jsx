
import './post.css'
import { useState, useContext } from 'react';
import timesAgo from 'time-ago';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../store/Context';
import ReactPlayer from 'react-player';
import { Skeleton } from 'react-skeleton-generator';

const Post = ({ postID, postedUserId, profilePicture, postedUserAccountName, postedUserName, postText, postFileUrl, postFileMimeType, numberOfLikes, numberOfComments, isAlreadyLiked, isSaved, isMyPost, Time }) => {
    const { state } = useContext(Store);
    const [postData, setPostData] = useState({
        postID,
        postedUserId,
        profilePicture,
        postedUserAccountName,
        postedUserName,
        postText,
        postFileUrl,
        postFileMimeType,
        numberOfLikes,
        numberOfComments,
        isAlreadyLiked,
        isSaved,
        isMyPost,
        Time
    })
    const navigate = useNavigate();
    const [LoadingImage, setLoadingImage] = useState(true)


    const likePost = () => {
        if (state.token) {
            fetch(`https://yofigram.onrender.com/api/posts/like/${postData.postID}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${state.token}`
                }
            }).then((data) => data.json()).then(res => {
                if (res.status == "success") {
                    setPostData({ ...postData, numberOfLikes: postData.numberOfLikes + 1, isAlreadyLiked: true })
                }
            })
        } else {
            navigate('/login')
        }
    }
    const dislikePost = () => {
        if (state.token) {
            fetch(`https://yofigram.onrender.com/api/posts/dislike/${postData.postID}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${state.token}`
                }
            }).then((data) => data.json()).then(res => {
                if (res.status == "success") {
                    setPostData({ ...postData, numberOfLikes: postData.numberOfLikes - 1, isAlreadyLiked: false })
                }
            })
        } else {
            navigate('/login')
        }
    }
    const savePost = () => {
        if (state.token) {
            fetch(`https://yofigram.onrender.com/api/posts/savepost/${postData.postID}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${state.token}`
                }
            }).then((data) => data.json()).then(res => {
                if (res.status == "success") {
                    setPostData({ ...postData, isSaved: true })
                }
            })
        } else {
            navigate('/login')
        }
    }
    const unSavePost = () => {
        if (state.token) {
            fetch(`https://yofigram.onrender.com/api/posts/unsavepost/${postData.postID}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${state.token}`
                }
            }).then((data) => data.json()).then(res => {
                if (res.status == "success") {
                    setPostData({ ...postData, isSaved: false })
                }
            })
        } else {
            navigate('/login')
        }
    }
    const Loadded = () => {
        setLoadingImage(false);
    }
    return (
        <div className="post">
            {/* <div className="left">
                <Link to={`/profile/${postData.postedUserId}`}>
                </Link>
            </div> */}

            <div className="right">
                <div className="header-info">
                    <div className="start">
                        <img src={profilePicture} alt="" />
                        <Link to={`/profile/${postData.postedUserName}`}>
                            <div className="user">
                                <span className='Acc-name'>{postData.postedUserAccountName}</span>
                                {postData.postedUserName && <span className='User-name'>@{postData.postedUserName}</span>}
                            </div>
                        </Link>
                    </div>
                    <b>{timesAgo.ago(postData.Time)}</b>
                </div>
                <div className="post-body-content">
                    {postData.postText && postData.postText.split("\n").map((item, index) => {
                        return <p className='comment-text' key={index}>{item}</p>
                    })}
                    {postData.postFileUrl && postData.postFileMimeType == "image/jpeg" || postData.postFileMimeType == "image/png" ? <>
                        {<img style={{
                            minHeight: LoadingImage ? '0rem' : '20rem'
                        }} className='post_image' src={postData.postFileUrl} loading='lazy' onLoad={Loadded} alt="loading...." />}
                        {LoadingImage && <Skeleton.SkeletonThemeProvider color='#666' animation='opacity'>
                            <Skeleton height='20rem' width='100%' />
                        </Skeleton.SkeletonThemeProvider>}
                    </> : null}
                    {postData.postFileUrl && postData.postFileMimeType == "video/mp4" ?
                        <>
                            <ReactPlayer
                                url={postData.postFileUrl}
                                width="640"
                                height="360"
                                controls
                            />
                        </>
                        : null
                    }
                    {postData.postFileUrl && postData.postFileMimeType == "audio/mpeg" || postData.postFileMimeType == "audio/mp4" || postData.postFileMimeType == "audio/mp3" ?
                        <audio controls>
                            <source src={postData.postFileUrl} />
                        </audio> : null
                    }
                    {/* <img src='https://firebasestorage.googleapis.com/v0/b/yofigram-5504e.appspot.com/o/postFiles%2Fcdd20cba-1389-4a64-ba5a-1660a6071178.jpg?alt=media&token=3b94b3b5-1ab4-4e8b-9667-6a2f889f44d6' className='post_image' alt="" /> */}
                    {/* <video controls>
                        <source src="https://firebasestorage.googleapis.com/v0/b/yofigram-5504e.appspot.com/o/postFiles%2F0bc46108-6f46-4b8e-add7-27682d980cfc.mp4?alt=media&token=bad53d82-d869-42e0-adbd-65a4abd99ae8" />
                    </video> */}

                </div>
                <div className="post-bottom-options">
                    <div className="user-responses">
                        <div className="option">
                            {postData.isAlreadyLiked ? <i onClick={dislikePost} style={{ color: "rgb(231, 68, 68)" }} className="fa-solid fa-heart"></i> : <i style={{ color: "#b3b3b3" }} onClick={likePost} className="fa-regular fa-heart"></i>}
                            <span style={{ fontSize: "1.2rem", color: "#fff", fontWeight: "200" }}>{postData.numberOfLikes}</span>
                        </div>
                        {<Link to={`/post/${postData.postID}`}>
                            {postData.numberOfComments && <div className="option">
                                <i className="fa-regular fa-comment"></i>
                                <span style={{ fontSize: "1.2rem", color: "#fff", fontWeight: "200" }}>{postData.numberOfComments}</span>
                            </div>}
                        </Link>}
                    </div>
                    <div className="option special">
                        {postData.isSaved ? <i style={{ color: "red" }} className="fa-solid fa-bookmark" onClick={unSavePost}></i> : <i className="fa-regular fa-bookmark" onClick={savePost}></i>}
                        {isMyPost && <div onClick={() => navigate(`/UpdatePost/${postData.postID}`)} className="edit">{<i style={{ color: "#fff" }} className="fa-solid fa-pen"></i>}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post