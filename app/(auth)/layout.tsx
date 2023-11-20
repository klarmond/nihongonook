import { Inter } from "next/font/google"
import React from "react"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata = {
    title: "NihongoNook",
    description: "Talk about your favorite anime with like-minded people!"
}

const inter = Inter({subsets: ["latin"]});

const styles = {
    display: "flex",
    alignItems:"center",
    justifyContent:"center",
    paddingTop:"2rem",
    // backgroundColor:"#9db0cf"
}

export default function RootLayout({ 
    children 
}: { children: React.ReactNode 
}) {
  return (
    <ClerkProvider>
        <html lang="en">
            <body className={`${inter.className}`} style={styles}>
                {children}
            </body>
        </html>
    </ClerkProvider>
  )
}