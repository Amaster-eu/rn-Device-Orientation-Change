import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { Header } from 'react-native-elements'

import Platform from './Platform';

class LogoTitle extends React.Component {
    render() {
        return (
            <Text style={{color: '#fff', fontSize: 30}}>
                <Image
                    source={require('./logo.png')}
                    style={{width: 30, height: 30}}
                />
                React Native
            </Text>
        );
    }
}

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            orientation: Platform.isPortrait() ? 'portrait' : 'landscape',
            devicetype: Platform.isTablet() ? 'tablet' : 'phone'
        };
        // Event Listener for orientation changes
        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: Platform.isPortrait() ? 'portrait' : 'landscape'
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header centerComponent={<LogoTitle/>}/>
                <View style={styles.view}>
                    <Text style={styles.text}>
                        Dimensions = {'{\n'}
                        {' '}scale = {Dimensions.get('screen').scale}{';\n'}
                        {' '}height = {Dimensions.get('screen').height}{';\n'}
                        {' '}width = {Dimensions.get('screen').width}{';\n'}
                        {' '}fontScale = {Dimensions.get('screen').fontScale}{';\n'}
                        {'}\n'}
                        isPortrait = {Platform.isPortrait() ? 'true\n' : 'false\n'}
                        isLandscape = {Platform.isLandscape() ? 'true\n' : 'false\n'}
                        isPhone = {Platform.isPhone() ? 'true\n' : 'false\n'}
                        isTablet = {Platform.isTablet() ? 'true\n' : 'false\n'}
                    </Text>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#e2ebff',
        padding: 10,
    },
    text: {
        fontSize: 16,
    },
});
