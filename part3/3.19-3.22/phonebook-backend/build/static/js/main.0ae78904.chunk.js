(this["webpackJsonpphonebook-with-json-server"]=this["webpackJsonpphonebook-with-json-server"]||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var c=n(0),o=n(2),r=n(15),a=n.n(r),u=(n(21),n(4)),i=n(3);n.p,n(22);function s(e){var t=e.name,n=e.number,o=e.deleteContact,r=e.id;return Object(c.jsxs)("div",{children:[Object(c.jsxs)("p",{children:[" ",t," : ",n," "]}),Object(c.jsx)("button",{onClick:function(){return o(r)},children:" Delete contact "})]})}var f=n(5),d=n.n(f),j="/api/persons",b=function(e){return d.a.delete("".concat(j,"/").concat(e)).then((function(e){return e.data}))},l=function(){return d.a.get(j).then((function(e){return e.data}))},h=function(e,t){return d.a.put("".concat(j,"/").concat(e),t).then((function(e){return e.data}))},m=function(e){return d.a.post(j,e).then((function(e){return e.data}))};function p(e){var t=e.message,n=e.error;return t?Object(c.jsx)("div",{className:n?"errorMessage":"correctMessage",children:t}):Object(c.jsx)(c.Fragment,{children:" "})}var O=function(){var e=Object(o.useState)([]),t=Object(i.a)(e,2),n=t[0],r=t[1],a=Object(o.useState)({name:"",number:""}),f=Object(i.a)(a,2),d=f[0],j=f[1],O=Object(o.useState)(""),v=Object(i.a)(O,2),g=v[0],x=v[1],C=Object(o.useState)(""),w=Object(i.a)(C,2),y=w[0],T=w[1],k=Object(o.useState)(!1),F=Object(i.a)(k,2),S=F[0],D=F[1];Object(o.useEffect)((function(){l().then((function(e){return r(e)}))}),[]);var L=function(e){b(e).then((function(e){return e})).catch((function(e){D(!0),T("The note that you're looking to delete ,has already been deleted "),setTimeout((function(){D(!1),T("")}),5e3)})),r(n.filter((function(t){return t.id!==e})))},A=n.filter((function(e){return e.name.toLowerCase().includes(g.toLowerCase())}));return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)(p,{message:y,error:S}),Object(c.jsx)("hr",{}),Object(c.jsxs)("div",{children:["Filter People based on names : ",Object(c.jsx)("input",{type:"text",placeholder:"name to search",value:g,onChange:function(e){return x(e.target.value)}})]}),Object(c.jsx)("hr",{}),Object(c.jsxs)("form",{children:[Object(c.jsx)("input",{type:"text",placeholder:"name",value:d.name,onChange:function(e){j(Object(u.a)(Object(u.a)({},d),{},{name:e.target.value}))}}),Object(c.jsx)("input",{type:"text",placeholder:"number",value:d.number,onChange:function(e){j(Object(u.a)(Object(u.a)({},d),{},{number:e.target.value}))}}),Object(c.jsx)("button",{type:"submit",onClick:function(e){if(e.preventDefault(),n.some((function(e){return e.name===d.name})))if(window.confirm("The name of the contact is already present . Do you want to modify this contact ?")){var t=n.find((function(e){return e.name===d.name})).id;h(t,d).then((function(e){r(n.map((function(e){return e.id===t?d:e}))),T("Contact Updated"),D(!1),setTimeout((function(){T("")}),5e3)})).catch((function(e){var t=e.response.data.error;console.log("The error message is ",t),T(t),D(!0),setTimeout((function(){T("")}),5e3)}))}else alert("You chose not to update the contact , Fine !!");else m(d).then((function(e){r(n.concat(e)),T("Contact ".concat(e.name," Added ")),D(!1),setTimeout((function(){T("")}),5e3)})).catch((function(e){var t=e.response.data.error;T(t),D(!0),setTimeout((function(){T("")}),5e3)})),j({name:"",number:""})},children:" Add New Contact  "})]}),A.map((function(e){return Object(c.jsx)(s,Object(u.a)({deleteContact:L},e),e.id)}))]})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,41)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),c(e),o(e),r(e),a(e)}))};a.a.render(Object(c.jsx)(O,{}),document.getElementById("root")),v()}},[[40,1,2]]]);
//# sourceMappingURL=main.0ae78904.chunk.js.map