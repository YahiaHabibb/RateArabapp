import { Product } from '@/type'
import React from 'react'
import { MdFavoriteBorder } from 'react-icons/md'

const ProductIcon = ({ product }: { product: Product }) => {
    return (
    <div className='absolute top-2 right-2 flex items-center gap-2'>
        <p className='bg-transparent text-amazonBlue border
        border-amazonBlue group-hover:bg-amazonBlue group-hover:text-white 
        text-xs roundede-full py-1 hoverEffect'>{product?.discountPercentage}</p>
        <span>
            <MdFavoriteBorder />
        </span>
    </div>
    )
}

export default ProductIcon