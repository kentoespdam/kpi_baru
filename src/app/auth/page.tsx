// "use client";
import Link from "next/link";
import Image from "next/image";
import React, { } from "react";
import Login from "./login";
import { z } from "zod";
import { cookies } from "next/headers";
import { getCUrrentSession } from "@lib/appwrite/user";
import { redirect } from "next/navigation";

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

const Auth = async () => {
	const cookieList = cookies();
	const currentSession = await getCUrrentSession(cookieList);
	if (currentSession) redirect(`${cookieList.get("callback_url")?.value}`)
	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<Link
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<Image
						className="w-8 h-8 mr-2"
						src="/logo_pdam_40x40.png"
						width={40}
						height={40}
						alt="logo"
					/>
					Perumdam Tirta Satria
				</Link>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						<Login />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Auth;
