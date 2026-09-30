import { Heading } from "@/components/Heading";
import NextLink from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-dvh p-15 bg-background">
      <Heading>spencer raymond</Heading>
      <div className=" font-mono text-sm font-light">
        <p>nothing here.</p>
        <ul className="mt-6">
          <li>
            <NextLink href="/" className="nav-link">
              home
            </NextLink>
          </li>
        </ul>
      </div>
    </main>
  );
}
