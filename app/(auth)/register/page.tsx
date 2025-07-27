"use client";
import { Button, Callout, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { newUserSchema } from "../../api/user/register/schema";
import SelectController from "@/app/_components/SelectController";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Logo from "@/app/_components/Logo";
import Link from "next/link";
import UploadProfile from "@/app/_components/UploadProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import Spinner from "@/app/_components/Spinner";

const years: { label: string; value: string }[] = [];
for (let i = 2010; i > 1950; i--) {
  years.push({ label: i.toString(), value: i.toString() });
}

const RegisterPage = () => {
  type InputFields = z.infer<typeof newUserSchema>;
  const [publicId, setPublicId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const fields: {
    label: string;
    type: React.HTMLInputTypeAttribute;
    value: keyof InputFields;
  }[] = [
    { label: "Name", value: "name", type: "text" },
    { label: "Username", value: "username", type: "text" },
    { label: "Email", value: "email", type: "email" },
    { label: "Password", value: "password", type: "password" },
    { label: "City", value: "city", type: "text" },
  ];
  const onSubmit = (data: InputFields) => {
    setLoading(true);
    axios
      .post<User, Error>("/api/user/register", {
        ...data,
        imagePublicId: publicId,
      })
      .then((res) => {
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: "/",
        });
      })
      .catch((e) => {
        setError(e.response.data.message);
        console.log(e);
      })
      .finally(() => setLoading(false));
  };
  const { register, handleSubmit, control, formState } = useForm<InputFields>({
    resolver: zodResolver(newUserSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="5" direction="column" className="max-w-3xl mx-auto">
        <Flex align="center" gap="1" width="100%" justify="center" mb="3">
          <Logo size="lg" iconColor={true} />
        </Flex>

        {fields.map((field) => (
          <div className="relative" key={field.value}>
            <TextField.Input
              placeholder={field.label}
              size="2"
              type={field.type}
              {...register(field.value)}
            />
            <Text color="red" size="1" className="absolute -bottom-5">
              {formState.errors[field.value]?.message}
            </Text>
          </div>
        ))}
        <SelectController
          name="gender"
          label="Gender"
          control={control}
          items={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <SelectController
          name="brithYear"
          label="Year of Brith"
          control={control}
          items={years}
        />
        {error && (
          <Callout.Root variant="soft" color="red">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Flex gap="5" align="center" justify="center">
          <Text>Profile Picture</Text>

          <UploadProfile passPublicId={(pId) => setPublicId(pId)} />
          {publicId && <CheckCircledIcon />}
        </Flex>
        <Flex justify="center">
          <Button size="3" disabled={loading}>
            Register {loading && <Spinner />}
          </Button>
        </Flex>
        <Flex justify="center" gap="2" align="center">
          Already have an account?
          <Link href="/login">
            <Button size="2" variant="ghost" type="button">
              Sign in
            </Button>
          </Link>
        </Flex>
      </Flex>
    </form>
  );
};

export default RegisterPage;
