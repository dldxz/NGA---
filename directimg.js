// ==UserScript==
// @name         NGA优化摸鱼体验插件-代码图片直接浏览
// @namespace    http://
// @version      1.0.0
// @author       dldxz
// @description  自动替换帖子内代码图片链接，优化跟车体验
// @license      MIT
// @match        *://bbs.nga.cn/*
// @match        *://ngabbs.com/*
// @match        *://nga.178.com/*
// @grant        unsafeWindow
// @run-at       document-start
// @inject-into  content
// ==/UserScript==

(function (registerPlugin) {
    'use strict';
    registerPlugin({
        name: 'ImageReplace',  // 插件唯一KEY
        title: '代码图片直接浏览',  // 插件名称
        desc: '自动替换帖子内代码图片链接',  // 插件说明
        settings: [{
            key: 'displayTitle',
            title: '占位符',
            desc: '描述信息\n描述信息'
        }, ],
        buttons: [],
        beforeSaveSettingFunc(setting) {
            console.log(setting)
            // return 值则不会保存，并抛出错误
            return '拦截'
        },
        preProcFunc() {
            // console.log('已运行: preProcFunc()')
        },
        initFunc() {
            const $ = this.mainScript.libs.$;
            // console.log('已运行: initFunc()')
            // console.log('插件ID: ', this.pluginID)
            // console.log('插件配置: ', this.pluginSettings)
            // console.log('主脚本: ', this.mainScript)
            // console.log('主脚本引用库: ', this.mainScript.libs)
        },
        postProcFunc() {
            // console.log('已运行: postProcFunc()')
        },
        renderThreadsFunc($el) {
            // console.log('列表项 (JQuery) => ', $el)
            // console.log('列表项 (JS) => ', $el.get(0))
        },
        renderFormsFunc($el) {
            $el.find(".postcontent").each(function(){
            })
            var res = $el.find(".postcontent").text()
            var pattern = /\/[^\[\]]{20,40}.jpg/g
            var pattern1 = /\[noimg].*?[/noimg]]/g
            // console.log(res.match(pattern1))
            if (res.match(pattern) != null) {
                // 格式https://img.nga.178.com/attachments/mon_202407/04/d4Q5m9s-cundK1uT3cSlc-sg.jpg
                //获取回复日期
                var date = $el.find(".postdatec").text().split(" ")[0].split("-")
                var pre_url = "https://img.nga.178.com/attachments/mon_"+date[0]+date[1]+"/"+date[2]
                // console.log(pre_url)
                res = res.replace(pattern1,function(s){
                    // console.log(pre_url + s)
                    // console.log(s.slice(8,-8))
                    return "<img src="+ pre_url + s.slice(8,-8) +" class='hld__img-resize' hld__imglist='ready' hld-img-resize='ok' title='点击大图显示'>"
                })
                $el.find(".postcontent").html(res)
                // console.log(res)
            }
            // console.log('回复项 (JQuery) => ', $el)
            // console.log('回复项 (JS) => ', $el.get(0))
        },
        renderAlwaysFunc() {
            // console.log('循环运行: renderAlwaysFunc()')
        },
        asyncStyle() {
            return `#ngascript_plugin_${this.pluginID} {color: red}`
        },
        style: `
        #ngascript_plugin_test {color: red}
        `
    })

})(function(plugin) {
    plugin.meta = GM_info.script
    unsafeWindow.ngaScriptPlugins = unsafeWindow.ngaScriptPlugins || []
    unsafeWindow.ngaScriptPlugins.push(plugin)
});
