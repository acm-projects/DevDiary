import React from "react";
import Tag from "../Tags/Tag.tsx"
import type {TagProps} from "../Tags/Tag.tsx"
import StatusTag from "components/StatusTag.tsx";
import { useNavigate } from "react-router-dom";

export interface ProjectPopUpProps {
    id: number;
    name: string;
    description: string;
    tags: TagProps[];
    status: string;
    image: any;
    emoji: string;
    show: boolean;
    onClose?: () => void;
} 

const ProjectPopUp = ({id, name, description, tags, status, image, emoji, show, onClose}: ProjectPopUpProps,) => {
  if (!show) return null;
  const navigate = useNavigate();
  // console.log("image: "+image);

  
  const handleClick = (id: number) => {
      navigate('/projects/'+id); 
    }

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#011522] p-3 rounded-3xl shadow-lg w-1/3 aspect-[2/1] ">
        <div className="flex flex-col justify-between mx-auto h-full w-full">
          <div className="text-white text-left text-2xl text-nowrap ">
            <div className="flex justify-between">
              <div className="aspect-square w-3/14 rounded-full bg-teal-500/20 mx-2 my-2 flex justify-center items-center text-6xl flex-none truncate">
                {emoji}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="max-w-full pr-2 line-clamp-2">
                    {name}
                  </p>
                  <div className="flex gap-4 flex-shrink-0">
                    <svg
                      onClick={() => navigate('/edit-project/' + id)} 
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil hover:cursor-pointer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                    <svg
                      onClick={onClose}
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x hover:cursor-pointer"><path d="M3 3 L21 21" /><path d="M3 21 L21 3" /></svg>
                  </div>
                </div>
                <div>
                  <StatusTag status={status}/>
                </div>
                <div className="text-gray-100 text-sm text-left text-wrap flex-none line-clamp-2 pt-3">
                  {description}
                </div>
              </div>
            </div>
          </div>

          

          <div className="grid grid-cols-4 justify-items-center w-full gap-y-2">
            {tags.slice(0,8).map((tag) => (
              <span key={tag.name} className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400">
                <Tag 
                  name={tag.name}
                  selected={-1}
                />
              </span>
            ))}

            
          </div>
        {tags.length==0 && 
            <div className="text-xs text-center text-cyan-300 text-nowrap">
              No Logs Yet | Add some logs to generate tags
            </div>  
          }
          <div className="flex justify-center align-middle">
            <button className="bg-[#244F51] bg-opacity-20 w-[155px] h-[35px] ml-1.5 mr-1.5 rounded-xl hover:scale-105 ease-in-out duration-200"
              onClick={(e) => handleClick(id)}
            >
              View Logs
            </button>
            {/* <button className="bg-[#244F51] bg-opacity-20 w-[155px] h-[35px] ml-1.5 mr-1.5 rounded-xl hover:scale-105 ease-in-out duration-200"
              onClick={(e) => navigate('/edit-project/'+id)}
            >
              Edit Project
            </button> */}
          </div>
        </div> 
      </div>
        {/* <div className="flex flex-row bg-[#011522]">
        <div className="p-3">
          {image && (<img src={image} alt="alt text" className="rounded-3xl aspect-square"/>)}
          {!image && (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-folder-icon lucide-folder"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>)}
        </div>

        <div className="flex flex-col justify-between py-5">
 <div className="text-white text-center text-2xl text-nowrap">
          {name}
          <span><StatusTag status={status}/></span>
        </div>
        <div className="text-gray-100 text-lg text-left px-4 truncate">
          {description}
        </div>

        <div className="grid grid-cols-3 justify-items-center w-full gap-y-2">
          {tags.map((tag) => (
            <span key={tag.name} className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400">
              <Tag 
                name={tag.name}
                selected={-1}
              />
            </span>
          ))}
        </div>
        
        <div className="flex justify-center align-middle mb-4">
          <button className="bg-[#244F51] bg-opacity-20 w-[155px] h-[35px] ml-1.5 mr-1.5 rounded-xl hover:scale-105 ease-in-out duration-200"
            onClick={(e) => handleClick(name)}
          >
            View Logs
          </button>
          <button className="bg-[#244F51] bg-opacity-20 w-[155px] h-[35px] ml-1.5 mr-1.5 rounded-xl hover:scale-105 ease-in-out duration-200"
            onClick={onClose}
          >
            View Logs
          </button>
        </div>
        </div> 
      </div>*/}

      </div>
    </>
  );
};

export default ProjectPopUp;
