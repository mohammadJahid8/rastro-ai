"use client";
import Image from "next/image";
import primaryLogo from "/public/logo/rastro-logo.jpg";
import userImg from "/public/logo/user.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Camera, EllipsisVertical, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {};

const Navbar = (props: Props) => {
  const [language, setLanguage] = useState("En");

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between items-center">
      <div className="flex justify-between items-center w-full lg:hidden ">
        <div className="flex items-center justify-between gap-2">
          <Image src={primaryLogo} alt="rastro-ai" width={50} height={50} />
          <p className="text-3xl text-rastro-primary">Rastro</p>
        </div>
        <div className="lg:hidden flex items-center gap-2">
          <Button className=" w-[44px] h-[44px] rounded-full relative">
            <Image src={userImg} alt="user" fill className="rounded-full" />
          </Button>
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Button variant="default" size={"sm"}>
                      Create an Account
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button variant="default" size={"sm"}>
                      Create an Account
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex lg:hidden w-full max-w-sm items-center space-x-2 mt-4 lg:mt-0 lg:w-auto">
        <div className="relative flex items-center w-full lg:w-auto">
          <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
          <Input placeholder="Search" className="w-full" />
        </div>
        <Button type="submit">
          <Camera />
        </Button>
      </div>
      <div className="hidden lg:flex lg:justify-center lg:gap-16">
        <div className="flex justify-between items-center w-full lg:flex-1 lg:gap-20">
          <div className="flex items-center justify-between gap-2">
            <Image src={primaryLogo} alt="rastro-ai" width={50} height={50} />
            <p className="text-3xl text-rastro-primary">Rastro</p>
          </div>
          <div className="lg:hidden flex items-center gap-2">
            <Button className=" w-[44px] h-[44px] rounded-full relative">
              <Image src={userImg} alt="user" fill className="rounded-full" />
            </Button>
            <div className="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Button variant="default" size={"sm"}>
                        Create an Account
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button variant="default" size={"sm"}>
                        Create an Account
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center space-x-2 mt-4 lg:mt-0 lg:w-auto">
          <div className="relative flex items-center w-full lg:w-auto">
            <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <Input placeholder="Search" className="min-w-[20rem]" />
          </div>
          <Button type="submit">
            <Camera />
          </Button>
        </div>
      </div>
      <div className="hidden lg:flex w-full lg:w-auto lg:flex-1 justify-end items-center gap-5 mt-4 lg:mt-0">
        <Button variant="default">Create an Account</Button>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-20">
            <SelectValue placeholder="En" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Fr">Fr</SelectItem>
              <SelectItem value="En">En</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div id="img" className="hidden lg:block">
          <Button className="w-[44px] h-[44px] rounded-full relative">
            <Image src={userImg} alt="user" fill className="rounded-full" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
