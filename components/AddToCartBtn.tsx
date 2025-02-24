'use client'
import { store } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Product } from '@/type'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaMinus, FaPlus } from 'react-icons/fa';
import PriceFormat from './PriceFormat';


interface Props {
    product:Product;
    className?: string;
    showSubtotal?: boolean;
}
const AddToCartBtn = ({ product, className, showSubtotal = true }: Props) => {
    const { addToCart, cartProduct, decreaseQuantity } = store();
    const [existingProduct, setExistingProduct] = useState<Product | null>(null);
    useEffect(() => {
        const avaiableItem = cartProduct?.find((item) => item?.id === product.id);
        setExistingProduct(avaiableItem || null);
    }, [product, cartProduct]);
    const handleAddCart = () => {
        if(product){
            addToCart(product);
            toast.success(`${product?.title.substring(0,10)} ... added Successfully`);
        }
    }
    const handleDeleteProduct = () => {
        if(existingProduct){
            if((existingProduct?.quantity as number) > 1){
                decreaseQuantity(existingProduct?.id);
            toast.success(`${product?.title?.substring(0,10)} ... decreased Successfully`);
            }else{
                toast.error('You Can Not Decreased Less Than 1');
            }
        }
    }
    return (
        <>
        {existingProduct ? (
            <div className='flex item-center justify-between'>
                <div className='flex self-start items-center justify-center gap-2 py-2 mb-2'>
                    <button 
                    disabled={(existingProduct?.quantity as number) <= 1}
                    onClick={handleDeleteProduct} 
                    className='bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white hoverEffect disabled:text-gray-300 disabled:hover:bg-[#f7f7f7]'>
                        <FaMinus />
                    </button>
                    <p>{existingProduct?.quantity}</p>
                    <button onClick={handleAddCart} className='bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer'><FaPlus /></button>
                </div>
                {existingProduct && showSubtotal && (
                    <div>
                        <p>SubTotal:</p>
                        <PriceFormat amount={(existingProduct?.quantity as number) * existingProduct?.price} />
                    </div>
                )}
            </div>) : 
            <button onClick={handleAddCart} className={cn('text-sm tracking-wide font-medium mb-2 border-[1px] border-amazonBlue/50 py-2 w-full rounded-full bg-amazonLight/10 hover:bg-amazonYellowDark hoverEffect', className)}>
            Add to Cart
        </button> }
        </>
    );
};

export default AddToCartBtn;