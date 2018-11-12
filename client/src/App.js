import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', data: '' };

        this.renderData = this.renderData.bind(this);
    }

    componentDidMount() {
        console.log('App did mount');
        axios.get('/api/v1/user')
            .then(response => {
                let data = response.data[0];
                this.setState({name: data.username, data: data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    renderData() {
        return this.state.name || 'Loading...' ;
    }

    render() {
        return (<div>
            Hello, React!
            <p>{this.renderData()}</p>
        </div>);
    }
}

export default App;
