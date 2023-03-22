interface ProductItem {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: CategoryItem;
}

export type CategoryItem = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export default ProductItem;
