import Container from '@/components/Container';
import CategoryProducts from '@/components/CategoryProducts';
import { fetchData } from '@/hooks/fetchData';
import React from 'react'

const Categorypage = async ({
    params,
}: {
    params: Promise<{ id: string}>;
}) => {
    const endpoint = 'https://dummyjson.com/products/category-list';
    const categories = await fetchData(endpoint);
    const {id} = await params
    return (
            <Container className='py-10'>
                <CategoryProducts categories={categories} id={id} />
            </Container>
    )
};

export default Categorypage