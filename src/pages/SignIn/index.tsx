import { PageContainer, PageTitle } from "../../components/MainComponent";
import { SignArea } from "./styled";


function SignIn() {

    return (  

        <PageContainer>

            <PageTitle>Login</PageTitle>
            <SignArea>
                <form>                
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input type="email"/>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Password</div>
                        <div className="area--input">
                            <input type="password"/>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Remember Password</div>
                        <div className="area--input">
                            <input className='chkbox'type="checkbox"/>
                        </div>
                    </label>
                    <div className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button>Log In</button>
                        </div>
                    </div>
                </form>
            </SignArea>
            
        </PageContainer>
    );
}

export default SignIn;