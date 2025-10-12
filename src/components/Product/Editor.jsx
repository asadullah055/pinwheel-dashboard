import JoditEditor from "jodit-react";
import { useRef } from "react";

const Editor = ({ description, setDescription, id }) => {
  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Enter product description",
    showPoweredBy: false,
    toolbarAdaptive: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarSticky: false,

    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "undo",
      "redo",
      "fontsize",
      "paragraph",
      "brush",
      "table",
    ],
  };

  return (
    <JoditEditor
      ref={editor}
      id={id}
      value={description}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setDescription(newContent)}
    />
  );
};

export default Editor;
