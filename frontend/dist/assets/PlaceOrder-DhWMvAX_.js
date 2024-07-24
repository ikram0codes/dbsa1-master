import{d,u as p,b as o,r as x,j as s,L as m,x as f}from"./index-C4qijYKD.js";import{c as h}from"./orderSlice-gK3h9E1T.js";import{P as j}from"./ProgressStep-BKI9PtL8.js";import{M as u}from"./Message-DtjI_lB4.js";import{C as g}from"./CartItem-F-nj-JqI.js";import{B as y}from"./react-toastify.esm-BahYd6mB.js";const I=()=>{const r=d(),a=p(),e=o(t=>t.cart),[i,{isLoading:l,error:N}]=h();x.useEffect(()=>{e.shippingAddress.address||r("/shipping")},[e.paymentMethod,e.shippingAddress.address,r]);const n=async()=>{try{const t=await i({orderItems:e.cartItems,shippingAddress:e.shippingAddress,paymentMethod:e.paymentMethod,itemsPrice:e.itemsPrice,shippingPrice:e.shippingPrice,taxPrice:e.taxPrice,totalPrice:e.totalPrice}).unwrap();a(f()),r(`/order/${t._id}`)}catch(t){y.error(t)}};return s.jsx("div",{className:"w-full flex flex-col items-center p-5 py-8",children:s.jsxs("div",{className:"w-[43%] md:w-[80%] sm:w-[95%] vsm:w-[95%] flex flex-col items-center ",children:[s.jsx("div",{className:"w-full",children:s.jsx(j,{step1:!0,step2:!0,step3:!0})}),s.jsx("div",{className:"flex w-full flex-col mt-8",children:e.cartItems.length===0?s.jsx(u,{children:"Your cart is empty"}):s.jsx("div",{className:"",children:s.jsx("div",{className:"flex flex-col gap-4",children:e.cartItems.map((t,c)=>s.jsx(g,{item:t},c))})})}),s.jsxs("div",{className:"w-full flex flex-col p-4 mt-5 ",children:[s.jsx("h1",{className:"text-[20px] font-[500]",children:"Order Summary"}),s.jsxs("div",{className:"w-full flex flex-col justify-start",children:[s.jsx("h1",{className:"text-[18px] font-[500] my-4 ",children:"Price"}),s.jsxs("p",{className:"flex w-full font2 font-[400] my-2 gap-5 justify-between",children:[s.jsx("span",{children:"Items"}),s.jsxs("span",{children:["R ",e.itemsPrice]})]}),s.jsxs("p",{className:"flex w-full font2 font-[400] my-2 gap-5 justify-between",children:[s.jsx("span",{children:"Shipping"}),s.jsxs("span",{children:["R ",e.shippingPrice]})]}),s.jsxs("p",{className:"flex w-full font2 font-[400] my-2 gap-5 justify-between",children:[s.jsx("span",{children:"Tax"}),s.jsxs("span",{children:["R ",e.taxPrice]})]}),s.jsx("hr",{}),s.jsxs("p",{className:"flex w-full font2 font-[400] my-2 gap-5 justify-between",children:[s.jsx("span",{children:"Total"}),s.jsxs("span",{children:["R ",e.totalPrice]})]}),s.jsx("hr",{})]}),s.jsxs("div",{className:"w-full flex flex-col justify-start",children:[s.jsx("h1",{className:"text-[18px] font-[500] my-4 ",children:"Shipping"}),s.jsxs("p",{className:"font2 font-[400] my-2 gap-2",children:[s.jsx("span",{className:"font-[500]",children:"Address :"})," ",e.shippingAddress.address,", ",e.shippingAddress.city," ",e.shippingAddress.postalCode,", ",e.shippingAddress.country]}),s.jsxs("p",{className:"font2 font-[400] my-2 gap-2",children:[s.jsx("span",{className:"font-[500]",children:"Phone no :"})," ",e.shippingAddress.mobile]}),s.jsxs("p",{className:"font2 font-[400] my-2 gap-2",children:[s.jsx("span",{className:"font-[500]",children:"Payment method :"})," ",e.paymentMethod]})]})]}),s.jsx("button",{type:"button",className:"w-full h-[48px] rounded-lg tracking-wider text-[17px] font-[500] bg-[#525CEB] text-white ",disabled:e.cartItems===0,onClick:n,children:"Place Order"}),l&&s.jsx(m,{})]})})};export{I as default};
