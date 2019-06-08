export default class DateUtils {
    StringToDate = (date) => {
        if (!date) return;

        const dateSplit = date.split('-');
        const year = dateSplit[0];
        const month = dateSplit[1];
        const day = dateSplit[2].substring(0, 2);

        return new Date(year, month, day);
    }
}