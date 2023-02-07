import { useEffect, useState } from 'react';
import { PageContainer} from '../../components/MainComponent'
import useApi from '../../helpers/BravoStoreAPI'
import { HomeArea, SearchArea  } from './styled';
import {Link} from 'react-router-dom'
import AdItem, { PropsType } from '../../components/partials/AdItem';

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



function Home() {

    const api = useApi()

    const [stateList, setStateList] = useState([] as StateType[])
    const [categories, setCategories] = useState([] as CategoriesType[])
    const [adList, setAdList] = useState([])

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

    useEffect(() => {
        const getRecentAds = async () => {
            const json = await  api.getAds({
                sort: 'desc',
                limit: 8
            })
            setAdList(json.ads)
        }
        getRecentAds()
    }, [api])
    


    return (

        <>
            <SearchArea>
                <PageContainer>
                    <div className='searchBox'>
                        <form method="GET" action='/ads'>
                            <input type="text" name="q" placeholder='Search on B-S'/>
                            <select name="state">                                
                                {stateList.map((item, index) => 
                                   <option value={item._id} key={index}>{item.name}</option>
                                )}
                            </select>
                            <button>Search</button>

                        </form>
                    </div>

                    <div className='categoryList'>
                        {categories.map((item, index) => 
                            <Link key={index} to={`/ads?cat=${item.slug}`} className='categoryItem'>
                                <img src={item.img} alt=''></img>
                                <span>{item.name}</span>
                            </Link>
                        )}

                    </div>
                </PageContainer>
            </SearchArea>


            <PageContainer>
                <HomeArea>
                    <h2>Recent ads</h2>
                    <div className='list'>
                        {adList.map((item, index) => 
                        <AdItem key={index} {...item as PropsType } />
                        )}
                    </div> 
                    <Link to='/ads' className='seeAllLink' >View All</Link>      

                    <hr/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae labore eius placeat! Vero, dignissimos. Architecto ad voluptatibus ut recusandae aspernatur beatae officia? Ratione voluptas accusantium iste placeat dolorum laudantium? Necessitatibus.       

                </HomeArea>
            </PageContainer>        
        
        </>


    );
}

export default Home;