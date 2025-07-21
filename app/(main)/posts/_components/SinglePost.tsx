import { Badge, Box, Container, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { PostAndAuthor, PostAndRef } from "../../interfaces";
import PostFooter from "./PostFooter";
import ProfilePicture from "../../../_components/ProfilePicture";
import { FaRetweet } from "react-icons/fa6";
import TextCompress from "@/app/_components/TextCompress";
import { HiDotsHorizontal, HiDotsVertical } from "react-icons/hi";
// @ts-ignore
import TimeDiff from "js-time-diff";

interface Props {
  rawPost: PostAndRef | PostAndAuthor;
  postDetail?: boolean;
}

const SinglePost = ({ rawPost, postDetail }: Props) => {
  let post;
  if (rawPost.refId && "postRef" in rawPost) {
    post = rawPost.postRef;
  } else {
    post = rawPost;
  }

  const author = post.author;
  return (
    <Container>
      {rawPost.refId && (
        <Flex
          align="center"
          gap="1"
          color="gray"
          ml="5"
          my="1"
          style={{ color: "var(--gray-10)" }}
        >
          <FaRetweet />
          <Link href={"/profile/" + rawPost.author.username}>
            {rawPost.author.name}
          </Link>
          <Text>repost this.</Text>
        </Flex>
      )}
      <Flex
        gap="3"
        mx={{ initial: "0", xs: "3" }}
        px="2"
        className="border-2 rounded-2xl pt-3 pb-2 shadow-lg"
        style={{
          borderColor: "var(--gray-5)",
          backgroundColor: "var(--gray-1)",
        }}
      >
        <Flex direction="column">
          <Link href={"/profile/" + author.username}>
            <ProfilePicture user={author} size="md" />
          </Link>
        </Flex>

        <Flex
          direction="column"
          gap="2"
          className="max-h-26 overflow-hidden"
          width="100%"
        >
          <Flex justify="between">
            <Flex
              align={{ initial: "start", xs: "baseline" }}
              gap={{ initial: "0", xs: "2" }}
              direction={{ initial: "column", xs: "row" }}
            >
              <Link href={"/profile/" + author.username}>
                <Text size="4" className="font-bold whitespace-nowrap">
                  {author.name}
                </Text>
              </Link>
              <Text size="1" style={{ color: "var(--gray-9)" }} ml="1">
                @{author.username}
              </Text>
            </Flex>
            <Flex align="center" mx={{ initial: "1", sm: "5" }}>
              <Flex
                direction={{ initial: "column-reverse", xs: "row" }}
                align="end"
              >
                {post.isEdited && <Badge variant="soft">Edited</Badge>}
                <Text size="1" color="gray" ml="1">
                  {TimeDiff(post.date)}
                </Text>
              </Flex>
              {!postDetail && (
                <Text ml="3" style={{ color: "var(--accent-10)" }}>
                  <Link href={"/posts/" + post.id}>
                    <HiDotsHorizontal />
                  </Link>
                </Text>
              )}
            </Flex>
          </Flex>

          <Box width="100%" pb="2" className="text-sm sm:text-base">
            {postDetail ? (
              <Text>{post.text}</Text>
            ) : (
              <TextCompress compressSize={200} moreLink={"/posts/" + post.id}>
                {post.text}
              </TextCompress>
            )}
          </Box>

          <PostFooter postId={post.id} />
        </Flex>
      </Flex>
    </Container>
  );
};

export default SinglePost;
