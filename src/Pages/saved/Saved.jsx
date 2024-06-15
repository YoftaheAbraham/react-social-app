import { useContext, useEffect, useState } from 'react'
import './saved.css'
import Save from '../../components/Save/Save'
import { Store } from '../../store/Context'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from 'react-skeleton-generator'

const Saved = () => {
    const { state } = useContext(Store)
    const [isLoading, setIsLoading] = useState(false)
    const [Error, setError] = useState(null)
    const [Data, setData] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        if (state.token) {
            setIsLoading(true)
            fetch(`https://yofigram.onrender.com/api/users/saved`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            }).then(res => res.json()).then(data => {
                setIsLoading(false)
                if (data.status == "success") {
                    setError(null)
                    setData(data)
                } else {
                    setData(null)
                    setError(data.message)
                }
            }).catch(err => {
                setError(err.message)
            })
        } else {
            navigate('/login')
        }
    }, [state, navigate])
    return (
        <div className='Saved'>
            {isLoading && <Skeleton.SkeletonThemeProvider style={{
                marginTop: '1rem'
            }} color="#333" animation='shimmer'>
                <Skeleton height='4.7rem' />
                <Skeleton height='4.7rem' />
                <Skeleton height='4.7rem' />
            </Skeleton.SkeletonThemeProvider>}
            {Data && Data.data.length == 0 && <>
                <br />
                <h1>😊</h1><br />
                <span>You have nothing saved in your profile</span>
            </>}
            {Error && <>
                <h1>☹️</h1><br />
                <span>Something wrong happened</span>
            </>}
            {Data && Data.data.map((item, index) => {
                return <Save postID={item._id} postTextContent={item.content} postedUserAccountName={item.Account_name} key={index} />
            })}
        </div>
    )
}

export default Saved