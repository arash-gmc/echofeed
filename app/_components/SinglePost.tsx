import { Container, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { PostAndRef } from "../interfaces";
import PostFooter from "./PostFooter";
import ProfilePicture from "./ProfilePicture";
import { FaRetweet } from "react-icons/fa6";

const SinglePost = ({ rawPost }: { rawPost: PostAndRef }) => {
  let post;
  if (rawPost.refId) {
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
          className="text-gray-500"
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
        mx="3"
        px="3"
        className="border-b-2 pb-6"
      >
        <Flex direction="column">
          <Link href={"/profile/" + author.username}>
            <ProfilePicture
              user={author}
              size="md"
            />
          </Link>
        </Flex>

        <Flex
          direction="column"
          gap="2"
          className="max-h-26 overflow-hidden"
          width="100%"
        >
          <Flex
            align="baseline"
            gap="2"
          >
            <Text
              size="4"
              className="font-bold"
            >
              {author.name}
            </Text>
            <Text
              size="1"
              color="gray"
            >
              @{author.username}
            </Text>
            <Text
              size="1"
              color="gray"
              ml="1"
            >
              1h
            </Text>
          </Flex>
          <Text>{post.text}</Text>
          <PostFooter postId={post.id} />
        </Flex>
      </Flex>
    </Container>
  );
};

export default SinglePost;
