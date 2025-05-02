exports.distinctValues = (extractResponse,column) => {
    const newExtracts = extractResponse.data.map((item) => item[column]);
    const distinctExtracts = [...new Set(newExtracts)];
    const extractCount = distinctExtracts.length;
    
    console.log('Extract Count:', extractCount);
    
    return extractCount;
}