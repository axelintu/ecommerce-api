import Artist from "../models/Artist.js";
export const getArtists = async (req, res) => {
	try {
		const artists = await Artist.find();
		res.status(200).json(artists)
	} catch (error) {
		console.error(error);
	}
};

export const getArtistById = async (req, res) => {
	try {
		const { id } = req.params;
		const artist = Artist.findById(id);
		if (!artist) {
			return res.status(404).json({ message: "Artist not found " });
		}
		res.status(200).json(artist);
	} catch (error) {
		console.error(error);
	}
};
export const createArtist = async (req, res) => {
	try {
		const { urlName, name, description } = req.body;
		const newArtist = await Artist.create({
			urlName,
			name,
			description
		});
		res.status(201).json(newArtist);
	} catch (error) {
		console.error(error);
	}
};
export const updateArtist = async (req, res) => {
	try {
		const { id } = req.params;
	} catch (error) {
		console.error(error);
	}
};
export const deleteArtist = async (req, res) => {
	try {
		const { id } = req.params;
	} catch (error) {
		console.error(error);
	}
};
