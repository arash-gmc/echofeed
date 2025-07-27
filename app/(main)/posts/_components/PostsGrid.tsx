import React from "react";
import SinglePost from "./SinglePost";
import { Flex, Heading } from "@radix-ui/themes";
import { PostAndAuthor, PostAndRef } from "@/app/(main)/interfaces";

interface Props {
  posts: PostAndRef[] | PostAndAuthor[];
  isLoading: boolean;
}

const PostsGrid = ({ posts, isLoading }: Props) => {
  if (isLoading) return null;
  if (posts.length === 0)
    return (
      <Flex justify="center" m="5" className="h-screen">
        <Heading>There is no post to show.</Heading>
      </Flex>
    );
  return (
    <Flex direction="column" gap={{ initial: "2", sm: "4" }} my="3">
      {posts.map((post) => (
        <SinglePost rawPost={post} key={post.id} />
      ))}
    </Flex>
  );
};

export default PostsGrid;
