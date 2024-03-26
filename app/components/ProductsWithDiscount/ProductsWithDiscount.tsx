import Category from "@typescategory.types";
import ProductWithDiscount from "./ProductWithDiscount/ProductWithDiscount";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@componentsui/scroll-area";

interface IProductsWithDiscountProps {
  categories: Category[];
}

export default function ProductsWithDiscount({ categories }: IProductsWithDiscountProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <h1 className="font-bold text-3xl mt-20 mb-4">Produtos com 20% OFF</h1>
      {windowWidth <= 785 ? (
        <ScrollArea className="rounded-md">
          <div className="flex w-max space-x-4 p-4">
            {categories.map((category) =>
              category.products.slice(1, 2).map((product) => <ProductWithDiscount product={product} />)
            )}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="flex gap-4 flex-wrap justify-center mt-6">
          {categories.map((category) =>
            category.products.slice(1, 2).map((product) => <ProductWithDiscount product={product} />)
          )}
        </div>
      )}
    </>
  );
}
