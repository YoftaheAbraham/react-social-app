import { useContext, useEffect, useState } from 'react';
import './Comments.css';
import Post from '../../components/Post/Post.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { Store } from '../../store/Context.jsx'
import Comment from '../../components/Comment/Comment.jsx';
import PostSkeleton from '../../components/Post/PostSkeleton.jsx';
import CommentSkeleton from '../../components/Comment/CommentSkeleton.jsx';

const Comments = () => {
    const { state, dispatch } = useContext(Store);
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [Error, setError] = useState(null);
    const [Data, setData] = useState(null);

    useEffect(() => {
        if (state.token) {
            setIsLoading(true)
            fetch(`https://yofigram.onrender.com/api/posts/${id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${state.token}`,
                }
            }).then(res => res.json()).then(data => {
                setIsLoading(false)
                if (data.status == "success") {
                    setData(data)
                } else if (data.message == "jwt expired") {
                    dispatch({ type: "REMOVE_TOKEN" })
                    window.location.assign('/')
                } else {
                    setError(data.message)
                }
            }).catch(err => setError(err.message))
        } else {
            fetch(`https://yofigram.onrender.com/api/posts/notoken/${id}`).then(res => res.json()).then(data => {
                setIsLoading(false)
                setError(null)
                setData(data)
            }).catch(err => {
                setIsLoading(false)
                setError(err.message)
            })
        }
    }, [dispatch, id, state])
    const [comments, setComments] = useState(null)
    const [commentText, setCommentText] = useState(null);
    const [currentComment, setCurrentComment] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        { Data && setComments(Data.comments) }
    }, [navigate, Data])

    const goBack = () => {
        navigate(-1)
    }
    const addComment = () => {
        if (state.token) {
            if (commentText) {
                const commentBody = {
                    text: commentText
                }
                fetch(`https://yofigram.onrender.com/api/posts/comments/add/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${state.token}`
                    },
                    body: JSON.stringify(commentBody)
                }).then(res => res.json()).then(data => {
                    if (data.status === "success") {
                        setCurrentComment([...currentComment, data.comment])
                    }
                }).catch(err => setError(err.message))
            } else {
                alert("Please add comment text")
            }
        } else {
            navigate('/signup')
        }
    }

    return (
        <div className='comments'>
            {/* <i class="fa-solid fa-arrow-left go-back"></i> */}
            <i className="fa-solid fa-arrow-left go-back" onClick={goBack}></i>
            {isLoading && <PostSkeleton />}
            {Error && <h1>{Error}</h1>}
            {Data && Data.status == "success" && <Post
                postID={Data.post[0]._id}
                postedUserId={Data.post[0].user._id}
                profilePicture={Data.post[0].user.profile_picture}
                postedUserAccountName={Data.post[0].user.Account_name}
                postedUserName={Data.post[0].user.username}
                postText={Data.post[0].content}
                numberOfLikes={Data.post[0].likes}
                postFileUrl={Data.post[0].fileUrl}
                postFileMimeType={Data.post[0].fileType}
                isAlreadyLiked={Data.post[0].isLiked}
                isSaved={false}
                Time={Data.post[0].createdAt}
                isMyPost={Data.post[0].isMyPost}
            />}
            {Data && <div className="comment-input">
                <div className="methods">
                    <textarea onChange={e => setCommentText(e.target.value)} className='comment-text-input' placeholder='Write a comment'></textarea>
                    <i className="fa-regular fa-paper-plane" style={{
                        alignSelf: "end",
                        color: 'grey',
                        fontSize: '1rem',
                        marginLeft: '-2rem'
                    }} onClick={addComment}></i>
                </div>
            </div>}
            {currentComment && currentComment.length >= 1 && <b className='comment-number-heading'>currently added comments</b>}
            {currentComment && currentComment.length >= 1 && currentComment.map((item, index) => {
                console.log(item);
                return <Comment key={index} commentID={item[0]._id} username={item[0].username} profile_picture={item[0].profile_picture} commentText={item[0].commentText} Account_name={item[0].Account_name} isLiked={false} likes={0}/>
            })}
            {Data && <b className='comment-number-heading'><span>{Data.comments.length}</span> {Data.comments.length == 1 ? "comment" : "comments"}</b>}
            {comments && comments.map((item, index) => {
                return <Comment key={index} commentedUserId={item.commentedById} commentID={item._id} profile_picture={item.profile_picture} Time={item.createdAt} commentText={item.commentText} Account_name={item.Account_name} username={item.username} isLiked={item.isLiked} likes={item.likes} />
            })}
            {isLoading && <CommentSkeleton />}
        </div >
    )
}

export default Comments