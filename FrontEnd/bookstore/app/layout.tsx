"use client";
import { Layout, Menu } from "antd";
import "./globals.css";
import Link from "next/link";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedKey, setSelectedKey] = useState<string>("");

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
  };

  const menuItems = [
    {
      key: "library",
      label: (
        <Link href={"/"} style={{ color: "white", fontSize: "16px" }}>
          Библиотека
        </Link>
      ),
      style: {
        backgroundColor: selectedKey === "library" ? "#1890ff" : "",
      },
      onClick: () => handleMenuClick("library"),
    },
  ];

  const cartMenuItems = [
    {
      key: "cart",
      label: (
        <Link href={"/cart"} style={{ color: "white", fontSize: "16px" }}>
          Корзина
        </Link>
      ),
      style: {
        backgroundColor: selectedKey === "cart" ? "#1890ff" : "",
      },
      onClick: () => handleMenuClick("cart"),
    },
  ];

  return (
    <html lang="en">
      <body>
        <Layout style={{ minHeight: "100vh" }}>
          <Header style={{ display: "flex", alignItems: "center", height: "65px" }}>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ flex: 1, minWidth: 0 }}
              selectedKeys={[selectedKey]}
              items={menuItems}
            />

            <div style={{ marginLeft: "auto" }}>
              <Menu
                mode="horizontal"
                theme="dark"
                style={{ background: "transparent", border: "none" }}
                selectedKeys={[selectedKey]}
                items={cartMenuItems}
              />
            </div>
          </Header>

          <Content style={{ padding: "0 48px" }}>{children}</Content>

          <Footer style={{ textAlign: "center" }}>BookStore 2024</Footer>
        </Layout>
      </body>
    </html>
  );
}
