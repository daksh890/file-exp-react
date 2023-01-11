import { useState } from "react";

function Folder({ handleInsertNode, explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const onAdd = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁 {explorer.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>📁 +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>📄 +</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onKeyDown={onAdd}
                onBlur={() => setShowInput({ ...setShowInput, visible: false })}
                className="inputContainer__input"
                autoFocus
              />
            </div>
          )}
          {explorer.items.map((exp, key) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                explorer={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
}
export default Folder;
