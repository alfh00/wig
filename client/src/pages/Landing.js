import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* {info} */}
        <div className="info">
          <h1>
            come <span>work</span> in <span>greece</span>
          </h1>
          <p>
            I'm baby green juice live-edge sriracha typewriter, pitchfork vegan
            cold-pressed plaid tote bag air plant flexitarian. Heirloom
            williamsburg forage organic four loko ramps twee umami dreamcatcher
            pork belly leggings vaporware trust fund.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="get a job" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
