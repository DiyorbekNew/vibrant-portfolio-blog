import { useEffect, useState } from "react";

const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            // Get scroll position
            const scrollTop = window.scrollY;
            // Get total scrollable height
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            // Calculate progress percentage
            const scrollPercent = (scrollTop / docHeight) * 100;

            setProgress(scrollPercent);
        };

        // Update progress on scroll
        window.addEventListener("scroll", updateProgress);

        // Initial calculation
        updateProgress();

        // Cleanup
        return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[100] pointer-events-none">
            <div
                className="h-full bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400 dark:from-gray-300 dark:via-gray-500 dark:to-gray-700 transition-all duration-150 ease-out shadow-lg shadow-primary/50"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ReadingProgress;
