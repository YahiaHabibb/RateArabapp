import { useState } from "react";
import Title from "./Title";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

interface Props {
    categories: string[]
    setSelectedCategories: (category: string) => void;
    selectedCategories: string;
    priceFilter: (value : string) => void;
    setPriceFilter: string;
    priceValue: (value : number) => void;
    setPriceValue: number;
    defaultPrice: number;
    maxPrice: number;
}
const ProductFilter = ({
    categories,
    setSelectedCategories,
    selectedCategories,
    priceFilter,
    setPriceFilter,
    priceValue,
    setPriceValue,
    defaultPrice,
    maxPrice,
}: Props) => {
    const [categoriesArray, setCategoriesArray] = useState(categories.slice(0,8));
    return (
        <div className="space-y-4">
            <Title className="text-lg">Filters</Title>
            <div>
                <h4 className="font-medium mb-2">Category</h4>
                <div className="space-y-2">
                    {categoriesArray?.map((item) => (
                        <div key={item} className="flex items-center cursor-pointer">
                            <Checkbox 
                                id={`category-${item}`}
                                checked={selectedCategories === item}
                                onCheckedChange={() => setSelectedCategories(item)}
                            /> 
                            <Label htmlFor={`category-${item}`} className="ml-2 capitalize cursor-pointer">{item}</Label>
                        </div>
                    ))};
                    {categoriesArray?.length > 8 ? (
                        <button onClick={() => setCategoriesArray(categories.slice(0,8))} className="text-xs font-semibold text-amazonBlue underline underline-offset-2 hover:text-amazonOrangeDark hoverEffect">
                            minimize categories
                        </button>
                    ) : (
                        <button onClick={() => setCategoriesArray(categories)} className="text-xs font-semibold text-amazonBlue underline underline-offset-2 hover:text-amazonOrangeDark hoverEffect">
                            show all categories
                        </button>
                    )}
                </div>
            </div>
            <div>
                <h4 className="font-medium mb-2 ">Price Range</h4>
                <div className="space-y-2">
                    {[
                        { value: "desc", title: "High to Low"},
                        { value: "asc", title: "Low to High"},
                    ].map((item) => (
                        <div key={item?.title} className="flex items-center">
                            <Checkbox 
                                id={`price-${item?.value}`}
                                onCheckedChange={() => setPriceFilter(item?.value)}
                                checked={item?.value === priceFilter}
                            />
                            <Label htmlFor={`price-${item?.value}`} className="ml-2 ">
                                {item?.title}
                            </Label>
                        </div>
                    ))}
                </div>
                <div className="mt-5">
                    <Slider
                        defaultValue={[defaultPrice]}
                        max={maxPrice}
                        step={1}
                        onValueChange={(e) => setPriceValue(e[0])}
                        className="cursor-pointer"
                    />
                    {priceValue > 0 && (
                        <p className="mt-3 text-xs">
                            Filter price : <span className="font-bold">{defaultPrice}</span> to { " "}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
};

export default ProductFilter