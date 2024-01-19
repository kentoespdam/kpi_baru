"use client";
interface ErrorPageProps {
	error: Error;
}
const ErrorPage = (props: ErrorPageProps) => {
	// console.log(props);
	return (
		<div>
			Login Error
			<br />
			{props.error.message}
		</div>
	);
};

export default ErrorPage;
