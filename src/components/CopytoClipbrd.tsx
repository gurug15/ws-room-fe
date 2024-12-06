import { useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa";

export default function CopyToClipboard({ text }:{text:string}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex items-center space-x-2">
    <div className="flex justify-between w-30 rounded-md overflow-auto h-10 bg-gray-700">
        <div className="w-10 py-2 px-4 mr-10  h-full">
          {text}
        </div>
    <button
        onClick={handleCopy}
        className={`flex items-center h-10 w-10 justify-center  text-sm font-medium rounded-md shadow-md transition ${
          copied
            ? "bg-green-500 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {copied ? (
          <>
            <FaCheck />
          </>
        ) : (
          <>
            <FaRegCopy  /> 
          </>
        )}
      </button>
    </div>
    </div>
  );
}
