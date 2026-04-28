import Artist from "../models/Artist.js";

export const getArtists = async (req, res, next) => {
	/*  #swagger.tags = ['Artists']
	 */
	try {
		const artists = await Artist.find();
		res.status(200).json(artists);
	} catch (error) {
		next(error);
	}
};

export const getArtistById = async (req, res, next) => {
	/*  #swagger.tags = ['Artists']
	 */
	try {
		const { id } = req.params;
		const artist = await Artist.findById(id);
		if (!artist) {
			return res.status(404).json({ message: "Artist not found" });
		}
		res.status(200).json(artist);
	} catch (error) {
		next(error);
	}
};

export const createArtist = async (req, res, next) => {
	/*  #swagger.tags = ['Artists']
	 */
	try {
		const { 
			urlName,
			name,
			description,
			imageURL,
			backgroundImageURL,
		} = req.body;
		const existingArtist = await Artist.findOne({ urlName });
		if (existingArtist) {
			return res
				.status(409)
				.json({ message: "Artist with this URL name already exists" });
		}
		const newArtist = new Artist({
			urlName,
			name,
			description,
			imageURL,
			backgroundImageURL,
		});
		await newArtist.save();
		const artistResponse = newArtist.toObject();
		res.status(201).json({
			_id: newArtist._id,
			...artistResponse,
		});
	} catch (error) {
		next(error);
	}
};
export const updateArtist = async (req, res, next) => {
	/*  #swagger.tags = ['Artists']
	 */
	try {
		const { id } = req.params;
		const { 
			urlName, 
			name, 
			description, 
			imageURL, 
			backgroundImageURL 
		} = req.body;
		const currentArtist = await Artist.findById(id);
		if (!currentArtist) {
			return res.status(404).json({ message: "Artist not found" });
		}
		const updateData = {};
		if (urlName !== undefined) updateData.urlName = urlName;
		if (name !== undefined) updateData.name = name;
		if (description !== undefined) updateData.description = description;
		if (imageURL !== undefined) updateData.imageURL = imageURL;
		if (backgroundImageURL !== undefined)
			updateData.backgroundImageURL = backgroundImageURL;

		const updatedArtist = await Artist.findByIdAndUpdate(
			id,
			updateData,
			{ new: true }
		);
		res.status(200).json(updatedArtist);
	} catch (error) {
		next(error);
	}
};
export const deleteArtist = async (req, res, next) => {
	/*  #swagger.tags = ['Artists']
	 */
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
