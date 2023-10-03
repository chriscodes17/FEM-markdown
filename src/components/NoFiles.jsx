import { useMarkdownEditor } from "../context/MarkdownEditorContext";

export default function NoFiles() {
  const { addMarkdownFile } = useMarkdownEditor();
  return (
    <div className="noFiles-container">
      <h1>Opps, you have no files</h1>
      <button onClick={addMarkdownFile} className="actionButton">
        + New Document
      </button>
    </div>
  );
}
