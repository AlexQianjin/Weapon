import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SignIn from './components/SignIn';
import axios from 'axios';

const theme = createMuiTheme();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', data: '', isLogin: false };

        this.renderView = this.renderView.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    componentDidMount() {
        let storedSessionLogin = sessionStorage.getItem('login');
		if (storedSessionLogin) {
            console.log(storedSessionLogin);
            this.setState({isLogin: true});
        }
        
        // axios.get('/api/v1/user')
        //     .then(response => {
        //         let data = response.data[0];
        //         this.setState({name: data.username, data: data});
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }

    handleSignIn() {
        this.setState({isLogin: true});
    }
    
    renderView() {
        return this.state.isLogin ? 'Welcome' : <SignIn onSignIn={this.handleSignIn}/>;
    }

    render() {
        return (<MuiThemeProvider theme={theme}>
            {this.renderView()}
        </MuiThemeProvider>);
    }
}

export default App;
