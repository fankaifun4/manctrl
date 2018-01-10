var app=angular.module('app',[])

app.controller('xcCtrl',['$scope',function(s){
	s.tempData={
		//背景
		bgImg:"",
		//列表单个ID
		id:"img_list_0",
		//主视图比例
		cvsRatio:10/7,
		//文字数据
		textList:[],
		//相片元素数据
		//除了opcity,rotate为实数，其他都为百分比
		list:[{
			width:0,
			height:0,
			top:0,
			left:0,
			rotate:0,
			id:'222',
			opcity:1,
			pic:"",
			aspectRatio:1.777,
		}]
	}

	s.itemList=[]
	s.currentItem={}
	s.addItems=function(){
		let box={}
		box.width=300
		box.height=300
		box.left=0
		box.top=0
		box.rotate=1
		box.opcity=1
		box.id=new Date().getTime().toString(36)
		box.aspectRatio=box.width/box.height
		s.itemList.push(box)
		for( var i=0;i<s.itemList.length;i++ ){
			if(s.itemList[i].id==box.id ){
				s.currentItem=s.itemList[i]
			}
		}
	}

	s.canvasComputed={
		width:960,
		height:540,
	}

	s.cvsRatio={
		rotate:(s.canvasComputed.width/s.canvasComputed.height).toFixed(3)
	}
	s.changeSize=function(model,tpl,name){

		if( model.width<0 ){
			model.width=0
		}
		if( model.width>=960 ){
			model.width=960
		}
		if( model.height<0 ){
			model.height=0
		}
		if( model.height>2000 ){
			model.height=2000
		}

		if(name){
			console.log(model)
			tpl[name]=(model.width/model.height).toFixed(3)
		}else{
			
			tpl.rotate=(model.width/model.height).toFixed(3)
		}
	}
	s.tempPage={
		x:0,
		y:0
	};
	s.isMove=false
	s.getItem=function(e,model){
		var cvsWrap=$('#cvs-wrap')
		var ct=cvsWrap.offset().top,cl=cvsWrap.offset().left
		var pageX=e.pageX-cl
		var pageY=e.pageY-ct
		let current=e.currentTarget
		s.tempPage.x=pageX-current.offsetLeft
		s.tempPage.y=pageY-current.offsetTop
		s.isMove=true
	}
	s.moveItem=function(e,model){
		if( !s.isMove ) return
		var cvsWrap=$('#cvs-wrap')
		var ct=cvsWrap.offset().top,cl=cvsWrap.offset().left
		var pageX=e.pageX-cl
		var pageY=e.pageY-ct
		var cvsWrap=$('#cvs-wrap')
		var cur=e.currentTarget
		if(  pageX-s.tempPage.x >0 &&  pageX-s.tempPage.x<=cvsWrap.outerWidth()-cur.clientWidth ){
			model.left=pageX-s.tempPage.x
		}else if( cur.offsetLeft+cur.clientWidth >= cvsWrap.outerWidth() ){
			model.left=cvsWrap.outerWidth()-cur.clientWidth
		}else if(  pageX-s.tempPage.x <=0 ){
			model.left=0
		}
		if( pageY-s.tempPage.y>0 && pageY-s.tempPage.y<= cvsWrap.outerHeight()-cur.clientHeight){
			model.top=pageY-s.tempPage.t
		}else if(cur.offsetTop+cur.clientHeight >= cvsWrap.outerHeight()){
			model.top=cvsWrap.outerHeight()-cur.clientHeight
		}else{
			model.top=0
		}
	}
	s.removeMoveItem=function(){
		s.isMove=false
	}
}])