import { cn } from '@/lib/utils';
import { Product } from '@/type';
import Image from 'next/image';
import Link from 'next/link';


import React from 'react'
import ProductIcon from './ProductIcon';

const ProductCard = ({
    product, 
    
}: {
    product: Product;
    className?: string;
}) => {
    return (
    <div className={cn('border border-gray-200 hover:border-amazonLight/30 rounded-md bg-white overflow-hidden z-10 hoverEffect')}>
        <div className='relative group overflow-hidden h-72 w-full '>
            <Link href={`/product/${product?.id}`}
            className='h-full'>
                <Image src={product?.images[0]} alt={product?.title}
                width={600} height={600} loading='lazy' 
                className='w-full h-full object-contain bg-[#f8f8f8] 
                group-hover:scale-110 overflow-hidden hoverEffect'/>
                <ProductIcon product={product}/>
            </Link>
        </div>
    </div>
    )
}

export default ProductCard;