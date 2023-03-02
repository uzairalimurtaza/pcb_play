import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Index({ categorys, loader, value, onChange }) {
  const [filterdCategorys, setFilterdCategorys] = useState([]);
  const { cart } = useSelector((state) => state.dashboard);
  const cartItems = cart?.items || [];
  useEffect(() => {
    const newCates = categorys.filter((e) => e.name !== "mcu");
    setFilterdCategorys(newCates);
  }, [categorys]);
  const handleChange = (selected) => {
    onChange?.(selected);
  };
  const mcucategory = categorys.find((e) => e.name === "mcu");
  const mucIsAdded = cartItems.find((e) => e.categoryId === mcucategory?._id);
  return (
    <ul className="category-list gap-2">
      {filterdCategorys.length > 0 && (
        <button
          onClick={() => {
            handleChange(mcucategory);
          }}
          className={`category-list-item ${
            value?._id === mcucategory?._id ? "active" : ""
          }`}
        >
          <li>mcu</li>
        </button>
      )}

      {filterdCategorys.map((category) => {
        return (
          <button
            disabled={!mucIsAdded}
            onClick={() => handleChange(category)}
            className={`category-list-item ${
              value?._id === category?._id ? "active" : ""
            }`}
          >
            <li>{category.name}</li>
          </button>
        );
      })}
    </ul>
  );
}

export default memo(Index);
