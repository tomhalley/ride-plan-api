"use strict";

var ClientError =        Error.extend('ClientError', 400);
var HttpBadRequest =     ClientError.extend('HttpBadRequest', 400);
var HttpUnauthorised =   ClientError.extend('HttpUnauthorised', 401);
var HttpNotFound =       ClientError.extend('HttpNotFound', 404);

var AppError =           Error.extend('AppError', 500);
var ServiceUnavailable = AppError.extend('ServiceUnavailable', 503);

module.exports = {
    ClientError: ClientError,
    HttpBadRequest: HttpBadRequest,
    HttpUnauthorised: HttpUnauthorised,
    HttpNotFound: HttpNotFound,

    AppError: AppError,
    ServiceUnavailable: ServiceUnavailable
};