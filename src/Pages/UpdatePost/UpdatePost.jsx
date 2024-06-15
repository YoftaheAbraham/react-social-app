import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Store } from '../../store/Context'
import './UpdatePost.css'
import EditPost from '../../components/Edit/EditPost';

const UpdatePost = () => {
    const { state } = useContext(Store)
    const { id } = useParams()
    const [Error, setError] = useState(null)
    const [Data, setData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (state.token) {
            fetch(`https://yofigram.onrender.com/api/posts/${id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            }).then(res => res.json()).then(data => {
                if (data.status == "success") {
                    setData(data)
                    console.log(data);

                } else {
                    setError(data.message)
                }
            })
        } else {
            navigate('/login')
        }
    }, [id, navigate, state])
    return (
        <div className='UpdatePost'>
            {Error && <div className='error'>
                <span>{Error}</span>
            </div>}
            {Data && <EditPost PostID={Data.post[0]._id} PostTextContent={Data.post[0].content} />}
        </div>
    )
}

export default UpdatePost
