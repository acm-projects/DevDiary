import ArrowIcon from "../assets/sideArrow.png"; // adjust path if needed

function LogSideNavbar() {
  return (

    <>
        <div className="fixed left-[3.2vw] top-[12vh] w-[4vw] h-[85vh] bg-[#41b3a926] rounded-[7px] border border-solid border-[#ffffff33]">
            <img 
                src={ArrowIcon} 
                alt="arrow" 
                className="w-[1.5vw] h-auto m-5 cursor-pointer" 
             />
        </div>
    </>
  );

}

export default LogSideNavbar;