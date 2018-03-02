(function(){var _w=window,_d=document,_l=_w.location;var stat={server:'http://dr.soso.com/p1.gif',errServer:'http://pr.soso.com/pingd?srctype=exception',cookiePrefix:'sost_',imgArr:[],cookie:'',query:'',hostname:_l.hostname,referrer:_d.referrer,domain:'',cookieInfo:{},queryInfo:{},divHandlers:[],data:{},gatherTypes:{'ss_c':'div'},groupTypes:{'ch':'ch','pid':'pid'},persistentTypes:{'pid':{'entr':'ss_pidf'},'cid':{'entr':'ss_cidf','needSameDomain':true}},kvSplit:function(str,outerSep,innerSep){if(typeof str!='string'||str===''){return{};}
outerSep=outerSep||'&';innerSep=innerSep||'=';var rObj={};var outerArr=str.split(outerSep);for(var i=0;i<outerArr.length;++i){if(outerArr[i].length==0){continue;}
var item=outerArr[i];var sepPos=item.indexOf(innerSep);if(sepPos<0){continue;}
var key=item.substring(0,sepPos);var val=item.substring(sepPos+innerSep.length);rObj[key]=val;}
return rObj;},getDomain:function(hostname){if(hostname===undefined&&this.domain){return this.domain;}
if(hostname===undefined){hostname=this.hostname;}
var tArr=hostname.split('.');if(tArr[tArr.length-1].match(/^\d+$/)){domain=hostname;}else{domain=tArr.slice(-2).join('.');}
if(hostname===this.hostname){this.domain=domain;}
return domain;},getCookie:function(name){if(_d.cookie!==this.cookie){this.cookie=_d.cookie;this.cookieInfo=this.kvSplit(_d.cookie,'; ');}
return(this.cookieInfo[name])?decodeURIComponent(this.cookieInfo[name]):this.cookieInfo[name];},getQuery:function(key){if(_l.search!==this.query){this.query=_l.search;this.queryInfo=this.kvSplit(_l.search.substring(1));}
return this.queryInfo[key];},setCookie:function(name,value,max_age,path,domain){path=path||"/";domain=domain||this.getDomain();var getExpires=function(max_age){var date=new Date();if(max_age=='unlimited'){date.setFullYear(2038,0,1);}else if(typeof max_age=='number'){if(max_age<=0){date.setFullYear(1970,1,1);}else{date.setTime(date.getTime()+max_age*1000);}}
return date.toGMTString();};var item=name+'='+encodeURIComponent(value)+(max_age||max_age===0?('; expires='+getExpires(max_age)):'')+(path?';path='+path:'')+(domain?';domain='+domain:'');_d.cookie=item;},delCookie:function(name,path,domain){this.setCookie(name,'',0,path,domain);},loopDivs:function(){var divSet=_d.getElementsByTagName('div');for(var i=0;i<divSet.length;++i){for(var j=0;j<this.divHandlers.length;++j){this.divHandlers[j](divSet[i]);}}},regDivHandler:function(func){this.divHandlers.push(func);},regDivHandlers:function(){for(var type in this.gatherTypes){this.regDivHandler(this.getGatherFunc(type));}
for(var type in this.groupTypes){this.regDivHandler(this.getGroupFunc(type));}},getGatherFunc:function(type,sep){var sep=sep||'^';var data=this.data;return function(div){var attrVal=div.getAttribute(type);if(attrVal){data[type]=data[type]===undefined?'':data[type];data[type]+=(data[type]===''?'':sep)+attrVal;}}},getGroupFunc:function(type,domain){var domain=domain||this.getDomain();var stat=this;return function(div){var attrVal=div.getAttribute(type);if(!attrVal){return;}
var strToAdd=type+'='+attrVal;var urls=div.getElementsByTagName('a');var pattern=new RegExp("[&?]"+type+"=");for(var i=0;i<urls.length;++i){url=urls[i];if(stat.getDomain(url.hostname)==domain){if(pattern.test(url.search)){continue;}
url.href=' '+url.href+(url.search?'&':'?')+strToAdd;;}}};},genSuid:function(){var f=new Date().getUTCMilliseconds();var s=(Math.round(Math.random()*2147483647)*f)%10000000000;var str_suid=(new Date()).valueOf().toString().substr(5)+s;return str_suid},submit:function(obj){var queryString='';if(obj['ref']!==undefined){queryString='ref='+obj['ref'];delete(obj['ref']);}
for(var k in obj){queryString+=(queryString?'&':'')+k+'='+obj[k];}
queryString+=(queryString?'&':'')+'rand='+Math.random();var src=this.server+'?'+queryString;var c=new Image();var len=this.imgArr.push(c);var imgArr=this.imgArr;c.onload=(c.onerror=function(){imgArr[len-1]=null;});c.src=src;c=null;},setPersistentParams:function(){for(var type in this.persistentTypes){var props=this.persistentTypes[type];var flagName=props['entr']||(this.cookiePrefix+type+'_f');if(props['needSameDomain']){var refHost='';var tArr=this.referrer.match(/^(http:\/\/)([^:/]+)/);if(tArr&&tArr[0]){refHost=tArr[0];}
if(this.getDomain(refHost)!=this.getDomain()){this.delCookie(type);this.delCookie(flagName);}}
var valInQuery=this.getQuery(type);if(valInQuery){if(valInQuery==this.getCookie(type)){this.setCookie(flagName,"1");}else{this.delCookie(flagName);this.setCookie(type,valInQuery);}}else{if(this.getCookie(type)){this.setCookie(flagName,"1");}}}},isSetSuid:function(){var f=this.getCookie("suid");if(!f){return false}
if(f.length<13){return false}
var g=/^\d+(\d+)?$/;if(g.test(f)&&f.length<20){return true}else{return false}},run:function(){this.setPersistentParams();this.regDivHandlers();this.loopDivs();if(!this.isSetSuid()){this.setCookie("suid",this.genSuid(),'unlimited');}
var obj={ref:encodeURIComponent(this.referrer)};for(var type in this.gatherTypes){var name=this.gatherTypes[type];if(this.data[type]){obj[name]=this.data[type];}}
this.submit(obj);},getGlobalName:function(){var gName='__sosostat';if(window[gName]!==undefined){gName+=new Date().getTime();}
return gName;}};window[stat.getGlobalName()]=stat;stat.run();})();