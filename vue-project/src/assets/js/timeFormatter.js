const localOffset = new Date().getTimezoneOffset() * 60000;

export function getDateTime(utcTimestamp) {
    
    const utc = utcTimestamp * 1000 + localOffset;
    const localTime = new Date(utc);

    return localTime.toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }) + `, ${localTime.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
    })}`;
}

export function getTime(utcTimestamp) {
    const utc = utcTimestamp * 1000 + localOffset;
    const localTime = new Date(utc);

    return localTime.toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
}