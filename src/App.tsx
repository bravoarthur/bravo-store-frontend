import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import { Template } from './components/MainComponent';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';
import SignIn from './pages/SignIn';



function App() {

    return (

        <Template>
            <Header/>
            <Routes>
                
                <Route path='/' element={<Home/>} />   
                <Route path='/about' element={<About/>} /> 
                <Route path='/signin' element={<SignIn/>} />
                <Route element=""/>           

            </Routes>
            <Footer/>
        </Template>

    

   


    );
}

export default App;
