"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Badge, Flex, Grid, Text } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa6";
import { Context } from "../_providers/Context";
import { ChatContactsInfo } from "../api/message/users/route";
import { Notif } from "../interfaces";
import MiniNavbarRight from "./MiniNavbarRight";

export type Selected =
  | "profile"
  | "filter"
  | "message"
  | "notification"
  | "search";

const MiniNavbar = () => {
  const [expand, setExpand] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Selected>("profile");
  const { viewer } = useContext(Context);
  const [contacts, setContacts] = useState<ChatContactsInfo[]>([]);
  const [notifications, setNotifications] = useState<Notif[]>([]);
  useEffect(() => {
    if (viewer?.id)
      axios
        .get<ChatContactsInfo[]>("/api/message/new", {
          headers: { userId: viewer.id },
        })
        .then((res) => {
          setContacts(res.data);
        });
  }, [viewer]);
  useEffect(() => {
    if (viewer)
      axios
        .get<Notif[]>("/api/notification/new", {
          headers: { userId: viewer.id },
        })
        .then((res) => {
          setNotifications(res.data);
        });
  }, [viewer]);
  const items: { label: string; value: Selected; count?: number }[] = [
    { label: "Profile", value: "profile" },
    { label: "Filters", value: "filter" },
    { label: "Message", value: "message", count: contacts.length },
    {
      label: "Notif",
      value: "notification",
      count: notifications.length,
    },
    { label: "Search", value: "search" },
  ];
  if (!viewer) return null;
  return (
    <>
      <nav className="fixed z-10 bg-slate-100 opacity-95 w-full">
        <Flex
          direction="column"
          className=""
          width="100%"
        >
          <Flex
            justify="between"
            py="2"
            px="5"
          >
            <Text
              className="font-extrabold"
              size="6"
            >
              Suci
            </Text>
            <Text
              className="border-2 border-slate-400 rounded-lg p-2 cursor-pointer"
              onClick={() => setExpand((prev) => !prev)}
            >
              {expand && <FaArrowUp />}
              {!expand && <HamburgerMenuIcon />}
            </Text>
          </Flex>
          <Flex
            grow="1"
            width="100%"
            px={{ initial: "3", xs: "8" }}
            className={"overflow-hidden " + (expand ? "h-screen" : "h-0")}
          >
            <Flex
              direction="column"
              className="text-xl w-1/4 overflow-y-scroll min-w-max"
              gap="5"
              px={{ initial: "1", xs: "3" }}
              pt="5"
              align="start"
            >
              {items.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setSelectedItem(item.value)}
                >
                  <Text
                    className={
                      item.value === selectedItem ? "underline font-bold" : ""
                    }
                    size={{ initial: "3", xs: "4" }}
                  >
                    {item.label}
                    {!!item.count && <Badge>{item.count}</Badge>}
                  </Text>
                </button>
              ))}
            </Flex>
            <Flex
              className="w-3/4 border-l-2 h-5/6 overflow-y-scroll"
              px="2"
              pt="4"
            >
              <MiniNavbarRight
                selected={selectedItem}
                viewer={viewer}
                contacts={contacts}
                notifications={notifications}
                close={() => setExpand(false)}
              />
            </Flex>
          </Flex>
        </Flex>
      </nav>
      <div className="w-full h-14"></div>
    </>
  );
};

export default MiniNavbar;
