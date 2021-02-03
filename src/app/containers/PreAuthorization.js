import {unsplash} from '../unsplash'
import {getFromUrlReselected} from '../selectors/selectors';
import {connect} from 'react-redux';


const PreAutorization = ({fromUrl}) => {
    if (fromUrl) localStorage.setItem(`fromPhotoId`, fromUrl)
    const authenticationUrl = unsplash.auth.getAuthenticationUrl([`public`, `write_likes`]);
        document.location.assign(authenticationUrl);
    return null;
}

const mapStateToProps = (state) => {
    return {
        fromUrl: getFromUrlReselected(state)
    };
};

export default connect(mapStateToProps, null)(PreAutorization);
