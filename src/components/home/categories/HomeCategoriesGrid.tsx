import CategoryCard from "./HomeCategoryCard";

const CATEGORIES = [
  {
    id: "bags",
    title: "Bags",
    imageUrl: "https://www.wolfandmoon.com/cdn/shop/files/valentines-edit-re-export-5_1728x.jpg?v=1739181840",
    linkUrl: "/products/category/bags",
  },
  {
    id: "necklaces",
    title: "Necklaces",
    imageUrl: "https://www.wolfandmoon.com/cdn/shop/files/beach-day-hoops-set-lifestyle-2_1296x.jpg?v=1716932534",
    linkUrl: "/products/category/necklaces",
  },
  {
    id: "hoop-sets",
    title: "Hoop Sets",
    imageUrl: "https://www.wolfandmoon.com/cdn/shop/files/pastries-group-model-3_1296x.jpg?v=1691508689",
    linkUrl: "/products/category/hoop-sets",
  },
  {
    id: "earrings",
    title: "Earrings",
    imageUrl: "https://www.wolfandmoon.com/cdn/shop/files/heart-bag-redpink-model-4_a08c1a9c-706f-4a27-a012-936a61471d24_1296x.jpg?v=1739794780",
    linkUrl: "/products/category/earrings",
  },
];


export default function HomeCategoriesGrid() {
    return (
      <section className="bg-zariabg">
        <div className="w-full relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-black"></div>
          
          <div className="grid grid-cols-1  lg:grid-cols-4 relative">
            {CATEGORIES.map((category, index) => (
              <div 
                key={category.id} 
                className="min-h-[550px] md:min-h-[700px] lg:min-h-[450px] xl:min-h-[520px] 2xl:min-h-[580px] w-full relative border-b border-black"
              >
                <CategoryCard
                  title={category.title}
                  imageUrl={category.imageUrl}
                  linkUrl={category.linkUrl}
                />
                
                {(index < CATEGORIES.length - 1) && (
                  <div className="hidden lg:block absolute top-0 right-0 h-full w-[1px] bg-black"></div>
                )}
                
                {(index < CATEGORIES.length - 1) && (
                  <div className="lg:hidden absolute bottom-0 left-0 w-full h-[1px] bg-black"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black"></div>
        </div>
      </section>
    );
  }