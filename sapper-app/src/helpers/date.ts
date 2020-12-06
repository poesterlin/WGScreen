import { isAfter, isSameDay, differenceInCalendarISOWeeks, getDate } from 'date-fns';

export function humanReadableDate(date: Date | string) {
    const comp = new Date(date);
    const today = new Date();
    if (isSameDay(comp, today)) {
        return "heute";
    }
    const weeks = differenceInCalendarISOWeeks(comp, today);
    const weekday = Intl.DateTimeFormat("de-DE", { weekday: 'long' }).format(comp);
    if (weeks === 0) {
        return weekday;
    }
    if (weeks === -1) {
        return "letzte Woche " + weekday;
    }
    if (weeks === 1) {
        return "nächste Woche " + weekday;
    }
    if (Math.abs(weeks) < 4) {
        let modifier = ""
        if (isAfter(today, comp)) {
            modifier = "vor"
        } else {
            modifier = "in"
        }
        const day = comp.toLocaleDateString('de-DE', {
            month: 'short',
            day: 'numeric'
        })
        return `${modifier} ${weeks} Wochen (${day})`
    }

    return comp.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
