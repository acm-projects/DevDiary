
// Goes back to the previous page when clicked without saving changes
function Cancel() {
  return (
    <button onClick={() => window.history.back()}  
        className="bg-[#011522]/50 text-white px-4 py-2 rounded-[7px] border-1 border-[#6A7278]/45 hover:bg-[#011522] cursor-pointer transition">
         Cancel
        </button>
  );
}

export default Cancel;