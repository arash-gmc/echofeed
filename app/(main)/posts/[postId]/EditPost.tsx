"use client";
import ProfilePicture from "@/app/_components/ProfilePicture";
import { ViewerContext } from "@/app/_providers/ViewerContext";
import { Popover, Flex, Box, TextArea, Button, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

interface Props {
  initialText: string | null;
  authorId: string;
  postId: string;
}

const EditPost = ({ authorId, initialText, postId }: Props) => {
  const { viewer } = useContext(ViewerContext);
  const [editedText, setEditedText] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (initialText) setEditedText(initialText);
  }, [initialText]);
  const applyEdit = async () => {
    if (initialText === editedText) return;
    await axios.patch("/api/post/edit", { postId, newText: editedText });
    router.refresh();
  };
  if (!viewer || viewer.id !== authorId) return null;
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="outline" color="amber">
          <Text size="5" color="amber">
            <CiEdit />
          </Text>
        </Button>
      </Popover.Trigger>
      <Popover.Content style={{ width: 360 }}>
        <Flex gap="3">
          <Flex align="start">
            <ProfilePicture user={viewer} size="sm" />
          </Flex>
          <Box grow="1">
            <TextArea
              placeholder="Post Text..."
              style={{ height: 80 }}
              value={editedText}
              onChange={(e) => setEditedText(e.currentTarget.value)}
            />
            <Flex gap="3" mt="3" justify="between">
              <Popover.Close>
                <Button size="1" variant="outline">
                  Cancel
                </Button>
              </Popover.Close>
              <Popover.Close>
                <Button
                  size="1"
                  onClick={() => applyEdit()}
                  disabled={!editedText}
                >
                  Save
                </Button>
              </Popover.Close>
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default EditPost;
