"use client"
import { Account } from "appwrite";
import ProfilComponent from "./profile";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { useSessionStore } from "@store/main/session";
import useStore from "@store/main/nextSessionClient";
import { cryptr } from "@utils/index";

type TopBarComponentProps = {
    account: Account
}
const TopBarComponent = (props: TopBarComponentProps) => {
    // const user = useStore(useSessionStore, state => state.user)
    // const store = useStore(useSessionStore, state => ({ setAccount: state.setAccount, account: state.account, _hasHydrated: state._hasHydrated, }))
    const _hasHydrated = useStore(useSessionStore, state => state._hasHydrated)
    // const account = useStore(useSessionStore, state => state.account)
    let account = null

    if (_hasHydrated) {
        useSessionStore.setState({
            account: cryptr.encrypt(JSON.stringify(props.account))
            // setAccount(props.account)
            // account = store.getAccount()
            // console.log(account)
        })
        const getAccount = useSessionStore(state => state.getAccount)
        account = getAccount()
        // account = useStore(useSessionStore, state => state.account)
    }

    // const { account, setAccount } = useSessionStore()

    // const store = useStore(useSessionStore, state => ({ account: state.account, setAccount: state.setAccount }))

    // if (store) store.setAccount(props.account)

    // useEffect(() => {
    //     setAccount(props.account)
    // }, [])

    return (
        <div className="border">
            {account}
            <div className="mx-auto max-w-7x1 px-2 sm:px-4 lg:px-4 mr-2">
                <div className="flex h-12 items-center justify-between">
                    <div className="mt-5 flex items-center justify-between gap-4">
                        <Avatar className="w-15 h-12">
                            <AvatarImage
                                className="dark:bg-white"
                                src="/logo_pdam_40x40.png"
                                alt="Perumdam Tirta Satria"
                                width={60}
                                height={50} />
                            <AvatarFallback>Logo PDAM</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex item-center md:ml-6 justify-around">

                    </div>
                    <div className="flex items-center md:ml-6 justify-around">
                        <ProfilComponent />
                    </div>
                </div>
                <div className="flex h-6 justify-end">
                    <small className="text-small">
                        <span className="font-bold">BAGUS SUDRAJAT, S.Kom.</span>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default TopBarComponent;