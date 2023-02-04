import { HeaderArea } from "./styled";
import {Link} from 'react-router-dom'
import { isLogged } from "../../../helpers/authHandler";

function Header() {

    let logged = isLogged()


    return (

        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                        <span className="logo-1">B</span>
                        <span className="logo-2">-</span>
                        <span className="logo-3">S</span>

                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged &&

                            <>
                                <li>
                                    <Link to="">My Account</Link>
                                </li>
                                <li>
                                    <Link to="">Logout</Link>
                                </li>   
                                <li>
                                    <Link to="" className="button">Sell now!</Link>
                                </li>
                            </>
                        
                        }

                        {!logged &&

                            <>
                                <li>
                                    <Link to="./signin">Sign In</Link>
                                </li>
                                <li>
                                    <Link to="">Sign Up</Link>
                                </li>
                            </>
                        }
                        
                    </ul>
                </nav>
            </div>

        </HeaderArea>
    );
}

export default Header;