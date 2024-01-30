import { ReactNode } from "react"

const AuthLayout = ({ gambar, children }: { gambar: ReactNode, children: ReactNode }) => {
    return <>
        {gambar}
        {children}
    </>
}

export default AuthLayout