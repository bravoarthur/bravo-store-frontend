import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import { Template } from './components/MainComponent';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import SignUp from './pages/Signup';
import AdPage from './pages/AdPage';
import PrivateRouteHandler from './helpers/PrivateRouteHandler';



function App() {

    return (

        <Template>
            <Header/>
            <Routes>
                
                <Route path='/' element={<Home/>} />   
                <Route path='/about' element={<About/>}/> 
                <Route path='/signin' element={<SignIn/>} />
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/ad/:id' element={<AdPage/>}/>
                <Route path="*" element={<NotFound/>} />           

            </Routes>
            <Footer/>
        </Template>

    

   


    );
}

export default App;
