import { Alert, Platform } from 'react-native';

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

const showError = (erro) => {
    Alert.alert('Ocorreu um problema', `Mensagem: ${erro}`);
}

export { server, showError };