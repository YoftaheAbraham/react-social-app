import { Link } from 'react-router-dom'
import { formatText } from '../../utils/textFormatter'
const Save = ({ postID, postedUserAccountName, postTextContent }) => {
    return (
        <Link to={`/post/${postID}`}>
            <div className="saved-item">
                {/* <div className="post-content">
                    <img src={testImage} alt="" />
                </div> */}
                <div className="content">
                    <h2>{postedUserAccountName}</h2>
                    <p>{formatText(`${postTextContent}`, 20)}</p>
                </div>
            </div>
        </Link>
    )
}

export default Save