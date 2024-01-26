exports.success = (message, data) => {
    return {
        message: message,
        data: data
    }
}

exports.getUniqueId = (planets) => {
    const planetsIds = planets.map(planet => planet.id);
    const maxId = planetsIds.reduce( (a, b) => Math.max(a, b) );
    const unqiueId = maxId + 1;

    return unqiueId;
}