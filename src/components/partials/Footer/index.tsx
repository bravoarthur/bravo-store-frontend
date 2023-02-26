import { Link } from "react-router-dom";
import { FooterArea } from "./styled";

function Footer() {
    return (  

        <FooterArea>
            <Link to='/about'>About</Link>
        </FooterArea>
    );
}

export default Footer;