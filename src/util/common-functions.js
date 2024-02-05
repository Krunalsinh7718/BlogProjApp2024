
function timeStamptToDDMMYYHHMM(timestamp){
    const date = new Date(timestamp);

    return date.toLocaleString('default', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            year: 'numeric',
            hourCycle: "h24"
    })
}

function timeStamptToDDMMYY(timestamp){
    const date = new Date(timestamp);

    return date.toLocaleString('default', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

export {timeStamptToDDMMYYHHMM, timeStamptToDDMMYY}