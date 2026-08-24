import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }else{
        const ExtractedErrors = [];

        errors.array().map((err) => {
            ExtractedErrors.push({
                [err.path] : err.msg,
            });
        });

        throw new ApiError(422, "Recieved data is not valid", ExtractedErrors);
    }
};


export { validate };