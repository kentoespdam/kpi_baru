import Image from "next/image";

const Judul = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
			}}
		>
			<div style={{ flex: 1 }}>
				<Image
					alt="Logo Pdam"
					src="/images/logo_pdam.png"
					width={120}
					height={80}
				/>
			</div>
			<div
				style={{
					flex: 10,
					textAlign: "center",
				}}
			>
				<h2 style={{ marginBlock: "1em 0em" }}>
					PERUSAHAAN UMUM DAERAH AUR MIINUM TIRTA SATRIA
				</h2>
				<h3 style={{ marginBlock: "0em 1em" }}>
					<i>Penilaian Pencapaian Kinerja Individu</i>
				</h3>
			</div>
		</div>
	);
};

export default Judul;
