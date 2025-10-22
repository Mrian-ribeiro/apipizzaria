const validate = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body);

    if (error) {
        return res.status(400).json({errror: error.details[0].message});
    }
    next();
}

//Usando "export default" 
export default validate;