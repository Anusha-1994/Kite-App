exports.getSearchString = (searchString) => {
    return searchString.replace(/[.*+?^$@{}()|[\]\\]/g, '\\$&')
}