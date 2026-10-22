"use cache";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { site } from "@/content/site";

export default async function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="my-[2%] pb-[2%]">
      <Container className="mt-20 text-center">
        <div className="mx-auto mt-[22px] w-[50px] cursor-pointer">
          <Image
            src="/image/nasif-profile.jpg"
            alt={site.name}
            width={50}
            height={50}
            className="size-[50px] rounded-full"
          />
        </div>
        <h4>{site.name}</h4>
        <p className="mt-2.5">
          © {year}. All rights reserved by {site.name}.
        </p>
      </Container>
    </footer>
  );
}
