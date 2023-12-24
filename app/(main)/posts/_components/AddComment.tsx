"use client";
import { Popover, Button, Flex, Box, TextArea } from "@radix-ui/themes";
import React, { useContext, useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import axios from "axios";
import ProfilePicture from "@/app/_components/ProfilePicture";
import { Context } from "@/app/_providers/Context";

interface Props {
  postId: string;
  addCount: () => void;
  setStatus: () => void;
}

const AddComment = ({ postId, addCount, setStatus }: Props) => {
  const { viewer } = useContext(Context);
  const [commentText, setCommentText] = useState("");
  const sendComment = () => {
    axios
      .post("/api/comment/for-post", {
        authorId: viewer?.id,
        postId,
        text: commentText,
      })
      .then((res) => {
        addCount();
        setStatus();
      });
  };
  if (!viewer) return null;
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button>
          <FaRegComment />
        </button>
      </Popover.Trigger>
      <Popover.Content style={{ width: 360 }}>
        <Flex gap="3">
          <Flex>
            <ProfilePicture
              user={viewer}
              size="sm"
            />
          </Flex>
          <Box grow="1">
            <TextArea
              placeholder="Write a comment…"
              style={{ height: 80 }}
              onChange={(e) => setCommentText(e.currentTarget.value)}
            />
            <Flex
              gap="3"
              mt="3"
              justify="between"
            >
              <Popover.Close>
                <Button
                  size="1"
                  variant="outline"
                >
                  Cancel
                </Button>
              </Popover.Close>
              <Popover.Close>
                <Button
                  size="1"
                  onClick={() => sendComment()}
                  disabled={!commentText}
                >
                  Send Comment
                </Button>
              </Popover.Close>
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default AddComment;
