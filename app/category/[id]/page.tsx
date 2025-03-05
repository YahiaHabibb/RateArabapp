import Container from '@/components/Container';
import CategoryProducts from '@/components/CategoryProducts';
import { notFound } from 'next/navigation';
import React from 'react';
import { fetchData } from '@/hooks/fetchData';

const CategoryPage = async ({ categoryId }: { categoryId: string }) => {
    if (!categoryId) return notFound(); // Handle missing category ID

    try {
        const response = await fetchData('https://dummyjson.com/products/category-list');

    if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const categories = await response.json();

    return (
        <Container className="py-10">
            <CategoryProducts categories={categories} id={categoryId} />
        </Container>
    );
    } catch (error) {
        console.error('Error fetching categories:', error);
    return (
        <Container className="py-10">
            <p className="text-red-500">Failed to load categories. Please try again later.</p>
        </Container>
        );
    }
};

export default CategoryPage;
