import{b as v,r as t,u as N,d as b,j as e,v as w,w as C}from"./index-C4qijYKD.js";import{P}from"./ProgressStep-BKI9PtL8.js";const M=()=>{const x=v(l=>l.cart),{shippingAddress:s}=x,[n,p]=t.useState("PayPal"),[c,h]=t.useState(s.address||""),[r,m]=t.useState(s.city||""),[o,f]=t.useState(s.mobile||""),[d,g]=t.useState(s.postalCode||""),[i,y]=t.useState(s.country||""),u=N(),a=b(),j=()=>{u(w({address:c,city:r,postalCode:d,country:i,mobile:o})),u(C(n)),a("/placeorder")};return t.useEffect(()=>{s.address||a("/shipping")},[s,a]),e.jsx("div",{className:"w-full relative left-0 p-4 top-0 flex flex-col justify-center items-center",children:e.jsxs("div",{className:"w-[30%] md:w-[50%] sm:w-[80%] vsm:w-[95%] flex flex-col mt-5",children:[e.jsx(P,{step1:!0,step2:!0}),e.jsxs("div",{className:"w-full gap-6 flex flex-col mt-6",children:[e.jsxs("div",{className:"flex w-full  flex-col gap-2",children:[e.jsx("label",{htmlFor:"address",className:"text-[14px]",children:"Address"}),e.jsx("div",{className:"w-full bg-[#c1c1c133]  rounded-lg",children:e.jsx("input",{id:"address",type:"text",value:c,onChange:l=>{h(l.target.value)},placeholder:"Enter your Address",className:"bg-transparent w-full px-3 h-[48px] py-2 focus:outline-none "})})]}),e.jsxs("div",{className:"flex w-full  flex-col gap-2  ",children:[e.jsx("label",{htmlFor:"City",className:"text-[14px]",children:"City"}),e.jsx("div",{className:"w-full bg-[#c1c1c133]  rounded-lg",children:e.jsx("input",{id:"City",type:"text",value:r,onChange:l=>{m(l.target.value)},placeholder:"Enter your City",className:"bg-transparent w-full px-3 h-[48px] py-2 focus:outline-none "})})]}),e.jsxs("div",{className:"flex w-full flex-col gap-2 ",children:[e.jsx("label",{htmlFor:"postalCode",className:"text-[14px]",children:"PostalCode"}),e.jsx("div",{className:"w-full flex bg-[#c1c1c133]  rounded-lg",children:e.jsx("input",{id:"postalCode",type:"text",placeholder:"Enter PostalCode",value:d,onChange:l=>{g(l.target.value)},className:"bg-transparent h-[48px]  w-full px-3 py-2 focus:outline-none "})})]}),e.jsxs("div",{className:"flex w-full flex-col gap-2 ",children:[e.jsx("label",{htmlFor:"country",className:"text-[14px]",children:"Country"}),e.jsx("div",{className:"w-full flex bg-[#c1c1c133]  rounded-lg",children:e.jsx("input",{id:"country",type:"text",placeholder:"Enter Country",value:i,onChange:l=>{y(l.target.value)},className:"bg-transparent h-[48px]  w-full px-3 py-2 focus:outline-none "})})]}),e.jsxs("div",{className:"flex w-full flex-col gap-2 ",children:[e.jsx("label",{htmlFor:"mobile",className:"text-[14px]",children:"Phone no"}),e.jsx("div",{className:"w-full flex bg-[#c1c1c133]  rounded-lg",children:e.jsx("input",{id:"mobile",type:"number",placeholder:"Enter Phone number",value:o,onChange:l=>{f(l.target.value)},className:"bg-transparent h-[48px]  w-full px-3 py-2 focus:outline-none "})})]}),e.jsxs("div",{className:"mb-4 w-full",children:[e.jsx("label",{className:"block text-gray-400",children:"Select Method"}),e.jsx("div",{className:"mt-2 flex justify-between w-full",children:e.jsxs("label",{className:"inline-flex items-center w-full gap-5",children:[e.jsx("input",{type:"radio",className:"form-radio text-pink-500",name:"paymentMethod",value:"PayPal",checked:n==="PayPal",onChange:l=>p(l.target.value)}),e.jsx("span",{className:"ml-2",children:"PayPal or Credit Card"})]})})]}),e.jsx("button",{onClick:j,className:"w-full h-[48px] rounded-lg tracking-wider text-[17px] font-[500] bg-[#525CEB] text-white ",children:"Continue"})]})]})})};export{M as default};
