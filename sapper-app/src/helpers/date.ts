import { isAfter, isSameDay, differenceInCalendarISOWeeks, getDate, differenceInCalendarDays } from 'date-fns';

export function humanReadableDate(date: Date | string) {
    const comp = new Date(date);
    const today = new Date();
    if (isSameDay(comp, today)) {
        return "heute";
    }
    const days = differenceInCalendarDays(comp, today);

    if (days === 1) {
        return "morgen";
    }
    if (days === -1) {
        return "gestern";
    }
    const weekday = Intl.DateTimeFormat("de-DE", { weekday: 'long' }).format(comp);

    if (Math.abs(days) < 4) {
        let modifier = ""
        if (isAfter(today, comp)) {
            modifier = "vor"
        } else {
            modifier = "in"
        }
        return `${weekday}, ${modifier} ${days} Tagen`;
    }

    const weeks = differenceInCalendarISOWeeks(comp, today);

    if (weeks === 0) {
        let modifier = ""
        if (isAfter(today, comp)) {
            modifier = "letzten"
        } else {
            modifier = "am"
        }
        return `${modifier} ${weekday}`;
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

export function isOnDate(d1: Date | string, d2: Date | string): boolean {
    return isSameDay(new Date(d1), new Date(d2));
}
