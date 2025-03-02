'use client';

import { Product } from "@/type";
import { useRef, useState } from "react";
import Container from "./Container";
import Title from "./Title";
import { Card, CardContent } from "./ui/card";
import ProductFilter from "./ProductFilter";

const AllProducts = ({ categories }: {categories: string[]}) => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState<string>("");
    const [priceFilter, setPriceFilter] = useState("");
    const [priceValue, setPriceValue] = useState(0);
    const maxPrice = 4000;
    const defaultPrice = 0;
    const perPage = 12;
    const observerRef = useRef<HTMLDivElement | null>(null)
    
    return (
            <Container className="py-10 ">
                <Title className="text-4xl font-bold text-center mb-5">
                    Discover Our Exquisite Collection
                </Title>
                <Card className="mb-8">
                    <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-4">
                        <div className="flex flex-col items-start mb-6 w-auto md:min-w-40 self-start">
                            <ProductFilter 
                                categories={categories}
                                setSelectedCategories={setSelectedCategories}
                                selectedCategories={selectedCategories}
                                priceFilter={priceFilter}
                                setPriceFilter={setPriceFilter}
                                priceValue={priceValue}
                                setPriceValue={setPriceValue}
                                defaultPrice={defaultPrice}
                                maxPrice={maxPrice}

                            />
                        </div>
                    </CardContent>
                </Card>
            </Container>
    );
};

export default AllProducts;