Vue.component('gamefield', {
    template: `
    <div id="gamefield" >
        <div class="cards" v-for="(link,index) in linkImage" :key="index" >
            <div class="flip-box singlecard" :id="index" 
                               @click="clickDOM($event.target.parentElement.parentElement)" >
                <div class="flip-box-inner" :data-ref="link">
                    <div class="flip-box-front">
                        <div style="width:100%;height:100%"></div>
                    </div>
                    <div class="flip-box-back">
                        <img :src="link" alt="card" style="width:100%;height:100%">
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function () {
        return {
            nums_img: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                '11', '12', '13', '14', '15', '16', '17'],
            clickedDOM: 0,
            clickedTime: 0,
            destroyed: 0,
            startTime: 0,
            game: new CartFlipper(),
        }
    },
    methods: {
        clickDOM: function (dom) {
            this.startTime = (this.startTime == 0) ? (new Date().getTime()) : this.startTime;
            this.game.flip_front_to_back(dom);
            this.clickedTime++;
            if (this.clickedDOM < 1) {
                this.clickedDOM++;
            } else {
                setTimeout(() => {
                    this.clickedDOM = 0;
                    if (this.game.dom1.parentElement.id != this.game.dom2.parentElement.id) {
                        if (this.game.dom1.getAttribute("data-ref") != this.game.dom2.getAttribute("data-ref")) {
                            setTimeout(() => {
                                this.game.flip_back_to_front();
                            }, 500);
                        } else {
                            setTimeout(() => {
                                this.game.destroy();
                            }, 500);
                            this.destroyed++;
                        }
                    } else {
                        this.game.flip_back_to_front();
                    }
                }, 500);
            }
            setTimeout(() => {
                if (this.destroyed == 5) {
                    $("body").addClass("winner");
                    let html = '<h1 style="color: white;font-size: 60px;padding: 10px;">';
                    html += "Chúc mừng bạn đã chiến thắng sau " + this.clickedTime + " lần chọn và " + Math.ceil(0.001 * Math.round(new Date().getTime() - this.startTime)) + " giây";
                    html += "</h1>";
                    $(".instruction").html(html);
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                }
                   
            }, 2500);
        },
    },
    computed: {
        linkImage: function () {
            let links = radomPositionImg(this.nums_img);
            links.forEach(function (link, index) {
                this[index] = "./images/".concat(this[index], ".jpg");
                return link;
            }, links)
            return links;
        }
    },
})

function shuffle(arr) {
    let a = arr.slice(0, arr.length);
    for (let i = a.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * 10);
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a;
};

function radomPositionImg(arr) {
    let arr_img = [];
    while (arr_img.length < 10) {
        let ranNum = (Math.floor(Math.random() * 16) + 1);
        if (!arr_img.includes(arr[ranNum])) {
            arr_img.push(arr[ranNum], arr[ranNum]);
        }
    }
    return shuffle(arr_img);
};