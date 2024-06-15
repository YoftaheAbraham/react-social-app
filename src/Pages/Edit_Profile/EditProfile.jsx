import { useState, useContext, useEffect } from 'react'
import { Skeleton } from 'react-skeleton-generator'
import "./EditProfile.css"
import { useNavigate } from 'react-router-dom'
import { Store } from '../../store/Context'
import EditAccount from '../../components/Edit/EditAccount'

const EditProfile = () => {
    const { state } = useContext(Store);
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [Error, setError] = useState(null)
    const [Data, setData] = useState(null);
    useEffect(() => {
        if (state.token) {
            setIsLoading(true)
            fetch(`https://yofigram.onrender.com/api/users/currentUser`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            }).then(res => res.json()).then(data => {
                setIsLoading(false)
                if (data.status == "success") {
                    setData(data)
                } else {
                    setError(data.message)
                }
            })
        } else {
            navigate('/login')
        }
    }, [navigate, state])
    return (
        <>
            <div>
                <div className='Edit-Profile'>
                    {Data && <EditAccount
                        profilePicUrl={`${Data.data.profile_picture}`}
                        isNewUser={Data.data.isNewUser}
                        Account_name={`${Data.data.Account_name}`}
                        Username={`${Data.data.username}`}
                        Bio={`${Data.data.bio}`}
                    />}
                </div>
            </div >
            {Error && <h2>{Error}</h2>}
            {isLoading && <>
                <h2>Loading...</h2>
                <Skeleton.SkeletonThemeProvider color='white'>
                    <Skeleton width='100%' height='100%' />
                </Skeleton.SkeletonThemeProvider>
            </>}
        </>

    )
}

export default EditProfile