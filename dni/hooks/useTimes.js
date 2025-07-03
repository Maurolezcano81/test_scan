import { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { timesService } from "../services/TimeServices";

export function useTimes() {
    const [arrayCompetitors, setArrayCompetitors] = useState([]);
    const [currentDorsal, setCurrentDorsal] = useState("");
    const [isSent, setIsSent] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const stored = await AsyncStorage.getItem("competitors");
                const sent = await AsyncStorage.getItem("isSent");
                if (stored) {
                    setArrayCompetitors(JSON.parse(stored));
                }
                if (sent === "true") {
                    setIsSent(true);
                }
            } catch (e) {
                console.error("Error leyendo AsyncStorage", e);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem("competitors", JSON.stringify(arrayCompetitors));
    }, [arrayCompetitors]);

    useEffect(() => {
        AsyncStorage.setItem("isSent", isSent ? "true" : "false");
    }, [isSent]);

    const addNewCompetitor = () => {
        if (!currentDorsal) {
            Alert.alert("Ingrese un dorsal válido");
            return;
        }
        if (!/^\d+$/.test(currentDorsal)) {
            Alert.alert("El dorsal debe ser numérico");
            return;
        }
        if (arrayCompetitors.some((c) => c.competidor === currentDorsal)) {
            Alert.alert("Ese dorsal ya fue registrado");
            return;
        }

        setArrayCompetitors((prev) => [
            ...prev,
            {
                competidor: currentDorsal,
                tiempoLectura: new Date().toISOString(),
            },
        ]);
        setIsSent(false);
        setCurrentDorsal("");
    };

    const handleSubmit = async () => {
        try {
            const response = await timesService.sendCompetitors(arrayCompetitors);
            if (response.status === 201) {
                Alert.alert("Enviado correctamente", `Se enviaron ${arrayCompetitors.length} competidores`);
                setArrayCompetitors([]);
                setIsSent(true);
                await AsyncStorage.removeItem("competitors");
                await AsyncStorage.setItem("isSent", "true");
            } else {
                Alert.alert("Error al enviar los datos", `Código: ${response.status}`);
            }
        } catch (e) {
            console.error(e);
            Alert.alert("Error de conexión con el servidor");
        }
    };

    const handleClear = () => {
        Alert.alert("Confirmar", "¿Deseas borrar todos los datos?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Borrar",
                onPress: async () => {
                    setArrayCompetitors([]);
                    setIsSent(false);
                    await AsyncStorage.removeItem("competitors");
                    await AsyncStorage.removeItem("isSent");
                },
            },
        ]);
    };

    const handleDelete = (competidor) => {
        Alert.alert(
            "Eliminar",
            `¿Deseas eliminar el dorsal ${competidor}?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () => {
                        const filtered = arrayCompetitors.filter(
                            (c) => c.competidor !== competidor
                        );
                        setArrayCompetitors(filtered);
                    },
                },
            ]
        );
    };

    return {
        arrayCompetitors,
        currentDorsal,
        setCurrentDorsal,
        isSent,
        addNewCompetitor,
        handleSubmit,
        handleClear,
        handleDelete,
    };
}
