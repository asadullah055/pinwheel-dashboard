import JoditEditor from "jodit-react";
import { useCallback, useMemo, useRef } from "react";

const EMPTY_BULLET_LIST = "<ul><li><br></li></ul>";

const ensureBulletMode = (editor) => {
  if (!editor?.editor) return;

  const visibleText = editor.editor.textContent
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim();

  if (visibleText) return;

  let listItem = editor.editor.querySelector("ul > li");

  if (!listItem) {
    editor.editor.innerHTML = EMPTY_BULLET_LIST;
    listItem = editor.editor.querySelector("ul > li");
  }

  const currentNode = editor.s.current();
  const currentElement =
    currentNode?.nodeType === Node.TEXT_NODE
      ? currentNode.parentElement
      : currentNode;

  if (!currentElement?.closest?.("li") && listItem) {
    editor.s.setCursorIn(listItem, true);
  }
};

const ensureCurrentLineIsBullet = (editor) => {
  const currentNode = editor?.s.current();
  const currentElement =
    currentNode?.nodeType === Node.TEXT_NODE
      ? currentNode.parentElement
      : currentNode;

  if (!currentElement?.closest?.("li")) {
    editor?.execCommand("insertUnorderedList");
  }
};

const Highlights = ({ setShortDescription, shortDescription, id }) => {
  const editor2 = useRef(null);

  const handleEditorReady = useCallback((editor) => {
    editor2.current = editor;

    const enforceBulletBeforeInput = (event) => {
      if (
        event.inputType === "insertText" ||
        event.inputType === "insertParagraph"
      ) {
        ensureBulletMode(editor);
      }
    };

    editor.editor.addEventListener(
      "beforeinput",
      enforceBulletBeforeInput,
      true,
    );
    editor.e.on("beforeEnter.autoBullet", () => {
      ensureCurrentLineIsBullet(editor);
    });
    editor.e.on("beforeDestruct.autoBullet", () => {
      editor.editor.removeEventListener(
        "beforeinput",
        enforceBulletBeforeInput,
        true,
      );
    });
  }, []);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Please input",
      showPoweredBy: false,
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarSticky: false,
      buttons: ["ul"],
      events: {
        afterInit: ensureBulletMode,
      },
    }),
    [],
  );

  return (
    <JoditEditor
      ref={editor2}
      id={id}
      value={shortDescription || EMPTY_BULLET_LIST}
      config={config}
      editorRef={handleEditorReady}
      tabIndex={1}
      onBlur={(newContent) => setShortDescription(newContent)}
    />
  );
};

export default Highlights;
