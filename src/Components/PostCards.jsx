export const PostCards = () => {
    const saveCards = async e => {
        e.preventDefault();

        try {
            const body = { cards };
            const response = fetch("http://localhost:3001", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <button onClick={saveCards}> Save List </button>
    )
}