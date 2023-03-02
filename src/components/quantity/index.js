import React, { memo, useEffect, useState } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "../../assets";
import "./index.css";
function Index({ qty, onChange, showBtn, onDelete, showQtyDiv }) {
  const [newQty, setNewQty] = useState(1);
  const removeQty = () => {
    if (newQty <= 1) {
      onDelete?.();
      return;
    }

    onChange?.(newQty - 1);
  };
  const addQty = () => {
    if (newQty > 98) {
      return;
    }

    onChange?.(newQty + 1);
  };
  useEffect(() => {
    if (qty) {
      setNewQty(qty);
    }
  }, [qty]);

  return (
    <div className="qty-box">
      {showQtyDiv && (
        <button className=" minus-btn  " onClick={removeQty}>
          {qty > 1 ? (
            <MinusIcon width={12} height={20} className="qty-icon   h-25" />
          ) : (
            <TrashIcon width={12} className="trash-icon   h-25" />
          )}
        </button>
      )}

      <label className="qty-value">{newQty}</label>
      {showBtn && showQtyDiv && (
        <button className=" minus-btn " onClick={addQty}>
          <PlusIcon width={12} className="qty-icon" />
        </button>
      )}
    </div>
  );
}

export default memo(Index);
