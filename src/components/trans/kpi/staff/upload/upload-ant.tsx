"use client";

import { message, Upload } from "antd";
import { RcFile, UploadProps } from "antd/es/upload";
import { useState } from "react";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result as string));
	reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
};

type TransKpiStaffUploadComponentProps = {
	uraianId: number;
};

const TransKpiStaffUploadComponent = (
	props: TransKpiStaffUploadComponentProps
) => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();

	const handleChange: UploadProps["onChange"] = (info) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			getBase64(info.file.originFileObj as RcFile, (url) => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	return (
		<Upload
			name="uraian-file"
			listType="picture-card"
			className="uraian-upload-button"
			showUploadList={false}
			action="/api/uraian/upload"
			beforeUpload={beforeUpload}
		>
			{imageUrl ? (
				<img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
			) : (
				uploadButton
			)}
		</Upload>
	);
};

export default TransKpiStaffUploadComponent;
