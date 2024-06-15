import { useEffect, useContext, useState } from 'react'
import "./Profile.css"
import Post from '../../components/Post/Post'
import ProfileComponent from '../../components/Profile/ProfileComponent'
import { Store } from '../../store/Context';
import { Link, useParams } from 'react-router-dom'
import ProfileComponentSkeleton from '../../components/Profile/ProfileComponentSkeleton'
import PostSkeleton from '../../components/Post/PostSkeleton'
import { Skeleton } from 'react-skeleton-generator'

const Profile = () => {
    const { username } = useParams();
    const { state, dispatch } = useContext(Store);
    const [isLoading, setIsLoading] = useState(false);
    const [Error, setError] = useState(null);
    const [Data, setData] = useState(null);
    useEffect(() => {
        setIsLoading(true)
        setError(null)
        if (state.token) {
            fetch(`https://yofigram.onrender.com/api/users/${username}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${state.token}`
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
            fetch(`https://yofigram.onrender.com/api/users/notoken/${username}`).then(res => res.json()).then(data => {
                setIsLoading(false)
                setData(data)
            }).catch(err => setError(err.message))
        }
    }, [username, dispatch, state])


    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:6050/api/users/${id}`, {
    //         headers: {
    //             "authorization": state.token
    //         }
    //     }).then((res) => {
    //         setData(res.data)
    //     })
    // }, [id, data, setData])
    return (
        <div className='Profile'>
            {/* <Suggested /> */}

            <div className="content">
                {Error && <h1>{Error}</h1>}
                {/* <div className="heading-btn">
                    <button className="logout">
                        <p>Logout</p> <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                </div> */}
                {isLoading && <div>
                    <ProfileComponentSkeleton />
                </div>}
                {Data && Data.data.length >= 1 && <ProfileComponent
                    UserID={Data.data[0]._id}
                    ProfileIcon={Data.data[0].profile_picture}
                    Account_Name={Data.data[0].Account_name}
                    Username={Data.data[0].username}
                    bio={Data.data[0].bio}
                    following={Data.data[0].followings_number}
                    postNumber={Data.posts?.length}
                    followers={Data.data[0].followers_number}
                    isMe={Data.data[0].isMe}
                    isFollowed={Data.data[0].isFollowed}
                />}
                <div className="user-posts">
                    {Data && <h1 className='Post-title'>{Data.data[0].isMe ? 'Your Posts' : 'User Posts'}</h1>}
                    <div className="posts">
                        {isLoading && <div style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: '2rem'
                        }}>
                            <Skeleton.SkeletonThemeProvider style={{
                                margin: "2rem 0"
                            }} color="#666" animation='shimmer'>
                                <Skeleton width='8rem' height='1.3rem' />
                            </Skeleton.SkeletonThemeProvider>
                            <PostSkeleton />
                        </div>}
                        {Data && Data.posts.length >= 1 && Data.posts.map((item, index) => {
                            return <Link to={`/post/${item._id}`}>
                                <Post
                                    key={index}
                                    postID={item._id}
                                    profilePicture={item.user.profile_picture}
                                    postFileUrl={item.fileUrl}
                                    postFileMimeType={item.fileType}
                                    postedUserAccountName={item.Account_name}
                                    postedUserName={item.user.username}
                                    postedUserId={item.user._id}
                                    postText={item.content}
                                    isMyPost={item.isMyPost}
                                    numberOfComments={item.numberOfComments}
                                    numberOfLikes={item.likes}
                                    isAlreadyLiked={item.isLiked}
                                    isSaved={item.isSaved}
                                    Time={item.createdAt}
                                />
                            </Link>
                        })}
                        {Data && Data.posts.length == 0 && (
                            <>
                                <div className="No-post">
                                    <b>😊 No posts..</b><br /><br />
                                    {Data.data[0].isMe && <Link to={`/`}>Want to Create one?</Link>}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile