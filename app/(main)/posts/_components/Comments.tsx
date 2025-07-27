"use client";
import ProfilePicture from "@/app/_components/ProfilePicture";
import { CommentAndAuthor } from "@/app/(main)/interfaces";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import NewComment from "./NewComment";
// @ts-ignore
import TimeDiff from "js-time-diff";
import Link from "next/link";
import DeletionAlert from "@/app/_components/DeletionAlert";
import axios from "axios";
import { ViewerContext } from "@/app/_providers/ViewerContext";
import { useRouter } from "next/navigation";
import useTheme from "next-theme";

const Comments = ({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: CommentAndAuthor[];
}) => {
  const { viewer } = useContext(ViewerContext);
  const router = useRouter();
  const { theme } = useTheme();
  const [comments, setComments] = useState<CommentAndAuthor[]>(initialComments);
  const deleteComment = async (commentId: string) => {
    await axios.delete("/api/comment/delete", { headers: { commentId } });
    setComments((prev) => prev.filter((cmnt) => cmnt.id !== commentId));
    router.refresh();
  };
  return (
    <Flex
      direction="column"
      gap="2"
      mx={{ initial: "2", sm: "8" }}
      my="5"
      style={{
        backgroundColor: "var(--accent-3)",
      }}
      className={"rounded-xl "}
    >
      {comments.map((comment) => (
        <Flex
          key={comment.id}
          gap="2"
          py="2"
          px="3"
          align="start"
          className={
            "border-b-4 " +
            (theme === "light" ? "border-white" : "border-slate-700")
          }
        >
          <Link href={"/profile/" + comment.author.username}>
            <ProfilePicture size="sm" user={comment.author} />
          </Link>
          <Flex direction="column" gap="2">
            <Link href={"/profile/" + comment.author.username}>
              <Text className="font-bold" size="2">
                {comment.author.name}
              </Text>
            </Link>
            <Text>{comment.text}</Text>
            <Flex gap="3" align="center">
              <Text color="gray" size="1">
                {TimeDiff(comment.date)}
              </Text>
              {viewer?.id === comment.author.id && (
                <DeletionAlert
                  action={() => deleteComment(comment.id)}
                  label="this comment"
                  trigger={
                    <Button variant="soft" size="1" color="red">
                      Delete
                    </Button>
                  }
                />
              )}
            </Flex>
          </Flex>
        </Flex>
      ))}

      <NewComment postId={postId} setComments={setComments} />
    </Flex>
  );
};

export default Comments;
