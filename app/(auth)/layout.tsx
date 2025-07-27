import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Box, Flex, Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EchoFeed",
  description: "Let your vibe echo",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme accentColor="bronze" grayColor="gray" radius="large">
          <Flex
            className=" w-full sm:py-8 h-screen"
            justify={{ initial: "center", md: "start" }}
            pl={{ initial: "0", sm: "6" }}
            align="start"
            style={{
              backgroundImage: 'url("/auth-bg.webp")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              overflow: "hidden",
            }}
          >
            <Box
              className="p-6 sm:rounded-xl w-1/3 max-w-md min-w-fit z-10 max-xl:w-1/2 max-lg:w-full max-h-full max-sm:min-h-screen opacity-90"
              style={{
                backgroundColor: "var(--gray-3)",
                overflowY: "auto",
              }}
            >
              {children}
            </Box>
          </Flex>
        </Theme>
      </body>
    </html>
  );
}
