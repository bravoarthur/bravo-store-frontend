import { ErrorMessage, PageContainer, PageTitle } from "../../components/MainComponent";
import { SignArea } from "./styled";
import useApi from '../../helpers/BravoStoreAPI'
import {useNavigate} from 'react-router-dom'
import { useEffect, useRef, useState } from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

type JsonType = {
    error?: any
    email?: string,
    token?: string,
}

type ErrorType = {
    param: string,
    msg: string
}

type CatsType = {
    _id: string,
    name: string,
    slug: string,
    img: string
}


function AddAd() {

    const api = useApi()
    const history = useNavigate()

    const fileField = useRef<HTMLInputElement>(null)
    
    const [categories, setCategories] = useState([] as CatsType[])
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [priceNeg, setPriceNeg] = useState(false)
    const [desc, setDesc] = useState('')
    
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState({} as ErrorType)

    useEffect(() => {
        const getCats = async () => {
            const cats = await api.getCategories()
            if(cats.error) {
                setError(cats.error)
            }
            setCategories(cats)            
        }
        getCats()
    }, [])

    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        setDisabled(true)
        setError({} as ErrorType)        

        if(!title.trim()) {
            setError({
                param: 'Title',
                msg: 'Insert a Title'
            })
            setDisabled(false)
            return
        }

        if(!category) {
            setError({
                param: 'Category',
                msg: 'Select a Category'
            })
            setDisabled(false)
            return
        }
        
        const fData = new FormData()
        fData.append('title', title)
        fData.append('desc', desc)
        fData.append('cat', category)
        fData.append('price', price)
        fData.append('priceNeg', priceNeg.toString())
        
                 
        if(fileField.current?.files?.length) {
            for(let i = 0; i<fileField.current.files.length; i++) {
                fData.append('img', fileField.current.files[i])
            } 
        }

        const json = await api.AddAd(fData)

        if(json.error) {
            setError(json.error)
            setDisabled(false)
            return
        }
        
        history(`/ad/${json.id}`)
        setDisabled(false)
        return
    }

    const priceMask = createNumberMask({
        prefix: 'AU ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ',',
        allowDecimal: true,
        decimalSymbol: '.'

    })

    return (  

        <PageContainer>

            <PageTitle>Sell Now!</PageTitle>
            <SignArea>
                {error.param && 
                <ErrorMessage>
                    {`Error - ${error.msg}`}
                </ErrorMessage>
                }
                <form onSubmit={handleSubmit}>                
                    <label className="area">
                        <div className="area--title">Title</div>
                        <div className="area--input">
                            <input type="text" required disabled={disabled} value={title} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}/>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Category</div>
                        <div className="area--input">
                            <select disabled={disabled} required onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setCategory(event.target.value)}>
                                <option></option>
                                {categories.map((item, index) => 
                                    <option key={item._id} value={item._id}>{item.name}</option>                            
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Price</div>
                        <div className="area--input">
                            <MaskedInput mask={priceMask} placeholder='Au $' disabled={disabled || priceNeg} value={price} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPrice(event.target.value)} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Price Negotiable</div>
                        <div className="area--input">
                            <input type="checkbox" disabled={disabled}  checked={priceNeg} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPriceNeg(!priceNeg)}/>                            
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Description</div>
                        <div className="area--input">
                            <textarea disabled={disabled} value={desc} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setDesc(event.target.value)}/>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Images (01 or More)</div>
                        <div className="area--input">
                            <input type='file' ref={fileField} multiple  disabled={disabled}/>
                        </div>
                    </label>

                    <div className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Sell this Item</button>
                        </div>
                    </div>
                </form>
            </SignArea>
            
        </PageContainer>
    );
}

export default AddAd;