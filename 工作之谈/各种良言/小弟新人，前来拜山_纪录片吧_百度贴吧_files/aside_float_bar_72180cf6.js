_.Module.define({path:"common/component/AsideFloatBar",requires:["common/component/InterestSmiley"],sub:{initial:function(c){(typeof PDC!="undefined")&&PDC.mark("c_afbavi");this.options=c;this.$root=$('<ul class="tbui_aside_float_bar"></ul>');for(var e=0,a=c.buttons.length;e<a;e++){var d=c.buttons[e];this.addButton(d)}this.$root.appendTo("body");var b=this;b.relocate();$(window).resize(function(){b.relocate()})},addButton:function(b){var a=$($.tb.format('<li class="tbui_aside_fbar_button tbui_fbar_#{btnName}"><a href="#"></a></li>',{btnName:b}));var c=this["_"+b];if(c){if(c.call(this,a)){this.$root.append(a)}}},relocate:function(){if($(window).width()<1105){this.$root.addClass("tbui_afb_compact")}else{this.$root.removeClass("tbui_afb_compact")}},_top:function(a){var d=$(window);if(d.scrollTop()==0){a.css("visibility","hidden")}a.click(function(){var g=null;var f=d.scrollTop();if($.browser.msie){window.scrollTo(0,0)}else{function e(){f=Math.floor(f/2);window.scrollTo(0,f);if(f>2){g=setTimeout(e,40)}else{window.scrollTo(0,0);clearTimeout(g)}}e()}});var c,b=false;d.bind("scroll",function(){if(c){clearTimeout(c)}c=setTimeout(function(){if(d.scrollTop()>0){if(b==false){a.css("visibility","visible");b=true}}else{if(b){a.css("visibility","hidden");b=false}}},500)});return true},_refresh:function(a){a.click(function(){if(window.Path){window.Path.refresh()}else{$.tb.location.reload()}return false});return true},_post:function(a){var b=this;a.children().tbattr("href","#sub");a.click(function(c){if(window.option_editor&&option_editor.title){setTimeout(function(){$("#"+option_editor.title).focus()},50)}else{setTimeout(function(){b.fire("wanner_post")},50)}});return true},_share:function(a){var b=$("#bdshare_tb_l");if(b.size()==0){return false}b.delayhover({enterDelay:0,leaveDelay:700,mouseenter:function(){a.clearDelayHoverTimer()},mouseleave:function(){b.fadeOut()}});a.delayhover({enterDelay:300,leaveDelay:700,mouseenter:function(){if(b.is(":visible")){b.clearDelayHoverTimer()}else{var c=a.offset();c.top-=1;c.left=c.left-b.outerWidth()+1;b.css(c).fadeIn()}},mouseleave:function(){b.fadeOut()}}).click(function(c){c.preventDefault();c.stopPropagation()});return true},_radar:function(a){var b=this;a.find("a").append('<img src="/tb/static-common/img/toolbar/radar.gif" class="tbui_radar_img" />');a.find("a").tbattr({href:$.tb.unescapeHTML(b.options.radarData&&b.options.radarData.link),target:"_blank"});a.on("mousedown","a",function(){$.stats.track("radar","radar_banner")});if($.browser.msie&&$.browser.version==7){a.css("marginBottom","-4px")}if($.browser.msie&&$.browser.version==6){a.append("<div></div>");a.css("marginBottom","-3px")}return true},_tsukkomi:function(a){var b=this;if($.browser.msie&&$.browser.version==7){a.css("marginBottom","-4px")}if($.browser.msie&&$.browser.version==6){a.append("<div></div>");a.css("marginBottom","-3px")}var c=$('<div class="tbui_aside_smiley"></div>');b.interestSmile=this.use("common/component/InterestSmiley",{container:c,smileClass:"t_smile_bg",type:"toolbar",scrollCss:{padding:"9px 0px 0px 0px"},scrollBarHide:function(){c.width(296)},scrollBarShow:function(){c.width(306)},dataPostor:b.options.dataPostor});b.interestSmile.generic();a.append(c);a.children("a").click(function(d){d.preventDefault();d.stopPropagation();if(c.is(":visible")){c.fadeOut()}else{c.fadeIn();if(b.interestSmile.scrollPanel){b.interestSmile.scrollPanel.setHeight(156)}}});return true},_favor:function(a){if(PageData.user.is_login==false){return false}if(!PageData.user||!PageData.user.user_forum_list||!PageData.user.user_forum_list.info||PageData.user.user_forum_list.info.length==0){return false}if($.browser.msie&&$.browser.version==6){a.append("<div></div>");a.css("marginBottom","-3px")}var g=$('<ul class="tbui_aside_favor_list clearfix" id="tbui_aside_favor_list"></ul>');if(window.PageData&&PageData.user&&PageData.user.user_forum_list){var e=PageData.user.user_forum_list.info;var b,f=false;if(e.length<=8){b=e.length}else{b=7;f=true}for(var c=0;c<b;c++){var d={kw:encodeURIComponent(e[c].forum_name),forumName:$.tb.subByte(e[c].forum_name,12)};g.append($.tb.format('<li><a href="http://tieba.baidu.com/f?ie=utf-8&kw=#{kw}" target="_blank" class="ui_text_summary">#{forumName}</a></li>',d))}if(f){g.append('<li><a target="_blank" class="ui_text_desc" href="http://tieba.baidu.com/i/'+PageData.user.itieba_id+'" class="aside_float_favforum_more">\u66f4\u591a&gt;&gt;</a></li>')}}g.hide().appendTo(a);a.delayhover({enterDelay:300,leaveDelay:700,mouseenter:function(){g.fadeIn()},mouseleave:function(){g.fadeOut()}}).children("a").click(function(h){h.preventDefault();h.stopPropagation()});g.delegate("a","mousedown",function(){if(PageData&&PageData.forum&&PageData.product){if($(this).hasClass("ui_text_desc")){return}var h={st_mod:"aside_bar",st_type:"enterba",st_from:PageData.product,st_uid:(PageData.user.id),st_benba:encodeURIComponent(PageData.forum.name),st_goto:encodeURIComponent($(this).text())};$.tb.Stats.sendRequest("http://static.tieba.baidu.com/tb/img/hive.gif",h)}});return true}}});