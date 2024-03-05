"use client"

import { useSessionStore } from "@store/main/session"
import { User } from "@store/types"
import { Employee } from "@tipes/eoffice/employee"
import { useEffect } from "react"

type EmployeeStateComponentProps = {
    userAccount: User
    employee?: Employee | null,
}
const EmployeeStateComponent = (props: EmployeeStateComponentProps) => {
    const setUser = useSessionStore(state => state.setUser)

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        setUser(props.userAccount)
    }, [])

    return null
}

export default EmployeeStateComponent