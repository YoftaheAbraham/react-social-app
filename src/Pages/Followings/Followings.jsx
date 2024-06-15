import { useState, useContext, useEffect } from 'react'
import './following.css'
import User from '../../components/User/User'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../store/Context'
import { Skeleton } from 'react-skeleton-generator'


const Followings = () => {
  const { state } = useContext(Store)
  const [isLoading, setIsLoading] = useState(false)
  const [Error, setError] = useState(null)
  const [Data, setData] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    if (state.token) {
      setIsLoading(true)
      fetch(`https://yofigram.onrender.com/api/users/connections`, {
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
  }, [state, navigate])
  return (
    <div className='Followings'>
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
        <span>{"You didn't follow anyone!"}</span>
      </>}
      {Error && <>
        <br />
        <h1>☹️</h1><br />
        <span>Oops! {Error}</span>
      </>}
      {Data && Data.data.length >= 1 && <h3 className='heading-text'>You are following {Data.results} {Data.results == 1 ? "user" : "users"}</h3>}
      <div className="users">
        {Data && Data.data.map((item, index) => {
          return <User key={index} username={`${item.username}`} Account_name={`${item.Account_name}`} profile_picture={`${item.profile_picture}`} />
        })}
      </div>
    </div>
  )
}

export default Followings