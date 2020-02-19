const containerMouseEnter=e=>{Array.from(document.getElementsByClassName("vg-img")).forEach(t=>{Object.assign(t.style,{opacity:e.opacity,transform:`scale(${e.scale})`,borderRadius:e.radius,flex:1})})},containerMouseLeave=e=>{let t=Array.from(document.getElementsByClassName("vg-img")),a=Array.from(document.getElementsByClassName("text-button-container"));t.forEach(e=>{Object.assign(e.style,{opacity:1,transform:"scale(1)",borderRadius:0})}),void 0!==e.featuredImage&&(t[e.featuredImage].style.flex=e.featuredWidth,a[e.featuredImage].style.opacity=1)},setContainerStylesAndEvents=(e,t)=>{Object.assign(e.style,{width:t.galleryWidth,height:t.galleryHeight,display:"flex"}),e.onmouseenter=()=>containerMouseEnter(t),e.onmouseleave=()=>containerMouseLeave(t)},imageMouseEnter=(e,t,a)=>{let n=Array.from(document.getElementsByClassName("text-button-container"));setTimeout(()=>{n.forEach(e=>{e.style.opacity=0}),Object.assign(e.style,{opacity:1,transform:"scale(1)",flex:t.featuredWidth}),void 0!==n[a]&&(n[a].style.opacity=1)},0),!0===t.shadow&&(e.style.boxShadow="0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.44)")},imageMouseLeave=(e,t,a)=>{let n=Array.from(document.getElementsByClassName("text-button-container"));Object.assign(e.style,{boxShadow:"none",transform:`scale(${t.scale})`,flex:1}),void 0!==n[a]&&(n[a].style.opacity=0)},createTextButtonContainer=(e,t)=>{const a=document.createElement("div");return a.classList.add("text-button-container"),Object.assign(a.style,{display:"flex",flexDirection:"column",alignItems:"center",maxWidth:"80%",backgroundColor:e.captionBkgColor,margin:"5%",padding:"5%",borderRadius:e.radius,opacity:e.featuredImage===t?1:0,transition:`${e.speed}ms cubic-bezier(.25, .8, .25, 1)`}),a},createTextElement=(e,t)=>{const a=document.createElement("p");return a.style.wordWrap="break-word",a.innerHTML=e.images[t].caption,a},createButton=(e,t)=>{const a=document.createElement("a");a.href=e.images[t].buttonLink,!0===e.linksInNewTab&&(a.target="_blank");const n=document.createElement("button");return n.innerHTML=e.images[t].buttonText,a.appendChild(n),a},createGalleryContents=(e,t)=>{t.images.forEach((a,n)=>{const o=document.createElement("div");o.classList.add("vg-img"),Object.assign(o.style,{display:"flex",justifyContent:"center",alignItems:"top"===t.captionPosition?"flex-start":"middle"===t.captionPosition?"center":"flex-end",backgroundImage:`url('${a.image}')`,backgroundPosition:"center",backgroundSize:"auto 100%",backgroundRepeat:"no-repeat",overflow:"hidden",flex:t.featuredImage===n?t.featuredWidth:1,transition:`${t.speed}ms cubic-bezier(.25, .8, .25, 1)`}),o.onmouseenter=()=>imageMouseEnter(o,t,n),o.onmouseleave=()=>imageMouseLeave(o,t,n);const i=createTextButtonContainer(t,n),s=createTextElement(t,n),r=createButton(t,n);"string"==typeof t.images[n].caption&&i.appendChild(s),"string"==typeof t.images[n].buttonText&&i.appendChild(r),void 0===t.images[n].caption&&void 0===t.images[n].buttonText&&(i.style.display="none"),o.appendChild(i),e.appendChild(o)})},undefinedUserOptions=(e,t)=>{Object.keys(e).forEach(a=>{void 0===t[a]&&(t[a]=e[a])})},applyMediaQueries=e=>{let t=e.media[Math.min(...Object.keys(e.media).filter(e=>window.matchMedia(`(max-width: ${e}px)`).matches))];Array.from(document.getElementsByClassName("vg-img")).forEach((e,a)=>{e.style.display=void 0===t?"flex":t.includes(a)?"none":"flex"})},buildGallery=e=>{const t=document.getElementById("vg-container"),a={images:[{image:"",caption:"",buttonText:"",buttonLink:""}],linksInNewTab:!0,captionPosition:"bottom",captionBkgColor:"rgba(255,255,255,0.75)",featuredImage:void 0,featuredWidth:5,media:{320:[0,1,2,3],425:[0,1,2],768:[5,6]},galleryWidth:"100%",galleryHeight:"100vh",opacity:.25,shadow:!0,speed:300,radius:0,scale:1};undefinedUserOptions(a,e=e||a),setContainerStylesAndEvents(t,e),createGalleryContents(t,e),applyMediaQueries(e),window.onresize=()=>{applyMediaQueries(e)}};export{buildGallery};