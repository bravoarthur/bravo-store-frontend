import { ErrorMessage, PageContainer, PageTitle } from "../../components/MainComponent";
import {useState, useEffect} from 'react'
import useApi from '../../helpers/BravoStoreAPI'
import { doLogin } from "../../helpers/authHandler";
import {useNavigate} from 'react-router-dom'
import { SignUpArea } from "./styled";


type ErrorType = {
    param: string,
    msg: string
}

type StateType = {
    name: string,
    _id: string, 
}


function SignUp() {

    const api = useApi
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [stateLoc, setStateLoc] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [stateList, setStateList] = useState([] as StateType[])

    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState({} as ErrorType)

    useEffect(() => {
        const getStates = async () => {
            const slist:StateType[] = await api.getStates()
            setStateList(slist)

        }
        getStates()

    }, [api])


    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        setDisabled(true) 
        setError({} as ErrorType)

        if(password !== confirmPass) {
            setError({param: 'password', msg: 'Password is different of confirmation password'})
            setDisabled(false) 
            return
        }

        const json = await api.register(name, email, password, stateLoc)

        if(json.error) {
            setError(json.error[0])            
            setDisabled(false)
            return
        } else {
            doLogin(json.token!)
            setDisabled(false)
            navigate('/')   
            navigate(0)        
        }



    }




    return (  

        <PageContainer>

            <PageTitle>Sign Up</PageTitle>

            <SignUpArea>
                {error.param && 
                <ErrorMessage>
                    {`${error.param} error - ${error.msg}`}
                </ErrorMessage>
                }
                <form onSubmit={handleSubmit}>   

                    <label className="area">
                        <div className="area--title">Name </div>
                        <div className="area--input">
                            <input type="text" required disabled={disabled} value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}/>
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title">State</div>
                        <div className="area--input">
                            <select required value={stateLoc} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setStateLoc(event.target.value)}>
                                <option value=""></option>
                                {stateList.map((item, index) => {

                                    return <option key={index} value={item._id}>{item.name}</option>

                                })}

                            </select>
                        </div>
                    </label>

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
                        <div className="area--title">Confirm Password</div>
                        <div className="area--input">
                            <input type="password" required disabled={disabled} value={confirmPass} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPass(event.target.value)}/>
                        </div>
                    </label>
                    <div className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Sign Up</button>
                        </div>
                    </div>
                </form>
            </SignUpArea>
            
        </PageContainer>
    );
}

export default SignUp;