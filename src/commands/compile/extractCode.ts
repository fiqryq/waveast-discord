interface Code {
    language: string;
    content: string;
}

export default (message: string): Code[] => {
    const matchedCodes = message.matchAll(/`{3}([\w]*)\n([\S\s]+?)\n`{3}/gm);
    const codes: Code[] = [];
    for (const matched of matchedCodes) {
        codes.push({
            language: matched[1],
            content: matched[2].trim(),
        });
    }
    return codes;
};