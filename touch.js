class Touch {
    /**
     * @param {Element} element Gesture target
     * @param {JSON} opts JSON object for describing events
     */
    constructor(element, opts) {
        this.touchstartX = 0;
        this.touchstartY = 0;
        this.touchendX = 0;
        this.touchendY = 0;

        this.pageWidth = window.innerWidth || document.body.clientWidth;
        this.treshold = Math.max(1, Math.floor((opts.treshold / 100 || 0.01) * this.pageWidth));

        this.limit = Math.tan(45 * 1.5 / 180 * Math.PI);

        this.swipeLeft = opts.swipeLeft || function () { console.log('Swiped left'); };
        this.swipeRight = opts.swipeRight || function () { console.log('Swiped right'); };
        this.swipeUp = opts.swipeUp || function () { console.log('Swiped up'); };
        this.swipeDown = opts.swipeDown || function () { console.log('Swiped down'); };
        this.tap = opts.tap || function () { console.log('Tap'); };
        
        element.addEventListener('touchstart', function (event) {
            touch.start(event);
        }, false);
        element.addEventListener('touchend', function (event) {
            touch.end(event);
        }, false);
    }

    /**
     * @description This event should be called when a touch has started.
     * @param {TouchEvent} event Event for detecting touches of the screen
     */
    start(event) {
        this.touchstartX = event.changedTouches[0].screenX;
        this.touchstartY = event.changedTouches[0].screenY;
    }

    /**
     * @description This event should be called when a touch has ended.
     * @param {TouchEvent} event Event for detecting touches of the screen.
     */
    end(event) {
        this.touchendX = event.changedTouches[0].screenX;
        this.touchendY = event.changedTouches[0].screenY;
        this.handleGesture(event);
    }

    /**
     * @description Detects the direction of the swipe
     * @param {TouchEvent} event Event for detecting touches of the screen
     */
    handleGesture(event) {
        let x = this.touchendX - this.touchstartX,
            y = this.touchendY - this.touchstartY,
            xy = Math.abs(x / y),
            yx = Math.abs(y / x);

        if (Math.abs(x) > this.treshold || Math.abs(y) > this.treshold) {
            if (yx <= this.limit) {
                if (x < 0) {
                    this.swipeLeft(event);
                } else {
                    this.swipeRight(event);
                }
            }
            if (xy <= this.limit) {
                if (y < 0) {
                    this.swipeUp(event);
                } else {
                    this.swipeDown(event);
                }
            }
        } else {
            this.tap(event);
        }
    }
}
