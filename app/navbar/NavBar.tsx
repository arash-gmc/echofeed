"use client";
import { Container, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ProfilePicture from "../_components/ProfilePicture";
import Search from "../_components/Search";
import NotificationsMenu from "../notifications/NotificationMenu";
import { Context } from "../_providers/Context";
import MessageMenu from "../messages/MessageMenue";

const NavBar = () => {
  const { viewer } = useContext(Context);
  const [userMenu, setUserMenu] = useState(false);
  const router = useRouter();
  return (
    <>
      <nav
        className="border-b-2 p-2 h-16 fixed w-full z-10 opacity-95 "
        style={{ background: "var(--accent-3)" }}
      >
        <Container>
          <Flex
            justify="between"
            className="text-sm text-gray-700"
          >
            <Flex>
              <Link href="/">
                <Text
                  size="6"
                  className="font-bold"
                >
                  Suci
                </Text>
              </Link>
            </Flex>
            <Flex
              gap="5"
              align="center"
            >
              {viewer && (
                <>
                  <MessageMenu userId={viewer.id} />
                  <NotificationsMenu userId={viewer.id} />
                </>
              )}
              <Search
                onUserClick={(user) => router.push("/profile/" + user.username)}
                searchPosts={true}
              />
              {viewer && (
                <Flex
                  onClick={() => setUserMenu((prev) => !prev)}
                  className="relative cursor-pointer"
                >
                  <ProfilePicture
                    size="sm"
                    user={viewer}
                  />
                  <Flex
                    direction="column"
                    display={userMenu ? "flex" : "none"}
                    gap="3"
                    p="2"
                    className="absolute top-12 left-0 w-48 bg-white text-lg min-w-max"
                  >
                    <Flex
                      direction="column"
                      className="border-b-2"
                    >
                      <Text>{viewer.name}</Text>
                      <Text
                        size="2"
                        color="gray"
                      >
                        @{viewer.username}
                      </Text>
                    </Flex>
                    <Link
                      className="border-b-2"
                      href={"/profile/" + viewer.username}
                    >
                      Profile
                    </Link>
                    <Link
                      className="border-b-2"
                      href={"/api/auth/signout"}
                    >
                      Sign Out
                    </Link>
                  </Flex>
                </Flex>
              )}
              {!viewer && (
                <>
                  <Link href="/api/auth/signin">SignIn</Link>
                  <Link href="/register">Register</Link>
                </>
              )}
            </Flex>
          </Flex>
        </Container>
      </nav>
      <div className="h-20 w-full"></div>
    </>
  );
};

export default NavBar;
