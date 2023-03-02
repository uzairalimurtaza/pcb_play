import React, { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { DangerIcon, EyeIcon, TrashIcon } from "../../assets";
import {
  CategoryModal,
  ConfirmModal,
  DesignOverviewModal,
  ProjectDetailModal,
} from "../../modals";
import { removeFavoriteById } from "../../redux/dashboard/action";
function Index({ favorite }) {
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
    dispatch(removeFavoriteById(favorite._id, stopLoader));
  };
  const [showDetailModal, setShowDetailModal] = useState(false);
  const showDetailModalHandler = () => setShowDetailModal(true);
  const hideDetailModalHandler = () => setShowDetailModal(false);

  const [showOverviewModal, setShowOverviewModal] = useState(false);

  const showOverviewModalHandler = () => setShowOverviewModal(true);
  const hideOverviewModalHandler = () => setShowOverviewModal(false);

  const { project, cart, user } = useMemo(() => {
    let project = favorite?.project;
    let user = favorite?.user;
    let cart = favorite?.cart;
    return { project, user, cart };
  }, [favorite]);
  return (
    <tr>
      <td onClick={showDetailModalHandler} className="order-project-name">
        <button onClick={showDetailModalHandler} className="w-100 h-100">
          {project?.projectName || "N/A"}
        </button>
      </td>
      <td>{project?.projectId || "N/A"}</td>
      <td>{user ? `${user?.firstName} ${user?.lastName}` : "N/A"}</td>
      <td>{user?.userId || "N/A"}</td>

      <td onClick={showOverviewModalHandler} className="order-project-overview">
        <button onClick={showOverviewModalHandler}>
          <EyeIcon className="mx-2" />
          view
        </button>
      </td>

      <td>
        <TrashIcon fill="red" onClick={showDeleteModalHandler} />
      </td>

      {modalShow && (
        <CategoryModal
          category={favorite}
          show={modalShow}
          onHide={hideModal}
        />
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
          project={project}
          cart={cart}
          user={user}
          show={showDetailModal}
          onHide={hideDetailModalHandler}
        />
      )}

      {showOverviewModal && (
        <DesignOverviewModal
          designOverview={project?.designOverview}
          show={showOverviewModal}
          onHide={hideOverviewModalHandler}
        />
      )}
    </tr>
  );
}

export default memo(Index);
