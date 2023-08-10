import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar'
import News from './Components/News';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';


export default function App() {
    const [progress, setProgress] = useState(0)
    const apiKey = process.env.REACT_APP_NEWS_API;
    const pageSize = 9;
    const [country, setCountry] = useState("in")
    const countries = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'];

    useEffect(() => {
        let countrySelected = localStorage.getItem("country")
        if (countrySelected){
            setCountry(countrySelected)
        } else {
            alert("Please select your country")
        }
    }, [setCountry])

    const setCountryOnChange = (toCountry) => {
        localStorage.setItem("country", toCountry);
        setCountry(toCountry)
        console.log("insetcountryonchange");
    }
    
    return (
        <>
            <Router>
                <Navbar key="navbar" countries={countries} setCountry={setCountryOnChange} />
                <div>
                    <LoadingBar
                        height={3}
                        color='#f11946'
                        progress={progress}
                        onLoaderFinished={()=>{setProgress(0)}}
                    />
                </div>
                <Routes>
                    <Route exact path='/' element={<News setProgress={setProgress} key="home" apiKey={apiKey} category="general" country={country} pageSize={pageSize} />} />
                    <Route exact path='/Business' element={<News setProgress={setProgress} key="business" apiKey={apiKey} category="business" country={country} pageSize={pageSize} />} />
                    <Route exact path='/Entertainment' element={<News setProgress={setProgress} key="entertainment" apiKey={apiKey} category="entertainment" country={country} pageSize={pageSize} />} />
                    <Route exact path='/General' element={<News setProgress={setProgress} key="general" apiKey={apiKey} category="general" country={country} pageSize={pageSize} />} />
                    <Route exact path='/Health' element={<News setProgress={setProgress} key="health" apiKey={apiKey} category="health" country={country} pageSize={pageSize} />} />
                    <Route exact path='/Science' element={<News setProgress={setProgress} key="science" apiKey={apiKey} category="science" country={country} pageSize={pageSize} />} />
                    <Route exact path='/Sports' element={<News setProgress={setProgress} key="sports" apiKey={apiKey} category="sports" country={country} pageSize={pageSize} />} />
                    <Route exact path='/Technology' element={<News setProgress={setProgress} key="technology" apiKey={apiKey} category="technology" country={country} pageSize={pageSize} />} />
                </Routes>
            </Router>
        </>
    )
}

