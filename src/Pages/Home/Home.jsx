import { useEffect, useContext, useState } from 'react'
import './Home.css'
import Suggested from '../../components/Suggestion/Suggested.jsx'
import Post from '../../components/Post/Post.jsx'
import { Store } from '../../store/Context.jsx'
import CreatePost from '../../components/CreatePost/CreatePost.jsx'
import PostSkeleton from '../../components/Post/PostSkeleton.jsx'


const Home = () => {
  const { state, dispatch } = useContext(Store);
  const [paginationIndex, setPaginationIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [Data, setData] = useState(null);
  const [Posts, setPosts] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    if (state.token) {
      fetch(`https://yofigram.onrender.com/api/posts`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${state.token}`
        }
      }).then(res => res.json()).then(data => {
        setIsLoading(false)
        if (data.status == "success") {
          setPosts(data.data)
          setData(data)
        } else if (data.message == "jwt expired") {
          dispatch({ type: "REMOVE_TOKEN" })
          window.location.assign('/')
        } else {
          setError(data.message)
        }
      }).catch(err => setError(err.message))
    } else {
      fetch(`https://yofigram.onrender.com/api/posts/notoken`).then(res => res.json()).then(data => {
        setIsLoading(false)
        setPosts(data.data)
      }).catch(err => setError(err.message))
    }
  }, [state, dispatch]);

  const showMore = async () => {
    setPaginationIndex(prev => prev + 1);
    fetch(`https://yofigram.onrender.com/api/posts?skip=${paginationIndex}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${state.token}`
      }
    }).then(res => res.json()).then(data => {
      setIsLoading(false)
      if (data.status == "success") {
        setPosts([...Posts, ...data.data])
        setData(data)
      } else if (data.message == "jwt expired") {
        dispatch({ type: "REMOVE_TOKEN" })
        window.location.assign('/')
      } else {
        setError(data.message)
      }
    }).catch(err => setError(err.message))
  }


  return (
    <div className='Home'>
      <div className="body">
        <Suggested />
        <CreatePost />
        <section id='LatestPosts'>
          <h1 className='Latest-post-title'>Latest Posts</h1>
          <div className="posts">
            {isLoading && <>
              <PostSkeleton />
              <PostSkeleton />
            </>}
            {Error && <p>{Error}</p>}
            {Posts && Posts.map((item, index) => {
              return <Post
                key={index}
                postID={item._id}
                postedUserId={item.user._id}
                profilePicture={item.user.profile_picture}
                postedUserAccountName={item.Account_name}
                postedUserName={item.user.username}
                postFileUrl={item.fileUrl}
                postFileMimeType={item.fileType}
                postText={item.content}
                numberOfLikes={item.likes}
                numberOfComments={`${item.NumberOfComments}`}
                isAlreadyLiked={item.isLiked}
                isSaved={item.isSaved}
                Time={item.createdAt}
                isMyPost={item.isMyPost}
              />
            })}
            <p className='show-more-btn-text' onClick={showMore}>Show more</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
