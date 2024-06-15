import "./profComp.css"
import { Skeleton } from 'react-skeleton-generator'


const ProfileComponentSkeleton = () => {
  return (
    <Skeleton.SkeletonThemeProvider style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: "50rem"
    }} color="#666" animation='shimmer'>
      <Skeleton width='7rem' height='7rem' borderRadius='50%' />
      <Skeleton width='12rem' height='1rem' />
      <Skeleton width='6rem' height='1rem' />
      {/* <Skeleton width='8rem' height='2rem' /> */}
      <div style={{
        marginTop: "1rem",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Skeleton count={2} heightMultiple={["1rem", '1rem']} widthMultiple={["80%", "50%"]} />

      </div>
      <div style={{
        marginTop: "1rem",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Skeleton height='4rem' width='90%' />

      </div>
    </Skeleton.SkeletonThemeProvider>
    //   <div className="user-profile-pic">
    //     {/* <img src={ProfileIcon} alt="Pic" /> */}
    //   </div>
    //   <div className="user-info">
    //     {/* <span>{Account_Name}</span><br />
    //       <span>@{Username}</span> */}
    //   </div>
    //   <div className="user-responses">
    //     {/* {profileData.isMe && <Button type='primary' padding={0.5} text='Edit Profile' />}
    //       {profileData.isFollowed && <Button type='secondary' clickHandler={unfollowUser} padding={0.5} text='Following' />}
    //       {!profileData.isFollowed && !profileData.isMe && <Button clickHandler={followUser} type='primary' padding={0.5} text='Follow' />} */}
    //   </div>
    //   <div className="user-bio">
    //     <p>
    //       {/* {bio} */}
    //     </p>
    //   </div>
    //   <div className="user-numeric-info">
    //     <div className="numeric-info">
    //       {/* <span className="value">{profileData.following}</span> */}
    //       <div className="text">Following</div>
    //     </div>
    //     <div className="numeric-info">
    //       {/* <span className="value">{profileData.postNumber}</span> */}
    //       <div className="text">Posts</div>
    //     </div>
    //     <div className="numeric-info">
    //       {/* <span className="value">{profileData.followers}</span> */}
    //       <div className="text">Followers</div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default ProfileComponentSkeleton;