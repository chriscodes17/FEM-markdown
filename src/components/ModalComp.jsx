import Modal from "react-modal";
import { useMarkdownEditor } from "../context/MarkdownEditorContext";
import "../styles/ModalComp.css";

export default function ModalComp({ modalStatus, closeModal, fileTitle }) {
  const { deleteFile } = useMarkdownEditor();
  const handleDeleteClick = () => {
    deleteFile();
    closeModal();
  };
  Modal.setAppElement("#root");
  return (
    <div>
      <Modal
        className={"delete-modal"}
        overlayClassName={"overlay"}
        isOpen={modalStatus}
        contentLabel="Example Modal"
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
      >
        <h3>Delete this form?</h3>
        <p>
          Are you sure you want to delete the `{fileTitle}` document and its contents?
          This action cannot be reversed.
        </p>
        <button className="actionButton" onClick={handleDeleteClick}>Delete</button>
      </Modal>
    </div>
  );
}
