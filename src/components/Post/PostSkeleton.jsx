
import './post.css'
import { Skeleton } from 'react-skeleton-generator';



const PostSkeleton = () => {

    return (
        <div className="post">
            {/* <div className="left">
                <Link to={`/profile/${postData.postedUserId}`}>
                </Link>
            </div> */}

            <div className="right">
                <div className="header-info">


                    <div className="start">

                        {/* <img src={profilePicture} alt="" /> */}
                        {/* <Link to={`/profile/${postData.postedUserId}`}>
                            <div className="user">
                                <span className='Acc-name'>{postData.postedUserAccountName}</span>
                                {postData.postedUserName && <span className='User-name'>@{postData.postedUserName}</span>}
                            </div>
                        </Link> */}
                    </div>

                </div>
                <div className="post-body-content">
                    <div className="account-content-skeleton">
                        <div className="skeleton-content" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <Skeleton.SkeletonThemeProvider color="#333" animation='shimmer' style={{
                                display: 'flex',

                                gap: "1rem"
                            }}>
                                <div className="field-skeleton">
                                    <Skeleton style={{
                                        minWidth: "3rem",
                                        minHeight: "3rem"
                                    }} borderRadius='50%' />
                                </div>
                                <div className="field-skeleton">
                                    <Skeleton style={{
                                        // minWidth: "5rem",
                                        maxHeight: "1rem"
                                    }} count={2} widthMultiple={["6rem", "4rem"]} />
                                </div>

                            </Skeleton.SkeletonThemeProvider>
                            <Skeleton.SkeletonThemeProvider color="#333" animation='shimmer'>
                                <Skeleton width='5rem' height='1rem' />
                            </Skeleton.SkeletonThemeProvider>
                        </div>
                    </div>
                    <div className="post-text-skeleton">
                        <Skeleton.SkeletonThemeProvider color="#333" animation='shimmer'>
                            <Skeleton count={4} widthMultiple={['100%', '100%', '100%', '64%']} heightMultiple={['15px', '15px', '15px', '15px']} />
                            <Skeleton height='10rem' width='100%'/>
                        </Skeleton.SkeletonThemeProvider>
                    </div>
                </div>
                <div className="post-bottom-options" style={{
                    display: 'flex',
                    justifyContent: "space-between"
                }}>
                    <Skeleton.SkeletonThemeProvider style={{ display: "flex", gap: "1rem" }} color="#333" animation='shimmer'>
                        <Skeleton height='20px' width='20px' borderRadius='50%' />
                        <Skeleton height='20px' width='20px' borderRadius='50%' />
                    </Skeleton.SkeletonThemeProvider>
                    <Skeleton.SkeletonThemeProvider style={{ display: "flex", gap: "1rem" }} color="#333" animation='shimmer'>
                        <Skeleton height='20px' width='20px' borderRadius='50%' />
                    </Skeleton.SkeletonThemeProvider>
                </div>

            </div>
        </div>
    )
}

export default PostSkeleton;