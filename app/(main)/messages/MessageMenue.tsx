"use client";
import { Popover, Flex, Text, Badge } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import ProfilePicture from "../../_components/ProfilePicture";
import axios from "axios";
import { ChatContactsInfo } from "../../api/message/users/route";
import { FaEnvelope } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
}
const MessageMenu = ({ userId }: Props) => {
  const [items, setItems] = useState<ChatContactsInfo[]>([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (userId)
      axios
        .get<ChatContactsInfo[]>("/api/message/new", { headers: { userId } })
        .then((res) => {
          setItems(res.data);
          setCount(res.data.length);
        });
  }, [userId]);
  const router = useRouter();
  return (
    <div className="relative">
      {!!count && (
        <div className="absolute -right-3 -top-3">
          <Badge
            color="red"
            className="rounded-full"
          >
            {count}
          </Badge>
        </div>
      )}
      <Popover.Root>
        <Popover.Trigger>
          <button>
            <Text size="6">
              <FaEnvelope />
            </Text>
          </button>
        </Popover.Trigger>
        <Popover.Content style={{ width: 320 }}>
          <Flex direction="column">
            {items.map((item) => (
              <Popover.Close key={item.user.id}>
                <button
                  onClick={() => {
                    router.push("/messages?contactId=" + item.user.id);
                    setCount((prev) => prev - 1);
                  }}
                >
                  <Flex
                    align="center"
                    gap="2"
                    py="2"
                    justify="between"
                    className="border-b-2"
                  >
                    <Flex
                      gap="2"
                      align="center"
                    >
                      <ProfilePicture
                        size="sm"
                        user={item.user}
                      />
                      <Flex direction="column">
                        <Text className="font-bold">{item.user.name}</Text>
                        <Text
                          color="gray"
                          size="2"
                        >
                          {item.lastMessage}
                        </Text>
                      </Flex>
                    </Flex>
                    <Badge>{item.unseens}</Badge>
                  </Flex>
                </button>
              </Popover.Close>
            ))}
            {count === 0 ? (
              <Flex
                justify="center"
                pb="3"
                className="border-b-2"
              >
                You have no new messages.
              </Flex>
            ) : null}
            <Popover.Close>
              <button
                className="font-bold py-1 justify-center"
                onClick={() => router.push("/messages")}
              >
                Go to Message Box
              </button>
            </Popover.Close>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

export default MessageMenu;
