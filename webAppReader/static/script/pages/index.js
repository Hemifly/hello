$.get('/ajax/index',function(d){
   var windowWidth = $(window).width();
   if(windowWidth<320){
   	  windowWidth = 320;
   }
   var offset = $($('.Swipe-tab').find('a')[0]).offset();
   var index_header_tab_width = offset.width;
   new Vue({
   	  el:'#app',
   	  data :{
   	  	  screen_width:windowWidth,
   	  	  double_screen_width:windowWidth*2,
   	  	  index_header_tab_width:index_header_tab_width,
   	  	  top:d.items[0].data.data,
   	  	  hot:d.items[1].data.data,
   	  	  recommend:d.items[2].data.data,
   	  	  female:d.items[3].data.data,
   	  	  male:d.items[4].data.data,
   	  	  free:d.items[5].data.data,
   	  	  topic:d.items[6].data.data,
   	  	  duration:0,
   	  	  position:0,
   	  	  header_position:0,
   	  	  header_duration:0,
   	  	  tab_1_class:'Swipe-tab__on',
   	  	  tab_2_class:'',
           num:4,
           num1:3,
           arr1:[0,1,2],
           arr2:[0,1,2],
           test:'更 多',
           test1:'更 多'
   	  },
   	  methods:{
   	  	tabSwitch:function(pos){
   	  		this.duration = 0.5;
   	  		this.header_duration = 0.5;
   	  		if(pos == 0){
   	  			this.position = 0;
   	  			this.header_position = 0;
   	  			this.tab_1_class = "Swipe-tab__on";
   	  			this.tab_2_class = "";
   	  		}else{
   	  			this.position = (-windowWidth);
   	  			this.header_position = index_header_tab_width;
   	  			this.tab_2_class = "Swipe-tab__on";
   	  			this.tab_1_class = "";
   	  		}
   	  	},
         morehot:function () {
            if (this.num >= this.hot.length) {
               this.test1 = '没有更多了！';
            }
            this.num +=3;
         },
         morefree:function () {
            if (this.num1 >= this.free.length) {
               this.test = '没有更多了！';
            }
            this.num1 +=3;
         },
         replace:function (number) {
            var a = [];
            var j= 0;
            while(j<3){
                var b = Math.floor((Math.random()*this.male.length));
                if(a.indexOf(b)==-1){
                  a.push(b);
                  j++;
                }
            };
            number == 1 ? this.arr1 = a : this.arr2 = a;
        }
   	}
        
   });
   // document.addEventListener('touchmove',function(event) {
   //       event.preventDefault();
   //    })
   var mySwiper = new Swiper ('.swiper-container', {
         autoplay: 2000,
         autoHeight:true,  
         // loop: true,
         pagination: '.swiper-pagination',
         autoplayDisableOnInteraction : false
      });
},'json');