import React, { useState } from 'react';
import logoCart from '../assets/img/food.png';
import ModalCheckout from './ModalCheckout';

const RightSidebar = (props) => {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const showCart = () => {
      if (props.arrCarts.length) {
         return <>
            <div className="row">
               <div className="col">
                  {props.arrCarts.map((item) => {
                     return (
                        <div className="row my-5" key={item.product_id}>
                           <div className="col">
                              <img src={item.image} className="w-75 rounded-lg" alt="" />
                           </div>
                           <div className="col">
                              <h5>
                                 {item.product_name.split(' ', 2).map(el => `${el} `)}
                              </h5>
                              <div className="btn-group mt-auto" role="group" aria-label="Basic example">
                                 <button type="button" className="btn btn-success" onClick={() => { props.handleDecreaseQty(item.product_id) }}>-</button>
                                 <h5 className="my-2 mx-3">{item.quantity}</h5>
                                 <button type="button" className="btn btn-success" onClick={() => { props.handleIncreaseQty(item.product_id) }}>+</button>
                              </div>
                           </div>
                           <div className="col d-flex ">
                              <h6 className="mt-auto ml-auto">Rp {(item.price * item.quantity).toLocaleString()}</h6>
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>
            <div className="row">
               <div className="col">
                  <div className="row mx-2">
                     <div className="col d-flex">
                        <h4 className="mr-auto font-weight-bold">Total :</h4>
                     </div>
                     <div className="col d-flex">
                        <h4 className="ml-auto font-weight-bold">
                           Rp {props.arrCarts.reduce((total, item) => { return total + (item.price * item.quantity) }, 0).toLocaleString()}*
                        </h4>
                     </div>
                  </div>
                  <div className="row mx-2">
                     <div className="col d-flex">
                        <p className="mr-auto">*Belum termasuk ppn</p>
                     </div>
                  </div>
                  <div className="row mx-2 my-2">
                     <div className="col">
                        <button
                           type="button"
                           className="btn btn-info btn-block btn-lg"
                           onClick={handleShow}
                        >
                           Checkout
                        </button>
                     </div>
                  </div>
                  <div className="row mx-2 my-2">
                     <div className="col">
                        <button type="button" className="btn btn-danger btn-block btn-lg" onClick={props.handleEmptyCart}>
                           Cancel
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </>
      } else {
         return (
            <>
               <img src={logoCart} className="w-50" alt="" />
               <h5>Your cart is empty</h5>
               <p className="text-secondary">Please add some items from the menu</p>
            </>
         )
      }
   };

   return (
      <>
         <div className="row navbar-light bg-white p-3 border-bottom">
            <div className="col text-center">
               <h4 className="">Cart&nbsp;<span className="badge badge-pill badge-info">{props.arrCarts.length}</span>
               </h4>
            </div>
         </div>
         <div className="row h-100"> {/* masalah disini (h-100) */}
            <div className="col bg-white text-center border-top">
               {showCart()}
            </div>
         </div>
         <ModalCheckout
            arrCarts={props.arrCarts}
            showModal={show}
            handleClose={handleClose}
            handleEmptyCart={props.handleEmptyCart}
         />
      </>
   );
}

export default RightSidebar;