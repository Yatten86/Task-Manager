import { Priority } from "../enums/Priority";
import { Status } from "../enums/Status";
import { body, ValidationChain } from "express-validator";

export const createValidator: ValidationChain[] = [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Task is mandatory')
        .trim().isString()
        .withMessage('Title needs to be in text format'),
    body('date')
        .not()
        .isEmpty()
        .withMessage('The task date is mandatory')
        .isString()
        .withMessage('The date needs to be a valid format'),
    body('description')
        .trim()
        .isString()
        .withMessage('Description needs to be text format'),
    body('priority')
        .trim()
        .isIn([Priority.normal, Priority.high, Priority.low])
        .withMessage('Priority can only be Normal, High or Low'),
    body('status')
        .trim()
        .isIn([Status.completed, Status.inProgress, Status.todo])
        .withMessage('Status can only be Completed, In Progress or To do'),
];

export const updateValidator = [
    body('id')
        .not()
        .isEmpty()
        .withMessage('Mandatory')
        .trim()
        .isString()
        .isUUID()
        .withMessage('ID must be a valid uuid format'),
    body('status')
        .trim()
        .isIn([Status.completed, Status.inProgress, Status.todo])
        .withMessage('Status can only be completed, inProgress or todo'),
    ];