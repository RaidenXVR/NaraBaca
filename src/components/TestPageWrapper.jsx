import React, { useState, useEffect } from "react";
import TestPage from "./TestPage";

export default function TestPageWrapper() {
    const [hasPermission, setHasPermission] = useState(false);
    const [denied, setDenied] = useState(false);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(() => {
                setHasPermission(true);
            })
            .catch(() => {
                setDenied(true);
            });
    }, []);

    if (denied) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700 text-xl font-bold p-4">
                Mikrofon dibutuhkan untuk melanjutkan. Tolong izinkan akses mikrofon.
            </div>
        );
    }

    if (!hasPermission) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-yellow-100 text-yellow-700 text-xl font-semibold p-4">
                Meminta izin mikrofon...
            </div>
        );
    }

    return <TestPage />;
}
