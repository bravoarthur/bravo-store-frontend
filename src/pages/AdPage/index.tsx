import { useEffect, useState } from 'react';
import { PageContainer} from '../../components/MainComponent'
import useApi from '../../helpers/BravoStoreAPI'
import { AdArea, BreadCrumb, Fake, OthersArea  } from './styled';
import {Link, useParams} from 'react-router-dom'
import {Slide} from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import AdItem from '../../components/partials/AdItem';

type OthersType = {
    id: string,
    image: string,
    price: number,
    priceNegotiable: boolean,
    title: string
}


type AdType = {
    
    id: string,
    title: string,
    price: string,
    priceNegotiable: boolean,
    description: string,
    dateCreated: string,
    views: string,
    images: [],
    category: {name: string, slug: string, _id: string},
    userInfo: {name: string, email: string},
    state: string,
    others: OthersType[]
    
}


function AdPage() {

    const api = useApi
    
    const { id } = useParams()
    
    const [loading, setLoading] = useState(true)
    const [adInfo, setAdInfo] = useState({} as AdType)

    useEffect(() => {        
        const getAdInfo = async (id: string) => {         
            const json = await api.getAd(id, true)           
            setAdInfo(json)
            setLoading(false) 
        }
        getAdInfo(id!)
    }, [id, api])
    

    const formatDate = (date: string) => {
        let cDate = new Date(date)
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let cDay = cDate.getDate()
        let cMonth = cDate.getMonth()
        let cYear = cDate.getFullYear()
        return `${cDay}/${months[cMonth]}/${cYear}`
    }        


    return (        
        
        <PageContainer>
            <BreadCrumb>
                <Link to='/'>Home</Link>
                / 
                <Link to={`/ads?state=${adInfo.state}`}>{adInfo.state}</Link>
                /<Link to={`/ads?state=${adInfo.state}&cat=${adInfo.category? adInfo.category.slug : ''}`}>{adInfo.category? adInfo.category.name : '' }</Link>
                / {adInfo.title}
            </BreadCrumb>
            <AdArea>
                <div className='leftSide'>
                    <div className='box'>

                        <div className='adImage'>
                            {loading && <Fake height={300}></Fake>}
                            { 
                            adInfo.images && 
                                
                                adInfo.images.length?
                                
                                <Slide>
                                    {adInfo.images.map((item, index) => 
                                        <div key={index} className='each-slide' >
                                            <img src={item} alt=''/>
                                        </div>
                                    )}
                                </Slide> : ''
                            
                            }
                        </div>

                        <div className='adInfo'>
                            <div className='adName'>
                                {loading && <Fake height={20}></Fake>}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>                                
                                }

                                {adInfo.dateCreated && 
                                    <small>Created: {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className='adDescription'>
                                {loading && <Fake height={100}></Fake>}
                                {adInfo.description}
                                <hr/>
                                {adInfo.views && 
                                    <small>views: {adInfo.views}</small>                                
                                }
                            </div>
                        </div>

                    </div>
                </div>

                <div className='rightSide'>
                    <div className='box box--padding'>{loading && <Fake height={20}></Fake>}
                        {adInfo.priceNegotiable && 
                            "Negotiable Price"
                        }
                        {!adInfo.priceNegotiable && adInfo.price && 
                            <div className='price'>
                                Price: <span>AU ${adInfo.price}</span> 
                            </div>
                        }
                    </div>

                    {loading && <Fake height={50}></Fake>}
                    {adInfo.userInfo &&
                    
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} target='_blank' rel='noreferrer' className='contactSeller'>Contact Seller</a>

                            <div className='createdBy box box--padding'>
                                Created by:  
                                <strong> {adInfo.userInfo.name}</strong>
                                <small>E-mail: {adInfo.userInfo.email} </small>
                                <small>State: {adInfo.state}</small>                                
                            </div>                    
                        </>
                    }
                </div>   
            </AdArea>

            <OthersArea>
            
                {adInfo.others ? 

                    <>
                        <h2>Other products from Seller</h2>
                        <div className='list'>
                            {adInfo.others.map((item, index) => 
                                <AdItem key={index} {...item}></AdItem>                                
                            )}
                        </div>

                    </> : ''

                }
            </OthersArea>   


        </PageContainer>

    );
}

export default AdPage;