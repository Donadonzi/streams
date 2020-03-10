import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    /* Removed this in order to refactoring for redux 
    state = { isSignedIn: null };
    */

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '975061503414-ee34u2b0kecooqbdarish25e5q49ko4k.apps.googleusercontent.com',
                scope: 'email'
            }).then( () => {
                this.auth = window.gapi.auth2.getAuthInstance();
                /* Change, al redux refactoring
                 this.setState( { isSignedIn : this.auth.isSignedIn.get() });
                */
                this.onAuthChange(this.auth.isSignedIn.get()); // Update auth state inside the redux store
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    /* Commented this out, to change the flow to be motabeghe redux principals. So we don't have component level state; and we need to call the action creators here
    onAuthChange = () => {
        this.setState( { isSignedIn : this.auth.isSignedIn.get() });
    };
    */

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        //if (this.state.isSignedIn === null ) {
        if (this.props.isSignedIn === null ) {
            return null;
        //} else if (this.state.isSignedIn) {
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui blue google button">
                    <i className="google icon" />
                    Sign out      
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign in with Google      
                </button>
            );
        }
    }
    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);