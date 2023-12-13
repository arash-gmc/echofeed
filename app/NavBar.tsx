"use client";
import { Container, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import Search from "./_components/Search";
import { useContext } from "react";
import { Context } from "./_providers/Context";
import NotificationsList from "./Notifications";
import { FaEnvelope } from "react-icons/fa6";

const NavBar = () => {
  const { viewer } = useContext(Context);
  const AuthLinks = () => {
    if (viewer)
      return (
        <>
          <Link href={"/profile/" + viewer?.username}>{viewer?.name}</Link>
          <Link href="/messages">
            <Text size="5">
              <FaEnvelope />
            </Text>
          </Link>
          <NotificationsList userId={viewer.id} />
          <Link href="/api/auth/signout">Sign Out</Link>
        </>
      );
    if (!viewer)
      return (
        <>
          <Link href="/api/auth/signin">SignIn</Link>
          <Link href="/register">Register</Link>
        </>
      );
  };

  return (
    <nav className="border-b-2 p-2">
      <Container>
        <Flex
          justify="between"
          className="text-sm text-gray-700"
        >
          <Flex>
            <Link href="/">Home</Link>
          </Flex>
          <Flex
            gap="5"
            align="center"
          >
            <Search />
            <AuthLinks />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
