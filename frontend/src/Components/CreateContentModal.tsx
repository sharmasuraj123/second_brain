import { useState } from "react";
import { CrossIcon } from "../icons/CrossIcons";
import { Button } from "./Button";
import { Input } from "./Input";

interface ContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: ContentModalProps) {
  return (
    <div onClick={onClose}>
      {open && (
        <div className="z-50 w-screen h-screen bg-slate-500 fixed top-0 left-0 bg-slate-500/60 flex justify-center">
          <div
            onClick={(e) => e.stopPropagation()}
             className=" flex flex-col justify-center"
          >
            <span className="bg-white opacity-100 p-4 rounded  ">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input
                  placeholder={"Title"}
                  onChange={(e) => console.log(e.target.value)}
                />
                <Input
                  placeholder={"Link"}
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <Button varient="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


