'use clinet'
import { fetchData } from '@/hooks/fetchData';
import { Title } from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

interface Props {
    categories: [string];
    id: string;
}

const CategoryProducts = ({categories, id}: Props) => {
    const [currentCategory, setCurrentCategory] = useState(id);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const endpoint = `https://dummyjson.com/products/category/${currentCategory}`;
            setLoading(true)
        try {
            const data = await fetchData(endpoint)
            setProducts(data?.products);
        } catch (error) {
            console.error('Error fetching product', error)
        } finally {
            setLoading(false)
        }
    };
    getData();
    }, [id , currentCategory])
    return (
        
        <div>
            <Title className='text-xl'> 
                product by Category: {" "}
                <span className='font-bold text-green-600 capitalize tracking-wide'>
                    {currentCategory}
                </span>
            </Title>
            <div className='py-5 flex items-start gap-5'>
                <div className='flex flex-col md:min-w-40 border border-amazonBlue/50'>
                    {categories?.map((category) => (
                        <Button 
                        key={category}
                        className={`bg-transparent border-0 rounded-none shadow-none capitalize text-amazonBlue/70 hover:bg-amazonLight hover:text-white font-semibold hoverEffect border-b border-b-amazonBlue/50 last:border-b-0 ${category === currentCategory && 'bg-amazonBlue text-white border-amazonBlue'}`}
                        >
                            {category}
                        </Button>
                ))}
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default CategoryProducts