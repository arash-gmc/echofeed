import SinglePost from "@/app/(main)/posts/_components/SinglePost";
import prisma from "@/prisma/client";
import { Box, Container } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import Comments from "../_components/Comments";
import PostBottom from "./PostBottom";

interface Props {
  params: { postId: string };
}

const PostDetails = async ({ params }: Props) => {
  const post = await prisma.posts.findUnique({
    where: { id: params.postId },
    include: { author: true },
  });

  const comments = await prisma.comment.findMany({
    where: { postRefId: params.postId },
    include: { author: true },
  });

  if (!post) notFound();
  return (
    <Container px="3">
      <Box pt={{ initial: "4", sm: "8" }}>
        <SinglePost rawPost={post} postDetail={true} />
        <PostBottom
          postId={params.postId}
          authorId={post.authorId}
          comments={comments}
          postText={post.text}
        />
        <Comments postId={params.postId} initialComments={comments} />
      </Box>
    </Container>
  );
};

export default PostDetails;
