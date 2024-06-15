import { useRef, useContext, useState, useEffect } from 'react'
import "./CreatePost.css"
import Button from '../Button/Button'
import { Store } from '../../store/Context';
import ReactLoading from 'react-loading';


const CreatePost = () => {
    const { state, dispatch } = useContext(Store);
    const [postBody, setPostBody] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null)
    const [warn, setWarn] = useState(null)
    const [progress, setProgress] = useState(null)
    const [success, setSuccess] = useState(null)
    const textInputRef = useRef(null)
    const fileInputRef = useRef(null);
    const [Data, setData] = useState(null);

    useEffect(() => {
        if (state.token) {
            fetch(`https://yofigram.onrender.com/api/users/currentUser`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${state.token}`
                }
            }).then(res => res.json()).then(data => {
                if(data.status == "success") {
                    setData(data)
                } else {
                    setData(null)
                }
            }).catch(err => {
                dispatch({type: "REMOVE_TOKEN"})
            });
            textInputRef.current?.focus()
        } else {
            return () => {}
        }
    }, [state]);
    const selectFile = () => {
        fileInputRef.current?.click()
    }
    const CreatePostHandler = () => {
        const MultipartFormData = new FormData();
        { postBody && MultipartFormData.append("textContent", postBody) }
        { selectedImage && MultipartFormData.append("file", selectedImage) }
        if (!postBody) {
            setWarn("Please provide the post text content")
            textInputRef.current?.focus()
            setTimeout(() => {
                setWarn(null)
            }, 3000)
        } else {
            setProgress("Uploading your post..")
            fetch(`https://yofigram.onrender.com/api/posts/createpost`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${state.token}`
                },
                body: MultipartFormData
            }).then(res => res.json()).then(data => {
                setProgress(null)
                if (data.status == "success") {
                    setSuccess("successfully added your post")
                    setTimeout(() => {
                        setSuccess(null)
                    }, 10000)
                } else {
                    setProgress(null)
                    setWarn(data.message)
                    setTimeout(() => {
                        setWarn(null)
                    }, 3000)
                }
            }).catch((err) => {
                setProgress(null)
                setWarn(err.message)
                setTimeout(() => {
                    setWarn(null)
                }, 3000)
            })
        }
    }
    return (
        <>{state.token && <>
            <div id="create-post">
                {/* {isLoading && <ReactLoading type='spokes' color='purple' />} */}
                {Data && <>
                    <div className="left">
                        <img src={Data.data.profile_picture} alt="" />
                    </div>
                    <div className="right">
                        <div className="post-body-content">
                            <textarea ref={textInputRef} onChange={e => setPostBody(e.target.value)} placeholder={`What's in your mind ${Data.data.Account_name}?`} name="" id=""></textarea>
                        </div>
                        {!progress && <div className="post-controllers">
                            <div className="select-image">
                                <i onClick={selectFile} className="fa-solid fa-photo-film select-file"></i>
                                {selectedImage && <span>{selectedImage.name}</span>}
                                <input ref={fileInputRef} onChange={(e) => setSelectedImage(e.target.files[0])} type="file" style={{ display: 'none' }} />
                            </div>
                            <Button clickHandler={CreatePostHandler} type='primary' text='Create The Post Now' padding={0.2} />
                        </div>}
                        {warn && <div className='error'>
                            <span>{warn}</span>
                        </div>}
                        {progress && <div className='progress'>
                            <span>{progress}</span>
                            <i><ReactLoading height={20} type='balls' color='purple' /></i>
                        </div>}
                        {success && <div className='success'>
                            <span>{success}</span>
                        </div>}
                    </div>
                </>}
            </div>
        </>}</>
    )
}

export default CreatePost