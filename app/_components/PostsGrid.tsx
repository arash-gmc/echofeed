import React from "react";
import { PostsWithUsers } from "../interfaces";
import SinglePost from "./SinglePost";
import { Flex, Heading } from "@radix-ui/themes";
import Spinner from "./Spinner";

interface Props {
  posts: PostsWithUsers[];
  isLoading: boolean;
}

const PostsGrid = ({ posts, isLoading }: Props) => {
  if (isLoading)
    return (
      <Flex justify="center" align="end" height="9">
        <Spinner />
      </Flex>
    );
  if (posts.length === 0)
    return (
      <Flex justify="center" m="5">
        <Heading>There is no post to show.</Heading>
      </Flex>
    );
  return (
    <Flex direction="column" gap="3">
      {posts.map((post) => (
        <SinglePost post={post} key={post.id} />
      ))}
    </Flex>
  );
};

export default PostsGrid;
