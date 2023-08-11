import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ILogo {
  width?: number;
  height?: number;
}

function Logo({ width = 100, height = 40 }: ILogo) {
  return (
    <>
      <Link href="/" className="ml-6 xl:col-span-7">
        <Image
          src="/images/logo-yg.png"
          alt="cta"
          width={width}
          height={height}
        />
      </Link>
    </>
  );
}

export default Logo;
