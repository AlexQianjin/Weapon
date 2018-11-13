import React from 'react';
import SignInView from './SignIn.view';

class SignIn extends React.Component {
    render() {
        return <SignInView onSignIn={this.props.onSignIn}/>;
    }
}

export default SignIn;
