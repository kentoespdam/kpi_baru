"use client";

import { Position } from "@myTypes/entity/position";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const levelList = (data: Position[]) => {
	return new Set(
		data.reduce((result: number[], pos) => {
			pos.level === null ? result.push(0) : result.push(pos.level);
			return result;
		}, [])
	);
};

type LevelParserWithoutParent = {
	parent: false;
};

type LevelParserWithParent = {
	parent: true;
	parentId: number;
};

type LevelParserProps = {
	data: Position[];
	level: number;
	listLevel: number[];
} & (LevelParserWithoutParent | LevelParserWithParent);

const LevelParser = (props: LevelParserProps) => {
	const filteredData = props.data.filter((pos) =>
		props.parent === false
			? pos.level === props.level
			: pos.level === props.level && pos.parent === props.parentId
	);

	return filteredData.length === 0 ? null : (
		<details open>
			<ul style={{ margin: 0 }}>
				{filteredData.map((pos) => (
					<React.Fragment key={pos.id}>
						<li>{pos.name}</li>
						<LevelParser
							data={props.data}
							level={props.level + 1}
							listLevel={props.listLevel}
							parent={true}
							parentId={pos.id}
						/>
					</React.Fragment>
				))}
			</ul>
		</details>
	);
};

const TestPosition = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["posTest"],
		queryFn: async () => {
			const { data } = await axios.get("/api/eo/position/list");
			return data.data;
		},
	});

	if (isLoading) return <div>Loading ....</div>;
	if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
	const listLevel = levelList(data);

	return (
		<LevelParser
			parent={false}
			data={data}
			level={1}
			listLevel={Array.from(listLevel)}
		/>
	);
};

export default TestPosition;
