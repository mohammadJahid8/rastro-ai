'use client';
import Image from 'next/image';
import primaryLogo from '/public/logo/rastro-logo.jpg';
import userImg from '/public/logo/user.png';
import cameraPlus from '/public/logo/cameraPlus.jpg';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Ellipsis, LogOut, Search, XIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Dispatch, SetStateAction, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '../ui/dropdown-menu';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
const inter = Inter({ subsets: ['latin'] });
type Props = {};

const Navbar = (props: Props) => {
  const [language, setLanguage] = useState('En');
  const [img, setImg] = useState<Blob | MediaSource | null>(null);

  return (
    <div className='w-full flex flex-col lg:flex-row justify-between items-center'>
      {/* Mobile responsive starts */}
      <div className='flex justify-between items-center w-full lg:hidden '>
        <Brand />
        {/* User Avatar for Mobile */}
        <div className='lg:hidden flex items-center gap-2'>
          <UserAvatar />
          <div className=''>
            <UserDropdownMenu />
          </div>
        </div>
      </div>
      <div className='flex lg:hidden w-full items-center space-x-2 mt-10 lg:mt-0 lg:w-auto'>
        <UserInput img={img} setImg={setImg} />{' '}
      </div>
      {/* Mobile responsive ends */}

      {/* Desktop starts */}
      <div className='hidden lg:flex lg:justify-center lg:gap-12'>
        <div className='flex justify-between items-center w-full lg:flex-1 lg:gap-20'>
          <Brand />
        </div>
        <div className='flex w-full items-center space-x-2 mt-4 lg:mt-0 lg:w-auto'>
          <UserInput img={img} setImg={setImg} />
        </div>
      </div>
      <div className='hidden lg:flex w-full lg:w-auto lg:flex-1 justify-end items-center gap-5 mt-4 lg:mt-0'>
        <Button variant='default' className={'px-[12px] py-[9px]'}>
          Create an Account
        </Button>
        <LanguageSelect language={language} setLanguage={setLanguage} />
        <div className='hidden lg:block'>
          <UserAvatar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const UserDropdownMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Ellipsis />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <span className='text-sm font-semibold'>Saved Product</span>
        </DropdownMenuItem>
        <DropdownMenuItem className='block lg:hidden'>
          <span className='text-sm font-semibold text-red-600 inline-flex gap-2 items-center'>
            <LogOut className='w-4 h-4' />
            Logout
          </span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span className='text-sm font-semibold'>Language</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <span className='text-xs font-normal'>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className='text-xs font-normal'>French</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className='text-xs font-normal'>German</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

const UserAvatar = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className='w-[44px] h-[44px] rounded-full relative'>
        <Image src={userImg} alt='user' fill className='rounded-full' />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='hidden lg:block'>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <span className='text-sm font-semibold text-red-600 inline-flex gap-2 items-center'>
            <LogOut className='w-4 h-4' />
            Logout
          </span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

const Brand = () => (
  <div className='flex items-center justify-between gap-2'>
    <Image src={primaryLogo} alt='rastro-ai' width={44} height={44} />
    <p
      className={cn(
        'text-[34px] font-semibold text-rastro-primary',
        inter.className
      )}
    >
      Rastro
    </p>
  </div>
);

const LanguageSelect = ({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}) => (
  <Select value={language} onValueChange={setLanguage}>
    <SelectTrigger className='w-[50px] px-[8px] py-[10px]'>
      <SelectValue className='text-sm' placeholder='En' />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem className='text-sm' value='Fr'>
          Fr
        </SelectItem>
        <SelectItem className='text-sm' value='En'>
          En
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

const UserInput = ({
  img,
  setImg,
}: {
  img: Blob | MediaSource | null;
  setImg: any;
}) => {
  const handleRemoveImage = () => {
    setImg(null);
  };

  return (
    <>
      <div className='relative flex items-center w-full lg:w-[22rem]  xl:!w-[420px]'>
        <Search className='absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform' />
        <Input placeholder='Search' className='w-full' />
      </div>
      <div className='relative'>
        <input
          id='image'
          className='hidden'
          type='file'
          onChange={(e) => {
            //@ts-ignore
            setImg(e?.target?.files[0]);
          }}
        />
        {img ? (
          <div className='relative'>
            <div className='relative w-[42px] h-[42px]'>
              <Image
                src={URL.createObjectURL(img)}
                alt='uploaded'
                fill
                className='rounded'
              />
            </div>
            <button
              className='absolute -top-2 -right-1 bg-white rounded-full border border-black p-1'
              onClick={handleRemoveImage}
            >
              <XIcon className='h-4 w-4 text-black ' />
            </button>
          </div>
        ) : (
          <label htmlFor='image'>
            <Image src={cameraPlus} alt='upload' width={42} height={42} />
          </label>
        )}
      </div>
    </>
  );
};
