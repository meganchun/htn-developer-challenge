import type { Metadata } from "next";
import { DM_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";
import ApolloClientProvider from "@/providers/ApolloProvider";
import { StrictMode } from "react";
import { ConfigProvider } from "antd";
import { UserProvider } from "@/providers/UserProvider";
import { PreferencesProvider } from "@/providers/PreferencesProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hack the Globe",
  description: "Hack the North 2025 - Frontend Developer Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${robotoMono.variable} antialiased`}>
        <StrictMode>
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "var(--background-secondary)",
                colorText: "white",
                colorBorder: "var(--background-secondary)",
                fontFamily: "var(--font-dm-sans)",
                colorTextTertiary: "white",
                colorFillSecondary: "var(--background-secondary)",
                controlHeight: 42,
                colorTextPlaceholder: "var(--text-secondary)",
                colorBgElevated: "var(--background-secondary)",
              },
              components: {
                Select: {
                  optionActiveBg: "var(--text-secondary)",
                  selectorBg: "var(--background-secondary)",
                  optionSelectedColor: "white",
                  optionSelectedBg: "var(--blue)",
                  clearBg: "var(--pink)",
                },
                Input: {
                  colorBgContainer: "var(--background-secondary)",
                  colorBorder: "var(--background-secondary)",
                  colorFillSecondary: "var(--background-secondary)",
                  addonBg: "var(--background-secondary)",
                  colorFillTertiary: "var(--background-secondary)",
                },
              },
            }}
          >
            <PreferencesProvider>
              <UserProvider>
                <ApolloClientProvider>{children}</ApolloClientProvider>
              </UserProvider>
            </PreferencesProvider>
          </ConfigProvider>
        </StrictMode>
      </body>
    </html>
  );
}
