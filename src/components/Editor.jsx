import ReactMarkdown from "react-markdown";
import { useMarkdownEditor } from "../context/MarkdownEditorContext";
import showIcon from "../assets/icon-show-preview.svg";
import hideIcon from "../assets/icon-hide-preview.svg";
import "../styles/Editor.css";
import { useState } from "react";
import NoFiles from "./NoFiles";

export default function Editor() {
  const [showMarkdown, setShowMarkdown] = useState(false);

  const { currentFile, updateMarkdownFile, markdownFiles } = useMarkdownEditor();

  const handleDisplayClick = () => {
    setShowMarkdown(!showMarkdown);
  };

  if (!markdownFiles.length || !currentFile) return <NoFiles />;
  return (
    <div className="editor">
      <div className={`column left-column ${showMarkdown ? "hide" : ""}`}>
        <div className="banner">
          <p>MARKDOWN</p>
          <button className="displayBtn textArea" onClick={handleDisplayClick}>
            <img src={showMarkdown ? hideIcon : showIcon} alt="" />
          </button>
        </div>
        <div className={`scrollable`}>
          <textarea
            name="content"
            value={currentFile.content}
            onChange={updateMarkdownFile}
          ></textarea>
        </div>
      </div>
      <div className={`column ${!showMarkdown ? "hidePreview" : ""}`}>
        <div className="banner">
          <p>PREVIEW</p>
          <button className="displayBtn" onClick={handleDisplayClick}>
            <img src={showMarkdown ? hideIcon : showIcon} alt="" />
          </button>
        </div>
        <div className={`scrollable reactMarkdown ${showMarkdown ? "markdown" : ""}`}>
          <ReactMarkdown>{currentFile.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
