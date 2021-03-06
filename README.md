# Gesture-Control

## Description:

This script allows you to easily detect swipes of all four directions and on tap.

## How to use:

To use this script, add the following HTML anywhere inside of your code and use the given Javascript code to add your own 'on swipe' and 'on tap' functions.

**HTML:**

```html
<script type="text/javascript" src="touch.js" />
```

**Javascript**
```js
let myElement = document.getElementById('myDiv');

const touch = new TouchInput(myElement, {
    // Options:
    treshold: 10, // this is 10% of the page's width; default is 1%.
    
    // Events:              (these are also the default event handlers)
    onSwipeLeft: (event) => {
        console.log('Swiped left');
    },
    onSwipeRight: (event) => {
        console.log('Swiped right');
    },
    onSwipeUp: (event) => {
        console.log('Swiped up');
    },
    onSwipeDown: (event) => {
        console.log('Swiped down');
    },
    onTap: (event) => {
        console.log('Tap');
    }
});
```
