"use cache";

import Image from "next/image";
import { site } from "@/content/site";

export default async function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="top container text-center">
        <div className="flogo">
          <Image src="/image/nasif-profile.jpg" alt={site.name} width={50} height={50} />
        </div>
        <h4>{site.name}</h4>
        <p>
          © {year}. All rights reserved by {site.name}.
        </p>
      </div>
    </footer>
  );
}
