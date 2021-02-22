import { StatusCodes } from 'http-status-codes';

const { OK, CREATED, NOT_FOUND } = StatusCodes;

/**
 * Returns a json response with status code 200 and a response body
 *
 * @param {any} res
 * @param {any} body
 *
 * @return Response
 */
export const success = (res, body = {}) => res.status(OK).json(body);

/**
 * Returns a json response with status code 201 and a response body
 *
 * @param {any} res
 * @param {any} body
 */
export const created = (res, body) => {
  res.status(CREATED).json({
    ...body
  });
};

/**
 * Returns a json response with status code 404 and a response message
 *
 * @param {any} res
 * @param {any} message
 */
export const notFound = (res, message) => {
  res.status(NOT_FOUND).json({
    message
  });
};
