import React from "react";
import { Text, Flex } from "@radix-ui/themes";
import { TbFishChristianity } from "react-icons/tb";
import SiteLogo from "../../assets/logo.svg";
import { motion } from "framer-motion";
import useTheme from "next-theme";

interface Props {
  size: "sm" | "md" | "lg";
  iconColor?: boolean;
  textColor?: boolean;
}

const sizeMap: Record<
  "sm" | "md" | "lg",
  { icon: Number; text: "2" | "5" | "7" | "6" | "8" }
> = {
  sm: { icon: 32, text: "5" },
  md: { icon: 42, text: "7" },
  lg: { icon: 52, text: "8" },
};

const Logo = ({ size, iconColor, textColor }: Props) => {
  return (
    <Text size={size ? sizeMap[size].text : undefined} className="font-bold">
      <Flex align="end" gap="2">
        <motion.div
          whileHover={{ rotate: -90, scale: 1.2 }}
          transition={{ type: "tween", duration: 0.5 }}
        >
          <div style={{ color: iconColor ? "var(--accent-10)" : undefined }}>
            <SiteLogo height={sizeMap[size].icon} width={sizeMap[size].icon} />
          </div>
        </motion.div>

        <Text style={{ color: textColor ? "var(--accent-10)" : undefined }}>
          EchoFeed
        </Text>
      </Flex>
    </Text>
  );
};

export default Logo;
