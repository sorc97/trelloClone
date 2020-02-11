!function(e){function t(t){for(var r,i,c=t[0],l=t[1],s=t[2],d=0,f=[];d<c.length;d++)i=c[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(u&&u(t);f.length;)f.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,c=1;c<n.length;c++){var l=n[c];0!==a[l]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={0:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/trelloClone/";var c=window.webpackJsonp=window.webpackJsonp||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var s=0;s<c.length;s++)t(c[s]);var u=l;o.push([43,1]),n()}({26:function(e,t,n){},27:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(17),i=n(2),c=(n(26),function(e){var t=e.handleAdding,n=e.placeholder,o=e.className,i=e.buttonText,c=Object(r.useRef)(null),l=Object(r.useState)(""),s=l[0],u=l[1];return a.a.createElement("form",{className:o,onSubmit:function(e){e.preventDefault(),t(s),u(""),c.current.focus()}},a.a.createElement("input",{type:"text",placeholder:n,value:s,ref:c,onChange:function(e){var t=e.target;u(t.value)},required:!0}),a.a.createElement("input",{type:"submit",value:i}))});c.defaultProps={handleAdding:function(){},placeholder:"Input field",className:"add-form",buttonText:"Add"};var l=c,s=n(8),u=(n(27),function(e){var t=e.boards,n=void 0===t?[]:t,r=e.onRemove,o=void 0===r?function(e){return e}:r;return n.length?a.a.createElement("ul",{className:"boards-list"},n.map((function(e){return a.a.createElement("li",{className:"boards-item",key:e.id},a.a.createElement(s.b,{to:"/board/"+e.id},a.a.createElement("span",{className:"boards-name"},e.title)),a.a.createElement("button",{className:"boards-remove",onClick:function(){return o(e.id)}},"×"))}))):a.a.createElement("p",{className:"boards-empty empty"},"No boards")}),d={title:"Initial board",id:Object(i.v4)(),date:new Date,todos:{1:{title:"Plans",id:"1",tasks:[{title:"Create REST API",id:Object(i.v4)()},{title:"Connect API and MongoDB",id:Object(i.v4)()},{title:"Connect Back-end and Front-end",id:Object(i.v4)()},{title:"Deploy porject on the hosting",id:Object(i.v4)()}]},2:{title:"In Process",id:"2",tasks:[{title:"Create and style React Components",id:Object(i.v4)()}]},3:{title:"Done",id:"3",tasks:[{title:"Layout design",id:Object(i.v4)()},{title:"Create Webpack config",id:Object(i.v4)()},{title:"Install necessary npm packages",id:Object(i.v4)()},{title:"Choose state managment approach",id:Object(i.v4)()}]}}},f=Object(r.createContext)(null),m=localStorage["trello-store"]?JSON.parse(localStorage["trello-store"]):[d],p=function(e){var t=e.children,n=Object(r.useState)(m),o=n[0],i=n[1];return Object(r.useEffect)((function(){localStorage.setItem("trello-store",JSON.stringify(o))}),[o]),a.a.createElement(f.Provider,{value:[o,i]},t)},v=(n(33),function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),a=0;for(t=0;t<n;t++)for(var o=arguments[t],i=0,c=o.length;i<c;i++,a++)r[a]=o[i];return r}),g=function(){var e=Object(r.useContext)(f),t=e[0],n=e[1];return a.a.createElement("main",{className:"boards"},a.a.createElement(l,{handleAdding:function(e){var t={title:e,id:Object(i.v4)(),date:new Date,todos:{}};n((function(e){return v(e,[t])}))},placeholder:"New board name",buttonText:"+",className:"add-form"}),a.a.createElement(u,{boards:t,onRemove:function(e){var r=t.filter((function(t){return t.id!==e}));n(r)}}))},h=function(e){var t=e.id,n=e.children,r=e.className,o=e.handleDrop;return a.a.createElement("div",{id:t,onDragEnter:function(e){e.preventDefault(),e.currentTarget.classList.add("underDrag")},onDragLeave:function(e){e.currentTarget.classList.remove("underDrag")},onDrop:function(e){e.preventDefault();var t=e.dataTransfer.getData("id");o(t),document.querySelectorAll("."+r).forEach((function(e){return e.classList.remove("underDrag")}))},onDragOver:function(e){e.preventDefault()},className:r},n)};h.defaultProps={id:"",handleDrop:function(){}};var b=h,E=null,k=function(e){var t=e.id,n=e.children,r=e.className,o=e.handleDrag,i=e.handleDrop;return a.a.createElement("div",{id:t,draggable:"true",onDragStart:function(e){E=e.target,e.dataTransfer.setData("id",E.id),o(),E.classList.add("dragged")},onDragEnd:function(e){E.classList.remove("dragged"),E=null,document.querySelectorAll("."+r).forEach((function(e){return e.classList.remove("underDrag")}))},onDragOver:function(e){e.preventDefault(),e.stopPropagation(),e.currentTarget},onDragEnter:function(e){e.preventDefault(),e.stopPropagation();var t=e.currentTarget;t!==E&&t.classList.add("underDrag")},onDragLeave:function(e){e.stopPropagation();var t=e.currentTarget;t!==E&&t.classList.remove("underDrag")},onDrop:function(e){e.preventDefault(),e.stopPropagation();var t=e.currentTarget,n=e.dataTransfer.getData("id");t!==E&&(i(n,t.id),document.querySelectorAll(".draggable-wrapper").forEach((function(e){return e.classList.remove("underDrag")})))},className:r},n)};k.defaultProps={id:"",handleDrag:function(){},handleDrop:function(){}};var y,D=k,T=(y=function(e,t){return(y=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}y(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),O=function(){return(O=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},N=function(e){return function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.startEditing=function(e){var t=e.target,n=t.parentElement;n.hasAttribute("draggable")&&n.setAttribute("draggable","false"),t.setAttribute("contenteditable","true"),t.classList.add("editing"),t.focus(),t.addEventListener("keydown",(function(e){"Enter"===e.code&&(e.preventDefault(),t.blur())}))},e.endEditing=function(e,t){var n=e.target,r=n.textContent,a=n.parentElement;""!==r?(a.hasAttribute("draggable")&&a.setAttribute("draggable","true"),t(r),n.removeAttribute("contenteditable"),n.classList.remove("editing")):n.focus()},e}return T(n,t),n.prototype.render=function(){var t=this;return a.a.createElement(e,O({onStartEdit:this.startEditing,onEndEdit:function(e){return t.endEditing(e,t.props.handleEditingEnd)}},this.props))},n}(a.a.Component)},j=function(e){var t=e.title,n=e.onStartEdit,r=e.onEndEdit,o=e.className;return a.a.createElement("li",{onDoubleClick:n,onBlur:r,className:o},t)};j.defaultProps={title:"",onStartEdit:function(){},onEndEdit:function(){}};var w=N(j),P=(n(34),function(e){var t=e.title,n=e.id,r=e.handleDrag,o=e.handleDrop,i=e.onEditTask;return a.a.createElement(D,{id:n,className:"draggable-wrapper",handleDrag:r,handleDrop:o},a.a.createElement(w,{title:t,className:"tasks-item",handleEditingEnd:function(e){return i(e,n)}}))});P.defaultProps={title:"Unknown",id:"",handleDrag:function(){},handleDrop:function(){},onEditTask:function(){}};var x=P,S=(n(35),function(e){var t=e.onClose,n=e.handleSubmit,o=e.placeholder,i=e.submitText,c=e.cancelText,l=e.minRows,s=Object(r.useState)(""),u=s[0],d=s[1],f=Object(r.useRef)(null),m=function(e){e.target.closest(".composer")||t()};Object(r.useEffect)((function(){return window.addEventListener("mousedown",m),function(){window.removeEventListener("mousedown",m)}}),[]);var p=function(e){e.style.height="auto",e.style.height=e.scrollHeight+(e.offsetHeight-e.clientHeight)+"px"},v=function(){""!==u?(n(u),f.current.focus(),f.current.style.height="auto",d("")):f.current.focus()};return a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),v()},className:"composer"},a.a.createElement("textarea",{autoFocus:!0,rows:l,ref:f,value:u,onChange:function(e){var t=e.target;d(t.value),p(t)},className:"composer-text",placeholder:o,onKeyDown:function(e){"Enter"===e.key&&(v(),e.preventDefault())}}),a.a.createElement("div",{className:"composer-btnWrapper"},a.a.createElement("button",{type:"submit",className:"composer-submit"},i),a.a.createElement("button",{className:"composer-cancel",onClick:t,type:"button"},c)))});S.defaultProps={submitText:"Submit",cancelText:"X",placeholder:"Enter the text",minRows:3,handleSubmit:function(){},onClose:function(){}};var C=S,A=(n(36),function(){return(A=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)}),R=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),a=0;for(t=0;t<n;t++)for(var o=arguments[t],i=0,c=o.length;i<c;i++,a++)r[a]=o[i];return r},L=function(e){var t=e.tasks,n=e.handleDrag,o=e.handleDrop,c=e.setNewTasks,l=e.isAdding,s=e.toggleAdding,u=Object(r.useRef)(null);Object(r.useEffect)((function(){var e;l&&t.length&&(e=u.current).scrollHeight-e.clientHeight&&(e.scrollTop=e.scrollHeight)}),[t,l]);return a.a.createElement("ul",{className:"tasks-list",ref:u},t.map((function(e){return a.a.createElement(x,A({key:e.id},e,{handleDrag:n,handleDrop:o,onEditTask:function(n){return function(e,n){var r=t.map((function(t){return t.id===n&&(t.title=e),t}));c(r)}(n,e.id)}}))})),l&&a.a.createElement(C,{submitText:"Add new Task",cancelText:"X",placeholder:"Enter task",onClose:s,handleSubmit:function(e){var n=Object(i.v4)(),r=R(t,[{title:e,id:n}]);c(r)}}))};L.defaultProps={tasks:[],isAdding:!1,handleDrag:function(){},handleDrop:function(){},setNewTasks:function(){},toggleAdding:function(){}};var _=L,B=function(e){var t=e.className,n=e.text,r=e.handleClick;return a.a.createElement("button",{className:t,onClick:r},n)};B.defaultProps={text:"Submit",handleClick:function(){}};var F=B,I=function(e){var t=e.title,n=e.className,r=e.captionRole,o=e.onStartEdit,i=e.onEndEdit;return"main"===r?a.a.createElement("h1",{className:n,onClick:o,onBlur:i},t):a.a.createElement("h2",{className:n,onClick:o,onBlur:i},t)};I.defaultProps={title:"Unknown",captionRole:"main",onStartEdit:function(){},onEndEdit:function(){}};var H=N(I),M=Object(r.createContext)(null),q=(n(37),function(e){var t=e.title,n=e.id,o=e.tasks,i=e.handleDrop,c=e.onEditTodoTitle,l=e.setNewTasks,s=e.onRemoveTodo,u=Object(r.useContext)(M).setDragFromTodo,d=Object(r.useState)(!1),f=d[0],m=d[1],p=function(){m(!f)};return a.a.createElement("li",{className:"todos-item"},a.a.createElement("div",{className:"tasks-header"},a.a.createElement(H,{handleEditingEnd:c,className:"tasks-caption",title:t,captionRole:"secondary"}),a.a.createElement("button",{onClick:s,className:"tasks-removeTodo"},"×")),a.a.createElement(b,{id:n,handleDrop:i,className:"droppable-wrapper"},a.a.createElement(_,{tasks:o,handleDrag:function(){return u(n)},handleDrop:i,setNewTasks:l,isAdding:f,toggleAdding:p})),!f&&a.a.createElement(F,{className:"tasks-addButton",text:"+ Add new task",handleClick:p}))});q.defaultProps={title:"unknown",id:"",tasks:[],onRemoveTodo:function(){},handleDrop:function(){},onEditTodoTitle:function(){},setNewTasks:function(){}};var J=q,U=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),a=0;for(t=0;t<n;t++)for(var o=arguments[t],i=0,c=o.length;i<c;i++,a++)r[a]=o[i];return r},W=function(e,t){return t.filter((function(t){return t.id===e}))[0]},X=(n(38),function(){return(X=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)}),K=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),a=0;for(t=0;t<n;t++)for(var o=arguments[t],i=0,c=o.length;i<c;i++,a++)r[a]=o[i];return r},z=function(e){var t=e.setNewTodos,n=e.currentTodos,r=e.dragFromTodo,o=Object.values(n),i=function(e,a,o){var i,c,l=r;if(o||l!==a){var s=X({},n[l]),u=X({},n[a]),d=W(e,s.tasks);if(o){var f=u.tasks,m=W(o,f),p=f.indexOf(m);l===a&&(f=f.filter((function(t){return t.id!==e})));var v=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];return U(e.slice(0,t),n,e.slice(t))}(f,p,d);if(u.tasks=v,l===a){var g=X(X({},n),((i={})[a]=u,i));return void t(g)}}else u.tasks=K(u.tasks,[d]);s.tasks=s.tasks.filter((function(t){return t.id!==e}));var h=X(X({},n),((c={})[a]=u,c[l]=s,c));t(h)}};return a.a.createElement("section",{className:"todos-section"},o.length?a.a.createElement("ul",{className:"todos-list"},o.map((function(e){return a.a.createElement(J,X({key:e.id},e,{handleDrop:function(t,n){return i(t,e.id,n)},onEditTodoTitle:function(r){return function(e,r){var a,o=X({},n[r]);o.title=e;var i=X(X({},n),((a={})[r]=o,a));t(i)}(r,e.id)},setNewTasks:function(r){return function(e,r){var a,o=X({},n[e]);o.tasks=r;var i=X(X({},n),((a={})[e]=o,a));t(i)}(e.id,r)},onRemoveTodo:function(){return r=e.id,delete(a=X({},n))[r],void t(a);var r,a}}))}))):a.a.createElement("p",{className:"todos-empty empty"},"No todos"))};z.defaultProps={currentTodos:{},setNewTodos:function(){},dragFromTodo:""};var G=z,Q=(n(39),function(e){var t=e.basketText,n=void 0===t?"Remove area":t,r=e.onRemove,o=void 0===r?function(e){return e}:r;return a.a.createElement(b,{id:"basket",className:"basket",handleDrop:o},a.a.createElement(a.a.Fragment,null,n))}),V=(n(40),function(e){var t=e.currentBoardTitle,n=e.editBoard,r=e.addNewTodo,o=e.removeTask;return a.a.createElement("section",{className:"todos-header"},a.a.createElement(H,{title:t,captionRole:"main",className:"todos-boardCaption",handleEditingEnd:n}),a.a.createElement(l,{placeholder:"Add new Todo",handleAdding:r,className:"add-form"}),a.a.createElement(Q,{onRemove:o,basketText:"Drop task here to remove"}))});V.defaultProps={currentBoardTitle:"Unknown",editBoard:function(){},addNewTodo:function(){},removeTask:function(){}};var Y=V,Z=(n(41),function(){return(Z=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)}),$=function(e){var t=e.match,n=void 0===t?{}:t,o=Object(r.useContext)(f),c=o[0],l=o[1],s=Object(r.useState)(""),u=s[0],d=s[1],m=n.params.id,p=W(m,c),v=Z({},p.todos),g=function(e){var t=c.map((function(t){return t.id===m&&(t.todos=e),t}));l(t)};return a.a.createElement(M.Provider,{value:{setDragFromTodo:function(e){d(e)}}},a.a.createElement("main",{className:"todos"},a.a.createElement(Y,{currentBoardTitle:p.title,editBoard:function(e){var t=c.map((function(t){return t.id===m&&(t.title=e),t}));l(t)},addNewTodo:function(e){var t,n=Object(i.v4)(),r=Z(Z({},v),((t={})[n]={title:e,id:n,tasks:[]},t));g(r)},removeTask:function(e){return function(e,t){var n,r=Z({},v[t]);r.tasks=r.tasks.filter((function(t){return t.id!==e}));var a=Z(Z({},v),((n={})[t]=r,n));g(a)}(e,u)}}),a.a.createElement(G,{currentTodos:v,setNewTodos:g,dragFromTodo:u})))},ee=n(6),te=(n(42),function(){return a.a.createElement(p,null,a.a.createElement(ee.c,null,a.a.createElement(ee.a,{exact:!0,path:"/",component:g}),a.a.createElement(ee.a,{path:"/board/:id",component:$})))});Object(o.render)(a.a.createElement(s.a,null,a.a.createElement(te,null)),document.getElementById("react-container"))}});