//首先把图片进行排版  排版的时候我们为了图片不失贞只设置了width   所以图片的高度可能是不一样的  在浮动的时候就会乱
//所以我们需要计算出它的高度   找到高度最低的图片的所在位置    

function $(el){
	return document.getElementById(el);
}
function $c(el){
	return document.createElement(el);
}
window.onload = function(){
	imgLocation('contianer','box');
	var dataImg = {"data":[{'src':'11.jpg'},{'src':'23.jpg'},{'src':'282.jpg'},{'src':'309.jpg'},{'src':'3.png'},{'src':'31.jpg'},{'src':'57.jpg'}]}
	window.onscroll = function(){//监听滚动条
		if(checkFlag('contianer')){
			var cparent = $('contianer');
			for(var i=0;i<dataImg.data.length;i++){
				var ccontent = $c('div');
				ccontent.className = 'box';
				cparent.appendChild(ccontent);
				var box_img = $c('div');
				box_img.className = 'box-img';
				ccontent.appendChild(box_img);
				var img = $c('img');
				img.src = 'img/'+dataImg.data[i].src;
				box_img.appendChild(img);
			}
			imgLocation('contianer','box');
		}
	}
}

function checkFlag(parent){
	var cparent = $(parent);
	var ccontent = getChildElement(cparent,'box');//获取到所有的图
	var lastContentLocation = ccontent[ccontent.length-1].offsetTop;//得到最后一张图到顶部的距离
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var pageHeight = document.documentElement.clientWidth|| document.body.clientWidth
	console.log(scrollTop,pageHeight);
	if(lastContentLocation<scrollTop+pageHeight){
		return true;
	}
}

function imgLocation(parent,content){
	var cparent = document.getElementById(parent);//拿到父容器
	var ccontent = getChildElement(cparent,content);//获取到所有的图
	var imgWidth = ccontent[0].offsetWidth;//获得img的width
	var cols = Math.floor(document.documentElement.clientWidth / imgWidth);//`计算出屏幕可存放img的个数
	cparent.style.cssText = 'width:'+imgWidth * cols +'px;margin: 0 auto;';//每一行的width  并让它水平居中
	//获取第一排每张图的height  并存放进数组
	var boxHeightArr = [];
	for(var i=0;i<ccontent.length;i++){
		if(i<cols){
		  boxHeightArr[i] = ccontent[i].offsetHeight;//获得第一排的height
		}else{
			var minHeight = Math.min.apply(null,boxHeightArr);//获得第一排最小的height
			var minIndex = getMinHeightLocation(boxHeightArr,minHeight);
			ccontent[i].style.position = 'absolute';
			ccontent[i].style.top = minHeight+'px';
			ccontent[i].style.left = ccontent[minIndex].offsetLeft;//计算出left
			boxHeightArr[minIndex] += ccontent[i].offsetHeight;//把最小图片的高度加上当前图片的高度，然后最小高度就会发生变化
		}
	}
}

//得到最小高度图片的位置
function getMinHeightLocation(boxHeightArr,minHeight){
	var index = 0;
	while(true){
		if(boxHeightArr[index] === minHeight){
			return index;
		}
		index++;
	}
}
function getChildElement(parent,content){
	var contentArr = [];
	var contentAll = parent.children? parent.children : parent.getElementsByTagName('*');//兼容处理
//	if(parent.children){
//		contentAll = parent.children;//获取到所有的子元素
//	}else{
//		contentAll = parent.getElementsByTagName('*');//退一步处理   当浏览器不兼容children时   获取所有子元素
//	}
	for(var i=0;i<contentAll.length;i++){
		if(contentAll[i].className === content){//判断是不是box那个容器  是的话就放入数组中
			contentArr.push(contentAll[i]);
		}
	}
	return contentArr;
}
