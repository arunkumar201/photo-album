import { useEffect, useState, useMemo } from "react";
import "./App.css";
import { IAlbum } from "./types";
import AlbumList from "./components/AlbumList";

function App() {
	const [albums, setAlbums] = useState<IAlbum[] | []>([]);
	const [albumGroup, setAlbumGroup] = useState<number[]>([]);
	const [albumsToDisplay, setAlbumsToDisplay] = useState<IAlbum[]>([]);
	const [activeAlbumId, setActiveAlbumId] = useState(1);

	const fetchAlbums = async () => {
		const response = await fetch("https://jsonplaceholder.typicode.com/photos");
		const data: IAlbum[] = (await response.json()).slice(0);
		const uniqueListId = Array.from(
			new Set(data.map((album) => album.albumId))
		);
		console.log("Unique List IDs:", uniqueListId);
		setAlbumGroup(uniqueListId);
		setAlbums(data);
		const defaultList = data.filter((album) => album.albumId === 1);
		setAlbumsToDisplay(defaultList);
	};

	useEffect(() => {
		fetchAlbums();
	}, []);

	const handleAlbumGroupClick = (groupId: number) => {
		const albumsInGroup = albums.filter((album) => album.albumId === groupId);
		setAlbumsToDisplay(albumsInGroup);
		setActiveAlbumId(groupId);
	};

	const memoizedAlbumGroup = useMemo(() => albumGroup, [albumGroup]);

	return (
		<>
			<div style={{ display: "flex" }}>
				<div
					style={{
						flex: "1",
						padding: "10px",
						borderRight: "1px solid #ccc",
					}}
				>
					<div className="app-container">
						<div
							style={{
								padding: "10px",
								position: "fixed",
								width: "300px",
								zIndex: "100",
								top: "1px",
								background: "green",
							}}
						>
							<a
								href="https://github.com/arunkumar201/photo-album"
								target="_next"
								style={{ color: "blue", textDecoration: "none" }}
							>
								GitHub Link
							</a>
							<h2>Photo Albums</h2>
						</div>
						<div
							className="gallery"
							style={{
								overflow: "scroll",
								marginTop: "10px",
								maxHeight: "100vh",
								height: "100vh",
							}}
						>
							{memoizedAlbumGroup.map((groupId) => (
								<div
									className={`gallery-item`}
									key={groupId}
									style={{
										width: "200px",
										backgroundColor: activeAlbumId === groupId ? "yellow" : "",
									}}
									onClick={() => handleAlbumGroupClick(groupId)}
								>
									<div>
										<h2>Album Group #{groupId}</h2>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div style={{ flex: "3", padding: "10px" }}>
					<AlbumList albums={albumsToDisplay} />
				</div>
			</div>
		</>
	);
}

export default App;
