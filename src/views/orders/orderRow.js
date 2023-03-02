import moment from "moment";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { DangerIcon, EyeIcon, UploadIcon, TrashIcon } from "../../assets";
import {
  CategoryModal,
  ConfirmModal,
  InvoiceModal,
  ProjectDetailModal,
  UploadFiles,
} from "../../modals";
import { removeCategoryById } from "../../redux/dashboard/action";
function Index({ order }) {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const showDeleteModalHandler = () => setShowDeleteModal(true);
  const hideDeleteModalHandler = () => setShowDeleteModal(false);

  const stopLoader = () => {
    setLoader(false);
    hideDeleteModalHandler();
  };
  const [loader, setLoader] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const hideModal = () => setModalShow(false);
  const removeProduct = () => {
    setLoader(true);
    dispatch(removeCategoryById(order._id, stopLoader));
  };
  const [showDetailModal, setShowDetailModal] = useState(false);
  const showDetailModalHandler = () => setShowDetailModal(true);
  const hideDetailModalHandler = () => setShowDetailModal(false);

  const [showInvoicelModal, setShowInvoiceModal] = useState(false);
  const showInvoiceModalHandler = () => setShowInvoiceModal(true);
  const hideInvoiceModalHandler = () => setShowInvoiceModal(false);
  const [showuploadModal, setShowUploadModal] = useState(false);
  const showUploadModalHandler = () => setShowUploadModal(true);
  const hideUploadModalHandler = () => setShowUploadModal(false);
  console.log(order);
  return (
    <tr>
      <td className="order-project-name">
        <button onClick={showDetailModalHandler}>
          {order?.projectName || "N/A"}
        </button>
      </td>
      <td>{order?.name || "N/A"}</td>
      <td>{order?.customerId || "N/A"}</td>
      <td>${order?.totalCost || "N/A"}</td>

      <td className="order-project-invoice">
        <button onClick={showInvoiceModalHandler}>
          {order?.invoice || "N/A"}
        </button>
      </td>
      <td>{moment(order?.createdAt).format("DD.MM.yyyy") || "N/A"}</td>

      <td className="order-project-file">
        <button onClick={showUploadModalHandler}>
          <UploadIcon className="mx-2" />
          upload
        </button>
      </td>

      <td className="order-project-overview">
        <button onClick={showUploadModalHandler}>
          <EyeIcon className="mx-2" />
          view
        </button>
      </td>
      <td className="order-project-overview">
        <button onClick={showDeleteModalHandler}>
          <TrashIcon className="mx-2" />
        </button>
      </td>

      {modalShow && (
        <CategoryModal category={order} show={modalShow} onHide={hideModal} />
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
      {showDetailModal && (
        <ProjectDetailModal
          show={showDetailModal}
          onHide={hideDetailModalHandler}
        />
      )}
      {showInvoicelModal && (
        <InvoiceModal
          show={showInvoicelModal}
          onHide={hideInvoiceModalHandler}
        />
      )}
      {showuploadModal && (
        <UploadFiles show={showuploadModal} onHide={hideUploadModalHandler} />
      )}
    </tr>
  );
}

export default memo(Index);
