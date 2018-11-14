import {omitBy} from 'lodash';

export const omitInvalidValues = values => omitBy(values, value => (value === null || value === undefined));
