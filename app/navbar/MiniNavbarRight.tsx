import React, { useContext } from "react";
import { Selected } from "./MiniNavbar";
import { Flex, Text } from "@radix-ui/themes";
import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfilePicture from "../_components/ProfilePicture";
import Search from "../_components/Search";
import { ChatContactsInfo } from "../api/message/users/route";
import Filter from "../filter/Filter";
import { Notif } from "../interfaces";
import MessageMini from "./MessageMini";
import NotifMini from "./NotifMini";
import { Context } from "../_providers/Context";

interface Props {
  selected: Selected;
  viewer: User;
  contacts: ChatContactsInfo[];
  notifications: Notif[];
  close: () => void;
}

const MiniNavbarRight = ({
  selected,
  viewer,
  contacts,
  notifications,
  close,
}: Props) => {
  const { setWhere } = useContext(Context);
  const router = useRouter();
  if (selected === "profile")
    return (
      <Flex
        align="center"
        gap="5"
        direction="column"
        pt="5"
        width="100%"
      >
        <ProfilePicture
          size="lg"
          user={viewer}
        />

        <Flex
          direction="column"
          className="text-xl text-slate-600"
          gap="5"
          width="100%"
        >
          <Flex direction="column">
            <Text>{viewer.name}</Text>
            <Text
              size="1"
              color="gray"
            >
              @{viewer.username}
            </Text>
          </Flex>
          <Link
            href={"/profile/" + viewer.username}
            onClick={() => close()}
          >
            Go to Profile
          </Link>
          <Link
            href="#"
            onClick={() => close()}
          >
            Edit Profile
          </Link>
          <Link href="/api/auth/signout">Sign Out</Link>
        </Flex>
      </Flex>
    );
  if (selected === "filter")
    return (
      <Flex
        justify="center"
        width="100%"
      >
        <Filter setWhere={setWhere} />
      </Flex>
    );
  if (selected === "message")
    return (
      <MessageMini
        contacts={contacts}
        close={close}
      />
    );
  if (selected === "notification")
    return (
      <NotifMini
        notifications={notifications}
        close={close}
      />
    );
  if (selected === "search")
    return (
      <Flex pt="4">
        <Search
          onUserClick={(user) => {
            router.push("/profile/" + user.username);
            close();
          }}
          searchPosts={true}
          onSearchPosts={() => close()}
        />
      </Flex>
    );
  return null;
};

export default MiniNavbarRight;
