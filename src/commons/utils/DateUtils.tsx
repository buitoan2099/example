import moment from 'moment';
export const FORMAT_DD_MM_YYYY = 'DD/MM/YYYY';
export const FORMAT = 'DD-MM-YYYY'
// Convert to UTC
export const convertToUtc = (date: number | Date) => {
  // Set date to end of day before converting to UTC
  const dateEndOfDay = moment(date).local().endOf('day').valueOf();
  return moment.utc(dateEndOfDay);
};

export const formatDateVN = (valueDate: number | Date) => {
  if (!valueDate) return '';
  return convertTimeDate(valueDate, FORMAT_DD_MM_YYYY);
};
export const formatDate = (valueDate: number | Date) => {
  if (!valueDate) return '';
  return convertTimeDate(valueDate, FORMAT);
};
export const convertTimeDate = (valueDate: number | Date, format: string) => {
  if (!valueDate) return '';
  return moment(valueDate).format(format);
};
export const DateFromNow = (valueDate?:number| Date|string)=>{
  if(!valueDate) return '';
  return moment(valueDate,'DD/MM/YYYY HH:mm:ss').fromNow()
}
