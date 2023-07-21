import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar'
import News from './Components/News';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
    constructor() {
        super()
        this.state = {
            progress: 50
        }
    }

    setProgress = (progress) => {
        this.setState({progress: progress})
    }

    // apiKey = "164380cd683f48649733dd9fe8c9bd3b";
    apiKey = process.env.REACT_APP_NEWS_API;
    pageSize = 9;
    country = "us";

    render() {
        return (
            <>
                <Router>
                    <Navbar />
                    <div>
                        <LoadingBar
                            height={3}
                            color='#f11946'
                            progress={this.state.progress}
                            onLoaderFinished={()=>{this.setState({progress:0})}}
                        />
                    </div>
                    <Routes>
                        <Route exact path='/' element={<News setProgress={this.setProgress} key="home" apiKey={this.apiKey} category="general" country={this.country} pageSize={this.pageSize} />} />
                        <Route exact path='/Business' element={<News setProgress={this.setProgress} key="business" apiKey={this.apiKey} category="business" country={this.country} pageSize={this.pageSize} />} />
                        <Route exact path='/Entertainment' element={<News setProgress={this.setProgress} key="entertainment" apiKey={this.apiKey} category="entertainment" country={this.country} pageSize={this.pageSize} />} />
                        <Route exact path='/General' element={<News setProgress={this.setProgress} key="general" apiKey={this.apiKey} category="general" country={this.country} pageSize={this.pageSize} />} />
                        <Route exact path='/Health' element={<News setProgress={this.setProgress} key="health" apiKey={this.apiKey} category="health" country={this.country} pageSize={this.pageSize} />} />
                        <Route exact path='/Science' element={<News setProgress={this.setProgress} key="science" apiKey={this.apiKey} category="science" country={this.country} pageSize={this.pageSize} />} />
                        <Route exact path='/Sports' element={<News setProgress={this.setProgress} key="sports" apiKey={this.apiKey} category="sports" country={this.country} pageSize={this.pageSize} />} />
                        <Route exact path='/Technology' element={<News setProgress={this.setProgress} key="technology" apiKey={this.apiKey} category="technology" country={this.country} pageSize={this.pageSize} />} />
                    </Routes>
                </Router>
            </>
        )
    }
}
