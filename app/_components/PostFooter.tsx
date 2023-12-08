import React, { useContext, useEffect, useState } from "react";
import { Flex, Grid, Text } from "@radix-ui/themes";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { FaRegComment, FaRetweet } from "react-icons/fa6";
import { Context } from "../_providers/Context";
import axios from "axios";
import { PostsWithUsers } from "../interfaces";
import { ActionType } from "@prisma/client";

interface Counts {
  likes: number;
  dislikes: number;
  bookmarks: number;
  reposts: number;
}

interface Interactions {
  like: boolean;
  dislike: boolean;
  bookmark: boolean;
  repost: boolean;
}

const PostFooter = ({ post }: { post: PostsWithUsers }) => {
  const { viewer } = useContext(Context);
  const [counts, setCounts] = useState<Counts>({} as Counts);
  const [interactions, setInteractions] = useState<Interactions>(
    {} as Interactions
  );
  useEffect(() => {
    if (viewer)
      axios
        .get<Interactions>("/api/post/actions", {
          headers: { postId: post.id, userId: viewer?.id },
        })
        .then((res) => setInteractions(res.data))
        .catch((e) =>
          console.log("error during fetch user interactions".toUpperCase(), e)
        );
  }, [viewer]);
  useEffect(() => {
    axios
      .get<Counts>("/api/post/actions/counts", { headers: { postId: post.id } })
      .then((res) => setCounts(res.data));
  }, []);

  const doAction = (action: ActionType) => {
    axios
      .post("/api/post/actions", {
        userId: viewer?.id,
        postId: post.id,
        actionType: action,
      })
      .then((res) => {
        setCounts((prev) => ({
          ...prev,
          [action + "s"]:
            action === "like"
              ? prev.likes + 1
              : action === "dislike"
              ? prev.dislikes + 1
              : action === "bookmark"
              ? prev.bookmarks + 1
              : null,
        }));
        setInteractions((prev) => ({ ...prev, [action]: true }));
      });
  };

  const undoAction = (action: ActionType) => {
    axios
      .delete("/api/post/actions", {
        headers: {
          userId: viewer?.id,
          postId: post.id,
          actionType: action,
        },
      })
      .then((res) => {
        setCounts((prev) => ({
          ...prev,
          [action + "s"]:
            action === "like"
              ? prev.likes - 1
              : action === "dislike"
              ? prev.dislikes - 1
              : action === "bookmark"
              ? prev.bookmarks - 1
              : null,
        }));
        setInteractions((prev) => ({ ...prev, [action]: false }));
      });
  };
  const repost = () => {
    axios
      .post("/api/post/repost", { postId: post.id, userId: viewer?.id })
      .then((res) => {
        setCounts((prev) => ({ ...prev, reposts: prev.reposts + 1 }));
        setInteractions((prev) => ({ ...prev, repost: true }));
      });
  };

  const unrepost = () => {
    axios
      .delete("/api/post/repost", {
        headers: { postId: post.id, userId: viewer?.id },
      })
      .then((res) => {
        setCounts((prev) => ({ ...prev, reposts: prev.reposts - 1 }));
        setInteractions((prev) => ({ ...prev, repost: false }));
      });
  };

  const items = [
    {
      value: "like",
      done: interactions?.like,
      color: "text-blue-500",
      icon: interactions?.like ? <BiSolidLike /> : <BiLike />,
      count: counts?.likes,
      onClick: interactions?.like
        ? () => undoAction("like")
        : () => doAction("like"),
    },
    {
      value: "dislike",
      done: interactions?.dislike,
      color: "text-rose-600",
      icon: interactions?.dislike ? <BiSolidDislike /> : <BiDislike />,
      count: counts?.dislikes,
      onClick: interactions?.dislike
        ? () => undoAction("dislike")
        : () => doAction("dislike"),
    },
    {
      value: "repost",
      icon: <FaRetweet />,
      done: interactions.repost,
      color: "text-green-700",
      count: counts.reposts,
      onClick: () => (interactions.repost ? unrepost() : repost()),
    },
    {
      value: "comment",
      icon: <FaRegComment />,
      count: null,
      onClick: () => null,
    },
    {
      value: "bookmark",
      done: interactions?.bookmark,
      color: "text-amber-400",
      icon: interactions?.bookmark ? <GoBookmarkFill /> : <GoBookmark />,
      count: counts?.bookmarks,
      onClick: interactions?.bookmark
        ? () => undoAction("bookmark")
        : () => doAction("bookmark"),
    },
  ];
  if (!viewer) return null;

  return (
    <Flex
      justify="center"
      className="text-2xl text-gray-500"
      gap="8"
      align="center"
    >
      {items.map((item) => (
        <Flex
          align="center"
          className={
            "cursor-pointer " + (item.done ? item.color + " font-bold" : "")
          }
          key={item.value}
          onClick={(e) => item.onClick()}
        >
          <Text
            className="w-4 whitespace-nowrap"
            size="2"
          >
            {item.count ? item.count : null}
          </Text>
          <Text>{item.icon}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default PostFooter;
