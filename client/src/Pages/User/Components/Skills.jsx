import React, { useState } from "react";
import styles from "../User.module.css";
import { IoCloseSharp as CloseIcon } from "react-icons/io5";

const Skills = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    if (key === "Enter") {
      e.preventDefault();
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  return (
    <>
      <div className=" w-2/5">
        <h1 className="text-lg font-medium">Skills</h1>
      </div>

      <div className="w-11/12 lg:w-4/5">
        <div className="flex flex-wrap">
          {tags &&
            tags.map((tag, i) => (
              <div
                className=" bg-slate-200 w-fit py-1 px-3 rounded m-1 text-lg flex"
                key={tag}
              >
                {tag}
                <button onClick={() => deleteTag(i)} className=" ml-3">
                  <CloseIcon />
                </button>
              </div>
            ))}
        </div>
        <input
          className={styles.input}
          placeholder="e.g. Python, React"
          value={input}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default Skills;
