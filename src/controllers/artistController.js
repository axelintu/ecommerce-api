import Artist from "../models/Artist.js";
export const getArtists = async (req, res, next) => {
	try {
		const artists = await Artist.find();
		res.status(200).json(artists)
	} catch (error) {
		next(error);
	}
};

export const getArtistById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const artist = await Artist.findById(id);
		if (!artist) {
			return res.status(404).json({ message: "Artist not found " });
		}
		res.status(200).json(artist);
	} catch (error) {
		next(error);
	}
};
export const createArtist = async (req, res, next) => {
	try {
		const {
			urlName,
			name,
			description,
			imageURL,
			backgroundImageURL
		} = req.body;
		const newArtist = await Artist.create({
			urlName,
			name,
			description,
			imageURL,
			backgroundImageURL
		});
		res.status(201).json(newArtist);
	} catch (error) {
		next(error);
	}
};
export const updateArtist = async (req, res, next) => {
	try {
		const { id } = req.params;
		const {
			urlName,
			name,
			description,
			imageURL,
			backgroundImageURL
		} = req.body;
		const updatedArtist = await Artist.findByIdAndUpdate(
			id,
			{
				urlName,
				name,
				description,
				imageURL,
				backgroundImageURL
			},
			{ new: true }
		);
		if (!updatedArtist) {
			return res.status(404).json({ message: "Artist not found" });
		}
		res.status(200).json(updatedArtist);
	} catch (error) {
		next(error);
	}
};
export const deleteArtist = async (req, res, next) => {
	try {
		const { id } = req.params;
		const artist = await Artist.findByIdAndDelete(id);
		if (!artist) {
			return res.status(404).json({ message: "Artist not found" });
		}
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};
