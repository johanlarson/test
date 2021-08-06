// Garden Gnome Software - Skin
// Pano2VR 6.1.13/18080
// Filename: CotR virtual tour skin.ggsk
// Generated 2021-08-06T14:30:17

function pano2vrSkin(player,base) {
	var me=this;
	var skin=this;
	var flag=false;
	var nodeMarker=[];
	var activeNodeMarker=[];
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._controller=document.createElement('div');
		el.ggId="controller";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 23px;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 192px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._controller.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._controller.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._controller_bg=document.createElement('div');
		el.ggId="controller_bg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+=cssPrefix + 'border-radius : 3px;';
		hs+='border-radius : 3px;';
		hs+='background : rgba(63,63,63,0.498039);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 50px;';
		hs+='left : -9px;';
		hs+='position : absolute;';
		hs+='top : -9px;';
		hs+='visibility : inherit;';
		hs+='width : 210px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._controller_bg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._controller_bg.ggUpdatePosition=function (useTransition) {
		}
		me._controller.appendChild(me._controller_bg);
		el=me._fullscreen_off=document.createElement('div');
		els=me._fullscreen_off__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxyZWN0IHg9Ii0yMDYuMiIgd2lkdGg9IjMyLjEiIHk9IjM5NyIgZmlsbD0iIzAwMDAwMCIgaGVpZ2h0PSIyMi4yIi8+CiAgIDxwYXRoIGQ9Ik0tMTc1LDM0MC45Yy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFjMCwzMSwyNS4xLDU2LjEsNTYuMSw1Ni4xYzMxLDAsNTYuMS0yNS4xLDU2LjEtNTYuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTExOC45LDM2Ni0xNDQsMzQwLjktMTc1LDM0MC45eiBNLTE2OC42LDQyMC4zYzAsMi4zLTEuOSw0LjItNC4yLDQuMmgtMzQuNWMtMi4zLDAtNC4yLTEuOS00LjItNC4ydi0yNC41YzAtMi4zLDEuOS00LjIsNC4yLTQu'+
			'MiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtoMzQuNWMyLjMsMCw0LjIsMS45LDQuMiw0LjJMLTE2OC42LDQyMC4zTC0xNjguNiw0MjAuM3ogTS0xMzYuOCwzNzIuNmwtMTcuNSwxMi42Yy0wLjEsMC0wLjEsMC4xLTAuMiwwLjFsMC43LDAuOWwzLjMsNC43JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjIsMC4zLDAuMiwwLjUsMC4xLDAuOWMtMC4yLDAuNC0wLjUsMC41LTAuOCwwLjVsLTE2LjIsMC4xYy0wLjQsMC0wLjYtMC4xLTAuOC0wLjRjLTAuMi0wLjItMC4yLTAuNS0wLjEtMC44bDUuMi0xNS40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjEtMC4zLDAuNC0wLjYsMC44LTAuNmMwLj'+
			'QsMCwwLjcsMC4xLDAuOSwwLjNsMy4zLDQuNmwwLjYsMC44YzAsMCwwLjEtMC4xLDAuMS0wLjFsMTcuNS0xMi42YzAuNy0wLjUsMS42LTAuMywyLjEsMC40bDEuNCwxLjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xMzUuOSwzNzEuMi0xMzYuMSwzNzIuMS0xMzYuOCwzNzIuNnoiIGZpbGw9IiMwMDAwMDAiLz4KICA8L2c+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTM2LjQsMzcwLjVsLTEuNC0xLjljLTAuNS0wLjctMS41LTAuOC0yLjEtMC40bC0xNy41LDEyLjZjLTAuMSwwLTAuMSwwLjEtMC4xLDAuMWwtMC42LTAuOGwtMy4zLTQuNiYjeGQ7JiN4YTsm'+
			'I3g5OyYjeDk7JiN4OTtjLTAuMi0wLjMtMC40LTAuNC0wLjktMC4zYy0wLjQsMC0wLjcsMC4zLTAuOCwwLjZsLTUuMiwxNS40Yy0wLjEsMC4zLTAuMSwwLjYsMC4xLDAuOGMwLjIsMC4zLDAuNCwwLjQsMC44LDAuNGwxNi4yLTAuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC40LDAsMC43LTAuMSwwLjgtMC41YzAuMi0wLjQsMC4yLTAuNi0wLjEtMC45bC0zLjMtNC43bC0wLjctMC45YzAuMSwwLDAuMS0wLjEsMC4yLTAuMWwxNy41LTEyLjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xMzYuMSwzNzIuMS0xMzUuOSwzNzEuMi0xMzYuNCwzNzAuNXoiIGZpbGw9IiNGRkZGRkYiLz4KICAgPH'+
			'BhdGggZD0iTS0xNzIuOCwzOTEuNmgtMzQuNWMtMi4zLDAtNC4yLDEuOS00LjIsNC4ydjI0LjVjMCwyLjMsMS45LDQuMiw0LjIsNC4yaDM0LjVjMi4zLDAsNC4yLTEuOSw0LjItNC4ydi0yNC41JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTY4LjYsMzkzLjUtMTcwLjUsMzkxLjYtMTcyLjgsMzkxLjZ6IE0tMTc0LDQxOS4yaC0zMi4xVjM5N2gzMi4xVjQxOS4yeiIgZmlsbD0iI0ZGRkZGRiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._fullscreen_off__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._fullscreen_off__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxyZWN0IHg9Ii0yMDkuNiIgd2lkdGg9IjM1LjciIHk9IjM5NyIgZmlsbD0iIzAwMDAwMCIgaGVpZ2h0PSIyNC42Ii8+CiAgIDxwYXRoIGQ9Ik0tMTc1LDMzNC42Yy0zNC40LDAtNjIuNCwyNy45LTYyLjQsNjIuNGMwLDM0LjQsMjcuOSw2Mi40LDYyLjQsNjIuNGMzNC40LDAsNjIuNC0yNy45LDYyLjQtNjIuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTExMi42LDM2Mi42LTE0MC42LDMzNC42LTE3NSwzMzQuNnogTS0xNjcuOSw0MjIuOWMwLDIuNi0yLjEsNC43LTQuNyw0LjdoLTM4LjNjLTIuNiwwLTQuNy0yLjEtNC43LTQuN3YtMjcuMiYjeGQ7JiN4YTsm'+
			'I3g5OyYjeDk7JiN4OTtjMC0yLjYsMi4xLTQuNyw0LjctNC43aDM4LjNjMi42LDAsNC43LDIuMSw0LjcsNC43TC0xNjcuOSw0MjIuOUwtMTY3LjksNDIyLjl6IE0tMTMyLjUsMzY5LjlsLTE5LjUsMTRjLTAuMSwwLTAuMSwwLjEtMC4yLDAuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtsMC43LDFsMy43LDUuMmMwLjIsMC4zLDAuMiwwLjYsMC4xLDFjLTAuMiwwLjQtMC41LDAuNi0wLjksMC42bC0xOCwwLjFjLTAuNCwwLTAuNy0wLjEtMC45LTAuNGMtMC4yLTAuMy0wLjItMC41LTAuMS0wLjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7bDUuOC0xNy4xYzAuMS0wLjQsMC40LTAuNywwLjgtMC43Yz'+
			'AuNSwwLDAuNywwLjEsMSwwLjRsMy42LDUuMWwwLjcsMC45YzAuMSwwLDAuMS0wLjEsMC4yLTAuMWwxOS41LTE0YzAuOC0wLjUsMS44LTAuNCwyLjQsMC40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2wxLjUsMi4xQy0xMzEuNiwzNjguMy0xMzEuOCwzNjkuNC0xMzIuNSwzNjkuOXoiIGZpbGw9IiMwMDAwMDAiLz4KICA8L2c+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTMyLjEsMzY3LjVsLTEuNS0yLjFjLTAuNS0wLjgtMS42LTAuOS0yLjQtMC40bC0xOS41LDE0Yy0wLjEsMC0wLjEsMC4xLTAuMiwwLjFsLTAuNy0wLjlsLTMuNi01LjEmI3hkOyYjeGE7JiN4'+
			'OTsmI3g5OyYjeDk7Yy0wLjItMC4zLTAuNS0wLjQtMS0wLjRjLTAuNSwwLTAuNywwLjMtMC44LDAuN2wtNS44LDE3LjFjLTAuMSwwLjQtMC4xLDAuNywwLjEsMC45YzAuMiwwLjMsMC41LDAuNCwwLjksMC40bDE4LTAuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC40LDAsMC44LTAuMiwwLjktMC42YzAuMi0wLjQsMC4yLTAuNy0wLjEtMWwtMy43LTUuMmwtMC43LTFjMC4xLDAsMC4xLTAuMSwwLjItMC4xbDE5LjUtMTQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xMzEuOCwzNjkuNC0xMzEuNiwzNjguMy0xMzIuMSwzNjcuNXoiIGZpbGw9IiNGRkZGRkYiLz4KICAgPHBhdGggZD0iTS0xNz'+
			'IuNiwzOTFoLTM4LjNjLTIuNiwwLTQuNywyLjEtNC43LDQuN3YyNy4yYzAsMi42LDIuMSw0LjcsNC43LDQuN2gzOC4zYzIuNiwwLDQuNy0yLjEsNC43LTQuN3YtMjcuMiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTE2Ny45LDM5My4xLTE3MCwzOTEtMTcyLjYsMzkxeiBNLTE3My45LDQyMS42aC0zNS43VjM5N2gzNS43VjQyMS42eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._fullscreen_off__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="fullscreen_off";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 160px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._fullscreen_off.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._fullscreen_off.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsFullscreen() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._fullscreen_off.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._fullscreen_off.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._fullscreen_off.style[domTransition]='';
				if (me._fullscreen_off.ggCurrentLogicStateVisible == 0) {
					me._fullscreen_off.style.visibility="hidden";
					me._fullscreen_off.ggVisible=false;
				}
				else {
					me._fullscreen_off.style.visibility=(Number(me._fullscreen_off.style.opacity)>0||!me._fullscreen_off.style.opacity)?'inherit':'hidden';
					me._fullscreen_off.ggVisible=true;
				}
			}
		}
		me._fullscreen_off.onclick=function (e) {
			player.exitFullscreen();
		}
		me._fullscreen_off.onmouseover=function (e) {
			me._fullscreen_off__img.style.visibility='hidden';
			me._fullscreen_off__imgo.style.visibility='inherit';
		}
		me._fullscreen_off.onmouseout=function (e) {
			me._fullscreen_off__img.style.visibility='inherit';
			me._fullscreen_off__imgo.style.visibility='hidden';
		}
		me._fullscreen_off.ggUpdatePosition=function (useTransition) {
		}
		me._controller.appendChild(me._fullscreen_off);
		el=me._fullscreen=document.createElement('div');
		els=me._fullscreen__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMjA2LjIsNDE5LjJoNjIuM3YtNDQuM2gtNjIuM1Y0MTkuMnogTS0xNzguOSwzOTcuM2MwLDAsMTcuNy0xMi43LDE3LjctMTIuN2wtNC01LjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjItMC4zLTAuMi0wLjUtMC4xLTAuOWMwLjItMC40LDAuNS0wLjUsMC44LTAuNWwxNi4yLTAuMWMwLjQsMCwwLjYsMC4xLDAuOCwwLjRjMC4yLDAuMiwwLjIsMC41LDAuMSwwLjhsLTUuMiwxNS40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC4xLDAuMy0wLjQsMC42LTAuOCwwLjZjLTAuNCwwLTAuNy0wLjEtMC45LTAuM2wtMy45LTUuNGMwLDAt'+
			'MTcuNywxMi43LTE3LjcsMTIuN2MtMC43LDAuNS0xLjYsMC4zLTIuMS0wLjRsLTEuNC0xLjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xNzkuNywzOTguOC0xNzkuNSwzOTcuOC0xNzguOSwzOTcuM3oiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMXMyNS4xLDU2LjEsNTYuMSw1Ni4xYzMxLDAsNTYuMS0yNS4xLDU2LjEtNTYuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtTLTE0NCwzNDAuOS0xNzUsMzQwLjl6IE0tMTM4LjQsNDIwLjNjMCwyLjMtMS45LDQuMi00LjIsNC4yaC02NC43Yy0yLjMsMC00LjItMS45LTQuMi'+
			'00LjJ2LTQ2LjdjMC0yLjMsMS45LTQuMiw0LjItNC4yaDY0LjcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzIuMywwLDQuMiwxLjksNC4yLDQuMlY0MjAuM3oiIGZpbGw9IiMwMDAwMDAiLz4KICA8L2c+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPHBhdGggZD0iTS0xNDcuNCwzNzcuOWMtMC4yLTAuMy0wLjQtMC40LTAuOC0wLjRsLTE2LjIsMC4xYy0wLjQsMC0wLjcsMC4xLTAuOCwwLjVjLTAuMiwwLjQtMC4yLDAuNiwwLjEsMC45bDQsNS42JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuMSwwLTE3LjcsMTIuNy0xNy43LDEyLjdjLTAuNywwLjUtMC44LDEuNS0wLjQsMi4xbDEuNCwxLjljMC41'+
			'LDAuNywxLjUsMC44LDIuMSwwLjRjMCwwLDE3LjYtMTIuNywxNy43LTEyLjdsMy45LDUuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMiwwLjMsMC40LDAuNCwwLjksMC4zYzAuNCwwLDAuNy0wLjMsMC44LTAuNmw1LjItMTUuNEMtMTQ3LjIsMzc4LjQtMTQ3LjIsMzc4LjEtMTQ3LjQsMzc3Ljl6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPHBhdGggZD0iTS0xNDIuNyw0MjQuNmgtNjQuN2MtMi4zLDAtNC4yLTEuOS00LjItNC4ydi00Ni43YzAtMi4zLDEuOS00LjIsNC4yLTQuMmg2NC43YzIuMywwLDQuMiwxLjksNC4yLDQuMnY0Ni43JiN4ZDsmI3hhOyYjeDk7JiN4OTtDLTEzOC40LDQyMi43LTE0MC4zLD'+
			'QyNC42LTE0Mi43LDQyNC42eiBNLTIwNi4yLDQxOS4yaDYyLjN2LTQ0LjNoLTYyLjNWNDE5LjJ6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._fullscreen__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._fullscreen__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMjA5LjYsNDIxLjZoNjkuM3YtNDkuM2gtNjkuM1Y0MjEuNnogTS0xNzkuMywzOTcuNGMwLDAsMTkuNi0xNC4xLDE5LjctMTQuMWwtNC41LTYuMiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMi0wLjMtMC4yLTAuNi0wLjEtMWMwLjItMC40LDAuNS0wLjYsMC45LTAuNmwxOC0wLjFjMC40LDAsMC43LDAuMSwwLjksMC40YzAuMiwwLjMsMC4yLDAuNSwwLjEsMC45bC01LjgsMTcuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuMSwwLjQtMC40LDAuNy0wLjgsMC43Yy0wLjUsMC0wLjctMC4xLTEtMC40bC00LjMtNmMtMC4xLDAuMS0x'+
			'OS43LDE0LjEtMTkuNywxNC4xYy0wLjgsMC41LTEuOCwwLjQtMi40LTAuNGwtMS41LTIuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTE4MC4yLDM5OS0xODAsMzk3LjktMTc5LjMsMzk3LjR6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTc1LDMzNC42Yy0zNC40LDAtNjIuNCwyNy45LTYyLjQsNjIuNHMyNy45LDYyLjQsNjIuNCw2Mi40YzM0LjQsMCw2Mi40LTI3LjksNjIuNC02Mi40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O1MtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTEzNC40LDQyMi45YzAsMi42LTIuMSw0LjctNC43LDQuN2gtNzEuOGMtMi42LDAtNC43LTIuMS00Lj'+
			'ctNC43di01MS44YzAtMi42LDIuMS00LjcsNC43LTQuN2g3MS44JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MyLjYsMCw0LjcsMi4xLDQuNyw0LjdWNDIyLjl6IiBmaWxsPSIjMDAwMDAwIi8+CiAgPC9nPgogPC9nPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTQ0LjMsMzc1LjhjLTAuMi0wLjMtMC41LTAuNC0wLjktMC40bC0xOCwwLjFjLTAuNCwwLTAuOCwwLjItMC45LDAuNmMtMC4yLDAuNC0wLjIsMC43LDAuMSwxbDQuNSw2LjImI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC4xLDAtMTkuNywxNC4xLTE5LjcsMTQuMWMtMC44LDAuNS0wLjksMS42LTAuNCwyLjRsMS41LDIuMWMwLjUs'+
			'MC44LDEuNiwwLjksMi40LDAuNGMwLDAsMTkuNi0xNC4xLDE5LjctMTQuMWw0LjMsNiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMiwwLjMsMC41LDAuNCwxLDAuNGMwLjUsMCwwLjctMC4zLDAuOC0wLjdsNS44LTE3LjFDLTE0NC4xLDM3Ni4zLTE0NC4xLDM3Ni0xNDQuMywzNzUuOHoiIGZpbGw9IiNGRkZGRkYiLz4KICA8cGF0aCBkPSJNLTEzOS4xLDQyNy42aC03MS44Yy0yLjYsMC00LjctMi4xLTQuNy00Ljd2LTUxLjhjMC0yLjYsMi4xLTQuNyw0LjctNC43aDcxLjhjMi42LDAsNC43LDIuMSw0LjcsNC43djUxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTM0LjQsNDI1LjUtMTM2LjUsNDI3LjYtMT'+
			'M5LjEsNDI3LjZ6IE0tMjA5LjYsNDIxLjZoNjkuM3YtNDkuM2gtNjkuM1Y0MjEuNnoiIGZpbGw9IiNGRkZGRkYiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._fullscreen__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="fullscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 160px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._fullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._fullscreen.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsFullscreen() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._fullscreen.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._fullscreen.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._fullscreen.style[domTransition]='';
				if (me._fullscreen.ggCurrentLogicStateVisible == 0) {
					me._fullscreen.style.visibility="hidden";
					me._fullscreen.ggVisible=false;
				}
				else {
					me._fullscreen.style.visibility=(Number(me._fullscreen.style.opacity)>0||!me._fullscreen.style.opacity)?'inherit':'hidden';
					me._fullscreen.ggVisible=true;
				}
			}
		}
		me._fullscreen.onclick=function (e) {
			player.enterFullscreen();
		}
		me._fullscreen.onmouseover=function (e) {
			me._fullscreen__img.style.visibility='hidden';
			me._fullscreen__imgo.style.visibility='inherit';
		}
		me._fullscreen.onmouseout=function (e) {
			me._fullscreen__img.style.visibility='inherit';
			me._fullscreen__imgo.style.visibility='hidden';
		}
		me._fullscreen.ggUpdatePosition=function (useTransition) {
		}
		me._controller.appendChild(me._fullscreen);
		el=me._movemode_1=document.createElement('div');
		els=me._movemode_1__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzQxYy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFjMCwzMSwyNS4xLDU2LjEsNTYuMSw1Ni4xYzMxLDAsNTYuMS0yNS4xLDU2LjEtNTYuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTguOSwzNjYuMS0xNDQsMzQxLTE3NSwzNDF6IE0tMTg4LjcsMzcwLjRsMTIuNy0xNy44YzAuMy0wLjQsMC42LTAuNiwxLjEtMC42YzAuNCwwLDAuNywwLjIsMSwwLjZsMTIuOCwxNy44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuNCwwLjQsMC45LDAuMSwxLjNjLTAuMywwLjUtMC42LDAuNy0xLjEsMC43aC03LjZoLTAuMXYxMy41YzAsMC43LTAuNCwxLjEtMSwx'+
			'bC04LjIsMGMtMC42LDAuMS0xLTAuMy0xLTF2LTEzLjVoLTcuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjgtMC4yLTEuMS0wLjdDLTE4OS4xLDM3MS4zLTE4OSwzNzAuOC0xODguNywzNzAuNHogTS0xOTkuNyw0MDkuOWMwLDAuNS0wLjIsMC44LTAuNywxLjFjLTAuNSwwLjMtMSwwLjItMS4zLTAuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7bC0xNy44LTEyLjdjLTAuNC0wLjMtMC42LTAuNi0wLjYtMS4xYzAtMC40LDAuMi0wLjcsMC42LTFsMTcuOC0xMi44YzAuNC0wLjMsMC45LTAuNCwxLjMtMC4xYzAuNSwwLjMsMC43LDAuNiwwLjcsMS4xdjcuNnYwLjEmI3hkOyYjeGE7JiN4OTsmI3g5O2'+
			'wxMy41LDBjMC43LDAsMS4xLDAuNCwxLDFsMCw4LjJjMC4xLDAuNi0wLjMsMS0xLDFsLTEzLjUsMFY0MDkuOXogTS0xNjEuMyw0MjMuOWwtMTIuNywxNy44Yy0wLjMsMC40LTAuNiwwLjYtMS4xLDAuNiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQsMC0wLjctMC4yLTEtMC42bC0xMi44LTE3LjhjLTAuMy0wLjQtMC40LTAuOS0wLjEtMS4zYzAuMy0wLjUsMC42LTAuNywxLjEtMC43aDcuNmgwLjFsMC0xMy41YzAtMC43LDAuNC0xLjEsMS0xbDguMiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC42LTAuMSwxLDAuMywxLDFsMCwxMy41aDcuN2MwLjUsMCwwLjgsMC4yLDEuMSwwLjdTLTE2MSw0MjMuNS0x'+
			'NjEuMyw0MjMuOXogTS0xMzAuNCwzOTguMWwtMTcuOCwxMi44Yy0wLjQsMC4zLTAuOSwwLjQtMS4zLDAuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjUtMC4zLTAuNy0wLjYtMC43LTEuMXYtNy42di0wLjFoLTEzLjVjLTAuNywwLTEuMS0wLjQtMS0xbDAtOC4yYy0wLjEtMC42LDAuMy0xLDEtMWgxMy41di03LjdjMC0wLjUsMC4yLTAuOCwwLjctMS4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC41LTAuMywxLTAuMiwxLjMsMC4xbDE3LjgsMTIuN2MwLjQsMC4zLDAuNiwwLjYsMC42LDEuMUMtMTI5LjksMzk3LjUtMTMwLDM5Ny44LTEzMC40LDM5OC4xeiIgZmlsbD0iIzAwMDAwMCIvPgogPC9nPgogPG'+
			'cgaWQ9IkxheWVyXzIiPgogIDxnPgogICA8cGF0aCBkPSJNLTE4Ny44LDM3Mi40aDcuN3YxMy41YzAsMC43LDAuNCwxLjEsMSwxbDguMiwwYzAuNiwwLjEsMS0wLjMsMS0xdi0xMy41aDAuMWg3LjZjMC41LDAsMC44LTAuMiwxLjEtMC43JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjMtMC41LDAuMi0xLTAuMS0xLjNsLTEyLjgtMTcuOGMtMC4zLTAuNC0wLjYtMC42LTEtMC42Yy0wLjUsMC0wLjgsMC4yLTEuMSwwLjZsLTEyLjcsMTcuOGMtMC4zLDAuNC0wLjQsMC45LTAuMSwxLjMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xODguNSwzNzIuMi0xODguMiwzNzIuNC0xODcuOCwzNzIuNHoi'+
			'IGZpbGw9IiNGRkZGRkYiLz4KICAgPHBhdGggZD0iTS0xNjIuMiw0MjEuOWgtNy43bDAtMTMuNWMwLTAuNy0wLjQtMS4xLTEtMWwtOC4yLDBjLTAuNi0wLjEtMSwwLjMtMSwxbDAsMTMuNWgtMC4xaC03LjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjgsMC4yLTEuMSwwLjdjLTAuMywwLjUtMC4yLDEsMC4xLDEuM2wxMi44LDE3LjhjMC4zLDAuNCwwLjYsMC42LDEsMC42YzAuNSwwLDAuOC0wLjIsMS4xLTAuNmwxMi43LTE3LjgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuMy0wLjQsMC40LTAuOSwwLjEtMS4zQy0xNjEuNSw0MjItMTYxLjgsNDIxLjktMTYyLjIsNDIxLjl6Ii'+
			'BmaWxsPSIjRkZGRkZGIi8+CiAgIDxwYXRoIGQ9Ik0tMTMwLjQsMzk2LjFsLTE3LjgtMTIuN2MtMC40LTAuMy0wLjktMC40LTEuMy0wLjFjLTAuNSwwLjMtMC43LDAuNi0wLjcsMS4xdjcuN2gtMTMuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuNywwLTEuMSwwLjQtMSwxbDAsOC4yYy0wLjEsMC42LDAuMywxLDEsMWgxMy41djAuMXY3LjZjMCwwLjUsMC4yLDAuOCwwLjcsMS4xczEsMC4yLDEuMy0wLjFsMTcuOC0xMi44YzAuNC0wLjMsMC42LTAuNiwwLjYtMSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTEyOS45LDM5Ni43LTEzMCwzOTYuNC0xMzAuNCwzOTYuMXoiIGZpbGw9IiNGRkZG'+
			'RkYiLz4KICAgPHBhdGggZD0iTS0xODUuMyw0MDEuMmwwLTguMmMwLjEtMC42LTAuMy0xLTEtMWwtMTMuNSwwVjM5MnYtNy42YzAtMC41LTAuMi0wLjgtMC43LTEuMWMtMC41LTAuMy0xLTAuMi0xLjMsMC4xJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2wtMTcuOCwxMi44Yy0wLjQsMC4zLTAuNiwwLjYtMC42LDFjMCwwLjUsMC4yLDAuOCwwLjYsMS4xbDE3LjgsMTIuN2MwLjQsMC4zLDAuOSwwLjQsMS4zLDAuMWMwLjUtMC4zLDAuNy0wLjYsMC43LTEuMXYtNy43JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2wxMy41LDBDLTE4NS41LDQwMi4yLTE4NS4yLDQwMS45LTE4NS4zLDQwMS4yeiIgZmlsbD'+
			'0iI0ZGRkZGRiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._movemode_1__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._movemode_1__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzM0LjhjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40YzM0LjQsMCw2Mi40LTI3LjksNjIuNC02Mi40JiN4ZDsmI3hhOyYjeDk7JiN4OTtDLTExMi42LDM2Mi43LTE0MC42LDMzNC44LTE3NSwzMzQuOHogTS0xOTAuMiwzNjcuNGwxNC4xLTE5LjhjMC4zLTAuNCwwLjYtMC42LDEuMi0wLjZjMC40LDAsMC43LDAuMiwxLjEsMC42bDE0LjIsMTkuOCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuMywwLjQsMC40LDEsMC4xLDEuNWMtMC4zLDAuNS0wLjYsMC43LTEuMiwwLjdoLTguNGgtMC4xdjE1YzAsMC44'+
			'LTAuNCwxLjItMS4xLDEuMWwtOS4xLDBjLTAuNywwLjEtMS4xLTAuMy0xLjEtMS4xdi0xNWgtOC41JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuNSwwLTAuOS0wLjItMS4yLTAuN0MtMTkwLjcsMzY4LjQtMTkwLjYsMzY3LjktMTkwLjIsMzY3LjR6IE0tMjAyLjUsNDExLjNjMCwwLjUtMC4yLDAuOS0wLjcsMS4yYy0wLjUsMC4zLTEuMSwwLjItMS41LTAuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7bC0xOS44LTE0LjFjLTAuNC0wLjMtMC42LTAuNi0wLjYtMS4yYzAtMC40LDAuMi0wLjcsMC42LTEuMWwxOS44LTE0LjJjMC40LTAuMywxLTAuNCwxLjUtMC4xYzAuNSwwLjMsMC43LDAuNiwwLjcsMS4ydjguNX'+
			'YwLjEmI3hkOyYjeGE7JiN4OTsmI3g5O2wxNSwwYzAuOCwwLDEuMiwwLjQsMS4xLDEuMWwwLDkuMWMwLjEsMC43LTAuMywxLjEtMS4xLDEuMWwtMTUsMFY0MTEuM3ogTS0xNTkuOCw0MjYuOGwtMTQuMSwxOS44Yy0wLjMsMC40LTAuNiwwLjYtMS4yLDAuNiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQsMC0wLjctMC4yLTEuMS0wLjZsLTE0LjItMTkuOGMtMC4zLTAuNC0wLjQtMS0wLjEtMS41YzAuMy0wLjUsMC42LTAuNywxLjItMC43aDguNWgwLjFsMC0xNWMwLTAuOCwwLjQtMS4yLDEuMS0xLjFsOS4xLDAmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjctMC4xLDEuMSwwLjMsMS4xLDEuMWwwLDE1aDgu'+
			'NWMwLjUsMCwwLjksMC4yLDEuMiwwLjdTLTE1OS40LDQyNi40LTE1OS44LDQyNi44eiBNLTEyNS41LDM5OC4ybC0xOS44LDE0LjImI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40LDAuMy0xLDAuNC0xLjUsMC4xYy0wLjUtMC4zLTAuNy0wLjYtMC43LTEuMnYtOC41di0wLjFoLTE1Yy0wLjgsMC0xLjItMC40LTEuMS0xLjFsMC05LjFjLTAuMS0wLjcsMC4zLTEuMSwxLjEtMS4xaDE1VjM4MyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMC41LDAuMi0wLjksMC43LTEuMmMwLjUtMC4zLDEuMS0wLjIsMS41LDAuMWwxOS44LDE0LjFjMC40LDAuMywwLjYsMC42LDAuNiwxLjJDLTEyNC44LDM5Ny42LTEyNS4xLD'+
			'M5Ny45LTEyNS41LDM5OC4yeiIgZmlsbD0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzIiPgogIDxnPgogICA8cGF0aCBkPSJNLTE4OS4yLDM2OS43aDguNXYxNWMwLDAuOCwwLjQsMS4yLDEuMSwxLjFsOS4xLDBjMC43LDAuMSwxLjEtMC4zLDEuMS0xLjF2LTE1aDAuMWg4LjQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNSwwLDAuOS0wLjIsMS4yLTAuN2MwLjMtMC41LDAuMi0xLjEtMC4xLTEuNWwtMTQuMi0xOS44Yy0wLjMtMC40LTAuNi0wLjYtMS4xLTAuNmMtMC41LDAtMC45LDAuMi0xLjIsMC42bC0xNC4xLDE5LjgmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjMsMC40'+
			'LTAuNCwxLTAuMSwxLjVDLTE5MCwzNjkuNS0xODkuNywzNjkuNy0xODkuMiwzNjkuN3oiIGZpbGw9IiNGRkZGRkYiLz4KICAgPHBhdGggZD0iTS0xNjAuOCw0MjQuNmgtOC41bDAtMTVjMC0wLjgtMC40LTEuMi0xLjEtMS4xbC05LjEsMGMtMC43LTAuMS0xLjEsMC4zLTEuMSwxLjFsMCwxNWgtMC4xaC04LjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjksMC4yLTEuMiwwLjdjLTAuMywwLjUtMC4yLDEuMSwwLjEsMS41bDE0LjIsMTkuOGMwLjMsMC40LDAuNiwwLjYsMS4xLDAuNmMwLjUsMCwwLjktMC4yLDEuMi0wLjZsMTQuMS0xOS44JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2'+
			'MwLjMtMC40LDAuNC0xLDAuMS0xLjVDLTE2MCw0MjQuOC0xNjAuMyw0MjQuNi0xNjAuOCw0MjQuNnoiIGZpbGw9IiNGRkZGRkYiLz4KICAgPHBhdGggZD0iTS0xMjUuNSwzOTZsLTE5LjgtMTQuMWMtMC40LTAuMy0xLTAuNC0xLjUtMC4xYy0wLjUsMC4zLTAuNywwLjYtMC43LDEuMnY4LjVoLTE1Yy0wLjgsMC0xLjIsMC40LTEuMSwxLjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7bDAsOS4xYy0wLjEsMC43LDAuMywxLjEsMS4xLDEuMWgxNXYwLjF2OC41YzAsMC41LDAuMiwwLjksMC43LDEuMnMxLjEsMC4yLDEuNS0wLjFsMTkuOC0xNC4yYzAuNC0wLjMsMC42LTAuNiwwLjYtMS4xJiN4ZDsmI3hh'+
			'OyYjeDk7JiN4OTsmI3g5O0MtMTI0LjgsMzk2LjYtMTI1LjEsMzk2LjMtMTI1LjUsMzk2eiIgZmlsbD0iI0ZGRkZGRiIvPgogICA8cGF0aCBkPSJNLTE4Ni40LDQwMS43bDAtOS4xYzAuMS0wLjctMC4zLTEuMS0xLjEtMS4xbC0xNSwwdi0wLjFWMzgzYzAtMC41LTAuMi0wLjktMC43LTEuMiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjLTAuNS0wLjMtMS4xLTAuMi0xLjUsMC4xbC0xOS44LDE0LjJjLTAuNCwwLjMtMC42LDAuNi0wLjYsMS4xYzAsMC41LDAuMiwwLjksMC42LDEuMmwxOS44LDE0LjFjMC40LDAuMywxLDAuNCwxLjUsMC4xJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MwLjUtMC4zLD'+
			'AuNy0wLjYsMC43LTEuMnYtOC41bDE1LDBDLTE4Ni43LDQwMi44LTE4Ni4zLDQwMi40LTE4Ni40LDQwMS43eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._movemode_1__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="movemode_1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 128px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._movemode_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._movemode_1.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getViewMode() == 1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._movemode_1.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._movemode_1.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._movemode_1.style[domTransition]='';
				if (me._movemode_1.ggCurrentLogicStateVisible == 0) {
					me._movemode_1.style.visibility=(Number(me._movemode_1.style.opacity)>0||!me._movemode_1.style.opacity)?'inherit':'hidden';
					me._movemode_1.ggVisible=true;
				}
				else {
					me._movemode_1.style.visibility="hidden";
					me._movemode_1.ggVisible=false;
				}
			}
		}
		me._movemode_1.onclick=function (e) {
			player.changeViewMode(0);
		}
		me._movemode_1.onmouseover=function (e) {
			me._movemode_1__img.style.visibility='hidden';
			me._movemode_1__imgo.style.visibility='inherit';
		}
		me._movemode_1.onmouseout=function (e) {
			me._movemode_1__img.style.visibility='inherit';
			me._movemode_1__imgo.style.visibility='hidden';
		}
		me._movemode_1.ggUpdatePosition=function (useTransition) {
		}
		me._controller.appendChild(me._movemode_1);
		el=me._movemode_2=document.createElement('div');
		els=me._movemode_2__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzUuMywzNTcuM2MtMjEuOS0yMS45LTU3LjUtMjEuOS03OS40LDBzLTIxLjksNTcuNSwwLDc5LjRzNTcuNSwyMS45LDc5LjQsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTMuNCw0MTQuOC0xMTMuNCwzNzkuMi0xMzUuMywzNTcuM3ogTS0xNDIuMiw0MTIuM2wtMTUsMTVjLTAuOSwwLjktMi40LDAuOS0zLjIsMGwtMTAtMTBsLTcsMC44Yy0xLjMsMC4xLTMuMi0wLjItNC4zLTAuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7bC0xNi4xLTcuOWMtMS4xLTAuNi0xLjYtMS45LTEtMy4xbDEuNC0yLjhjMC42LTEuMSwyLTEuNiwzLjEtMS4xbDYuMiwyLjlsLTE5LTE5'+
			'Yy0wLjktMC45LTAuOS0yLjQsMC0zLjJsMS44LTEuOCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuOS0wLjksMi40LTAuOSwzLjIsMGwxMi4zLDEyLjNsMi0ybC0xNS4zLTE1LjNjLTAuOS0wLjktMC45LTIuNCwwLTMuMmwxLjgtMS44YzAuOS0wLjksMi40LTAuOSwzLjIsMGwxNS4zLDE1LjNsMi0ybC0xMi4zLTEyLjMmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC45LTAuOS0wLjktMi40LDAtMy4ybDEuOC0xLjhjMC45LTAuOSwyLjQtMC45LDMuMiwwbDEyLjMsMTIuM2wxLjYtMS42YzAuMS0wLjEsMC4zLTAuMiwwLjQtMC4zbC04LjQtOC40JiN4ZDsmI3hhOyYjeDk7JiN4OTtjLTAuOS0wLjktMC45LTIuNC'+
			'wwLTMuMmwxLjgtMS44YzAuOS0wLjksMi40LTAuOSwzLjIsMGwyMS4yLDIxLjJjMC45LDAuOSwxLjgsMi42LDIuMSwzLjlsMiw5LjhsOS45LDkuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xNDEuMyw0MDkuOS0xNDEuMyw0MTEuNC0xNDIuMiw0MTIuM3oiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE0Mi4yLDQwOWwtOS45LTkuOWwtMi05LjhjLTAuMy0xLjItMS4yLTMtMi4xLTMuOWwtMjEuMi0yMS4yYy0wLjktMC45LTIuNC0wLjktMy4yLDBsLTEuOCwxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC45LDAuOS0wLjksMi40LDAsMy4ybDguNCw4'+
			'LjRjLTAuMiwwLjEtMC4zLDAuMi0wLjQsMC4zbC0xLjYsMS42bC0xMi4zLTEyLjNjLTAuOS0wLjktMi40LTAuOS0zLjIsMGwtMS44LDEuOCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjksMC45LTAuOSwyLjQsMCwzLjJsMTIuMywxMi4zbC0yLDJsLTE1LjMtMTUuM2MtMC45LTAuOS0yLjQtMC45LTMuMiwwbC0xLjgsMS44Yy0wLjksMC45LTAuOSwyLjQsMCwzLjJsMTUuMywxNS4zbC0yLDImI3hkOyYjeGE7JiN4OTsmI3g5O2wtMTIuMy0xMi4zYy0wLjktMC45LTIuNC0wLjktMy4yLDBsLTEuOCwxLjhjLTAuOSwwLjktMC45LDIuNCwwLDMuMmwxOSwxOWwtNi4yLTIuOWMtMS4xLTAuNS0yLjUtMC4xLT'+
			'MuMSwxLjFsLTEuNCwyLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42LDEuMS0wLjEsMi41LDEsMy4xbDE2LjEsNy45YzEuMSwwLjYsMy4xLDAuOSw0LjMsMC43bDctMC44bDEwLDEwYzAuOSwwLjksMi40LDAuOSwzLjIsMGwxNS0xNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xNDEuMyw0MTEuNC0xNDEuMyw0MDkuOS0xNDIuMiw0MDl6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._movemode_2__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._movemode_2__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzAuOSwzNTIuOGMtMjQuNC0yNC40LTYzLjgtMjQuNC04OC4yLDBzLTI0LjQsNjMuOCwwLDg4LjJzNjMuOCwyNC40LDg4LjIsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMDYuNiw0MTYuNi0xMDYuNiwzNzcuMi0xMzAuOSwzNTIuOHogTS0xMzguNSw0MTMuOWwtMTYuNywxNi43Yy0xLDEtMi42LDEtMy42LDBsLTExLjEtMTEuMWwtNy44LDAuOWMtMS40LDAuMi0zLjYtMC4yLTQuOC0wLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2wtMTcuOS04LjdjLTEuMy0wLjYtMS44LTIuMS0xLjItMy40bDEuNi0zLjJjMC42LTEuMywyLjItMS44LDMuNC0xLjJsNi44LDMu'+
			'M2wtMjEuMS0yMS4xYy0xLTEtMS0yLjYsMC0zLjZsMi0yYzEtMSwyLjYtMSwzLjYsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7bDEzLjcsMTMuN2wyLjItMi4ybC0xNy0xN2MtMS0xLTEtMi42LDAtMy42bDItMmMxLTEsMi42LTEsMy42LDBsMTcsMTdsMi4yLTIuMmwtMTMuNy0xMy43Yy0xLTEtMS0yLjYsMC0zLjZsMi0yYzEtMSwyLjYtMSwzLjYsMCYjeGQ7JiN4YTsmI3g5OyYjeDk7bDEzLjcsMTMuN2wxLjgtMS44YzAuMS0wLjEsMC4zLTAuMywwLjUtMC40bC05LjQtOS40Yy0xLTEtMS0yLjYsMC0zLjZsMi0yYzEtMSwyLjYtMSwzLjYsMGwyMy42LDIzLjZjMSwxLDIsMi45LDIuMyw0LjNsMi4yLDEwLj'+
			'gmI3hkOyYjeGE7JiN4OTsmI3g5O2wxMSwxMUMtMTM3LjUsNDExLjMtMTM3LjUsNDEyLjktMTM4LjUsNDEzLjl6IiBmaWxsPSIjMDAwMDAwIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPHBhdGggZD0iTS0xMzguNSw0MTAuM2wtMTEtMTFsLTIuMi0xMC44Yy0wLjMtMS40LTEuMy0zLjMtMi4zLTQuM2wtMjMuNi0yMy42Yy0xLTEtMi42LTEtMy42LDBsLTIsMiYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0xLDEtMSwyLjYsMCwzLjZsOS40LDkuNGMtMC4yLDAuMS0wLjMsMC4yLTAuNSwwLjRsLTEuOCwxLjhsLTEzLjctMTMuN2MtMS0xLTIuNi0xLTMuNiwwbC0yLDJjLTEsMS0xLDIuNiwwLDMuNmwx'+
			'My43LDEzLjcmI3hkOyYjeGE7JiN4OTsmI3g5O2wtMi4yLDIuMmwtMTctMTdjLTEtMS0yLjYtMS0zLjYsMGwtMiwyYy0xLDEtMSwyLjYsMCwzLjZsMTcsMTdsLTIuMiwyLjJsLTEzLjctMTMuN2MtMS0xLTIuNi0xLTMuNiwwbC0yLDJjLTEsMS0xLDIuNiwwLDMuNiYjeGQ7JiN4YTsmI3g5OyYjeDk7bDIxLjEsMjEuMWwtNi45LTMuM2MtMS4zLTAuNi0yLjgtMC4xLTMuNCwxLjJsLTEuNiwzLjJjLTAuNiwxLjMtMC4xLDIuOCwxLjIsMy40bDE3LjksOC43YzEuMywwLjYsMy40LDEsNC44LDAuOGw3LjgtMC45JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTEuMSwxMS4xYzEsMSwyLjYsMSwzLjYsMGwxNi43LT'+
			'E2LjdDLTEzNy41LDQxMi45LTEzNy41LDQxMS4zLTEzOC41LDQxMC4zeiIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._movemode_2__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="movemode_2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 128px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._movemode_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._movemode_2.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getViewMode() == 0))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._movemode_2.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._movemode_2.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._movemode_2.style[domTransition]='';
				if (me._movemode_2.ggCurrentLogicStateVisible == 0) {
					me._movemode_2.style.visibility=(Number(me._movemode_2.style.opacity)>0||!me._movemode_2.style.opacity)?'inherit':'hidden';
					me._movemode_2.ggVisible=true;
				}
				else {
					me._movemode_2.style.visibility="hidden";
					me._movemode_2.ggVisible=false;
				}
			}
		}
		me._movemode_2.onclick=function (e) {
			player.changeViewMode(1);
		}
		me._movemode_2.onmouseover=function (e) {
			me._movemode_2__img.style.visibility='hidden';
			me._movemode_2__imgo.style.visibility='inherit';
		}
		me._movemode_2.onmouseout=function (e) {
			me._movemode_2__img.style.visibility='inherit';
			me._movemode_2__imgo.style.visibility='hidden';
		}
		me._movemode_2.ggUpdatePosition=function (useTransition) {
		}
		me._controller.appendChild(me._movemode_2);
		el=me._zoomout=document.createElement('div');
		els=me._zoomout__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8cGF0aCBkPS'+
			'JNLTE0My4yLDM4Ny41YzEuMSwwLDEuNiwwLjUsMS42LDEuOHYxNS41YzAsMC41LTAuMiwwLjktMC41LDEuM2MtMC40LDAuNC0wLjcsMC41LTEuMSwwLjVoLTYzLjUmI3hkOyYjeGE7JiN4OTtjLTAuNCwwLTAuNy0wLjItMS4xLTAuNWMtMC40LTAuNC0wLjUtMC43LTAuNS0xLjN2LTE1LjVjMC0xLjMsMC41LTEuOCwxLjYtMS44SC0xNDMuMnoiIGZpbGw9IiNGRkZGRkYiLz4KIDxwYXRoIGQ9Ik0tMTc1LDM0MC45Yy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFzMjUuMSw1Ni4xLDU2LjEsNTYuMXM1Ni4xLTI1LjEsNTYuMS01Ni4xUy0xNDQsMzQwLjktMTc1LDM0MC45eiYjeGQ7JiN4YTsmI3g5OyBN'+
			'LTE0MS42LDQwNC43YzAsMC41LTAuMiwwLjktMC41LDEuM2MtMC40LDAuNC0wLjcsMC41LTEuMSwwLjVoLTYzLjVjLTAuNCwwLTAuNy0wLjItMS4xLTAuNWMtMC40LTAuNC0wLjUtMC43LTAuNS0xLjN2LTE1LjUmI3hkOyYjeGE7JiN4OTtjMC0xLjMsMC41LTEuOCwxLjYtMS44aDYzLjVjMS4xLDAsMS42LDAuNSwxLjYsMS44VjQwNC43eiIgZmlsbD0iIzAwMDAwMCIvPgo8L3N2Zz4K';
		me._zoomout__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._zoomout__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8cGF0aCBkPS'+
			'JNLTEzOS43LDM4Ni40YzEuMiwwLDEuOCwwLjYsMS44LDJ2MTcuMmMwLDAuNi0wLjIsMS0wLjYsMS40Yy0wLjQsMC40LTAuOCwwLjYtMS4yLDAuNmgtNzAuNiYjeGQ7JiN4YTsmI3g5O2MtMC40LDAtMC44LTAuMi0xLjItMC42Yy0wLjQtMC40LTAuNi0wLjgtMC42LTEuNHYtMTcuMmMwLTEuNCwwLjYtMiwxLjgtMkgtMTM5Ljd6IiBmaWxsPSIjRkZGRkZGIi8+CiA8cGF0aCBkPSJNLTE3NSwzMzQuNmMtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRzMjcuOSw2Mi40LDYyLjQsNjIuNHM2Mi40LTI3LjksNjIuNC02Mi40Uy0xNDAuNiwzMzQuNi0xNzUsMzM0LjZ6JiN4ZDsmI3hhOyYjeDk7IE0tMTM3'+
			'LjksNDA1LjZjMCwwLjYtMC4yLDEtMC42LDEuNGMtMC40LDAuNC0wLjgsMC42LTEuMiwwLjZoLTcwLjZjLTAuNCwwLTAuOC0wLjItMS4yLTAuNnMtMC42LTAuOC0wLjYtMS40di0xNy4yJiN4ZDsmI3hhOyYjeDk7YzAtMS40LDAuNi0yLDEuOC0yaDcwLjZjMS4yLDAsMS44LDAuNiwxLjgsMlY0MDUuNnoiIGZpbGw9IiMwMDAwMDAiLz4KPC9zdmc+Cg==';
		me._zoomout__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="zoomout";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 32px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._zoomout.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoomout.onmouseover=function (e) {
			me._zoomout__img.style.visibility='hidden';
			me._zoomout__imgo.style.visibility='inherit';
		}
		me._zoomout.onmouseout=function (e) {
			me._zoomout__img.style.visibility='inherit';
			me._zoomout__imgo.style.visibility='hidden';
			me.elementMouseDown['zoomout']=false;
		}
		me._zoomout.onmousedown=function (e) {
			me.elementMouseDown['zoomout']=true;
		}
		me._zoomout.onmouseup=function (e) {
			me.elementMouseDown['zoomout']=false;
		}
		me._zoomout.ontouchend=function (e) {
			me.elementMouseDown['zoomout']=false;
		}
		me._zoomout.ggUpdatePosition=function (useTransition) {
		}
		me._controller.appendChild(me._zoomout);
		el=me._zoomin=document.createElement('div');
		els=me._zoomin__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMXMyNS4xLDU2LjEsNTYuMSw1Ni4xczU2LjEtMjUuMSw1Ni4xLTU2LjFTLTE0NCwzNDAuOS0xNzUsMzQwLjl6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTS0xNDEuNiw0MDQuN2MwLDAuNS0wLjIsMC45LTAuNSwxLjNjLTAuNCwwLjQtMC43LDAuNS0xLjEsMC41aC0yMi4zdjIyLjFjMCwwLjUtMC4yLDAuOS0wLjUsMS4zYy0wLjQsMC40LTAuNywwLjUtMS4xLDAuNWgtMTUuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjQsMC0wLjctMC4yLTEuMS0wLjVjLTAuNC0wLjQtMC41LTAuNy0wLjUtMS4zdi0y'+
			'Mi4xaC0yMi4zYy0wLjQsMC0wLjctMC4yLTEuMS0wLjVjLTAuNC0wLjQtMC41LTAuNy0wLjUtMS4zdi0xNS41JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0xLjMsMC41LTEuOCwxLjYtMS44aDIyLjN2LTIyLjFjMC0xLjMsMC41LTEuOCwxLjYtMS44aDE1LjdjMS4xLDAsMS42LDAuNSwxLjYsMS44djIyLjFoMjIuM2MxLjEsMCwxLjYsMC41LDEuNiwxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTQxLjYsMzg5LjMtMTQxLjYsNDA0LjctMTQxLjYsNDA0Ljd6IiBmaWxsPSIjMDAwMDAwIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPHBhdGggZD0iTS0xNjUuNSwzODcuNWgyMi4zYzEuMSwwLDEuNi'+
			'wwLjUsMS42LDEuOHYxNS41YzAsMC41LTAuMiwwLjktMC41LDEuM2MtMC40LDAuNC0wLjcsMC41LTEuMSwwLjVoLTIyLjN2MjIuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAsMC41LTAuMiwwLjktMC41LDEuM2MtMC40LDAuNC0wLjcsMC41LTEuMSwwLjVoLTE1LjdjLTAuNCwwLTAuNy0wLjItMS4xLTAuNWMtMC40LTAuNC0wLjUtMC43LTAuNS0xLjN2LTIyLjFoLTIyLjMmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40LDAtMC43LTAuMi0xLjEtMC41Yy0wLjQtMC40LTAuNS0wLjctMC41LTEuM3YtMTUuNWMwLTEuMywwLjUtMS44LDEuNi0xLjhoMjIuM3YtMjIuMWMwLTEuMywwLjUtMS44LDEuNi0xLjho'+
			'MTUuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuMSwwLDEuNiwwLjUsMS42LDEuOFYzODcuNXoiIGZpbGw9IiNGRkZGRkYiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._zoomin__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._zoomin__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40czI3LjksNjIuNCw2Mi40LDYyLjRzNjIuNC0yNy45LDYyLjQtNjIuNFMtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiYjeGQ7JiN4YTsmI3g5OyYjeDk7IE0tMTM3LjksNDA1LjZjMCwwLjYtMC4yLDEtMC42LDEuNGMtMC40LDAuNC0wLjgsMC42LTEuMiwwLjZoLTI0Ljh2MjQuNmMwLDAuNi0wLjIsMS0wLjYsMS40cy0wLjgsMC42LTEuMiwwLjZoLTE3LjQmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40LDAtMC44LTAuMi0xLjItMC42Yy0wLjQtMC40LTAuNi0wLjgtMC42LTEuNHYtMjQuNmgtMjQu'+
			'OGMtMC40LDAtMC44LTAuMi0xLjItMC42cy0wLjYtMC44LTAuNi0xLjR2LTE3LjJjMC0xLjQsMC42LTIsMS44LTImI3hkOyYjeGE7JiN4OTsmI3g5O2gyNC44di0yNC42YzAtMS40LDAuNi0yLDEuOC0yaDE3LjRjMS4yLDAsMS44LDAuNiwxLjgsMnYyNC42aDI0LjhjMS4yLDAsMS44LDAuNiwxLjgsMkMtMTM3LjksMzg4LjQtMTM3LjksNDA1LjYtMTM3LjksNDA1LjZ6IiBmaWxsPSIjMDAwMDAwIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPHBhdGggZD0iTS0xNjQuNSwzODYuNGgyNC44YzEuMiwwLDEuOCwwLjYsMS44LDJ2MTcuMmMwLDAuNi0wLjIsMS0wLjYsMS40Yy0wLjQsMC40LTAuOC'+
			'wwLjYtMS4yLDAuNmgtMjQuOHYyNC42JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMCwwLjYtMC4yLDEtMC42LDEuNHMtMC44LDAuNi0xLjIsMC42aC0xNy40Yy0wLjQsMC0wLjgtMC4yLTEuMi0wLjZjLTAuNC0wLjQtMC42LTAuOC0wLjYtMS40di0yNC42aC0yNC44Yy0wLjQsMC0wLjgtMC4yLTEuMi0wLjYmI3hkOyYjeGE7JiN4OTsmI3g5O3MtMC42LTAuOC0wLjYtMS40di0xNy4yYzAtMS40LDAuNi0yLDEuOC0yaDI0Ljh2LTI0LjZjMC0xLjQsMC42LTIsMS44LTJoMTcuNGMxLjIsMCwxLjgsMC42LDEuOCwyVjM4Ni40eiIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._zoomin__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="zoomin";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._zoomin.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._zoomin.onmouseover=function (e) {
			me._zoomin__img.style.visibility='hidden';
			me._zoomin__imgo.style.visibility='inherit';
		}
		me._zoomin.onmouseout=function (e) {
			me._zoomin__img.style.visibility='inherit';
			me._zoomin__imgo.style.visibility='hidden';
			me.elementMouseDown['zoomin']=false;
		}
		me._zoomin.onmousedown=function (e) {
			me.elementMouseDown['zoomin']=true;
		}
		me._zoomin.onmouseup=function (e) {
			me.elementMouseDown['zoomin']=false;
		}
		me._zoomin.ontouchend=function (e) {
			me.elementMouseDown['zoomin']=false;
		}
		me._zoomin.ggUpdatePosition=function (useTransition) {
		}
		me._controller.appendChild(me._zoomin);
		me.divSkin.appendChild(me._controller);
		el=me._loading=document.createElement('div');
		el.ggId="loading";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 60px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 210px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._loading.onclick=function (e) {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
		}
		me._loading.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._loadingbg=document.createElement('div');
		el.ggId="loadingbg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 60px;';
		hs+='left : 0px;';
		hs+='opacity : 0.5;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 210px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loadingbg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadingbg.ggUpdatePosition=function (useTransition) {
		}
		me._loading.appendChild(me._loadingbg);
		el=me._loadingtext=document.createElement('div');
		els=me._loadingtext__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="loadingtext";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : 16px;';
		hs+='position : absolute;';
		hs+='top : 12px;';
		hs+='visibility : inherit;';
		hs+='width : 178px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._loadingtext.ggUpdateText=function() {
			var hs="Loading... "+(player.getPercentLoaded()*100.0).toFixed(0)+"%";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._loadingtext.ggUpdateText();
		player.addListener('downloadprogress', function() {
			me._loadingtext.ggUpdateText();
		});
		el.appendChild(els);
		me._loadingtext.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadingtext.ggUpdatePosition=function (useTransition) {
		}
		me._loading.appendChild(me._loadingtext);
		el=me._loadingbar=document.createElement('div');
		el.ggId="loadingbar";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 0px solid #808080;';
		hs+='cursor : default;';
		hs+='height : 13px;';
		hs+='left : 15px;';
		hs+='position : absolute;';
		hs+='top : 35px;';
		hs+='visibility : inherit;';
		hs+='width : 182px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 50%';
		me._loadingbar.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loadingbar.ggUpdatePosition=function (useTransition) {
		}
		me._loading.appendChild(me._loadingbar);
		me.divSkin.appendChild(me._loading);
		el=me._screentint=document.createElement('div');
		el.ggId="screentint";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.392157);';
		hs+='border : 1px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 480px;';
		hs+='left : -0.078125%;';
		hs+='position : absolute;';
		hs+='top : -0.104167%;';
		hs+='visibility : hidden;';
		hs+='width : 640px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._screentint.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._screentint.onclick=function (e) {
			me._close.style[domTransition]='none';
			me._close.style.visibility='hidden';
			me._close.ggVisible=false;
			me._controller.style[domTransition]='none';
			me._controller.style.visibility=(Number(me._controller.style.opacity)>0||!me._controller.style.opacity)?'inherit':'hidden';
			me._controller.ggVisible=true;
			me._screentint.style[domTransition]='none';
			me._screentint.style.visibility='hidden';
			me._screentint.ggVisible=false;
			me._popup_video_youtube.ggInitMedia('');
			me._popup_video_youtube.style[domTransition]='none';
			me._popup_video_youtube.style.visibility='hidden';
			me._popup_video_youtube.ggVisible=false;
			me._video_popup_youtube.style[domTransition]='none';
			me._video_popup_youtube.style.visibility='hidden';
			me._video_popup_youtube.ggVisible=false;
			me._popup_video_vimeo.ggInitMedia('');
			me._popup_video_vimeo.style[domTransition]='none';
			me._popup_video_vimeo.style.visibility='hidden';
			me._popup_video_vimeo.ggVisible=false;
			me._video_popup_vimeo.style[domTransition]='none';
			me._video_popup_vimeo.style.visibility='hidden';
			me._video_popup_vimeo.ggVisible=false;
			me._popup_video_url.ggInitMedia('');
			me._popup_video_url.style[domTransition]='none';
			me._popup_video_url.style.visibility='hidden';
			me._popup_video_url.ggVisible=false;
			me._video_popup_url.style[domTransition]='none';
			me._video_popup_url.style.visibility='hidden';
			me._video_popup_url.ggVisible=false;
			me._video_popup_controls_url.style[domTransition]='none';
			me._video_popup_controls_url.style.visibility='hidden';
			me._video_popup_controls_url.ggVisible=false;
			me._popup_video_file.ggInitMedia('');
			me._popup_video_file.style[domTransition]='none';
			me._popup_video_file.style.visibility='hidden';
			me._popup_video_file.ggVisible=false;
			me._video_popup_file.style[domTransition]='none';
			me._video_popup_file.style.visibility='hidden';
			me._video_popup_file.ggVisible=false;
			me._video_popup_controls_file.style[domTransition]='none';
			me._video_popup_controls_file.style.visibility='hidden';
			me._video_popup_controls_file.ggVisible=false;
			me._image_popup.style[domTransition]='none';
			me._image_popup.style.visibility='hidden';
			me._image_popup.ggVisible=false;
			me._popup_image.ggSubElement.src='';
			me._popup_image.style[domTransition]='none';
			me._popup_image.style.visibility='hidden';
			me._popup_image.ggVisible=false;
			me._information.style[domTransition]='none';
			me._information.style.visibility='hidden';
			me._information.ggVisible=false;
			me._userdata.style[domTransition]='none';
			me._userdata.style.visibility='hidden';
			me._userdata.ggVisible=false;
		}
		me._screentint.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._screentint);
		el=me._userdata=document.createElement('div');
		el.ggId="userdata";
		el.ggDx=0;
		el.ggDy=-10;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 140px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 240px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._userdata.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._userdata.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._userdatabg=document.createElement('div');
		el.ggId="userdatabg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.784314);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 140px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 240px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._userdatabg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdatabg.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdatabg);
		el=me._title=document.createElement('div');
		els=me._title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._title.ggUpdateText=function() {
			var hs="<b>"+me.ggUserdata.title+"<\/b>";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._title.ggUpdateText();
		player.addListener('changenode', function() {
			me._title.ggUpdateText();
		});
		el.appendChild(els);
		me._title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._title.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._title);
		el=me._description=document.createElement('div');
		els=me._description__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="description";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 30px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._description.ggUpdateText=function() {
			var hs=me.ggUserdata.description;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._description.ggUpdateText();
		player.addListener('changenode', function() {
			me._description.ggUpdateText();
		});
		el.appendChild(els);
		me._description.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._description.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._description);
		el=me._author=document.createElement('div');
		els=me._author__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="author";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 220px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._author.ggUpdateText=function() {
			var hs=me.ggUserdata.author;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._author.ggUpdateText();
		player.addListener('changenode', function() {
			me._author.ggUpdateText();
		});
		el.appendChild(els);
		me._author.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._author.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._author);
		el=me._datetime=document.createElement('div');
		els=me._datetime__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="datetime";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 70px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._datetime.ggUpdateText=function() {
			var hs=me.ggUserdata.datetime;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._datetime.ggUpdateText();
		player.addListener('changenode', function() {
			me._datetime.ggUpdateText();
		});
		el.appendChild(els);
		me._datetime.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._datetime.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._datetime);
		el=me._copyright=document.createElement('div');
		els=me._copyright__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="copyright";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 23px;';
		hs+='left : 10px;';
		hs+='position : absolute;';
		hs+='top : 110px;';
		hs+='visibility : inherit;';
		hs+='width : 220px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._copyright.ggUpdateText=function() {
			var hs="&#169; "+me.ggUserdata.copyright;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._copyright.ggUpdateText();
		player.addListener('changenode', function() {
			me._copyright.ggUpdateText();
		});
		el.appendChild(els);
		me._copyright.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._copyright.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._copyright);
		el=me._userdata_close=document.createElement('div');
		els=me._userdata_close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzUuMywzNTcuM2MtMjEuOS0yMS45LTU3LjUtMjEuOS03OS40LDBjLTIxLjksMjEuOS0yMS45LDU3LjUsMCw3OS40YzIxLjksMjEuOSw1Ny41LDIxLjksNzkuNCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTExMy40LDM3OS4yLTEzNS4zLDM1Ny4zeiBNLTE0NS44LDQxMi43YzAuOCwwLjgsMC44LDEuNS0wLjEsMi40bC0xMC45LDEwLjljLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjQmI3hkOyYjeGE7JiN4OTsmI3g5O2wtMTUuOC0xNS44bC0xNS43LDE1LjdjLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41cy0wLjktMC4x'+
			'LTEuMS0wLjRsLTExLjEtMTEuMWMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuNy0xNS43bC0xNS44LTE1LjhjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xYzAtMC41LDAuMS0wLjksMC41LTEuM2wxMC45LTEwLjljMC45LTAuOSwxLjctMC45LDIuNC0wLjFsMTUuOCwxNS44bDE1LjctMTUuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xbDExLjEsMTEuMWMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTUuNywxNS43TC0xNDUuOCw0MTIuN3oiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KID'+
			'xnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE2MS42LDM5Ni45bDE1LjgsMTUuOGMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTAuOSwxMC45Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjRsLTE1LjgtMTUuOGwtMTUuNywxNS43Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNXMtMC45LTAuMS0xLjEtMC40bC0xMS4xLTExLjFjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjUsMC4xLTAuOSwwLjUtMS4zbDE1LjctMTUuN2wtMTUuOC0xNS44Yy0wLjMtMC4zLTAuNC0wLjYtMC40'+
			'LTEuMWMwLTAuNSwwLjEtMC45LDAuNS0xLjNsMTAuOS0xMC45YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuOCwxNS44bDE1LjctMTUuN2MwLjktMC45LDEuNy0wLjksMi40LTAuMWwxMS4xLDExLjFjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRMLTE2MS42LDM5Ni45eiIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._userdata_close__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._userdata_close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzAuOSwzNTIuOWMtMjQuNC0yNC40LTYzLjgtMjQuNC04OC4yLDBjLTI0LjQsMjQuNC0yNC40LDYzLjgsMCw4OC4yYzI0LjQsMjQuNCw2My44LDI0LjQsODguMiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTEwNi41LDM3Ny4zLTEzMC45LDM1Mi45eiBNLTE0Mi41LDQxNC41YzAuOCwwLjgsMC44LDEuNy0wLjEsMi43bC0xMi4yLDEyLjJjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40JiN4ZDsmI3hhOyYjeDk7JiN4OTtsLTE3LjUtMTcuNWwtMTcuNCwxNy40Yy0wLjQsMC40LTAuOCwwLjYtMS40LDAuNmMtMC42LDAtMS0w'+
			'LjEtMS4zLTAuNGwtMTIuMy0xMi4zYy0wLjMtMC4zLTAuNC0wLjctMC40LTEuM2MwLTAuNiwwLjEtMSwwLjYtMS40JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTcuNC0xNy40bC0xNy41LTE3LjVjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zYzAtMC42LDAuMS0xLDAuNi0xLjRsMTIuMi0xMi4yYzEtMSwxLjgtMSwyLjctMC4xbDE3LjUsMTcuNWwxNy40LTE3LjQmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLTEsMS44LTEsMi43LTAuMWwxMi4zLDEyLjNjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdsLTE3LjQsMTcuNEwtMTQyLjUsNDE0LjV6IiBmaWxsPSIjMDAwMDAwIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMi'+
			'I+CiAgPHBhdGggZD0iTS0xNjAuMSwzOTYuOWwxNy41LDE3LjVjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdsLTEyLjIsMTIuMmMtMC40LDAuNC0wLjgsMC42LTEuNCwwLjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42LDAtMS0wLjEtMS4zLTAuNGwtMTcuNS0xNy41bC0xNy40LDE3LjRjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40bC0xMi4zLTEyLjNjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjYsMC4xLTEsMC42LTEuNGwxNy40LTE3LjRsLTE3LjUtMTcuNWMtMC4zLTAuMy0wLjQtMC43LTAuNC0xLjNjMC0wLjYsMC4x'+
			'LTEsMC42LTEuNGwxMi4yLTEyLjJjMS0xLDEuOC0xLDIuNy0wLjFsMTcuNSwxNy41JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTcuNC0xNy40YzEtMSwxLjgtMSwyLjctMC4xbDEyLjMsMTIuM2MwLjgsMC44LDAuOCwxLjctMC4xLDIuN0wtMTYwLjEsMzk2Ljl6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._userdata_close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="userdata_close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 204px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._userdata_close.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._userdata_close.onclick=function (e) {
			me._userdata.style[domTransition]='none';
			me._userdata.style.visibility='hidden';
			me._userdata.ggVisible=false;
			me._screentint.style[domTransition]='none';
			me._screentint.style.visibility='hidden';
			me._screentint.ggVisible=false;
			me._controller.style[domTransition]='none';
			me._controller.style.visibility=(Number(me._controller.style.opacity)>0||!me._controller.style.opacity)?'inherit':'hidden';
			me._controller.ggVisible=true;
		}
		me._userdata_close.onmouseover=function (e) {
			me._userdata_close__img.style.visibility='hidden';
			me._userdata_close__imgo.style.visibility='inherit';
		}
		me._userdata_close.onmouseout=function (e) {
			me._userdata_close__img.style.visibility='inherit';
			me._userdata_close__imgo.style.visibility='hidden';
		}
		me._userdata_close.ggUpdatePosition=function (useTransition) {
		}
		me._userdata.appendChild(me._userdata_close);
		me.divSkin.appendChild(me._userdata);
		el=me._information=document.createElement('div');
		el.ggId="information";
		el.ggDx=0;
		el.ggDy=-1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 250px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 300px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._information.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._information.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		el=me._informationbg=document.createElement('div');
		el.ggId="informationbg";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.784314);';
		hs+='border : 0px solid #ffffff;';
		hs+='cursor : default;';
		hs+='height : 250px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._informationbg.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._informationbg.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._informationbg);
		el=me._info_text_body=document.createElement('div');
		els=me._info_text_body__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="info_text_body";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 193px;';
		hs+='left : 12px;';
		hs+='position : absolute;';
		hs+='top : 45px;';
		hs+='visibility : inherit;';
		hs+='width : 276px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 276px;';
		hs+='height: 193px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		hs+='overflow-y: auto;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._info_text_body.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_text_body.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._info_text_body);
		el=me._info_title=document.createElement('div');
		els=me._info_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="info_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 12px;';
		hs+='position : absolute;';
		hs+='top : 15px;';
		hs+='visibility : inherit;';
		hs+='width : 245px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 245px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._info_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._info_title.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._info_title);
		el=me._ht_info_close=document.createElement('div');
		els=me._ht_info_close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzUuMywzNTcuM2MtMjEuOS0yMS45LTU3LjUtMjEuOS03OS40LDBjLTIxLjksMjEuOS0yMS45LDU3LjUsMCw3OS40YzIxLjksMjEuOSw1Ny41LDIxLjksNzkuNCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTExMy40LDM3OS4yLTEzNS4zLDM1Ny4zeiBNLTE0NS44LDQxMi43YzAuOCwwLjgsMC44LDEuNS0wLjEsMi40bC0xMC45LDEwLjljLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjQmI3hkOyYjeGE7JiN4OTsmI3g5O2wtMTUuOC0xNS44bC0xNS43LDE1LjdjLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41cy0wLjktMC4x'+
			'LTEuMS0wLjRsLTExLjEtMTEuMWMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuNy0xNS43bC0xNS44LTE1LjhjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xYzAtMC41LDAuMS0wLjksMC41LTEuM2wxMC45LTEwLjljMC45LTAuOSwxLjctMC45LDIuNC0wLjFsMTUuOCwxNS44bDE1LjctMTUuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xbDExLjEsMTEuMWMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTUuNywxNS43TC0xNDUuOCw0MTIuN3oiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KID'+
			'xnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE2MS42LDM5Ni45bDE1LjgsMTUuOGMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTAuOSwxMC45Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjRsLTE1LjgtMTUuOGwtMTUuNywxNS43Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNXMtMC45LTAuMS0xLjEtMC40bC0xMS4xLTExLjFjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjUsMC4xLTAuOSwwLjUtMS4zbDE1LjctMTUuN2wtMTUuOC0xNS44Yy0wLjMtMC4zLTAuNC0wLjYtMC40'+
			'LTEuMWMwLTAuNSwwLjEtMC45LDAuNS0xLjNsMTAuOS0xMC45YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuOCwxNS44bDE1LjctMTUuN2MwLjktMC45LDEuNy0wLjksMi40LTAuMWwxMS4xLDExLjFjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRMLTE2MS42LDM5Ni45eiIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._ht_info_close__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_info_close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzAuOSwzNTIuOWMtMjQuNC0yNC40LTYzLjgtMjQuNC04OC4yLDBjLTI0LjQsMjQuNC0yNC40LDYzLjgsMCw4OC4yYzI0LjQsMjQuNCw2My44LDI0LjQsODguMiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTEwNi41LDM3Ny4zLTEzMC45LDM1Mi45eiBNLTE0Mi41LDQxNC41YzAuOCwwLjgsMC44LDEuNy0wLjEsMi43bC0xMi4yLDEyLjJjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40JiN4ZDsmI3hhOyYjeDk7JiN4OTtsLTE3LjUtMTcuNWwtMTcuNCwxNy40Yy0wLjQsMC40LTAuOCwwLjYtMS40LDAuNmMtMC42LDAtMS0w'+
			'LjEtMS4zLTAuNGwtMTIuMy0xMi4zYy0wLjMtMC4zLTAuNC0wLjctMC40LTEuM2MwLTAuNiwwLjEtMSwwLjYtMS40JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTcuNC0xNy40bC0xNy41LTE3LjVjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zYzAtMC42LDAuMS0xLDAuNi0xLjRsMTIuMi0xMi4yYzEtMSwxLjgtMSwyLjctMC4xbDE3LjUsMTcuNWwxNy40LTE3LjQmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLTEsMS44LTEsMi43LTAuMWwxMi4zLDEyLjNjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdsLTE3LjQsMTcuNEwtMTQyLjUsNDE0LjV6IiBmaWxsPSIjMDAwMDAwIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMi'+
			'I+CiAgPHBhdGggZD0iTS0xNjAuMSwzOTYuOWwxNy41LDE3LjVjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdsLTEyLjIsMTIuMmMtMC40LDAuNC0wLjgsMC42LTEuNCwwLjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42LDAtMS0wLjEtMS4zLTAuNGwtMTcuNS0xNy41bC0xNy40LDE3LjRjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40bC0xMi4zLTEyLjNjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjYsMC4xLTEsMC42LTEuNGwxNy40LTE3LjRsLTE3LjUtMTcuNWMtMC4zLTAuMy0wLjQtMC43LTAuNC0xLjNjMC0wLjYsMC4x'+
			'LTEsMC42LTEuNGwxMi4yLTEyLjJjMS0xLDEuOC0xLDIuNy0wLjFsMTcuNSwxNy41JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTcuNC0xNy40YzEtMSwxLjgtMSwyLjctMC4xbDEyLjMsMTIuM2MwLjgsMC44LDAuOCwxLjctMC4xLDIuN0wtMTYwLjEsMzk2Ljl6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_info_close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_info_close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 263px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_close.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_info_close.onclick=function (e) {
			me._information.style[domTransition]='none';
			me._information.style.visibility='hidden';
			me._information.ggVisible=false;
			me._screentint.style[domTransition]='none';
			me._screentint.style.visibility='hidden';
			me._screentint.ggVisible=false;
			me._controller.style[domTransition]='none';
			me._controller.style.visibility=(Number(me._controller.style.opacity)>0||!me._controller.style.opacity)?'inherit':'hidden';
			me._controller.ggVisible=true;
		}
		me._ht_info_close.onmouseover=function (e) {
			me._ht_info_close__img.style.visibility='hidden';
			me._ht_info_close__imgo.style.visibility='inherit';
		}
		me._ht_info_close.onmouseout=function (e) {
			me._ht_info_close__img.style.visibility='inherit';
			me._ht_info_close__imgo.style.visibility='hidden';
		}
		me._ht_info_close.ggUpdatePosition=function (useTransition) {
		}
		me._information.appendChild(me._ht_info_close);
		me.divSkin.appendChild(me._information);
		el=me._image_popup=document.createElement('div');
		el.ggId="image_popup";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : 10%;';
		hs+='position : absolute;';
		hs+='top : 10%;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_popup.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._image_popup.ggUpdatePosition=function (useTransition) {
		}
		el=me._loading_image=document.createElement('div');
		els=me._loading_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSI2NCI+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKD'+
			'Q1IDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC4xMjVzIiB2YWx1ZXM9IjA7MzswOzAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSg5MCAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlT'+
			'cGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuMjVzIiB2YWx1ZXM9IjA7MzswOzAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgxMzUgMTYgMTYpIiBjeT0iMyIgcj0iMCIgY3g9IjE2Ij4KICA8YW5pbWF0ZSByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgY2FsY01vZGU9InNwbGluZSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGF0dHJpYnV0ZU5hbWU9InIiIGR1cj0iMXMiIGJlZ2luPS'+
			'IwLjM3NXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuNXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDIyNSAxNiAxNikiIGN5PSIzIiByPSIwIiBj'+
			'eD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuNjI1cyIgdmFsdWVzPSIwOzM7MDswIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuOD'+
			'swLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC43NXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDMxNSAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuODc1cyIgdmFsdWVzPSIwOzM7MDsw'+
			'Ii8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC41cyIgdmFsdWVzPSIwOzM7MDswIi8+CiA8L2NpcmNsZT4KPC9zdmc+Cg==';
		me._loading_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_image";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._image_popup.appendChild(me._loading_image);
		el=me._popup_image=document.createElement('div');
		els=me._popup_image__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._popup_image.ggUpdatePosition();}
		el.ggText=basePath + "";
		els.setAttribute('src', el.ggText);
		els['ondragstart']=function() { return false; };
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="popup_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_image.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._popup_image.clientWidth;
			var parentHeight = me._popup_image.clientHeight;
			var img = me._popup_image__img;
			var aspectRatioDiv = me._popup_image.clientWidth / me._popup_image.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
				img.style.width='';
				img.style.height=parentHeight + 'px';
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
				img.style.width=parentWidth + 'px';
				img.style.height='';
			};
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._image_popup.appendChild(me._popup_image);
		me.divSkin.appendChild(me._image_popup);
		el=me._video_popup_file=document.createElement('div');
		el.ggId="video_popup_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : 10%;';
		hs+='position : absolute;';
		hs+='top : 10%;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_file.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_file.ggUpdatePosition=function (useTransition) {
		}
		el=me._loading_video_file=document.createElement('div');
		els=me._loading_video_file__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSI2NCI+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKD'+
			'Q1IDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC4xMjVzIiB2YWx1ZXM9IjA7MzswOzAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSg5MCAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlT'+
			'cGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuMjVzIiB2YWx1ZXM9IjA7MzswOzAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgxMzUgMTYgMTYpIiBjeT0iMyIgcj0iMCIgY3g9IjE2Ij4KICA8YW5pbWF0ZSByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgY2FsY01vZGU9InNwbGluZSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGF0dHJpYnV0ZU5hbWU9InIiIGR1cj0iMXMiIGJlZ2luPS'+
			'IwLjM3NXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuNXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDIyNSAxNiAxNikiIGN5PSIzIiByPSIwIiBj'+
			'eD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuNjI1cyIgdmFsdWVzPSIwOzM7MDswIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuOD'+
			'swLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC43NXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDMxNSAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuODc1cyIgdmFsdWVzPSIwOzM7MDsw'+
			'Ii8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC41cyIgdmFsdWVzPSIwOzM7MDswIi8+CiA8L2NpcmNsZT4KPC9zdmc+Cg==';
		me._loading_video_file__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_video_file";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_video_file.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_video_file.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_popup_file.appendChild(me._loading_video_file);
		el=me._popup_video_file=document.createElement('div');
		me._popup_video_file.seekbars = [];
		me._popup_video_file.seekbars.push('seekbar_file');
		me._popup_video_file.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._popup_video_file.seekbars.length; i++) {
					var seekbar = me.findElements(me._popup_video_file.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._popup_video_file.hasChildNodes()) {
				me._popup_video_file.removeChild(me._popup_video_file.lastChild);
			}
			if (me._popup_video_file__vid) {
				me._popup_video_file__vid.pause();
			}
			if(media == '') {
				notifySeekbars();
			if (me._popup_video_file.ggVideoNotLoaded ==false && me._popup_video_file.ggDeactivate) { me._popup_video_file.ggDeactivate(); }
				me._popup_video_file.ggVideoNotLoaded = true;
			var mediaObj = player.getMediaObject('popup_video_file');
			if (mediaObj) {
				mediaObj.autoplay = false;
			}
				return;
			}
			me._popup_video_file.ggVideoNotLoaded = false;
			me._popup_video_file__vid=document.createElement('video');
			me._popup_video_file__vid.className='ggskin ggskin_video';
			me._popup_video_file__vid.setAttribute('width', '100%');
			me._popup_video_file__vid.setAttribute('height', '100%');
			me._popup_video_file__vid.setAttribute('controlsList', 'nodownload');
			me._popup_video_file__vid.setAttribute('oncontextmenu', 'return false;');
			me._popup_video_file__vid.setAttribute('autoplay', '');
			me._popup_video_file__source=document.createElement('source');
			me._popup_video_file__source.setAttribute('src', media);
			me._popup_video_file__vid.setAttribute('playsinline', 'playsinline');
			me._popup_video_file__vid.setAttribute('style', ';');
			me._popup_video_file__vid.style.outline = 'none';
			me._popup_video_file__vid.appendChild(me._popup_video_file__source);
			me._popup_video_file.appendChild(me._popup_video_file__vid);
			var videoEl = player.registerVideoElement('popup_video_file', me._popup_video_file__vid);
			videoEl.autoplay = true;
			notifySeekbars();
			me._popup_video_file.ggVideoSource = media;
		}
		el.ggId="popup_video_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_video_file.ggIsActive=function() {
			if (me._popup_video_file__vid != null) {
				return (me._popup_video_file__vid.paused == false && me._popup_video_file__vid.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_video_file.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_file.appendChild(me._popup_video_file);
		me.divSkin.appendChild(me._video_popup_file);
		el=me._video_popup_controls_file=document.createElement('div');
		el.ggId="video_popup_controls_file";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 6px;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 284px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_controls_file.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_controls_file.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._seekbar_file=document.createElement('div');
		me._seekbar_file__playhead=document.createElement('div');
		me._seekbar_file.mediaEl = null;
		me._seekbar_file.fromBufferSource = false;
		el.ggId="seekbar_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_seekbar ";
		el.ggType='seekbar';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 13px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 248px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._seekbar_file.connectToMediaEl = function() {
			var disableSeekbar = function() {
				me._seekbar_file__playhead.style.visibility = 'hidden';
				me._seekbar_file.style.background = '#000000';
				me._seekbar_file.ggConnected = false;
			}
			if (me._seekbar_file.mediaEl != null) {
				if (me._seekbar_file.fromBufferSource) {
					player.removeEventListener('bufferSoundTimeupdate', me._seekbar_file.updatePlayback);
					if (me._seekbar_file.ggActivate) {
						player.removeEventListener('bufferSoundPlay', me._seekbar_file.bufferSoundActivate);
					}
					if (me._seekbar_file.ggDeactivate) {
						player.removeEventListener('bufferSoundPause', me._seekbar_file.bufferSoundDeactivate);
						player.removeEventListener('bufferSoundStop', me._seekbar_file.bufferSoundDeactivate);
						player.removeEventListener('bufferSoundEnded', me._seekbar_file.bufferSoundDeactivate);
					}
					if (me._seekbar_file.ggMediaEnded) {
						player.removeEventListener('bufferSoundEnded', me._seekbar_file.bufferSoundMediaEnded);
					}
				} else {
					me._seekbar_file.mediaEl.removeEventListener('progress', me._seekbar_file.updatePlayback);
					me._seekbar_file.mediaEl.removeEventListener('canplay', me._seekbar_file.updatePlayback);
					me._seekbar_file.mediaEl.removeEventListener('timeupdate', me._seekbar_file.updatePlayback);
					if (me._seekbar_file.ggActivate) {
						me._seekbar_file.mediaEl.removeEventListener('play', me._seekbar_file.ggActivate);
					}
					if (me._seekbar_file.ggDeactivate) {
						me._seekbar_file.mediaEl.removeEventListener('ended', me._seekbar_file.ggDeactivate);
						me._seekbar_file.mediaEl.removeEventListener('pause', me._seekbar_file.ggDeactivate);
					}
					if (me._seekbar_file.ggMediaEnded) {
						me._seekbar_file.mediaEl.removeEventListener('ended', me._seekbar_file.ggMediaEnded);
					}
				}
			}
			me._seekbar_file.mediaEl = player.getMediaObject('popup_video_file');
			if (me._seekbar_file.mediaEl) {
				me._seekbar_file.fromBufferSource = false;
			} else {
				me._seekbar_file.mediaEl = player.getMediaBufferSourceObject('popup_video_file');
				me._seekbar_file.fromBufferSource = true;
			}
			if (me._seekbar_file.mediaEl != null) {
				me._seekbar_file__playhead.style.visibility = 'inherit';
				me._seekbar_file__playhead.style.left = '1px';
				if (me._seekbar_file.fromBufferSource) {
					player.addListener('bufferSoundTimeupdate', me._seekbar_file.updatePlayback);
					if (me._seekbar_file.ggActivate) {
						me._seekbar_file.bufferSoundActivate = function(args) { if (args['id'] == me._seekbar_file.mediaEl.id) me._seekbar_file.ggActivate(); };
						player.addListener('bufferSoundPlay', me._seekbar_file.bufferSoundActivate);
					}
					if (me._seekbar_file.ggDeactivate) {
						me._seekbar_file.bufferSoundDeactivate = function(args) { if (args['id'] == me._seekbar_file.mediaEl.id) me._seekbar_file.ggDeactivate(); };
						player.addListener('bufferSoundPause', me._seekbar_file.bufferSoundDeactivate);
						player.addListener('bufferSoundStop', me._seekbar_file.bufferSoundDeactivate);
						player.addListener('bufferSoundEnded', me._seekbar_file.bufferSoundDeactivate);
					}
					if (me._seekbar_file.ggMediaEnded) {
						me._seekbar_file.bufferSoundMediaEnded = function(args) { if (args['id'] == me._seekbar_file.mediaEl.id) me._seekbar_file.ggMediaEnded(); };
						player.addListener('bufferSoundEnded', me._seekbar_file.bufferSoundMediaEnded);
					}
				} else {
					me._seekbar_file.mediaEl.addEventListener('progress', me._seekbar_file.updatePlayback);
					me._seekbar_file.mediaEl.addEventListener('canplay', me._seekbar_file.updatePlayback);
					me._seekbar_file.mediaEl.addEventListener('timeupdate', me._seekbar_file.updatePlayback);
					if (me._seekbar_file.ggActivate) {
						me._seekbar_file.mediaEl.addEventListener('play', me._seekbar_file.ggActivate);
					}
					if (me._seekbar_file.ggDeactivate) {
						me._seekbar_file.mediaEl.addEventListener('ended', me._seekbar_file.ggDeactivate);
						me._seekbar_file.mediaEl.addEventListener('pause', me._seekbar_file.ggDeactivate);
					}
					if (me._seekbar_file.ggMediaEnded) {
						me._seekbar_file.mediaEl.addEventListener('ended', me._seekbar_file.ggMediaEnded);
					}
				}
				me._seekbar_file.ggConnected = true;
			} else {
				disableSeekbar();
			}
			var videoEl = me.findElements('popup_video_file');
			if (videoEl.length > 0 && !videoEl[0].hasChildNodes()) {
				disableSeekbar();
			}
		}
		me._seekbar_file.updatePlayback = function(args) {
			if (!me._seekbar_file.ggConnected) return;
			if (me._seekbar_file.mediaEl != null) {
				if (me._seekbar_file.mediaEl.readyState || (me._seekbar_file.fromBufferSource && args && args['id'] == me._seekbar_file.mediaEl.id)) {
					if (me._seekbar_file.fromBufferSource) {
						var percent = me._seekbar_file.mediaEl.bufferSoundCurrentTime() / me._seekbar_file.mediaEl.bufferSoundDuration();
					} else {
						var percent = me._seekbar_file.mediaEl.currentTime / me._seekbar_file.mediaEl.duration;
					}
					percent = Math.min(percent, 1.0);
					var playheadpos = Math.round((me._seekbar_file.clientWidth - 2 * 8 + 2) * percent);
					playheadpos += 1;
					me._seekbar_file__playhead.style.left = playheadpos.toString() + 'px';
					var offsetPercent = Math.round(100.0 * (8 / me._seekbar_file.clientWidth));
					var currPos = offsetPercent + Math.round(percent * (100 - 2 * offsetPercent));
					var gradientString ='linear-gradient(90deg, #808080 0%, #808080 ' + currPos + '%';
					if (me._seekbar_file.fromBufferSource) {
						gradientString += ', #c0c0c0 ' + currPos +'%, #c0c0c0 100%';
					} else {
						for (var i = 0; i < me._seekbar_file.mediaEl.buffered.length; i++) {
							var rangeStart = Math.round((me._seekbar_file.mediaEl.buffered.start(i) / me._seekbar_file.mediaEl.duration) * 100.0);
							var rangeEnd = Math.ceil((me._seekbar_file.mediaEl.buffered.end(i) / me._seekbar_file.mediaEl.duration) * 100.0);
							if (rangeEnd > currPos) {
								if (rangeStart < currPos) {
									gradientString += ', #c0c0c0 ' + currPos + '%';
								} else {
									gradientString += ', #000000 ' + currPos + '%, #000000 ' + rangeStart + '%';
									gradientString += ', #c0c0c0 ' + rangeStart + '%';
								}
									gradientString += ', #c0c0c0 ' + rangeEnd + '%';
								currPos = rangeEnd;
							}
						}
						if (currPos < 100) {
							gradientString += ', #000000 ' + currPos + '%';
						}
					}
					gradientString += ')';
					me._seekbar_file.style.background = gradientString;
				}
			}
		}
		me._seekbar_file.appendChild(me._seekbar_file__playhead);
		hs+='background: #000000;';
		hs+='border: 2px solid #000000;';
		hs+='border-radius: 8px;';
		hs+=cssPrefix + 'border-radius: 8px;';
		var hs_playhead = 'height: 13px;';
		hs_playhead += 'width: 13px;';
		hs_playhead += 'border: 0px;';
		hs_playhead += 'position: absolute;';
		hs_playhead += 'left: 1px;';
		hs_playhead += 'top: 0px;';
		hs_playhead += 'border-radius: 7;';
		hs_playhead += cssPrefix + 'border-radius: 7px;';
		hs_playhead += 'background-color: rgba(255,255,255,1);';
		hs_playhead += 'pointer-events: none;';
		me._seekbar_file.setAttribute('style', hs);
		me._seekbar_file__playhead.setAttribute('style', hs_playhead);
		me._seekbar_file.ggIsActive=function() {
			if (me._seekbar_file.mediaEl != null) {
				return (me._seekbar_file.mediaEl.paused == false && me._seekbar_file.mediaEl.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._seekbar_file.onmousedown=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend' || e.type == 'mouseup') {
				if (me._seekbar_file.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					if (me._seekbar_file.fromBufferSource) {
						var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.bufferSoundDuration();
						if (e.type == 'mousemove' || e.type == 'mousedown') {
							me._seekbar_file.mediaEl.bufferSoundSetDragTime(seekpos);
						} else {
							me._seekbar_file.mediaEl.bufferSoundSetTime(seekpos);
						}
					} else {
						var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.duration;
						me._seekbar_file.mediaEl.currentTime = seekpos;
					}
				}
			}
		}
		me._seekbar_file.onmouseup=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend' || e.type == 'mouseup') {
				if (me._seekbar_file.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					if (me._seekbar_file.fromBufferSource) {
						var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.bufferSoundDuration();
						if (e.type == 'mousemove' || e.type == 'mousedown') {
							me._seekbar_file.mediaEl.bufferSoundSetDragTime(seekpos);
						} else {
							me._seekbar_file.mediaEl.bufferSoundSetTime(seekpos);
						}
					} else {
						var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.duration;
						me._seekbar_file.mediaEl.currentTime = seekpos;
					}
				}
			}
		}
		me._seekbar_file.onmousemove=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend' || e.type == 'mouseup') {
				if (me._seekbar_file.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					if (me._seekbar_file.fromBufferSource) {
						var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.bufferSoundDuration();
						if (e.type == 'mousemove' || e.type == 'mousedown') {
							me._seekbar_file.mediaEl.bufferSoundSetDragTime(seekpos);
						} else {
							me._seekbar_file.mediaEl.bufferSoundSetTime(seekpos);
						}
					} else {
						var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.duration;
						me._seekbar_file.mediaEl.currentTime = seekpos;
					}
				}
			}
		}
		me._seekbar_file.ontouchend=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend' || e.type == 'mouseup') {
				if (me._seekbar_file.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					if (me._seekbar_file.fromBufferSource) {
						var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.bufferSoundDuration();
						if (e.type == 'mousemove' || e.type == 'mousedown') {
							me._seekbar_file.mediaEl.bufferSoundSetDragTime(seekpos);
						} else {
							me._seekbar_file.mediaEl.bufferSoundSetTime(seekpos);
						}
					} else {
						var seekpos = (eventXPos / me._seekbar_file.clientWidth) * me._seekbar_file.mediaEl.duration;
						me._seekbar_file.mediaEl.currentTime = seekpos;
					}
				}
			}
		}
		me._seekbar_file.ggActivate=function () {
			me._ht_video_pause_file.style[domTransition]='none';
			me._ht_video_pause_file.style.visibility=(Number(me._ht_video_pause_file.style.opacity)>0||!me._ht_video_pause_file.style.opacity)?'inherit':'hidden';
			me._ht_video_pause_file.ggVisible=true;
			me._ht_video_play_file.style[domTransition]='none';
			me._ht_video_play_file.style.visibility='hidden';
			me._ht_video_play_file.ggVisible=false;
		}
		me._seekbar_file.ggDeactivate=function () {
			me._ht_video_play_file.style[domTransition]='none';
			me._ht_video_play_file.style.visibility=(Number(me._ht_video_play_file.style.opacity)>0||!me._ht_video_play_file.style.opacity)?'inherit':'hidden';
			me._ht_video_play_file.ggVisible=true;
			me._ht_video_pause_file.style[domTransition]='none';
			me._ht_video_pause_file.style.visibility='hidden';
			me._ht_video_pause_file.ggVisible=false;
		}
		me._seekbar_file.ggUpdatePosition=function (useTransition) {
			me._seekbar_file.updatePlayback();
		}
		me._seekbar_file.ggNodeChange=function () {
			me._seekbar_file.connectToMediaEl();
		}
		me._video_popup_controls_file.appendChild(me._seekbar_file);
		el=me._ht_video_play_file=document.createElement('div');
		els=me._ht_video_play_file__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2LjEtNTYuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTguOSwzNjYtMTQ0LDM0MC45LTE3NSwzNDAuOXogTS0xNTAuNSwzOTguNmwtMzguMSwyNi42Yy0xLjMsMC45LTIuMywwLjMtMi4zLTEuMlYzNzBjMC0xLjUsMS0yLjEsMi4zLTEuMmwzOC4yLDI2LjYmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTQ5LjMsMzk2LjMtMTQ5LjMsMzk3LjctMTUwLjUsMzk4LjZ6IiBmaWxsPSIjMDAwMDAwIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJf'+
			'MiI+CiAgPHBhdGggZD0iTS0xOTEsMzcwYzAtMS41LDEtMi4xLDIuMy0xLjJsMzguMiwyNi42YzEuMywwLjksMS4zLDIuMywwLDMuMmwtMzguMiwyNi42Yy0xLjMsMC45LTIuMywwLjMtMi4zLTEuMlYzNzB6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_video_play_file__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_play_file__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjQmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTEyLjYsMzYyLjYtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTE0Ny44LDM5OC44bC00Mi40LDI5LjZjLTEuNCwxLTIuNiwwLjQtMi42LTEuM1YzNjdjMC0xLjcsMS4yLTIuMywyLjYtMS4zbDQyLjQsMjkuNiYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xNDYuNCwzOTYuMi0xNDYuNCwzOTcuOC0xNDcuOCwzOTguOHoiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlk'+
			'PSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE5Mi44LDM2N2MwLTEuNywxLjItMi4zLDIuNi0xLjNsNDIuNCwyOS42YzEuNCwxLDEuNCwyLjYsMCwzLjZsLTQyLjQsMjkuNmMtMS40LDEtMi42LDAuNC0yLjYtMS4zVjM2N3oiIGZpbGw9IiNGRkZGRkYiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_video_play_file__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_play_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 259px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_play_file.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_video_play_file.onclick=function (e) {
			if (me._popup_video_file.ggApiPlayer) {
				if (me._popup_video_file.ggApiPlayerType == 'youtube') {
					let youtubeMediaFunction = function() {
						me._popup_video_file.ggApiPlayer.playVideo();
					};
					if (me._popup_video_file.ggApiPlayerReady) {
						youtubeMediaFunction();
					} else {
						let youtubeApiInterval = setInterval(function() {
							if (me._popup_video_file.ggApiPlayerReady) {
								clearInterval(youtubeApiInterval);
								youtubeMediaFunction();
							}
						}, 100);
					}
				} else if (me._popup_video_file.ggApiPlayerType == 'vimeo') {
					me._popup_video_file.ggApiPlayer.play();
				}
			} else {
				player.playSound("popup_video_file","1");
			}
			me._ht_video_play_file.style[domTransition]='none';
			me._ht_video_play_file.style.visibility='hidden';
			me._ht_video_play_file.ggVisible=false;
			me._ht_video_pause_file.style[domTransition]='none';
			me._ht_video_pause_file.style.visibility=(Number(me._ht_video_pause_file.style.opacity)>0||!me._ht_video_pause_file.style.opacity)?'inherit':'hidden';
			me._ht_video_pause_file.ggVisible=true;
		}
		me._ht_video_play_file.onmouseover=function (e) {
			me._ht_video_play_file__img.style.visibility='hidden';
			me._ht_video_play_file__imgo.style.visibility='inherit';
		}
		me._ht_video_play_file.onmouseout=function (e) {
			me._ht_video_play_file__img.style.visibility='inherit';
			me._ht_video_play_file__imgo.style.visibility='hidden';
		}
		me._ht_video_play_file.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_controls_file.appendChild(me._ht_video_play_file);
		el=me._ht_video_pause_file=document.createElement('div');
		els=me._ht_video_pause_file__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2LjEtNTYuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTguOSwzNjYtMTQ0LDM0MC45LTE3NSwzNDAuOXogTS0xNzcuNyw0MTYuM2MwLDEuMy0xLDIuMy0yLjMsMi4zaC0xNC4zYy0xLjMsMC0yLjMtMS0yLjMtMi4zdi0zOC42YzAtMS4zLDEtMi4zLDIuMy0yLjNoMTQuMyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuMywwLDIuMywxLDIuMywyLjNDLTE3Ny43LDM3Ny43LTE3Ny43LDQxNi4zLTE3Ny43LDQxNi4zeiBNLTE1My40LDQx'+
			'Ni4zYzAsMS4zLTEsMi4zLTIuMywyLjNILTE3MGMtMS4zLDAtMi4zLTEtMi4zLTIuM3YtMzguNiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMS4zLDEtMi4zLDIuMy0yLjNoMTQuM2MxLjMsMCwyLjMsMSwyLjMsMi4zQy0xNTMuNCwzNzcuNy0xNTMuNCw0MTYuMy0xNTMuNCw0MTYuM3oiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xODAsMzc1LjRoLTE0LjNjLTEuMywwLTIuMywxLTIuMywyLjN2MzguNmMwLDEuMywxLDIuMywyLjMsMi4zaDE0LjNjMS4zLDAsMi4zLTEsMi4zLTIuM3YtMzguNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OT'+
			'tDLTE3Ny43LDM3Ni40LTE3OC43LDM3NS40LTE4MCwzNzUuNHoiIGZpbGw9IiNGRkZGRkYiLz4KICAgPHBhdGggZD0iTS0xNTUuNywzNzUuNEgtMTcwYy0xLjMsMC0yLjMsMS0yLjMsMi4zdjM4LjZjMCwxLjMsMSwyLjMsMi4zLDIuM2gxNC4zYzEuMywwLDIuMy0xLDIuMy0yLjN2LTM4LjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xNTMuNCwzNzYuNC0xNTQuNCwzNzUuNC0xNTUuNywzNzUuNHoiIGZpbGw9IiNGRkZGRkYiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_video_pause_file__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_pause_file__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjQmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTEyLjYsMzYyLjYtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTE3OCw0MTguNGMwLDEuNC0xLjEsMi42LTIuNiwyLjZoLTE1LjljLTEuNCwwLTIuNi0xLjEtMi42LTIuNnYtNDIuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMS40LDEuMS0yLjYsMi42LTIuNmgxNS45YzEuNCwwLDIuNiwxLjEsMi42LDIuNkMtMTc4LDM3NS41LTE3OCw0MTguNC0xNzgsNDE4LjR6IE0t'+
			'MTUxLDQxOC40YzAsMS40LTEuMSwyLjYtMi42LDIuNmgtMTUuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0xLjQsMC0yLjYtMS4xLTIuNi0yLjZ2LTQyLjljMC0xLjQsMS4xLTIuNiwyLjYtMi42aDE1LjljMS40LDAsMi42LDEuMSwyLjYsMi42Qy0xNTEsMzc1LjUtMTUxLDQxOC40LTE1MSw0MTguNHoiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xODAuNSwzNzNoLTE1LjljLTEuNCwwLTIuNiwxLjEtMi42LDIuNnY0Mi45YzAsMS40LDEuMSwyLjYsMi42LDIuNmgxNS45YzEuNCwwLDIuNi0xLjEsMi42LTIuNnYtNDIuOSYjeGQ7JiN4YT'+
			'smI3g5OyYjeDk7JiN4OTtDLTE3OCwzNzQuMS0xNzkuMSwzNzMtMTgwLjUsMzczeiIgZmlsbD0iI0ZGRkZGRiIvPgogICA8cGF0aCBkPSJNLTE1My41LDM3M2gtMTUuOWMtMS40LDAtMi42LDEuMS0yLjYsMi42djQyLjljMCwxLjQsMS4xLDIuNiwyLjYsMi42aDE1LjljMS40LDAsMi42LTEuMSwyLjYtMi42di00Mi45JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTUxLDM3NC4xLTE1Mi4xLDM3My0xNTMuNSwzNzN6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._ht_video_pause_file__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_pause_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 259px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_pause_file.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_video_pause_file.onclick=function (e) {
			if (me._popup_video_file.ggApiPlayer) {
				if (me._popup_video_file.ggApiPlayerType == 'youtube') {
					let youtubeMediaFunction = function() {
						me._popup_video_file.ggApiPlayer.pauseVideo();
					};
					if (me._popup_video_file.ggApiPlayerReady) {
						youtubeMediaFunction();
					} else {
						let youtubeApiInterval = setInterval(function() {
							if (me._popup_video_file.ggApiPlayerReady) {
								clearInterval(youtubeApiInterval);
								youtubeMediaFunction();
							}
						}, 100);
					}
				} else if (me._popup_video_file.ggApiPlayerType == 'vimeo') {
					me._popup_video_file.ggApiPlayer.pause();
				}
			} else {
				player.pauseSound("popup_video_file");
			}
			me._ht_video_pause_file.style[domTransition]='none';
			me._ht_video_pause_file.style.visibility='hidden';
			me._ht_video_pause_file.ggVisible=false;
			me._ht_video_play_file.style[domTransition]='none';
			me._ht_video_play_file.style.visibility=(Number(me._ht_video_play_file.style.opacity)>0||!me._ht_video_play_file.style.opacity)?'inherit':'hidden';
			me._ht_video_play_file.ggVisible=true;
		}
		me._ht_video_pause_file.onmouseover=function (e) {
			me._ht_video_pause_file__img.style.visibility='hidden';
			me._ht_video_pause_file__imgo.style.visibility='inherit';
		}
		me._ht_video_pause_file.onmouseout=function (e) {
			me._ht_video_pause_file__img.style.visibility='inherit';
			me._ht_video_pause_file__imgo.style.visibility='hidden';
		}
		me._ht_video_pause_file.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_controls_file.appendChild(me._ht_video_pause_file);
		me.divSkin.appendChild(me._video_popup_controls_file);
		el=me._video_popup_url=document.createElement('div');
		el.ggId="video_popup_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : 10%;';
		hs+='position : absolute;';
		hs+='top : 10%;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_url.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_url.ggUpdatePosition=function (useTransition) {
		}
		el=me._loading_video_url=document.createElement('div');
		els=me._loading_video_url__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSI2NCI+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKD'+
			'Q1IDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC4xMjVzIiB2YWx1ZXM9IjA7MzswOzAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSg5MCAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlT'+
			'cGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuMjVzIiB2YWx1ZXM9IjA7MzswOzAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgxMzUgMTYgMTYpIiBjeT0iMyIgcj0iMCIgY3g9IjE2Ij4KICA8YW5pbWF0ZSByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgY2FsY01vZGU9InNwbGluZSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGF0dHJpYnV0ZU5hbWU9InIiIGR1cj0iMXMiIGJlZ2luPS'+
			'IwLjM3NXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuNXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDIyNSAxNiAxNikiIGN5PSIzIiByPSIwIiBj'+
			'eD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuNjI1cyIgdmFsdWVzPSIwOzM7MDswIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuOD'+
			'swLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC43NXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDMxNSAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuODc1cyIgdmFsdWVzPSIwOzM7MDsw'+
			'Ii8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC41cyIgdmFsdWVzPSIwOzM7MDswIi8+CiA8L2NpcmNsZT4KPC9zdmc+Cg==';
		me._loading_video_url__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_video_url";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_video_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_video_url.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_popup_url.appendChild(me._loading_video_url);
		el=me._popup_video_url=document.createElement('div');
		me._popup_video_url.seekbars = [];
		me._popup_video_url.seekbars.push('seekbar_url');
		me._popup_video_url.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._popup_video_url.seekbars.length; i++) {
					var seekbar = me.findElements(me._popup_video_url.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._popup_video_url.hasChildNodes()) {
				me._popup_video_url.removeChild(me._popup_video_url.lastChild);
			}
			if (me._popup_video_url__vid) {
				me._popup_video_url__vid.pause();
			}
			if(media == '') {
				notifySeekbars();
			if (me._popup_video_url.ggVideoNotLoaded ==false && me._popup_video_url.ggDeactivate) { me._popup_video_url.ggDeactivate(); }
				me._popup_video_url.ggVideoNotLoaded = true;
			var mediaObj = player.getMediaObject('popup_video_url');
			if (mediaObj) {
				mediaObj.autoplay = false;
			}
				return;
			}
			me._popup_video_url.ggVideoNotLoaded = false;
			me._popup_video_url__vid=document.createElement('video');
			me._popup_video_url__vid.className='ggskin ggskin_video';
			me._popup_video_url__vid.setAttribute('width', '100%');
			me._popup_video_url__vid.setAttribute('height', '100%');
			me._popup_video_url__vid.setAttribute('controlsList', 'nodownload');
			me._popup_video_url__vid.setAttribute('oncontextmenu', 'return false;');
			me._popup_video_url__vid.setAttribute('autoplay', '');
			me._popup_video_url__source=document.createElement('source');
			me._popup_video_url__source.setAttribute('src', media);
			me._popup_video_url__vid.setAttribute('playsinline', 'playsinline');
			me._popup_video_url__vid.setAttribute('style', ';');
			me._popup_video_url__vid.style.outline = 'none';
			me._popup_video_url__vid.appendChild(me._popup_video_url__source);
			me._popup_video_url.appendChild(me._popup_video_url__vid);
			var videoEl = player.registerVideoElement('popup_video_url', me._popup_video_url__vid);
			videoEl.autoplay = true;
			notifySeekbars();
			me._popup_video_url.ggVideoSource = media;
		}
		el.ggId="popup_video_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_video_url.ggIsActive=function() {
			if (me._popup_video_url__vid != null) {
				return (me._popup_video_url__vid.paused == false && me._popup_video_url__vid.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_video_url.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_url.appendChild(me._popup_video_url);
		me.divSkin.appendChild(me._video_popup_url);
		el=me._video_popup_controls_url=document.createElement('div');
		el.ggId="video_popup_controls_url";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 6px;';
		hs+='height : 25px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 284px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_controls_url.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_controls_url.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._seekbar_url=document.createElement('div');
		me._seekbar_url__playhead=document.createElement('div');
		me._seekbar_url.mediaEl = null;
		me._seekbar_url.fromBufferSource = false;
		el.ggId="seekbar_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_seekbar ";
		el.ggType='seekbar';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 13px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 248px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._seekbar_url.connectToMediaEl = function() {
			var disableSeekbar = function() {
				me._seekbar_url__playhead.style.visibility = 'hidden';
				me._seekbar_url.style.background = '#000000';
				me._seekbar_url.ggConnected = false;
			}
			if (me._seekbar_url.mediaEl != null) {
				if (me._seekbar_url.fromBufferSource) {
					player.removeEventListener('bufferSoundTimeupdate', me._seekbar_url.updatePlayback);
					if (me._seekbar_url.ggActivate) {
						player.removeEventListener('bufferSoundPlay', me._seekbar_url.bufferSoundActivate);
					}
					if (me._seekbar_url.ggDeactivate) {
						player.removeEventListener('bufferSoundPause', me._seekbar_url.bufferSoundDeactivate);
						player.removeEventListener('bufferSoundStop', me._seekbar_url.bufferSoundDeactivate);
						player.removeEventListener('bufferSoundEnded', me._seekbar_url.bufferSoundDeactivate);
					}
					if (me._seekbar_url.ggMediaEnded) {
						player.removeEventListener('bufferSoundEnded', me._seekbar_url.bufferSoundMediaEnded);
					}
				} else {
					me._seekbar_url.mediaEl.removeEventListener('progress', me._seekbar_url.updatePlayback);
					me._seekbar_url.mediaEl.removeEventListener('canplay', me._seekbar_url.updatePlayback);
					me._seekbar_url.mediaEl.removeEventListener('timeupdate', me._seekbar_url.updatePlayback);
					if (me._seekbar_url.ggActivate) {
						me._seekbar_url.mediaEl.removeEventListener('play', me._seekbar_url.ggActivate);
					}
					if (me._seekbar_url.ggDeactivate) {
						me._seekbar_url.mediaEl.removeEventListener('ended', me._seekbar_url.ggDeactivate);
						me._seekbar_url.mediaEl.removeEventListener('pause', me._seekbar_url.ggDeactivate);
					}
					if (me._seekbar_url.ggMediaEnded) {
						me._seekbar_url.mediaEl.removeEventListener('ended', me._seekbar_url.ggMediaEnded);
					}
				}
			}
			me._seekbar_url.mediaEl = player.getMediaObject('popup_video_url');
			if (me._seekbar_url.mediaEl) {
				me._seekbar_url.fromBufferSource = false;
			} else {
				me._seekbar_url.mediaEl = player.getMediaBufferSourceObject('popup_video_url');
				me._seekbar_url.fromBufferSource = true;
			}
			if (me._seekbar_url.mediaEl != null) {
				me._seekbar_url__playhead.style.visibility = 'inherit';
				me._seekbar_url__playhead.style.left = '1px';
				if (me._seekbar_url.fromBufferSource) {
					player.addListener('bufferSoundTimeupdate', me._seekbar_url.updatePlayback);
					if (me._seekbar_url.ggActivate) {
						me._seekbar_url.bufferSoundActivate = function(args) { if (args['id'] == me._seekbar_url.mediaEl.id) me._seekbar_url.ggActivate(); };
						player.addListener('bufferSoundPlay', me._seekbar_url.bufferSoundActivate);
					}
					if (me._seekbar_url.ggDeactivate) {
						me._seekbar_url.bufferSoundDeactivate = function(args) { if (args['id'] == me._seekbar_url.mediaEl.id) me._seekbar_url.ggDeactivate(); };
						player.addListener('bufferSoundPause', me._seekbar_url.bufferSoundDeactivate);
						player.addListener('bufferSoundStop', me._seekbar_url.bufferSoundDeactivate);
						player.addListener('bufferSoundEnded', me._seekbar_url.bufferSoundDeactivate);
					}
					if (me._seekbar_url.ggMediaEnded) {
						me._seekbar_url.bufferSoundMediaEnded = function(args) { if (args['id'] == me._seekbar_url.mediaEl.id) me._seekbar_url.ggMediaEnded(); };
						player.addListener('bufferSoundEnded', me._seekbar_url.bufferSoundMediaEnded);
					}
				} else {
					me._seekbar_url.mediaEl.addEventListener('progress', me._seekbar_url.updatePlayback);
					me._seekbar_url.mediaEl.addEventListener('canplay', me._seekbar_url.updatePlayback);
					me._seekbar_url.mediaEl.addEventListener('timeupdate', me._seekbar_url.updatePlayback);
					if (me._seekbar_url.ggActivate) {
						me._seekbar_url.mediaEl.addEventListener('play', me._seekbar_url.ggActivate);
					}
					if (me._seekbar_url.ggDeactivate) {
						me._seekbar_url.mediaEl.addEventListener('ended', me._seekbar_url.ggDeactivate);
						me._seekbar_url.mediaEl.addEventListener('pause', me._seekbar_url.ggDeactivate);
					}
					if (me._seekbar_url.ggMediaEnded) {
						me._seekbar_url.mediaEl.addEventListener('ended', me._seekbar_url.ggMediaEnded);
					}
				}
				me._seekbar_url.ggConnected = true;
			} else {
				disableSeekbar();
			}
			var videoEl = me.findElements('popup_video_url');
			if (videoEl.length > 0 && !videoEl[0].hasChildNodes()) {
				disableSeekbar();
			}
		}
		me._seekbar_url.updatePlayback = function(args) {
			if (!me._seekbar_url.ggConnected) return;
			if (me._seekbar_url.mediaEl != null) {
				if (me._seekbar_url.mediaEl.readyState || (me._seekbar_url.fromBufferSource && args && args['id'] == me._seekbar_url.mediaEl.id)) {
					if (me._seekbar_url.fromBufferSource) {
						var percent = me._seekbar_url.mediaEl.bufferSoundCurrentTime() / me._seekbar_url.mediaEl.bufferSoundDuration();
					} else {
						var percent = me._seekbar_url.mediaEl.currentTime / me._seekbar_url.mediaEl.duration;
					}
					percent = Math.min(percent, 1.0);
					var playheadpos = Math.round((me._seekbar_url.clientWidth - 2 * 8 + 2) * percent);
					playheadpos += 1;
					me._seekbar_url__playhead.style.left = playheadpos.toString() + 'px';
					var offsetPercent = Math.round(100.0 * (8 / me._seekbar_url.clientWidth));
					var currPos = offsetPercent + Math.round(percent * (100 - 2 * offsetPercent));
					var gradientString ='linear-gradient(90deg, #808080 0%, #808080 ' + currPos + '%';
					if (me._seekbar_url.fromBufferSource) {
						gradientString += ', #c0c0c0 ' + currPos +'%, #c0c0c0 100%';
					} else {
						for (var i = 0; i < me._seekbar_url.mediaEl.buffered.length; i++) {
							var rangeStart = Math.round((me._seekbar_url.mediaEl.buffered.start(i) / me._seekbar_url.mediaEl.duration) * 100.0);
							var rangeEnd = Math.ceil((me._seekbar_url.mediaEl.buffered.end(i) / me._seekbar_url.mediaEl.duration) * 100.0);
							if (rangeEnd > currPos) {
								if (rangeStart < currPos) {
									gradientString += ', #c0c0c0 ' + currPos + '%';
								} else {
									gradientString += ', #000000 ' + currPos + '%, #000000 ' + rangeStart + '%';
									gradientString += ', #c0c0c0 ' + rangeStart + '%';
								}
									gradientString += ', #c0c0c0 ' + rangeEnd + '%';
								currPos = rangeEnd;
							}
						}
						if (currPos < 100) {
							gradientString += ', #000000 ' + currPos + '%';
						}
					}
					gradientString += ')';
					me._seekbar_url.style.background = gradientString;
				}
			}
		}
		me._seekbar_url.appendChild(me._seekbar_url__playhead);
		hs+='background: #000000;';
		hs+='border: 2px solid #000000;';
		hs+='border-radius: 8px;';
		hs+=cssPrefix + 'border-radius: 8px;';
		var hs_playhead = 'height: 13px;';
		hs_playhead += 'width: 13px;';
		hs_playhead += 'border: 0px;';
		hs_playhead += 'position: absolute;';
		hs_playhead += 'left: 1px;';
		hs_playhead += 'top: 0px;';
		hs_playhead += 'border-radius: 7;';
		hs_playhead += cssPrefix + 'border-radius: 7px;';
		hs_playhead += 'background-color: rgba(255,255,255,1);';
		hs_playhead += 'pointer-events: none;';
		me._seekbar_url.setAttribute('style', hs);
		me._seekbar_url__playhead.setAttribute('style', hs_playhead);
		me._seekbar_url.ggIsActive=function() {
			if (me._seekbar_url.mediaEl != null) {
				return (me._seekbar_url.mediaEl.paused == false && me._seekbar_url.mediaEl.ended == false);
			} else {
				return false;
			}
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._seekbar_url.onmousedown=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend' || e.type == 'mouseup') {
				if (me._seekbar_url.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					if (me._seekbar_url.fromBufferSource) {
						var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.bufferSoundDuration();
						if (e.type == 'mousemove' || e.type == 'mousedown') {
							me._seekbar_url.mediaEl.bufferSoundSetDragTime(seekpos);
						} else {
							me._seekbar_url.mediaEl.bufferSoundSetTime(seekpos);
						}
					} else {
						var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.duration;
						me._seekbar_url.mediaEl.currentTime = seekpos;
					}
				}
			}
		}
		me._seekbar_url.onmouseup=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend' || e.type == 'mouseup') {
				if (me._seekbar_url.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					if (me._seekbar_url.fromBufferSource) {
						var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.bufferSoundDuration();
						if (e.type == 'mousemove' || e.type == 'mousedown') {
							me._seekbar_url.mediaEl.bufferSoundSetDragTime(seekpos);
						} else {
							me._seekbar_url.mediaEl.bufferSoundSetTime(seekpos);
						}
					} else {
						var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.duration;
						me._seekbar_url.mediaEl.currentTime = seekpos;
					}
				}
			}
		}
		me._seekbar_url.onmousemove=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend' || e.type == 'mouseup') {
				if (me._seekbar_url.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					if (me._seekbar_url.fromBufferSource) {
						var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.bufferSoundDuration();
						if (e.type == 'mousemove' || e.type == 'mousedown') {
							me._seekbar_url.mediaEl.bufferSoundSetDragTime(seekpos);
						} else {
							me._seekbar_url.mediaEl.bufferSoundSetTime(seekpos);
						}
					} else {
						var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.duration;
						me._seekbar_url.mediaEl.currentTime = seekpos;
					}
				}
			}
		}
		me._seekbar_url.ontouchend=function (e) {
			if (e.buttons == 1 || (e.buttons == null && e.which == 1) || e.type == 'touchend' || e.type == 'mouseup') {
				if (me._seekbar_url.mediaEl != null) {
					var eventXPos;
					if(e.type == 'touchend') eventXPos = e.layerX; else eventXPos = e.offsetX;
					if (me._seekbar_url.fromBufferSource) {
						var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.bufferSoundDuration();
						if (e.type == 'mousemove' || e.type == 'mousedown') {
							me._seekbar_url.mediaEl.bufferSoundSetDragTime(seekpos);
						} else {
							me._seekbar_url.mediaEl.bufferSoundSetTime(seekpos);
						}
					} else {
						var seekpos = (eventXPos / me._seekbar_url.clientWidth) * me._seekbar_url.mediaEl.duration;
						me._seekbar_url.mediaEl.currentTime = seekpos;
					}
				}
			}
		}
		me._seekbar_url.ggActivate=function () {
			me._ht_video_pause_url.style[domTransition]='none';
			me._ht_video_pause_url.style.visibility=(Number(me._ht_video_pause_url.style.opacity)>0||!me._ht_video_pause_url.style.opacity)?'inherit':'hidden';
			me._ht_video_pause_url.ggVisible=true;
			me._ht_video_play_url.style[domTransition]='none';
			me._ht_video_play_url.style.visibility='hidden';
			me._ht_video_play_url.ggVisible=false;
		}
		me._seekbar_url.ggDeactivate=function () {
			me._ht_video_play_url.style[domTransition]='none';
			me._ht_video_play_url.style.visibility=(Number(me._ht_video_play_url.style.opacity)>0||!me._ht_video_play_url.style.opacity)?'inherit':'hidden';
			me._ht_video_play_url.ggVisible=true;
			me._ht_video_pause_url.style[domTransition]='none';
			me._ht_video_pause_url.style.visibility='hidden';
			me._ht_video_pause_url.ggVisible=false;
		}
		me._seekbar_url.ggUpdatePosition=function (useTransition) {
			me._seekbar_url.updatePlayback();
		}
		me._seekbar_url.ggNodeChange=function () {
			me._seekbar_url.connectToMediaEl();
		}
		me._video_popup_controls_url.appendChild(me._seekbar_url);
		el=me._ht_video_play_url=document.createElement('div');
		els=me._ht_video_play_url__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2LjEtNTYuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTguOSwzNjYtMTQ0LDM0MC45LTE3NSwzNDAuOXogTS0xNTAuNSwzOTguNmwtMzguMSwyNi42Yy0xLjMsMC45LTIuMywwLjMtMi4zLTEuMlYzNzBjMC0xLjUsMS0yLjEsMi4zLTEuMmwzOC4yLDI2LjYmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTQ5LjMsMzk2LjMtMTQ5LjMsMzk3LjctMTUwLjUsMzk4LjZ6IiBmaWxsPSIjMDAwMDAwIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJf'+
			'MiI+CiAgPHBhdGggZD0iTS0xOTEsMzcwYzAtMS41LDEtMi4xLDIuMy0xLjJsMzguMiwyNi42YzEuMywwLjksMS4zLDIuMywwLDMuMmwtMzguMiwyNi42Yy0xLjMsMC45LTIuMywwLjMtMi4zLTEuMlYzNzB6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_video_play_url__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_play_url__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjQmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTEyLjYsMzYyLjYtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTE0Ny44LDM5OC44bC00Mi40LDI5LjZjLTEuNCwxLTIuNiwwLjQtMi42LTEuM1YzNjdjMC0xLjcsMS4yLTIuMywyLjYtMS4zbDQyLjQsMjkuNiYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xNDYuNCwzOTYuMi0xNDYuNCwzOTcuOC0xNDcuOCwzOTguOHoiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlk'+
			'PSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE5Mi44LDM2N2MwLTEuNywxLjItMi4zLDIuNi0xLjNsNDIuNCwyOS42YzEuNCwxLDEuNCwyLjYsMCwzLjZsLTQyLjQsMjkuNmMtMS40LDEtMi42LDAuNC0yLjYtMS4zVjM2N3oiIGZpbGw9IiNGRkZGRkYiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_video_play_url__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_play_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 259px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_play_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_video_play_url.onclick=function (e) {
			if (me._popup_video_url.ggApiPlayer) {
				if (me._popup_video_url.ggApiPlayerType == 'youtube') {
					let youtubeMediaFunction = function() {
						me._popup_video_url.ggApiPlayer.playVideo();
					};
					if (me._popup_video_url.ggApiPlayerReady) {
						youtubeMediaFunction();
					} else {
						let youtubeApiInterval = setInterval(function() {
							if (me._popup_video_url.ggApiPlayerReady) {
								clearInterval(youtubeApiInterval);
								youtubeMediaFunction();
							}
						}, 100);
					}
				} else if (me._popup_video_url.ggApiPlayerType == 'vimeo') {
					me._popup_video_url.ggApiPlayer.play();
				}
			} else {
				player.playSound("popup_video_url","1");
			}
			me._ht_video_play_url.style[domTransition]='none';
			me._ht_video_play_url.style.visibility='hidden';
			me._ht_video_play_url.ggVisible=false;
			me._ht_video_pause_url.style[domTransition]='none';
			me._ht_video_pause_url.style.visibility=(Number(me._ht_video_pause_url.style.opacity)>0||!me._ht_video_pause_url.style.opacity)?'inherit':'hidden';
			me._ht_video_pause_url.ggVisible=true;
		}
		me._ht_video_play_url.onmouseover=function (e) {
			me._ht_video_play_url__img.style.visibility='hidden';
			me._ht_video_play_url__imgo.style.visibility='inherit';
		}
		me._ht_video_play_url.onmouseout=function (e) {
			me._ht_video_play_url__img.style.visibility='inherit';
			me._ht_video_play_url__imgo.style.visibility='hidden';
		}
		me._ht_video_play_url.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_controls_url.appendChild(me._ht_video_play_url);
		el=me._ht_video_pause_url=document.createElement('div');
		els=me._ht_video_pause_url__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMWMwLDMxLDI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2LjEtNTYuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTguOSwzNjYtMTQ0LDM0MC45LTE3NSwzNDAuOXogTS0xNzcuNyw0MTYuM2MwLDEuMy0xLDIuMy0yLjMsMi4zaC0xNC4zYy0xLjMsMC0yLjMtMS0yLjMtMi4zdi0zOC42YzAtMS4zLDEtMi4zLDIuMy0yLjNoMTQuMyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuMywwLDIuMywxLDIuMywyLjNDLTE3Ny43LDM3Ny43LTE3Ny43LDQxNi4zLTE3Ny43LDQxNi4zeiBNLTE1My40LDQx'+
			'Ni4zYzAsMS4zLTEsMi4zLTIuMywyLjNILTE3MGMtMS4zLDAtMi4zLTEtMi4zLTIuM3YtMzguNiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMS4zLDEtMi4zLDIuMy0yLjNoMTQuM2MxLjMsMCwyLjMsMSwyLjMsMi4zQy0xNTMuNCwzNzcuNy0xNTMuNCw0MTYuMy0xNTMuNCw0MTYuM3oiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xODAsMzc1LjRoLTE0LjNjLTEuMywwLTIuMywxLTIuMywyLjN2MzguNmMwLDEuMywxLDIuMywyLjMsMi4zaDE0LjNjMS4zLDAsMi4zLTEsMi4zLTIuM3YtMzguNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OT'+
			'tDLTE3Ny43LDM3Ni40LTE3OC43LDM3NS40LTE4MCwzNzUuNHoiIGZpbGw9IiNGRkZGRkYiLz4KICAgPHBhdGggZD0iTS0xNTUuNywzNzUuNEgtMTcwYy0xLjMsMC0yLjMsMS0yLjMsMi4zdjM4LjZjMCwxLjMsMSwyLjMsMi4zLDIuM2gxNC4zYzEuMywwLDIuMy0xLDIuMy0yLjN2LTM4LjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xNTMuNCwzNzYuNC0xNTQuNCwzNzUuNC0xNTUuNywzNzUuNHoiIGZpbGw9IiNGRkZGRkYiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_video_pause_url__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_pause_url__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjQmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTEyLjYsMzYyLjYtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTE3OCw0MTguNGMwLDEuNC0xLjEsMi42LTIuNiwyLjZoLTE1LjljLTEuNCwwLTIuNi0xLjEtMi42LTIuNnYtNDIuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAtMS40LDEuMS0yLjYsMi42LTIuNmgxNS45YzEuNCwwLDIuNiwxLjEsMi42LDIuNkMtMTc4LDM3NS41LTE3OCw0MTguNC0xNzgsNDE4LjR6IE0t'+
			'MTUxLDQxOC40YzAsMS40LTEuMSwyLjYtMi42LDIuNmgtMTUuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0xLjQsMC0yLjYtMS4xLTIuNi0yLjZ2LTQyLjljMC0xLjQsMS4xLTIuNiwyLjYtMi42aDE1LjljMS40LDAsMi42LDEuMSwyLjYsMi42Qy0xNTEsMzc1LjUtMTUxLDQxOC40LTE1MSw0MTguNHoiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xODAuNSwzNzNoLTE1LjljLTEuNCwwLTIuNiwxLjEtMi42LDIuNnY0Mi45YzAsMS40LDEuMSwyLjYsMi42LDIuNmgxNS45YzEuNCwwLDIuNi0xLjEsMi42LTIuNnYtNDIuOSYjeGQ7JiN4YT'+
			'smI3g5OyYjeDk7JiN4OTtDLTE3OCwzNzQuMS0xNzkuMSwzNzMtMTgwLjUsMzczeiIgZmlsbD0iI0ZGRkZGRiIvPgogICA8cGF0aCBkPSJNLTE1My41LDM3M2gtMTUuOWMtMS40LDAtMi42LDEuMS0yLjYsMi42djQyLjljMCwxLjQsMS4xLDIuNiwyLjYsMi42aDE1LjljMS40LDAsMi42LTEuMSwyLjYtMi42di00Mi45JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTUxLDM3NC4xLTE1Mi4xLDM3My0xNTMuNSwzNzN6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._ht_video_pause_url__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_pause_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 25px;';
		hs+='left : 259px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_pause_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._ht_video_pause_url.onclick=function (e) {
			if (me._popup_video_url.ggApiPlayer) {
				if (me._popup_video_url.ggApiPlayerType == 'youtube') {
					let youtubeMediaFunction = function() {
						me._popup_video_url.ggApiPlayer.pauseVideo();
					};
					if (me._popup_video_url.ggApiPlayerReady) {
						youtubeMediaFunction();
					} else {
						let youtubeApiInterval = setInterval(function() {
							if (me._popup_video_url.ggApiPlayerReady) {
								clearInterval(youtubeApiInterval);
								youtubeMediaFunction();
							}
						}, 100);
					}
				} else if (me._popup_video_url.ggApiPlayerType == 'vimeo') {
					me._popup_video_url.ggApiPlayer.pause();
				}
			} else {
				player.pauseSound("popup_video_url");
			}
			me._ht_video_pause_url.style[domTransition]='none';
			me._ht_video_pause_url.style.visibility='hidden';
			me._ht_video_pause_url.ggVisible=false;
			me._ht_video_play_url.style[domTransition]='none';
			me._ht_video_play_url.style.visibility=(Number(me._ht_video_play_url.style.opacity)>0||!me._ht_video_play_url.style.opacity)?'inherit':'hidden';
			me._ht_video_play_url.ggVisible=true;
		}
		me._ht_video_pause_url.onmouseover=function (e) {
			me._ht_video_pause_url__img.style.visibility='hidden';
			me._ht_video_pause_url__imgo.style.visibility='inherit';
		}
		me._ht_video_pause_url.onmouseout=function (e) {
			me._ht_video_pause_url__img.style.visibility='inherit';
			me._ht_video_pause_url__imgo.style.visibility='hidden';
		}
		me._ht_video_pause_url.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_controls_url.appendChild(me._ht_video_pause_url);
		me.divSkin.appendChild(me._video_popup_controls_url);
		el=me._video_popup_vimeo=document.createElement('div');
		el.ggId="video_popup_vimeo";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : 10%;';
		hs+='position : absolute;';
		hs+='top : 10%;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_vimeo.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_vimeo.ggUpdatePosition=function (useTransition) {
		}
		el=me._loading_video_vimeo=document.createElement('div');
		els=me._loading_video_vimeo__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSI2NCI+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKD'+
			'Q1IDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC4xMjVzIiB2YWx1ZXM9IjA7MzswOzAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSg5MCAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlT'+
			'cGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuMjVzIiB2YWx1ZXM9IjA7MzswOzAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgxMzUgMTYgMTYpIiBjeT0iMyIgcj0iMCIgY3g9IjE2Ij4KICA8YW5pbWF0ZSByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgY2FsY01vZGU9InNwbGluZSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGF0dHJpYnV0ZU5hbWU9InIiIGR1cj0iMXMiIGJlZ2luPS'+
			'IwLjM3NXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuNXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDIyNSAxNiAxNikiIGN5PSIzIiByPSIwIiBj'+
			'eD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuNjI1cyIgdmFsdWVzPSIwOzM7MDswIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuOD'+
			'swLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC43NXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDMxNSAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuODc1cyIgdmFsdWVzPSIwOzM7MDsw'+
			'Ii8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC41cyIgdmFsdWVzPSIwOzM7MDswIi8+CiA8L2NpcmNsZT4KPC9zdmc+Cg==';
		me._loading_video_vimeo__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_video_vimeo";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_video_vimeo.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_video_vimeo.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_popup_vimeo.appendChild(me._loading_video_vimeo);
		el=me._popup_video_vimeo=document.createElement('div');
		me._popup_video_vimeo.seekbars = [];
		me._popup_video_vimeo.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._popup_video_vimeo.seekbars.length; i++) {
					var seekbar = me.findElements(me._popup_video_vimeo.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._popup_video_vimeo.hasChildNodes()) {
				me._popup_video_vimeo.removeChild(me._popup_video_vimeo.lastChild);
			}
			if(media == '') {
				notifySeekbars();
			if (me._popup_video_vimeo.ggVideoNotLoaded ==false && me._popup_video_vimeo.ggDeactivate) { me._popup_video_vimeo.ggDeactivate(); }
				me._popup_video_vimeo.ggVideoNotLoaded = true;
				return;
			}
			me._popup_video_vimeo.ggVideoNotLoaded = false;
			me._popup_video_vimeo__vid=document.createElement('iframe');
			me._popup_video_vimeo__vid.className='ggskin ggskin_video';
			var ggVideoParams = '?autoplay=1&amp;loop=0&amp;rel=0';
			var ggVideoUrl = 'https://player.vimeo.com/video/' + media + ggVideoParams;
			me._popup_video_vimeo__vid.setAttribute('src', ggVideoUrl);
			me._popup_video_vimeo__vid.setAttribute('width', '100%');
			me._popup_video_vimeo__vid.setAttribute('height', '100%');
			me._popup_video_vimeo__vid.setAttribute('allow', 'autoplay');
			me._popup_video_vimeo__vid.setAttribute('allowfullscreen', 'true');
			me._popup_video_vimeo__vid.setAttribute('style', 'border:none; ; ;');
			me._popup_video_vimeo.appendChild(me._popup_video_vimeo__vid);
			me._popup_video_vimeo.ggVideoSource = media;
		}
		el.ggId="popup_video_vimeo";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_video_vimeo.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_video_vimeo.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_vimeo.appendChild(me._popup_video_vimeo);
		me.divSkin.appendChild(me._video_popup_vimeo);
		el=me._video_popup_youtube=document.createElement('div');
		el.ggId="video_popup_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 80%;';
		hs+='left : 10%;';
		hs+='position : absolute;';
		hs+='top : 10%;';
		hs+='visibility : hidden;';
		hs+='width : 80%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._video_popup_youtube.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._video_popup_youtube.ggUpdatePosition=function (useTransition) {
		}
		el=me._loading_video_youtube=document.createElement('div');
		els=me._loading_video_youtube__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0id2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSI2NCI+CiA8Y2lyY2xlIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKD'+
			'Q1IDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC4xMjVzIiB2YWx1ZXM9IjA7MzswOzAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSg5MCAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlT'+
			'cGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuMjVzIiB2YWx1ZXM9IjA7MzswOzAiLz4KIDwvY2lyY2xlPgogPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgxMzUgMTYgMTYpIiBjeT0iMyIgcj0iMCIgY3g9IjE2Ij4KICA8YW5pbWF0ZSByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgY2FsY01vZGU9InNwbGluZSIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGF0dHJpYnV0ZU5hbWU9InIiIGR1cj0iMXMiIGJlZ2luPS'+
			'IwLjM3NXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuNXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDIyNSAxNiAxNikiIGN5PSIzIiByPSIwIiBj'+
			'eD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuNjI1cyIgdmFsdWVzPSIwOzM7MDswIi8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuOD'+
			'swLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC43NXMiIHZhbHVlcz0iMDszOzA7MCIvPgogPC9jaXJjbGU+CiA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDMxNSAxNiAxNikiIGN5PSIzIiByPSIwIiBjeD0iMTYiPgogIDxhbmltYXRlIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBjYWxjTW9kZT0ic3BsaW5lIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgYXR0cmlidXRlTmFtZT0iciIgZHVyPSIxcyIgYmVnaW49IjAuODc1cyIgdmFsdWVzPSIwOzM7MDsw'+
			'Ii8+CiA8L2NpcmNsZT4KIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgY3k9IjMiIHI9IjAiIGN4PSIxNiI+CiAgPGFuaW1hdGUgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGNhbGNNb2RlPSJzcGxpbmUiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBhdHRyaWJ1dGVOYW1lPSJyIiBkdXI9IjFzIiBiZWdpbj0iMC41cyIgdmFsdWVzPSIwOzM7MDswIi8+CiA8L2NpcmNsZT4KPC9zdmc+Cg==';
		me._loading_video_youtube__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_video_youtube";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._loading_video_youtube.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._video_popup_youtube.appendChild(me._loading_video_youtube);
		el=me._popup_video_youtube=document.createElement('div');
		me._popup_video_youtube.seekbars = [];
			me._popup_video_youtube.ggYoutubeApiReady = function() { skin.ggYoutubeApiLoaded = true;}
		me._popup_video_youtube.ggInitMedia = function(media) {
			var notifySeekbars = function() {
				for (var i = 0; i < me._popup_video_youtube.seekbars.length; i++) {
					var seekbar = me.findElements(me._popup_video_youtube.seekbars[i]);
					if (seekbar.length > 0) seekbar[0].connectToMediaEl();
				}
			}
			while (me._popup_video_youtube.hasChildNodes()) {
				me._popup_video_youtube.removeChild(me._popup_video_youtube.lastChild);
			}
			if(media == '') {
				notifySeekbars();
			if (me._popup_video_youtube.ggVideoNotLoaded ==false && me._popup_video_youtube.ggDeactivate) { me._popup_video_youtube.ggDeactivate(); }
				me._popup_video_youtube.ggVideoNotLoaded = true;
				return;
			}
			me._popup_video_youtube.ggVideoNotLoaded = false;
			me._popup_video_youtube__vid=document.createElement('iframe');
			me._popup_video_youtube__vid.className='ggskin ggskin_video';
			var ggVideoParams = '?autoplay=1&amp;controls=1&amp;loop=0&amp;enablejsapi=0&amp;rel=0';
			var ggVideoUrl = 'https://www.youtube.com/embed/' + media + ggVideoParams;
			me._popup_video_youtube__vid.setAttribute('src', ggVideoUrl);
			me._popup_video_youtube__vid.setAttribute('width', '100%');
			me._popup_video_youtube__vid.setAttribute('height', '100%');
			me._popup_video_youtube__vid.setAttribute('allow', 'autoplay');
			me._popup_video_youtube__vid.setAttribute('allowfullscreen', 'true');
			me._popup_video_youtube__vid.setAttribute('style', 'border:none; ; ;');
			me._popup_video_youtube.appendChild(me._popup_video_youtube__vid);
			me._popup_video_youtube.ggVideoSource = media;
			if (skin.ggYoutubeApiLoaded && skin.ggYoutubeApiLoaded == true) {me._popup_video_youtube.ggYoutubeApiReady();}
		}
		el.ggId="popup_video_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_video ";
		el.ggType='video';
		hs ='';
		hs+='height : 100%;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._popup_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._popup_video_youtube.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_youtube.appendChild(me._popup_video_youtube);
		me.divSkin.appendChild(me._video_popup_youtube);
		el=me._close=document.createElement('div');
		els=me._close__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzUuMywzNTcuM2MtMjEuOS0yMS45LTU3LjUtMjEuOS03OS40LDBjLTIxLjksMjEuOS0yMS45LDU3LjUsMCw3OS40YzIxLjksMjEuOSw1Ny41LDIxLjksNzkuNCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTExMy40LDM3OS4yLTEzNS4zLDM1Ny4zeiBNLTE0NS44LDQxMi43YzAuOCwwLjgsMC44LDEuNS0wLjEsMi40bC0xMC45LDEwLjljLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjQmI3hkOyYjeGE7JiN4OTsmI3g5O2wtMTUuOC0xNS44bC0xNS43LDE1LjdjLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41cy0wLjktMC4x'+
			'LTEuMS0wLjRsLTExLjEtMTEuMWMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuNy0xNS43bC0xNS44LTE1LjhjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xYzAtMC41LDAuMS0wLjksMC41LTEuM2wxMC45LTEwLjljMC45LTAuOSwxLjctMC45LDIuNC0wLjFsMTUuOCwxNS44bDE1LjctMTUuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xbDExLjEsMTEuMWMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTUuNywxNS43TC0xNDUuOCw0MTIuN3oiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KID'+
			'xnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE2MS42LDM5Ni45bDE1LjgsMTUuOGMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTAuOSwxMC45Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjRsLTE1LjgtMTUuOGwtMTUuNywxNS43Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNXMtMC45LTAuMS0xLjEtMC40bC0xMS4xLTExLjFjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjUsMC4xLTAuOSwwLjUtMS4zbDE1LjctMTUuN2wtMTUuOC0xNS44Yy0wLjMtMC4zLTAuNC0wLjYtMC40'+
			'LTEuMWMwLTAuNSwwLjEtMC45LDAuNS0xLjNsMTAuOS0xMC45YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuOCwxNS44bDE1LjctMTUuN2MwLjktMC45LDEuNy0wLjksMi40LTAuMWwxMS4xLDExLjFjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRMLTE2MS42LDM5Ni45eiIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._close__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._close__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzAuOSwzNTIuOWMtMjQuNC0yNC40LTYzLjgtMjQuNC04OC4yLDBjLTI0LjQsMjQuNC0yNC40LDYzLjgsMCw4OC4yYzI0LjQsMjQuNCw2My44LDI0LjQsODguMiwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTEwNi41LDM3Ny4zLTEzMC45LDM1Mi45eiBNLTE0Mi41LDQxNC41YzAuOCwwLjgsMC44LDEuNy0wLjEsMi43bC0xMi4yLDEyLjJjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40JiN4ZDsmI3hhOyYjeDk7JiN4OTtsLTE3LjUtMTcuNWwtMTcuNCwxNy40Yy0wLjQsMC40LTAuOCwwLjYtMS40LDAuNmMtMC42LDAtMS0w'+
			'LjEtMS4zLTAuNGwtMTIuMy0xMi4zYy0wLjMtMC4zLTAuNC0wLjctMC40LTEuM2MwLTAuNiwwLjEtMSwwLjYtMS40JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTcuNC0xNy40bC0xNy41LTE3LjVjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zYzAtMC42LDAuMS0xLDAuNi0xLjRsMTIuMi0xMi4yYzEtMSwxLjgtMSwyLjctMC4xbDE3LjUsMTcuNWwxNy40LTE3LjQmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLTEsMS44LTEsMi43LTAuMWwxMi4zLDEyLjNjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdsLTE3LjQsMTcuNEwtMTQyLjUsNDE0LjV6IiBmaWxsPSIjMDAwMDAwIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMi'+
			'I+CiAgPHBhdGggZD0iTS0xNjAuMSwzOTYuOWwxNy41LDE3LjVjMC44LDAuOCwwLjgsMS43LTAuMSwyLjdsLTEyLjIsMTIuMmMtMC40LDAuNC0wLjgsMC42LTEuNCwwLjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC42LDAtMS0wLjEtMS4zLTAuNGwtMTcuNS0xNy41bC0xNy40LDE3LjRjLTAuNCwwLjQtMC44LDAuNi0xLjQsMC42Yy0wLjYsMC0xLTAuMS0xLjMtMC40bC0xMi4zLTEyLjNjLTAuMy0wLjMtMC40LTAuNy0wLjQtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjYsMC4xLTEsMC42LTEuNGwxNy40LTE3LjRsLTE3LjUtMTcuNWMtMC4zLTAuMy0wLjQtMC43LTAuNC0xLjNjMC0wLjYsMC4x'+
			'LTEsMC42LTEuNGwxMi4yLTEyLjJjMS0xLDEuOC0xLDIuNy0wLjFsMTcuNSwxNy41JiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTcuNC0xNy40YzEtMSwxLjgtMSwyLjctMC4xbDEyLjMsMTIuM2MwLjgsMC44LDAuOCwxLjctMC4xLDIuN0wtMTYwLjEsMzk2Ljl6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._close__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="close";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='top : 6px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._close.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._close.onclick=function (e) {
			me._close.style[domTransition]='none';
			me._close.style.visibility='hidden';
			me._close.ggVisible=false;
			me._controller.style[domTransition]='none';
			me._controller.style.visibility=(Number(me._controller.style.opacity)>0||!me._controller.style.opacity)?'inherit':'hidden';
			me._controller.ggVisible=true;
			me._screentint.style[domTransition]='none';
			me._screentint.style.visibility='hidden';
			me._screentint.ggVisible=false;
			me._popup_video_youtube.ggInitMedia('');
			me._popup_video_youtube.style[domTransition]='none';
			me._popup_video_youtube.style.visibility='hidden';
			me._popup_video_youtube.ggVisible=false;
			me._video_popup_youtube.style[domTransition]='none';
			me._video_popup_youtube.style.visibility='hidden';
			me._video_popup_youtube.ggVisible=false;
			me._popup_video_vimeo.ggInitMedia('');
			me._popup_video_vimeo.style[domTransition]='none';
			me._popup_video_vimeo.style.visibility='hidden';
			me._popup_video_vimeo.ggVisible=false;
			me._video_popup_vimeo.style[domTransition]='none';
			me._video_popup_vimeo.style.visibility='hidden';
			me._video_popup_vimeo.ggVisible=false;
			me._popup_video_url.ggInitMedia('');
			me._popup_video_url.style[domTransition]='none';
			me._popup_video_url.style.visibility='hidden';
			me._popup_video_url.ggVisible=false;
			me._video_popup_url.style[domTransition]='none';
			me._video_popup_url.style.visibility='hidden';
			me._video_popup_url.ggVisible=false;
			me._video_popup_controls_url.style[domTransition]='none';
			me._video_popup_controls_url.style.visibility='hidden';
			me._video_popup_controls_url.ggVisible=false;
			me._popup_video_file.ggInitMedia('');
			me._popup_video_file.style[domTransition]='none';
			me._popup_video_file.style.visibility='hidden';
			me._popup_video_file.ggVisible=false;
			me._video_popup_file.style[domTransition]='none';
			me._video_popup_file.style.visibility='hidden';
			me._video_popup_file.ggVisible=false;
			me._video_popup_controls_file.style[domTransition]='none';
			me._video_popup_controls_file.style.visibility='hidden';
			me._video_popup_controls_file.ggVisible=false;
			me._image_popup.style[domTransition]='none';
			me._image_popup.style.visibility='hidden';
			me._image_popup.ggVisible=false;
			me._popup_image.ggSubElement.src='';
			me._popup_image.style[domTransition]='none';
			me._popup_image.style.visibility='hidden';
			me._popup_image.ggVisible=false;
		}
		me._close.onmouseover=function (e) {
			me._close__img.style.visibility='hidden';
			me._close__imgo.style.visibility='inherit';
		}
		me._close.onmouseout=function (e) {
			me._close__img.style.visibility='inherit';
			me._close__imgo.style.visibility='hidden';
		}
		me._close.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._close);
		el=me._panotitle=document.createElement('div');
		el.ggId="panoTitle";
		el.ggDx=16;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 8px;';
		hs+='visibility : inherit;';
		hs+='width : 72px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._panotitle.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._panotitle.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._title_text=document.createElement('div');
		els=me._title_text__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="title_Text";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 72px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._title_text.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._title_text.ggUpdateText();
		player.addListener('changenode', function() {
			me._title_text.ggUpdateText();
		});
		el.appendChild(els);
		me._title_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._title_text.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((70-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._panotitle.appendChild(me._title_text);
		me.divSkin.appendChild(me._panotitle);
		el=me._hide_template=document.createElement('div');
		el.ggId="hide_template";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 45px;';
		hs+='left : 0px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 187px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hide_template.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._hide_template.ggUpdatePosition=function (useTransition) {
		}
		el=me._markertemplate=document.createElement('div');
		el.ggMarkerNodeId='';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="markertemplate";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 60px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._markertemplate.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._markertemplate.onmouseover=function (e) {
			me._marker_title13.style[domTransition]='none';
			me._marker_title13.style.visibility=(Number(me._marker_title13.style.opacity)>0||!me._marker_title13.style.opacity)?'inherit':'hidden';
			me._marker_title13.ggVisible=true;
		}
		me._markertemplate.onmouseout=function (e) {
			me._marker_title13.style[domTransition]='none';
			me._marker_title13.style.visibility='hidden';
			me._marker_title13.ggVisible=false;
		}
		me._markertemplate.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title13=document.createElement('div');
		els=me._marker_title13__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 18px;';
		hs+='left : -56px;';
		hs+='position : absolute;';
		hs+='top : 57px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._marker_title13.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._marker_title13.ggUpdateText();
		player.addListener('changenode', function() {
			me._marker_title13.ggUpdateText();
		});
		el.appendChild(els);
		me._marker_title13.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title13.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((150-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._markertemplate.appendChild(me._marker_title13);
		me._hide_template.appendChild(me._markertemplate);
		me.divSkin.appendChild(me._hide_template);
		el=me._researchstationmap2=document.createElement('div');
		els=me._researchstationmap2__img=document.createElement('img');
		els.className='ggskin ggskin_researchstationmap2';
		hs=basePath + 'images/researchstationmap2.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="researchstationmap2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 355px;';
		hs+='position : absolute;';
		hs+='right : 10px;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 364px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._researchstationmap2.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._researchstationmap2.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._researchstationmap2);
		el=me._panomap=document.createElement('div');
		el.ggId="panoMap";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 461px;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='top : -32px;';
		hs+='visibility : inherit;';
		hs+='width : 400px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._panomap.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._panomap.ggUpdatePosition=function (useTransition) {
		}
		el=me._open_map=document.createElement('div');
		els=me._open_map__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._open_map__img.setAttribute('src',basePath + 'images/open_map.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="open_map";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='position : absolute;';
		hs+='right : 4px;';
		hs+='top : 39px;';
		hs+='visibility : hidden;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._open_map.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._open_map.onclick=function (e) {
			me._researchstationmap2.style[domTransition]='none';
			me._researchstationmap2.style.visibility=(Number(me._researchstationmap2.style.opacity)>0||!me._researchstationmap2.style.opacity)?'inherit':'hidden';
			me._researchstationmap2.ggVisible=true;
			me._station_nodes.style[domTransition]='none';
			me._station_nodes.style.visibility=(Number(me._station_nodes.style.opacity)>0||!me._station_nodes.style.opacity)?'inherit':'hidden';
			me._station_nodes.ggVisible=true;
			me._open_map.style[domTransition]='none';
			me._open_map.style.visibility='hidden';
			me._open_map.ggVisible=false;
			me._close_map.style[domTransition]='none';
			me._close_map.style.visibility=(Number(me._close_map.style.opacity)>0||!me._close_map.style.opacity)?'inherit':'hidden';
			me._close_map.ggVisible=true;
			me._wildside_nodes.style[domTransition]='none';
			me._wildside_nodes.style.visibility='hidden';
			me._wildside_nodes.ggVisible=false;
			me._wildside_map.style[domTransition]='none';
			me._wildside_map.style.visibility='hidden';
			me._wildside_map.ggVisible=false;
			me._close_wildside_map.style[domTransition]='none';
			me._close_wildside_map.style.visibility='hidden';
			me._close_wildside_map.ggVisible=false;
			me._open_wildside_map.style[domTransition]='none';
			me._open_wildside_map.style.visibility=(Number(me._open_wildside_map.style.opacity)>0||!me._open_wildside_map.style.opacity)?'inherit':'hidden';
			me._open_wildside_map.ggVisible=true;
		}
		me._open_map.ggUpdatePosition=function (useTransition) {
		}
		me._panomap.appendChild(me._open_map);
		el=me._close_map=document.createElement('div');
		els=me._close_map__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzUuMywzNTcuM2MtMjEuOS0yMS45LTU3LjUtMjEuOS03OS40LDBjLTIxLjksMjEuOS0yMS45LDU3LjUsMCw3OS40YzIxLjksMjEuOSw1Ny41LDIxLjksNzkuNCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTExMy40LDM3OS4yLTEzNS4zLDM1Ny4zeiBNLTE0NS44LDQxMi43YzAuOCwwLjgsMC44LDEuNS0wLjEsMi40bC0xMC45LDEwLjljLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjQmI3hkOyYjeGE7JiN4OTsmI3g5O2wtMTUuOC0xNS44bC0xNS43LDE1LjdjLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41cy0wLjktMC4x'+
			'LTEuMS0wLjRsLTExLjEtMTEuMWMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuNy0xNS43bC0xNS44LTE1LjhjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xYzAtMC41LDAuMS0wLjksMC41LTEuM2wxMC45LTEwLjljMC45LTAuOSwxLjctMC45LDIuNC0wLjFsMTUuOCwxNS44bDE1LjctMTUuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xbDExLjEsMTEuMWMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTUuNywxNS43TC0xNDUuOCw0MTIuN3oiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KID'+
			'xnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE2MS42LDM5Ni45bDE1LjgsMTUuOGMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTAuOSwxMC45Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjRsLTE1LjgtMTUuOGwtMTUuNywxNS43Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNXMtMC45LTAuMS0xLjEtMC40bC0xMS4xLTExLjFjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjUsMC4xLTAuOSwwLjUtMS4zbDE1LjctMTUuN2wtMTUuOC0xNS44Yy0wLjMtMC4zLTAuNC0wLjYtMC40'+
			'LTEuMWMwLTAuNSwwLjEtMC45LDAuNS0xLjNsMTAuOS0xMC45YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuOCwxNS44bDE1LjctMTUuN2MwLjktMC45LDEuNy0wLjksMi40LTAuMWwxMS4xLDExLjFjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRMLTE2MS42LDM5Ni45eiIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._close_map__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="close_map";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='position : absolute;';
		hs+='right : 3px;';
		hs+='top : 39px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._close_map.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._close_map.onclick=function (e) {
			me._station_nodes.style[domTransition]='none';
			me._station_nodes.style.visibility='hidden';
			me._station_nodes.ggVisible=false;
			me._researchstationmap2.style[domTransition]='none';
			me._researchstationmap2.style.visibility='hidden';
			me._researchstationmap2.ggVisible=false;
			me._open_map.style[domTransition]='none';
			me._open_map.style.visibility=(Number(me._open_map.style.opacity)>0||!me._open_map.style.opacity)?'inherit':'hidden';
			me._open_map.ggVisible=true;
			me._close_map.style[domTransition]='none';
			me._close_map.style.visibility='hidden';
			me._close_map.ggVisible=false;
		}
		me._close_map.ggUpdatePosition=function (useTransition) {
		}
		me._panomap.appendChild(me._close_map);
		el=me._station_nodes=document.createElement('div');
		el.ggId="Station Nodes";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 130px;';
		hs+='position : absolute;';
		hs+='right : -37px;';
		hs+='top : 200px;';
		hs+='visibility : inherit;';
		hs+='width : 448px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._station_nodes.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._station_nodes.ggUpdatePosition=function (useTransition) {
		}
		el=me._clam_garden_marker_node=document.createElement('div');
		el.ggMarkerNodeId='{node18}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="clam_garden_marker_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 310px;';
		hs+='position : absolute;';
		hs+='top : -131px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._clam_garden_marker_node.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._clam_garden_marker_node.onclick=function (e) {
			player.openNext('{node18}');
		}
		me._clam_garden_marker_node.onmouseover=function (e) {
			me._marker_title12.style[domTransition]='none';
			me._marker_title12.style.visibility=(Number(me._marker_title12.style.opacity)>0||!me._marker_title12.style.opacity)?'inherit':'hidden';
			me._marker_title12.ggVisible=true;
		}
		me._clam_garden_marker_node.onmouseout=function (e) {
			me._marker_title12.style[domTransition]='none';
			me._marker_title12.style.visibility='hidden';
			me._marker_title12.ggVisible=false;
		}
		me._clam_garden_marker_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title12=document.createElement('div');
		els=me._marker_title12__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 18px;';
		hs+='left : -56px;';
		hs+='position : absolute;';
		hs+='top : 57px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Clam garden";
		el.appendChild(els);
		me._marker_title12.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title12.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((150-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._clam_garden_marker_node.appendChild(me._marker_title12);
		me._station_nodes.appendChild(me._clam_garden_marker_node);
		el=me._office=document.createElement('div');
		el.ggMarkerNodeId='{node19}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="Office";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 359px;';
		hs+='position : absolute;';
		hs+='top : 11px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._office.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._office.onclick=function (e) {
			player.openNext('{node19}');
		}
		me._office.onmouseover=function (e) {
			me._marker_title11.style[domTransition]='none';
			me._marker_title11.style.visibility=(Number(me._marker_title11.style.opacity)>0||!me._marker_title11.style.opacity)?'inherit':'hidden';
			me._marker_title11.ggVisible=true;
		}
		me._office.onmouseout=function (e) {
			me._marker_title11.style[domTransition]='none';
			me._marker_title11.style.visibility='hidden';
			me._marker_title11.ggVisible=false;
		}
		me._office.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title11=document.createElement('div');
		els=me._marker_title11__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 18px;';
		hs+='left : -56px;';
		hs+='position : absolute;';
		hs+='top : 57px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Office";
		el.appendChild(els);
		me._marker_title11.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title11.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((150-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._office.appendChild(me._marker_title11);
		me._station_nodes.appendChild(me._office);
		el=me._lecturetheatre_marker_node=document.createElement('div');
		el.ggMarkerNodeId='{node6}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="lectureTheatre_marker_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 335px;';
		hs+='position : absolute;';
		hs+='top : 53px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._lecturetheatre_marker_node.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._lecturetheatre_marker_node.onclick=function (e) {
			player.openNext('{node6}');
		}
		me._lecturetheatre_marker_node.onmouseover=function (e) {
			me._marker_title10.style[domTransition]='none';
			me._marker_title10.style.visibility=(Number(me._marker_title10.style.opacity)>0||!me._marker_title10.style.opacity)?'inherit':'hidden';
			me._marker_title10.ggVisible=true;
		}
		me._lecturetheatre_marker_node.onmouseout=function (e) {
			me._marker_title10.style[domTransition]='none';
			me._marker_title10.style.visibility='hidden';
			me._marker_title10.ggVisible=false;
		}
		me._lecturetheatre_marker_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title10=document.createElement('div');
		els=me._marker_title10__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 18px;';
		hs+='left : -52px;';
		hs+='position : absolute;';
		hs+='top : 53px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Lecture theatre";
		el.appendChild(els);
		me._marker_title10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title10.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((150-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._lecturetheatre_marker_node.appendChild(me._marker_title10);
		me._station_nodes.appendChild(me._lecturetheatre_marker_node);
		el=me._drylab_marker_node=document.createElement('div');
		el.ggMarkerNodeId='{node4}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="drylab_marker_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 352px;';
		hs+='position : absolute;';
		hs+='top : 53px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._drylab_marker_node.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._drylab_marker_node.onclick=function (e) {
			player.openNext('{node4}');
		}
		me._drylab_marker_node.onmouseover=function (e) {
			me._marker_title9.style[domTransition]='none';
			me._marker_title9.style.visibility=(Number(me._marker_title9.style.opacity)>0||!me._marker_title9.style.opacity)?'inherit':'hidden';
			me._marker_title9.ggVisible=true;
		}
		me._drylab_marker_node.onmouseout=function (e) {
			me._marker_title9.style[domTransition]='none';
			me._marker_title9.style.visibility='hidden';
			me._marker_title9.ggVisible=false;
		}
		me._drylab_marker_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title9=document.createElement('div');
		els=me._marker_title9__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 18px;';
		hs+='left : -49px;';
		hs+='position : absolute;';
		hs+='top : 51px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Drylab";
		el.appendChild(els);
		me._marker_title9.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title9.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((150-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._drylab_marker_node.appendChild(me._marker_title9);
		me._station_nodes.appendChild(me._drylab_marker_node);
		el=me._weblab_marker_node=document.createElement('div');
		el.ggMarkerNodeId='{node3}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="weblab_marker_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 338px;';
		hs+='position : absolute;';
		hs+='top : 37px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._weblab_marker_node.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._weblab_marker_node.onclick=function (e) {
			player.openNext('{node3}');
		}
		me._weblab_marker_node.onmouseover=function (e) {
			me._marker_title8.style[domTransition]='none';
			me._marker_title8.style.visibility=(Number(me._marker_title8.style.opacity)>0||!me._marker_title8.style.opacity)?'inherit':'hidden';
			me._marker_title8.ggVisible=true;
		}
		me._weblab_marker_node.onmouseout=function (e) {
			me._marker_title8.style[domTransition]='none';
			me._marker_title8.style.visibility='hidden';
			me._marker_title8.ggVisible=false;
		}
		me._weblab_marker_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title8=document.createElement('div');
		els=me._marker_title8__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 18px;';
		hs+='left : -55px;';
		hs+='position : absolute;';
		hs+='top : 52px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Wetlab";
		el.appendChild(els);
		me._marker_title8.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title8.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((150-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._weblab_marker_node.appendChild(me._marker_title8);
		me._station_nodes.appendChild(me._weblab_marker_node);
		el=me._arrival_point=document.createElement('div');
		el.ggMarkerNodeId='{node1}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="Arrival Point";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 311px;';
		hs+='position : absolute;';
		hs+='top : 29px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._arrival_point.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._arrival_point.onclick=function (e) {
			player.openNext('{node1}');
		}
		me._arrival_point.onmouseover=function (e) {
			me._marker_title7.style[domTransition]='none';
			me._marker_title7.style.visibility=(Number(me._marker_title7.style.opacity)>0||!me._marker_title7.style.opacity)?'inherit':'hidden';
			me._marker_title7.ggVisible=true;
		}
		me._arrival_point.onmouseout=function (e) {
			me._marker_title7.style[domTransition]='none';
			me._marker_title7.style.visibility='hidden';
			me._marker_title7.ggVisible=false;
		}
		me._arrival_point.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title7=document.createElement('div');
		els=me._marker_title7__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 17px;';
		hs+='left : -34px;';
		hs+='position : absolute;';
		hs+='top : 52px;';
		hs+='visibility : hidden;';
		hs+='width : 113px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Arrival Point";
		el.appendChild(els);
		me._marker_title7.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title7.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((115-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._arrival_point.appendChild(me._marker_title7);
		me._station_nodes.appendChild(me._arrival_point);
		el=me._havanna_marker_node=document.createElement('div');
		el.ggMarkerNodeId='{node12}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="havanna_marker_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='position : absolute;';
		hs+='right : 152px;';
		hs+='top : 71px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._havanna_marker_node.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._havanna_marker_node.onclick=function (e) {
			player.openNext('{node12}');
		}
		me._havanna_marker_node.onmouseover=function (e) {
			me._marker_title6.style[domTransition]='none';
			me._marker_title6.style.visibility=(Number(me._marker_title6.style.opacity)>0||!me._marker_title6.style.opacity)?'inherit':'hidden';
			me._marker_title6.ggVisible=true;
		}
		me._havanna_marker_node.onmouseout=function (e) {
			me._marker_title6.style[domTransition]='none';
			me._marker_title6.style.visibility='hidden';
			me._marker_title6.ggVisible=false;
		}
		me._havanna_marker_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title6=document.createElement('div');
		els=me._marker_title6__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 16px;';
		hs+='left : -27px;';
		hs+='position : absolute;';
		hs+='top : 51px;';
		hs+='visibility : hidden;';
		hs+='width : 106px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Havanna House";
		el.appendChild(els);
		me._marker_title6.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title6.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((108-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._havanna_marker_node.appendChild(me._marker_title6);
		me._station_nodes.appendChild(me._havanna_marker_node);
		el=me._pelorus_house=document.createElement('div');
		el.ggMarkerNodeId='{node14}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="Pelorus House";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 273px;';
		hs+='position : absolute;';
		hs+='top : 82px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._pelorus_house.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._pelorus_house.onclick=function (e) {
			player.openNext('{node14}');
		}
		me._pelorus_house.onmouseover=function (e) {
			me._marker_title5.style[domTransition]='none';
			me._marker_title5.style.visibility=(Number(me._marker_title5.style.opacity)>0||!me._marker_title5.style.opacity)?'inherit':'hidden';
			me._marker_title5.ggVisible=true;
		}
		me._pelorus_house.onmouseout=function (e) {
			me._marker_title5.style[domTransition]='none';
			me._marker_title5.style.visibility='hidden';
			me._marker_title5.ggVisible=false;
		}
		me._pelorus_house.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title5=document.createElement('div');
		els=me._marker_title5__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 18px;';
		hs+='left : -56px;';
		hs+='position : absolute;';
		hs+='top : 57px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Pelorous House";
		el.appendChild(els);
		me._marker_title5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title5.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((150-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._pelorus_house.appendChild(me._marker_title5);
		me._station_nodes.appendChild(me._pelorus_house);
		el=me._thepoint_marker_node=document.createElement('div');
		el.ggMarkerNodeId='{node17}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="ThePoint_marker_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 72px;';
		hs+='position : absolute;';
		hs+='top : 4px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thepoint_marker_node.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._thepoint_marker_node.onclick=function (e) {
			player.openNext('{node17}');
		}
		me._thepoint_marker_node.onmouseover=function (e) {
			me._marker_title4.style[domTransition]='none';
			me._marker_title4.style.visibility=(Number(me._marker_title4.style.opacity)>0||!me._marker_title4.style.opacity)?'inherit':'hidden';
			me._marker_title4.ggVisible=true;
		}
		me._thepoint_marker_node.onmouseout=function (e) {
			me._marker_title4.style[domTransition]='none';
			me._marker_title4.style.visibility='hidden';
			me._marker_title4.ggVisible=false;
		}
		me._thepoint_marker_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title4=document.createElement('div');
		els=me._marker_title4__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 18px;';
		hs+='left : -54px;';
		hs+='position : absolute;';
		hs+='top : 53px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="The Point";
		el.appendChild(els);
		me._marker_title4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title4.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((150-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._thepoint_marker_node.appendChild(me._marker_title4);
		me._station_nodes.appendChild(me._thepoint_marker_node);
		el=me._uw_cable=document.createElement('div');
		el.ggMarkerNodeId='{node29}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="UW cable";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 102px;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._uw_cable.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._uw_cable.onclick=function (e) {
			player.openNext('{node29}');
		}
		me._uw_cable.onmouseover=function (e) {
			me._marker_title3.style[domTransition]='none';
			me._marker_title3.style.visibility=(Number(me._marker_title3.style.opacity)>0||!me._marker_title3.style.opacity)?'inherit':'hidden';
			me._marker_title3.ggVisible=true;
		}
		me._uw_cable.onmouseout=function (e) {
			me._marker_title3.style[domTransition]='none';
			me._marker_title3.style.visibility='hidden';
			me._marker_title3.ggVisible=false;
		}
		me._uw_cable.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title3=document.createElement('div');
		els=me._marker_title3__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 18px;';
		hs+='left : -56px;';
		hs+='position : absolute;';
		hs+='top : 57px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="UW camera cable";
		el.appendChild(els);
		me._marker_title3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title3.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((150-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._uw_cable.appendChild(me._marker_title3);
		me._station_nodes.appendChild(me._uw_cable);
		me._panomap.appendChild(me._station_nodes);
		me.divSkin.appendChild(me._panomap);
		el=me._container_1=document.createElement('div');
		el.ggId="Container 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 461px;';
		hs+='left : 171px;';
		hs+='position : absolute;';
		hs+='top : -32px;';
		hs+='visibility : inherit;';
		hs+='width : 470px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._container_1.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_1.ggUpdatePosition=function (useTransition) {
		}
		el=me._rockybeachpanomap=document.createElement('div');
		el.ggId="RockyBeachpanoMap";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 461px;';
		hs+='left : 64px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 400px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._rockybeachpanomap.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._rockybeachpanomap.ggUpdatePosition=function (useTransition) {
		}
		el=me._wildside_map=document.createElement('div');
		els=me._wildside_map__img=document.createElement('img');
		els.className='ggskin ggskin_wildside_map';
		hs=basePath + 'images/wildside_map.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Wildside map";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='height : 357px;';
		hs+='left : -224px;';
		hs+='position : absolute;';
		hs+='top : 42px;';
		hs+='visibility : inherit;';
		hs+='width : 470px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._wildside_map.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._wildside_map.ggUpdatePosition=function (useTransition) {
		}
		me._rockybeachpanomap.appendChild(me._wildside_map);
		el=me._open_wildside_map=document.createElement('div');
		els=me._open_wildside_map__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		me._open_wildside_map__img.setAttribute('src',basePath + 'images/open_wildside_map.svg');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="open_wildside_map";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -228px;';
		hs+='position : absolute;';
		hs+='top : 37px;';
		hs+='visibility : hidden;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._open_wildside_map.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._open_wildside_map.onclick=function (e) {
			me._wildside_map.style[domTransition]='none';
			me._wildside_map.style.visibility=(Number(me._wildside_map.style.opacity)>0||!me._wildside_map.style.opacity)?'inherit':'hidden';
			me._wildside_map.ggVisible=true;
			me._wildside_nodes.style[domTransition]='none';
			me._wildside_nodes.style.visibility=(Number(me._wildside_nodes.style.opacity)>0||!me._wildside_nodes.style.opacity)?'inherit':'hidden';
			me._wildside_nodes.ggVisible=true;
			me._open_wildside_map.style[domTransition]='none';
			me._open_wildside_map.style.visibility='hidden';
			me._open_wildside_map.ggVisible=false;
			me._close_wildside_map.style[domTransition]='none';
			me._close_wildside_map.style.visibility=(Number(me._close_wildside_map.style.opacity)>0||!me._close_wildside_map.style.opacity)?'inherit':'hidden';
			me._close_wildside_map.ggVisible=true;
			me._station_nodes.style[domTransition]='none';
			me._station_nodes.style.visibility='hidden';
			me._station_nodes.ggVisible=false;
			me._researchstationmap2.style[domTransition]='none';
			me._researchstationmap2.style.visibility='hidden';
			me._researchstationmap2.ggVisible=false;
			me._close_map.style[domTransition]='none';
			me._close_map.style.visibility='hidden';
			me._close_map.ggVisible=false;
			me._open_map.style[domTransition]='none';
			me._open_map.style.visibility=(Number(me._open_map.style.opacity)>0||!me._open_map.style.opacity)?'inherit':'hidden';
			me._open_map.ggVisible=true;
		}
		me._open_wildside_map.ggUpdatePosition=function (useTransition) {
		}
		me._rockybeachpanomap.appendChild(me._open_wildside_map);
		el=me._close_wildside_map=document.createElement('div');
		els=me._close_wildside_map__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xMzUuMywzNTcuM2MtMjEuOS0yMS45LTU3LjUtMjEuOS03OS40LDBjLTIxLjksMjEuOS0yMS45LDU3LjUsMCw3OS40YzIxLjksMjEuOSw1Ny41LDIxLjksNzkuNCwwJiN4ZDsmI3hhOyYjeDk7JiN4OTtTLTExMy40LDM3OS4yLTEzNS4zLDM1Ny4zeiBNLTE0NS44LDQxMi43YzAuOCwwLjgsMC44LDEuNS0wLjEsMi40bC0xMC45LDEwLjljLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjQmI3hkOyYjeGE7JiN4OTsmI3g5O2wtMTUuOC0xNS44bC0xNS43LDE1LjdjLTAuNCwwLjQtMC44LDAuNS0xLjMsMC41cy0wLjktMC4x'+
			'LTEuMS0wLjRsLTExLjEtMTEuMWMtMC4zLTAuMy0wLjQtMC42LTAuNC0xLjFjMC0wLjUsMC4xLTAuOSwwLjUtMS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuNy0xNS43bC0xNS44LTE1LjhjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xYzAtMC41LDAuMS0wLjksMC41LTEuM2wxMC45LTEwLjljMC45LTAuOSwxLjctMC45LDIuNC0wLjFsMTUuOCwxNS44bDE1LjctMTUuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xbDExLjEsMTEuMWMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTUuNywxNS43TC0xNDUuOCw0MTIuN3oiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KID'+
			'xnIGlkPSJMYXllcl8yIj4KICA8cGF0aCBkPSJNLTE2MS42LDM5Ni45bDE1LjgsMTUuOGMwLjgsMC44LDAuOCwxLjUtMC4xLDIuNGwtMTAuOSwxMC45Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0wLjUsMC0wLjktMC4xLTEuMS0wLjRsLTE1LjgtMTUuOGwtMTUuNywxNS43Yy0wLjQsMC40LTAuOCwwLjUtMS4zLDAuNXMtMC45LTAuMS0xLjEtMC40bC0xMS4xLTExLjFjLTAuMy0wLjMtMC40LTAuNi0wLjQtMS4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0wLjUsMC4xLTAuOSwwLjUtMS4zbDE1LjctMTUuN2wtMTUuOC0xNS44Yy0wLjMtMC4zLTAuNC0wLjYtMC40'+
			'LTEuMWMwLTAuNSwwLjEtMC45LDAuNS0xLjNsMTAuOS0xMC45YzAuOS0wLjksMS43LTAuOSwyLjQtMC4xJiN4ZDsmI3hhOyYjeDk7JiN4OTtsMTUuOCwxNS44bDE1LjctMTUuN2MwLjktMC45LDEuNy0wLjksMi40LTAuMWwxMS4xLDExLjFjMC44LDAuOCwwLjgsMS41LTAuMSwyLjRMLTE2MS42LDM5Ni45eiIgZmlsbD0iI0ZGRkZGRiIvPgogPC9nPgo8L3N2Zz4K';
		me._close_wildside_map__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="close_wildside_map";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 40px;';
		hs+='left : -227px;';
		hs+='position : absolute;';
		hs+='top : 37px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._close_wildside_map.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._close_wildside_map.onclick=function (e) {
			me._wildside_nodes.style[domTransition]='none';
			me._wildside_nodes.style.visibility='hidden';
			me._wildside_nodes.ggVisible=false;
			me._wildside_map.style[domTransition]='none';
			me._wildside_map.style.visibility='hidden';
			me._wildside_map.ggVisible=false;
			me._open_wildside_map.style[domTransition]='none';
			me._open_wildside_map.style.visibility=(Number(me._open_wildside_map.style.opacity)>0||!me._open_wildside_map.style.opacity)?'inherit':'hidden';
			me._open_wildside_map.ggVisible=true;
			me._close_wildside_map.style[domTransition]='none';
			me._close_wildside_map.style.visibility='hidden';
			me._close_wildside_map.ggVisible=false;
		}
		me._close_wildside_map.ggUpdatePosition=function (useTransition) {
		}
		me._rockybeachpanomap.appendChild(me._close_wildside_map);
		el=me._wildside_nodes=document.createElement('div');
		el.ggId="Wildside Nodes";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 130px;';
		hs+='left : -169px;';
		hs+='position : absolute;';
		hs+='top : 208px;';
		hs+='visibility : inherit;';
		hs+='width : 448px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._wildside_nodes.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._wildside_nodes.ggUpdatePosition=function (useTransition) {
		}
		el=me._wildside_shore_north=document.createElement('div');
		el.ggMarkerNodeId='{node38}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="Wildside Shore north";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 281px;';
		hs+='position : absolute;';
		hs+='top : -123px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._wildside_shore_north.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._wildside_shore_north.onclick=function (e) {
			player.openNext('{node38}');
		}
		me._wildside_shore_north.onmouseover=function (e) {
			me._marker_title2.style[domTransition]='none';
			me._marker_title2.style.visibility=(Number(me._marker_title2.style.opacity)>0||!me._marker_title2.style.opacity)?'inherit':'hidden';
			me._marker_title2.ggVisible=true;
		}
		me._wildside_shore_north.onmouseout=function (e) {
			me._marker_title2.style[domTransition]='none';
			me._marker_title2.style.visibility='hidden';
			me._marker_title2.ggVisible=false;
		}
		me._wildside_shore_north.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title2=document.createElement('div');
		els=me._marker_title2__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 18px;';
		hs+='left : -56px;';
		hs+='position : absolute;';
		hs+='top : 57px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Wildside Shore North";
		el.appendChild(els);
		me._marker_title2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title2.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((150-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._wildside_shore_north.appendChild(me._marker_title2);
		me._wildside_nodes.appendChild(me._wildside_shore_north);
		el=me._wildside_beach_station=document.createElement('div');
		el.ggMarkerNodeId='{node25}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="Wildside beach station";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 225px;';
		hs+='position : absolute;';
		hs+='top : -28px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._wildside_beach_station.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._wildside_beach_station.onclick=function (e) {
			player.openNext('{node25}');
		}
		me._wildside_beach_station.onmouseover=function (e) {
			me._marker_title1.style[domTransition]='none';
			me._marker_title1.style.visibility=(Number(me._marker_title1.style.opacity)>0||!me._marker_title1.style.opacity)?'inherit':'hidden';
			me._marker_title1.ggVisible=true;
		}
		me._wildside_beach_station.onmouseout=function (e) {
			me._marker_title1.style[domTransition]='none';
			me._marker_title1.style.visibility='hidden';
			me._marker_title1.ggVisible=false;
		}
		me._wildside_beach_station.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title1=document.createElement('div');
		els=me._marker_title1__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 18px;';
		hs+='left : -56px;';
		hs+='position : absolute;';
		hs+='top : 57px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Wildside Beach station";
		el.appendChild(els);
		me._marker_title1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title1.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((150-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._wildside_beach_station.appendChild(me._marker_title1);
		me._wildside_nodes.appendChild(me._wildside_beach_station);
		el=me._top_of_island=document.createElement('div');
		el.ggMarkerNodeId='{node24}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="Top of Island";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : -4px;';
		hs+='position : absolute;';
		hs+='top : 110px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._top_of_island.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._top_of_island.onclick=function (e) {
			player.openNext('{node24}');
		}
		me._top_of_island.onmouseover=function (e) {
			me._marker_title0.style[domTransition]='none';
			me._marker_title0.style.visibility=(Number(me._marker_title0.style.opacity)>0||!me._marker_title0.style.opacity)?'inherit':'hidden';
			me._marker_title0.ggVisible=true;
		}
		me._top_of_island.onmouseout=function (e) {
			me._marker_title0.style[domTransition]='none';
			me._marker_title0.style.visibility='hidden';
			me._marker_title0.ggVisible=false;
		}
		me._top_of_island.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title0=document.createElement('div');
		els=me._marker_title0__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 18px;';
		hs+='left : -56px;';
		hs+='position : absolute;';
		hs+='top : 57px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Top of Island";
		el.appendChild(els);
		me._marker_title0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title0.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((150-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._top_of_island.appendChild(me._marker_title0);
		me._wildside_nodes.appendChild(me._top_of_island);
		el=me._wildside_beach=document.createElement('div');
		el.ggMarkerNodeId='{node31}';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="Wildside Beach";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 269px;';
		hs+='position : absolute;';
		hs+='top : -32px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._wildside_beach.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') { // }
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._wildside_beach.onclick=function (e) {
			player.openNext('{node31}');
		}
		me._wildside_beach.onmouseover=function (e) {
			me._marker_title.style[domTransition]='none';
			me._marker_title.style.visibility=(Number(me._marker_title.style.opacity)>0||!me._marker_title.style.opacity)?'inherit':'hidden';
			me._marker_title.ggVisible=true;
		}
		me._wildside_beach.onmouseout=function (e) {
			me._marker_title.style[domTransition]='none';
			me._marker_title.style.visibility='hidden';
			me._marker_title.ggVisible=false;
		}
		me._wildside_beach.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title=document.createElement('div');
		els=me._marker_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 18px;';
		hs+='left : -56px;';
		hs+='position : absolute;';
		hs+='top : 57px;';
		hs+='visibility : hidden;';
		hs+='width : 148px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='background: rgba(255,255,255,0.705882);';
		hs+='border: 1px solid #000000;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Willdside Beach";
		el.appendChild(els);
		me._marker_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((150-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._wildside_beach.appendChild(me._marker_title);
		me._wildside_nodes.appendChild(me._wildside_beach);
		me._rockybeachpanomap.appendChild(me._wildside_nodes);
		me._container_1.appendChild(me._rockybeachpanomap);
		me.divSkin.appendChild(me._container_1);
		me._popup_video_file.ggVideoSource = 'media/';
		me._popup_video_file.ggVideoNotLoaded = true;
		me._popup_video_url.ggVideoSource = '';
		me._popup_video_url.ggVideoNotLoaded = true;
		me._popup_video_vimeo.ggVideoSource = '';
		me._popup_video_vimeo.ggVideoNotLoaded = true;
		me._popup_video_youtube.ggVideoSource = '';
		me._popup_video_youtube.ggVideoNotLoaded = true;
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._markertemplate);
		me._markertemplate__normal = clonedNormalElement._marker_normal;
		me._markertemplate__normal.style.visibility='inherit';
		me._markertemplate__normal.style.left='0px';
		me._markertemplate__normal.style.top='0px';
		me._markertemplate.ggMarkerNormal=me._markertemplate__normal;
		me._markertemplate.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._markertemplate);
		me._markertemplate__active= clonedActiveElement._marker_active;
		me._markertemplate__active.style.visibility='hidden';
		me._markertemplate__active.style.left='0px';
		me._markertemplate__active.style.top='0px';
		me._markertemplate.ggMarkerActive=me._markertemplate__active;
		me._markertemplate.ggMarkerInstances.push(clonedActiveElement);
		if (me._markertemplate.firstChild) {
			me._markertemplate.insertBefore(me._markertemplate__active,me._markertemplate.firstChild);
		} else {
			me._markertemplate.appendChild(me._markertemplate__active);
		}
		if (me._markertemplate.firstChild) {
			me._markertemplate.insertBefore(me._markertemplate__normal,me._markertemplate.firstChild);
		} else {
			me._markertemplate.appendChild(me._markertemplate__normal);
		}
		for (var i = 0; i < me._markertemplate.childNodes.length; i++) {
			me._markertemplate.ggMarkerInstances.push(me._markertemplate.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._clam_garden_marker_node);
		me._clam_garden_marker_node__normal = clonedNormalElement._marker_normal;
		me._clam_garden_marker_node__normal.style.visibility='inherit';
		me._clam_garden_marker_node__normal.style.left='0px';
		me._clam_garden_marker_node__normal.style.top='0px';
		me._clam_garden_marker_node.ggMarkerNormal=me._clam_garden_marker_node__normal;
		me._clam_garden_marker_node.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._clam_garden_marker_node);
		me._clam_garden_marker_node__active= clonedActiveElement._marker_active;
		me._clam_garden_marker_node__active.style.visibility='hidden';
		me._clam_garden_marker_node__active.style.left='0px';
		me._clam_garden_marker_node__active.style.top='0px';
		me._clam_garden_marker_node.ggMarkerActive=me._clam_garden_marker_node__active;
		me._clam_garden_marker_node.ggMarkerInstances.push(clonedActiveElement);
		if (me._clam_garden_marker_node.firstChild) {
			me._clam_garden_marker_node.insertBefore(me._clam_garden_marker_node__active,me._clam_garden_marker_node.firstChild);
		} else {
			me._clam_garden_marker_node.appendChild(me._clam_garden_marker_node__active);
		}
		if (me._clam_garden_marker_node.firstChild) {
			me._clam_garden_marker_node.insertBefore(me._clam_garden_marker_node__normal,me._clam_garden_marker_node.firstChild);
		} else {
			me._clam_garden_marker_node.appendChild(me._clam_garden_marker_node__normal);
		}
		for (var i = 0; i < me._clam_garden_marker_node.childNodes.length; i++) {
			me._clam_garden_marker_node.ggMarkerInstances.push(me._clam_garden_marker_node.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._office);
		me._office__normal = clonedNormalElement._marker_normal;
		me._office__normal.style.visibility='inherit';
		me._office__normal.style.left='0px';
		me._office__normal.style.top='0px';
		me._office.ggMarkerNormal=me._office__normal;
		me._office.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._office);
		me._office__active= clonedActiveElement._marker_active;
		me._office__active.style.visibility='hidden';
		me._office__active.style.left='0px';
		me._office__active.style.top='0px';
		me._office.ggMarkerActive=me._office__active;
		me._office.ggMarkerInstances.push(clonedActiveElement);
		if (me._office.firstChild) {
			me._office.insertBefore(me._office__active,me._office.firstChild);
		} else {
			me._office.appendChild(me._office__active);
		}
		if (me._office.firstChild) {
			me._office.insertBefore(me._office__normal,me._office.firstChild);
		} else {
			me._office.appendChild(me._office__normal);
		}
		for (var i = 0; i < me._office.childNodes.length; i++) {
			me._office.ggMarkerInstances.push(me._office.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._lecturetheatre_marker_node);
		me._lecturetheatre_marker_node__normal = clonedNormalElement._marker_normal;
		me._lecturetheatre_marker_node__normal.style.visibility='inherit';
		me._lecturetheatre_marker_node__normal.style.left='0px';
		me._lecturetheatre_marker_node__normal.style.top='0px';
		me._lecturetheatre_marker_node.ggMarkerNormal=me._lecturetheatre_marker_node__normal;
		me._lecturetheatre_marker_node.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._lecturetheatre_marker_node);
		me._lecturetheatre_marker_node__active= clonedActiveElement._marker_active;
		me._lecturetheatre_marker_node__active.style.visibility='hidden';
		me._lecturetheatre_marker_node__active.style.left='0px';
		me._lecturetheatre_marker_node__active.style.top='0px';
		me._lecturetheatre_marker_node.ggMarkerActive=me._lecturetheatre_marker_node__active;
		me._lecturetheatre_marker_node.ggMarkerInstances.push(clonedActiveElement);
		if (me._lecturetheatre_marker_node.firstChild) {
			me._lecturetheatre_marker_node.insertBefore(me._lecturetheatre_marker_node__active,me._lecturetheatre_marker_node.firstChild);
		} else {
			me._lecturetheatre_marker_node.appendChild(me._lecturetheatre_marker_node__active);
		}
		if (me._lecturetheatre_marker_node.firstChild) {
			me._lecturetheatre_marker_node.insertBefore(me._lecturetheatre_marker_node__normal,me._lecturetheatre_marker_node.firstChild);
		} else {
			me._lecturetheatre_marker_node.appendChild(me._lecturetheatre_marker_node__normal);
		}
		for (var i = 0; i < me._lecturetheatre_marker_node.childNodes.length; i++) {
			me._lecturetheatre_marker_node.ggMarkerInstances.push(me._lecturetheatre_marker_node.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._drylab_marker_node);
		me._drylab_marker_node__normal = clonedNormalElement._marker_normal;
		me._drylab_marker_node__normal.style.visibility='inherit';
		me._drylab_marker_node__normal.style.left='0px';
		me._drylab_marker_node__normal.style.top='0px';
		me._drylab_marker_node.ggMarkerNormal=me._drylab_marker_node__normal;
		me._drylab_marker_node.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._drylab_marker_node);
		me._drylab_marker_node__active= clonedActiveElement._marker_active;
		me._drylab_marker_node__active.style.visibility='hidden';
		me._drylab_marker_node__active.style.left='0px';
		me._drylab_marker_node__active.style.top='0px';
		me._drylab_marker_node.ggMarkerActive=me._drylab_marker_node__active;
		me._drylab_marker_node.ggMarkerInstances.push(clonedActiveElement);
		if (me._drylab_marker_node.firstChild) {
			me._drylab_marker_node.insertBefore(me._drylab_marker_node__active,me._drylab_marker_node.firstChild);
		} else {
			me._drylab_marker_node.appendChild(me._drylab_marker_node__active);
		}
		if (me._drylab_marker_node.firstChild) {
			me._drylab_marker_node.insertBefore(me._drylab_marker_node__normal,me._drylab_marker_node.firstChild);
		} else {
			me._drylab_marker_node.appendChild(me._drylab_marker_node__normal);
		}
		for (var i = 0; i < me._drylab_marker_node.childNodes.length; i++) {
			me._drylab_marker_node.ggMarkerInstances.push(me._drylab_marker_node.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._weblab_marker_node);
		me._weblab_marker_node__normal = clonedNormalElement._marker_normal;
		me._weblab_marker_node__normal.style.visibility='inherit';
		me._weblab_marker_node__normal.style.left='0px';
		me._weblab_marker_node__normal.style.top='0px';
		me._weblab_marker_node.ggMarkerNormal=me._weblab_marker_node__normal;
		me._weblab_marker_node.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._weblab_marker_node);
		me._weblab_marker_node__active= clonedActiveElement._marker_active;
		me._weblab_marker_node__active.style.visibility='hidden';
		me._weblab_marker_node__active.style.left='0px';
		me._weblab_marker_node__active.style.top='0px';
		me._weblab_marker_node.ggMarkerActive=me._weblab_marker_node__active;
		me._weblab_marker_node.ggMarkerInstances.push(clonedActiveElement);
		if (me._weblab_marker_node.firstChild) {
			me._weblab_marker_node.insertBefore(me._weblab_marker_node__active,me._weblab_marker_node.firstChild);
		} else {
			me._weblab_marker_node.appendChild(me._weblab_marker_node__active);
		}
		if (me._weblab_marker_node.firstChild) {
			me._weblab_marker_node.insertBefore(me._weblab_marker_node__normal,me._weblab_marker_node.firstChild);
		} else {
			me._weblab_marker_node.appendChild(me._weblab_marker_node__normal);
		}
		for (var i = 0; i < me._weblab_marker_node.childNodes.length; i++) {
			me._weblab_marker_node.ggMarkerInstances.push(me._weblab_marker_node.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._arrival_point);
		me._arrival_point__normal = clonedNormalElement._marker_normal;
		me._arrival_point__normal.style.visibility='inherit';
		me._arrival_point__normal.style.left='0px';
		me._arrival_point__normal.style.top='0px';
		me._arrival_point.ggMarkerNormal=me._arrival_point__normal;
		me._arrival_point.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._arrival_point);
		me._arrival_point__active= clonedActiveElement._marker_active;
		me._arrival_point__active.style.visibility='hidden';
		me._arrival_point__active.style.left='0px';
		me._arrival_point__active.style.top='0px';
		me._arrival_point.ggMarkerActive=me._arrival_point__active;
		me._arrival_point.ggMarkerInstances.push(clonedActiveElement);
		if (me._arrival_point.firstChild) {
			me._arrival_point.insertBefore(me._arrival_point__active,me._arrival_point.firstChild);
		} else {
			me._arrival_point.appendChild(me._arrival_point__active);
		}
		if (me._arrival_point.firstChild) {
			me._arrival_point.insertBefore(me._arrival_point__normal,me._arrival_point.firstChild);
		} else {
			me._arrival_point.appendChild(me._arrival_point__normal);
		}
		for (var i = 0; i < me._arrival_point.childNodes.length; i++) {
			me._arrival_point.ggMarkerInstances.push(me._arrival_point.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._havanna_marker_node);
		me._havanna_marker_node__normal = clonedNormalElement._marker_normal;
		me._havanna_marker_node__normal.style.visibility='inherit';
		me._havanna_marker_node__normal.style.left='0px';
		me._havanna_marker_node__normal.style.top='0px';
		me._havanna_marker_node.ggMarkerNormal=me._havanna_marker_node__normal;
		me._havanna_marker_node.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._havanna_marker_node);
		me._havanna_marker_node__active= clonedActiveElement._marker_active;
		me._havanna_marker_node__active.style.visibility='hidden';
		me._havanna_marker_node__active.style.left='0px';
		me._havanna_marker_node__active.style.top='0px';
		me._havanna_marker_node.ggMarkerActive=me._havanna_marker_node__active;
		me._havanna_marker_node.ggMarkerInstances.push(clonedActiveElement);
		if (me._havanna_marker_node.firstChild) {
			me._havanna_marker_node.insertBefore(me._havanna_marker_node__active,me._havanna_marker_node.firstChild);
		} else {
			me._havanna_marker_node.appendChild(me._havanna_marker_node__active);
		}
		if (me._havanna_marker_node.firstChild) {
			me._havanna_marker_node.insertBefore(me._havanna_marker_node__normal,me._havanna_marker_node.firstChild);
		} else {
			me._havanna_marker_node.appendChild(me._havanna_marker_node__normal);
		}
		for (var i = 0; i < me._havanna_marker_node.childNodes.length; i++) {
			me._havanna_marker_node.ggMarkerInstances.push(me._havanna_marker_node.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._pelorus_house);
		me._pelorus_house__normal = clonedNormalElement._marker_normal;
		me._pelorus_house__normal.style.visibility='inherit';
		me._pelorus_house__normal.style.left='0px';
		me._pelorus_house__normal.style.top='0px';
		me._pelorus_house.ggMarkerNormal=me._pelorus_house__normal;
		me._pelorus_house.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._pelorus_house);
		me._pelorus_house__active= clonedActiveElement._marker_active;
		me._pelorus_house__active.style.visibility='hidden';
		me._pelorus_house__active.style.left='0px';
		me._pelorus_house__active.style.top='0px';
		me._pelorus_house.ggMarkerActive=me._pelorus_house__active;
		me._pelorus_house.ggMarkerInstances.push(clonedActiveElement);
		if (me._pelorus_house.firstChild) {
			me._pelorus_house.insertBefore(me._pelorus_house__active,me._pelorus_house.firstChild);
		} else {
			me._pelorus_house.appendChild(me._pelorus_house__active);
		}
		if (me._pelorus_house.firstChild) {
			me._pelorus_house.insertBefore(me._pelorus_house__normal,me._pelorus_house.firstChild);
		} else {
			me._pelorus_house.appendChild(me._pelorus_house__normal);
		}
		for (var i = 0; i < me._pelorus_house.childNodes.length; i++) {
			me._pelorus_house.ggMarkerInstances.push(me._pelorus_house.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._thepoint_marker_node);
		me._thepoint_marker_node__normal = clonedNormalElement._marker_normal;
		me._thepoint_marker_node__normal.style.visibility='inherit';
		me._thepoint_marker_node__normal.style.left='0px';
		me._thepoint_marker_node__normal.style.top='0px';
		me._thepoint_marker_node.ggMarkerNormal=me._thepoint_marker_node__normal;
		me._thepoint_marker_node.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._thepoint_marker_node);
		me._thepoint_marker_node__active= clonedActiveElement._marker_active;
		me._thepoint_marker_node__active.style.visibility='hidden';
		me._thepoint_marker_node__active.style.left='0px';
		me._thepoint_marker_node__active.style.top='0px';
		me._thepoint_marker_node.ggMarkerActive=me._thepoint_marker_node__active;
		me._thepoint_marker_node.ggMarkerInstances.push(clonedActiveElement);
		if (me._thepoint_marker_node.firstChild) {
			me._thepoint_marker_node.insertBefore(me._thepoint_marker_node__active,me._thepoint_marker_node.firstChild);
		} else {
			me._thepoint_marker_node.appendChild(me._thepoint_marker_node__active);
		}
		if (me._thepoint_marker_node.firstChild) {
			me._thepoint_marker_node.insertBefore(me._thepoint_marker_node__normal,me._thepoint_marker_node.firstChild);
		} else {
			me._thepoint_marker_node.appendChild(me._thepoint_marker_node__normal);
		}
		for (var i = 0; i < me._thepoint_marker_node.childNodes.length; i++) {
			me._thepoint_marker_node.ggMarkerInstances.push(me._thepoint_marker_node.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._uw_cable);
		me._uw_cable__normal = clonedNormalElement._marker_normal;
		me._uw_cable__normal.style.visibility='inherit';
		me._uw_cable__normal.style.left='0px';
		me._uw_cable__normal.style.top='0px';
		me._uw_cable.ggMarkerNormal=me._uw_cable__normal;
		me._uw_cable.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._uw_cable);
		me._uw_cable__active= clonedActiveElement._marker_active;
		me._uw_cable__active.style.visibility='hidden';
		me._uw_cable__active.style.left='0px';
		me._uw_cable__active.style.top='0px';
		me._uw_cable.ggMarkerActive=me._uw_cable__active;
		me._uw_cable.ggMarkerInstances.push(clonedActiveElement);
		if (me._uw_cable.firstChild) {
			me._uw_cable.insertBefore(me._uw_cable__active,me._uw_cable.firstChild);
		} else {
			me._uw_cable.appendChild(me._uw_cable__active);
		}
		if (me._uw_cable.firstChild) {
			me._uw_cable.insertBefore(me._uw_cable__normal,me._uw_cable.firstChild);
		} else {
			me._uw_cable.appendChild(me._uw_cable__normal);
		}
		for (var i = 0; i < me._uw_cable.childNodes.length; i++) {
			me._uw_cable.ggMarkerInstances.push(me._uw_cable.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._wildside_shore_north);
		me._wildside_shore_north__normal = clonedNormalElement._marker_normal;
		me._wildside_shore_north__normal.style.visibility='inherit';
		me._wildside_shore_north__normal.style.left='0px';
		me._wildside_shore_north__normal.style.top='0px';
		me._wildside_shore_north.ggMarkerNormal=me._wildside_shore_north__normal;
		me._wildside_shore_north.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._wildside_shore_north);
		me._wildside_shore_north__active= clonedActiveElement._marker_active;
		me._wildside_shore_north__active.style.visibility='hidden';
		me._wildside_shore_north__active.style.left='0px';
		me._wildside_shore_north__active.style.top='0px';
		me._wildside_shore_north.ggMarkerActive=me._wildside_shore_north__active;
		me._wildside_shore_north.ggMarkerInstances.push(clonedActiveElement);
		if (me._wildside_shore_north.firstChild) {
			me._wildside_shore_north.insertBefore(me._wildside_shore_north__active,me._wildside_shore_north.firstChild);
		} else {
			me._wildside_shore_north.appendChild(me._wildside_shore_north__active);
		}
		if (me._wildside_shore_north.firstChild) {
			me._wildside_shore_north.insertBefore(me._wildside_shore_north__normal,me._wildside_shore_north.firstChild);
		} else {
			me._wildside_shore_north.appendChild(me._wildside_shore_north__normal);
		}
		for (var i = 0; i < me._wildside_shore_north.childNodes.length; i++) {
			me._wildside_shore_north.ggMarkerInstances.push(me._wildside_shore_north.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._wildside_beach_station);
		me._wildside_beach_station__normal = clonedNormalElement._marker_normal;
		me._wildside_beach_station__normal.style.visibility='inherit';
		me._wildside_beach_station__normal.style.left='0px';
		me._wildside_beach_station__normal.style.top='0px';
		me._wildside_beach_station.ggMarkerNormal=me._wildside_beach_station__normal;
		me._wildside_beach_station.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._wildside_beach_station);
		me._wildside_beach_station__active= clonedActiveElement._marker_active;
		me._wildside_beach_station__active.style.visibility='hidden';
		me._wildside_beach_station__active.style.left='0px';
		me._wildside_beach_station__active.style.top='0px';
		me._wildside_beach_station.ggMarkerActive=me._wildside_beach_station__active;
		me._wildside_beach_station.ggMarkerInstances.push(clonedActiveElement);
		if (me._wildside_beach_station.firstChild) {
			me._wildside_beach_station.insertBefore(me._wildside_beach_station__active,me._wildside_beach_station.firstChild);
		} else {
			me._wildside_beach_station.appendChild(me._wildside_beach_station__active);
		}
		if (me._wildside_beach_station.firstChild) {
			me._wildside_beach_station.insertBefore(me._wildside_beach_station__normal,me._wildside_beach_station.firstChild);
		} else {
			me._wildside_beach_station.appendChild(me._wildside_beach_station__normal);
		}
		for (var i = 0; i < me._wildside_beach_station.childNodes.length; i++) {
			me._wildside_beach_station.ggMarkerInstances.push(me._wildside_beach_station.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._top_of_island);
		me._top_of_island__normal = clonedNormalElement._marker_normal;
		me._top_of_island__normal.style.visibility='inherit';
		me._top_of_island__normal.style.left='0px';
		me._top_of_island__normal.style.top='0px';
		me._top_of_island.ggMarkerNormal=me._top_of_island__normal;
		me._top_of_island.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._top_of_island);
		me._top_of_island__active= clonedActiveElement._marker_active;
		me._top_of_island__active.style.visibility='hidden';
		me._top_of_island__active.style.left='0px';
		me._top_of_island__active.style.top='0px';
		me._top_of_island.ggMarkerActive=me._top_of_island__active;
		me._top_of_island.ggMarkerInstances.push(clonedActiveElement);
		if (me._top_of_island.firstChild) {
			me._top_of_island.insertBefore(me._top_of_island__active,me._top_of_island.firstChild);
		} else {
			me._top_of_island.appendChild(me._top_of_island__active);
		}
		if (me._top_of_island.firstChild) {
			me._top_of_island.insertBefore(me._top_of_island__normal,me._top_of_island.firstChild);
		} else {
			me._top_of_island.appendChild(me._top_of_island__normal);
		}
		for (var i = 0; i < me._top_of_island.childNodes.length; i++) {
			me._top_of_island.ggMarkerInstances.push(me._top_of_island.childNodes[i]);
		}
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._wildside_beach);
		me._wildside_beach__normal = clonedNormalElement._marker_normal;
		me._wildside_beach__normal.style.visibility='inherit';
		me._wildside_beach__normal.style.left='0px';
		me._wildside_beach__normal.style.top='0px';
		me._wildside_beach.ggMarkerNormal=me._wildside_beach__normal;
		me._wildside_beach.ggMarkerInstances.push(clonedNormalElement);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._wildside_beach);
		me._wildside_beach__active= clonedActiveElement._marker_active;
		me._wildside_beach__active.style.visibility='hidden';
		me._wildside_beach__active.style.left='0px';
		me._wildside_beach__active.style.top='0px';
		me._wildside_beach.ggMarkerActive=me._wildside_beach__active;
		me._wildside_beach.ggMarkerInstances.push(clonedActiveElement);
		if (me._wildside_beach.firstChild) {
			me._wildside_beach.insertBefore(me._wildside_beach__active,me._wildside_beach.firstChild);
		} else {
			me._wildside_beach.appendChild(me._wildside_beach__active);
		}
		if (me._wildside_beach.firstChild) {
			me._wildside_beach.insertBefore(me._wildside_beach__normal,me._wildside_beach.firstChild);
		} else {
			me._wildside_beach.appendChild(me._wildside_beach__normal);
		}
		for (var i = 0; i < me._wildside_beach.childNodes.length; i++) {
			me._wildside_beach.ggMarkerInstances.push(me._wildside_beach.childNodes[i]);
		}
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
		player.addListener('imagesready', function() {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility='hidden';
			me._loading.ggVisible=false;
		});
		player.addListener('beforechangenode', function() {
			me._loading.style[domTransition]='none';
			me._loading.style.visibility=(Number(me._loading.style.opacity)>0||!me._loading.style.opacity)?'inherit':'hidden';
			me._loading.ggVisible=true;
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	me.callChildLogicBlocksHotspot_ht_node_mouseover = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hotspot_preview && hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hotspot_preview.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_active = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._checkmark_tick && hotspotTemplates['ht_node'][i]._checkmark_tick.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._checkmark_tick.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_changevisitednodes = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._checkmark_tick && hotspotTemplates['ht_node'][i]._checkmark_tick.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._checkmark_tick.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_url_mouseover = function(){
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				if (hotspotTemplates['ht_url'][i]._tt_ht_url && hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible) {
					hotspotTemplates['ht_url'][i]._tt_ht_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_info_mouseover = function(){
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				if (hotspotTemplates['ht_info'][i]._tt_information && hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible) {
					hotspotTemplates['ht_info'][i]._tt_information.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_image_mouseover = function(){
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				if (hotspotTemplates['ht_image'][i]._tt_ht_image && hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible) {
					hotspotTemplates['ht_image'][i]._tt_ht_image.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_file_mouseover = function(){
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				if (hotspotTemplates['ht_video_file'][i]._tt_ht_video_file && hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible) {
					hotspotTemplates['ht_video_file'][i]._tt_ht_video_file.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_url_mouseover = function(){
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				if (hotspotTemplates['ht_video_url'][i]._tt_ht_video_url && hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible) {
					hotspotTemplates['ht_video_url'][i]._tt_ht_video_url.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_vimeo_mouseover = function(){
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				if (hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo && hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible) {
					hotspotTemplates['ht_video_vimeo'][i]._tt_ht_video_vimeo.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover = function(){
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				if (hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube && hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible) {
					hotspotTemplates['ht_video_youtube'][i]._tt_ht_video_youtube.logicBlock_visible();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
		var newMarker=[];
		var id=player.getCurrentNode();
		var i,j;
		var tags=me.ggUserdata.tags;
		for (i=0;i<nodeMarker.length;i++) {
			var match=false;
			if ((nodeMarker[i].ggMarkerNodeId.length > 0) && (nodeMarker[i].ggMarkerNodeId.charAt(0)=='{') && (nodeMarker[i].ggMarkerNodeId.substr(1, nodeMarker[i].ggMarkerNodeId.length - 2)==id) && (id!='')) match=true;  // }
			for(j=0;j<tags.length;j++) {
				if (nodeMarker[i].ggMarkerNodeId==tags[j]) match=true;
			}
			if (match) {
				newMarker.push(nodeMarker[i]);
			}
		}
		for(i=0;i<activeNodeMarker.length;i++) {
			if (newMarker.indexOf(activeNodeMarker[i])<0) {
				if (activeNodeMarker[i].ggMarkerNormal) {
					activeNodeMarker[i].ggMarkerNormal.style.visibility='inherit';
				}
				if (activeNodeMarker[i].ggMarkerActive) {
					activeNodeMarker[i].ggMarkerActive.style.visibility='hidden';
				}
				if (activeNodeMarker[i].ggDeactivate) {
					activeNodeMarker[i].ggDeactivate();
				}
				activeNodeMarker[i].ggIsMarkerActive=false;
			}
		}
		for(i=0;i<newMarker.length;i++) {
			if (activeNodeMarker.indexOf(newMarker[i])<0) {
				if (newMarker[i].ggMarkerNormal) {
					newMarker[i].ggMarkerNormal.style.visibility='hidden';
				}
				if (newMarker[i].ggMarkerActive) {
					newMarker[i].ggMarkerActive.style.visibility='inherit';
				}
				if (newMarker[i].ggActivate) {
					newMarker[i].ggActivate();
				}
				newMarker[i].ggIsMarkerActive=true;
			}
		}
		activeNodeMarker=newMarker;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		if (me.elementMouseDown['zoomout']) {
			player.changeFovLog(1,true);
		}
		if (me.elementMouseDown['zoomin']) {
			player.changeFovLog(-1,true);
		}
		var hs='';
		if (me._loadingbar.ggParameter) {
			hs+=parameterToTransform(me._loadingbar.ggParameter) + ' ';
		}
		hs+='scale(' + (1 * player.getPercentLoaded() + 0) + ',1.0) ';
		me._loadingbar.style[domTransform]=hs;
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node=document.createElement('div');
		el.ggId="ht_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 100px;';
		hs+='position : absolute;';
		hs+='top : 140px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.onclick=function (e) {
			player.openNext(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			me._hotspot_preview.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node']=false;
			me._hotspot_preview.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ontouchend=function (e) {
			me.elementMouseOver['ht_node']=false;
			me._hotspot_preview.logicBlock_visible();
		}
		me._ht_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_node_title_text=document.createElement('div');
		els=me._ht_node_title_text__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="ht_node_title_Text";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 15px;';
		hs+='left : -45px;';
		hs+='position : absolute;';
		hs+='top : 34px;';
		hs+='visibility : inherit;';
		hs+='width : 80px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #ffffff;';
		hs+='border: 0px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._ht_node_title_text.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._ht_node_title_text.ggUpdateText();
		player.addListener('changenode', function() {
			me._ht_node_title_text.ggUpdateText();
		});
		el.appendChild(els);
		me._ht_node_title_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_title_text.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((78-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_node.appendChild(me._ht_node_title_text);
		el=me._ht_node_image=document.createElement('div');
		els=me._ht_node_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KPHN2ZyB4PSIwcHgiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0NjIuNTMyMDEiIGlkPSJDYXBhXzEiIHNvZGlwb2RpOmRvY25hbWU9Im'+
			'NoZXZyb24tb3V0bGluZS1ibHVlLW5vcnRoLnN2ZyIgdmlld0JveD0iMCAwIDQ2Mi41MzIwMiA0NjIuNTM0MDEiIGlua3NjYXBlOnZlcnNpb249IjAuOTIuMiA1YzNlODBkLCAyMDE3LTA4LTA2IiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB5PSIwcHgiIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDYyLjUzNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1s'+
			'bnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KIDxtZXRhZGF0YSBpZD0ibWV0YWRhdGE0MSI+CiAgPHJkZjpSREY+CiAgIDxjYzpXb3JrIHJkZjphYm91dD0iIj4KICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgPGRjOnR5cGUgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIvPgogICAgPGRjOnRpdGxlLz4KICAgPC9jYzpXb3JrPgogIDwvcmRmOlJERj4KIDwvbWV0YWRhdGE+CiA8ZGVmcyBpZD0iZGVmczM5Ii8+CiA8c29kaXBvZGk6bmFtZWR2aWV3IGlua3NjYXBlOn'+
			'BhZ2VzaGFkb3c9IjIiIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9IkNhcGFfMSIgb2JqZWN0dG9sZXJhbmNlPSIxMCIgaW5rc2NhcGU6em9vbT0iMC41MzgxNTc5MiIgaW5rc2NhcGU6d2luZG93LXk9IjY1IiBmaXQtbWFyZ2luLXJpZ2h0PSIwIiBpbmtzY2FwZTp3aW5kb3cteD0iMjAwIiBncmlkdG9sZXJhbmNlPSIxMCIgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxNTY2IiBpZD0ibmFtZWR2aWV3MzciIGJvcmRlcmNvbG9yPSIjNjY2NjY2IiBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIiBpbmtzY2FwZTpjeD0iLTI3Ljk1MTA5OSIgZml0LW1hcmdpbi1ib3R0b209IjAiIGJvcmRlcm9wYWNp'+
			'dHk9IjEiIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIiBzaG93Z3JpZD0iZmFsc2UiIGd1aWRldG9sZXJhbmNlPSIxMCIgZml0LW1hcmdpbi1sZWZ0PSIwIiBmaXQtbWFyZ2luLXRvcD0iMCIgcGFnZWNvbG9yPSIjZmZmZmZmIiBpbmtzY2FwZTpjeT0iMjMxLjI2NzUiIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc5MCIvPgogPGcgc3R5bGU9ImZpbGw6IzAwN2JiNztmaWxsLW9wYWNpdHk6MTtzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MjQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgaWQ9Imc0IiB0cmFuc2Zvcm09InRyYW5zbG'+
			'F0ZSgxMiwxMikiPgogIDxwYXRoIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIGQ9Ik0gNDA5LjEzMywxMDkuMjAzIEMgMzg5LjUyNSw3NS42MTEgMzYyLjkyOCw0OS4wMTQgMzI5LjMzNSwyOS40MDcgMjk1LjczNiw5LjgwMSAyNTkuMDU4LDAgMjE5LjI3MywwIDE3OS40OTIsMCAxNDIuODAzLDkuODAxIDEwOS4yMSwyOS40MDcgNzUuNjE1LDQ5LjAxMSA0OS4wMTgsNzUuNjA4IDI5LjQxLDEwOS4yMDMgOS44MDEsMTQyLjggMCwxNzkuNDg5IDAsMjE5LjI2NyBjIDAsMzkuNzggOS44MDQsNzYuNDYzIDI5LjQwNywxMTAuMDYyIDE5LjYwNywzMy41OTIgNDYuMjA0LDYwLjE4OSA3OS43'+
			'OTksNzkuNzk4IDMzLjU5NywxOS42MDUgNzAuMjgzLDI5LjQwNyAxMTAuMDYzLDI5LjQwNyAzOS43OCwwIDc2LjQ3LC05LjgwMiAxMTAuMDY1LC0yOS40MDcgMzMuNTkzLC0xOS42MDIgNjAuMTg5LC00Ni4yMDYgNzkuNzk1LC03OS43OTggMTkuNjAzLC0zMy41OTYgMjkuNDAzLC03MC4yODQgMjkuNDAzLC0xMTAuMDYyIDAuMDAxLC0zOS43ODIgLTkuOCwtNzYuNDcyIC0yOS4zOTksLTExMC4wNjQgeiBtIC00Ny4zOTMsMTUwLjMxNCAtMjkuMTIzLDI5LjEyOSBjIC0zLjYyMSwzLjYxNCAtNy45MDEsNS40MjQgLTEyLjg0Nyw1LjQyNCAtNC45NDgsMCAtOS4yMzYsLTEuODEgLTEyLjg0NywtNS40Mj'+
			'QgbCAtODcuNjU0LC04Ny42NTMgLTg3LjY0Niw4Ny42NTMgYyAtMy42MTYsMy42MTQgLTcuODk4LDUuNDI0IC0xMi44NDcsNS40MjQgLTQuOTUsMCAtOS4yMzMsLTEuODEgLTEyLjg1LC01LjQyNCBsIC0yOS4xMiwtMjkuMTI5IGMgLTMuNjE3LC0zLjYwNyAtNS40MjYsLTcuODk4IC01LjQyNiwtMTIuODQ3IDAsLTQuOTQyIDEuODA5LC05LjIyNyA1LjQyNiwtMTIuODQ4IGwgMTI5LjYyLC0xMjkuNjE2IGMgMy42MTcsLTMuNjE3IDcuODk4LC01LjQyNCAxMi44NDcsLTUuNDI0IDQuOTQ5LDAgOS4yMzgsMS44MDcgMTIuODQ2LDUuNDI0IEwgMzYxLjc0LDIzMy44MjIgYyAzLjYxMywzLjYyMSA1LjQy'+
			'NCw3LjkwNSA1LjQyNCwxMi44NDggMCw0Ljk0OCAtMS44MDcsOS4yMzkgLTUuNDI0LDEyLjg0NyB6IiBzdHlsZT0iZmlsbDojMDA3YmI3O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDoyNDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiBpZD0icGF0aDIiLz4KIDwvZz4KIDxnIGlkPSJnNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIsMTIpIi8+CiA8ZyBpZD0iZzgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLDEyKSIvPgogPGcgaWQ9ImcxMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIsMTIpIi8+CiA8Zy'+
			'BpZD0iZzEyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMiwxMikiLz4KIDxnIGlkPSJnMTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLDEyKSIvPgogPGcgaWQ9ImcxNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIsMTIpIi8+CiA8ZyBpZD0iZzE4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMiwxMikiLz4KIDxnIGlkPSJnMjAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLDEyKSIvPgogPGcgaWQ9ImcyMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIsMTIpIi8+CiA8ZyBpZD0iZzI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMiwxMikiLz4KIDxnIGlkPSJnMjYiIHRyYW5zZm9ybT0idHJhbnNsYXRl'+
			'KDEyLDEyKSIvPgogPGcgaWQ9ImcyOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIsMTIpIi8+CiA8ZyBpZD0iZzMwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMiwxMikiLz4KIDxnIGlkPSJnMzIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLDEyKSIvPgogPGcgaWQ9ImczNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIsMTIpIi8+Cjwvc3ZnPgo=';
		me._ht_node_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_node_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 50px;';
		hs+='left : -31px;';
		hs+='position : absolute;';
		hs+='top : -27px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_image.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.appendChild(me._ht_node_image);
		el=me._hotspot_preview=document.createElement('div');
		el.ggId="hotspot_preview";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 100px;';
		hs+='left : -75px;';
		hs+='position : absolute;';
		hs+='top : -130px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_preview.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hotspot_preview.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hotspot_preview.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hotspot_preview.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hotspot_preview.style[domTransition]='';
				if (me._hotspot_preview.ggCurrentLogicStateVisible == 0) {
					me._hotspot_preview.style.visibility=(Number(me._hotspot_preview.style.opacity)>0||!me._hotspot_preview.style.opacity)?'inherit':'hidden';
					me._hotspot_preview.ggVisible=true;
				}
				else {
					me._hotspot_preview.style.visibility="hidden";
					me._hotspot_preview.ggVisible=false;
				}
			}
		}
		me._hotspot_preview.ggUpdatePosition=function (useTransition) {
		}
		el=me._preview_picture_frame_=document.createElement('div');
		el.ggId="preview_picture_frame ";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.666667);';
		hs+='border : 0px solid #000000;';
		hs+='cursor : default;';
		hs+='height : 100px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 150px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_picture_frame_.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._preview_picture_frame_.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview.appendChild(me._preview_picture_frame_);
		el=me._preview_nodeimage=document.createElement('div');
		els=me._preview_nodeimage__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/preview_nodeimage_" + nodeId + ".png");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Preview NodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._preview_nodeimage.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._preview_nodeimage.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview.appendChild(me._preview_nodeimage);
		el=me._tooltip=document.createElement('div');
		els=me._tooltip__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tooltip";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 4px;';
		hs+='position : absolute;';
		hs+='top : 76px;';
		hs+='visibility : inherit;';
		hs+='width : 142px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tooltip.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tooltip.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((140-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._hotspot_preview.appendChild(me._tooltip);
		el=me._checkmark_tick=document.createElement('div');
		els=me._checkmark_tick__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtMjQwIDMzMiAxMzAgMTMwOyIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bW'+
			'w6c3BhY2U9InByZXNlcnZlIj4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXog'+
			'TS0xMzIuOCwzODEuN2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIvPgogIDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy'+
			'0yLjQsMGwtMTIuNSwxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIvPgogPC9nPgo8L3N2Zz4K';
		me._checkmark_tick__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 123px;';
		hs+='position : absolute;';
		hs+='top : 7px;';
		hs+='visibility : hidden;';
		hs+='width : 20px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._checkmark_tick.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick.ggElementNodeId()) == true)) || 
				((me._checkmark_tick.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick.style[domTransition]='';
				if (me._checkmark_tick.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick.style.visibility=(Number(me._checkmark_tick.style.opacity)>0||!me._checkmark_tick.style.opacity)?'inherit':'hidden';
					me._checkmark_tick.ggVisible=true;
				}
				else {
					me._checkmark_tick.style.visibility="hidden";
					me._checkmark_tick.ggVisible=false;
				}
			}
		}
		me._checkmark_tick.ggUpdatePosition=function (useTransition) {
		}
		me._hotspot_preview.appendChild(me._checkmark_tick);
		me._ht_node.appendChild(me._hotspot_preview);
		me.__div = me._ht_node;
	};
	function SkinHotspotClass_ht_url(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_url=document.createElement('div');
		el.ggId="ht_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_url.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_url.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_url.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_url.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_url']=true;
			me._tt_ht_url.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_url.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_url']=false;
			me._tt_ht_url.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_url.ontouchend=function (e) {
			me.elementMouseOver['ht_url']=false;
			me._tt_ht_url.logicBlock_visible();
		}
		me._ht_url.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_url_image=document.createElement('div');
		els=me._ht_url_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTkwLjgsNDE0LjNoMTMuN3YtMTVoLTE2LjNDLTE5My4zLDQwNC43LTE5Mi4zLDQwOS44LTE5MC44LDQxNC4zeiIgZmlsbD0iIzAwMDAwMCIvPgogICA8cGF0aCBkPSJNLTE5My41LDM5NC43aDE2LjN2LTE1aC0xMy43Qy0xOTIuMywzODQuMi0xOTMuMywzODkuMy0xOTMuNSwzOTQuN3oiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0xODkuMSwzNzUuMmgxMS45di0xMS45Qy0xODEuOSwzNjQuNC0xODYuMSwzNjguOC0xODkuMSwzNzUuMnoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNzcuMiw0MzAuN3YtMTEuOWgt'+
			'MTEuOUMtMTg2LjEsNDI1LjItMTgxLjksNDI5LjYtMTc3LjIsNDMwLjd6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTk1LjYsMzc5LjdoLTguNWMtMi42LDQuNS00LjMsOS42LTQuNiwxNWgxMC44Qy0xOTcuOCwzODkuMy0xOTcsMzg0LjMtMTk1LjYsMzc5Ljd6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTQ4LjksMzc1LjJjLTMuMy00LTcuNi03LjItMTIuNC05LjNjMi4xLDIuNiwzLjksNS43LDUuNCw5LjNILTE0OC45eiIgZmlsbD0iIzAwMDAwMCIvPgogICA8cGF0aCBkPSJNLTIwMC45LDQxOC44YzMuMywzLjksNy40LDcuMSwxMi4xLDkuMmMtMi4xLTIuNS0zLj'+
			'gtNS42LTUuMy05LjJILTIwMC45eiIgZmlsbD0iIzAwMDAwMCIvPgogICA8cGF0aCBkPSJNLTE4OC44LDM2NmMtNC43LDIuMS04LjksNS4zLTEyLjIsOS4yaDYuOUMtMTkyLjYsMzcxLjctMTkwLjksMzY4LjYtMTg4LjgsMzY2eiIgZmlsbD0iIzAwMDAwMCIvPgogICA8cGF0aCBkPSJNLTE5OCwzOTkuMmgtMTAuOGMwLjQsNS41LDIsMTAuNiw0LjcsMTVoOC41Qy0xOTcsNDA5LjctMTk3LjgsNDA0LjctMTk4LDM5OS4yeiIgZmlsbD0iIzAwMDAwMCIvPgogICA8cGF0aCBkPSJNLTE3NSwzNDAuOWMtMzEsMC01Ni4xLDI1LjEtNTYuMSw1Ni4xczI1LjEsNTYuMSw1Ni4xLDU2LjFzNTYuMS0yNS4xLDU2'+
			'LjEtNTYuMVMtMTQ0LDM0MC45LTE3NSwzNDAuOXomI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7IE0tMTc0LjksNDM1LjRjMCwwLTAuMSwwLTAuMSwwYy0wLjEsMC0wLjIsMC0wLjQsMGMtMjEtMC4yLTM4LTE3LjQtMzgtMzguNGMwLTIxLjIsMTcuMi0zOC40LDM4LjQtMzguNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMjEuMiwwLDM4LjQsMTcuMiwzOC40LDM4LjRDLTEzNi41LDQxOC4yLTE1My43LDQzNS40LTE3NC45LDQzNS40eiIgZmlsbD0iIzAwMDAwMCIvPgogICA8cGF0aCBkPSJNLTE2MS4zLDQyOC4xYzQuOC0yLjEsOS01LjMsMTIuNC05LjNoLTdDLTE1Ny40LDQyMi40LTE1OS4yLDQyNS'+
			'41LTE2MS4zLDQyOC4xeiIgZmlsbD0iIzAwMDAwMCIvPgogICA8cGF0aCBkPSJNLTE1NC40LDQxNC4zaDguNmMyLjctNC41LDQuMy05LjYsNC43LTE1aC0xMUMtMTUyLjIsNDA0LjctMTUzLDQwOS43LTE1NC40LDQxNC4zeiIgZmlsbD0iIzAwMDAwMCIvPgogICA8cGF0aCBkPSJNLTE3Mi43LDM2My4zdjExLjloMTEuN0MtMTYzLjksMzY4LjktMTY4LDM2NC41LTE3Mi43LDM2My4zeiIgZmlsbD0iIzAwMDAwMCIvPgogICA8cGF0aCBkPSJNLTE1MiwzOTQuN2gxMWMtMC40LTUuNS0yLTEwLjYtNC43LTE1aC04LjZDLTE1MywzODQuMy0xNTIuMiwzODkuMy0xNTIsMzk0Ljd6IiBmaWxsPSIjMDAwMDAw'+
			'Ii8+CiAgIDxwYXRoIGQ9Ik0tMTcyLjcsNDE4Ljh2MTEuOWM0LjYtMS4xLDguOC01LjUsMTEuNy0xMS45Qy0xNjAuOSw0MTguOC0xNzIuNyw0MTguOC0xNzIuNyw0MTguOHoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNTkuMiwzNzkuN2gtMTMuNXYxNWgxNi4xQy0xNTYuNywzODkuMy0xNTcuNywzODQuMi0xNTkuMiwzNzkuN3oiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNTYuNSwzOTkuMmgtMTYuMXYxNWgxMy41Qy0xNTcuNyw0MDkuOC0xNTYuNyw0MDQuNy0xNTYuNSwzOTkuMnoiIGZpbGw9IiMwMDAwMDAiLz4KICA8L2c+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMi'+
			'I+CiAgPHBhdGggZD0iTS0xMzYuNSwzOTdjMC0yMS4yLTE3LjItMzguNC0zOC40LTM4LjRjLTIxLjIsMC0zOC40LDE3LjItMzguNCwzOC40YzAsMjEuMSwxNywzOC4yLDM4LDM4LjQmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLjEsMCwwLjIsMCwwLjQsMGMwLDAsMC4xLDAsMC4xLDBDLTE1My43LDQzNS40LTEzNi41LDQxOC4yLTEzNi41LDM5N3ogTS0yMDguOCwzOTkuMmgxMC44YzAuMiw1LjQsMSwxMC41LDIuMywxNWgtOC41JiN4ZDsmI3hhOyYjeDk7JiN4OTtDLTIwNi44LDQwOS44LTIwOC40LDQwNC43LTIwOC44LDM5OS4yeiBNLTE0MS4xLDM5NC43aC0xMWMtMC4yLTUuNC0xLTEwLjUtMi4zLTE1'+
			'aDguNkMtMTQzLjEsMzg0LjItMTQxLjQsMzg5LjMtMTQxLjEsMzk0Ljd6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTS0xNTYuNSwzOTQuN2gtMTYuMXYtMTVoMTMuNUMtMTU3LjcsMzg0LjItMTU2LjcsMzg5LjMtMTU2LjUsMzk0Ljd6IE0tMTcyLjcsMzc1LjJ2LTExLjljNC42LDEuMSw4LjgsNS41LDExLjcsMTEuOUwtMTcyLjcsMzc1LjImI3hkOyYjeGE7JiN4OTsmI3g5O0wtMTcyLjcsMzc1LjJ6IE0tMTc3LjIsMzYzLjN2MTEuOWgtMTEuOUMtMTg2LjEsMzY4LjgtMTgxLjksMzY0LjQtMTc3LjIsMzYzLjN6IE0tMTc3LjIsMzc5Ljd2MTVoLTE2LjNjMC4yLTUuNCwxLjEtMTAuNSwyLjYtMTUmI3hkOy'+
			'YjeGE7JiN4OTsmI3g5O0wtMTc3LjIsMzc5LjdMLTE3Ny4yLDM3OS43eiBNLTE5OCwzOTQuN2gtMTAuOGMwLjQtNS41LDItMTAuNiw0LjYtMTVoOC41Qy0xOTcsMzg0LjMtMTk3LjgsMzg5LjMtMTk4LDM5NC43eiBNLTE5My41LDM5OS4yaDE2LjMmI3hkOyYjeGE7JiN4OTsmI3g5O3YxNWgtMTMuN0MtMTkyLjMsNDA5LjgtMTkzLjMsNDA0LjctMTkzLjUsMzk5LjJ6IE0tMTc3LjIsNDE4Ljh2MTEuOWMtNC43LTEuMS04LjktNS41LTExLjktMTEuOUgtMTc3LjJ6IE0tMTcyLjcsNDMwLjZ2LTExLjloMTEuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xNjMuOSw0MjUuMS0xNjgsNDI5LjUtMTcyLjcsNDMw'+
			'LjZ6IE0tMTcyLjcsNDE0LjN2LTE1aDE2LjFjLTAuMiw1LjQtMS4xLDEwLjYtMi42LDE1SC0xNzIuN3ogTS0xNTIsMzk5LjJoMTEmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC40LDUuNS0yLDEwLjYtNC43LDE1aC04LjZDLTE1Myw0MDkuNy0xNTIuMiw0MDQuNy0xNTIsMzk5LjJ6IE0tMTQ4LjksMzc1LjJoLTdjLTEuNS0zLjYtMy4zLTYuOC01LjQtOS4zJiN4ZDsmI3hhOyYjeDk7JiN4OTtDLTE1Ni41LDM2OC0xNTIuMiwzNzEuMi0xNDguOSwzNzUuMnogTS0xODguOCwzNjZjLTIuMSwyLjUtMy44LDUuNy01LjMsOS4yaC02LjlDLTE5Ny43LDM3MS4zLTE5My41LDM2OC4xLTE4OC44LDM2NnomI3hkOy'+
			'YjeGE7JiN4OTsmI3g5OyBNLTIwMC45LDQxOC44aDYuOWMxLjQsMy41LDMuMiw2LjYsNS4zLDkuMkMtMTkzLjUsNDI1LjgtMTk3LjYsNDIyLjctMjAwLjksNDE4Ljh6IE0tMTYxLjMsNDI4LjFjMi4xLTIuNiwzLjktNS43LDUuNC05LjNoNyYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xNTIuMyw0MjIuNy0xNTYuNSw0MjUuOS0xNjEuMyw0MjguMXoiIGZpbGw9IiNGRkZGRkYiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_url_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_url_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTkyLjYsNDE2LjJoMTUuMnYtMTYuN2gtMTguMUMtMTk1LjMsNDA1LjUtMTk0LjIsNDExLjItMTkyLjYsNDE2LjJ6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTk1LjUsMzk0LjVoMTguMXYtMTYuN2gtMTUuMkMtMTk0LjMsMzgyLjgtMTk1LjMsMzg4LjUtMTk1LjUsMzk0LjV6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTkwLjYsMzcyLjhoMTMuMnYtMTMuMkMtMTgyLjYsMzYwLjctMTg3LjMsMzY1LjctMTkwLjYsMzcyLjh6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTc3LjQsNDM0LjR2LTEz'+
			'LjJoLTEzLjJDLTE4Ny4zLDQyOC4zLTE4Mi42LDQzMy4yLTE3Ny40LDQzNC40eiIgZmlsbD0iIzAwMDAwMCIvPgogICA8cGF0aCBkPSJNLTE5Ny45LDM3Ny44aC05LjRjLTIuOSw0LjktNC44LDEwLjYtNS4yLDE2LjdoMTJDLTIwMC4zLDM4OC41LTE5OS40LDM4Mi44LTE5Ny45LDM3Ny44eiIgZmlsbD0iIzAwMDAwMCIvPgogICA8cGF0aCBkPSJNLTE0NiwzNzIuOGMtMy43LTQuNC04LjQtOC0xMy44LTEwLjRjMi4zLDIuOCw0LjQsNi4zLDYsMTAuNEgtMTQ2eiIgZmlsbD0iIzAwMDAwMCIvPgogICA8cGF0aCBkPSJNLTIwMy44LDQyMS4yYzMuNiw0LjMsOC4yLDcuOCwxMy41LDEwLjJjLTIuMy0yLj'+
			'gtNC4zLTYuMy01LjgtMTAuMkgtMjAzLjh6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTkwLjMsMzYyLjZjLTUuMiwyLjQtOS45LDUuOS0xMy41LDEwLjJoNy42Qy0xOTQuNiwzNjguOS0xOTIuNiwzNjUuNC0xOTAuMywzNjIuNnoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0yMDAuNSwzOTkuNWgtMTJjMC40LDYuMSwyLjIsMTEuOCw1LjIsMTYuN2g5LjRDLTE5OS40LDQxMS4xLTIwMC4zLDQwNS41LTIwMC41LDM5OS41eiIgZmlsbD0iIzAwMDAwMCIvPgogICA8cGF0aCBkPSJNLTE3NSwzMzQuNmMtMzQuNCwwLTYyLjQsMjcuOS02Mi40LDYyLjRzMjcuOSw2Mi40LDYy'+
			'LjQsNjIuNHM2Mi40LTI3LjksNjIuNC02Mi40Uy0xNDAuNiwzMzQuNi0xNzUsMzM0LjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7eiBNLTE3NC45LDQzOS43YzAsMC0wLjEsMC0wLjEsMGMtMC4xLDAtMC4zLDAtMC40LDBjLTIzLjMtMC4zLTQyLjItMTkuMy00Mi4yLTQyLjdjMC0yMy42LDE5LjItNDIuNyw0Mi43LTQyLjcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzIzLjYsMCw0Mi43LDE5LjIsNDIuNyw0Mi43Qy0xMzIuMiw0MjAuNS0xNTEuMyw0MzkuNy0xNzQuOSw0MzkuN3oiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNTkuOCw0MzEuNWM1LjMtMi40LDEwLTUuOSwxMy43LT'+
			'EwLjNoLTcuOEMtMTU1LjQsNDI1LjItMTU3LjUsNDI4LjctMTU5LjgsNDMxLjV6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTUyLjEsNDE2LjJoOS42YzMtNSw0LjgtMTAuNiw1LjItMTYuN2gtMTIuMkMtMTQ5LjcsNDA1LjUtMTUwLjYsNDExLjEtMTUyLjEsNDE2LjJ6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTcyLjQsMzU5LjZ2MTMuMmgxM0MtMTYyLjYsMzY1LjctMTY3LjMsMzYwLjgtMTcyLjQsMzU5LjZ6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTQ5LjUsMzk0LjVoMTIuMmMtMC40LTYuMS0yLjItMTEuNy01LjItMTYuN2gtOS42Qy0xNTAu'+
			'NiwzODIuOC0xNDkuNywzODguNS0xNDkuNSwzOTQuNXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNzIuNCw0MjEuMnYxMy4yYzUuMS0xLjIsOS44LTYuMSwxMy0xMy4yQy0xNTkuNCw0MjEuMi0xNzIuNCw0MjEuMi0xNzIuNCw0MjEuMnoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNTcuNCwzNzcuOGgtMTV2MTYuN2gxNy45Qy0xNTQuNywzODguNS0xNTUuOCwzODIuOC0xNTcuNCwzNzcuOHoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNTQuNSwzOTkuNWgtMTcuOXYxNi43aDE1Qy0xNTUuOCw0MTEuMi0xNTQuNyw0MDUuNS0xNTQuNSwzOTkuNXoiIG'+
			'ZpbGw9IiMwMDAwMDAiLz4KICA8L2c+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPHBhdGggZD0iTS0xMzIuMiwzOTdjMC0yMy42LTE5LjItNDIuNy00Mi43LTQyLjdjLTIzLjYsMC00Mi43LDE5LjItNDIuNyw0Mi43YzAsMjMuNCwxOC45LDQyLjQsNDIuMiw0Mi43JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4xLDAsMC4zLDAsMC40LDBjMCwwLDAuMSwwLDAuMSwwQy0xNTEuMyw0MzkuNy0xMzIuMiw0MjAuNS0xMzIuMiwzOTd6IE0tMjEyLjUsMzk5LjVoMTJjMC4yLDYsMS4xLDExLjcsMi42LDE2LjdoLTkuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0yMTAuMyw0MTEuMi0yMTIuMSw0MDUuNi0yMTIu'+
			'NSwzOTkuNXogTS0xMzcuMywzOTQuNWgtMTIuMmMtMC4yLTYtMS4xLTExLjYtMi42LTE2LjdoOS42Qy0xMzkuNSwzODIuOC0xMzcuNywzODguNC0xMzcuMywzOTQuNXomI3hkOyYjeGE7JiN4OTsmI3g5OyBNLTE1NC41LDM5NC41aC0xNy45di0xNi43aDE1Qy0xNTUuOCwzODIuOC0xNTQuNywzODguNS0xNTQuNSwzOTQuNXogTS0xNzIuNCwzNzIuOHYtMTMuMmM1LjIsMS4yLDkuOCw2LjIsMTMsMTMuMkwtMTcyLjQsMzcyLjgmI3hkOyYjeGE7JiN4OTsmI3g5O0wtMTcyLjQsMzcyLjh6IE0tMTc3LjQsMzU5LjZ2MTMuMmgtMTMuMkMtMTg3LjMsMzY1LjctMTgyLjYsMzYwLjctMTc3LjQsMzU5LjZ6IE'+
			'0tMTc3LjQsMzc3Ljh2MTYuN2gtMTguMWMwLjItNiwxLjMtMTEuNywyLjktMTYuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7TC0xNzcuNCwzNzcuOEwtMTc3LjQsMzc3Ljh6IE0tMjAwLjUsMzk0LjVoLTEyYzAuNC02LjEsMi4yLTExLjcsNS4yLTE2LjdoOS40Qy0xOTkuNCwzODIuOC0yMDAuMywzODguNS0yMDAuNSwzOTQuNXomI3hkOyYjeGE7JiN4OTsmI3g5OyBNLTE5NS41LDM5OS41aDE4LjF2MTYuN2gtMTUuMkMtMTk0LjIsNDExLjItMTk1LjMsNDA1LjUtMTk1LjUsMzk5LjV6IE0tMTc3LjQsNDIxLjJ2MTMuMmMtNS4yLTEuMi05LjktNi4xLTEzLjItMTMuMkgtMTc3LjR6JiN4ZDsmI3hhOyYjeDk7'+
			'JiN4OTsgTS0xNzIuNCw0MzQuNHYtMTMuMmgxM0MtMTYyLjcsNDI4LjItMTY3LjMsNDMzLjEtMTcyLjQsNDM0LjR6IE0tMTcyLjQsNDE2LjJ2LTE2LjdoMTcuOWMtMC4yLDYtMS4zLDExLjctMi45LDE2LjdILTE3Mi40eiYjeGQ7JiN4YTsmI3g5OyYjeDk7IE0tMTQ5LjUsMzk5LjVoMTIuMmMtMC40LDYuMS0yLjIsMTEuOC01LjIsMTYuN2gtOS42Qy0xNTAuNiw0MTEuMS0xNDkuNyw0MDUuNS0xNDkuNSwzOTkuNXogTS0xNDYsMzcyLjhoLTcuOCYjeGQ7JiN4YTsmI3g5OyYjeDk7Yy0xLjYtNC0zLjYtNy41LTYtMTAuNEMtMTU0LjQsMzY0LjgtMTQ5LjcsMzY4LjQtMTQ2LDM3Mi44eiBNLTE5MC4zLD'+
			'M2Mi42Yy0yLjMsMi44LTQuMyw2LjMtNS45LDEwLjJoLTcuNiYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0yMDAuMiwzNjguNC0xOTUuNiwzNjQuOS0xOTAuMywzNjIuNnogTS0yMDMuOCw0MjEuMmg3LjZjMS42LDMuOSwzLjYsNy40LDUuOSwxMC4yQy0xOTUuNiw0MjktMjAwLjIsNDI1LjUtMjAzLjgsNDIxLjJ6JiN4ZDsmI3hhOyYjeDk7JiN4OTsgTS0xNTkuOCw0MzEuNWMyLjMtMi44LDQuMy02LjMsNi0xMC4zaDcuOEMtMTQ5LjcsNDI1LjYtMTU0LjQsNDI5LjItMTU5LjgsNDMxLjV6IiBmaWxsPSIjRkZGRkZGIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._ht_url_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_url_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -16px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_url_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_url_image.onmouseover=function (e) {
			me._ht_url_image__img.style.visibility='hidden';
			me._ht_url_image__imgo.style.visibility='inherit';
		}
		me._ht_url_image.onmouseout=function (e) {
			me._ht_url_image__img.style.visibility='inherit';
			me._ht_url_image__imgo.style.visibility='hidden';
		}
		me._ht_url_image.ggUpdatePosition=function (useTransition) {
		}
		me._ht_url.appendChild(me._ht_url_image);
		el=me._tt_ht_url=document.createElement('div');
		els=me._tt_ht_url__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -50px;';
		hs+='position : absolute;';
		hs+='top : 21px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_url'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_url.style[domTransition]='';
				if (me._tt_ht_url.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_url.style.visibility=(Number(me._tt_ht_url.style.opacity)>0||!me._tt_ht_url.style.opacity)?'inherit':'hidden';
					me._tt_ht_url.ggVisible=true;
				}
				else {
					me._tt_ht_url.style.visibility="hidden";
					me._tt_ht_url.ggVisible=false;
				}
			}
		}
		me._tt_ht_url.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_url.appendChild(me._tt_ht_url);
		me.__div = me._ht_url;
	};
	function SkinHotspotClass_ht_info(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_info=document.createElement('div');
		el.ggId="ht_info";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info.onclick=function (e) {
			skin._controller.style[domTransition]='none';
			skin._controller.style.visibility='hidden';
			skin._controller.ggVisible=false;
			skin._screentint.style[domTransition]='none';
			skin._screentint.style.visibility=(Number(skin._screentint.style.opacity)>0||!skin._screentint.style.opacity)?'inherit':'hidden';
			skin._screentint.ggVisible=true;
			skin._info_title.ggText="<b>"+me.hotspot.title+"<\/b>";
			skin._info_title.ggTextDiv.innerHTML=skin._info_title.ggText;
			if (skin._info_title.ggUpdateText) {
				skin._info_title.ggUpdateText=function() {
					var hs="<b>"+me.hotspot.title+"<\/b>";
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_title.ggUpdatePosition) {
				skin._info_title.ggUpdatePosition();
			}
			skin._info_title.ggTextDiv.scrollTop = 0;
			skin._info_text_body.ggText=me.hotspot.description;
			skin._info_text_body.ggTextDiv.innerHTML=skin._info_text_body.ggText;
			if (skin._info_text_body.ggUpdateText) {
				skin._info_text_body.ggUpdateText=function() {
					var hs=me.hotspot.description;
					if (hs!=this.ggText) {
						this.ggText=hs;
						this.ggTextDiv.innerHTML=hs;
						if (this.ggUpdatePosition) this.ggUpdatePosition();
					}
				}
			}
			if (skin._info_text_body.ggUpdatePosition) {
				skin._info_text_body.ggUpdatePosition();
			}
			skin._info_text_body.ggTextDiv.scrollTop = 0;
			skin._information.style[domTransition]='none';
			skin._information.style.visibility=(Number(skin._information.style.opacity)>0||!skin._information.style.opacity)?'inherit':'hidden';
			skin._information.ggVisible=true;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_info']=true;
			me._tt_information.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_info']=false;
			me._tt_information.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_info.ontouchend=function (e) {
			me.elementMouseOver['ht_info']=false;
			me._tt_information.logicBlock_visible();
		}
		me._ht_info.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_info_image=document.createElement('div');
		els=me._ht_info_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzQwLjljLTMxLDAtNTYuMSwyNS4xLTU2LjEsNTYuMXMyNS4xLDU2LjEsNTYuMSw1Ni4xYzMxLDAsNTYuMS0yNS4xLDU2LjEtNTYuMVMtMTQ0LDM0MC45LTE3NSwzNDAuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7eiBNLTE3OC4xLDM2MS4xbDYuMiwwYzMuNSwwLDYuNCwyLjksNi40LDYuNHYyLjljMCwzLjUtMi45LDYuNC02LjQsNi40aC02LjJjLTMuNSwwLTYuNC0yLjktNi40LTYuNGwwLTIuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xODQuNSwzNjQtMTgxLjYsMzYxLjEtMTc4LjEsMzYxLjF6IE0tMTY3LDQzMC40SC0xODNjLTAuOCwwLTEuNS0wLjct'+
			'MS41LTEuNWwwLTM3LjdjMC0wLjgsMC43LTEuNSwxLjUtMS41bDE1LjksMCYjeGQ7JiN4YTsmI3g5OyYjeDk7YzAuOCwwLDEuNSwwLjcsMS41LDEuNWwwLDM3LjdDLTE2NS41LDQyOS43LTE2Ni4yLDQzMC40LTE2Nyw0MzAuNHoiIGZpbGw9IiMwMDAwMDAiLz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xNjUuNSwzOTEuMmMwLTAuOC0wLjctMS41LTEuNS0xLjVsLTE1LjksMGMtMC44LDAtMS41LDAuNy0xLjUsMS41bDAsMzcuN2MwLDAuOCwwLjcsMS41LDEuNSwxLjVoMTUuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC44LDAsMS41LTAuNywxLjUtMS41TC'+
			'0xNjUuNSwzOTEuMnoiIGZpbGw9IiNGRkZGRkYiLz4KICAgPHBhdGggZD0iTS0xNzguMSwzNzYuOGg2LjJjMy41LDAsNi40LTIuOSw2LjQtNi40di0yLjljMC0zLjUtMi45LTYuNC02LjQtNi40bC02LjIsMGMtMy41LDAtNi40LDIuOS02LjQsNi40bDAsMi45JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTg0LjUsMzc0LTE4MS42LDM3Ni44LTE3OC4xLDM3Ni44eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_info_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_info_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40czI3LjksNjIuNCw2Mi40LDYyLjRjMzQuNCwwLDYyLjQtMjcuOSw2Mi40LTYyLjQmI3hkOyYjeGE7JiN4OTsmI3g5O1MtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTE3OC41LDM1Ny4xbDYuOSwwYzMuOSwwLDcuMSwzLjIsNy4xLDcuMXYzLjNjMCwzLjktMy4yLDcuMS03LjEsNy4xaC02LjljLTMuOSwwLTcuMS0zLjItNy4xLTcuMWwwLTMuMyYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xODUuNiwzNjAuMy0xODIuNCwzNTcuMS0xNzguNSwzNTcuMXogTS0xNjYuMSw0MzQuMWgtMTcuN2MtMC45'+
			'LDAtMS43LTAuOC0xLjctMS43bDAtNDEuOWMwLTAuOSwwLjgtMS43LDEuNy0xLjdsMTcuNywwJiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC45LDAsMS43LDAuOCwxLjcsMS43bDAsNDEuOUMtMTY0LjQsNDMzLjMtMTY1LjIsNDM0LjEtMTY2LjEsNDM0LjF6IiBmaWxsPSIjMDAwMDAwIi8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMiI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTY0LjQsMzkwLjVjMC0wLjktMC44LTEuNy0xLjctMS43bC0xNy43LDBjLTAuOSwwLTEuNywwLjgtMS43LDEuN2wwLDQxLjljMCwwLjksMC44LDEuNywxLjcsMS43aDE3LjcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuOSwwLDEuNy'+
			'0wLjgsMS43LTEuN0wtMTY0LjQsMzkwLjV6IiBmaWxsPSIjRkZGRkZGIi8+CiAgIDxwYXRoIGQ9Ik0tMTc4LjUsMzc0LjZoNi45YzMuOSwwLDcuMS0zLjIsNy4xLTcuMXYtMy4zYzAtMy45LTMuMi03LjEtNy4xLTcuMWwtNi45LDBjLTMuOSwwLTcuMSwzLjItNy4xLDcuMWwwLDMuMyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTE4NS41LDM3MS40LTE4Mi40LDM3NC42LTE3OC41LDM3NC42eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_info_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_info_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 32px;';
		hs+='left : -16px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_info_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_info_image.onmouseover=function (e) {
			me._ht_info_image__img.style.visibility='hidden';
			me._ht_info_image__imgo.style.visibility='inherit';
		}
		me._ht_info_image.onmouseout=function (e) {
			me._ht_info_image__img.style.visibility='inherit';
			me._ht_info_image__imgo.style.visibility='hidden';
		}
		me._ht_info_image.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info.appendChild(me._ht_info_image);
		el=me._tt_information=document.createElement('div');
		els=me._tt_information__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_information";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -50px;';
		hs+='position : absolute;';
		hs+='top : 21px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_information.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_information.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_info'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_information.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_information.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_information.style[domTransition]='';
				if (me._tt_information.ggCurrentLogicStateVisible == 0) {
					me._tt_information.style.visibility=(Number(me._tt_information.style.opacity)>0||!me._tt_information.style.opacity)?'inherit':'hidden';
					me._tt_information.ggVisible=true;
				}
				else {
					me._tt_information.style.visibility="hidden";
					me._tt_information.ggVisible=false;
				}
			}
		}
		me._tt_information.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_info.appendChild(me._tt_information);
		me.__div = me._ht_info;
	};
	function SkinHotspotClass_ht_image(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_image=document.createElement('div');
		el.ggId="ht_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_image.onclick=function (e) {
			skin._controller.style[domTransition]='none';
			skin._controller.style.visibility='hidden';
			skin._controller.ggVisible=false;
			skin._screentint.style[domTransition]='none';
			skin._screentint.style.visibility=(Number(skin._screentint.style.opacity)>0||!skin._screentint.style.opacity)?'inherit':'hidden';
			skin._screentint.ggVisible=true;
			skin._close.style[domTransition]='none';
			skin._close.style.visibility=(Number(skin._close.style.opacity)>0||!skin._close.style.opacity)?'inherit':'hidden';
			skin._close.ggVisible=true;
			skin._popup_image.ggText=player.getBasePath()+""+me.hotspot.url;
			skin._popup_image.ggSubElement.style.width = '0px';
			skin._popup_image.ggSubElement.style.height = '0px';
			skin._popup_image.ggSubElement.src='';
			skin._popup_image.ggSubElement.src=skin._popup_image.ggText;
			skin._popup_image.style[domTransition]='none';
			skin._popup_image.style.visibility=(Number(skin._popup_image.style.opacity)>0||!skin._popup_image.style.opacity)?'inherit':'hidden';
			skin._popup_image.ggVisible=true;
			skin._popup_image.ggSubElement.src=skin._popup_image.ggText;
			skin._image_popup.style[domTransition]='none';
			skin._image_popup.style.visibility=(Number(skin._image_popup.style.opacity)>0||!skin._image_popup.style.opacity)?'inherit':'hidden';
			skin._image_popup.ggVisible=true;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_image']=true;
			me._tt_ht_image.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_image']=false;
			me._tt_ht_image.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_image.ontouchend=function (e) {
			me.elementMouseOver['ht_image']=false;
			me._tt_ht_image.logicBlock_visible();
		}
		me._ht_image.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_image_image=document.createElement('div');
		els=me._ht_image_image__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTk2LjMsNDE0LjdoNDIuN3YtNDRoLTQyLjdWNDE0Ljd6IE0tMTU1LjUsNDEyLjlILTE4M2wxOS0xOC42YzAuMy0wLjMsMC42LTAuNCwxLTAuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMC40LDAsMC43LDAuMSwxLDAuNGw2LjUsNi40VjQxMi45eiBNLTE2Mi45LDM3NmMyLjIsMCw0LDEuOCw0LDRjMCwyLjItMS44LDQtNCw0Yy0yLjIsMC00LTEuOC00LTQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xNjYuOCwzNzcuOC0xNjUuMSwzNzYtMTYyLjksMzc2eiBNLTE5NC41LDM5Ny44bDkuNy05LjRjMC4zLTAuMywwLjYtMC40LDEtMC40'+
			'YzAuNCwwLDAuNywwLjEsMSwwLjRsMTEuMiwxMC45bC0xMy45LDEzLjZoLTkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7TC0xOTQuNSwzOTcuOEwtMTk0LjUsMzk3Ljh6IiBmaWxsPSIjMDAwMDAwIi8+CiAgIDxwYXRoIGQ9Ik0tMTc1LDM0MC45Yy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFjMCwzMSwyNS4xLDU2LjEsNTYuMSw1Ni4xczU2LjEtMjUuMSw1Ni4xLTU2LjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Uy0xNDQsMzQwLjktMTc1LDM0MC45eiBNLTE0OS41LDQyNS41YzAsMS4zLTEsMi4zLTIuMywyLjNoLTQ2LjRjLTEuMywwLTIuMy0xLTIuMy0yLjN2LTU3YzAtMS4zLDEtMi4zLDIuMy'+
			'0yLjNoNDYuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS4zLDAsMi4zLDEsMi4zLDIuM0wtMTQ5LjUsNDI1LjVMLTE0OS41LDQyNS41eiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xNTEuOCwzNjYuMmgtNDYuNGMtMS4zLDAtMi4zLDEtMi4zLDIuM3Y1N2MwLDEuMywxLDIuMywyLjMsMi4zaDQ2LjRjMS4zLDAsMi4zLTEsMi4zLTIuM3YtNTcmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xNDkuNSwzNjcuMi0xNTAuNSwzNjYuMi0xNTEuOCwzNjYuMnogTS0xNTMuNyw0MTQuN2gtNDIuN3YtNDRoNDIuN1Y0MTQu'+
			'N3oiIGZpbGw9IiNGRkZGRkYiLz4KICAgPGNpcmNsZSBjeT0iMzc5LjkiIGZpbGw9IiNGRkZGRkYiIHI9IjQiIGN4PSItMTYyLjkiLz4KICAgPHBhdGggZD0iTS0xNzEuNywzOTkuM2wtMTEuMi0xMC45Yy0wLjMtMC4zLTAuNi0wLjQtMS0wLjRzLTAuNywwLjEtMSwwLjRsLTkuNyw5LjR2MTUuMWg5TC0xNzEuNywzOTkuM3oiIGZpbGw9IiNGRkZGRkYiLz4KICAgPHBhdGggZD0iTS0xNjMsMzkzLjljLTAuNCwwLTAuNywwLjEtMSwwLjRsLTE5LDE4LjZoMjcuNXYtMTIuMmwtNi41LTYuNEMtMTYyLjIsMzk0LTE2Mi42LDM5My45LTE2MywzOTMuOXoiIGZpbGw9IiNGRkZGRkYiLz4KICA8L2c+CiA8L2'+
			'c+Cjwvc3ZnPgo=';
		me._ht_image_image__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_image_image__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTk4LjcsNDE2LjZoNDcuNHYtNDguOWgtNDcuNFY0MTYuNnogTS0xNTMuMyw0MTQuNmgtMzAuNmwyMS4xLTIwLjZjMC4zLTAuMywwLjctMC41LDEuMS0wLjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAuNCwwLDAuOCwwLjIsMS4xLDAuNWw3LjIsNy4xVjQxNC42eiBNLTE2MS41LDM3My42YzIuNCwwLDQuNCwyLDQuNCw0LjRjMCwyLjQtMiw0LjQtNC40LDQuNHMtNC40LTItNC40LTQuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTE2NS45LDM3NS42LTE2NCwzNzMuNi0xNjEuNSwzNzMuNnogTS0xOTYuNywzOTcuOWwxMC43LTEwLjVj'+
			'MC4zLTAuMywwLjctMC41LDEuMS0wLjVzMC44LDAuMiwxLjEsMC40bDEyLjQsMTIuMmwtMTUuNCwxNS4xaC0xMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtMLTE5Ni43LDM5Ny45TC0xOTYuNywzOTcuOXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNzUsMzM0LjZjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40YzAsMzQuNCwyNy45LDYyLjQsNjIuNCw2Mi40czYyLjQtMjcuOSw2Mi40LTYyLjQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Uy0xNDAuNiwzMzQuNi0xNzUsMzM0LjZ6IE0tMTQ2LjcsNDI4LjdjMCwxLjQtMS4xLDIuNi0yLjYsMi42aC01MS42Yy0xLjQsMC0yLjYtMS'+
			'4xLTIuNi0yLjZ2LTYzLjRjMC0xLjQsMS4xLTIuNiwyLjYtMi42aDUxLjYmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzEuNCwwLDIuNiwxLjEsMi42LDIuNkwtMTQ2LjcsNDI4LjdMLTE0Ni43LDQyOC43eiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xNDkuMiwzNjIuOGgtNTEuNmMtMS40LDAtMi42LDEuMS0yLjYsMi42djYzLjRjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDUxLjZjMS40LDAsMi42LTEuMSwyLjYtMi42di02My40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTQ2LjcsMzYzLjktMTQ3LjgsMzYyLjgt'+
			'MTQ5LjIsMzYyLjh6IE0tMTUxLjMsNDE2LjZoLTQ3LjR2LTQ4LjloNDcuNFY0MTYuNnoiIGZpbGw9IiNGRkZGRkYiLz4KICAgPGNpcmNsZSBjeT0iMzc4IiBmaWxsPSIjRkZGRkZGIiByPSI0LjQiIGN4PSItMTYxLjUiLz4KICAgPHBhdGggZD0iTS0xNzEuMywzOTkuNWwtMTIuNC0xMi4yYy0wLjMtMC4zLTAuNy0wLjQtMS4xLTAuNGMtMC40LDAtMC44LDAuMi0xLjEsMC41bC0xMC43LDEwLjV2MTYuOGgxMCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtMLTE3MS4zLDM5OS41eiIgZmlsbD0iI0ZGRkZGRiIvPgogICA8cGF0aCBkPSJNLTE2MS42LDM5My41Yy0wLjQsMC0wLjgsMC4yLTEuMSwwLjVsLT'+
			'IxLjEsMjAuNmgzMC42VjQwMWwtNy4yLTcuMUMtMTYwLjgsMzkzLjctMTYxLjIsMzkzLjUtMTYxLjYsMzkzLjUmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7eiIgZmlsbD0iI0ZGRkZGRiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==';
		me._ht_image_image__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_image_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -16px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_image_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_image_image.onmouseover=function (e) {
			me._ht_image_image__img.style.visibility='hidden';
			me._ht_image_image__imgo.style.visibility='inherit';
		}
		me._ht_image_image.onmouseout=function (e) {
			me._ht_image_image__img.style.visibility='inherit';
			me._ht_image_image__imgo.style.visibility='hidden';
		}
		me._ht_image_image.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image.appendChild(me._ht_image_image);
		el=me._tt_ht_image=document.createElement('div');
		els=me._tt_ht_image__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_image";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -50px;';
		hs+='position : absolute;';
		hs+='top : 21px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_image.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_image'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_image.style[domTransition]='';
				if (me._tt_ht_image.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_image.style.visibility=(Number(me._tt_ht_image.style.opacity)>0||!me._tt_ht_image.style.opacity)?'inherit':'hidden';
					me._tt_ht_image.ggVisible=true;
				}
				else {
					me._tt_ht_image.style.visibility="hidden";
					me._tt_ht_image.ggVisible=false;
				}
			}
		}
		me._tt_ht_image.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_image.appendChild(me._tt_ht_image);
		me.__div = me._ht_image;
	};
	function SkinHotspotClass_ht_video_file(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_video_file=document.createElement('div');
		el.ggId="ht_video_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_file.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_file.onclick=function (e) {
			skin._controller.style[domTransition]='none';
			skin._controller.style.visibility='hidden';
			skin._controller.ggVisible=false;
			skin._screentint.style[domTransition]='none';
			skin._screentint.style.visibility=(Number(skin._screentint.style.opacity)>0||!skin._screentint.style.opacity)?'inherit':'hidden';
			skin._screentint.ggVisible=true;
			skin._close.style[domTransition]='none';
			skin._close.style.visibility=(Number(skin._close.style.opacity)>0||!skin._close.style.opacity)?'inherit':'hidden';
			skin._close.ggVisible=true;
			skin._video_popup_controls_file.style[domTransition]='none';
			skin._video_popup_controls_file.style.visibility=(Number(skin._video_popup_controls_file.style.opacity)>0||!skin._video_popup_controls_file.style.opacity)?'inherit':'hidden';
			skin._video_popup_controls_file.ggVisible=true;
			skin._popup_video_file.ggInitMedia(player.getBasePath()+""+me.hotspot.url);
			if (skin._popup_video_file.ggVideoNotLoaded) {
				skin._popup_video_file.ggInitMedia(skin._popup_video_file.ggVideoSource);
			}
			skin._popup_video_file.style[domTransition]='none';
			skin._popup_video_file.style.visibility=(Number(skin._popup_video_file.style.opacity)>0||!skin._popup_video_file.style.opacity)?'inherit':'hidden';
			skin._popup_video_file.ggVisible=true;
			skin._video_popup_file.style[domTransition]='none';
			skin._video_popup_file.style.visibility=(Number(skin._video_popup_file.style.opacity)>0||!skin._video_popup_file.style.opacity)?'inherit':'hidden';
			skin._video_popup_file.ggVisible=true;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_file.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_file.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_file']=true;
			me._tt_ht_video_file.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_file.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_file']=false;
			me._tt_ht_video_file.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_file.ontouchend=function (e) {
			me.elementMouseOver['ht_video_file']=false;
			me._tt_ht_video_file.logicBlock_visible();
		}
		me._ht_video_file.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_video_video_file=document.createElement('div');
		els=me._ht_video_video_file__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTc1LDM0MC45Yy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFjMCwzMSwyNS4xLDU2LjEsNTYuMSw1Ni4xczU2LjEtMjUuMSw1Ni4xLTU2LjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xMTguOSwzNjYtMTQ0LDM0MC45LTE3NSwzNDAuOXogTS0xMzkuNCw0MjEuN2MwLDEuMy0xLDIuMy0yLjMsMi4zaC02Ni43Yy0xLjMsMC0yLjMtMS0yLjMtMi4zdi00OS40YzAtMS4zLDEtMi4zLDIuMy0yLjNoNjYuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS4zLDAsMi4zLDEsMi4zLDIuM1Y0MjEuN3oiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBh'+
			'dGggZD0iTS0xNzguNCw0MDVsMTAuOC03LjVjMC43LTAuNSwwLjctMS4zLDAtMS44bC0xMC44LTcuNWMtMC43LTAuNS0xLjMtMC4yLTEuMywwLjd2MTUuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTE3OS43LDQwNS4yLTE3OS4xLDQwNS41LTE3OC40LDQwNXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0yMDYuNSw0MTUuMWg2Mi40di0zNi4xaC02Mi40VjQxNS4xeiBNLTE3NSwzODIuMWM4LDAsMTQuNCw2LjUsMTQuNCwxNC40YzAsOC02LjUsMTQuNC0xNC40LDE0LjQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy04LDAtMTQuNC02LjUtMTQuNC0xNC40Qy0xODkuNCwzODguNi'+
			'0xODMsMzgyLjEtMTc1LDM4Mi4xeiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xNDEuNywzNzBoLTY2LjdjLTEuMywwLTIuMywxLTIuMywyLjN2NDkuNGMwLDEuMywxLDIuMywyLjMsMi4zaDY2LjdjMS4zLDAsMi4zLTEsMi4zLTIuM3YtNDkuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTEzOS40LDM3MS0xNDAuNCwzNzAtMTQxLjcsMzcweiBNLTE0NC4yLDQxNS4xaC02Mi40di0zNi4xaDYyLjRDLTE0NC4yLDM3OC45LTE0NC4yLDQxNS4xLTE0NC4yLDQxNS4xeiIgZmlsbD0iI0ZGRkZGRiIvPgogICA8cGF0aCBk'+
			'PSJNLTE3NSw0MTFjOCwwLDE0LjQtNi41LDE0LjQtMTQuNGMwLTgtNi41LTE0LjQtMTQuNC0xNC40Yy04LDAtMTQuNCw2LjUtMTQuNCwxNC40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTg5LjQsNDA0LjUtMTgzLDQxMS0xNzUsNDExeiBNLTE3OS43LDM4OC44YzAtMC44LDAuNi0xLjEsMS4zLTAuN2wxMC44LDcuNWMwLjcsMC41LDAuNywxLjMsMCwxLjhsLTEwLjgsNy41JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC43LDAuNS0xLjMsMC4yLTEuMy0wLjdWMzg4Ljh6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._ht_video_video_file__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_video_file__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTc1LDMzNC42Yy0zNC40LDAtNjIuNCwyNy45LTYyLjQsNjIuNGMwLDM0LjQsMjcuOSw2Mi40LDYyLjQsNjIuNHM2Mi40LTI3LjksNjIuNC02Mi40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTEyLjYsMzYyLjYtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTEzNS40LDQyNC40YzAsMS40LTEuMSwyLjYtMi42LDIuNkgtMjEyYy0xLjQsMC0yLjYtMS4xLTIuNi0yLjZ2LTU0LjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAtMS40LDEuMS0yLjYsMi42LTIuNmg3NC4xYzEuNCwwLDIuNiwxLjEsMi42LDIuNlY0MjQuNHoiIGZpbGw9IiMw'+
			'MDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNzguOCw0MDUuOWwxMi04LjRjMC44LTAuNSwwLjgtMS40LDAtMS45bC0xMi04LjRjLTAuOC0wLjUtMS40LTAuMi0xLjQsMC43djE3LjMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xODAuMiw0MDYuMS0xNzkuNiw0MDYuNC0xNzguOCw0MDUuOXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0yMTAsNDE3LjFoNjkuM3YtNDAuMkgtMjEwVjQxNy4xeiBNLTE3NSwzODAuNWM4LjksMCwxNiw3LjIsMTYsMTZjMCw4LjktNy4yLDE2LTE2LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtOC45LDAtMTYtNy4yLTE2LTE2Qy0xOTEsMzg3LjctMT'+
			'gzLjksMzgwLjUtMTc1LDM4MC41eiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xMzgsMzY3SC0yMTJjLTEuNCwwLTIuNiwxLjEtMi42LDIuNnY1NC45YzAsMS40LDEuMSwyLjYsMi42LDIuNmg3NC4xYzEuNCwwLDIuNi0xLjEsMi42LTIuNnYtNTQuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTEzNS40LDM2OC4xLTEzNi42LDM2Ny0xMzgsMzY3eiBNLTE0MC43LDQxNy4xSC0yMTB2LTQwLjJoNjkuM0MtMTQwLjcsMzc2LjktMTQwLjcsNDE3LjEtMTQwLjcsNDE3LjF6IiBmaWxsPSIjRkZGRkZGIi8+CiAgIDxwYXRo'+
			'IGQ9Ik0tMTc1LDQxMi42YzguOSwwLDE2LTcuMiwxNi0xNmMwLTguOS03LjItMTYtMTYtMTZjLTguOSwwLTE2LDcuMi0xNiwxNkMtMTkxLDQwNS40LTE4My45LDQxMi42LTE3NSw0MTIuNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTt6IE0tMTgwLjIsMzg3LjljMC0wLjksMC42LTEuMywxLjQtMC43bDEyLDguNGMwLjgsMC41LDAuOCwxLjQsMCwxLjlsLTEyLDguNGMtMC44LDAuNS0xLjQsMC4yLTEuNC0wLjdWMzg3Ljl6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._ht_video_video_file__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_video_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -16px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_video_file.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_video_file.onmouseover=function (e) {
			me._ht_video_video_file__img.style.visibility='hidden';
			me._ht_video_video_file__imgo.style.visibility='inherit';
		}
		me._ht_video_video_file.onmouseout=function (e) {
			me._ht_video_video_file__img.style.visibility='inherit';
			me._ht_video_video_file__imgo.style.visibility='hidden';
		}
		me._ht_video_video_file.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file.appendChild(me._ht_video_video_file);
		el=me._tt_ht_video_file=document.createElement('div');
		els=me._tt_ht_video_file__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_video_file";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -50px;';
		hs+='position : absolute;';
		hs+='top : 21px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_video_file.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_video_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_file'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_video_file.style[domTransition]='';
				if (me._tt_ht_video_file.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_video_file.style.visibility=(Number(me._tt_ht_video_file.style.opacity)>0||!me._tt_ht_video_file.style.opacity)?'inherit':'hidden';
					me._tt_ht_video_file.ggVisible=true;
				}
				else {
					me._tt_ht_video_file.style.visibility="hidden";
					me._tt_ht_video_file.ggVisible=false;
				}
			}
		}
		me._tt_ht_video_file.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_video_file.appendChild(me._tt_ht_video_file);
		me.__div = me._ht_video_file;
	};
	function SkinHotspotClass_ht_video_url(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_video_url=document.createElement('div');
		el.ggId="ht_video_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_url.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_url.onclick=function (e) {
			skin._controller.style[domTransition]='none';
			skin._controller.style.visibility='hidden';
			skin._controller.ggVisible=false;
			skin._screentint.style[domTransition]='none';
			skin._screentint.style.visibility=(Number(skin._screentint.style.opacity)>0||!skin._screentint.style.opacity)?'inherit':'hidden';
			skin._screentint.ggVisible=true;
			skin._close.style[domTransition]='none';
			skin._close.style.visibility=(Number(skin._close.style.opacity)>0||!skin._close.style.opacity)?'inherit':'hidden';
			skin._close.ggVisible=true;
			skin._video_popup_controls_url.style[domTransition]='none';
			skin._video_popup_controls_url.style.visibility=(Number(skin._video_popup_controls_url.style.opacity)>0||!skin._video_popup_controls_url.style.opacity)?'inherit':'hidden';
			skin._video_popup_controls_url.ggVisible=true;
			skin._popup_video_url.ggInitMedia(me.hotspot.url);
			if (skin._popup_video_url.ggVideoNotLoaded) {
				skin._popup_video_url.ggInitMedia(skin._popup_video_url.ggVideoSource);
			}
			skin._popup_video_url.style[domTransition]='none';
			skin._popup_video_url.style.visibility=(Number(skin._popup_video_url.style.opacity)>0||!skin._popup_video_url.style.opacity)?'inherit':'hidden';
			skin._popup_video_url.ggVisible=true;
			skin._video_popup_url.style[domTransition]='none';
			skin._video_popup_url.style.visibility=(Number(skin._video_popup_url.style.opacity)>0||!skin._video_popup_url.style.opacity)?'inherit':'hidden';
			skin._video_popup_url.ggVisible=true;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_url.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_url.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_url']=true;
			me._tt_ht_video_url.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_url.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_url']=false;
			me._tt_ht_video_url.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_url.ontouchend=function (e) {
			me.elementMouseOver['ht_video_url']=false;
			me._tt_ht_video_url.logicBlock_visible();
		}
		me._ht_video_url.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_video_video_url=document.createElement('div');
		els=me._ht_video_video_url__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTc1LDM0MC45Yy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFjMCwzMSwyNS4xLDU2LjEsNTYuMSw1Ni4xczU2LjEtMjUuMSw1Ni4xLTU2LjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xMTguOSwzNjYtMTQ0LDM0MC45LTE3NSwzNDAuOXogTS0xMzkuNCw0MjEuN2MwLDEuMy0xLDIuMy0yLjMsMi4zaC02Ni43Yy0xLjMsMC0yLjMtMS0yLjMtMi4zdi00OS40YzAtMS4zLDEtMi4zLDIuMy0yLjNoNjYuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS4zLDAsMi4zLDEsMi4zLDIuM1Y0MjEuN3oiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBh'+
			'dGggZD0iTS0xNzguNCw0MDVsMTAuOC03LjVjMC43LTAuNSwwLjctMS4zLDAtMS44bC0xMC44LTcuNWMtMC43LTAuNS0xLjMtMC4yLTEuMywwLjd2MTUuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTE3OS43LDQwNS4yLTE3OS4xLDQwNS41LTE3OC40LDQwNXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0yMDYuNSw0MTUuMWg2Mi40di0zNi4xaC02Mi40VjQxNS4xeiBNLTE3NSwzODIuMWM4LDAsMTQuNCw2LjUsMTQuNCwxNC40YzAsOC02LjUsMTQuNC0xNC40LDE0LjQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy04LDAtMTQuNC02LjUtMTQuNC0xNC40Qy0xODkuNCwzODguNi'+
			'0xODMsMzgyLjEtMTc1LDM4Mi4xeiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xNDEuNywzNzBoLTY2LjdjLTEuMywwLTIuMywxLTIuMywyLjN2NDkuNGMwLDEuMywxLDIuMywyLjMsMi4zaDY2LjdjMS4zLDAsMi4zLTEsMi4zLTIuM3YtNDkuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTEzOS40LDM3MS0xNDAuNCwzNzAtMTQxLjcsMzcweiBNLTE0NC4yLDQxNS4xaC02Mi40di0zNi4xaDYyLjRDLTE0NC4yLDM3OC45LTE0NC4yLDQxNS4xLTE0NC4yLDQxNS4xeiIgZmlsbD0iI0ZGRkZGRiIvPgogICA8cGF0aCBk'+
			'PSJNLTE3NSw0MTFjOCwwLDE0LjQtNi41LDE0LjQtMTQuNGMwLTgtNi41LTE0LjQtMTQuNC0xNC40Yy04LDAtMTQuNCw2LjUtMTQuNCwxNC40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTg5LjQsNDA0LjUtMTgzLDQxMS0xNzUsNDExeiBNLTE3OS43LDM4OC44YzAtMC44LDAuNi0xLjEsMS4zLTAuN2wxMC44LDcuNWMwLjcsMC41LDAuNywxLjMsMCwxLjhsLTEwLjgsNy41JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC43LDAuNS0xLjMsMC4yLTEuMy0wLjdWMzg4Ljh6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._ht_video_video_url__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_video_url__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTc1LDMzNC42Yy0zNC40LDAtNjIuNCwyNy45LTYyLjQsNjIuNGMwLDM0LjQsMjcuOSw2Mi40LDYyLjQsNjIuNHM2Mi40LTI3LjksNjIuNC02Mi40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTEyLjYsMzYyLjYtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTEzNS40LDQyNC40YzAsMS40LTEuMSwyLjYtMi42LDIuNkgtMjEyYy0xLjQsMC0yLjYtMS4xLTIuNi0yLjZ2LTU0LjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAtMS40LDEuMS0yLjYsMi42LTIuNmg3NC4xYzEuNCwwLDIuNiwxLjEsMi42LDIuNlY0MjQuNHoiIGZpbGw9IiMw'+
			'MDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNzguOCw0MDUuOWwxMi04LjRjMC44LTAuNSwwLjgtMS40LDAtMS45bC0xMi04LjRjLTAuOC0wLjUtMS40LTAuMi0xLjQsMC43djE3LjMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xODAuMiw0MDYuMS0xNzkuNiw0MDYuNC0xNzguOCw0MDUuOXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0yMTAsNDE3LjFoNjkuM3YtNDAuMkgtMjEwVjQxNy4xeiBNLTE3NSwzODAuNWM4LjksMCwxNiw3LjIsMTYsMTZjMCw4LjktNy4yLDE2LTE2LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtOC45LDAtMTYtNy4yLTE2LTE2Qy0xOTEsMzg3LjctMT'+
			'gzLjksMzgwLjUtMTc1LDM4MC41eiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xMzgsMzY3SC0yMTJjLTEuNCwwLTIuNiwxLjEtMi42LDIuNnY1NC45YzAsMS40LDEuMSwyLjYsMi42LDIuNmg3NC4xYzEuNCwwLDIuNi0xLjEsMi42LTIuNnYtNTQuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTEzNS40LDM2OC4xLTEzNi42LDM2Ny0xMzgsMzY3eiBNLTE0MC43LDQxNy4xSC0yMTB2LTQwLjJoNjkuM0MtMTQwLjcsMzc2LjktMTQwLjcsNDE3LjEtMTQwLjcsNDE3LjF6IiBmaWxsPSIjRkZGRkZGIi8+CiAgIDxwYXRo'+
			'IGQ9Ik0tMTc1LDQxMi42YzguOSwwLDE2LTcuMiwxNi0xNmMwLTguOS03LjItMTYtMTYtMTZjLTguOSwwLTE2LDcuMi0xNiwxNkMtMTkxLDQwNS40LTE4My45LDQxMi42LTE3NSw0MTIuNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTt6IE0tMTgwLjIsMzg3LjljMC0wLjksMC42LTEuMywxLjQtMC43bDEyLDguNGMwLjgsMC41LDAuOCwxLjQsMCwxLjlsLTEyLDguNGMtMC44LDAuNS0xLjQsMC4yLTEuNC0wLjdWMzg3Ljl6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._ht_video_video_url__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_video_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -16px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_video_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_video_url.onmouseover=function (e) {
			me._ht_video_video_url__img.style.visibility='hidden';
			me._ht_video_video_url__imgo.style.visibility='inherit';
		}
		me._ht_video_video_url.onmouseout=function (e) {
			me._ht_video_video_url__img.style.visibility='inherit';
			me._ht_video_video_url__imgo.style.visibility='hidden';
		}
		me._ht_video_video_url.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url.appendChild(me._ht_video_video_url);
		el=me._tt_ht_video_url=document.createElement('div');
		els=me._tt_ht_video_url__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_video_url";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -50px;';
		hs+='position : absolute;';
		hs+='top : 21px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_video_url.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_video_url.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_url'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_url.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_url.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_video_url.style[domTransition]='';
				if (me._tt_ht_video_url.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_video_url.style.visibility=(Number(me._tt_ht_video_url.style.opacity)>0||!me._tt_ht_video_url.style.opacity)?'inherit':'hidden';
					me._tt_ht_video_url.ggVisible=true;
				}
				else {
					me._tt_ht_video_url.style.visibility="hidden";
					me._tt_ht_video_url.ggVisible=false;
				}
			}
		}
		me._tt_ht_video_url.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_video_url.appendChild(me._tt_ht_video_url);
		me.__div = me._ht_video_url;
	};
	function SkinHotspotClass_ht_video_vimeo(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_video_vimeo=document.createElement('div');
		el.ggId="ht_video_vimeo";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_vimeo.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_vimeo.onclick=function (e) {
			skin._controller.style[domTransition]='none';
			skin._controller.style.visibility='hidden';
			skin._controller.ggVisible=false;
			skin._screentint.style[domTransition]='none';
			skin._screentint.style.visibility=(Number(skin._screentint.style.opacity)>0||!skin._screentint.style.opacity)?'inherit':'hidden';
			skin._screentint.ggVisible=true;
			skin._close.style[domTransition]='none';
			skin._close.style.visibility=(Number(skin._close.style.opacity)>0||!skin._close.style.opacity)?'inherit':'hidden';
			skin._close.ggVisible=true;
			skin._popup_video_vimeo.ggInitMedia(me.hotspot.url);
			if (skin._popup_video_vimeo.ggVideoNotLoaded) {
				skin._popup_video_vimeo.ggInitMedia(skin._popup_video_vimeo.ggVideoSource);
			}
			skin._popup_video_vimeo.style[domTransition]='none';
			skin._popup_video_vimeo.style.visibility=(Number(skin._popup_video_vimeo.style.opacity)>0||!skin._popup_video_vimeo.style.opacity)?'inherit':'hidden';
			skin._popup_video_vimeo.ggVisible=true;
			skin._video_popup_vimeo.style[domTransition]='none';
			skin._video_popup_vimeo.style.visibility=(Number(skin._video_popup_vimeo.style.opacity)>0||!skin._video_popup_vimeo.style.opacity)?'inherit':'hidden';
			skin._video_popup_vimeo.ggVisible=true;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_vimeo.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_vimeo.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_vimeo']=true;
			me._tt_ht_video_vimeo.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_vimeo.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_vimeo']=false;
			me._tt_ht_video_vimeo.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_vimeo.ontouchend=function (e) {
			me.elementMouseOver['ht_video_vimeo']=false;
			me._tt_ht_video_vimeo.logicBlock_visible();
		}
		me._ht_video_vimeo.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_video_video_vimeo=document.createElement('div');
		els=me._ht_video_video_vimeo__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTc1LDM0MC45Yy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFjMCwzMSwyNS4xLDU2LjEsNTYuMSw1Ni4xczU2LjEtMjUuMSw1Ni4xLTU2LjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xMTguOSwzNjYtMTQ0LDM0MC45LTE3NSwzNDAuOXogTS0xMzkuNCw0MjEuN2MwLDEuMy0xLDIuMy0yLjMsMi4zaC02Ni43Yy0xLjMsMC0yLjMtMS0yLjMtMi4zdi00OS40YzAtMS4zLDEtMi4zLDIuMy0yLjNoNjYuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS4zLDAsMi4zLDEsMi4zLDIuM1Y0MjEuN3oiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBh'+
			'dGggZD0iTS0xNzguNCw0MDVsMTAuOC03LjVjMC43LTAuNSwwLjctMS4zLDAtMS44bC0xMC44LTcuNWMtMC43LTAuNS0xLjMtMC4yLTEuMywwLjd2MTUuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTE3OS43LDQwNS4yLTE3OS4xLDQwNS41LTE3OC40LDQwNXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0yMDYuNSw0MTUuMWg2Mi40di0zNi4xaC02Mi40VjQxNS4xeiBNLTE3NSwzODIuMWM4LDAsMTQuNCw2LjUsMTQuNCwxNC40YzAsOC02LjUsMTQuNC0xNC40LDE0LjQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy04LDAtMTQuNC02LjUtMTQuNC0xNC40Qy0xODkuNCwzODguNi'+
			'0xODMsMzgyLjEtMTc1LDM4Mi4xeiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xNDEuNywzNzBoLTY2LjdjLTEuMywwLTIuMywxLTIuMywyLjN2NDkuNGMwLDEuMywxLDIuMywyLjMsMi4zaDY2LjdjMS4zLDAsMi4zLTEsMi4zLTIuM3YtNDkuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTEzOS40LDM3MS0xNDAuNCwzNzAtMTQxLjcsMzcweiBNLTE0NC4yLDQxNS4xaC02Mi40di0zNi4xaDYyLjRDLTE0NC4yLDM3OC45LTE0NC4yLDQxNS4xLTE0NC4yLDQxNS4xeiIgZmlsbD0iI0ZGRkZGRiIvPgogICA8cGF0aCBk'+
			'PSJNLTE3NSw0MTFjOCwwLDE0LjQtNi41LDE0LjQtMTQuNGMwLTgtNi41LTE0LjQtMTQuNC0xNC40Yy04LDAtMTQuNCw2LjUtMTQuNCwxNC40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTg5LjQsNDA0LjUtMTgzLDQxMS0xNzUsNDExeiBNLTE3OS43LDM4OC44YzAtMC44LDAuNi0xLjEsMS4zLTAuN2wxMC44LDcuNWMwLjcsMC41LDAuNywxLjMsMCwxLjhsLTEwLjgsNy41JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC43LDAuNS0xLjMsMC4yLTEuMy0wLjdWMzg4Ljh6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._ht_video_video_vimeo__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_video_vimeo__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTc1LDMzNC42Yy0zNC40LDAtNjIuNCwyNy45LTYyLjQsNjIuNGMwLDM0LjQsMjcuOSw2Mi40LDYyLjQsNjIuNHM2Mi40LTI3LjksNjIuNC02Mi40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTEyLjYsMzYyLjYtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTEzNS40LDQyNC40YzAsMS40LTEuMSwyLjYtMi42LDIuNkgtMjEyYy0xLjQsMC0yLjYtMS4xLTIuNi0yLjZ2LTU0LjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAtMS40LDEuMS0yLjYsMi42LTIuNmg3NC4xYzEuNCwwLDIuNiwxLjEsMi42LDIuNlY0MjQuNHoiIGZpbGw9IiMw'+
			'MDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNzguOCw0MDUuOWwxMi04LjRjMC44LTAuNSwwLjgtMS40LDAtMS45bC0xMi04LjRjLTAuOC0wLjUtMS40LTAuMi0xLjQsMC43djE3LjMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xODAuMiw0MDYuMS0xNzkuNiw0MDYuNC0xNzguOCw0MDUuOXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0yMTAsNDE3LjFoNjkuM3YtNDAuMkgtMjEwVjQxNy4xeiBNLTE3NSwzODAuNWM4LjksMCwxNiw3LjIsMTYsMTZjMCw4LjktNy4yLDE2LTE2LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtOC45LDAtMTYtNy4yLTE2LTE2Qy0xOTEsMzg3LjctMT'+
			'gzLjksMzgwLjUtMTc1LDM4MC41eiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xMzgsMzY3SC0yMTJjLTEuNCwwLTIuNiwxLjEtMi42LDIuNnY1NC45YzAsMS40LDEuMSwyLjYsMi42LDIuNmg3NC4xYzEuNCwwLDIuNi0xLjEsMi42LTIuNnYtNTQuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTEzNS40LDM2OC4xLTEzNi42LDM2Ny0xMzgsMzY3eiBNLTE0MC43LDQxNy4xSC0yMTB2LTQwLjJoNjkuM0MtMTQwLjcsMzc2LjktMTQwLjcsNDE3LjEtMTQwLjcsNDE3LjF6IiBmaWxsPSIjRkZGRkZGIi8+CiAgIDxwYXRo'+
			'IGQ9Ik0tMTc1LDQxMi42YzguOSwwLDE2LTcuMiwxNi0xNmMwLTguOS03LjItMTYtMTYtMTZjLTguOSwwLTE2LDcuMi0xNiwxNkMtMTkxLDQwNS40LTE4My45LDQxMi42LTE3NSw0MTIuNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTt6IE0tMTgwLjIsMzg3LjljMC0wLjksMC42LTEuMywxLjQtMC43bDEyLDguNGMwLjgsMC41LDAuOCwxLjQsMCwxLjlsLTEyLDguNGMtMC44LDAuNS0xLjQsMC4yLTEuNC0wLjdWMzg3Ljl6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._ht_video_video_vimeo__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_video_vimeo";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -16px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_video_vimeo.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_video_vimeo.onmouseover=function (e) {
			me._ht_video_video_vimeo__img.style.visibility='hidden';
			me._ht_video_video_vimeo__imgo.style.visibility='inherit';
		}
		me._ht_video_video_vimeo.onmouseout=function (e) {
			me._ht_video_video_vimeo__img.style.visibility='inherit';
			me._ht_video_video_vimeo__imgo.style.visibility='hidden';
		}
		me._ht_video_video_vimeo.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_vimeo.appendChild(me._ht_video_video_vimeo);
		el=me._tt_ht_video_vimeo=document.createElement('div');
		els=me._tt_ht_video_vimeo__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_video_vimeo";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -50px;';
		hs+='position : absolute;';
		hs+='top : 21px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_video_vimeo.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_video_vimeo.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_vimeo'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_vimeo.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_vimeo.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_video_vimeo.style[domTransition]='';
				if (me._tt_ht_video_vimeo.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_video_vimeo.style.visibility=(Number(me._tt_ht_video_vimeo.style.opacity)>0||!me._tt_ht_video_vimeo.style.opacity)?'inherit':'hidden';
					me._tt_ht_video_vimeo.ggVisible=true;
				}
				else {
					me._tt_ht_video_vimeo.style.visibility="hidden";
					me._tt_ht_video_vimeo.ggVisible=false;
				}
			}
		}
		me._tt_ht_video_vimeo.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_video_vimeo.appendChild(me._tt_ht_video_vimeo);
		me.__div = me._ht_video_vimeo;
	};
	function SkinHotspotClass_ht_video_youtube(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_video_youtube=document.createElement('div');
		el.ggId="ht_video_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 250px;';
		hs+='position : absolute;';
		hs+='top : 50px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_youtube.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_youtube.onclick=function (e) {
			skin._controller.style[domTransition]='none';
			skin._controller.style.visibility='hidden';
			skin._controller.ggVisible=false;
			skin._screentint.style[domTransition]='none';
			skin._screentint.style.visibility=(Number(skin._screentint.style.opacity)>0||!skin._screentint.style.opacity)?'inherit':'hidden';
			skin._screentint.ggVisible=true;
			skin._close.style[domTransition]='none';
			skin._close.style.visibility=(Number(skin._close.style.opacity)>0||!skin._close.style.opacity)?'inherit':'hidden';
			skin._close.ggVisible=true;
			skin._popup_video_youtube.ggInitMedia(me.hotspot.url);
			if (skin._popup_video_youtube.ggVideoNotLoaded) {
				skin._popup_video_youtube.ggInitMedia(skin._popup_video_youtube.ggVideoSource);
			}
			skin._popup_video_youtube.style[domTransition]='none';
			skin._popup_video_youtube.style.visibility=(Number(skin._popup_video_youtube.style.opacity)>0||!skin._popup_video_youtube.style.opacity)?'inherit':'hidden';
			skin._popup_video_youtube.ggVisible=true;
			skin._video_popup_youtube.style[domTransition]='none';
			skin._video_popup_youtube.style.visibility=(Number(skin._video_popup_youtube.style.opacity)>0||!skin._video_popup_youtube.style.opacity)?'inherit':'hidden';
			skin._video_popup_youtube.ggVisible=true;
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_youtube']=true;
			me._tt_ht_video_youtube.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_youtube']=false;
			me._tt_ht_video_youtube.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_video_youtube.ontouchend=function (e) {
			me.elementMouseOver['ht_video_youtube']=false;
			me._tt_ht_video_youtube.logicBlock_visible();
		}
		me._ht_video_youtube.ggUpdatePosition=function (useTransition) {
		}
		el=me._ht_video_video_youtube=document.createElement('div');
		els=me._ht_video_video_youtube__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTc1LDM0MC45Yy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFjMCwzMSwyNS4xLDU2LjEsNTYuMSw1Ni4xczU2LjEtMjUuMSw1Ni4xLTU2LjEmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xMTguOSwzNjYtMTQ0LDM0MC45LTE3NSwzNDAuOXogTS0xMzkuNCw0MjEuN2MwLDEuMy0xLDIuMy0yLjMsMi4zaC02Ni43Yy0xLjMsMC0yLjMtMS0yLjMtMi4zdi00OS40YzAtMS4zLDEtMi4zLDIuMy0yLjNoNjYuNyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtjMS4zLDAsMi4zLDEsMi4zLDIuM1Y0MjEuN3oiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBh'+
			'dGggZD0iTS0xNzguNCw0MDVsMTAuOC03LjVjMC43LTAuNSwwLjctMS4zLDAtMS44bC0xMC44LTcuNWMtMC43LTAuNS0xLjMtMC4yLTEuMywwLjd2MTUuNSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTE3OS43LDQwNS4yLTE3OS4xLDQwNS41LTE3OC40LDQwNXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0yMDYuNSw0MTUuMWg2Mi40di0zNi4xaC02Mi40VjQxNS4xeiBNLTE3NSwzODIuMWM4LDAsMTQuNCw2LjUsMTQuNCwxNC40YzAsOC02LjUsMTQuNC0xNC40LDE0LjQmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Yy04LDAtMTQuNC02LjUtMTQuNC0xNC40Qy0xODkuNCwzODguNi'+
			'0xODMsMzgyLjEtMTc1LDM4Mi4xeiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xNDEuNywzNzBoLTY2LjdjLTEuMywwLTIuMywxLTIuMywyLjN2NDkuNGMwLDEuMywxLDIuMywyLjMsMi4zaDY2LjdjMS4zLDAsMi4zLTEsMi4zLTIuM3YtNDkuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTEzOS40LDM3MS0xNDAuNCwzNzAtMTQxLjcsMzcweiBNLTE0NC4yLDQxNS4xaC02Mi40di0zNi4xaDYyLjRDLTE0NC4yLDM3OC45LTE0NC4yLDQxNS4xLTE0NC4yLDQxNS4xeiIgZmlsbD0iI0ZGRkZGRiIvPgogICA8cGF0aCBk'+
			'PSJNLTE3NSw0MTFjOCwwLDE0LjQtNi41LDE0LjQtMTQuNGMwLTgtNi41LTE0LjQtMTQuNC0xNC40Yy04LDAtMTQuNCw2LjUtMTQuNCwxNC40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTg5LjQsNDA0LjUtMTgzLDQxMS0xNzUsNDExeiBNLTE3OS43LDM4OC44YzAtMC44LDAuNi0xLjEsMS4zLTAuN2wxMC44LDcuNWMwLjcsMC41LDAuNywxLjMsMCwxLjhsLTEwLjgsNy41JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtMC43LDAuNS0xLjMsMC4yLTEuMy0wLjdWMzg4Ljh6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._ht_video_video_youtube__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._ht_video_video_youtube__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHZpZXdCb3g9Ii0yNDAgMzMyIDEzMCAxMzAiIHk9IjBweCIgYmFzZVByb2ZpbGU9InRpbnkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPGc+CiAgIDxwYXRoIGQ9Ik0tMTc1LDMzNC42Yy0zNC40LDAtNjIuNCwyNy45LTYyLjQsNjIuNGMwLDM0LjQsMjcuOSw2Mi40LDYyLjQsNjIuNHM2Mi40LTI3LjksNjIuNC02Mi40JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O0MtMTEyLjYsMzYyLjYtMTQwLjYsMzM0LjYtMTc1LDMzNC42eiBNLTEzNS40LDQyNC40YzAsMS40LTEuMSwyLjYtMi42LDIuNkgtMjEyYy0xLjQsMC0yLjYtMS4xLTIuNi0yLjZ2LTU0LjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7YzAtMS40LDEuMS0yLjYsMi42LTIuNmg3NC4xYzEuNCwwLDIuNiwxLjEsMi42LDIuNlY0MjQuNHoiIGZpbGw9IiMw'+
			'MDAwMDAiLz4KICAgPHBhdGggZD0iTS0xNzguOCw0MDUuOWwxMi04LjRjMC44LTAuNSwwLjgtMS40LDAtMS45bC0xMi04LjRjLTAuOC0wLjUtMS40LTAuMi0xLjQsMC43djE3LjMmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7Qy0xODAuMiw0MDYuMS0xNzkuNiw0MDYuNC0xNzguOCw0MDUuOXoiIGZpbGw9IiMwMDAwMDAiLz4KICAgPHBhdGggZD0iTS0yMTAsNDE3LjFoNjkuM3YtNDAuMkgtMjEwVjQxNy4xeiBNLTE3NSwzODAuNWM4LjksMCwxNiw3LjIsMTYsMTZjMCw4LjktNy4yLDE2LTE2LDE2JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5O2MtOC45LDAtMTYtNy4yLTE2LTE2Qy0xOTEsMzg3LjctMT'+
			'gzLjksMzgwLjUtMTc1LDM4MC41eiIgZmlsbD0iIzAwMDAwMCIvPgogIDwvZz4KIDwvZz4KIDxnIGlkPSJMYXllcl8yIj4KICA8Zz4KICAgPHBhdGggZD0iTS0xMzgsMzY3SC0yMTJjLTEuNCwwLTIuNiwxLjEtMi42LDIuNnY1NC45YzAsMS40LDEuMSwyLjYsMi42LDIuNmg3NC4xYzEuNCwwLDIuNi0xLjEsMi42LTIuNnYtNTQuOSYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTtDLTEzNS40LDM2OC4xLTEzNi42LDM2Ny0xMzgsMzY3eiBNLTE0MC43LDQxNy4xSC0yMTB2LTQwLjJoNjkuM0MtMTQwLjcsMzc2LjktMTQwLjcsNDE3LjEtMTQwLjcsNDE3LjF6IiBmaWxsPSIjRkZGRkZGIi8+CiAgIDxwYXRo'+
			'IGQ9Ik0tMTc1LDQxMi42YzguOSwwLDE2LTcuMiwxNi0xNmMwLTguOS03LjItMTYtMTYtMTZjLTguOSwwLTE2LDcuMi0xNiwxNkMtMTkxLDQwNS40LTE4My45LDQxMi42LTE3NSw0MTIuNiYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTt6IE0tMTgwLjIsMzg3LjljMC0wLjksMC42LTEuMywxLjQtMC43bDEyLDguNGMwLjgsMC41LDAuOCwxLjQsMCwxLjlsLTEyLDguNGMtMC44LDAuNS0xLjQsMC4yLTEuNC0wLjdWMzg3Ljl6IiBmaWxsPSIjRkZGRkZGIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._ht_video_video_youtube__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="ht_video_video_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : -16px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_video_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_video_video_youtube.onmouseover=function (e) {
			me._ht_video_video_youtube__img.style.visibility='hidden';
			me._ht_video_video_youtube__imgo.style.visibility='inherit';
		}
		me._ht_video_video_youtube.onmouseout=function (e) {
			me._ht_video_video_youtube__img.style.visibility='inherit';
			me._ht_video_video_youtube__imgo.style.visibility='hidden';
		}
		me._ht_video_video_youtube.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_youtube.appendChild(me._ht_video_video_youtube);
		el=me._tt_ht_video_youtube=document.createElement('div');
		els=me._tt_ht_video_youtube__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_video_youtube";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -50px;';
		hs+='position : absolute;';
		hs+='top : 21px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_video_youtube.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_video_youtube.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_youtube'] == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_youtube.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_youtube.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_video_youtube.style[domTransition]='';
				if (me._tt_ht_video_youtube.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_video_youtube.style.visibility=(Number(me._tt_ht_video_youtube.style.opacity)>0||!me._tt_ht_video_youtube.style.opacity)?'inherit':'hidden';
					me._tt_ht_video_youtube.ggVisible=true;
				}
				else {
					me._tt_ht_video_youtube.style.visibility="hidden";
					me._tt_ht_video_youtube.ggVisible=false;
				}
			}
		}
		me._tt_ht_video_youtube.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._ht_video_youtube.appendChild(me._tt_ht_video_youtube);
		me.__div = me._ht_video_youtube;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='ht_node') {
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node_active();;
			me.callChildLogicBlocksHotspot_ht_node_changevisitednodes();;
		} else
		if (hotspot.skinid=='ht_url') {
			hotspot.skinid = 'ht_url';
			hsinst = new SkinHotspotClass_ht_url(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_url_mouseover();;
		} else
		if (hotspot.skinid=='ht_info') {
			hotspot.skinid = 'ht_info';
			hsinst = new SkinHotspotClass_ht_info(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_info_mouseover();;
		} else
		if (hotspot.skinid=='ht_image') {
			hotspot.skinid = 'ht_image';
			hsinst = new SkinHotspotClass_ht_image(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_image_mouseover();;
		} else
		if (hotspot.skinid=='ht_video_file') {
			hotspot.skinid = 'ht_video_file';
			hsinst = new SkinHotspotClass_ht_video_file(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_video_file_mouseover();;
		} else
		if (hotspot.skinid=='ht_video_url') {
			hotspot.skinid = 'ht_video_url';
			hsinst = new SkinHotspotClass_ht_video_url(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_video_url_mouseover();;
		} else
		if (hotspot.skinid=='ht_video_vimeo') {
			hotspot.skinid = 'ht_video_vimeo';
			hsinst = new SkinHotspotClass_ht_video_vimeo(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_video_vimeo_mouseover();;
		} else
		{
			hotspot.skinid = 'ht_video_youtube';
			hsinst = new SkinHotspotClass_ht_video_youtube(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				hotspotTemplates['ht_node'][i] = null;
			}
		}
		if(hotspotTemplates['ht_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_url'].length; i++) {
				hotspotTemplates['ht_url'][i] = null;
			}
		}
		if(hotspotTemplates['ht_info']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_info'].length; i++) {
				hotspotTemplates['ht_info'][i] = null;
			}
		}
		if(hotspotTemplates['ht_image']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_image'].length; i++) {
				hotspotTemplates['ht_image'][i] = null;
			}
		}
		if(hotspotTemplates['ht_video_file']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
				hotspotTemplates['ht_video_file'][i] = null;
			}
		}
		if(hotspotTemplates['ht_video_url']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
				hotspotTemplates['ht_video_url'][i] = null;
			}
		}
		if(hotspotTemplates['ht_video_vimeo']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_vimeo'].length; i++) {
				hotspotTemplates['ht_video_vimeo'][i] = null;
			}
		}
		if(hotspotTemplates['ht_video_youtube']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_video_youtube'].length; i++) {
				hotspotTemplates['ht_video_youtube'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	function SkinElement_marker_normal_Class(parentScope,ggParent) {
		var me=this;
		var flag=false;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		
		el=me._marker_normal=document.createElement('div');
		els=me._marker_normal__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KPHN2ZyB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHNvZGlwb2RpOmRvY25hbWU9ImpjdV9tYXJrZXJfbm9ybWFsLnN2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB2ZXJzaW9uPSIxLjEiIHhtbG5zOn'+
			'NvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgd2lkdGg9IjYwIiB4PSIwcHgiIGlkPSJzdmcxMDI1IiB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIgeT0iMHB4IiBoZWlnaHQ9IjgwIiBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjIgNWMzZTgwZCwgMjAxNy0wOC0wNiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzAgMzAiIHZpZXdCb3g9IjAgMCA2MC4wMDAwMDEgNzkuOTk5OTk5IiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpz'+
			'dmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPG1ldGFkYXRhIGlkPSJtZXRhZGF0YTEwMzEiPgogIDxyZGY6UkRGPgogICA8Y2M6V29yayByZGY6YWJvdXQ9IiI+CiAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgIDxkYzp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiLz4KICAgIDxkYzp0aXRsZS8+CiAgIDwvY2M6V29yaz4KICA8L3JkZjpSREY+CiA8L21ldGFkYXRhPgogPGRlZnMgaWQ9ImRlZnMxMDI5Ii8+CiA8c29kaXBvZGk6bm'+
			'FtZWR2aWV3IGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9InRydWUiIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSIgb2JqZWN0dG9sZXJhbmNlPSIxMCIgaW5rc2NhcGU6em9vbT0iMTEuNzEyNSIgaW5rc2NhcGU6d2luZG93LXk9IjkiIGZpdC1tYXJnaW4tcmlnaHQ9IjAiIGlua3NjYXBlOndpbmRvdy14PSI3OCIgc2hvd2d1aWRlcz0iZmFsc2UiIGdyaWR0b2xlcmFuY2U9IjEwIiBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE4NDgiIGlkPSJuYW1lZHZpZXcxMDI3IiBib3JkZXJjb2xvcj0iIzY2NjY2NiIgaW5rc2NhcGU6d2luZG93LW1heGlt'+
			'aXplZD0iMCIgaW5rc2NhcGU6Y3g9IjMwIiBmaXQtbWFyZ2luLWJvdHRvbT0iMCIgYm9yZGVyb3BhY2l0eT0iMSIgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiIHNob3dncmlkPSJmYWxzZSIgZ3VpZGV0b2xlcmFuY2U9IjEwIiBmaXQtbWFyZ2luLWxlZnQ9IjAiIGZpdC1tYXJnaW4tdG9wPSIwIiBwYWdlY29sb3I9IiNmZmZmZmYiIGlua3NjYXBlOmN5PSIzMy4yNTI3NjQiIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjExMTQiLz4KIDxnIHN0eWxlPSJkaXNwbGF5Om5vbmUiIGlkPSJMYXllcl8xIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC40Mjc0NDE1Myw1MS41MjUwMSkiIGRpc3BsYXk9Im5vbm'+
			'UiPgogIDxwYXRoIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0ibSAxOS43NTQsMi45MTUgYyAtMC4zNTMsMi4xNTMgLTEuOTM5LDQuMDY2IC00Ljc2LDQuMDY2IC0yLjgyNSwwIC00LjQxMiwtMS45MTkgLTQuNzYyLC00LjA3NiAtNC44MjksMS44OTkgLTguMjU3LDYuNTggLTguMjU3LDEyLjA4MyAwLDcuMTgzIDUuODIzLDEzLjAwNyAxMy4wMDYsMTMuMDA3IDcuMTg0LDAgMTMuMDA3LC01LjgyNCAxMy4wMDcsLTEzLjAwNyBDIDI3Ljk4Nyw5LjQ5NCAyNC41Nyw0LjgyMSAxOS43NTQsMi45MTUgWiIgc3R5bGU9ImRpc3BsYXk6aW5saW5l'+
			'O2ZpbGw6bm9uZTtzdHJva2U6Izk5OTk5OTtzdHJva2Utd2lkdGg6MztzdHJva2UtbWl0ZXJsaW1pdDoxMCIgaWQ9InBhdGgxMDEwIiBkaXNwbGF5PSJpbmxpbmUiLz4KIDwvZz4KIDxnIHN0eWxlPSJkaXNwbGF5Om5vbmUiIGlkPSJMYXllcl8xX2NvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjQyNzQ0MTUzLDUxLjUyNTAxKSIgZGlzcGxheT0ibm9uZSI+CiAgPHBhdGggaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJtIDE5Ljc1NCwyLjkxNSBjIC0wLjM1MywyLjE1MyAtMS45MzksNC4wNjYgLTQuNzYsNC4wNjYgLTIuODI1LDAgLT'+
			'QuNDEyLC0xLjkxOSAtNC43NjIsLTQuMDc2IC00LjgyOSwxLjg5OSAtOC4yNTcsNi41OCAtOC4yNTcsMTIuMDgzIDAsNy4xODMgNS44MjMsMTMuMDA3IDEzLjAwNiwxMy4wMDcgNy4xODQsMCAxMy4wMDcsLTUuODI0IDEzLjAwNywtMTMuMDA3IEMgMjcuOTg3LDkuNDk0IDI0LjU3LDQuODIxIDE5Ljc1NCwyLjkxNSBaIiBzdHlsZT0iZGlzcGxheTppbmxpbmU7ZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwIiBpZD0icGF0aDEwMTMiIGRpc3BsYXk9ImlubGluZSIvPgogPC9nPgogPGcgc3R5bGU9ImRpc3BsYXk6bm9uZSIgaWQ9IkxheWVy'+
			'XzUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjQyNzQ0MTUzLDUxLjUyNTAxKSIgZGlzcGxheT0ibm9uZSI+CiAgPGNpcmNsZSBzdHlsZT0iZGlzcGxheTppbmxpbmU7ZmlsbDojZWUxZDNhIiBpZD0iY2lyY2xlMTAyMiIgY3k9IjIuMDA3IiByPSIyLjA1MyIgY3g9IjE1IiBkaXNwbGF5PSJpbmxpbmUiLz4KIDwvZz4KIDxnIHN0eWxlPSJkaXNwbGF5OmlubGluZSIgaWQ9ImxheWVyMiIgaW5rc2NhcGU6bGFiZWw9ImJvcmRlciIgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNDI3NDQxNTMsNTEuNTI1MDEpIj4KICA8ZyBzdHlsZT0iZGlzcGxheTppbm'+
			'xpbmU7ZmlsbDpub25lO2ZpbGwtb3BhY2l0eTowO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDo0LjE1NzE0MjY0O3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiIGlkPSJMYXllcl8zX2NvcHkiIHRyYW5zZm9ybT0ibWF0cml4KDEuMzMsMCwwLDEuMzMsMTAuODQ1MDkxLC01LjMzNDIwNDgpIj4KICAgPHBhdGggaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLW9wYWNpdHk6MDtzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6NC4xNTcxNDI2NDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0'+
			'cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiBkPSJNIDIzLjA1MywxNSBBIDguMDUzMDAwNSw4LjA1MzAwMDUgMCAwIDEgMTUsMjMuMDUzIDguMDUzMDAwNSw4LjA1MzAwMDUgMCAwIDEgNi45NDY5OTk1LDE1IDguMDUzMDAwNSw4LjA1MzAwMDUgMCAwIDEgMTUsNi45NDY5OTk1IDguMDUzMDAwNSw4LjA1MzAwMDUgMCAwIDEgMjMuMDUzLDE1IFoiIGlkPSJjaXJjbGUxMDE5Ii8+CiAgPC9nPgogPC9nPgogPGcgc3R5bGU9ImRpc3BsYXk6aW5saW5lIiBpZD0ibGF5ZXIxIiBpbmtzY2FwZTpsYWJlbD0iZmlsbCIgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIgdHJhbnNmb3JtPS'+
			'J0cmFuc2xhdGUoLTAuNDI3NDQxNTMsNTEuNTI1MDEpIj4KICA8ZyBzdHlsZT0iZGlzcGxheTppbmxpbmU7ZmlsbDpub25lO2ZpbGwtb3BhY2l0eTowO3N0cm9rZTojZmY4ODAwO3N0cm9rZS13aWR0aDoyLjI2NzcxNjY1O3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiIGlkPSJMYXllcl8zIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjMzLDAsMCwxLjMzLDEwLjg0NTA5LC01LjMzNDIwNDkpIj4KICAgPGNpcmNsZSBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1vcGFjaXR5OjA7c3Ryb2tlOiNmZjg4MDA7c3Ry'+
			'b2tlLXdpZHRoOjIuMjY3NzE2NjU7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgaWQ9ImNpcmNsZTEwMTYiIGN5PSIxNSIgcj0iOC4wNTMwMDA1IiBjeD0iMTUiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._marker_normal__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_normal";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 50px;';
		hs+='left : 140px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_normal.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._marker_normal.ggUpdatePosition=function (useTransition) {
		}
	};
	function SkinElement_marker_active_Class(parentScope,ggParent) {
		var me=this;
		var flag=false;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		
		el=me._marker_active=document.createElement('div');
		els=me._marker_active__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KPHN2ZyB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHNvZGlwb2RpOmRvY25hbWU9ImpjdV9tYXJrZXJfYWN0aXZlX29yYW5nZS5zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgdmVyc2lvbj0iMS4xIi'+
			'B4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiIHdpZHRoPSI2MCIgeD0iMHB4IiBpZD0ic3ZnMTAyNSIgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHk9IjBweCIgaGVpZ2h0PSI4MCIgaW5rc2NhcGU6dmVyc2lvbj0iMC45Mi4yIDVjM2U4MGQsIDIwMTctMDgtMDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB2aWV3Qm94PSIwIDAgNjAuMDAwMDAxIDc5Ljk5OTk5OSIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIg'+
			'eG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDxtZXRhZGF0YSBpZD0ibWV0YWRhdGExMDMxIj4KICA8cmRmOlJERj4KICAgPGNjOldvcmsgcmRmOmFib3V0PSIiPgogICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICA8ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIi8+CiAgICA8ZGM6dGl0bGUvPgogICA8L2NjOldvcms+CiAgPC9yZGY6UkRGPgogPC9tZXRhZGF0YT4KIDxkZWZzIGlkPSJkZWZzMTAyOSIvPgogPHNvZG'+
			'lwb2RpOm5hbWVkdmlldyBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSJ0cnVlIiBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiIG9iamVjdHRvbGVyYW5jZT0iMTAiIGlua3NjYXBlOnpvb209IjExLjcxMjUiIGlua3NjYXBlOndpbmRvdy15PSI5IiBmaXQtbWFyZ2luLXJpZ2h0PSIwIiBpbmtzY2FwZTp3aW5kb3cteD0iNzgiIHNob3dndWlkZXM9ImZhbHNlIiBncmlkdG9sZXJhbmNlPSIxMCIgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxODQ4IiBpZD0ibmFtZWR2aWV3MTAyNyIgYm9yZGVyY29sb3I9IiM2NjY2NjYiIGlua3NjYXBlOndpbmRv'+
			'dy1tYXhpbWl6ZWQ9IjAiIGlua3NjYXBlOmN4PSIzMCIgZml0LW1hcmdpbi1ib3R0b209IjAiIGJvcmRlcm9wYWNpdHk9IjEiIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIiBzaG93Z3JpZD0iZmFsc2UiIGd1aWRldG9sZXJhbmNlPSIxMCIgZml0LW1hcmdpbi1sZWZ0PSIwIiBmaXQtbWFyZ2luLXRvcD0iMCIgcGFnZWNvbG9yPSIjZmZmZmZmIiBpbmtzY2FwZTpjeT0iMzMuMjUyNzY0IiBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMTE0Ii8+CiA8ZyBzdHlsZT0iZGlzcGxheTpub25lIiBpZD0iTGF5ZXJfMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuNDI3NDQxNTMsNTEuNTI1MDEpIiBkaXNwbG'+
			'F5PSJub25lIj4KICA8cGF0aCBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Im0gMTkuNzU0LDIuOTE1IGMgLTAuMzUzLDIuMTUzIC0xLjkzOSw0LjA2NiAtNC43Niw0LjA2NiAtMi44MjUsMCAtNC40MTIsLTEuOTE5IC00Ljc2MiwtNC4wNzYgLTQuODI5LDEuODk5IC04LjI1Nyw2LjU4IC04LjI1NywxMi4wODMgMCw3LjE4MyA1LjgyMywxMy4wMDcgMTMuMDA2LDEzLjAwNyA3LjE4NCwwIDEzLjAwNywtNS44MjQgMTMuMDA3LC0xMy4wMDcgQyAyNy45ODcsOS40OTQgMjQuNTcsNC44MjEgMTkuNzU0LDIuOTE1IFoiIHN0eWxlPSJkaXNwbGF5'+
			'OmlubGluZTtmaWxsOm5vbmU7c3Ryb2tlOiM5OTk5OTk7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlLW1pdGVybGltaXQ6MTAiIGlkPSJwYXRoMTAxMCIgZGlzcGxheT0iaW5saW5lIi8+CiA8L2c+CiA8ZyBzdHlsZT0iZGlzcGxheTpub25lIiBpZD0iTGF5ZXJfMV9jb3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC40Mjc0NDE1Myw1MS41MjUwMSkiIGRpc3BsYXk9Im5vbmUiPgogIDxwYXRoIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0ibSAxOS43NTQsMi45MTUgYyAtMC4zNTMsMi4xNTMgLTEuOTM5LDQuMDY2IC00Ljc2LDQuMDY2IC0yLj'+
			'gyNSwwIC00LjQxMiwtMS45MTkgLTQuNzYyLC00LjA3NiAtNC44MjksMS44OTkgLTguMjU3LDYuNTggLTguMjU3LDEyLjA4MyAwLDcuMTgzIDUuODIzLDEzLjAwNyAxMy4wMDYsMTMuMDA3IDcuMTg0LDAgMTMuMDA3LC01LjgyNCAxMy4wMDcsLTEzLjAwNyBDIDI3Ljk4Nyw5LjQ5NCAyNC41Nyw0LjgyMSAxOS43NTQsMi45MTUgWiIgc3R5bGU9ImRpc3BsYXk6aW5saW5lO2ZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MjtzdHJva2UtbWl0ZXJsaW1pdDoxMCIgaWQ9InBhdGgxMDEzIiBkaXNwbGF5PSJpbmxpbmUiLz4KIDwvZz4KIDxnIHN0eWxlPSJkaXNwbGF5Om5vbmUiIGlk'+
			'PSJMYXllcl81IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC40Mjc0NDE1Myw1MS41MjUwMSkiIGRpc3BsYXk9Im5vbmUiPgogIDxjaXJjbGUgc3R5bGU9ImRpc3BsYXk6aW5saW5lO2ZpbGw6I2VlMWQzYSIgaWQ9ImNpcmNsZTEwMjIiIGN5PSIyLjAwNyIgcj0iMi4wNTMiIGN4PSIxNSIgZGlzcGxheT0iaW5saW5lIi8+CiA8L2c+CiA8ZyBzdHlsZT0iZGlzcGxheTppbmxpbmUiIGlkPSJsYXllcjIiIGlua3NjYXBlOmxhYmVsPSJib3JkZXIiIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjQyNzQ0MTUzLDUxLjUyNTAxKSI+CiAgPGcgc3R5bGU9ImRpc3'+
			'BsYXk6aW5saW5lO2ZpbGw6bm9uZTtmaWxsLW9wYWNpdHk6MDtzdHJva2U6I2ZmZmZmZjtzdHJva2Utd2lkdGg6NC4xNTcxNDI2NDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiBpZD0iTGF5ZXJfM19jb3B5IiB0cmFuc2Zvcm09Im1hdHJpeCgxLjMzLDAsMCwxLjMzLDEwLjg0NTA5MSwtNS4zMzQyMDQ4KSI+CiAgIDxwYXRoIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1vcGFjaXR5OjA7c3Ryb2tlOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjQuMTU3MTQyNjQ7c3Ryb2tlLW1pdGVybGlt'+
			'aXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgZD0iTSAyMy4wNTMsMTUgQSA4LjA1MzAwMDUsOC4wNTMwMDA1IDAgMCAxIDE1LDIzLjA1MyA4LjA1MzAwMDUsOC4wNTMwMDA1IDAgMCAxIDYuOTQ2OTk5NSwxNSA4LjA1MzAwMDUsOC4wNTMwMDA1IDAgMCAxIDE1LDYuOTQ2OTk5NSA4LjA1MzAwMDUsOC4wNTMwMDA1IDAgMCAxIDIzLjA1MywxNSBaIiBpZD0iY2lyY2xlMTAxOSIvPgogIDwvZz4KIDwvZz4KIDxnIHN0eWxlPSJkaXNwbGF5OmlubGluZSIgaWQ9ImxheWVyMSIgaW5rc2NhcGU6bGFiZWw9ImZpbGwiIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiIHRyYW'+
			'5zZm9ybT0idHJhbnNsYXRlKC0wLjQyNzQ0MTUzLDUxLjUyNTAxKSI+CiAgPGcgc3R5bGU9ImRpc3BsYXk6aW5saW5lO2ZpbGw6bm9uZTtmaWxsLW9wYWNpdHk6MDtzdHJva2U6I2ZmODgwMDtzdHJva2Utd2lkdGg6Mi4yNjc3MTY2NTtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiBpZD0iTGF5ZXJfMyIgdHJhbnNmb3JtPSJtYXRyaXgoMS4zMywwLDAsMS4zMywxMC44NDUwOSwtNS4zMzQyMDQ5KSI+CiAgIDxjaXJjbGUgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtb3BhY2l0eTowO3N0cm9rZTojZmY4'+
			'ODAwO3N0cm9rZS13aWR0aDoyLjI2NzcxNjY1O3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiIGlkPSJjaXJjbGUxMDE2IiBjeT0iMTUiIHI9IjguMDUzMDAwNSIgY3g9IjE1Ii8+CiAgPC9nPgogIDxwYXRoIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIHN0eWxlPSJmaWxsOiNmZjg4MDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjIuOTg2MDg3MDhweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIiBkPSJNIDQuOTg5NTMyMSwtND'+
			'kuMjIwOTA0IDU2LjQwMDQxNSwtNDkuNTMxNDg3IDMwLjg5NDY1OSwtNS41MTUzMTIgWiIgaWQ9InBhdGgxMTMyIi8+CiA8L2c+Cjwvc3ZnPgo=';
		me._marker_active__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 50px;';
		hs+='left : 106px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 40px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._marker_active.ggUpdatePosition=function (useTransition) {
		}
	};
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me._fullscreen_off.logicBlock_visible();
	me._fullscreen.logicBlock_visible();
	me._movemode_1.logicBlock_visible();
	me._movemode_2.logicBlock_visible();
	player.addListener('fullscreenenter', function(args) { me._fullscreen_off.logicBlock_visible();me._fullscreen.logicBlock_visible(); });
	player.addListener('fullscreenexit', function(args) { me._fullscreen_off.logicBlock_visible();me._fullscreen.logicBlock_visible(); });
	player.addListener('changenode', function(args) { me._movemode_1.logicBlock_visible();me._movemode_2.logicBlock_visible(); });
	player.addListener('viewmodechanged', function(args) { me._movemode_1.logicBlock_visible();me._movemode_2.logicBlock_visible(); });
	player.addListener('mouseover', function(args) { me.callChildLogicBlocksHotspot_ht_node_mouseover();me.callChildLogicBlocksHotspot_ht_url_mouseover();me.callChildLogicBlocksHotspot_ht_info_mouseover();me.callChildLogicBlocksHotspot_ht_image_mouseover();me.callChildLogicBlocksHotspot_ht_video_file_mouseover();me.callChildLogicBlocksHotspot_ht_video_url_mouseover();me.callChildLogicBlocksHotspot_ht_video_vimeo_mouseover();me.callChildLogicBlocksHotspot_ht_video_youtube_mouseover(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_node_active(); });
	player.addListener('changevisitednodes', function(args) { me.callChildLogicBlocksHotspot_ht_node_changevisitednodes(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	me.skinTimerEvent();
};