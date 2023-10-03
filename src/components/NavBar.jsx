import { useState } from "react";
import { useMarkdownEditor } from "../context/MarkdownEditorContext";
import fileIcon from "../assets/icon-document.svg";
import menuIcon from "../assets/icon-menu.svg";
import closeIcon from "../assets/icon-close.svg";
import saveIcon from "../assets/icon-save.svg";
import deleteIcon from "../assets/icon-delete.svg";
import logo from "../assets/logo.svg";
import "../styles/NavBar.css";
import ModalComp from "./ModalComp";
import Toggle from "./Toggle";
export default function NavBar() {
  const {
    markdownFiles,
    addMarkdownFile,
    updateMarkdownFile,
    setCurrentFileById,
    saveCurrentFile,
    currentFile,
    validateFileName,
  } = useMarkdownEditor();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [modelStatus, setModalStatus] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleModalClick = () => {
    setModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  const addNewFileHandler = () => {
    addMarkdownFile();
  };

  const saveFileHandler = () => {
    const validation = validateFileName(currentFile.title);
    if (validation) {
      setTitleError(validation);
      return;
    }
    setTitleError("");
    saveCurrentFile();
  };

  return (
    <div className="NavBarComp">
      <nav className="navbar">
        <div className="navbar-left">
          <button className="navbar-toggle" onClick={toggleSidebar}>
            <img src={isSidebarOpen ? closeIcon : menuIcon} alt="" />
          </button>
          <img className="logo" src={logo} alt="" />
          {!currentFile ? (
            ""
          ) : (
            <div className="input-container">
              <img src={fileIcon} alt="" />
              <div className="input-container-inner">
                {window.innerWidth > 600 ? <span>Document Name</span> : ""}
                <input
                  className="file-title-input"
                  type="text"
                  name="title"
                  value={currentFile.title}
                  onChange={updateMarkdownFile}
                />
                <span className="error">{titleError}</span>
              </div>
            </div>
          )}
        </div>
        {!currentFile ? (
          ""
        ) : (
          <div className="navbar-right">
            <button className="deleteBtn" onClick={handleModalClick}>
              <img src={deleteIcon} alt="" />
            </button>
            <button className="actionButton saveBtn" onClick={saveFileHandler}>
              <img src={saveIcon} alt="" />
              {window.innerWidth > 600 ? "Save Changes" : ""}
            </button>
          </div>
        )}
      </nav>
      <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div>
          <p className="sidebarTitle">MY DOCUMENTS</p>
          <button className="actionButton addFileBtn" onClick={addNewFileHandler}>
            + New Document
          </button>
          <ul className="sidebar-menu">
            {!markdownFiles.length ? (
              <li>No Files</li>
            ) : (
              markdownFiles.map((file) => (
                <li key={file.id} onClick={() => setCurrentFileById(file.id)}>
                  <img src={fileIcon} alt="" />
                  <div className="item-text">
                    <p className="createdAt">{file.createdAt}</p>
                    <p className="fileTitle">{file.title}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <Toggle />
      </aside>
      {!currentFile ? (
        ""
      ) : (
        <ModalComp
          modalStatus={modelStatus}
          closeModal={closeModal}
          fileTitle={currentFile.title}
        />
      )}
    </div>
  );
}
