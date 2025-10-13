import React from "react";

export interface ProjectProps {
    id: number;
    name: string;
    description: string;
    tags: string[];
}

const Project = ({id, name, description, tags}: ProjectProps) => {4

  if(id == -1) {
    return (
      <>
      <div className="h-full w-full shrink-0 rounded-3xl ">
        <div className="h-full w-full cursor-pointer hover:scale-105 ease-in-out duration-200 rounded-3xl bg-[#D9D9D9]/[.20]"></div>
        <div>+</div>
        <div className="text-white text-center text-l">{name}</div>
      </div>
    </>
    )
  }
  return (
    <>
      <div className="h-full w-full shrink-0 rounded-3xl ">
        <div className="h-full w-full cursor-pointer hover:scale-105 ease-in-out duration-200 rounded-3xl bg-[#D9D9D9]/[.20]"></div>
        <div className="text-white text-center text-l">{name}</div>
      </div>
    </>
  );
};

export default Project;
