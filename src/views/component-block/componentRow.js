import React from "react";
import { useState } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DangerIcon, EditIcon, TrashIcon } from "../../assets";
import { ConfirmModal, ProductModal } from "../../modals";
import { removeProductById } from "../../redux/dashboard/action";

function Index({ product }) {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const showDeleteModalHandler = () => setShowDeleteModal(true);
  const hideDeleteModalHandler = () => setShowDeleteModal(false);
  const { categorys } = useSelector((state) => state.dashboard);
  const stopLoader = () => {
    setLoader(false);
    hideDeleteModalHandler();
  };
  const [loader, setLoader] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const showModal = () => setModalShow(true);
  const hideModal = () => setModalShow(false);
  const removeProduct = () => {
    setLoader(true);
    dispatch(removeProductById(product._id, stopLoader));
  };

  return (
    <tr>
      <td>
        {product?.category?.name ||
          categorys.find((e) => e._id === product.category)?.name ||
          "N/A"}
      </td>

      <td>{product.subCategory}</td>

      <td>{product.partNumber}</td>

      <td>{product.manufacturer}</td>

      <td>${product.price}</td>
      <td className="text-center">
        <div className=" d-flex justify-content-center gap-3 align-items-center ">
          <EditIcon onClick={showModal} />

          <TrashIcon onClick={showDeleteModalHandler} />
        </div>
      </td>
      {modalShow && (
        <ProductModal product={product} show={modalShow} onHide={hideModal} />
      )}
      {showDeleteModal && (
        <ConfirmModal
          label="Want to delete this ?"
          description={
            "You will not be able to recover this once you have deleted it."
          }
          loader={loader}
          icon={DangerIcon}
          actionBtnText="delete anyway"
          show={showDeleteModal}
          onHide={hideDeleteModalHandler}
          action={removeProduct}
        />
      )}
    </tr>
  );
}

export default memo(Index);
