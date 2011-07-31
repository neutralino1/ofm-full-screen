
if(typeof(OfmHtmlPlayer) == 'undefined'){OfmHtmlPlayer={};OfmHtmlPlayer.ll_not_loaded=1;OfmHtmlPlayer.ll_loading=2;OfmHtmlPlayer.ll_loaded=3;OfmHtmlPlayer.ll_page_size=20;OfmHtmlPlayer.ll_threshold=5;OfmHtmlPlayer.EVENT_CORE_READY='READY';OfmHtmlPlayer.EVENT_CHANGE_TRACKLIST='CHANGE_TRACKLIST';OfmHtmlPlayer.EVENT_CHANGE_TRACK='CHANGE_TRACK';OfmHtmlPlayer.EVENT_TRACKLIST_END='TRACKLIST_END';OfmHtmlPlayer.EVENT_TIME_LOAD_PROGRESS='TRACK_LOAD_PROGRESS';OfmHtmlPlayer.EVENT_TIME_LOAD_COMPLETE='TRACK_LOAD_COMPLETE';OfmHtmlPlayer.EVENT_TIME_UPDATE='PROGRESS';OfmHtmlPlayer.EVENT_TIMELINE_CHANGED='TIMELINE_CHANGED';OfmHtmlPlayer.EVENT_PLAY_END='PLAY_END';OfmHtmlPlayer.EVENT_SHUFFLE_UPDATED='SHUFFLE_UPDATED';OfmHtmlPlayer.EVENT_SHOW_SPINNER='SHOW_SPINNER';OfmHtmlPlayer.EVENT_HIDE_SPINNER='HIDE_SPINNER';OfmHtmlPlayer.EVENT_VOTE_UPDATED='VOTE_UPDATED';OfmHtmlPlayer.EVENT_CORE_PLAY='PLAY';OfmHtmlPlayer.EVENT_CORE_PAUSE='PAUSE';OfmHtmlPlayer.PLAYER_SIZES={large:[220,350],standard:[160,240],small:['100%',40],mini:[34,18],artwork:[250,250]};OfmHtmlPlayer.mergeOptions=function(opt1,opt2){var res={};if(opt1)for(var opt in opt1){res[opt]=opt2[opt]?opt2[opt]:opt1[opt];}
if(opt2)for(var opt in opt2){res[opt]=res[opt]?res[opt]:opt2[opt];}
return res;};OfmHtmlPlayer.evalAsBool=function(s){return(s=='true'||s=='yes'||s=='1');};OfmHtmlPlayer.js_hasClass=function(ele,cls){return((ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')))!=null);};OfmHtmlPlayer.js_addClass=function(ele,cls){if(!OfmHtmlPlayer.js_hasClass(ele,cls))ele.className+=(" "+cls);};OfmHtmlPlayer.js_removeClass=function(ele,cls){if(OfmHtmlPlayer.js_hasClass(ele,cls)){var reg=new RegExp('(\\s|^)'+cls+'(\\s|$)');ele.className=ele.className.replace(reg,' ');}};OfmHtmlPlayer.js_toggleClass=function(ele,cls){if(OfmHtmlPlayer.js_hasClass(ele,cls))OfmHtmlPlayer.js_removeClass(ele,cls)
else OfmHtmlPlayer.js_addClass(ele,cls)};OfmHtmlPlayer.js_toggleDisplay=function(elem){if(elem.style.display=='')elem.style.display='none';else elem.style.display='';};OfmHtmlPlayer.js_navigate_to=function(url,same_window){window.open(url,same_window?'_self':'_blank');};OfmHtmlPlayer.element_dimensions=function(elem){var dim={};dim.inner={width:elem.clientWidth,height:elem.clientHeight};dim.outer={width:elem.offsetWidth,height:elem.offsetHeight};dim.scroll={width:elem.scrollWidth,height:elem.scrollHeight<elem.clientHeight?elem.clientHeight:elem.scrollHeight,left:elem.scrollLeft,top:elem.scrollTop};var tmp=elem;dim.left=dim.top=0;while(tmp.offsetParent){dim.left+=tmp.offsetLeft;dim.top+=tmp.offsetTop;tmp=tmp.offsetParent;}
return dim;};}
if(!Function.prototype.bind){Function.prototype.bind=function(bind){var self=this,slice=[].slice,args=(arguments.length>1)?slice.call(arguments,1):null;return function(){if(!args&&!arguments.length)return self.call(bind);if(args&&arguments.length)return self.apply(bind,args.concat(Array.from(arguments)));return self.apply(bind,args||arguments);};};}
OfmHtmlPlayer.OfmEvent=function(l){this.listener=l;}
OfmHtmlPlayer.OfmEvent.prototype.set_listener=function(l){this.listener=l;}
OfmHtmlPlayer.OfmEvent.prototype.broadcast=function(e){if(this.listener){this.listener(e);}}
OfmHtmlPlayer.OfmJspfLoader=function(){this.callbacks=new Array();}
OfmHtmlPlayer.OfmJspfLoader.prototype.add=function(url,onload){this.callbacks.push(onload);url=url+(url.indexOf('?')>0?'&':'?')+'ref='+(this.callbacks.length-1);var elem=document.createElement('script');elem.type='text/javascript';elem.async=true;elem.src=url;var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(elem,s);}
OfmHtmlPlayer.OfmJspfLoader.prototype.jspf_listener=function(result){if(result&&result.ref)this.callbacks[result.ref](result);}
OfmHtmlPlayer.OfmAudio=function(options){this.options={start_with_mp3:null,listener:null,debug_audio:null};this.playing=false;this.loading=false;this.audio=null;this.mp3=null;this.core=null;this.on_loaded=null;this.event_mgmt=new OfmHtmlPlayer.OfmEvent();this.initialize(options);}
OfmHtmlPlayer.OfmAudio.prototype.initialize=function(options){this.options=OfmHtmlPlayer.mergeOptions(this.options,options);this.event_mgmt.set_listener(this.options.listener);this.audio=document.createElement('audio');this.audio.setAttribute("controls","controls");if(this.options.debug_audio)document.getElementById(this.options.debug_audio).appendChild(this.audio);this.audio.addEventListener('progress',this.load_progress.bind(this),false);this.audio.addEventListener('loadeddata',this.load_complete.bind(this),false);this.audio.addEventListener('timeupdate',this.time_update.bind(this),false);this.audio.addEventListener('ended',this.play_end.bind(this),false);this.audio.addEventListener('playing',this.hide_spinner.bind(this),false);this.audio.addEventListener('canplay',this.can_play.bind(this),false);this.audio.addEventListener('pause',this.paused.bind(this),false);if(this.options.start_with_mp3){this.play(this.options.start_with_mp3);}}
OfmHtmlPlayer.OfmAudio.prototype.destroy=function(){if(this.options.debug_audio)document.getElementById(this.options.debug_audio).innerHTML='';if(this.audio)this.audio=null;}
OfmHtmlPlayer.OfmAudio.prototype.load_progress=function(){this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_TIME_LOAD_PROGRESS);}
OfmHtmlPlayer.OfmAudio.prototype.load_complete=function(){this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_TIME_LOAD_COMPLETE);}
OfmHtmlPlayer.OfmAudio.prototype.time_update=function(){this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_TIME_UPDATE);}
OfmHtmlPlayer.OfmAudio.prototype.play_end=function(){this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_PLAY_END);}
OfmHtmlPlayer.OfmAudio.prototype.paused=function(){this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_CORE_PAUSE);}
OfmHtmlPlayer.OfmAudio.prototype.show_spinner=function(){}
OfmHtmlPlayer.OfmAudio.prototype.hide_spinner=function(){}
OfmHtmlPlayer.OfmAudio.prototype.can_play=function(){this.loading=false;if(this.on_loaded){this.on_loaded();this.on_loaded=null;}}
OfmHtmlPlayer.OfmAudio.prototype.load=function(mp3,autoplay){if(mp3&&mp3!=this.mp3){this.loading=true;this.log('$$ audio load (src=) : '+mp3);this.playing=false;this.audio.pause();this.audio.setAttribute('src','');this.audio.setAttribute('src',mp3);if(autoplay){this.on_loaded=function(){this.audio.play();}.bind(this);}
this.audio.load();this.mp3=mp3;}else{this.log('$$ audio load - same mp3, no need to load');}}
OfmHtmlPlayer.OfmAudio.prototype.play=function(mp3){this.log('$$ audio play : '+mp3);this.show_spinner();if(mp3){this.load(mp3,true);}
this.playing=true;this.audio.play();}
OfmHtmlPlayer.OfmAudio.prototype.pause=function(){if(this.loading){this.on_loaded=function(){this.pause();}.bind(this);}else{this.playing=false;this.audio.pause();this.log('$$ audio pause');}}
OfmHtmlPlayer.OfmAudio.prototype.log=function(s){if(this.core)this.core.log(s);}
OfmHtmlPlayer.OfmAudio.prototype.set_position=function(pos){try{this.audio.currentTime=pos;}catch(e){}}
OfmHtmlPlayer.OfmAudio.prototype.get_position=function(){try{return Math.floor(this.audio.currentTime);}catch(e){return 0;}}
OfmHtmlPlayer.OfmAudio.prototype.get_duration=function(){try{return Math.floor(this.audio.duration);}catch(e){return 0;}}
OfmHtmlPlayer.OfmAudio.prototype.get_progress_perc=function(){try{return Math.min(parseInt((this.audio.buffered.end(0)/this.audio.duration)*100),100);}catch(e){return 0;}}
OfmHtmlPlayer.OfmAudio.prototype.set_volume=function(vol){try{vol=vol>1?1:(vol<0?0:vol);this.audio.volume=vol;}catch(e){}}
var XMLObjectifier=(function(){var _clone=function(obj){if(!!obj&&typeof(obj)==="object"){function F(){}
F.prototype=obj;return new F();}};var isNumeric=function(s){var testStr="";if(!!s&&typeof(s)==="string"){testStr=s;}
var pattern=/^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/;return pattern.test(testStr);};var _self={xmlToJSON:function(xdoc){try{if(!xdoc){return null;}
var tmpObj={};tmpObj.typeOf="JSXBObject";var xroot=(xdoc.nodeType==9)?xdoc.documentElement:xdoc;tmpObj.RootName=xroot.nodeName||"";if(xdoc.nodeType==3||xdoc.nodeType==4){return xdoc.nodeValue;}
function trim(s){return s.replace(/^\s+|\s+$/gm,'');}
function formatName(name){var regEx=/-/g;var tName=String(name).replace(regEx,"_");return tName;}
function setAttributes(obj,node){if(node.attributes.length>0){var a=node.attributes.length-1;var attName;obj._attributes=[];do{attName=String(formatName(node.attributes[a].name));obj._attributes.push(attName);obj[attName]=trim(node.attributes[a].value);}while(a--);}}
var _node=(function(){var _self={activate:function(){var nodes=[];if(!!nodes){nodes.getNodesByAttribute=function(attr,obj){if(!!nodes&&nodes.length>0){var out=[];var cNode;var maxLen=nodes.length-1;try{do{cNode=nodes[maxLen];if(cNode[attr]===obj){out.push(cNode);}}while(maxLen--);out.reverse();return out;}catch(e){return null;}
return null;}};nodes.getNodeByAttribute=function(attr,obj){if(!!nodes&&nodes.length>0){var cNode;var maxLen=nodes.length-1;try{do{cNode=nodes[maxLen];if(cNode[attr]===obj){return cNode;}}while(maxLen--);}catch(e){return null;}
return null;}};nodes.getNodesByValue=function(obj){if(!!nodes&&nodes.length>0){var out=[];var cNode;var maxLen=nodes.length-1;try{do{cNode=nodes[maxLen];if(!!cNode.Text&&cNode.Text===obj){out.push(cNode);}}while(maxLen--);return out;}catch(e){return null;}
return null;}};nodes.contains=function(attr,obj){if(!!nodes&&nodes.length>0){var maxLen=nodes.length-1;try{do{if(nodes[maxLen][attr]===obj){return true;}}while(maxLen--);}catch(e){return false;}
return false;}};nodes.indexOf=function(attr,obj){var pos=-1;if(!!nodes&&nodes.length>0){var maxLen=nodes.length-1;try{do{if(nodes[maxLen][attr]===obj){pos=maxLen;}}while(maxLen--);}catch(e){return-1;}
return pos;}};nodes.SortByAttribute=function(col,dir){if(!!nodes&&nodes.length>0){function getValue(pair,idx){var out=pair[idx];out=(bam.validation.isNumeric(out))?parseFloat(out):out;return out;}
function sortFn(a,b){var tA,tB;tA=getValue(a,col);tB=getValue(b,col);var res=(tA<tB)?-1:(tB<tA)?1:0;if(!!dir){res=(dir.toUpperCase()==="DESC")?(0-res):res;}
return res;}
nodes.sort(sortFn);}};nodes.SortByValue=function(dir){if(!!nodes&&nodes.length>0){function getValue(pair){var out=pair.Text;out=(bam.validation.isNumeric(out))?parseFloat(out):out;return out;}
function sortFn(a,b){var tA,tB;tA=getValue(a);tB=getValue(b);var res=(tA<tB)?-1:(tB<tA)?1:0;if(!!dir){res=(dir.toUpperCase()==="DESC")?(0-res):res;}
return res;}
nodes.sort(sortFn);}};nodes.SortByNode=function(node,dir){if(!!nodes&&nodes.length>0){function getValue(pair,node){var out=pair[node][0].Text;out=(bam.validation.isNumeric(out))?parseFloat(out):out;return out;}
function sortFn(a,b){var tA,tB;tA=getValue(a,node);tB=getValue(b,node);var res=(tA<tB)?-1:(tB<tA)?1:0;if(!!dir){res=(dir.toUpperCase()==="DESC")?(0-res):res;}
return res;}
nodes.sort(sortFn);}};}
return nodes;}};return _self;})();var makeNode=function(){var _fn=_clone(_node);return _fn.activate();}
function setHelpers(grpObj){grpObj.getNodeByAttribute=function(attr,obj){if(this.length>0){var cNode;var maxLen=this.length-1;try{do{cNode=this[maxLen];if(cNode[attr]==obj){return cNode;}}while(maxLen--);}catch(e){return false;}
return false;}};grpObj.contains=function(attr,obj){if(this.length>0){var maxLen=this.length-1;try{do{if(this[maxLen][attr]==obj){return true;}}while(maxLen--);}catch(e){return false;}
return false;}};grpObj.indexOf=function(attr,obj){var pos=-1;if(this.length>0){var maxLen=this.length-1;try{do{if(this[maxLen][attr]==obj){pos=maxLen;}}while(maxLen--);}catch(e){return-1;}
return pos;}};grpObj.SortByAttribute=function(col,dir){if(this.length){function getValue(pair,idx){var out=pair[idx];out=(isNumeric(out))?parseFloat(out):out;return out;}
function sortFn(a,b){var res=0;var tA,tB;tA=getValue(a,col);tB=getValue(b,col);if(tA<tB){res=-1;}else if(tB<tA){res=1;}
if(dir){res=(dir.toUpperCase()=="DESC")?(0-res):res;}
return res;}
this.sort(sortFn);}};grpObj.SortByValue=function(dir){if(this.length){function getValue(pair){var out=pair.Text;out=(isNumeric(out))?parseFloat(out):out;return out;}
function sortFn(a,b){var res=0;var tA,tB;tA=getValue(a);tB=getValue(b);if(tA<tB){res=-1;}else if(tB<tA){res=1;}
if(dir){res=(dir.toUpperCase()=="DESC")?(0-res):res;}
return res;}
this.sort(sortFn);}};grpObj.SortByNode=function(node,dir){if(this.length){function getValue(pair,node){var out=pair[node][0].Text;out=(isNumeric(out))?parseFloat(out):out;return out;}
function sortFn(a,b){var res=0;var tA,tB;tA=getValue(a,node);tB=getValue(b,node);if(tA<tB){res=-1;}else if(tB<tA){res=1;}
if(dir){res=(dir.toUpperCase()=="DESC")?(0-res):res;}
return res;}
this.sort(sortFn);}};}
function setObjects(obj,node){var elemName;var cnode;var tObj;var cName="";if(!node){return null;}
if(node.attributes.length>0){setAttributes(obj,node);}
obj.Text="";if(node.hasChildNodes()){var nodeCount=node.childNodes.length-1;var n=0;do{cnode=node.childNodes[n];switch(cnode.nodeType){case 1:obj._children=[];elemName=(cnode.localName)?cnode.localName:cnode.baseName;elemName=formatName(elemName);if(cName!=elemName){obj._children.push(elemName);}
if(!obj[elemName]){obj[elemName]=[];}
tObj={};obj[elemName].push(tObj);if(cnode.attributes.length>0){setAttributes(tObj,cnode);}
if(!obj[elemName].contains){setHelpers(obj[elemName]);}
cName=elemName;if(cnode.hasChildNodes()){setObjects(tObj,cnode);}
break;case 3:obj.Text+=trim(cnode.nodeValue);break;case 4:obj.Text+=(cnode.text)?trim(cnode.text):trim(cnode.nodeValue);break;}}while(n++<nodeCount);}}
setObjects(tmpObj,xroot);xdoc=null;xroot=null;return tmpObj;}catch(e){return null;}},textToXML:function(strXML){var xmlDoc=null;try{xmlDoc=(document.all)?new ActiveXObject("Microsoft.XMLDOM"):new DOMParser();xmlDoc.async=false;}catch(e){throw new Error("XML Parser could not be instantiated");}
var out;try{if(document.all){out=(xmlDoc.loadXML(strXML))?xmlDoc:false;}else{out=xmlDoc.parseFromString(strXML,"text/xml");}}catch(e){throw new Error("Error parsing XML string");}
return out;}};return _self;})();OfmHtmlPlayer.OfmCursor=function(len){this.table=null;this.index=0;this.index_browse=0;this.initialize(len);}
OfmHtmlPlayer.OfmCursor.prototype.initialize=function(len){this.table=this.ordered_array(len);}
OfmHtmlPlayer.OfmCursor.prototype.length=function(){return this.table.length;}
OfmHtmlPlayer.OfmCursor.prototype.current=function(){return this.table[this.index];}
OfmHtmlPlayer.OfmCursor.prototype.head_to=function(t_index){for(var i=0;i<this.length();i++){if(this.table[i]==t_index){this.index=i;break;}}
return this.index;}
OfmHtmlPlayer.OfmCursor.prototype.next=function(){if(this.index<this.table.length-1)this.index++
else this.index=0;return this.current();}
OfmHtmlPlayer.OfmCursor.prototype.previous=function(){if(this.index>0)this.index--
else this.index=this.table.length-1;return this.current();}
OfmHtmlPlayer.OfmCursor.prototype.reset=function(shuffle){this.index=0;return this.current();}
OfmHtmlPlayer.OfmCursor.prototype.shuffle=function(playing){var table1=new Array(),table2=this.table;if(playing){table1=[table2.splice(this.index,1).pop()];}
table2.sort(this.random_sort_0_1);this.table=table1.concat(table2);this.index=0;}
OfmHtmlPlayer.OfmCursor.prototype.unshuffle=function(){this.index=this.table[this.index];this.table=this.ordered_array(this.table.length);}
OfmHtmlPlayer.OfmCursor.prototype.is_on_last=function(){return(this.index==this.table.length-1);}
OfmHtmlPlayer.OfmCursor.prototype.browse_reset=function(){this.index_browse=0;return this.browse_current();}
OfmHtmlPlayer.OfmCursor.prototype.browse_head_to=function(t_index){for(var i=0;i<this.length();i++){if(this.table[i]==t_index){this.index_browse=i;break;}}
return this.index_browse;}
OfmHtmlPlayer.OfmCursor.prototype.browse_next=function(){if(this.index_browse<this.table.length-1)this.index_browse++
else this.index_browse=0;return this.browse_current();}
OfmHtmlPlayer.OfmCursor.prototype.browse_previous=function(){if(this.index_browse>0)this.index_browse--
else this.index_browse=this.table.length-1;return this.browse_current();}
OfmHtmlPlayer.OfmCursor.prototype.browse_current=function(){return this.table[this.index_browse];}
OfmHtmlPlayer.OfmCursor.prototype.ordered_array=function(len){var arr=new Array();for(var i=0;i<len;i++){arr.push(i);}
return arr;}
OfmHtmlPlayer.OfmCursor.prototype.random_sort_0_1=function(){return(Math.round(Math.random())-0.5);}
OfmHtmlPlayer.OfmCursor.prototype.dump=function(core){if(!core)return;for(i=0;i<this.table.length;i++){core.log(this.current());this.next();}}
OfmHtmlPlayer.OfmStock=function(options){this.tracks=null;this.event_mgmt=new OfmHtmlPlayer.OfmEvent();this.initialize(options);}
OfmHtmlPlayer.OfmStock.prototype.initialize=function(options){this.options=OfmHtmlPlayer.mergeOptions(this.options,options);this.event_mgmt.set_listener(this.options.listener);this.tracks=new Array();}
OfmHtmlPlayer.OfmStock.prototype.add_track=function(trackinfo){var index=this.get_index_by_id(trackinfo.id);if(index>=0){if(trackinfo.status==OfmHtmlPlayer.ll_loaded){this.tracks[index].set_info(trackinfo);}}else{index=this.tracks.push(new OfmHtmlPlayer.OfmTrack(trackinfo,{listener:this.track_listener.bind(this)}))-1;}
return index;}
OfmHtmlPlayer.OfmStock.prototype.get_index_by_id=function(id){for(var i=0;i<this.tracks.length;i++){if(this.tracks[i].id==id){return i;}}
return-1;}
OfmHtmlPlayer.OfmStock.prototype.get_track_by_id=function(id){return this.tracks[this.get_index_by_id(id)];}
OfmHtmlPlayer.OfmStock.prototype.get_track_by_index=function(index){return this.tracks[index];}
OfmHtmlPlayer.OfmStock.prototype.in_stock=function(id){return(this.get_index_by_id(id)>=0);}
OfmHtmlPlayer.OfmStock.prototype.length=function(){return this.tracks.length;}
OfmHtmlPlayer.OfmStock.prototype.track_listener=function(e){this.event_mgmt.broadcast(e);}
OfmHtmlPlayer.OfmStock.prototype.dump=function(core){if(!core)return;for(i=0;i<this.tracks.length;i++){core.log("* "+i+":"+this.tracks[i].id+' '+this.tracks[i].title);}}
OfmHtmlPlayer.OfmTrack=function(info,options){this.options={};this.id=null;this.artist=null;this.title=null;this.mp3_url=null;this.artwork_url=null;this.duration=0;this.link=null;this.artist_link=null;this.embed_code=null;this.voted=false;this.downloadable=false;this.sharable=false;this.buyable=false;this.buy_url=null;this.download_url=null;this.event_mgmt=new OfmHtmlPlayer.OfmEvent();this.initialize(info,options);}
OfmHtmlPlayer.OfmTrack.prototype.initialize=function(info,options){this.options=OfmHtmlPlayer.mergeOptions(this.options,options);this.event_mgmt.set_listener(this.options.listener);this.set_info(info);}
OfmHtmlPlayer.OfmTrack.prototype.set_info=function(info){this.id=parseInt(info.id);this.artist=info.artist;this.title=info.title;this.status=info.status;this.mp3_url=info.mp3_url;this.artwork_url=info.artwork_url;this.duration=info.duration;this.link=info.link;this.artist_id=info.artist_id;this.artist_link=info.link;this.embed_code=this.get_embed_code('artwork');this.downloadable=info.downloadable;this.download_url=this.link+'/download';this.sharable=info.sharable;this.buy_url=info.buy_url?info.buy_url:null;this.buyable=(this.buy_url!=null);}
OfmHtmlPlayer.OfmTrack.prototype.set_status=function(status){this.status=status;}
OfmHtmlPlayer.OfmTrack.prototype.get_link=function(dest){if(dest=='facebook'){return'http://www.facebook.com/sharer.php?u='+escape(this.link);}else if(dest=='twitter'){return'http://twitter.com/home?status='+escape(this.title)+', '+escape(this.link);}else if(dest=='myspace'){return'http://www.myspace.com/Modules/PostTo/Pages/?t='+escape(this.title)+'&u='+escape(this.link);}else{return this.link;}}
OfmHtmlPlayer.OfmTrack.prototype.get_embed_code=function(aspect){return'<iframe src="'+this.link+'?fair_player='+aspect+'&width='+OfmHtmlPlayer.PLAYER_SIZES[aspect][0]+'" width="'+OfmHtmlPlayer.PLAYER_SIZES[aspect][0]+'" height="'+OfmHtmlPlayer.PLAYER_SIZES[aspect][1]+'"/>'}
OfmHtmlPlayer.OfmTrack.prototype.get_embed=function(dest){return dest=='wordpress'?this.link:this.embed_code;}
OfmHtmlPlayer.OfmTrack.prototype.toggle_vote=function(){this.voted=!this.voted;this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_VOTE_UPDATED);}
OfmHtmlPlayer.OfmTracklist=function(options,core){this.options={xspf_url:null,listener:null,stock:null,ofm_player_server:null,load_all:false,jspf_format:false,onLoad:null};this.core=null;this.ofm_player_server='http://play.official.fm';this.xspf_url=null;this.tracks=null;this.stock=null;this.cursor=null;this.ready=false;this.shuffled=false;this.playlist_title=null;this.playlist_author=null;this.title=null;this.link=null;this.description=null;this.playlist_id=null;this.track_ids=null;this.nb_tracks=null;this.onFragmentLoaded=null;this.event_mgmt=new OfmHtmlPlayer.OfmEvent();this.initialize(options,core);}
OfmHtmlPlayer.OfmTracklist.prototype.initialize=function(options,core){this.options=OfmHtmlPlayer.mergeOptions(this.options,options);this.event_mgmt.set_listener(this.options.listener);this.core=core;this.xspf_url=this.options.xspf_url;this.stock=this.options.stock;this.ofm_player_server=this.options.ofm_player_server;this.onFragmentLoaded=this.options.onLoad;this.load_fragment('ll_header=yes');}
OfmHtmlPlayer.OfmTracklist.prototype.load_fragment=function(url_param,direct_track_ids){return(this.options.jspf_format?this.load_fragment_jspf(url_param,direct_track_ids):this.load_fragment_xspf(url_param,direct_track_ids));}
OfmHtmlPlayer.OfmTracklist.prototype.jspf_on_load=function(result){this.parse_fragment_jspf(result);this.ready=true;if(this.onFragmentLoaded){this.onFragmentLoaded();this.onFragmentLoaded=null;}}
OfmHtmlPlayer.OfmTracklist.prototype.load_fragment_jspf=function(url_param,direct_track_ids){var url=direct_track_ids?(this.ofm_player_server+'tracks.xspf'):this.xspf_url;url=(url_param?(url+(url.indexOf('?')>0?'&':'?')+url_param):url);url=url+(url.indexOf('?')>0?'&':'?')+'format=jspf';this.core.jspf_loader.add(url,this.jspf_on_load.bind(this));}
OfmHtmlPlayer.OfmTracklist.prototype.load_fragment_xspf=function(url_param,direct_track_ids){var url=direct_track_ids?(this.ofm_player_server+'tracks.xspf'):this.xspf_url;url=(url_param?(url+(url.indexOf('?')>0?'&':'?')+url_param):url);this.log('>>load begin : '+url);var xhr=new XMLHttpRequest();xhr.onreadystatechange=function(){if(xhr.readyState==4&&xhr.status==200){this.log('>>load end : '+url);this.log('parsing begin : '+url);var json=XMLObjectifier.xmlToJSON(xhr.responseXML.documentElement.getElementsByTagName("channel")[0]);this.parse_fragment_xspf(json);this.log('parsing end : '+url);this.ready=true;if(this.onFragmentLoaded){this.onFragmentLoaded();this.onFragmentLoaded=null;}}}.bind(this);xhr.open("GET",url,true);xhr.send(null);}
OfmHtmlPlayer.OfmTracklist.prototype.parse_fragment_xspf=function(json){if(json.title)this.parse_header_xspf(json);for(var i=0;i<json.item.length;i++){var artwork_url=json.item[i].enclosure&&json.item[i].enclosure[0]?json.item[i].enclosure[0].url:'';artwork_url=(this.core&&this.core.options.artwork_quality!='medium')?artwork_url.replace('_medium',('_'+this.core.options.artwork_quality)):artwork_url;this.add_track({id:json.item[i].track_id?parseInt(json.item[i].track_id[0].Text):0,status:OfmHtmlPlayer.ll_loaded,artist:json.item[i].author?json.item[i].author[0].Text:'',artist_id:json.item[i].author?json.item[i].author[0].id:'',title:json.item[i].title?json.item[i].title[0].Text:'',artwork_url:artwork_url,mp3_url:json.item[i].enclosure&&json.item[i].enclosure[1]?json.item[i].enclosure[1].url:'',duration:json.item[i].enclosure&&json.item[i].enclosure[1]?json.item[i].enclosure[1].duration:'',link:json.item[i].link?json.item[i].link[0].Text:'',sharable:OfmHtmlPlayer.evalAsBool(json.item[i].sharable),downloadable:OfmHtmlPlayer.evalAsBool(json.item[i].downloadable),buy_url:json.item[i].buy_url?json.item[i].buy_url[0].Text:null});}}
OfmHtmlPlayer.OfmTracklist.prototype.parse_header_xspf=function(json){this.title=json.title?json.title[0].Text:null;this.link=json.link?json.link[0].Text:null;this.description=json.description?json.description[0].Text:null;this.playlist_id=json.playlist_id?json.playlist_id[0].Text:null;this.track_ids=json.track_ids?json.track_ids[0].Text.split(',',200):new Array();this.nb_tracks=parseInt(json.track_ids?this.track_ids.length:json.item.length);if(this.playlist_id){this.playlist_title=this.title;this.playlist_author=this.link;try{this.playlist_title=this.title.substring(0,this.title.indexOf(', a playlist by'));this.playlist_author=this.title.substring(this.title.indexOf('a playlist by'),this.title.indexOf(', on Official.fm'));}catch(e){}}
this.init_table_xspf(json);}
OfmHtmlPlayer.OfmTracklist.prototype.parse_fragment_jspf=function(json){if(json.title)this.parse_header_jspf(json);for(var i=0;i<json.tracks.length;i++){var track=json.tracks[i];var artwork_url=track.artwork.url;artwork_url=(this.core&&this.core.options.artwork_quality!='medium')?artwork_url.replace('_medium',('_'+this.core.options.artwork_quality)):artwork_url;this.add_track({id:track.track_id,status:OfmHtmlPlayer.ll_loaded,artist:track.author,artist_id:track.author_id,title:track.title,artwork_url:artwork_url,mp3_url:track.mp3?track.mp3.url:'',duration:track.mp3?track.mp3.duration:'',link:track.link?track.link:'',sharable:OfmHtmlPlayer.evalAsBool(track.sharable),downloadable:OfmHtmlPlayer.evalAsBool(track.downloadable),buy_url:track.buy_url});}}
OfmHtmlPlayer.OfmTracklist.prototype.parse_header_jspf=function(json){this.title=json.title;this.link=json.link;this.description=json.description;this.playlist_id=json.playlist_id;this.track_ids=json.track_ids?json.track_ids.split(',',200):new Array();this.nb_tracks=parseInt(json.track_ids?this.track_ids.length:json.tracks.length);if(this.playlist_id){this.playlist_title=this.title;this.playlist_author=this.link;try{this.playlist_title=this.title.substring(0,this.title.indexOf(', a playlist by'));this.playlist_author=this.title.substring(this.title.indexOf('a playlist by'),this.title.indexOf(', on Official.fm'));}catch(e){}}
this.init_table_jspf(json);}
OfmHtmlPlayer.OfmTracklist.prototype.init_table_xspf=function(json){this.tracks=new Array();this.cursor=new OfmHtmlPlayer.OfmCursor(this.nb_tracks);var track_id=null;for(var i=0;i<this.nb_tracks;i++){track_id=this.track_ids.length>0?parseInt(this.track_ids[i]):parseInt(json.item[i].track_id[0].Text);this.add_track({id:track_id,status:OfmHtmlPlayer.ll_not_loaded,artist:'',title:'loading...'});}}
OfmHtmlPlayer.OfmTracklist.prototype.init_table_jspf=function(json){this.tracks=new Array();this.cursor=new OfmHtmlPlayer.OfmCursor(this.nb_tracks);var track_id=null;for(var i=0;i<this.nb_tracks;i++){track_id=this.track_ids.length>0?parseInt(this.track_ids[i]):parseInt(json.tracks[i].track_id);this.add_track({id:track_id,status:OfmHtmlPlayer.ll_not_loaded,artist:'',title:'loading...'});}}
OfmHtmlPlayer.OfmTracklist.prototype.load_next_fragment=function(t_index,forward,load_all){var missing_ids=this.get_missing_ids(t_index,forward,load_all);if(missing_ids){return this.load_fragment('ll_tracks='+missing_ids,true);}else{return false;}}
OfmHtmlPlayer.OfmTracklist.prototype.load_if_not_loaded=function(t_index,forward,load_all){var track=this.get_track_by_index(t_index);if(track==null)return;var onLoaded=function(){this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_CHANGE_TRACK);}.bind(this);if(track.status==OfmHtmlPlayer.ll_not_loaded){this.onFragmentLoaded=onLoaded;this.load_next_fragment(t_index,forward);}else if(track.status==OfmHtmlPlayer.ll_loaded){if(this.is_approaching_missing_fragments(t_index,forward)){this.load_next_fragment(t_index,forward);}
if(onLoaded)onLoaded();}}
OfmHtmlPlayer.OfmTracklist.prototype.load_all=function(){this.load_next_fragment(0,true,true);}
OfmHtmlPlayer.OfmTracklist.prototype.get_missing_ids=function(t_index,forward,load_all){var missing_ids=new Array(),nb_found=0,track=null;this.cursor.browse_head_to(t_index);for(var i=0;i<this.length();i++){if(!this.is_track_loaded_or_loading(t_index)){track=this.get_track_by_index(t_index);missing_ids.push(track.id);track.set_status(OfmHtmlPlayer.ll_loading);nb_found++;if(!load_all&&nb_found==OfmHtmlPlayer.ll_page_size){break;}}
if(forward)t_index=this.cursor.browse_next();else t_index=this.cursor.browse_previous();}
return missing_ids.join();}
OfmHtmlPlayer.OfmTracklist.prototype.is_approaching_missing_fragments=function(t_index,forward){var distance=0;this.cursor.browse_head_to(t_index);for(var i=0;i<this.length();i++){if(this.is_track_loaded_or_loading(t_index)){distance++;if(distance>OfmHtmlPlayer.ll_threshold)break;}else{break;}
if(forward)t_index=this.cursor.browse_next();else t_index=this.cursor.browse_previous();}
return(distance>=0&&distance<=OfmHtmlPlayer.ll_threshold);}
OfmHtmlPlayer.OfmTracklist.prototype.is_track_loaded=function(t_index){var track=this.get_track_by_index(t_index);return(track!=null?(track.status==OfmHtmlPlayer.ll_loaded):false);}
OfmHtmlPlayer.OfmTracklist.prototype.is_track_loaded_or_loading=function(t_index){var track=this.get_track_by_index(t_index);return(track!=null?(track.status!=OfmHtmlPlayer.ll_not_loaded):false);}
OfmHtmlPlayer.OfmTracklist.prototype.add_track=function(trackinfo){var index_in_stock=this.stock.add_track(trackinfo);var index_in_tracklist=this.get_index_by_id(trackinfo.id);if(index_in_tracklist>=0){this.tracks[index_in_tracklist]=index_in_stock;}else{this.tracks.push(index_in_stock);}}
OfmHtmlPlayer.OfmTracklist.prototype.head_to_track=function(track_id){if(track_id==null){this.log('head to track null : current track');return true;}
if(track_id==0){this.log('head to track 0 : first track');this.cursor.head_to(0);return true;}
var t_index=this.get_index_by_id(track_id);if(t_index>=0){this.log('head to track '+track_id+' found : moving from '+this.cursor.current()+' to '+t_index);this.cursor.head_to(t_index);this.load_if_not_loaded(t_index,true,this.options.load_all);return true;}
this.log('head to track '+track_id+' not found in current xspf : '+this.xspf_url);return false;}
OfmHtmlPlayer.OfmTracklist.prototype.get_index_by_id=function(track_id){for(var i=0;i<this.nb_tracks;i++){track=this.get_track_by_index(i);if(track&&track.id==track_id){return i;}}
return-1;}
OfmHtmlPlayer.OfmTracklist.prototype.get_track_by_index=function(index){return this.stock.get_track_by_index(this.tracks[index]);}
OfmHtmlPlayer.OfmTracklist.prototype.get_current_track=function(){if(!this.ready)return null;return this.stock.get_track_by_index(this.tracks[this.cursor.current()]);}
OfmHtmlPlayer.OfmTracklist.prototype.next=function(){if(!this.ready)return null;var t_index=this.cursor.next();this.load_if_not_loaded(t_index,true,this.options.load_all);return this.get_track_by_index(t_index);}
OfmHtmlPlayer.OfmTracklist.prototype.previous=function(){if(!this.ready)return null;var t_index=this.cursor.previous();this.load_if_not_loaded(t_index,false,this.options.load_all);return this.get_track_by_index(t_index);}
OfmHtmlPlayer.OfmTracklist.prototype.length=function(){return this.tracks.length;}
OfmHtmlPlayer.OfmTracklist.prototype.is_playlist=function(){return(this.playlist_id>0);}
OfmHtmlPlayer.OfmTracklist.prototype.shuffle=function(playing){this.shuffled=true;this.cursor.shuffle(playing);if(!playing){this.load_if_not_loaded(this.cursor.current(),false,this.options.load_all);}
this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_SHUFFLE_UPDATED);}
OfmHtmlPlayer.OfmTracklist.prototype.unshuffle=function(){this.shuffled=false;this.cursor.unshuffle();this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_SHUFFLE_UPDATED);}
OfmHtmlPlayer.OfmTracklist.prototype.is_shuffled=function(){return(this.shuffled);}
OfmHtmlPlayer.OfmTracklist.prototype.is_on_last_track=function(){return(this.cursor.is_on_last());}
OfmHtmlPlayer.OfmTracklist.prototype.log=function(s){if(this.core)this.core.log(s);}
OfmHtmlPlayer.OfmTracklist.prototype.dump=function(){var t_index=this.cursor.browse_reset(),track=null;for(var i=0;i<this.length();i++){track=this.get_track_by_index(t_index);this.log(i+' : '+track.id+' '+track.title);t_index=this.cursor.browse_next();}}
OfmHtmlPlayer.OfmCore=function(options){this.options={xspf_url:null,autoplay:false,artwork_quality:'medium',audio:null,listener:null,load_all:false,container_id:null,jspf_format:false,debug:false,debug_audio:null};this.audio=null;this.stock=null;this.tracklists=null;this.index=-1;this.ready=false;this.playing=false;this.log_content='';this.ofm_main_server='http://official.fm/';this.ofm_player_server='http://play.official.fm/';this.event_mgmt=new OfmHtmlPlayer.OfmEvent();this.initialize(options);}
OfmHtmlPlayer.OfmCore.prototype.initialize=function(options){this.init_trace();this.options=OfmHtmlPlayer.mergeOptions(this.options,options);this.event_mgmt.set_listener(this.options.listener);if(!OfmHtmlPlayer.jspf_loader)OfmHtmlPlayer.jspf_loader=new OfmHtmlPlayer.OfmJspfLoader();this.jspf_loader=OfmHtmlPlayer.jspf_loader;this.version='5.0beta-20110506';this.player_id='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});var re_server=/(http(s?):\/\/(\w*)(official(s?)\.fm|fairtilizer\.com|lvh\.me|play\.lvh\.me|localhost:8880.*|imagorecords.com.*)\/)(.*)$/i;var matches=re_server.exec(window.location.href);if(matches){this.ofm_player_server=matches[1];}
if(this.options.xspf_url.indexOf('ofm.typhon.net')>0){this.ofm_player_server='http://play.staging1.ofm.typhon.net/';}else{this.ofm_player_server='http://play.official.fm/';}
this.log('player-core V'+this.version+' with player server '+this.ofm_player_server);this.log('feed : '+this.options.xspf_url);this.log('location : '+window.location.href);this.log('id : '+this.player_id);if(this.options.audio){this.audio=this.options.audio;this.playing=this.audio.playing;}else{this.audio=new OfmHtmlPlayer.OfmAudio({debug_audio:this.options.debug_audio,listener:this.audio_listener.bind(this)});}
this.audio.core=this;this.stock=new OfmHtmlPlayer.OfmStock({listener:this.stock_listener.bind(this)});this.tracklists=new Array();if(this.options.xspf_url){this.head_to(this.options.xspf_url,0,this.options.autoplay);}}
OfmHtmlPlayer.OfmCore.prototype.destroy=function(){this.tracklists=null;if(this.audio)this.audio.destroy();}
OfmHtmlPlayer.OfmCore.prototype.init_trace=function(){this.log_content='';}
OfmHtmlPlayer.OfmCore.prototype.head_to=function(xspf_url,track_id,autoplay){if(xspf_url)xspf_url=this.get_hijacked_xspf(xspf_url);else xspf_url=this.get_current_tracklist().xspf_url;if(this.head_to_tracklist(xspf_url)){this.show_spinner();if(this.get_current_tracklist().head_to_track(track_id)&&autoplay){this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_CHANGE_TRACK);this.play();}
if(!this.playing)this.hide_spinner();}else{this.show_spinner();this.add_tracklist(xspf_url,true,function(autoplay){this.get_current_tracklist().head_to_track(track_id);this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_CHANGE_TRACKLIST);this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_CHANGE_TRACK);if(autoplay){this.play();}
else{}
if(!this.ready){this.ready=true;this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_CORE_READY);}
if(!this.playing)this.hide_spinner();}.bind(this,autoplay));}}
OfmHtmlPlayer.OfmCore.prototype.head_to_tracklist=function(xspf_url){var x_index=this.get_index_by_xspf(xspf_url);if(x_index>=0){this.log('tracklist found - moving index from '+this.index+' to '+x_index);this.index=x_index;this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_CHANGE_TRACKLIST);return true;}
this.log('tracklist not found : '+xspf_url);return false;}
OfmHtmlPlayer.OfmCore.prototype.get_index_by_xspf=function(xspf_url){for(var i=0;i<this.tracklists.length;i++){if(this.tracklists[i].xspf_url==xspf_url){return i;}}
return-1;}
OfmHtmlPlayer.OfmCore.prototype.add_tracklist=function(xspf_url,set_head,onLoad){var tracklist=new OfmHtmlPlayer.OfmTracklist({xspf_url:xspf_url,stock:this.stock,listener:this.tracklist_listener.bind(this),ofm_player_server:this.ofm_player_server,load_all:this.options.load_all,jspf_format:this.options.jspf_format,onLoad:onLoad},this);var x_index=this.tracklists.push(tracklist)-1;if(set_head)this.index=x_index;}
OfmHtmlPlayer.OfmCore.prototype.get_hijacked_xspf=function(xspf_url){this.log('before hijack xspf : '+xspf_url);if(xspf_url.indexOf('http://play.')==-1)xspf_url=xspf_url.replace('http://','http://play.');if(xspf_url.indexOf('/')==0)xspf_url=this.ofm_player_server+xspf_url.substring(1);if(xspf_url.indexOf('http://play.staging.')!=-1)xspf_url=xspf_url.replace('http://play.staging.','http://play.staging1.');if(xspf_url.indexOf('http://play.staging2.')!=-1)xspf_url=xspf_url.replace('http://play.staging2.','http://play.staging1.');if(xspf_url.indexOf('http://play.staging3.')!=-1)xspf_url=xspf_url.replace('http://play.staging3.','http://play.staging1.');if(xspf_url.indexOf('http://play.staging4.')!=-1)xspf_url=xspf_url.replace('http://play.staging4.','http://play.staging1.');if(xspf_url.indexOf('http://play.staging5.')!=-1)xspf_url=xspf_url.replace('http://play.staging5.','http://play.staging1.');this.log('after hijack xspf : '+xspf_url);return xspf_url;}
OfmHtmlPlayer.OfmCore.prototype.tracklist_listener=function(event){if(event==OfmHtmlPlayer.EVENT_CHANGE_TRACK){if(this.playing){this.play();}
else{this.pause();if(this.ready)this.load();}}
this.event_mgmt.broadcast(event);}
OfmHtmlPlayer.OfmCore.prototype.stock_listener=function(event){this.event_mgmt.broadcast(event);}
OfmHtmlPlayer.OfmCore.prototype.audio_listener=function(e){if(e==OfmHtmlPlayer.EVENT_PLAY_END){if(this.get_current_tracklist().is_on_last_track())this.playing=false;this.next();this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_TRACKLIST_END);}
this.event_mgmt.broadcast(e);}
OfmHtmlPlayer.OfmCore.prototype.format_sec_to_minutes=function(sec){var s=sec%60,m=parseInt(sec/60);return this.format_2digits(m)+':'+this.format_2digits(s);}
OfmHtmlPlayer.OfmCore.prototype.format_2digits=function(n){return n<10?('0'+n):n;}
OfmHtmlPlayer.OfmCore.prototype.show_spinner=function(){this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_SHOW_SPINNER);}
OfmHtmlPlayer.OfmCore.prototype.hide_spinner=function(){this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_HIDE_SPINNER);}
OfmHtmlPlayer.OfmCore.prototype.load=function(){this.audio.load(this.get_current_track().mp3_url);}
OfmHtmlPlayer.OfmCore.prototype.play_xspf_track=function(xspf_url,track_id){this.head_to(xspf_url,track_id,true);}
OfmHtmlPlayer.OfmCore.prototype.play_track=function(track_id){this.head_to(this.get_current_tracklist().xspf_url,track_id,true);}
OfmHtmlPlayer.OfmCore.prototype.play_index=function(index){this.play_track(this.get_current_tracklist().get_track_by_index(index-1).id);}
OfmHtmlPlayer.OfmCore.prototype.play=function(){this.playing=true;this.audio.play(this.get_current_track().mp3_url);this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_CORE_PLAY);}
OfmHtmlPlayer.OfmCore.prototype.pause=function(){this.playing=false;this.audio.pause();this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_CORE_PAUSE);}
OfmHtmlPlayer.OfmCore.prototype.toggle_playpause=function(){if(this.playing)this.pause();else this.play();}
OfmHtmlPlayer.OfmCore.prototype.previous=function(){this.get_current_tracklist().previous();}
OfmHtmlPlayer.OfmCore.prototype.next=function(){this.get_current_tracklist().next();}
OfmHtmlPlayer.OfmCore.prototype.shuffle=function(){if(this.get_current_tracklist()){this.get_current_tracklist().shuffle(this.playing);}}
OfmHtmlPlayer.OfmCore.prototype.unshuffle=function(){if(this.get_current_tracklist()){this.get_current_tracklist().unshuffle();}}
OfmHtmlPlayer.OfmCore.prototype.toggle_shuffle=function(){if(this.get_current_tracklist()&&this.get_current_tracklist().shuffled)this.unshuffle()
else this.shuffle();}
OfmHtmlPlayer.OfmCore.prototype.set_position=function(value){this.audio.set_position(value);this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_TIME_UPDATE);}
OfmHtmlPlayer.OfmCore.prototype.set_position_perc=function(value){this.audio.set_position((value*this.get_duration())/100);this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_TIME_UPDATE);}
OfmHtmlPlayer.OfmCore.prototype.get_position=function(){return this.audio.get_position();}
OfmHtmlPlayer.OfmCore.prototype.get_position_perc=function(){try{return Math.min(((this.get_position(true)*100)/this.get_duration()),100);}catch(e){return 0;}}
OfmHtmlPlayer.OfmCore.prototype.get_position_pretty=function(){return this.format_sec_to_minutes(this.audio.get_position());}
OfmHtmlPlayer.OfmCore.prototype.get_duration=function(){return this.get_current_track().duration;}
OfmHtmlPlayer.OfmCore.prototype.get_duration_pretty=function(in_sec){var track=this.get_current_track();if(track)return this.format_sec_to_minutes(this.get_current_track().duration);else return'';}
OfmHtmlPlayer.OfmCore.prototype.get_progress_perc=function(){return this.audio.get_progress_perc();}
OfmHtmlPlayer.OfmCore.prototype.get_current_tracklist=function(){return this.tracklists[this.index];}
OfmHtmlPlayer.OfmCore.prototype.get_current_track=function(){try{return this.get_current_tracklist().get_current_track();}catch(e){return null;}}
OfmHtmlPlayer.OfmCore.prototype.get_current_track_public_info=function(){try{var info=this.get_current_tracklist().get_current_track();return{artist:info.artist,artist_id:info.artist_id,title:info.title,artwork_url:info.artwork_url,duration:info.duration,id:info.id,link:info.link};}catch(e){return null;}}
OfmHtmlPlayer.OfmCore.prototype.build_feed=function(type,id){return(this.ofm_player_server+type+'s/'+id+'.xspf');}
OfmHtmlPlayer.OfmCore.prototype.get_tracklist_for_panel=function(){var tracklist=this.get_current_tracklist(),current_track=tracklist.get_current_track();var t_index=tracklist.cursor.browse_reset(),track=null,panel_list=new Element('ul'),panel_item=null,selected=null;for(var i=0;i<tracklist.length();i++){track=tracklist.get_track_by_index(t_index);panel_item=new Element('li').set('html',i+' : '+track.artist+' - '+track.title);if(current_track.id==track.id){OfmHtmlPlayer.js_addClass(panel_item,'active')
selected=panel_item;};panel_item.addEventListener('click',function(id){this.play_track(id);}.bind(this,track.id));panel_item.inject(panel_list,'bottom');t_index=tracklist.cursor.browse_next();}
return panel_list;}
OfmHtmlPlayer.OfmCore.prototype.log=function(s){try{var d=new Date();this.log_content+="\n"+d.getMinutes()+':'+d.getSeconds()+' : '+s;if(this.options.debug)console.log(d.getMinutes()+':'+d.getSeconds()+" ("+this.options.container_id+') : '+s);}catch(e){}}
OfmHtmlPlayer.OfmCore.prototype.dump=function(){this.log('dump core tracklists :');for(var i=0;i<this.tracklists.length;i++){this.log('  ['+i+'] : '+this.tracklists[i].xspf_url);}
console.log('*** player log begin ***');console.log(this.log_content);console.log('*** player log end ***');}
OfmHtmlPlayer.OfmTimeline=function(container,options){this.options={};this.core=null;this.container=null;this.time_loaded=null;this.time_played=null;this.mousedown=false;this.current_width_perc=0;this.event_mgmt=new OfmHtmlPlayer.OfmEvent();this.initialize(container,options);}
OfmHtmlPlayer.OfmTimeline.prototype.initialize=function(container,options){this.options=OfmHtmlPlayer.mergeOptions(this.options,options);this.event_mgmt.set_listener(this.options.listener);this.core=this.options.core;this.container=container;this.container.style.position='relative';this.time_loaded=document.createElement('div');this.time_loaded.setAttribute("style","position:absolute;height:100%;background-color:#000;");this.time_played=document.createElement('div');this.time_played.setAttribute("style","position:absolute;height:100%;background-color:#0A759E;");this.container.appendChild(this.time_loaded);this.container.appendChild(this.time_played);this.container.onmousedown=this.mouse_down.bind(this);this.container.onmouseup=this.mouse_up.bind(this);this.container.onmouseout=this.mouse_up.bind(this);this.container.onmousemove=this.mouse_move.bind(this);}
OfmHtmlPlayer.OfmTimeline.prototype.mouse_down=function(event){this.mousedown=true;var evt=event||window.event;this.set_play_time_from_mouse(evt);}
OfmHtmlPlayer.OfmTimeline.prototype.mouse_up=function(event){this.mousedown=false;}
OfmHtmlPlayer.OfmTimeline.prototype.mouse_move=function(event){if(!this.mousedown)return;var evt=event||window.event;this.set_play_time_from_mouse(evt);}
OfmHtmlPlayer.OfmTimeline.prototype.set_play_time_from_mouse=function(evt){var dim=OfmHtmlPlayer.element_dimensions(this.container);var relative_x=parseInt(evt.clientX-dim.left);var width=parseInt(dim.outer.width);var perc=width>0?((relative_x*100)/width):0;this.current_width_perc=perc;this.time_played.style.width=(''+perc+'%');this.event_mgmt.broadcast(OfmHtmlPlayer.EVENT_TIMELINE_CHANGED);}
OfmHtmlPlayer.OfmTimeline.prototype.get_position_perc=function(){return this.current_width_perc;}
OfmHtmlPlayer.OfmTimeline.prototype.set_position_perc=function(position_perc){this.time_played.style.width=(''+position_perc+'%');}
OfmHtmlPlayer.OfmTimeline.prototype.set_progress_perc=function(progress_perc){this.time_loaded.style.width=(''+progress_perc+'%');}
OfmHtmlPlayer.OfmUi=function(container_id,options){this.options={xspf:null,listener:null,autoplay:false,audio:null,artwork_quality:'medium',panel_tracklist_always_visible:false,debug:false,jspf_format:false,debug_audio:null}
this.container_id=null;this.container=null;this.aspect=null;this.core=null;this.ui={};this.initialize(container_id,options);}
OfmHtmlPlayer.OfmUi.prototype.initialize=function(container_id,options){this.options=OfmHtmlPlayer.mergeOptions(this.options,options);this.container_id=container_id;this.container=document.getElementById(container_id);this.container.object=this;this.aspect=this.container.getAttribute("aspect");this.core=new OfmHtmlPlayer.OfmCore({autoplay:this.options.autoplay,audio:this.options.audio,artwork_quality:this.options.artwork_quality,xspf_url:this.options.xspf,debug_audio:this.options.debug_audio,listener:this.core_listener.bind(this),load_all:this.options.panel_tracklist_always_visible,jspf_format:this.options.jspf_format,container_id:container_id,debug:this.options.debug});this.link_core_to_ui();}
OfmHtmlPlayer.OfmUi.prototype.destroy=function(){if(this.core)this.core.destroy();}
OfmHtmlPlayer.OfmUi.prototype.link_core_to_ui=function(){this.ui={btn_play:null,btn_logo:null};this.ui.spinner=this.container.querySelector('[player_link="ofm_spinner"]');this.ui.artwork=this.container.querySelector('[player_link="ofm_artwork"]');this.ui.btn_play=this.container.querySelector('[player_link="ofm_btn_play"]');this.ui.btn_previous=this.container.querySelector('[player_link="ofm_btn_previous"]');this.ui.btn_next=this.container.querySelector('[player_link="ofm_btn_next"]');this.ui.btn_logo=this.container.querySelector('[player_link="ofm_btn_logo"]');this.ui.btn_vote=this.container.querySelector('[player_link="ofm_btn_vote"]');this.ui.btn_download=this.container.querySelector('[player_link="ofm_btn_download"]');this.ui.btn_buy=this.container.querySelector('[player_link="ofm_btn_buy"]');this.ui.btn_tracklist=this.container.querySelector('[player_link="ofm_btn_tracklist"]');this.ui.btn_shuffle=this.container.querySelector('[player_link="ofm_btn_shuffle"]');this.ui.btn_share=this.container.querySelector('[player_link="ofm_btn_share"]');this.ui.btn_embed=this.container.querySelector('[player_link="ofm_btn_embed"]');this.ui.btn_embed_on=this.container.querySelector('[player_link="ofm_btn_embed_on"]');this.ui.btn_close_embed=this.container.querySelector('[player_link="ofm_btn_close_embed"]');this.ui.share_panel=this.container.querySelector('[player_link="ofm_panel_share"]');this.ui.embed_panel=this.container.querySelector('[player_link="ofm_panel_embed"]');this.ui.btn_facebook=this.container.querySelector('[player_link="ofm_btn_facebook"]');this.ui.btn_twitter=this.container.querySelector('[player_link="ofm_btn_twitter"]');this.ui.btn_myspace=this.container.querySelector('[player_link="ofm_btn_myspace"]');this.ui.btn_embed_anywhere=this.container.querySelector('[player_link="ofm_btn_embed_anywhere"]');this.ui.btn_embed_myspace=this.container.querySelector('[player_link="ofm_btn_embed_myspace"]');this.ui.btn_embed_wordpress=this.container.querySelector('[player_link="ofm_btn_embed_wordpress"]');this.ui.track_info_title=this.container.querySelector('[player_link="ofm_track_info_title"]');this.ui.track_info_artist=this.container.querySelector('[player_link="ofm_track_info_artist"]');this.ui.tracklist_info_title=this.container.querySelector('[player_link="ofm_tracklist_info_title"]');this.ui.tracklist_info_description=this.container.querySelector('[player_link="ofm_tracklist_info_description"]');this.ui.time_play=this.container.querySelector('[player_link="ofm_time_play"]');this.ui.time_total=this.container.querySelector('[player_link="ofm_time_total"]');if(this.container.querySelector('[player_link="ofm_timeline"]')){this.ui.timeline=new OfmHtmlPlayer.OfmTimeline(this.container.querySelector('[player_link="ofm_timeline"]'),{listener:this.timeline_listener.bind(this)});}
this.ui.panel_tracklist=this.container.querySelector('[player_link="ofm_panel_tracklist"]');this.ui.tracklist=this.container.querySelector('[player_link="ofm_tracklist"]');this.ui.panel_share=this.container.querySelector('[player_link="ofm_panel_share"]');this.ui.panel_share_link=this.container.querySelector('[player_link="ofm_share_link"]');this.ui.panel_share_embed=this.container.querySelector('[player_link="ofm_share_embed"]');this.ui.top_controls=this.container.querySelector('[player_link="ofm_top_controls"]');this.ui.bottom_controls=this.container.querySelector('[player_link="ofm_bottom_controls"]');if(this.ui.btn_play){this.ui.btn_play.addEventListener('click',function(event){this.toggle_playpause(event);}.bind(this),false);}
if(this.ui.btn_previous){this.ui.btn_previous.addEventListener('click',function(){this.core.previous()}.bind(this),false);}
if(this.ui.btn_next){this.ui.btn_next.addEventListener('click',function(){this.core.next()}.bind(this),false);}
if(this.ui.btn_logo){this.ui.btn_logo.setAttribute('title','more informations about this track');this.ui.btn_logo.addEventListener('click',function(){this.navigate_to(this.core.get_current_track().link);this.dump();}.bind(this),false);}
if(this.ui.btn_vote){this.ui.btn_vote.setAttribute('title','vote for this track');this.ui.btn_vote.addEventListener('click',function(){this.navigate_to(this.core.get_current_track().link);}.bind(this),false);}
if(this.ui.btn_download){this.ui.btn_download.setAttribute('title','download this track');this.ui.btn_download.addEventListener('click',function(){this.navigate_to(this.core.get_current_track().download_url);}.bind(this),false);}
if(this.ui.btn_buy){this.ui.btn_buy.setAttribute('title','buy this track');this.ui.btn_buy.addEventListener('click',function(){this.navigate_to(this.core.get_current_track().buy_url);}.bind(this),false);}
if(this.ui.btn_shuffle){this.ui.btn_shuffle.setAttribute('title','shuffle tracklist');this.ui.btn_shuffle.addEventListener('click',function(){this.core.toggle_shuffle();}.bind(this),false);}
if(this.ui.btn_tracklist){this.ui.btn_tracklist.setAttribute('title','view tracklist');this.ui.btn_tracklist.addEventListener('click',function(){this.update_panel_tracklist();}.bind(this),false);}
if(this.ui.btn_share){this.ui.btn_share.setAttribute('title','share this track');this.ui.btn_share.addEventListener('click',function(){this.toggle_panel_share();}.bind(this),false);}
if(this.ui.btn_embed){this.ui.btn_embed.setAttribute('title','embed this track');this.ui.btn_embed.addEventListener('click',function(){this.toggle_panel_embed(true);}.bind(this),false);}
if(this.ui.btn_embed_on){this.ui.btn_embed_on.setAttribute('title','hide embed options');this.ui.btn_embed_on.addEventListener('click',function(){this.toggle_panel_embed(false);}.bind(this),false);}
if(this.ui.btn_close_embed){this.ui.btn_close_embed.setAttribute('title','hide embed options');this.ui.btn_close_embed.addEventListener('click',function(){this.toggle_panel_embed(false);}.bind(this),false);}
if(this.ui.artwork&&(this.aspect=='large'||this.aspect=='standard'||this.aspect=='artwork')){this.ui.artwork.addEventListener('click',function(){this.toggle_controls();}.bind(this),false);}
if(this.ui.btn_facebook){this.ui.btn_facebook.setAttribute('title','share this track on facebook');this.ui.btn_facebook.addEventListener('click',function(){this.navigate_to(this.core.get_current_track().get_link('facebook'));}.bind(this),false);}
if(this.ui.btn_twitter){this.ui.btn_twitter.setAttribute('title','share this track on twitter');this.ui.btn_twitter.addEventListener('click',function(){this.navigate_to(this.core.get_current_track().get_link('twitter'));}.bind(this),false);}
if(this.ui.btn_myspace){this.ui.btn_myspace.setAttribute('title','share this track on myspace');this.ui.btn_myspace.addEventListener('click',function(){this.navigate_to(this.core.get_current_track().get_link('myspace'));}.bind(this),false);}
if(this.ui.btn_embed_anywhere){this.ui.btn_embed_anywhere.setAttribute('title','embed anywhere');this.ui.btn_embed_anywhere.addEventListener('click',function(){this.set_embed_code(this.core.get_current_track().get_embed('anywhere'));if(this.ui.btn_embed_anywhere)OfmHtmlPlayer.js_addClass(this.ui.btn_embed_anywhere,'active');if(this.ui.btn_embed_myspace)OfmHtmlPlayer.js_removeClass(this.ui.btn_embed_myspace,'active');if(this.ui.btn_embed_wordpress)OfmHtmlPlayer.js_removeClass(this.ui.btn_embed_wordpress,'active');}.bind(this),false);}
if(this.ui.btn_embed_myspace){this.ui.btn_embed_myspace.setAttribute('title','embed on Myspace');this.ui.btn_embed_myspace.addEventListener('click',function(){this.set_embed_code(this.core.get_current_track().get_embed('myspace'));if(this.ui.btn_embed_anywhere)OfmHtmlPlayer.js_removeClass(this.ui.btn_embed_anywhere,'active');if(this.ui.btn_embed_myspace)OfmHtmlPlayer.js_addClass(this.ui.btn_embed_myspace,'active');if(this.ui.btn_embed_wordpress)OfmHtmlPlayer.js_removeClass(this.ui.btn_embed_wordpress,'active');}.bind(this),false);}
if(this.ui.btn_embed_wordpress){this.ui.btn_embed_wordpress.setAttribute('title','embed on Wordpress');this.ui.btn_embed_wordpress.addEventListener('click',function(){this.set_embed_code(this.core.get_current_track().get_embed('wordpress'));if(this.ui.btn_embed_anywhere)OfmHtmlPlayer.js_removeClass(this.ui.btn_embed_anywhere,'active');if(this.ui.btn_embed_myspace)OfmHtmlPlayer.js_removeClass(this.ui.btn_embed_myspace,'active');if(this.ui.btn_embed_wordpress)OfmHtmlPlayer.js_addClass(this.ui.btn_embed_wordpress,'active');}.bind(this),false);}
if(this.ui.spinner){this.ui.spinner.addEventListener('click',function(event){this.toggle_playpause(event);}.bind(this),false);}}
OfmHtmlPlayer.OfmUi.prototype.toggle_playpause=function(event){if(this.aspect=='artwork'&&!this.core.playing)this.show_controls();if(event.shift==true)this.dump();else this.core.toggle_playpause();}
OfmHtmlPlayer.OfmUi.prototype.navigate_to=function(url){window.open(url,'_blank');}
OfmHtmlPlayer.OfmUi.prototype.set_embed_code=function(code){if(this.ui.panel_share_embed)this.ui.panel_share_embed.value=code;}
OfmHtmlPlayer.OfmUi.prototype.core_listener=function(event){var listener_data;if(event==OfmHtmlPlayer.EVENT_TIME_UPDATE){this.update_time_and_timeline();if(this.ui.timeline)this.ui.timeline.set_progress_perc(this.core.get_progress_perc());listener_data={};try{listener_data.played_seconds=this.core.get_position();listener_data.played_percent=this.core.get_position_perc();listener_data.total=this.core.get_duration();}catch(e){}}
else if(event==OfmHtmlPlayer.EVENT_TIME_LOAD_PROGRESS){if(this.ui.timeline)this.ui.timeline.set_progress_perc(this.core.get_progress_perc());}
else if(event==OfmHtmlPlayer.EVENT_TIME_LOAD_COMPLETE){}
else if(event==OfmHtmlPlayer.EVENT_SHOW_SPINNER){if(this.ui.spinner)this.show_spinner();}
else if(event==OfmHtmlPlayer.EVENT_HIDE_SPINNER){if(this.ui.spinner)this.hide_spinner();}
else if(event==OfmHtmlPlayer.EVENT_CORE_READY){this.core.log('** core event : '+event);}
else if(event==OfmHtmlPlayer.EVENT_CORE_PLAY){if(this.ui.btn_play){OfmHtmlPlayer.js_addClass(this.ui.btn_play,'active');}
try{top.sync_play_buttons(this.core.get_current_tracklist().xspf_url,this.core.get_current_track().id,true);}catch(e){}
try{listener_data=this.core.get_current_track().id;}catch(e){}}
else if(event==OfmHtmlPlayer.EVENT_CORE_PAUSE){if(this.ui.btn_play)OfmHtmlPlayer.js_removeClass(this.ui.btn_play,'active');try{top.sync_play_buttons(this.core.get_current_tracklist().xspf_url,this.core.get_current_track().id,false);}catch(e){}
try{listener_data=this.core.get_current_track().id;}catch(e){}}
else if(event==OfmHtmlPlayer.EVENT_CHANGE_TRACK||event==OfmHtmlPlayer.EVENT_VOTE_UPDATED||event==OfmHtmlPlayer.EVENT_SHUFFLE_UPDATED){this.update_single_or_multi_tracklist();this.update_ui();try{top.sync_play_buttons(this.core.get_current_tracklist().xspf_url,this.core.get_current_track().id,this.core.playing);}catch(e){}
try{listener_data=this.core.get_current_track().id;}catch(e){}}
else if(event==OfmHtmlPlayer.EVENT_CHANGE_TRACKLIST){this.core.log('** core event : '+event);}
var player_id=this.core?this.core.player_id:null;if(this.options.listener)this.options.listener(player_id,event,listener_data);}
OfmHtmlPlayer.OfmUi.prototype.timeline_listener=function(event){if(event==OfmHtmlPlayer.EVENT_TIMELINE_CHANGED){if(this.ui.timeline)this.core.set_position_perc(this.ui.timeline.get_position_perc());}}
OfmHtmlPlayer.OfmUi.prototype.update_single_or_multi_tracklist=function(){if(this.core.get_current_tracklist().nb_tracks==1){if(this.ui.btn_previous)this.ui.btn_previous.style.display='none';if(this.ui.btn_next)this.ui.btn_next.style.display='none';if(this.ui.btn_shuffle)this.ui.btn_shuffle.style.display='none';if(this.ui.btn_tracklist)this.ui.btn_tracklist.style.display='none';}else{if(this.ui.btn_previous)this.ui.btn_previous.style.display='';if(this.ui.btn_next)this.ui.btn_next.style.display='';if(this.ui.btn_shuffle)this.ui.btn_shuffle.style.display='';if(this.ui.btn_tracklist)this.ui.btn_tracklist.style.display='';}}
OfmHtmlPlayer.OfmUi.prototype.update_ui=function(){if(this.ui.artwork)this.ui.artwork.style.backgroundImage="url('"+this.core.get_current_track().artwork_url+"')";if(this.ui.tracklist_info_title){this.ui.tracklist_info_title.innerHTML=this.core.get_current_tracklist().playlist_title;}
if(this.ui.tracklist_info_description){this.ui.tracklist_info_description.innerHTML=this.core.get_current_tracklist().playlist_author;}
if(this.ui.track_info_title){this.ui.track_info_title.innerHTML=this.core.get_current_track().title;}
if(this.ui.track_info_artist){this.ui.track_info_artist.innerHTML=this.core.get_current_track().artist;}
if(this.ui.btn_share&&false){if(this.core.get_current_track().sharable)this.ui.btn_share.style.display='';else this.ui.btn_share.style.display='none';}
if(this.ui.btn_buy){if(this.core.get_current_track().buyable)this.ui.btn_buy.style.display='';else this.ui.btn_buy.style.display='none';}
if(this.ui.btn_vote){if(this.core.get_current_track().voted)OfmHtmlPlayer.js_addClass(this.ui.btn_vote,'active');else OfmHtmlPlayer.js_removeClass(this.ui.btn_vote,'active');}
if(this.ui.btn_shuffle){if(this.core.get_current_tracklist().shuffled)OfmHtmlPlayer.js_addClass(this.ui.btn_shuffle,'active');else OfmHtmlPlayer.js_removeClass(this.ui.btn_shuffle,'active');}
this.update_panel_share();this.update_panel_tracklist();}
OfmHtmlPlayer.OfmUi.prototype.update_time_and_timeline=function(){if(this.ui.timeline)this.ui.timeline.set_position_perc(this.core.get_position_perc());if(this.ui.time_play)this.ui.time_play.innerHTML=this.core.get_position_pretty();if(this.ui.time_total)this.ui.time_total.innerHTML=this.core.get_duration_pretty();}
OfmHtmlPlayer.OfmUi.prototype.toggle_controls=function(){OfmHtmlPlayer.js_toggleDisplay(this.ui.top_controls);OfmHtmlPlayer.js_toggleDisplay(this.ui.bottom_controls);}
OfmHtmlPlayer.OfmUi.prototype.show_controls=function(){this.ui.top_controls.style.display='';this.ui.bottom_controls.style.display='';}
OfmHtmlPlayer.OfmUi.prototype.toggle_panel_share=function(){OfmHtmlPlayer.js_toggleDisplay(this.ui.share_panel);OfmHtmlPlayer.js_toggleClass(this.ui.btn_share,'active');this.update_panel_share();}
OfmHtmlPlayer.OfmUi.prototype.toggle_panel_embed=function(visible){if(visible){this.ui.embed_panel.style.display='';this.ui.share_panel.style.display='none';}else{this.ui.embed_panel.style.display='none';this.ui.share_panel.style.display='';}
this.update_panel_share();}
OfmHtmlPlayer.OfmUi.prototype.update_panel_share=function(){if(this.ui.panel_share){if(this.ui.panel_share_link)this.ui.panel_share_link.value=this.core.get_current_track().link;if(this.ui.panel_share_embed){this.ui.panel_share_embed.value=this.core.get_current_track().get_embed_code(this.aspect);if(this.ui.btn_embed_anywhere)OfmHtmlPlayer.js_addClass(this.ui.btn_embed_anywhere,'active');if(this.ui.btn_embed_myspace)OfmHtmlPlayer.js_removeClass(this.ui.btn_embed_myspace,'active');if(this.ui.btn_embed_wordpress)OfmHtmlPlayer.js_removeClass(this.ui.btn_embed_wordpress,'active');}}}
OfmHtmlPlayer.OfmUi.prototype.update_panel_tracklist=function(){if(this.options.panel_tracklist_always_visible){this.core.get_current_tracklist().load_all();}
if(this.ui.panel_tracklist&&this.ui.panel_tracklist.visible()){this.ui.tracklist.innerHTML='';this.core.get_tracklist_for_panel().inject(this.ui.tracklist,'bottom');try{this.ui.panel_tracklist.scrollTo(0,this.ui.tracklist.getElement('.active').getPosition(this.ui.tracklist).y);}catch(e){}}}
OfmHtmlPlayer.OfmUi.prototype.show_spinner=function(){this.ui.spinner.style.display='';}
OfmHtmlPlayer.OfmUi.prototype.hide_spinner=function(){this.ui.spinner.style.display='none';}
OfmHtmlPlayer.OfmUi.prototype.log=function(s){if(this.core)this.core.log(s);}
OfmHtmlPlayer.OfmUi.prototype.dump=function(){this.core.dump();}
OfmHtmlPlayer.OfmUi.prototype.set_dimensions=function(w,h){this.container.style.width=(typeof(w)=='string')?w:(w+'px');if(h!=undefined)this.container.style.height=(typeof(h)=='string')?h:(h+'px');}
OfmHtmlPlayer.OfmUi.prototype.playIndex=function(index){this.log('*** missing callback playIndex');}
OfmHtmlPlayer.OfmUi.prototype.play_index=function(index){this.core.play_index(index);}
OfmHtmlPlayer.OfmUi.prototype.playIdentifier=function(track_id){try{this.core.play_track(track_id);}catch(e){}}
OfmHtmlPlayer.OfmUi.prototype.pause=function(){this.core.pause();}
OfmHtmlPlayer.OfmUi.prototype.fairpause=function(){this.core.pause();}
OfmHtmlPlayer.OfmUi.prototype.getCurrentTrackInfo=function(){try{return this.core.get_current_track();}catch(e){}}
OfmHtmlPlayer.OfmUi.prototype.get_current_track_info=function(){try{return this.core.get_current_track_public_info();}catch(e){return null;}}
OfmHtmlPlayer.OfmUi.prototype.fairplay=function(track_id,xspf,force_reload){this.core.play_xspf_track(xspf,track_id);}
OfmHtmlPlayer.OfmUi.prototype.play=function(track_id,xspf,force_reload){this.core.play_xspf_track(xspf,track_id);}
OfmHtmlPlayer.OfmUi.prototype.play_track=function(track_id){this.core.play_xspf_track(this.core.build_feed('track',track_id),track_id);}
OfmHtmlPlayer.OfmUi.prototype.play_playlist=function(playlist_id,track_id){this.core.play_xspf_track(this.core.build_feed('playlist',playlist_id),track_id?track_id:0);}
OfmHtmlPlayer.OfmUi.prototype.seek=function(sec){this.core.set_position(sec);}
OfmHtmlPlayer.OfmUi.prototype.nexttrack=function(){try{this.core.next();}catch(e){}}
OfmHtmlPlayer.OfmUi.prototype.next=function(){try{this.core.next();}catch(e){}}
OfmHtmlPlayer.OfmUi.prototype.prevtrack=function(){try{this.core.previous();}catch(e){}}
OfmHtmlPlayer.OfmUi.prototype.previous=function(){try{this.core.previous();}catch(e){}}
OfmHtmlPlayer.OfmUi.prototype.fairplaying=function(){return this.core.playing;}
OfmHtmlPlayer.OfmUi.prototype.is_playing=function(){return this.core.playing;}
OfmHtmlPlayer.OfmUi.prototype.current_track_id=function(){try{return this.core.get_current_track().id;}catch(e){}}
OfmHtmlPlayer.OfmUi.prototype.get_current_track_id=function(){try{return this.core.get_current_track().id;}catch(e){}}
OfmHtmlPlayer.OfmUi.prototype.current_feed=function(){try{return this.core.get_current_tracklist().xspf_url;}catch(e){}}
OfmHtmlPlayer.OfmUi.prototype.get_current_feed=function(){try{return this.core.get_current_tracklist().xspf_url;}catch(e){}}
OfmHtmlPlayer.OfmUi.prototype.get_player_id=function(){try{return this.core.player_id;}catch(e){}}
OfmHtmlPlayer.OfmUi.prototype.switch_to_vote=function(){this.log('*** missing callback switch_to_vote');}
OfmHtmlPlayer.OfmUi.prototype.switch_to_unvote=function(){this.log('*** missing callback switch_to_unvote');}
OfmHtmlPlayer.OfmUi.prototype.track_voted=function(track_id){this.log('*** missing callback track_voted');}
OfmHtmlPlayer.OfmUi.prototype.track_unvoted=function(track_id){this.log('*** missing callback track_unvoted');}
OfmHtmlPlayer.OfmUi.prototype.playlist_voted=function(playlist_id){this.log('*** missing callback playlist_voted');}
OfmHtmlPlayer.OfmUi.prototype.playlist_unvoted=function(playlist_id){this.log('*** missing callback playlist_unvoted');}
OfmHtmlPlayer.OfmUi.prototype.user_voted=function(user_id){this.log('*** missing callback user_voted');}
OfmHtmlPlayer.OfmUi.prototype.user_unvoted=function(user_id){this.log('*** missing callback user_unvoted');}
OfmHtmlPlayer.OfmUi.prototype.switch_info_mode=function(){this.log('*** missing callback switch_info_mode');}
OfmHtmlPlayer.OfmUi.prototype.show_popup_button=function(){this.log('*** missing callback show_popup_button');}
OfmHtmlPlayer.OfmUi.prototype.hide_popup_button=function(){this.log('*** missing callback hide_popup_button');}
OfmHtmlPlayer.OfmUi.prototype.invalidate_track_from_feed=function(){this.log('*** missing callback invalidate_track_from_feed');}
OfmHtmlPlayer.OfmUi.prototype.invalidate_feed=function(){this.log('*** missing callback invalidate_feed');}
OfmHtmlPlayer.OfmUi.prototype.preload_feed=function(feed){this.log('*** missing callback preload_feed');}
OfmHtmlPlayer.OfmUi.prototype.switch_feed=function(){this.log('*** missing callback switch_feed');}
OfmHtmlPlayer.OfmUi.prototype.isReady=function(){try{return(this.core&&this.core.ready);}catch(e){}}
OfmHtmlPlayer.OfmUi.prototype.set_volume=function(vol){try{this.core.audio.set_volume(vol);}catch(e){}}
try{OfmHtmlPlayer.on_html_player_scripts_loaded();}catch(e){}


