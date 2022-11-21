import{r as s,a as U,w as q,l as k,o as D,b as P,e,u as c,t as S,f as H,h as t,v as a,i as J,j as W,k as Y,q as $,m as G,s as K,p as Q}from"./entry.1765734b.mjs";const X={class:"container mt-5 mb-5"},ee={key:0,class:"row"},se={class:"offset-lg-3 col-lg-6 d-flex flex-column align-items-center"},te=e("h1",{class:"mt-3 mb-3"},"\u30E6\u30FC\u30B6\u30FC\u767B\u9332\u3092\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002",-1),ae={key:1,class:"row"},oe={class:"offset-lg-3 col-lg-6"},le=e("h1",{class:"mt-3 mb-3"},"\u767B\u9332",-1),ne=["onSubmit"],ie={class:"mb-3"},de=e("label",{class:"form-label",for:"id"},"ID",-1),ce=["value"],re=e("div",{class:"form-text"},"\u534A\u89D2\u82F1\u6570\u5B57\u3068\u8A18\u53F7(><-_.@)\u3067ID\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u4ED6\u306E\u30E6\u30FC\u30B6\u30FC\u304C\u4F7F\u7528\u3057\u3066\u3044\u308BID\u306F\u4F7F\u7528\u3067\u304D\u307E\u305B\u3093",-1),ue={class:"form-text text-danger"},ve={class:"form-text text-danger"},_e={class:"form-text text-success"},me={class:"form-text"},he={class:"mb-3"},fe=e("label",{class:"form-label",for:"emailAddress"},"\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",-1),pe=["value"],ge=e("div",{class:"form-text"},"\u767B\u9332\u3059\u308B\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",-1),be={class:"form-text text-danger"},xe={class:"mb-3"},we=e("label",{class:"form-label",for:"family_name"},"\u82D7\u5B57",-1),ye=["value"],Ie=e("div",{class:"form-text"},"\u81EA\u5206\u306E\u82D7\u5B57\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",-1),Ae={class:"form-text text-danger"},Ce={class:"mb-3"},ke=e("label",{class:"form-label",for:"first_name"},"\u540D\u524D",-1),De=["value"],Pe=e("div",{class:"form-text"},"\u81EA\u5206\u306E\u540D\u524D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",-1),$e={class:"form-text text-danger"},Ne={class:"mb-3"},Oe=e("label",{class:"form-label",for:"password"},"\u30D1\u30B9\u30EF\u30FC\u30C9",-1),Te=["value"],Se=e("div",{class:"form-text"},"\u534A\u89D2\u82F1\u6570\u5B57\u3068\u8A18\u53F7(><-_.@)\u304B\u30648\u6587\u5B57\u4EE5\u4E0A\u3067\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",-1),ze={class:"form-text text-danger"},Fe={class:"mb-3"},Ve=e("label",{class:"form-label",for:"copyPassword"},"\u78BA\u8A8D\u7528\u30D1\u30B9\u30EF\u30FC\u30C9",-1),Ze=e("div",{class:"form-text"},"\u5148\u307B\u3069\u5165\u529B\u3057\u305F\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u540C\u3058\u3082\u306E\u3092\u5165\u308C\u3066\u304F\u3060\u3055\u3044\u3002",-1),Be={class:"form-text text-danger"},Ee={class:"btn btn-primary",type:"submit"},Le={class:"spinner-border spinner-border-sm"},Re=Q("\u30ED\u30B0\u30A4\u30F3\u3059\u308B\u5834\u5408\u306F\u3053\u3061\u3089"),Ue={__name:"register",async setup(Me){let h,N;const i=s(""),f=s(""),n=s(""),p=s(""),g=s(""),b=s(""),d=s(!0),r=s(!0),u=s(!0),v=s(!0),_=s(!0),y=s(!1),z=U(),{data:m,pending:I}=([h,N]=q(()=>k("register",()=>$fetch("/api/auth/register",{method:"POST",body:{id:i.value,emailAddress:f.value,family_name:g.value,first_name:b.value,password:n.value}}),"$nn83MlJ887")),h=await h,N(),h),{data:F}=k("login",()=>$fetch("/api/auth/login",{method:"POST",body:{id:i.value,password:n.value}}),{immediate:!1},"$3RBYHVwdRj"),{data:V,pending:x}=k("CheckId",()=>$fetch("/api/auth/CheckId",{method:"POST",body:{id:i.value}}),{immediate:!1},"$h8bcc59ZlB"),A=100;let w=A;const O=s(!0);let C=!1;const Z=async o=>{if(O.value=!1,d.value=!1,i.value=o.target.value,x.value=!0,C)w=A;else{for(;w!=0;)C=!0,await new Promise(l=>{setTimeout(()=>{w--,l()},10)});w=A,C=!1,await $("CheckId"),d.value=V.value&&i.value.length<100}},B=o=>{const l=/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/;f.value=o.target.value,r.value=l.test(f.value)},E=o=>{b.value=o.target.value,_.value=b.value!=""},L=o=>{g.value=o.target.value,v.value=g.value!=""},R=o=>{n.value=o.target.value;const l=/^[A-Za-z0-9_@\.\-<>]+$/;u.value=n.value.length>=8&&l.test(n.value)},M=async()=>{d.value&&r.value&&u.value&&v.value&&_.value&&n.value==p.value&&(await $("register"),d.value=m.value.hasId,v.value=m.value.hasFamily_name,_.value=m.value.hasFirst_name,u.value=m.value.hasPassword,r.value=m.value.hasEmailAddress,d.value&&u.value&&r.value&&v.value&&_.value&&(y.value=!0,await $("login"),z.Login(F.value.id)))};return(o,l)=>{const j=G;return D(),P("div",X,[y.value?(D(),P("div",ee,[e("div",se,[te,e("button",{class:"btn btn-primary btn-lg",onClick:l[0]||(l[0]=T=>c(K)("/student",{replace:!0}))},"\u30DB\u30FC\u30E0\u753B\u9762\u306B\u884C\u304F")])])):S("",!0),y.value?S("",!0):(D(),P("div",ae,[e("div",oe,[le,e("form",{class:"border border-2 rounded p-3",onSubmit:H(M,["prevent"])},[e("div",ie,[de,e("input",{class:"form-control",id:"id",value:i.value,onInput:Z},null,40,ce),re,t(e("div",ue,"100\u6587\u5B57\u4EE5\u4E0A\u306F\u4F7F\u3048\u307E\u305B\u3093",512),[[a,i.value.length>=100]]),t(e("div",ve,"\u3053\u306EID\u306F\u4F7F\u7528\u3067\u304D\u307E\u305B\u3093\u3002",512),[[a,!d.value&&!c(x)]]),t(e("div",_e,"\u3053\u306EID\u306F\u4F7F\u7528\u3067\u304D\u307E\u3059\u3002",512),[[a,!O.value&&d.value&&!c(x)]]),t(e("div",me,"\u691C\u8A3C\u4E2D",512),[[a,c(x)]])]),e("div",he,[fe,e("input",{class:"form-control",type:"text",id:"emailAddress",value:f.value,onInput:B},null,40,pe),ge,t(e("div",be,"\u6B63\u3057\u3044\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u3044\u308C\u3066\u304F\u3060\u3055\u3044\u3002",512),[[a,!r.value]])]),e("div",xe,[we,e("input",{class:"form-control",id:"family_name",value:g.value,onInput:L},null,40,ye),Ie,t(e("div",Ae,"\u82D7\u5B57\u304C\u7A7A\u6B04\u3067\u3059\u3002",512),[[a,!v.value]])]),e("div",Ce,[ke,e("input",{class:"form-control",id:"first_name",value:b.value,onInput:E},null,40,De),Pe,t(e("div",$e,"\u540D\u524D\u304C\u7A7A\u6B04\u3067\u3059\u3002",512),[[a,!_.value]])]),e("div",Ne,[Oe,e("input",{class:"form-control",id:"password",type:"password",value:n.value,onInput:R},null,40,Te),Se,t(e("div",ze,"\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\uFF18\u6587\u5B57\u4EE5\u4E0A\u3067\u306F\u306A\u3044\u304B\u3001\u5229\u7528\u3067\u304D\u306A\u3044\u6587\u5B57\u304C\u542B\u307E\u308C\u307E\u3059\u3002",512),[[a,!u.value]])]),e("div",Fe,[Ve,t(e("input",{class:"form-control",id:"copyPassword",type:"password","onUpdate:modelValue":l[1]||(l[1]=T=>p.value=T)},null,512),[[J,p.value]]),Ze,t(e("div",Be,"\u540C\u4E00\u306A\u30D1\u30B9\u30EF\u30FC\u30C9\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002",512),[[a,n.value!=p.value]])]),e("button",Ee,[t(e("span",Le,null,512),[[a,c(I)]]),t(e("span",null," Loading...",512),[[a,c(I)]]),t(e("span",null,"\u767B\u9332",512),[[a,!c(I)]])])],40,ne),W(j,{to:"/auth/login"},{default:Y(()=>[Re]),_:1})])]))])}}};export{Ue as default};