function Editor() {
  return (

    <div className="w-full h-full flex flex-col p-4">

      <div className="flex-grow bg-[#011422] rounded-[10px] border border-[#6A7278]/65">
        <textarea
          className="w-full h-full p-4 bg-transparent text-white text-[16px] leading-6 resize-none outline-none"
          placeholder="Start writing your log here..."
        />
      </div>
    </div>
  );
}

export default Editor;