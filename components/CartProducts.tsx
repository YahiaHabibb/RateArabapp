"use client";

import { store } from "@/lib/store";
import { Product } from "@/type";
import Link from "next/link";
import CartProduct from "./CartProduct";
import CartSummary from "./CartSummary";

const CartProducts = () => {
    const {cartProduct} = store()

    return (
        <div>
            {cartProduct?.length > 0 ? ( 
            <>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">ShoppingCart</h1>
                <div className="mt-10 lg:grid lg:grid-col-12 lg:items-start lg:gap-x-12">
                    <section className="lg:col-span-7">
                        <div className="divide-y divide-gray-200 border-b border-t border-r-gray-200 last:border-b-0">
                            {cartProduct?.map((product: Product) => (
                                <CartProduct key={product?.id} product={product} />
                            ))}
                        </div>
                        <CartSummary />
                    </section>
                </div>
            </>
        ) : (
            <div className="bg-white h-96 my-10 flex flex-col gap-4 items-center justify-center py-5 rounded-lg border border-gray-200 drop-shadow-2xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    ShoppingCart
                </h1>
                <p className="text-base max-w-[700px] text-center text-gray-600 tracking-wide leading-6">
                Your cart is empty. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus libero ab nulla iure quibusdam obcaecati debitis minima explicabo quidem tenetur ad, voluptate iusto ratione natus. Maxime molestiae doloremque eaque nesciunt!
                </p>
                <Link
                    href={"/"}
                    className='bg-gray-800 text-gray-200 px-8 py-4 rounded-md hover:bg-black hover:text-white duration-200 uppercase text-sm font-semibold tracking-wide'
                >
                    go to shopping
                </Link>
            </div>
            )}
        </div>
    )
}

export default CartProducts