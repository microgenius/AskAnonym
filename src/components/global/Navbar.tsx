"use client";

import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

import { classNames } from "@/src/helpers/tailwindHelper";
import { User } from "@/supabase/models";

import Button from "../common/button/Button";
import Avatar from "./Avatar";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <>
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            " bg-white dark:bg-slate-800 shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-12">
              <div className="relative flex items-center justify-self-center lg:gap-8 xl:grid xl:grid-cols-8">
                <Logo />
                <DarkModeToggle />
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="mx-auto flex max-w-3xl justify-between space-y-1 px-4 pt-2 pb-3 sm:px-4">
                <DarkModeToggle />
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
}

export default Navbar;
