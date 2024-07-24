import{f as z,r as o,d as A,j as e,L as R}from"./index-C4qijYKD.js";import{B as l}from"./react-toastify.esm-BahYd6mB.js";import{b as q,g as J,u as K,h as O}from"./productSlice-B_do_W5p.js";import{u as T}from"./categorySlice-YaKL1Zx5.js";import{u as V}from"./brandSlice-JKhWF79c.js";const te=()=>{const{id:$}=z(),{data:t,isLoading:F}=q($);console.log(t);const[_,{isLoading:W}]=J(),[c,u]=o.useState(""),[i,g]=o.useState(""),[d,h]=o.useState(""),[f,y]=o.useState(""),[j,b]=o.useState(""),[w,v]=o.useState(0),[N,D]=o.useState(""),[k,E]=o.useState(""),[C,I]=o.useState(""),[S,B]=o.useState(""),[m]=K(),[L]=O(),{data:x}=T(),{data:p}=V(),P=A(),U=async(a,r)=>{const n=new FormData;n.append("image",a.target.files[0]);try{const s=await m(n).unwrap();u(s.image),l.success(s.message)}catch(s){l.error(s.data.message||s.error)}};o.useEffect(()=>{u(t==null?void 0:t.mainImage),g(t==null?void 0:t.sideImage1),h(t==null?void 0:t.sideImage2),D(t==null?void 0:t.name),b(t==null?void 0:t.discount),v(t==null?void 0:t.countInStock),E(t==null?void 0:t.price),B(t==null?void 0:t.brand),I(t==null?void 0:t.category),y(t==null?void 0:t.description)},[t]);const H=async(a,r)=>{const n=new FormData;n.append("image",a.target.files[0]);try{const s=await m(n).unwrap();g(s.image),l.success(s.message)}catch(s){l.error(s.data.message||s.error)}},M=async(a,r)=>{const n=new FormData;n.append("image",a.target.files[0]);try{const s=await m(n).unwrap();h(s.image),l.success(s.message)}catch(s){l.error(s.data.message||s.error)}},G=async()=>{try{const a=await L(t._id).unwrap();a.error?l.error(a.error):(l.success(`${a.name} is deleted`),P("/shop"))}catch(a){l.error(a.data.error||a.error)}},Q=async a=>{a.preventDefault();const r=new FormData;r.append("name",N),r.append("price",k),r.append("description",f),r.append("brand",S),r.append("category",C),r.append("mainImage",c),r.append("sideImage1",i),r.append("sideImage2",d),r.append("discount",j),r.append("countInStock",w);for(var n of r.entries())console.log(n[0]+", "+n[1]);try{const s=await _({productData:r,productId:t._id}).unwrap();console.log(s),s.error?l.error(s.error):(l.success(`${s.name} is updated`),P(`/productDetails/${t._id}`))}catch(s){l.error(s.data.error||s.error)}};return F?e.jsx(R,{}):e.jsxs("div",{className:"min-h-screen flex flex-col items-center p-4 ",children:[e.jsx("div",{className:"text-gray-500 text-2xl mt-5 tracking-wider ",children:"Update Product"}),e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"flex justify-around flex-wrap gap-7 mt-7 items-center ",children:[e.jsxs("div",{className:"flex relative w-[320px] group h-[320px] justify-center items-center bg-[#EDEBE9] rounded-[20px]",children:[e.jsx("img",{src:c,alt:"",className:`w-[250px] h-[250px] object-contain ${c?"block":"hidden"} `}),e.jsx("div",{className:"absolute w-[320px] h-[320px] left-0 top-0",children:e.jsxs("label",{className:`w-full overflow-hidden h-full bg-[#EDEBE9] flex-wrap text-black ${c?"hidden":"flex"} rounded-[20px] group-hover:flex justify-center items-center gap-2 flex-col px-10 py-8`,children:[c?c.name:"Upload Main Image",e.jsx("input",{type:"file",accept:"image/*",name:"image",onChange:U,className:`${c?"text-black":"hidden"} `})]})})]}),e.jsxs("div",{className:"flex relative w-[320px] group h-[320px] justify-center items-center bg-[#EDEBE9] rounded-[20px]",children:[e.jsx("img",{src:i,alt:"",className:`w-[250px] h-[250px] object-contain ${i?"block":"hidden"} `}),e.jsx("div",{className:"absolute overflow-hidden w-[320px] h-[320px] left-0 top-0",children:e.jsxs("label",{className:`w-full h-full bg-[#EDEBE9] flex-wrap text-black ${i?"hidden":"flex"} rounded-[20px] group-hover:flex justify-center items-center gap-2 flex-col px-10 py-8`,children:[i?i.name:"Upload Side Image 1",e.jsx("input",{type:"file",accept:"image/*",name:"image",onChange:H,className:`${i?"text-black":"hidden"}`})]})})]}),e.jsxs("div",{className:"flex relative w-[320px] group h-[320px] justify-center items-center bg-[#EDEBE9] rounded-[20px]",children:[e.jsx("img",{src:d,alt:"",className:`w-[250px] h-[250px] object-contain ${d?"block":"hidden"} `}),e.jsx("div",{className:"absolute w-[320px] h-[320px] left-0 top-0",children:e.jsxs("label",{className:`w-full overflow-hidden h-full bg-[#EDEBE9] flex-wrap text-black ${d?"hidden":"flex"} rounded-[20px] group-hover:flex justify-center items-center gap-2 flex-col px-10 py-8`,children:[d?d.name:"Upload Side Image 2",e.jsx("input",{type:"file",accept:"image/*",name:"image",onChange:M,className:`${d?"text-black":"hidden"}`})]})})]})]}),e.jsxs("div",{className:"w-full flex justify-between mt-5",children:[e.jsxs("div",{className:"flex flex-col w-[45%] gap-2",children:[e.jsx("label",{htmlFor:"name",className:"text-gray-500 text-xl",children:"Name"}),e.jsx("input",{type:"text",name:"name",id:"name",placeholder:"Name",value:N,onChange:a=>{D(a.target.value)},className:"px-5 py-3 border-2 border-gray-400 focus:outline-none rounded-md"})]}),e.jsxs("div",{className:"flex flex-col w-[45%] gap-2",children:[e.jsx("label",{htmlFor:"price",className:"text-gray-500 text-xl",children:"Price"}),e.jsx("input",{type:"number",name:"price",id:"price",placeholder:"Price",value:k,onChange:a=>{E(a.target.value)},className:"px-5 py-3 border-2 border-gray-400 focus:outline-none rounded-md"})]})]}),e.jsxs("div",{className:"w-full flex justify-between mt-5",children:[e.jsxs("div",{className:"flex flex-col w-[45%] gap-2",children:[e.jsx("label",{htmlFor:"brand",className:"text-gray-500 text-xl",children:"Brand"}),e.jsx("select",{name:"brand",id:"brand",placeholder:"Choose Brand",value:S,onChange:a=>{B(a.target.value)},className:"px-5 py-3 border-2 border-gray-400 focus:outline-none rounded-md",children:p==null?void 0:p.allBrand.map(a=>e.jsx("option",{value:a._id,children:a.name},a._id))})]}),e.jsxs("div",{className:"flex flex-col w-[45%] gap-2",children:[e.jsx("label",{htmlFor:"discount",className:"text-gray-500 text-xl",children:"Discount"}),e.jsx("input",{type:"number",name:"discount",id:"discount",placeholder:"discount",value:j,onChange:a=>{b(a.target.value)},className:"px-5 py-3 border-2 border-gray-400 focus:outline-none rounded-md"})]})]}),e.jsxs("div",{className:"flex flex-col w-full mt-4",children:[e.jsx("label",{htmlFor:"description",className:"text-gray-500 text-xl",children:"Description"}),e.jsx("textarea",{type:"text",name:"description",id:"description",placeholder:"description",value:f,onChange:a=>{y(a.target.value)},className:"px-5 py-3 border-2 border-gray-400 mt-2 min-h-[120px] focus:outline-none rounded-md"})]}),e.jsxs("div",{className:"w-full flex justify-between mt-5 ",children:[e.jsxs("div",{className:"flex flex-col w-[45%] gap-2",children:[e.jsx("label",{htmlFor:"category",className:"text-gray-500 text-xl",children:"Category"}),e.jsx("select",{name:"category",id:"category",placeholder:"Choose Category",value:C,onChange:a=>{I(a.target.value)},className:"px-5 py-3 border-2 border-gray-400 focus:outline-none rounded-md",children:x==null?void 0:x.allCategory.map(a=>e.jsx("option",{value:a._id,children:a.name},a._id))})]}),e.jsxs("div",{className:"flex flex-col w-[45%] gap-2",children:[e.jsx("label",{htmlFor:"stock",className:"text-gray-500 text-xl",children:"Count in Stock"}),e.jsx("input",{type:"number",name:"stock",id:"stock",placeholder:"stock",value:w,onChange:a=>{v(a.target.value)},className:"px-5 py-3 border-2 border-gray-400 focus:outline-none rounded-md"})]})]}),e.jsxs("div",{className:"w-full gap-3 flex mt-5",children:[e.jsx("button",{onClick:Q,className:"w-[160px] bg-[#525CEB] capitalize text-[18px] tracking-wider font-[350] py-3 rounded-lg text-white ",children:"Submit"}),e.jsx("button",{onClick:G,className:"w-[160px] bg-red-500 capitalize text-[18px] tracking-wider font-[350] py-3 rounded-lg text-white ",children:"Delete"})]})]})]})};export{te as default};
