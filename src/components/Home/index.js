import Logo from '../../assets/images/Slate and Gold D3.png'
import { Link } from 'react-router-dom';
import './index.scss';
const Home = () => {
    return (
        <div className="container home-page">
            <div className="text-zone">
                <h1>Hello, <br /> I'm
                <img src={Logo} alt='developer'></img>
                ylan
                <br />
                Software Engineer
                </h1>
                <h2>Fullstack Developer / AI Enthusiast</h2>
                <Link to="/contact" className='flat-button'>CONTACT ME</Link>
            </div>
        </div>

    );
}

export default Home