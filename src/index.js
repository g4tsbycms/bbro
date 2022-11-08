import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
// Styles
import './sass/main.scss';
// Images
import logo from './images/logo.png';
// Custom Components
//import About from './components/pages/About.js';
import BingoGame from './components/BingoGame.js';
import CardGenerator from './components/pages/CardGenerator.js';
//import Donate from './components/pages/OldPages/Donate.js';
//import Help from './components/pages/Help.js';
//import Privacy from './components/pages/Privacy.js';
//import ReleaseNotes from './components/pages/OldPages/ReleaseNotes.js';
//import Terms from './components/pages/Terms.js';
//import Patterns from './components/pages/Patterns.js';
// import TellYourFriends from './components/subcomponents/TellYourFriends.js';

const routing = (
  <Router>
    <header>
      
      <div className="container row align-center">
        
        <div className="col shrink">
          <Link to="/"><img src={logo} alt="BingoBrothers" width="1000" 
     height="400"className="logo" /></Link>
        </div>
        
        <div className="col grow padding-md no-text-wrap text-right">
          <ul className='menu'>
            <li><Link to="/">BINGO</Link></li>
            <li><Link to="/generator">CARTELAS</Link></li>
            {/*<li><Link to="/help">Ajuda</Link></li>*/}
            
            
          </ul>
        </div>
        <div className="col shrink text-right margin-left-lg">
          <div id="google_translate_element"></div>
        </div>
        
      </div>
    </header>
    
    <Route exact path="/" component={BingoGame} />
   
   

  


    <Route path="/generator" component={CardGenerator} />
    {/*<Route path="/terms" component={Terms} />*/}
     {/*<Route path="/patterns" component={Patterns} />*/}
    {/*<Route path="/privacy" component={Privacy} />*/}
    
      {/*<Route path="/help" component={Help} />*/}
    
    <footer>
    
      <div className="container row three-cols align-center">
        
        <div className="col">
          <div className="addthis_inline_share_toolbox"></div>
        </div>
        <div className="col text-center">&copy; 2022 - {new Date().getFullYear()} <a href="tel:+5567992829905">SUPORTE: Genilson M. Souza - Tecnologia e Sistemas</a></div>
        <div className="col text-right">
          Uso somente para diversão e entretenimento aos clientes.<br/>
          {/** 
          <Link to="/releases">Release Notes</Link> | <Link to="/terms">Termos de Uso</Link> | <Link to="/privacy">Cookies &amp; Privacy Policy</Link>
        */}
        
        </div>
      </div>
    </footer>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));