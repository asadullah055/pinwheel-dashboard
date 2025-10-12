import JoditEditor from "jodit-react";
import { useRef } from "react";

const Highlights = ({ setShortDescription, shortDescription, id }) => {
  const editor2 = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Please input",
    showPoweredBy: false,
    toolbarAdaptive: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarSticky: false,
    buttons: ["ul"],
  };

  return (
    <JoditEditor
      ref={editor2}
      id={id}
      value={shortDescription || ""}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setShortDescription(newContent)}
    />
  );
};

export default Highlights;
