"use client";
import { User } from "@prisma/client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, TextField, Text, Flex } from "@radix-ui/themes";
import axios from "axios";
import React, { useRef, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Search = () => {
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
    if (searchText) {
      axios
        .get<User[]>("/api/user/search/" + searchText)
        .then((res) => setSearchedUsers(res.data));
    } else {
      setSearchedUsers([]);
    }
  };
  return (
    <Box className="relative">
      <TextField.Root>
        <TextField.Input
          placeholder="Search Users"
          type="text"
          onChange={onSearch}
          value={searchText}
        />
        <TextField.Slot>
          <MagnifyingGlassIcon
            height="16"
            width="16"
          />
        </TextField.Slot>
      </TextField.Root>
      {searchText && (
        <Flex
          className="absolute bg-white w-full z-10"
          direction="column"
        >
          {searchedUsers.map((user) => (
            <Flex
              key={user.id}
              gap="2"
              align="center"
              className="border-b-2 py-3 cursor-pointer"
              onClick={() => {
                router.push("/profile/" + user.username);
                setSearchText("");
              }}
            >
              <ProfilePicture
                user={user}
                size="sm"
              />
              <Text>{user.name}</Text>
            </Flex>
          ))}
          <Text
            color="blue"
            className="py-3 text-center font-bold cursor-pointer"
            onClick={() => router.push("/posts/search?searched=" + searchText)}
          >
            Search for "{searchText}" in posts
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;
