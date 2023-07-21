import './App.css';
import React, { useState } from 'react';
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
    let apiKey = process.env.REACT_APP_NEWS_API;
    let pageSize = 9;
    let country = "in";
    return (
        <>
            <Router>
                <Navbar />
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

