import moment from "moment";
import { DATE_TIME } from "../constants/constants";

export const toMomentDateTimeData = (value) =>
  moment(new Date(value)).format(DATE_TIME.YEAR_MONTH_DATE_TIME);
