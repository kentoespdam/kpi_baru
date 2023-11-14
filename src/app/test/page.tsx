"use client";
import { Organization } from "@myTypes/entity/organization";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const levelList = (data: Organization[]) => {
	return new Set(
		data.reduce((result: number[], org) => {
			org.level === null ? result.push(0) : result.push(org.level);
			return result;
		}, [])
	);
};

const levelNameParser = (level: number) => {
	switch (level) {
		case 1:
			return "Top Level";
		case 2:
			return "Top Directorate";
		case 3:
			return "Directorate";
		case 4:
			return "Bagian";
		case 5:
			return "Sub Bagian";
	}
};

type LevelWithoutParent = {
	parent: false;
	data: Organization[];
	level: number;
	listLevel: number[];
};

type LevelWithParent = {
	parent: true;
	data: Organization[];
	level: number;
	listLevel: number[];
	parentId: number;
};

type LevelParserProps = LevelWithoutParent | LevelWithParent;

const LevelParser = (props: LevelParserProps) => {
	const filteredData = props.data.filter((org) =>
		props.parent === false
			? org.level === props.level
			: org.level === props.level && org.parent === props.parentId
	);
	return filteredData.length > 0 ? (
		<details open>
			<ul style={{ margin: 0 }}>
				{filteredData.map((org, index) => (
					<React.Fragment key={org.id}>
						<li>{org.name}</li>

						<LevelParser
							data={props.data}
							level={org.level + 1}
							parent={true}
							parentId={org.id}
							listLevel={props.listLevel}
						/>
					</React.Fragment>
				))}
			</ul>
		</details>
	) : null;
};

const LevelBuilder = ({ data }: { data: Organization[] }) => {
	const listLevel = Array.from(levelList(data));
	return (
		<div>
			Organization
			{data
				.filter((org) => org.level === 1)
				.map((org) => (
					<LevelParser
						key={org.id}
						parent={false}
						data={data}
						level={org.level}
						listLevel={listLevel}
					/>
				))}
		</div>
	);
};

const PageTest = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["organization"],
		queryFn: async () => {
			const { data } = await axios.get("/api/eo/organization/list");
			return data.data;
		},
	});

	return isLoading ? (
		<div>Loading ....</div>
	) : error ? (
		<pre>{JSON.stringify(error, null, 2)}</pre>
	) : (
		<LevelBuilder data={data} />
	);
	// return <Level1 data={data} />;
};

export default PageTest;
