const checkOwnershipById = (Model, resourceName) => {
return async (req,res,next) =>{
	try {
		const { id } = req.params;
	const userId = req.user.userId;
	const isAdmin = req.user.role === "admin";

	// Admins can access any Model
	if (isAdmin) {
		return next();
	}

	// Regular users can only access their own entities
	const resource = await Model.findById(id);

	if (!resource) {
		return res.status(404).json({ message: `${resourceName} not found` });
	}
	
	if (resource.user.toString() !== userId) {
		return res.status(403).json({ 
			message: `Forbidden: You can only access your own data (${resourceName.toLowerCase()})` 
		});
	}
	
	next();
} catch (error) { next(error) }
} 
};

export default checkOwnershipById;