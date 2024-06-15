import './Comment.css';
import { Skeleton } from 'react-skeleton-generator';



const CommentSkeleton = () => {

    return (
        <div className="comment-box">

            {/* <Link to={`/profile/${commentedUserId}`}>
                <div className="comment-heading">
                    <div className="start">
                        <img src={profile_picture} alt="" />
                        <span className='commented-Account_name'>{Account_name}</span>
                    </div>
                    <b>{Time && timesAgo.ago(Time)}</b>
                </div>
            </Link> */}
            <Skeleton.SkeletonThemeProvider color="#333" animation='shimmer' style={{
                display: 'flex',
                alignItems: "center",
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
                    }} count={1} widthMultiple={["6rem", "4rem"]} />
                </div>

                <br />
                <br />
                <br />
                <br />
            </Skeleton.SkeletonThemeProvider>
            <div className="comment-content">
                <Skeleton.SkeletonThemeProvider color="#333" animation='shimmer'>
                    <Skeleton count={2} widthMultiple={['100%', '43%']} heightMultiple={['15px', '15px', '15px', '15px']} />
                </Skeleton.SkeletonThemeProvider>
            </div>
            <div className="information">

            </div>
        </div>
    )
}

export default CommentSkeleton;