import Container from '@/components/Container';
import CategoryProducts from '@/components/CategoryProducts';
import { notFound } from 'next/navigation';
import React from 'react';

const Categorypage = async ({ params }: { params: { id: string } }) => {
    if (!params?.id) return notFound(); // Handle invalid routes

    try {
        const endpoint = `https://dummyjson.com/products/category-list`;
        const res = await fetch(endpoint);

    if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    const categories = await res.json();

    return (
        <Container className="py-10">
            <CategoryProducts categories={categories} id={params.id} />
        </Container>
    );
    } catch (error) {
        console.error("Error fetching categories:", error);
    return (
        <Container className="py-10">
            <p className="text-red-500">Failed to load categories. Please try again later.</p>
        </Container>
        );
    }
};

export default Categorypage;
