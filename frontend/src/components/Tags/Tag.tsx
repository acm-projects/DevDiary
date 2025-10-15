import React from "react";

export interface TagProps {
    name: string;
    color: string;
    selected?: number;
}

const Project = ({name, color, selected}: TagProps) => {

  if(selected == 1) {   //selected
    return (
      <>
        <div className="h-full w-full shrink-0 rounded-lg flex justify-left items-center space-x-5" style={{backgroundColor: color}}>
          <svg className="lucide lucide-square-check-icon lucide-square-check pl-3" xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
          <p className="">{name}</p>
        </div>
      </>
    );
  } else if (selected == 0) {     //not selected
    return (
      <>
        <div className="h-full w-full shrink-0 rounded-lg flex justify-left items-center space-x-5" style={{backgroundColor: color}}>
          <svg className="lucide lucide-square-check-icon lucide-square-check pl-3" xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
          <p className="">{name}</p>
        </div>
      </>
    )
  } else {
    return (    //selected not set so don't display check box
      <>
        <div className="h-full w-full shrink-0 rounded-3xl px-3 flex items-center justify-center" style={{backgroundColor: color}}>
          <p className="text-center">{name}</p>
        </div>
      </>
    )
  }
};

export default Project;