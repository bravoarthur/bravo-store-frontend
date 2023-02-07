import { useEffect, useState } from 'react';
import { PageContainer} from '../../components/MainComponent'
import useApi from '../../helpers/BravoStoreAPI'
import { AdArea, Fake  } from './styled';
import {Link, useParams} from 'react-router-dom'
import AdItem, { PropsType } from '../../components/partials/AdItem';



function AdPage() {

    const api = useApi()

    const { id } = useParams()
    
    const [loading, setLoading] = useState(true)
    const [adInfo, setAdInfo] = useState([])

    
    return (

        
        
        <PageContainer>
            <AdArea>
                <div className='leftSide'>
                    <div className='box'>

                        <div className='adImage'>
                            {loading && <Fake height={300}></Fake>}
                        </div>

                        <div className='adInfo'>
                            <div className='adName'>
                                {loading && <Fake height={20}></Fake>}
                            </div>
                            <div className='adDescription'>
                                {loading && <Fake height={100}></Fake>}
                            </div>
                        </div>

                    </div>
                </div>

                <div className='rightSide'>
                    <div className='box box--padding'>{loading && <Fake height={20}></Fake>}</div>
                    <div className='box box--padding'>{loading && <Fake height={50}></Fake>}</div>
                </div>
                
            </AdArea>   
        </PageContainer>

    );
}

export default AdPage;