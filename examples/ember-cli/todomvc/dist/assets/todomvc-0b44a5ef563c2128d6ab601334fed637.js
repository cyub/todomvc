"use strict";define("todomvc/app",["exports","ember","todomvc/resolver","ember-load-initializers","todomvc/config/environment"],function(e,t,l,n,o){var a=void 0;t.default.MODEL_FACTORY_INJECTIONS=!0,a=t.default.Application.extend({modulePrefix:o.default.modulePrefix,podModulePrefix:o.default.podModulePrefix,Resolver:l.default}),(0,n.default)(a,o.default.modulePrefix),e.default=a}),define("todomvc/components/todo-item",["exports","ember"],function(e,t){e.default=t.default.Component.extend({repo:t.default.inject.service(),tagName:"li",editing:!1,classNameBindings:["todo.completed","editing"],actions:{startEditing:function(){this.get("onStartEdit")(),this.set("editing",!0),t.default.run.scheduleOnce("afterRender",this,"focusInput")},doneEditing:function(e){this.get("editing")&&(t.default.isBlank(e)?this.send("removeTodo"):(this.set("todo.title",e.trim()),this.set("editing",!1),this.get("onEndEdit")()))},handleKeydown:function(e){13===e.keyCode?e.target.blur():27===e.keyCode&&this.set("editing",!1)},toggleCompleted:function(e){var l=this.get("todo");t.default.set(l,"completed",e.target.checked),this.get("repo").persist()},removeTodo:function(){this.get("repo").delete(this.get("todo"))}},focusInput:function(){this.element.querySelector("input.edit").focus()}})}),define("todomvc/components/todo-list",["exports","ember"],function(e,t){e.default=t.default.Component.extend({repo:t.default.inject.service(),tagName:"section",elementId:"main",canToggle:!0,allCompleted:t.default.computed("todos.@each.completed",function(){return this.get("todos").isEvery("completed")}),actions:{enableToggle:function(){this.set("canToggle",!0)},disableToggle:function(){this.set("canToggle",!1)},toggleAll:function(){var e=this.get("allCompleted");this.get("todos").forEach(function(l){return t.default.set(l,"completed",!e)}),this.get("repo").persist()}}})}),define("todomvc/controllers/active",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({todos:t.default.computed.filterBy("model","completed",!1)})}),define("todomvc/controllers/application",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({repo:t.default.inject.service(),remaining:t.default.computed.filterBy("model","completed",!1),completed:t.default.computed.filterBy("model","completed"),actions:{createTodo:function(e){13!==e.keyCode||t.default.isBlank(e.target.value)||(this.get("repo").add({title:e.target.value.trim(),completed:!1}),e.target.value="")},clearCompleted:function(){this.get("model").removeObjects(this.get("completed")),this.get("repo").persist()}}})}),define("todomvc/controllers/completed",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({todos:t.default.computed.filterBy("model","completed",!0)})}),define("todomvc/helpers/app-version",["exports","ember","todomvc/config/environment"],function(e,t,l){function n(){return o}e.appVersion=n;var o=l.default.APP.version;e.default=t.default.Helper.helper(n)}),define("todomvc/helpers/gt",["exports","ember"],function(e,t){function l(e){var t=n(e,2),l=t[0],o=t[1];return l>o}var n=function(){function e(e,t){var l=[],n=!0,o=!1,a=void 0;try{for(var i,r=e[Symbol.iterator]();!(n=(i=r.next()).done)&&(l.push(i.value),!t||l.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{!n&&r.return&&r.return()}finally{if(o)throw a}}return l}return function(t,l){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,l);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.gt=l,e.default=t.default.Helper.helper(l)}),define("todomvc/helpers/pluralize",["exports","ember","ember-inflector"],function(e,t,l){function n(e){var t=o(e,2),n=t[0],a=t[1];return 1===a?n:(0,l.pluralize)(n)}var o=function(){function e(e,t){var l=[],n=!0,o=!1,a=void 0;try{for(var i,r=e[Symbol.iterator]();!(n=(i=r.next()).done)&&(l.push(i.value),!t||l.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{!n&&r.return&&r.return()}finally{if(o)throw a}}return l}return function(t,l){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,l);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.pluralizeHelper=n,e.default=t.default.Helper.helper(n)}),define("todomvc/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){e.default=t.default}),define("todomvc/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","todomvc/config/environment"],function(e,t,l){var n=l.default.APP,o=n.name,a=n.version;e.default={name:"App Version",initialize:(0,t.default)(o,a)}}),define("todomvc/initializers/container-debug-adapter",["exports","ember-resolver/container-debug-adapter"],function(e,t){e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0];e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("todomvc/initializers/export-application-global",["exports","ember","todomvc/config/environment"],function(e,t,l){function n(){var e=arguments[1]||arguments[0];if(l.default.exportApplicationGlobal!==!1){var n;if("undefined"!=typeof window)n=window;else if("undefined"!=typeof global)n=global;else{if("undefined"==typeof self)return;n=self}var o,a=l.default.exportApplicationGlobal;o="string"==typeof a?a:t.default.String.classify(l.default.modulePrefix),n[o]||(n[o]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[o]}}))}}e.initialize=n,e.default={name:"export-application-global",initialize:n}}),define("todomvc/resolver",["exports","ember-resolver"],function(e,t){e.default=t.default}),define("todomvc/router",["exports","ember","todomvc/config/environment"],function(e,t,l){var n=t.default.Router.extend({location:l.default.locationType,rootURL:l.default.rootURL});n.map(function(){this.route("active"),this.route("completed")}),e.default=n}),define("todomvc/routes/application",["exports","ember"],function(e,t){e.default=t.default.Route.extend({repo:t.default.inject.service(),model:function(){return this.get("repo").findAll()}})}),define("todomvc/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("todomvc/services/repo",["exports","ember"],function(e,t){e.default=t.default.Service.extend({lastId:0,data:null,findAll:function(){return this.get("data")||this.set("data",JSON.parse(window.localStorage.getItem("todos")||"[]"))},add:function(e){var t=Object.assign({id:this.incrementProperty("lastId")},e);return this.get("data").pushObject(t),this.persist(),t},delete:function(e){this.get("data").removeObject(e),this.persist()},persist:function(){window.localStorage.setItem("todos",JSON.stringify(this.get("data")))}})}),define("todomvc/templates/active",["exports"],function(e){e.default=Ember.HTMLBars.template({id:null,block:'{"statements":[["append",["helper",["todo-list"],null,[["todos"],[["get",["todos"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"todomvc/templates/active.hbs"}})}),define("todomvc/templates/application",["exports"],function(e){e.default=Ember.HTMLBars.template({id:null,block:'{"statements":[["open-element","section",[]],["static-attr","id","todoapp"],["flush-element"],["text","\\n  "],["open-element","header",[]],["static-attr","id","header"],["flush-element"],["text","\\n    "],["open-element","h1",[]],["flush-element"],["text","todos"],["close-element"],["text","\\n    "],["open-element","input",[]],["static-attr","type","text"],["static-attr","id","new-todo"],["dynamic-attr","onkeydown",["helper",["action"],[["get",[null]],"createTodo"],null],null],["static-attr","placeholder","What needs to be done?"],["static-attr","autofocus",""],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n    "],["append",["unknown",["outlet"]],false],["text","\\n"],["block",["if"],[["helper",["gt"],[["get",["model","length"]],0],null]],null,4],["close-element"],["text","\\n"],["open-element","footer",[]],["static-attr","id","info"],["flush-element"],["text","\\n  "],["open-element","p",[]],["flush-element"],["text","Double-click to edit a todo"],["close-element"],["text","\\n  "],["open-element","p",[]],["flush-element"],["text","\\n    Created by\\n    "],["open-element","a",[]],["static-attr","href","http://github.com/cibernox"],["flush-element"],["text","Miguel Camba"],["close-element"],["text",",\\n    "],["open-element","a",[]],["static-attr","href","http://github.com/addyosmani"],["flush-element"],["text","Addy Osmani"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","p",[]],["flush-element"],["text","Part of "],["open-element","a",[]],["static-attr","href","http://todomvc.com"],["flush-element"],["text","TodoMVC"],["close-element"],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","button",[]],["static-attr","id","clear-completed"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"clearCompleted"],null],null],["flush-element"],["text","Clear completed"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","Completed"]],"locals":[]},{"statements":[["text","Active"]],"locals":[]},{"statements":[["text","All"]],"locals":[]},{"statements":[["text","      "],["open-element","footer",[]],["static-attr","id","footer"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","id","todo-count"],["flush-element"],["open-element","strong",[]],["flush-element"],["append",["unknown",["remaining","length"]],false],["close-element"],["text"," "],["append",["helper",["pluralize"],["item",["get",["remaining","length"]]],null],false],["text"," left"],["close-element"],["text","\\n        "],["open-element","ul",[]],["static-attr","id","filters"],["flush-element"],["text","\\n          "],["open-element","li",[]],["flush-element"],["block",["link-to"],["index"],[["activeClass"],["selected"]],3],["close-element"],["text","\\n          "],["open-element","li",[]],["flush-element"],["block",["link-to"],["active"],[["activeClass"],["selected"]],2],["close-element"],["text","\\n          "],["open-element","li",[]],["flush-element"],["block",["link-to"],["completed"],[["activeClass"],["selected"]],1],["close-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["completed","length"]]],null,0],["text","      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"todomvc/templates/application.hbs"}})}),define("todomvc/templates/completed",["exports"],function(e){e.default=Ember.HTMLBars.template({id:null,block:'{"statements":[["append",["helper",["todo-list"],null,[["todos"],[["get",["todos"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"todomvc/templates/completed.hbs"}})}),define("todomvc/templates/components/todo-item",["exports"],function(e){e.default=Ember.HTMLBars.template({id:null,block:'{"statements":[["open-element","div",[]],["static-attr","class","view"],["flush-element"],["text","\\n  "],["open-element","input",[]],["static-attr","type","checkbox"],["static-attr","class","toggle"],["dynamic-attr","checked",["unknown",["todo","completed"]],null],["dynamic-attr","onchange",["helper",["action"],[["get",[null]],"toggleCompleted"],null],null],["flush-element"],["close-element"],["text","\\n  "],["open-element","label",[]],["dynamic-attr","ondblclick",["helper",["action"],[["get",[null]],"startEditing"],null],null],["flush-element"],["append",["unknown",["todo","title"]],false],["close-element"],["text","\\n  "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"removeTodo"],null],null],["static-attr","class","destroy"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","input",[]],["static-attr","type","text"],["static-attr","class","edit"],["dynamic-attr","value",["unknown",["todo","title"]],null],["dynamic-attr","onblur",["helper",["action"],[["get",[null]],"doneEditing"],[["value"],["target.value"]]],null],["dynamic-attr","onkeydown",["helper",["action"],[["get",[null]],"handleKeydown"],null],null],["static-attr","autofocus",""],["flush-element"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"todomvc/templates/components/todo-item.hbs"}})}),define("todomvc/templates/components/todo-list",["exports"],function(e){e.default=Ember.HTMLBars.template({id:null,block:'{"statements":[["block",["if"],[["get",["todos","length"]]],null,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["todo-item"],null,[["todo","onStartEdit","onEndEdit"],[["get",["todo"]],["helper",["action"],[["get",[null]],"disableToggle"],null],["helper",["action"],[["get",[null]],"enableToggle"],null]]]],false],["text","\\n"]],"locals":["todo"]},{"statements":[["text","    "],["open-element","input",[]],["static-attr","type","checkbox"],["static-attr","id","toggle-all"],["dynamic-attr","checked",["unknown",["allCompleted"]],null],["dynamic-attr","onchange",["helper",["action"],[["get",[null]],"toggleAll"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["canToggle"]]],null,1],["text","  "],["open-element","ul",[]],["static-attr","id","todo-list"],["static-attr","class","todo-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["todos"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"todomvc/templates/components/todo-list.hbs"}})}),define("todomvc/templates/index",["exports"],function(e){e.default=Ember.HTMLBars.template({id:null,block:'{"statements":[["block",["if"],[["get",["model","length"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["todo-list"],null,[["todos"],[["get",["model"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"todomvc/templates/index.hbs"}})}),define("todomvc/config/environment",["ember"],function(e){var t="todomvc";try{var l=t+"/config/environment",n=document.querySelector('meta[name="'+l+'"]').getAttribute("content"),o=JSON.parse(unescape(n)),a={default:o};return Object.defineProperty(a,"__esModule",{value:!0}),a}catch(e){throw new Error('Could not read config from meta tag with name "'+l+'".')}}),runningTests||require("todomvc/app").default.create({name:"todomvc",version:"0.0.0+8e34dca5"});