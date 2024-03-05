import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Separator } from "@components/ui/separator"
import { appwriteHeader, getCookieToken, headerApiKpi } from "@helpers/index"
import { KPI_API } from "@utils/index"
import { cookies } from "next/headers"

export const metadata = {
    title: "Master Level"
}

const getLevelData = async (searchParams: { [key: string]: string | string[] | undefined }) => {
    const cookieList = cookies()
    const search = new URLSearchParams()
    searchParams.page && search.append("page", String(searchParams.page))
    searchParams.size && search.append("size", String(searchParams.size))
    searchParams.status && search.append("size", String(searchParams.status))
    searchParams.levelId && search.append("size", String(searchParams.levelId))
    searchParams.name && search.append("size", String(searchParams.name))

    const req = await fetch(`${KPI_API}/master/level?${search.toString()}`, {
        method: "GET",
        headers: headerApiKpi(cookieList)
    })
    if (req.status !== 200) return null
    const data = await req.json()
    return data.data
}

const MasterPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const levelData = await getLevelData(searchParams)
    console.log(levelData)
    return (
        <Card>
            <CardHeader>
                <CardTitle>{metadata.title}</CardTitle>
            </CardHeader>
            <CardContent>
                Master Level
            </CardContent>
        </Card>
    )
}

export default MasterPage