import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./suggested.css"
import ReactLoading from 'react-loading';
import { Store } from '../../store/Context'
import User from '../User/User';

const Suggested = () => {
    const { state } = useContext(Store);
    const [searchText, setSearchText] = useState(null);
    const [Data, setData] = useState(null);
    const [searchedUsers, setSearcherUsers] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (state.token) {
            fetch(`https://yofigram.onrender.com/api/users`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${state.token}`
                }
            }).then(res => res.json()).then(data => {
                if(data.status == "success") {
                    setData(data)
                } else {
                    setData(null)
                }
            }).catch(() => null)
        } else {
            fetch(`https://yofigram.onrender.com/api/users/notoken`).then(res => res.json()).then(data => {
                console.log(data);
                setData(data)
            }).catch(() => null)
        }
    }, [state])
    useEffect(() => {
        if (state.token) {
            if (searchText) {
                const timer = setTimeout(() => {
                    setLoading(true)
                    fetch(`https://yofigram.onrender.com/api/search?q=${searchText}`, {
                        method: "GET",
                        headers: {
                            'Content-type': "application/json",
                            "Authorization": `Bearer ${state.token}`
                        }
                    }).then(res => res.json()).then(data => {
                        setLoading(false)
                        if (data.status == "success") {
                            setSearcherUsers({
                                users: data.foundUsers
                            })
                        }
                    })
                }, 800)
                return () => {
                    clearTimeout(timer)
                }
            } else {
                setSearcherUsers(null)
            }
        } else {
            if (searchText) {
                const timer = setTimeout(() => {
                    setLoading(true)
                    fetch(`https://yofigram.onrender.com/api/search/notoken?q=${searchText}`).then(res => res.json()).then(data => {
                        if (data.status == "success") {
                            setLoading(false)
                            setSearcherUsers({
                                users: data.foundUsers
                            })
                        }
                    })
                }, 800)
                return () => {
                    clearTimeout(timer)
                }
            } else {
                setSearcherUsers(null)
            }
        }
    }, [searchText, state])
    return (
        <div className="right-box">
            <div className="search-stage">
                <div className="search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input onChange={e => setSearchText(e.target.value)} placeholder='Search People...' type="text" />
                </div>
                {searchText && searchText.length >= 1 && <div className="results">
                    <div className="users-box">
                        <p className='result-heading'>Showing results for <span>{`${searchText}`}</span></p>
                        <div className="users">
                            {loading && <ReactLoading type='spokes' color='purple' />}
                            {searchedUsers && searchedUsers.users.map((item, index) => {
                                // return <Link to={`/profile/${item.username}`} key={index}>
                                //     <div className="user">
                                //         <div className="img">
                                //             <img className='profile-img' src={item.profile_picture} alt="" />
                                //         </div>
                                //         <div className="info">
                                //             <p>{item.Account_name}</p>
                                //             <span>@{item.username}</span>
                                //         </div>
                                //     </div>
                                // </Link>
                                return <User key={index} username={`${item.username}`} Account_name={`${item.Account_name}`} profile_picture={`${item.profile_picture}`} />
                            })}
                        </div>
                    </div>

                </div>}
            </div>

            <div className="suggestion">
                <div className="header">
                    {/* <span>Suggested users</span> */}
                </div>
                <div className="suggested-users">

                    {/* {isLoading && <ReactLoading type='spokes' color='green' />} */}
                    {Data && Data.data.map((item, index) => {

                        return <Link key={index} to={`/profile/${item.username}`}>
                            <div className="suggested-user" >
                                <div className="main-info" >
                                    <div className='prof-img-border'>
                                        <img className='profile-img' src={item.profile_picture} alt="" />
                                    </div>
                                    <div className="suggested-user-info">
                                        <span>@{item.username}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    })}


                </div>
            </div>
        </div>

    )
}

export default Suggested