import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import date from "date-and-time";

const MarkdownEditorContext = createContext();

const localStorageKey = "markdownFiles";

const now = new Date();

export function MarkdownEditorProvider({ children }) {
  const [markdownFiles, setMarkdownFiles] = useState(
    () => JSON.parse(localStorage.getItem(localStorageKey)) || []
  );

  const [currentFile, setCurrentFile] = useState(
    markdownFiles.length > 0 ? markdownFiles[0] : null
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(markdownFiles));
  }, [markdownFiles]);

  const addMarkdownFile = () => {
    const newFile = {
      id: uuidv4(),
      createdAt: date.format(now, "ddd, MMM DD YYYY"),
      title: "untitled.md",
      content: "# Hello, world!",
    };
    setMarkdownFiles([newFile, ...markdownFiles]);
    setCurrentFile(newFile);
  };

  const updateMarkdownFile = (event) => {
    const { name, value } = event.currentTarget;
    setCurrentFile({ ...currentFile, [name]: value });
  };

  const saveCurrentFile = () => {
    const currentId = currentFile.id;
    setMarkdownFiles(
      markdownFiles.map((file) => (file.id === currentId ? currentFile : file))
    );
  };

  const deleteFile = () => {
    const currentId = currentFile.id;
    const filteredFiles = markdownFiles.filter((file) => file.id !== currentId);
    setMarkdownFiles(filteredFiles);
    setCurrentFile(filteredFiles[0] || null);
  };

  const setCurrentFileById = (id) => {
    //when a new file is created or when a file is clicked on the side bar - set the currentFile to that
    const file = markdownFiles.find((file) => file.id === id);
    if (file) {
      setCurrentFile(file);
    } else {
      setCurrentFile(null);
    }
  };

  const validateFileName = (filename) => {
    if (filename.slice(-3) !== ".md") {
      return "File name must end with '.md'";
    }
    return null;
  };

  return (
    <MarkdownEditorContext.Provider
      value={{
        currentFile,
        markdownFiles,
        addMarkdownFile,
        updateMarkdownFile,
        setCurrentFileById,
        saveCurrentFile,
        deleteFile,
        validateFileName,
      }}
    >
      {children}
    </MarkdownEditorContext.Provider>
  );
}

export function useMarkdownEditor() {
  const context = useContext(MarkdownEditorContext);
  if (!context) {
    throw new Error("useMarkdownEditor must be used within a MarkdownEditorProvider");
  }
  return context;
}
