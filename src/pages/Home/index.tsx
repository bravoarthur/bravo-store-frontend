import { PageContainer} from '../../components/MainComponent'
import useApi from '../../helpers/BravoStoreAPI'
import { HomeArea, SearchArea  } from './styled';

function Home() {

    const api = useApi()




    return (

        <>
            <SearchArea>
                <PageContainer>
                    <div className='searchBox'>
                        <form method="GET" action='/ads'>
                            <input type="text" name="q" placeholder='Search on B-S'/>
                            <select name="state">
                                <option></option>
                            </select>
                            <button>Search</button>

                        </form>
                    </div>

                    <div className='categoryList'>

                    </div>
                </PageContainer>
            </SearchArea>


            <PageContainer>
                <HomeArea>

                </HomeArea>
            </PageContainer>        
        
        </>


    );
}

export default Home;