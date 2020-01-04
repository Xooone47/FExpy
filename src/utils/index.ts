import moment from 'moment';

export const formatDate = (date: any): string => moment(date).format('YYYY-MM-DD');

export const formatDateTime = (date: any): string => moment(date).format('YYYY-MM-DD HH:mm:ss');
