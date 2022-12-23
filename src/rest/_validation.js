const Joi = require('joi');
const JOI_OPTIONS = {
    abortEarly: true,
    allowUnknown: true,
    convert: true,
    context: true,
    presence: 'required',
};
const cleanupJoiError = (error) => error.details.reduce((resultObj, {
    message,
    path,
    type,
}) => {
    const joinedPath = path.join('.') || 'value';
    if (!resultObj[joinedPath]) {
        resultObj[joinedPath] = [];
    }
    resultObj[joinedPath].push({
        type,
        message,
    });
    return resultObj;
}, {});

const validate = (schema) => {
    if (!schema) {
        schema = {
            params: {},
            query: {},
            body: {}
        }
    }
    return (ctx, next) => {
        const errors = {};
        if (!Joi.isSchema(schema.params)) {
            schema.params = Joi.object(schema.params || {});
        }
        const {
            value: paramsValue,
            error: paramsError
        } = schema.params.validate(ctx.params, JOI_OPTIONS);
        if (paramsError) {
            errors.params = cleanupJoiError(paramsError);

        } else {
            ctx.params = paramsValue;
        }
        if (!Joi.isSchema(schema.body)) {
            schema.body = Joi.object(schema.body || {});
        }

        const {
            error: bodyError,
            value: bodyValue,
        } = schema.body.validate(
            ctx.request.body,
            JOI_OPTIONS,
        );

        if (bodyError) {
            errors.body = cleanupJoiError(bodyError);
        } else {
            ctx.request.body = bodyValue;
        }
        if (Object.keys(errors).length > 0) {
            ctx.throw(400, 'Validation failed, check details for information', {
                code: 'VALIDATION_FAILED',
                details: errors
            });
        }
        return next();
    };
};

module.exports = validate;