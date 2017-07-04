/**
 * Created by Administrator on 2017/5/4.
 */
//arrangePoint(".second",60,1);
//重构
Function.prototype.addFun=function(name,fn){
    this.prototype[name]=fn;
    return this;
};
var Mclock=new Function();
Mclock
    .addFun("arrPoint",function(ele,points,direct,between){
    ele=$(ele);
    var r=.5*parseFloat(ele.css("width"));
    r*=.9;
    var deg=2*Math.PI/points;
    for(var i= 1,html="",total;i<=points;i++){
        html+="<div class='point'>"+(total=(i==60||i*between==60)?0:i*between)+"</div>";//有个置零的过程
    }
    ele.children(".center").html(html);
    var dots=ele.children(".center").children();
    var dots_width=parseFloat(window.getComputedStyle($(".point")[0]).width);
    $.each(dots,function(i){
        dots[i].style.top=-r*Math.cos(deg+deg*i)-.5*dots_width+"px";
        dots[i].style.left=r*direct*Math.sin(deg+deg*i)-.5*dots_width+"px";
    });
    return this;//链式操作

})
    .addFun("clockRotate",function(selector,deg){
        $(selector)
            .animate({  deg: deg }, {
                step: function(now,fx) {
                    $(this).css('transform','rotate('+now+'deg)');
                },
                duration:1000
            },'linear');
        //    .css({
        //    "transform":"rotate("+deg+"deg)",
        //    "webkitTransform":"rotate("+deg+"deg)",
        //    "oTransform":"rotate("+deg+"deg)",
        //    "mozTransform":"rotate("+deg+"deg)",
        //    "msTransform":"rotate("+deg+"deg)"
        //})
        //    .css({"transition":"transform 1s"});
        return this;
    })
    .addFun("beginAc",function(){
        var seconds=new Date().getSeconds();
        var  mins=new Date().getMinutes();
        var  hours=new Date().getHours();
        var m=new Mclock();
        m
            .clockRotate(".hour",(hours+mins/60)*30)
            .clockRotate(".hour .point",-(hours+mins/60)*30)

            .clockRotate(".min",-(mins+seconds/60)*6)
            .clockRotate(".min .point",(mins+seconds/60)*6)

            .clockRotate(".second",(seconds*6))
            .clockRotate(".second .point",-(seconds*6));
        console.log(seconds);
        return this;
    })
    .addFun("runClock",function(){
        setInterval(function(){
            var time=new Date();
            var second=time.getSeconds();
            var mins=time.getMinutes()+second/60;
            var hour=time.getHours()+mins/60;
            var f=new Mclock();
            f
                .clockRotate("div.second",second*6)
                .clockRotate("div.second .point",-second*6)
                .clockRotate("div.min",-mins*6)
                .clockRotate("div.min .point",mins*6)
                .clockRotate("div.hour",hour*30)
                .clockRotate("div.hour .point",-hour*30);
            console.log(2);
        },1000);
    });

var clock=new Mclock();
clock.arrPoint(".hour",12,-1,1)
    .arrPoint(".min",30,1,2)
    .arrPoint(".second",6,-1,10)
   .beginAc()
    .runClock()
;
//$(".box").draggable();



