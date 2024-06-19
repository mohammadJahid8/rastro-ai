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
import { Dispatch, SetStateAction, useState } from "react";
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
    <nav className="w-full flex flex-col lg:flex-row justify-between items-center">
      {/* Mobile Brand and User Image */}
      <div className="flex justify-between items-center w-full lg:hidden">
        <Brand />
        <MobileUserMenu />
      </div>

      {/* Mobile Search Input */}
      <div className="flex lg:hidden w-full max-w-sm items-center space-x-2 mt-4 lg:mt-0">
        <SearchInput />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:items-center w-full lg:gap-16">
        <div className="flex items-center w-full lg:flex-1 lg:gap-20">
          <Brand />
          <SearchInput />
        </div>
        <div className="flex w-auto justify-end items-center gap-5 mt-4 lg:mt-0">
          <Button variant="default">Create an Account</Button>
          <LanguageSelect language={language} setLanguage={setLanguage} />
          <DesktopUserImage />
        </div>
      </div>
    </nav>
  );
};

// Brand Component
const Brand = () => (
  <div className="flex items-center justify-between gap-2">
    <Image src={primaryLogo} alt="rastro-ai" width={50} height={50} />
    <p className="text-3xl text-rastro-primary">Rastro</p>
  </div>
);

// Search Input Component
const SearchInput = () => (
  <div className="relative flex items-center w-full lg:w-auto">
    <Search className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
    <Input placeholder="Search" className="w-full lg:min-w-[20rem]" />
    <Button type="submit">
      <Camera />
    </Button>
  </div>
);

// Language Select Component
const LanguageSelect = ({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}) => (
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
);

// Mobile User Menu Component
const MobileUserMenu = () => (
  <div className="flex items-center gap-2">
    <UserImage />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button variant="default" size="sm">
              Create an Account
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="default" size="sm">
              Create an Account
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

// Desktop User Image Component
const DesktopUserImage = () => (
  <div className="hidden lg:block">
    <UserImage />
  </div>
);

// User Image Component
const UserImage = () => (
  <Button className="w-[44px] h-[44px] rounded-full relative">
    <Image src={userImg} alt="user" fill className="rounded-full" />
  </Button>
);

export default Navbar;