try{
  if (OfficialFM){}
}catch(e){
  OfficialFM = {};
}

OfficialFM.Player = {
  // player events
  events : {
    READY : 'READY',
    PLAY : 'PLAY',
    PAUSE : 'PAUSE',
    PROGRESS : 'PROGRESS',
    CHANGE_TRACK : 'CHANGE_TRACK',
    CHANGE_TRACKLIST : 'CHANGE_TRACKLIST',
    TRACKLIST_END : 'TRACKLIST_END'
  },
  
  default_options : {
    container_id : null, 
    type : null,
    id : null,
    aspect : 'large', 
    skin : null, 
    html : false,
    width : '100%',
    onReady : null,
    onPlay : null,
    onPause : null,
    onProgress : null,
    onChangeTrack : null,
    onChangeTracklist : null,
    onTracklistEnd : null
  },
  
  default_aspects : {
    large: [220, 350], 
    standard: [160, 240], 
    small: ['100%', 40], 
    mini: [34, 18], 
    artwork: [220, 220]
  },
  
  players : new Array(),
  
  doc : document, // could be changed by set_document when needed (ex: set_document(aWebProgress.DOMWindow.document); in a firefox extension)

  listeners : {},
  
  ofm_player_server : 'http://play.official.fm/',
  
  styles_injected : false,
  
  // public ----------------------------------------------------------------------------------------------------
  create : function(options){
    if (this.players.length==0 && window && window.addEventListener){
      window.addEventListener('unload', OfficialFM.Player.destroy, false);
    }    
    this.players.push({
      container_id : options.container_id,
      player : null
    });
    var iOs = (navigator.userAgent.match(/(ipad|iphone|ipod)/i) != null);
    var player = (options.html || iOs) ? this.create_html(options) : this.create_flash(options);
    OfficialFM.Player.players[this.players.length-1].player = player;
    return player;
  },
  
  stop_all : function(){
    for (i=0; i<this.players.length;i++) {
      if (this.players[i].player) {
        try{
          this.players[i].player.pause();
        }catch(e){}
      }
    }
  },
  
  destroy : function(){
    try{
      for (i=0; i<this.players.length;i++) {
        if (this.players[i].player) {
          this.players[i].player.pause();
          this.players[i].player.destroy();
        }
        if (this.players[i].player) this.players[i]=null;
      }
    }catch(e){}
    this.players = new Array();
  },
  
  set_document : function(d){
    this.doc = d;
  },

  // private ----------------------------------------------------------------------------------------------------
  build_feed : function(type, id){
    return (this.ofm_player_server + type + 's/' + id + '.xspf');
  },
  
  create_flash : function(options){
    // merge options
    var player_options = {};
    for (var opt in this.default_options) {player_options[opt] = options[opt] ? options[opt] : this.default_options[opt];}
    // create new listener for this player
    var listener_name = this.add_player_event_listener(player_options);
    // dimensions
    var player_width = (options.width && (player_options.aspect=='artwork' || player_options.aspect=='small')) ? player_options.width : this.default_aspects[player_options.aspect][0];
    var player_height = (options.width && player_options.aspect=='artwork') ? player_options.width : this.default_aspects[player_options.aspect][1];
    // skin
    player_options.skin = player_options.skin ? player_options.skin : 'default';
    // feed escaped
    var feed_esc = escape(this.build_feed(player_options.type, player_options.id));
    // object string
    var player_html = '<object id="' + player_options.container_id + '__object" width="' + player_width + '" height="' + player_height + '" style="outline:none;">';
    player_html += '<param name="movie" value="' + this.ofm_player_server + 'flash/fairplayer.swf?fairplayer=' + player_options.aspect + '&skin=' + player_options.skin + '&listener=' + listener_name + '&feed=' + feed_esc + '" />';
    player_html += '<param name="allowscriptaccess" value="always" /><param name="wmode" value="transparent" />';
    player_html += '<embed id="' + player_options.container_id  + '__embed"  width="' + player_width + '" height="' + player_height + '" type="application/x-shockwave-flash" src="' + this.ofm_player_server + 'flash/fairplayer.swf?fairplayer=' + player_options.aspect + '&skin=' + player_options.skin + '&listener=' + listener_name + '&feed=' + feed_esc + '" allowscriptaccess="always" wmode="transparent" style="outline:none;"/>';
    player_html += '</object>';
    this.doc.getElementById(player_options.container_id).innerHTML = player_html;
    return this.doc.getElementById(player_options.container_id + '__embed');
  },
  
  create_html : function(options){
    if (typeof OfmHtmlPlayer == 'undefined') {
      alert('ofm html player scripts must be loaded!');
      return null;
    }
    // inject styles
    if (!this.styles_injected){
      this.load_stylesheet(this.ofm_player_server + "stylesheets/packages/html_player_all.css");
      this.styles_injected=true;
    }
    // merge options
    var player_options = {};
    for (var opt in this.default_options) {player_options[opt] = options[opt] ? options[opt] : this.default_options[opt];}
    player = this.create_html_player(player_options); 
    return player;
  },
  
  create_html_player : function(player_options){
    // create player
    var player_id = player_options.container_id + '_player';
    this.doc.getElementById(player_options.container_id).innerHTML = this.get_html_player_code(player_options, player_id);
    var player = new OfmHtmlPlayer.OfmUi(player_id, {
      xspf : this.build_feed(player_options.type, player_options.id),
      listener : this.add_player_event_listener(player_options, true),
      jspf_format : true
    });
    if (player_options.aspect=='artwork' && player_options.width) player.set_dimensions(player_options.width, player_options.width);
    if (player_options.aspect=='small' && player_options.width) player.set_dimensions(player_options.width);
    return player;
  },
  
  get_html_player_code : function(player_options, id){
    var markup = {
      large : '<div id="@@player_id" class="ofm_html_player_large" aspect="large">    <div class="tracklist_info_bar">     <div class="tracklist_info_title" player_link="ofm_tracklist_info_title"></div>     <div class="tracklist_info_description" player_link="ofm_tracklist_info_description"></div>   </div>      <div class="viewport">     <div class="player_bg_logo"></div>     <div class="artwork" player_link="ofm_artwork" style="background-size:100%;background-image:url();background-repeat:no-repeat;background-position:center center;"></div>          <div class="controls bottom_controls" player_link="ofm_bottom_controls" style="display:none;">       <a class="button btn_vote" player_link="ofm_btn_vote"></a>       <a class="button btn_download" player_link="ofm_btn_download" style="display:none;"></a>       <a class="button btn_buy" player_link="ofm_btn_buy"></a>     </div>          <div class="panel_share" player_link="ofm_panel_share" style="display:none;">       <table class="top_panel_share">         <tr>           <td width="96%"><b>SHARE</b></td>         </tr>                   <tr>           <td width="96%">             <input player_link="ofm_share_link"/>           </td>           <td width="1%"><a class="button btn_facebook" player_link="ofm_btn_facebook"></a></td>           <td width="1%"><a class="button btn_twitter" player_link="ofm_btn_twitter"></a></td>           <td width="1%"><a class="button btn_myspace" player_link="ofm_btn_myspace"></a></td>         </tr>       </table>        <table class="top_panel_embed">         <tr>           <td colspan="3"><b>EMBED</b></td>         </tr>         <tr>           <td colspan="3" style="padding-top:4px;">             <a class="button btn_embed_anywhere active" player_link="ofm_btn_embed_anywhere"></a>             <a class="button btn_embed_wordpress" player_link="ofm_btn_embed_wordpress"></a>           </td>         </tr>         <tr>           <td colspan="3">             <input player_link="ofm_share_embed"/>           </td>         </tr>       </table>             </div>          <div class="controls top_controls" player_link="ofm_top_controls" style="display:none;">       <a class="button btn_shuffle" player_link="ofm_btn_shuffle"></a>       <a class="button btn_share" player_link="ofm_btn_share"></a>     </div>    </div>      <div class="track_info_bar">     <div class="track_info_title" player_link="ofm_track_info_title"></div>     <div class="track_info_artist" player_link="ofm_track_info_artist"></div>   </div>    <div class="remote_controller" skin_color="remote_background">          <div class="line1">       <a class="button btn_previous" player_link="ofm_btn_previous" style="display:none;"></a>       <a class="button btn_play" player_link="ofm_btn_play"></a>       <a class="button btn_next" player_link="ofm_btn_next" style="display:none;"></a>     </div>          <table class="line2" border="0" cellpadding="0" cellspacing="0"><tr>       <td width="2%" style="padding-left:5px;"><span player_link="ofm_time_play">00:00</span></td>       <td width="90%"><div class="timeline" player_link="ofm_timeline"></div></td>             <td width="2%"><span player_link="ofm_time_total">00:00</span></td>       <td width="2%"><a class="button btn_logo" player_link="ofm_btn_logo"></a></td>     </tr></table>        </div>    </div> ',
      standard : '<div id="@@player_id" class="ofm_html_player_standard" aspect="standard">   <div class="viewport">     <div class="player_bg_logo"></div>     <div class="artwork" player_link="ofm_artwork" style="background-size:100%;background-image:url();background-repeat:no-repeat;background-position:center center;"></div>      <div class="controls bottom_controls" player_link="ofm_bottom_controls" style="display:none;">       <a class="button btn_vote" player_link="ofm_btn_vote"></a>       <a class="button btn_download" player_link="ofm_btn_download" style="display:none;"></a>       <a class="button btn_buy" player_link="ofm_btn_buy"></a>     </div>      <div class="panel_share" player_link="ofm_panel_share" style="display:none;">       <table class="top_panel_share">         <tr>           <td width="96%"><b>SHARE</b></td>         </tr>                   <tr>           <td width="96%">             <input player_link="ofm_share_link"/>           </td>           <td width="1%"><a class="button btn_facebook" player_link="ofm_btn_facebook"></a></td>           <td width="1%"><a class="button btn_twitter" player_link="ofm_btn_twitter"></a></td>           <td width="1%"><a class="button btn_myspace" player_link="ofm_btn_myspace"></a></td>         </tr>       </table>        <table class="top_panel_embed">         <tr>           <td colspan="3"><b>EMBED</b></td>         </tr>         <tr>           <td colspan="3" style="padding-top:4px;">             <a class="button btn_embed_anywhere active" player_link="ofm_btn_embed_anywhere"></a>             <a class="button btn_embed_wordpress" player_link="ofm_btn_embed_wordpress"></a>           </td>         </tr>         <tr>           <td colspan="3">             <input player_link="ofm_share_embed" value="embed code"/>           </td>         </tr>       </table>             </div>          <div class="controls top_controls" player_link="ofm_top_controls" style="display:none;">       <a class="button btn_shuffle" player_link="ofm_btn_shuffle"></a>       <a class="button btn_share" player_link="ofm_btn_share"></a>     </div>    </div>      <div class="track_info_bar">     <div class="track_info_title" player_link="ofm_track_info_title"></div>     <div class="track_info_artist" player_link="ofm_track_info_artist"></div>   </div>    <div class="remote_controller" skin_color="remote_background">          <div class="line1">       <a class="button btn_previous" player_link="ofm_btn_previous" style="display:none;"></a>       <a class="button btn_play" player_link="ofm_btn_play"></a>       <a class="button btn_next" player_link="ofm_btn_next" style="display:none;"></a>     </div>          <table class="line2" border="0" cellpadding="0" cellspacing="0"><tr>       <td width="98%" style="padding-top:3px;padding-left:5px;"><div class="timeline" player_link="ofm_timeline"></div></td>             <td width="2%"><a class="button btn_logo" player_link="ofm_btn_logo"></a></td>     </tr></table>        </div> </div> ',
      artwork : '<style> .ofm_html_player_artwork{   width:px;   height:px; } </style> <div id="@@player_id" class="ofm_html_player_artwork" aspect="artwork">   <div class="player_bg_logo"></div>   <div class="artwork" player_link="ofm_artwork" style="background-size:100%;background-image:url();background-repeat:no-repeat;background-position:center center;"></div>   <div class="panel top_panel" player_link="ofm_top_controls" style="display:none;">        <table class="top_panel_share" player_link="ofm_panel_share"><tr>         <td width="1%"><a class="button btn_embed" player_link="ofm_btn_embed"></a></td>         <td width="96%">           <input player_link="ofm_share_link"/>         </td>         <td width="1%"><a class="button btn_facebook" player_link="ofm_btn_facebook"></a></td>         <td width="1%"><a class="button btn_twitter" player_link="ofm_btn_twitter"></a></td>         <td width="1%"><a class="button btn_myspace" player_link="ofm_btn_myspace"></a></td>       </tr></table>        <table class="top_panel_embed" player_link="ofm_panel_embed" style="display:none;">         <tr>           <td width="1%"><a class="button btn_embed_on" player_link="ofm_btn_embed_on"></a></td>           <td width="96%"><b>EMBED</b></td>           <td width="1%"><a class="button btn_close" player_link="ofm_btn_close_embed"></a></td>         </tr>         <tr>           <td colspan="3" style="padding-top:4px;">             <a class="button btn_embed_anywhere active" player_link="ofm_btn_embed_anywhere"></a>             <a class="button btn_embed_wordpress" player_link="ofm_btn_embed_wordpress"></a>           </td>         </tr>         <tr>           <td colspan="3">             <input player_link="ofm_share_embed"/>           </td>         </tr>       </table>   </div>    <a class="button btn_play" player_link="ofm_btn_play"></a>    <div class="panel bottom_panel" player_link="ofm_bottom_controls" style="display:none;">     <div class="track_info_bar">       <span class="track_info_artist" player_link="ofm_track_info_artist"></span> - <span class="track_info_title" player_link="ofm_track_info_title"></span>     </div>      <table class="line2" border="0" cellpadding="0" cellspacing="0"><tr>       <td width="1%" style="padding-left:0px;">         <div class="remote_controller" skin_color="remote_background">           <a class="button btn_previous" player_link="ofm_btn_previous" style="margin-left:0px;"></a>           <a class="button btn_next" player_link="ofm_btn_next"></a>         </div>       </td>       <td width="90%"><div class="timeline" player_link="ofm_timeline"></div></td>             <td width="2%">         <div class="controls">           <a class="button btn_shuffle" player_link="ofm_btn_shuffle" style="display:none;"></a>           <a class="button btn_download" player_link="ofm_btn_download" style="display:none;"></a>           <a class="button btn_buy" player_link="ofm_btn_buy" style="display:none;"></a>           <a class="button btn_logo" player_link="ofm_btn_logo"></a>         </div>               </td>     </tr></table>   </div> </div> ',
      small : '<div id="@@player_id" class="ofm_html_player_small" aspect="small">   <div class="player_container">     <div class="track_info_bar">       <span class="track_info_artist" player_link="ofm_track_info_artist"></span> - <span class="track_info_title" player_link="ofm_track_info_title"></span>     </div>     <table class="line2" border="0" cellpadding="0" cellspacing="0"><tr>       <td width="1%">         <div class="remote_controller" skin_color="remote_background">           <a class="button btn_play" player_link="ofm_btn_play"></a>           <a class="button btn_previous" player_link="ofm_btn_previous" style="display:none;"></a>           <a class="button btn_next" player_link="ofm_btn_next" style="display:none;"></a>         </div>       </td>       <td width="2%" style="padding-left:0px;"><span class="time_play" player_link="ofm_time_play">00:00</span></td>       <td width="90%"><div class="timeline" player_link="ofm_timeline"></div></td>             <td width="2%" style="padding-left:0px;"><span class="time_total" player_link="ofm_time_total">00:00</span></td>       <td width="2%">         <div class="controls">           <a class="button btn_shuffle" player_link="ofm_btn_shuffle"></a>           <a class="button btn_share" player_link="ofm_btn_share" style="display:none;"></a>           <a class="button btn_vote" player_link="ofm_btn_vote" style="display:none;"></a>           <a class="button btn_download" player_link="ofm_btn_download" style="display:none;"></a>           <a class="button btn_buy" player_link="ofm_btn_buy"></a>           <a class="button btn_logo" player_link="ofm_btn_logo"></a>         </div>               </td>     </tr></table>   </div> </div> ',
      mini : '<div id="@@player_id" class="ofm_html_player_mini" aspect="mini">   <a class="button btn_play" player_link="ofm_btn_play"></a>   <a class="button btn_logo" player_link="ofm_btn_logo"></a> </div> '
    };
    return markup[player_options.aspect].replace(/@@player_id/g, id);
  },
  
  add_player_event_listener : function(player_options, as_js_func){
    var listener_name = 'OfficialFM.Player.listeners.listener' + this.players.length;
    OfficialFM.Player.listeners['listener' + this.players.length] = function(player_id, event, data){
      if (player_options.onReady && event==OfficialFM.Player.events.READY) player_options.onReady(data);
      else if (player_options.onPlay && event==OfficialFM.Player.events.PLAY) player_options.onPlay(data);
      else if (player_options.onPause && event==OfficialFM.Player.events.PAUSE) player_options.onPause(data);
      else if (player_options.onChangeTrack && event==OfficialFM.Player.events.CHANGE_TRACK) player_options.onChangeTrack(data);
      else if (player_options.onChangeTracklist && event==OfficialFM.Player.events.CHANGE_TRACKLIST) player_options.onChangeTracklist(data);
      else if (player_options.onTracklistEnd && event==OfficialFM.Player.events.TRACKLIST_END) player_options.onTracklistEnd(data);
      else if (player_options.onProgress && event==OfficialFM.Player.events.PROGRESS) player_options.onProgress(data);
    };
    return as_js_func ?  OfficialFM.Player.listeners['listener' + this.players.length] : listener_name;
  },  
  
  load_stylesheet : function(url){
    // load more styles
    var elem=this.doc.createElement('link');
    elem.setAttribute("rel","stylesheet");
    elem.setAttribute("href", url);
    if (typeof elem!="undefined") this.doc.getElementsByTagName("head")[0].appendChild(elem);
    else alert("Error while loading additional stylesheets, please try reloading this page or contact us.");
  },
  
  load_script : function(url){
    // load more scripts
    var elem=this.doc.createElement('script');
    elem.setAttribute("type","text/javascript");
    elem.setAttribute("src", url);
    if (typeof elem!="undefined") this.doc.getElementsByTagName("head")[0].appendChild(elem);
    else alert("Error while loading additional scripts, please try reloading this page or contact us.");
  }
  
};

