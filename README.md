# React Native: Device Orientation Change

![img](https://github.com/Amaster-eu/demo/blob/master/demo_rn-DeviceOrientationChange.gif)

*Demo apps*

## Installation

```
$ npm install -g create-react-native-app
$ git clone https://github.com/Amaster-eu/rn-Device-Orientation-Change.git
$ npm start
```
View your app with live reloading: Press **a** to open Android device or emulator, or **i** to open iOS emulator.

## About

I want to do is to produce a single app that does master-detail properly for both tablets and phones. 
To do that, I needed to be able to do two things:

* Figure out if I was on a tablet
* Adapt to the orientation

React Native exposes an object called Dimensions that gives you all the information you need for this. 
You use it like this:

```
const dim = Dimensions.get('screen');
```

It returns something like this:

```
{
  "scale": 2,
  "height": 667,
  "width": 375,
  "fontScale": 1
}
```

This is generated from an iPhone 6, so you may get different results. 
To get the real-dots, you multiply the scale by the dimension. 
I’ve used this to create a set of methods in **Platform.js** module:

```
import { Dimensions } from 'react-native';

const msp = (dim, limit) => {
    return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit;
};

const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};

const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};

const isTablet = () => {
    const dim = Dimensions.get('screen');
    return ((dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900)));
};

const isPhone = () => { return !isTablet(); }
 
export default {
    isPortrait,
    isLandscape,
    isTablet,
    isPhone
};
```

I can use this in a standard React Native application like this:

```
render() {
    return (
        <View>
            <Text>
                Dimensions = {JSON.stringify(Dimensions.get('screen'))}{'\n'}
                isPortrait = {Platform.isPortrait() ? 'true\n' : 'false\n'}
                isLandscape = {Platform.isLandscape() ? 'true\n' : 'false\n'}
                isPhone = {Platform.isPhone() ? 'true\n' : 'false\n'}
                isTablet = {Platform.isTablet() ? 'true\n' : 'false\n'}
            </Text>
        </View>
    );
}
```

I need to add state to the top level react component that detects the orientation.
I use the following:

```
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
```

I store the orientation in the state object, then add an event listener. 
Whenever the dimensions change (for example, due to an orientation change), 
the state is changed and that causes a re-render of the entire react tree.
