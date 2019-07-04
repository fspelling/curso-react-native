import React from 'react';
import { View, StyleSheet, Text, ScrollView, Platform, TextInput, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { addPost } from '../store/actions/post';

const noUser = 'Voce precisa se autenticar para postar fotos';

class AddPhoto extends React.Component {
    state = {
        image: null,
        comment: ''
    };

    pickImage = () => {
        if (!this.props.name) {
            Alert.alert('Atencao', noUser);
            return;
        }

        ImagePicker.showImagePicker({
            title: 'Escolha a imagem',
            maxHeight: 600,
            maxWidth: 800
        }, (res) => {
            if (!res.didCancel) this.setState({ image: { uri: res.uri, base64: res.data } });
        });
    }

    save = async () => {
        if (!this.props.name) {
            Alert.alert('Atencao', noUser);
            return;
        }

        this.props.onSavePost({
            id: Math.random(),
            nickname: this.props.name,
            email: this.props.email,
            image: this.state.image,
            comments: [{
                comment: this.state.comment
            }]
        });

        this.setState({ image: null, comment: '' });
        this.props.navigation.navigate('Feed');
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Compartilhe uma imagem</Text>
                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image} />
                    </View>
                    <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
                        <Text style={styles.buttomText}>Escolha a foto</Text>
                    </TouchableOpacity>
                    <TextInput placeholder='Algum comentario?' style={styles.input} value={this.state.comment}
                        onChangeText={(comment) => this.setState({ comment })} editable={this.props.name != null} />
                    <TouchableOpacity onPress={this.save} style={styles.buttom}>
                        <Text style={styles.buttomText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold'
    },
    input: {
        marginTop: 20,
        width: '90%'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width / 2,
        backgroundColor: '#EEE',
        marginTop: 10
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').width / 2,
        resizeMode: 'center'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    }
});

const mapDispatchToState = ({user}) => {
    return {
        name: user.name,
        email: user.email
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSavePost: (post) => dispatch(addPost(post))
    };
}

export default connect(mapDispatchToState, mapDispatchToProps)(AddPhoto);
