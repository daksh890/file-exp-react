import { useState } from "react";
import explorer from "./data/folderData";
import "./App.css";
import Folder from "./components/folder";
import useTraverseTree from "./hooks/use-traverse-tree";

export default function App() {
  const [expData, setExpData] = useState(explorer);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(expData, folderId, item, isFolder);
    setExpData(finalTree);
  };

  return (
    <div className="App">
      <Folder handleInsertNode={handleInsertNode} explorer={expData} />
    </div>
  );
}
