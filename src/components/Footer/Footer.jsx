import { Link } from 'react-router-dom';
import githubPic from '../../images/github.png';
import fbPic from '../../images/fb.png';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <p className='footer__copyright'>@ 2023 Supersite, Didukung oleh News API</p>
        <div className='footer__link-container'>
          <div className='footer__url-container'>
            <Link to="/" className='footer__url'>Beranda</Link>
            <Link to="/" className='footer__url'>TripleTen</Link>
          </div>
          <div className='footer__social'>
            <img src={githubPic} className='footer__social-icon' alt='Github Icon' />
            <img src={fbPic} className='footer__social-icon' alt='Github Icon' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;