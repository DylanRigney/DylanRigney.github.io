import Logo from '../../assets/images/Slate and Gold D3.png'
import { Link } from 'react-router-dom';
import Loader from 'react-loaders';
import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import { useEffect, useState } from 'react';

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const nameArray = ['y', 'l', 'a', 'n'];
    const jobArray = ['S', 'o', 'f', 't', 'w', 'a', 'r', 'e', ' ', 'E', 'n', 'g', 'i', 'n', 'e', 'e', 'r'];

    useEffect(() => {
        // return setTimeout(() => {
        //   setLetterClass('text-animate-hover')
        // }, 4000)
      }, []);
   

    return (
        <div className="container home-page">
            <div className="text-zone">
                <h1>
                <span className={letterClass}>H</span>
                <span className={`${letterClass} _12`}>e</span>
                <span className={`${letterClass} _13`}>l</span>
                <span className={`${letterClass} _14`}>l</span>
                <span className={`${letterClass} _15`}>o,</span>
                <br />
                <span className={`${letterClass} _16`}>I</span>
                <span className={`${letterClass} _17`}>'</span>
                <span className={`${letterClass} _18`}>m</span>
                <img src={Logo} alt='developer'></img>
                <AnimatedLetters  letterClass={letterClass}
                strArray={nameArray} idx={21} />
                <br />
                <AnimatedLetters  letterClass={letterClass}
                strArray={jobArray} idx={28} />
                </h1>
                <h2>Fullstack Developer / Technical Instructor / AI Enthusiast</h2>
                <Link to="/contact" className='flat-button'>CONTACT ME</Link>
            </div>
        </div>

    );
}

export default Home