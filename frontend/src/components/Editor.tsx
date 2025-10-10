function Editor() {
  return ( 
    <div className="fixed top-[12vh] left-[6vw] right-[6vw] mx-auto w-[88vw] max-w-[1200px] h-[85vh] bg-[#41b3a926] rounded-[7px] border border-solid border-[#ffffff33] flex flex-col">
      
      <div className="fixed left-[12vw] top-[36vh] w-[76.25%] h-[58%] bg-[#011422] rounded-[10px] border border-[#6A7278]/65">
        {/* Text area for writing logs */}
        <textarea
          className="w-full h-full p-4 bg-transparent text-white text-[16px] leading-6 resize-none outline-none"
          placeholder="Start writing your log here..."
        />
      </div>
    </div>
  );
}

export default Editor;