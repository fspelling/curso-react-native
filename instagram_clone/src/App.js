import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { setMessage } from './store/actions/message';
import Navigator from './Navigator';

class App extends React.Component {
    componentDidUpdate = () => {
        if (this.props.message) {
            Alert.alert(this.props.title || 'Mensagem', this.props.message);
            this.onClearMessage();
        }
    }

    render() {
        return <Navigator />;
    }
}

const mapStateToProps = ({ message }) => {
    return {
        title: message.title,
        message: message.message
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClearMessage: () => dispatch(setMessage({ title: '', message: '' }))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);