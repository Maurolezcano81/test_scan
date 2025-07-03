export const timesService = {
    async sendCompetitors(data) {
        try {
            console.log(data)
            const response = await fetch("https://api.microtime.com.ar/tiempos/manual", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            console.log(response)
            return response;
        } catch (e) {
            console.error("Error enviando datos", e);
            throw e;
        }
    },
};
