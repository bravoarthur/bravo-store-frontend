import { useEffect, useState } from 'react';
import { PageContainer} from '../../components/MainComponent'
import useApi from '../../helpers/BravoStoreAPI'
import { AdsArea } from './styled';
import {useLocation, useNavigate} from 'react-router-dom'
import AdItem from '../../components/partials/AdItem';

type StateType = {
    name: string,
    _id: string
}

type CategoriesType = {
    img: string,
    name: string,
    slug: string,
    _id: string
}

type OthersType = {
    id: string,
    image: string,
    price: number,
    priceNegotiable: boolean,
    title: string
}

let timer: NodeJS.Timeout

function Ads() {

    const api = useApi
    const navigate = useNavigate()
    
    const useQueryString = () => {
        return new URLSearchParams(useLocation().search)
    }

    const queryGetter = useQueryString()

    let limitPag = 2
    const [adsTotal, setAdsTotal] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [stateList, setStateList] = useState([] as StateType[])
    const [categories, setCategories] = useState([] as CategoriesType[])
    const [adList, setAdList] = useState([] as OthersType[])

    const [query, setQuery] = useState(queryGetter.get('q') != null ? queryGetter.get('q') as string : '')
    const [cat, setCat] = useState(queryGetter.get('cat') !=null ? queryGetter.get('cat') as string : '')
    const [region, setRegion] = useState(queryGetter.get('state') !=null ? queryGetter.get('state') as string : '')

    const [resultOpacity, setResultOpacity] = useState(1)    
    const [loading, setLoading] = useState(true)

    const getAdsList = async() => {        
        setLoading(true)    
        let offSet = (currentPage -1) *2        
        const json = await  api.getAds({
            sort: 'desc',
            limit: limitPag,
            q: query,
            cat,
            state: region,
            offset: offSet,
        })
        setAdList(json.ads)
        setAdsTotal(json.total)
        setResultOpacity(1)
        setLoading(false)
    }

    useEffect(()=> {

        let queryString = []
        if(query) {
            queryString.push(`q=${query}`)
        }
        if(cat) {
            queryString.push(`cat=${cat}`)
        }
        if(region) {
            queryString.push(`state=${region}`)
        }
        navigate({search:`?${queryString.join('&')}`})

        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(getAdsList, 2000)
        setCurrentPage(1)  
        setResultOpacity(0.2)     

    }, [query, cat, query, region, navigate])
   
    useEffect(() => {
        const getStates = async () => {
            const slist:StateType[]  = await  api.getStates()
            setStateList(slist)
        }
        getStates()
    }, [api])

    useEffect(() => {
        const getCats = async () => {
            const cats:CategoriesType[]  = await  api.getCategories()
            setCategories(cats)
        }
        getCats()
    }, [api])

   useEffect(()=> {
        if(adList.length > 0) {
            setPageCount(Math.ceil(adsTotal/limitPag))            
        } else {
            setPageCount(0)
        }

        //paginacao

   }, [adsTotal, adList.length, limitPag])

   useEffect(() => {
        getAdsList()
   }, [currentPage])

   let pagination = []
   for(let i=1; i<=pageCount; i++) {
    pagination.push(i)
   }
   
    return (

        <PageContainer>

            <AdsArea>
                <div className='leftSide'>
                    <form method='GET'>
                        <input type='text' name='query' placeholder='Search...' value={query} onChange={(event => setQuery(event.target.value))}/>
                        <div className='filterName'>State:</div>
                        <select name='state' value={region} onChange={event => {
                                setCurrentPage(1)
                                setRegion(event.target.value)
                                }
                            }>
                            <option></option>
                            {stateList.map((item, index) => 
                            <option key={item._id} value={item.name}>{item.name}</option>)}
                        </select>
                        <div className='filterName'>Category:</div>
                        <ul>
                            {categories.map((item, index) => 
                            <li key={item._id} className={cat===item.slug ? 'categoryItem active': 'categoryItem' } onClick={() =>  { 
                                setCurrentPage(1)
                                setCat(item.slug)}
                                }>
                                <img src={item.img} alt=''/>
                                <span>{item.name}</span>
                            </li> )}
                        </ul>
                    </form>
                </div>
                <div className='rightSide'>

                    <h2>Results</h2>
                    {loading &&
                        <div className='listWarning'>Loading...</div>
                    }
                    {!loading && adList.length===0 &&
                        <div className='listWarning'>No Results Found.</div>
                    }
                    <div className='list' style={{opacity: resultOpacity}}>
                        {adList.map((item, index) => 
                            <AdItem key={index} {...item}/>
                        )}

                    </div>

                    <div className='pagination'> 
                        {pagination.map ((item, index) => 
                            <div onClick={() => setCurrentPage(item)} className={item===currentPage ? 'pagItem active' : 'pagItem'} key={index} >{item}</div>
                        )}
                    </div>

                  
                </div>
            </AdsArea>
                  
        
        </PageContainer>


    );
}

export default Ads;