'use client';

import { Product } from "@/type";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Title from "./Title";
import { Card, CardContent } from "./ui/card";
import ProductFilter from "./ProductFilter";
import { fetchData } from "@/hooks/fetchData";
import ProductCard from "./ProductCard";
import { Loader2 } from "lucide-react";

const AllProducts = ({ categories }: { categories: string[] }) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]); // ✅ تعديل اسم المتغير
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState<string>("");
    const [priceFilter, setPriceFilter] = useState("");
    const [priceValue, setPriceValue] = useState(0);
    
    const maxPrice = 4000;
    const defaultPrice = 0;
    const perPage = 12;
    const observerRef = useRef<HTMLDivElement | null>(null);

    // 🔹 دالة تحميل المنتجات
    const loadMoreProducts = async (reset = false) => {
        if (loading || (!hasMore && !reset)) return;
        setLoading(true);

        const categoryFilter = selectedCategories ? `/category/${selectedCategories}` : "";
        const filterPrice = priceFilter ? `sortBy=price&order=${priceFilter}` : "";
        const skip = reset ? 0 : (currentPage - 1) * perPage;
        const endpoint = `https://dummyjson.com/products${categoryFilter}?${filterPrice}&limit=${perPage}&skip=${skip}`;

        try {
            const data = await fetchData(endpoint);
            if (reset) {
                setProducts(data?.products || []);
                setHasMore(data?.products?.length > 0);
                setCurrentPage(1);
            } else if (data?.products?.length > 0) {
                setProducts((prev) => [...prev, ...data.products]);
                setCurrentPage((prev) => prev + 1); // ✅ تحديث الصفحة عند تحميل المزيد
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 استدعاء البيانات عند تحميل الصفحة
    useEffect(() => {
        loadMoreProducts();
    }, []);

    // 🔹 إعادة تحميل المنتجات عند تغيير الفلاتر
    useEffect(() => {
        loadMoreProducts(true); // ✅ إعادة تحميل مع تصفير الصفحة
    }, [selectedCategories, priceFilter]);

    // 🔹 إضافة Infinite Scroll باستخدام Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMoreProducts();
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [hasMore, loading]);

    return (
        <Container className="py-10 max-w-screen-2xl">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products?.map((product, index) => (
                            <ProductCard key={index.toString()} product={product} />
                        ))}
                    </div>
                </CardContent>
            </Card>
            {/* Infinite Scroll Trigger */}
            <div ref={observerRef} className="h-10">
                {loading && (
                    <div className="w-full flex items-center justify-center mt-10 py-10">
                        <Loader2 className='w-10 h-10 text-amazonOrangeDark animate-spin' />
                    </div>
                )}
            </div>
            {/* Loader */}
        </Container>
    );
};

export default AllProducts;
