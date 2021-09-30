function portString(port) {
    const text = `Server running on port ${port}`;
    const wrap = '='.repeat(text.length + 2);
    return `\n${wrap}\n ${text}\n${wrap}\n`;
}
