import { nextauthConfig } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import ProfileHeader from "./ProfileHeader";
import { User } from "@prisma/client";
import PostsGrid from "@/app/_components/PostsGrid";
import { PostAndRef } from "@/app/interfaces";

const page = async ({ params }: { params: { username: string } }) => {
  const user: User | null = await prisma.user.findUnique({
    where: { username: params.username },
  });
  if (!user) notFound();
  const posts = (await prisma.posts.findMany({
    where: { authorId: user.id },
    include: { author: true, postRef: { include: { author: true } } },
  })) as PostAndRef[];
  const session = await getServerSession(nextauthConfig);

  return (
    <Flex
      direction="column"
      gap="3"
    >
      <ProfileHeader
        user={user}
        postsCount={posts.length}
        session={session}
      />
      <PostsGrid
        posts={posts}
        isLoading={false}
      />
    </Flex>
  );
};

export default page;
