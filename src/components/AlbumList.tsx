import { useState } from "react";
import { IAlbum } from "../types";

const AlbumList = ({ albums }: { albums: IAlbum[] }) => {
	const [selectedAlbum, setSelectedAlbum] = useState<IAlbum | null>(null);

	const openModal = (album: IAlbum) => {
		setSelectedAlbum(album);
	};

	const closeModal = () => {
		setSelectedAlbum(null);
	};

	return (
		<div>
			<div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
				{albums.map((album) => (
					<div
						key={album.id}
						className="album"
						style={{
							border: "1px solid #ddd",
							borderRadius: "8px",
							padding: "16px",
							width: "200px",
							textAlign: "center",
						}}
					>
						<img
							src={album.thumbnailUrl}
							alt={album.title}
							loading="lazy"
							style={{
								width: "100%",
								height: "auto",
								borderRadius: "4px",
								cursor: "pointer",
							}}
							onClick={() => openModal(album)}
						/>
					</div>
				))}
			</div>

			{selectedAlbum && (
				<div
					className="modal"
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0,0,0,0.5)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div
						style={{
							backgroundColor: "burlywood",
							padding: "20px",
							borderRadius: "8px",
							textAlign: "center",
						}}
					>
						<h3>{selectedAlbum.title}</h3>
						<img
							loading="lazy"
							
							src={selectedAlbum.url}
							alt={selectedAlbum.title}
							style={{ width: "100%", height: "auto", borderRadius: "14px" }}
						/>
						<button
							onClick={closeModal}
							style={{
								marginTop: "10px",
								padding: "10px 20px",
								borderRadius: "4px",
								cursor: "pointer",
								color: "blue",
							}}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default AlbumList;
