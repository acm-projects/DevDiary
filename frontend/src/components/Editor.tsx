function Editor() {
  return (

<<<<<<< HEAD
    <div className="w-full h-full flex flex-col">
      <label htmlFor="" className="block text-left text-md font-medium mb-2 text-red-500">Error</label>
      <div className="flex-grow bg-[#000000] rounded-[10px] border border-[#ff0000]">
        <input
          className="w-full p-4 bg-transparent text-white text-[16px] leading-6 resize-none outline-none"
          placeholder="Error message..."
=======
    <div className="w-full h-full flex flex-col p-4">

      <div className="flex-grow bg-[#011422] rounded-[10px] border border-[#6A7278]/65">
        <textarea
          className="w-full h-full p-4 bg-transparent text-white text-[16px] leading-6 resize-none outline-none"
          placeholder="Start writing your log here..."
>>>>>>> Updated_Home
        />
      </div>
    </div>
  );
}

export default Editor;