import { ErrorMessage, PageContainer, PageTitle } from "../../components/MainComponent";
import { SignArea } from "./styled";
import {useState} from 'react'
import useApi from '../../helpers/BravoStoreAPI'
import { doLogin } from "../../helpers/authHandler";
import {useNavigate} from 'react-router-dom'

type JsonType = {
    error?: any
    email?: string,
    token?: string,
}

type ErrorType = {
    param: string,
    msg: string
}


function SignIn() {

    const api = useApi
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberPass, setRememberPass] = useState(false)

    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState({} as ErrorType)


    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        setDisabled(true)
        setError({} as ErrorType)

        const json = await api.login(email, password)   as JsonType 
        
        if(json.error) {
            setError(json.error[0])            
            setDisabled(false)
            return
        } else {
            doLogin(json.token!, rememberPass)
            setDisabled(false)
            navigate('/')   
            navigate(0)        
        }
    }


    return (  

        <PageContainer>

            <PageTitle>Login</PageTitle>
            <SignArea>
                {error.param && 
                <ErrorMessage>
                    {`Error - ${error.msg}`}
                </ErrorMessage>
                }
                <form onSubmit={handleSubmit}>                
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input type="email" required disabled={disabled} value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Password</div>
                        <div className="area--input">
                            <input type="password" required disabled={disabled} value={password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}/>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Remember Password</div>
                        <div className="area--input">
                            <input className='chkbox'type="checkbox" disabled={disabled} checked={rememberPass} onChange={() => setRememberPass(!rememberPass)}/>
                        </div>
                    </label>
                    <div className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Log In</button>
                        </div>
                    </div>
                </form>
            </SignArea>
            
        </PageContainer>
    );
}

export default SignIn;