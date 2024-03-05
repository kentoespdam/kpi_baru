"use client";

import { LoadingButton } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { doLogin } from "./action";
import { useFormState } from "react-dom";
import { AlertBuilder } from "@components/ui/alert";
import { redirect } from "next/navigation";

const Login = () => {
	const [state, action] = useFormState(doLogin, null);

	if (state?.isAuth)
		redirect(`${state.callbackUrl}`);

	return (
		<>
			{state && !state.isAuth ? (
				<AlertBuilder variant="error" message={state.message} />
			) : state !== null ? (
				<AlertBuilder variant="default" message={JSON.stringify(state.data)} />
			) : null}
			<form className="space-y-4 md:space-y-6" action={action}>
				<div>
					<label
						htmlFor="username"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Username
					</label>
					<Input
						type="text"
						name="username"
						id="username"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="name@company.com"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Password
					</label>
					<Input
						type="password"
						name="password"
						id="password"
						placeholder="••••••••"
						className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<LoadingButton title="Sign In">LOGIN</LoadingButton>
			</form>
		</>
	);
};

export default Login;
