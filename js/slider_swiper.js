const renderHTML = `<div id="res" style="height: 200px; background: gray"><h1>TO SEE HOW IT WORKS: </h1><br>
<h2>
1. GO TO BROWSER CONSOLE <br>
2. SWITCH TO MOBILE VIEW <br>
3. Swipe it :) <br>
</h2>
</div>`;

    document.body.innerHTML = renderHTML;

    const options = {

        left: function (self) {

            // place your code here
            self.div.style.backgroundColor = 'red';
        },

        right: function (self) {
            // place your code here
            self.div.style.backgroundColor = 'blue';
        },
        up: function (self) {
            // place your code here
            self.div.style.backgroundColor = 'black';
        },
        down: function (self) {
            // place your code here
            self.div.style.backgroundColor = 'green';
        }

    }


    const swiper = new Swiper('#res');

    function Swiper(selector) {

        const self = this;
        
        // options  visible by Closure
        self.options = options;
        self.div = document.querySelector(selector);
        self.xDown = null;
        self.yDown = null;

        self.div.addEventListener('touchstart', function (e) {
            self.xDown = e.touches[0].clientX;
            self.yDown = e.touches[0].clientY;
        })

        self.div.addEventListener('touchmove', function (e) {
            if (!self.xDown || !self.yDown) {
                return;
            }

            self.xUp = e.touches[0].clientX;
            self.yUp = e.touches[0].clientY;

            self.xDiff = self.xDown - self.xUp;
            self.yDiff = self.yDown - self.yUp;


            if (Math.abs(self.xDiff) > Math.abs(self.yDiff)) {
                /!*most significant*!/
                if (self.xDiff > 0) {
                    /!* left swipe *!/
                    self.options.left(self);
                } else {
                    /!* right swipe *!/
                    self.options.right(self);
                }
            } else {
                if (self.yDiff > 0) {
                    /!* up swipe *!/
                    self.options.up(self);
                } else {
                    /!* down swipe *!/
                    self.options.down(self);
                }
            }
            /!* reset values *!/
            self.xDown = null;
            self.yDown = null;


        })
    };