import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Products() {
  // Products State
  const [products, setProducts] = useState([]);

  // Step 1: Search State
  const [search, setSearch] = useState("");

  // Step 3: Category State
  const [category, setCategory] = useState("All");

  // Step 4: Budget State
  const [budget, setBudget] = useState("All");

  // Step 5: Sorting State
  const [sort, setSort] = useState("");

  // Fetch Products
  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Delete Product
  async function deleteProduct(id) {
    try {
      await api.delete(`/products/${id}`);

      setProducts(
        prevProducts =>
          prevProducts.filter(
            product => product.id !== id
          )
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Steps 2, 3, 4: Filter Products
  const filteredProducts = products.filter(product => {

    // Search Filter
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    // Category Filter
    const categoryMatch =
      category === "All" ||
      product.category === category;

    // Budget Filter
    const budgetMatch =
      budget === "All" ||
      product.budget === budget;

    return (
      searchMatch &&
      categoryMatch &&
      budgetMatch
    );
  });

  // Step 5: Sort Products By Rating
  let finalProducts = [...filteredProducts];

  if (sort === "high") {
    finalProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sort === "low") {
    finalProducts.sort(
      (a, b) => a.rating - b.rating
    );
  }

  return (
    <>
      <h1>Popular Products</h1>

      <Link to="/add-product">
        Add Product
      </Link>

      {/* Filters Section */}
      <div className="filters">

        {/* Step 1: Search Input */}
        <input
          type="text"
          placeholder="Search Product"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* Step 3: Category Dropdown */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Footwear">Footwear</option>
          <option value="Accessories">Accessories</option>
        </select>

        {/* Step 4: Budget Dropdown */}
        <select
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
        >
          <option value="All">All Budgets</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Step 5: Rating Sorting */}
        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="">Sort Rating</option>
          <option value="high">High To Low</option>
          <option value="low">Low To High</option>
        </select>

      </div>

      {/* Display Filtered Products */}
      <div className="products">
        {finalProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={deleteProduct}
          />
        ))}
      </div>

      {/* No Products Found */}
      {finalProducts.length === 0 && (
        <p>No products found</p>
      )}
    </>
  );
}

export default Products;