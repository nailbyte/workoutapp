function formatTime(durationInSeconds) {
    if (durationInSeconds < 60) {
        return `${durationInSeconds}s`;
    } else if (durationInSeconds < 3600) {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    } else {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    }
}
export default formatTime;