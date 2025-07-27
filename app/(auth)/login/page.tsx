"use client";
import Logo from "@/app/_components/Logo";
import Spinner from "@/app/_components/Spinner";
import { Button, Flex, Grid, TextField, Text } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  searchParams: { error: string };
}

const LoginForm = ({ searchParams }: Props) => {
  const testUser = true;
  const [email, setEmail] = useState(testUser ? "test" : "");
  const [password, setPassword] = useState(testUser ? "123456" : "");
  const [loading, setLoading] = useState(false);

  const logIn = () => {
    setLoading(true);
    signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <Flex direction="column" align="center" mt="4">
      <Logo size="lg" />
      <Flex direction="column" gap="5" className="w-full" mt="5">
        <TextField.Input
          id="username"
          placeholder="Username or Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <TextField.Input
          id="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Flex className="text-red-600 text-sm" justify="center">
          {!!searchParams.error && (
            <Text>Can not login with these inputs.</Text>
          )}
        </Flex>
      </Flex>

      <Flex justify="between" gap="3">
        <Button
          size="3"
          type="button"
          disabled={loading}
          onClick={() => logIn()}
        >
          Login
          {loading && <Spinner />}
        </Button>
        <Link href="/">
          <Button size="3" type="button" variant="outline">
            Continue as Guest
          </Button>
        </Link>
      </Flex>

      <Text align="center" className="pt-10">
        Don&#39;t have an account?{" "}
        <Link href="/register" style={{ color: "var(--accent-9)" }}>
          Signup
        </Link>
      </Text>
    </Flex>
  );
};

export default LoginForm;
